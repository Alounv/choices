import { component$, useContext } from "@builder.io/qwik";
import { InputCtx } from "~/routes";
import type { Input } from "./types";

export default component$(() => {
  const state = useContext<Input>(InputCtx);
  const { projects } = state;
  const sortedProjects = Object.entries(projects);
  sortedProjects.sort(([A], [B]) => A.localeCompare(B));
  return (
    <>
      <h2>Please enter your wishes and projects</h2>

      {sortedProjects.map(([name, value]) => (
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
              console.log(state.projects);
            }}
            class="p-2 font-bold text-red-500"
          >
            X
          </button>
        </div>
      ))}

      <textarea
        value={JSON.stringify(state.wishes)}
        rows={10}
        class="w-full bg-slate-100 p-2 border-2 rounded-md"
        onInput$={(ev) => {
          const stringState = (ev.target as HTMLInputElement).value;
          try {
            state.error = null;
            state.wishes = JSON.parse(stringState);
          } catch (e) {
            state.error = e as Error;
          }
        }}
      />
    </>
  );
});
