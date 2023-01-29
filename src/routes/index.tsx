import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Button from "~/components/button";
import Input from "~/components/input";
import Results from "~/components/results";
import type { State } from "~/components/types";

export default component$(() => {
  const state: State = useStore({
    input: {
      wishes: {
        Alice: ["A", "D", "F", "C", "B", "E"],
        Bob: ["B", "C", "E", "A", "D", "F"],
        Charlie: ["C", "A", "B", "E", "F", "D"],
      },
      projects: {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
      },
    },
    reqDuration: 0,
    inputError: null,
    isLoading: false,
    results: [
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
    ],
  });

  return (
    <div class="flex flex-col gap-3">
      <Input state={state} />
      <Button state={state} />
      <Results state={state} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Project Choice",
  meta: [
    {
      name: "description",
      content: "Project Choice is a tool to assign projects",
    },
  ],
};
