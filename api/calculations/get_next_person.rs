use super::Person;
use rand::Rng;
use std::collections::HashMap;

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
