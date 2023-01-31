import {
  component$,
  createContext,
  useClientEffect$,
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
export const DEFAULT_STORE = {
  projects: INITIAL_PROJECTS,
  wishes: INITIAL_WISHES,
  error: null,
};

export const getLocallyStoredStore = (): Input | null => {
  try {
    const localStore = JSON.parse(
      localStorage.getItem("project-choice-input") || ""
    );
    return localStore;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default component$(() => {
  const inputStore = useStore<Input>(DEFAULT_STORE);

  useClientEffect$(() => {
    const locallyStoredStore = getLocallyStoredStore();
    if (locallyStoredStore) {
      const { projects, wishes } = locallyStoredStore;
      inputStore.projects = projects;
      inputStore.wishes = wishes;
    }
  });

  useClientEffect$(({ track }) => {
    track(inputStore);
    localStorage.setItem("project-choice-input", JSON.stringify(inputStore));
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
