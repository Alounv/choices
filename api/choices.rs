use http::StatusCode;
use rand::Rng;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::error::Error;
use vercel_lambda::{error::VercelError, lambda, IntoResponse, Request, Response};

#[derive(Deserialize)]
pub struct Input {
    wishes: HashMap<String, Vec<String>>,
    projects: HashMap<String, u16>,
}

#[derive(Serialize, PartialEq, Debug)]
pub struct Data {
    steps: Vec<HashMap<String, Person>>,
}

#[derive(Serialize, PartialEq, Debug, Clone)]
pub struct Person {
    denials: u16,
    points: u16,
    wishes: Vec<String>,
    assigned: Vec<String>,
}

mod next_person {
    use super::*;
    // Next person to choose a project should :
    // 1. have the lowest number of storypoints already assigned
    // 2. in case of equality, have the biggest number of denials
    // 3. in case of equality, be randomly choosen
    pub fn main(state: &mut HashMap<String, Person>) -> String {
        let mut next_person = String::new();

        let mut min_points = 1000;
        let mut max_denials = 0;
        let mut candidates = Vec::new();

        for (name, person_data) in state.iter() {
            let points = person_data.points;
            let denials = person_data.denials;
            if points < min_points {
                min_points = points;
                max_denials = denials;
                next_person = name.clone();
            } else if points == min_points {
                if denials > max_denials {
                    max_denials = denials;
                    next_person = name.clone();
                } else if denials == max_denials {
                    candidates.push(name.clone());
                }
            }
        }

        if candidates.len() > 0 {
            let mut rng = rand::thread_rng();
            let index = rng.gen_range(0..candidates.len());
            next_person = candidates[index].clone();
        }

        next_person
    }
}

mod apply {
    use super::*;
    pub fn main(
        next_person_name: String,
        state: &mut HashMap<String, Person>,
        projects: &mut HashMap<String, u16>,
        steps: &mut Vec<HashMap<String, Person>>,
    ) -> bool {
        let next_person = state.get(&next_person_name).unwrap();
        let next_person_wishes = next_person.wishes.clone();
        let next_person_assigned = next_person.assigned.len();

        if next_person_wishes.len() == 0 {
            return true;
        }

        let project = next_person_wishes[0].clone();

        state.iter_mut().for_each(|(name, person)| {
            if name == &next_person_name {
                person.assigned.push(project.clone());
                person.points += projects.get(&project).unwrap();
            } else if person.wishes.len() > 0
                && person.assigned.len() <= next_person_assigned
                && person.wishes[0] == project
            {
                println!("XXX {} denied to {} by {}", project, name, next_person_name);
                person.denials += 1;
            }
            // We add a denial each time the person first choice is taken by someone else
            // Who had not less projects than him

            person.wishes.retain(|w| w != &project);
        });

        projects.remove(&project);

        // println!(" ===>>> {} took {}", next_person_name, project);
        // println!("{:#?}", state);
        // println!();

        steps.push(state.clone());

        if projects.len() == 0 {
            return true;
        }
        return false;
    }
}

mod calculations {
    use super::*;
    fn get_initial_state(wishes: &HashMap<String, Vec<String>>) -> HashMap<String, Person> {
        wishes
            .iter()
            .map(|(name, wishes)| {
                (
                    name.clone(),
                    Person {
                        denials: 0,
                        points: 0,
                        wishes: wishes.clone(),
                        assigned: vec![],
                    },
                )
            })
            .collect::<HashMap<String, Person>>()
    }

    pub fn main(input: &Input) -> Result<Data, Box<dyn Error>> {
        let mut projects = input.projects.clone();
        let mut state = get_initial_state(&input.wishes);
        let mut steps = vec![state.clone()];

        for _i in 0..projects.len() {
            let next_person_name: String = next_person::main(&mut state);
            let should_break = apply::main(next_person_name, &mut state, &mut projects, &mut steps);
            if should_break {
                break;
            }
        }

        let results: Data = Data { steps };
        Ok(results)
    }
}

fn handler(req: Request) -> Result<impl IntoResponse, VercelError> {
    let body = req.into_body();
    let input = serde_json::from_slice(&body);

    match input {
        Ok(input) => {
            let results = calculations::main(&input).unwrap();

            let data = serde_json::json!(results);
            let response = Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "text/plain")
                .body(data.to_string())
                .expect("Internal Server Error");

            Ok(response)
        }
        Err(e) => {
            let error = format!("Error: {}", e);
            Ok(Response::builder()
                .status(StatusCode::BAD_REQUEST)
                .body(error)
                .unwrap())
        }
    }
}

fn main() -> Result<(), Box<dyn Error>> {
    Ok(lambda!(handler))
}

#[cfg(test)]
mod tests {
    use super::*;

    impl Input {
        pub fn new(wishes: Vec<(&str, Vec<&str>)>, projects: Vec<(&str, u16)>) -> Self {
            Self {
                wishes: wishes
                    .into_iter()
                    .map(|(user, wishes)| {
                        (user.into(), wishes.into_iter().map(|w| w.into()).collect())
                    })
                    .collect(),
                projects: projects.into_iter().map(|(n, v)| (n.into(), v)).collect(),
            }
        }
    }

    #[test]
    fn if_no_conflicts_should_give_people_what_they_want() {
        let input = Input::new(
            vec![
                ("Alice", vec!["A", "D", "F", "C", "B", "E"]),
                ("Bob", vec!["B", "C", "E", "A", "D", "F"]),
                ("Charlie", vec!["C", "A", "B", "E", "F", "D"]),
            ],
            vec![("A", 1), ("B", 2), ("C", 3), ("D", 4), ("E", 5), ("F", 6)],
        );

        let steps = calculations::main(&input).unwrap().steps;
        let last_step = steps.last().unwrap();

        assert_eq!(
            last_step.get("Alice").unwrap().clone(),
            Person {
                assigned: vec!["A".into(), "D".into()],
                wishes: vec![],
                points: 5,
                denials: 0,
            }
        );

        assert_eq!(
            last_step.get("Bob").unwrap().clone(),
            Person {
                assigned: vec!["B".into(), "E".into()],
                wishes: vec![],
                points: 7,
                denials: 0,
            }
        );

        assert_eq!(
            last_step.get("Charlie").unwrap().clone(),
            Person {
                assigned: vec!["C".into(), "F".into()],
                wishes: vec![],
                points: 9,
                denials: 1,
            }
        );

        assert_eq!(steps.len(), 7);
    }

    #[test]
    fn if_conficts_should_give_consistent_denials() {
        let input = Input::new(
            vec![
                ("Alice", vec!["A", "D", "F", "C", "B", "E"]),
                ("Bob", vec!["B", "C", "E", "A", "D", "F"]),
                ("Charlie", vec!["B", "C", "E", "A", "D", "F"]),
            ],
            vec![("A", 1), ("B", 2), ("C", 3), ("D", 4), ("E", 5), ("F", 6)],
        );

        let steps = calculations::main(&input).unwrap().steps;
        let last_step = steps.last().unwrap();
        println!("{:#?}", last_step);
        let denials_count = last_step.values().map(|p| p.denials).sum::<u16>();

        assert_eq!(denials_count, 2);
        assert_eq!(last_step.get("Alice").unwrap().assigned, vec!["A", "D"]);
    }
}
