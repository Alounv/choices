import { component$, useContext } from "@builder.io/qwik";
import { InputCtx } from "~/routes";
import type { Input } from "./types";

export const ProjectsInput = component$(() => {
  const state = useContext(InputCtx);
  const { projects } = state;
  const sortedProjects = Object.entries(projects);
  sortedProjects.sort(([A], [B]) => A.localeCompare(B));

  return (
    <>
      {sortedProjects.map(([name, value]) => (
        <Project key={name} name={name} value={value} />
      ))}
      <button
        class="bg-slate-400 text-white p-2 rounded-md self-start"
        onClick$={() => {
          state.projects = {
            ...state.projects,
            [`New Project (${sortedProjects.length + 1})`]: 1,
          };
        }}
      >
        Add project
      </button>
    </>
  );
});

export const Project = component$(
  ({ name, value }: { name: string; value: number }) => {
    const state = useContext<Input>(InputCtx);
    const { projects } = state;

    return (
      <div class="flex gap-2">
        <input
          type="text"
          value={name}
          onChange$={(event) => {
            const newName = event.target.value;
            delete projects[name];
            projects[newName] = value;
            state.projects = { ...projects };
          }}
          class="flex-1 bg-slate-100 p-2 border-2 rounded-md"
        />
        <input
          type="number"
          value={value}
          onChange$={(event) => {
            const newValue = parseInt(event.target.value);
            projects[name] = newValue;
            state.projects = { ...projects };
          }}
          class="w-16 bg-slate-100 p-2 border-2 rounded-md"
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
