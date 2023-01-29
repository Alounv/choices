import { component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { Input, InputState } from "~/components/input";
import InputComponent from "~/components/input";

type Step = Record<
  string,
  {
    denials: number;
    points: number;
    wishes: string[];
    assigned: string[];
  }
>;

export default component$(() => {
  const input: InputState = useStore({
    input: {
      wishes: { Alice: ["A", "B"] },
      projects: { A: 1, B: 2 },
    },
    error: null,
  });

  const results = useStore<{ steps: Step[] }>({ steps: [] });

  return (
    <div class="flex flex-col gap-3">
      <h2>Please enter your wishes and projects</h2>

      <InputComponent state={input} />

      {input.error && <div class="text-red-500">{input.error.message}</div>}
      <button
        disabled={!!input.error}
        class="self-end disabled:opacity-50 bg-orange-500 enabled:hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick$={async () => {
          const data = await getSteps(input.input);
          results.steps = data;
        }}
      >
        Calculate
      </button>

      <h2>Results</h2>

      <div>{JSON.stringify(results.steps)}</div>
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

export async function getSteps(
  input: Input,
  controller?: AbortController
): Promise<Step[]> {
  const resp = await fetch(`api/choices`, {
    signal: controller?.signal,
    method: "POST",
    body: JSON.stringify(input),
  });

  return resp.json();
}
