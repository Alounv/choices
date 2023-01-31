import type { Projects, Wishes } from "~/types";

export const INITIAL_WISHES: Wishes = {
  Alice: ["A", "D", "F", "C", "B", "E"],
  Bob: ["B", "C", "E", "A", "D", "F"],
  Charlie: ["C", "A", "B", "E", "F", "D"],
};

export const INITIAL_PROJECTS: Projects = {
  A: { description: "Project A", points: 1 },
  B: { description: "Project B", points: 2 },
  C: { description: "Project C", points: 3 },
  D: { description: "Project D", points: 4 },
  E: { description: "Project E", points: 5 },
  F: { description: "Project F", points: 6 },
};
