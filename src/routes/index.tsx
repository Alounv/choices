import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Button from "~/components/button";
import Input from "~/components/input";
import Results from "~/components/results";
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
