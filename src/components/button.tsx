import { component$, useContext } from "@builder.io/qwik";
import { InputCtx, ResultsCtx } from "~/routes";
import type { Input, Step } from "./types";

export async function getSteps(
  input: Pick<Input, "projects" | "wishes">,
  controller?: AbortController
): Promise<{ steps: Step[] }> {
  const resp = await fetch(`api/choices`, {
    signal: controller?.signal,
    method: "POST",
    body: JSON.stringify(input),
  });

  return resp.json();
}

export default component$(() => {
  const state = useContext(ResultsCtx);
  const { error: inputError, wishes, projects } = useContext(InputCtx);
  return (
    <div
      class={`flex align-center ${
        inputError ? "justify-between" : "justify-end"
      }`}
    >
      {inputError && <div class="text-red-500">{inputError.message}</div>}
      <button
        disabled={!!inputError || state.isLoading}
        class="self-end disabled:opacity-50 bg-orange-500 enabled:hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick$={async () => {
          state.isLoading = true;
          const time = Date.now();
          try {
            const data = await getSteps({ wishes, projects });
            state.results = data.steps;
          } catch (e) {
            state.error = e as Error;
          }
          state.reqDuration = Date.now() - time;
          state.isLoading = false;
        }}
      >
        Calculate
      </button>
    </div>
  );
});
