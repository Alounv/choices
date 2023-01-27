use rand::Rng;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::error::Error;

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

// Next person to choose a project should :
// 1. have the lowest number of storypoints already assigned
// 2. in case of equality, have the biggest number of denials
// 3. in case of equality, be randomly choosen
fn get_next_person(state: &mut HashMap<String, Person>) -> String {
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

pub fn main(input: &Input) -> Result<Data, Box<dyn Error>> {
    let mut projects = input.projects.clone();
    let mut steps = vec![];
    let mut state = input
        .wishes
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
        .collect::<HashMap<String, Person>>();

    for _i in 0..projects.len() {
        let next_person_name: String = get_next_person(&mut state);
        let next_person = state.get(&next_person_name).unwrap();
        let next_person_wishes = next_person.wishes.clone();
        let next_person_assigned = next_person.assigned.len();

        if next_person_wishes.len() == 0 {
            break;
        }

        let project = next_person_wishes[0].clone();

        projects.remove(&project);
        state.iter_mut().for_each(|(name, person)| {
            if name == &next_person_name {
                person.assigned.push(project.clone());
                person.points += input.projects.get(&project).unwrap();
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

        // println!(" ===>>> {} took {}", next_person_name, project);
        // println!("{:#?}", state);
        // println!();

        steps.push(state.clone());

        if projects.len() == 0 {
            break;
        }
    }

    let results: Data = Data { steps };
    Ok(results)
}

#[cfg(test)]
mod test;
