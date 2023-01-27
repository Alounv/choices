use super::*;

impl Input {
    pub fn new(wishes: Vec<(&str, Vec<&str>)>, projects: Vec<(&str, u16)>) -> Self {
        Self {
            wishes: wishes
                .into_iter()
                .map(|(user, wishes)| (user.into(), wishes.into_iter().map(|w| w.into()).collect()))
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

    let steps = main(&input).unwrap().steps;
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

    assert_eq!(steps.len(), 6);
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

    let steps = main(&input).unwrap().steps;
    let last_step = steps.last().unwrap();
    println!("{:#?}", last_step);
    let denials_count = last_step.values().map(|p| p.denials).sum::<u16>();

    assert_eq!(denials_count, 2);
    assert_eq!(last_step.get("Alice").unwrap().assigned, vec!["A", "D"]);
}
