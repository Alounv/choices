import { component$, useContext } from "@builder.io/qwik";
import { InputCtx } from "~/routes";
import type { Input } from "../types";

export const ProjectsInput = component$(() => {
  const state = useContext(InputCtx);
  const { projects } = state;
  const sortedProjects = Object.entries(projects);
  sortedProjects.sort(([A], [B]) => A.localeCompare(B));

  return (
    <>
      <h2>Projects</h2>

      <div class="flex flex-col gap-1">
        {sortedProjects.map(([name, { description, points }]) => {
          return (
            <Project
              key={name}
              name={name}
              points={points}
              description={description}
            />
          );
        })}

        <button
          class="px-4 py-1 text-blue-500 rounded-md self-start"
          onClick$={() => {
            const projectsCount = sortedProjects.length;
            const name = String.fromCharCode(65 + projectsCount);
            state.projects = {
              ...state.projects,
              [name]: { points: 1, description: "Project Name" },
            };
          }}
        >
          ➕ add project
        </button>
      </div>
    </>
  );
});

export const Project = component$(
  ({
    name,
    description,
    points,
  }: {
    name: string;
    points: number;
    description: string;
  }) => {
    const state = useContext<Input>(InputCtx);
    const { projects } = state;

    return (
      <div class="flex gap-2">
        <label for={name} class="self-center">
          {name}
        </label>
        <input
          id={name}
          type="text"
          value={description}
          onChange$={(e) => {
            projects[name].description = e.target.value;
            state.projects = { ...projects };
          }}
          class="flex-1 bg-slate-50 text-slate-400 px-2 rounded-sm"
        />
        <input
          type="number"
          value={points}
          onChange$={(e) => {
            projects[name].points = parseInt(e.target.value);
            state.projects = { ...projects };
          }}
          class="w-16 bg-slate-50 text-slate-400 px-2 rounded-sm"
        />
        <button
          onClick$={() => {
            delete projects[name];
            state.projects = { ...projects };
          }}
          class="p-2 font-bold text-red-500"
        >
          X
        </button>
      </div>
    );
  }
);
