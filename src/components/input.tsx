import { component$, useContext } from "@builder.io/qwik";
import { InputCtx } from "~/routes";
import { ProjectsInput } from "./projects-input";
import type { Input } from "./types";

export const InputArea = component$(() => {
  const state = useContext<Input>(InputCtx);
  const { projects } = state;
  const sortedProjects = Object.entries(projects);
  sortedProjects.sort(([A], [B]) => A.localeCompare(B));
  return (
    <>
      <h2>Please enter your wishes and projects</h2>

      <ProjectsInput />

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
