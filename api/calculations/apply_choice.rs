use std::collections::HashMap;

use super::Person;

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
