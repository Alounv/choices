export const MOCK_RESULTS = [
  {
    Alice: {
      assigned: [],
      denials: 0,
      points: 0,
      wishes: ["E", "B", "C", "F", "D", "A"],
    },
    Bob: {
      assigned: [],
      denials: 0,
      points: 0,
      wishes: ["F", "D", "A", "E", "C", "B"],
    },
    Charlie: {
      assigned: [],
      denials: 0,
      points: 0,
      wishes: ["D", "F", "E", "B", "A", "C"],
    },
  },
  {
    Alice: {
      assigned: [],
      denials: 0,
      points: 0,
      wishes: ["E", "C", "F", "D", "A"],
    },
    Bob: {
      assigned: ["B"],
      denials: 0,
      points: 2,
      wishes: ["F", "D", "A", "E", "C"],
    },
    Charlie: {
      assigned: [],
      denials: 0,
      points: 0,
      wishes: ["D", "F", "E", "A", "C"],
    },
  },
  {
    Alice: {
      assigned: ["A"],
      denials: 0,
      points: 1,
      wishes: ["D", "F", "C", "E"],
    },
    Bob: {
      assigned: ["B"],
      denials: 0,
      points: 2,
      wishes: ["C", "E", "D", "F"],
    },
    Charlie: {
      assigned: [],
      denials: 0,
      points: 0,
      wishes: ["C", "E", "F", "D"],
    },
  },
  {
    Alice: {
      assigned: ["A"],
      denials: 0,
      points: 1,
      wishes: ["D", "F", "E"],
    },
    Bob: {
      assigned: ["B"],
      denials: 0,
      points: 2,
      wishes: ["E", "D", "F"],
    },
    Charlie: {
      assigned: ["C"],
      denials: 0,
      points: 3,
      wishes: ["E", "F", "D"],
    },
  },
  {
    Alice: {
      assigned: ["A", "D"],
      denials: 0,
      points: 5,
      wishes: ["F", "E"],
    },
    Bob: {
      assigned: ["B"],
      denials: 0,
      points: 2,
      wishes: ["E", "F"],
    },
    Charlie: {
      assigned: ["C"],
      denials: 0,
      points: 3,
      wishes: ["E", "F"],
    },
  },
  {
    Alice: {
      assigned: ["A", "D"],
      denials: 0,
      points: 5,
      wishes: ["F"],
    },
    Bob: {
      assigned: ["B", "E"],
      denials: 0,
      points: 7,
      wishes: ["F"],
    },
    Charlie: {
      assigned: ["C"],
      denials: 1,
      points: 3,
      wishes: ["F"],
    },
  },
  {
    Alice: {
      assigned: ["A", "D"],
      denials: 0,
      points: 5,
      wishes: [],
    },
    Bob: {
      assigned: ["B", "E"],
      denials: 0,
      points: 7,
      wishes: [],
    },
    Charlie: {
      assigned: ["C", "F"],
      denials: 1,
      points: 9,
      wishes: [],
    },
  },
];
