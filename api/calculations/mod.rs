use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::error::Error;

pub mod apply_choice;
pub mod get_next_person;

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
    let mut steps = vec![];
    let mut state = get_initial_state(&input.wishes);

    for _i in 0..projects.len() {
        let next_person_name: String = get_next_person::main(&mut state);
        let should_break =
            apply_choice::main(next_person_name, &mut state, &mut projects, &mut steps);
        if should_break {
            break;
        }
    }

    let results: Data = Data { steps };
    Ok(results)
}

#[cfg(test)]
mod test;
