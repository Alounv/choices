import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Button from "~/components/button";
import InputComponent from "~/components/input";
import type { State } from "~/components/types";

export default component$(() => {
  const state: State = useStore({
    input: {
      wishes: { Alice: ["A", "B"] },
      projects: { A: 1, B: 2 },
    },
    reqDuration: 0,
    inputError: null,
    isLoading: false,
    results: [],
  });

  return (
    <div class="flex flex-col gap-3">
      <h2>Please enter your wishes and projects</h2>
      <InputComponent state={state} />
      <Button state={state} />

      <h2>Results</h2>
      <div>
        {state.isLoading
          ? "LOADING..."
          : `Request duration: ${state.reqDuration}ms`}
      </div>
      <div>{state.results.length > 0 && JSON.stringify(state.results)}</div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Project Choice",
  meta: [
    {
      name: "description",
      content:
        "Project Choice is a tool to fairly assign projects to participants",
    },
  ],
};
