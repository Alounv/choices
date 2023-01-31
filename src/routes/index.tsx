import {
  component$,
  createContext,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { SubmitButton } from "~/components/button";
import { InputArea } from "~/components/input";
import { ResultsDisplay } from "~/components/results";
import { INITIAL_PROJECTS, INITIAL_WISHES } from "~/data/input";
import type { Input, Results } from "~/types";

export const InputCtx = createContext<Input>("input-context");
export const ResultsCtx = createContext<Results>("results-context");

export default component$(() => {
  const inputStore = useStore<Input>({
    projects: INITIAL_PROJECTS,
    wishes: INITIAL_WISHES,
    error: null,
  });
  useContextProvider(InputCtx, inputStore);

  const resultStore = useStore<Results>({
    reqDuration: 0,
    results: [],
    isLoading: false,
    error: null,
  });
  useContextProvider(ResultsCtx, resultStore);

  return (
    <div class="flex flex-col gap-4">
      <InputArea />
      <SubmitButton />
      <ResultsDisplay />
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
