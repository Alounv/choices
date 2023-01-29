import { component$ } from "@builder.io/qwik";
import type { Input, State, Step } from "./types";

export async function getSteps(
  input: Input,
  controller?: AbortController
): Promise<{ steps: Step[] }> {
  const resp = await fetch(`api/choices`, {
    signal: controller?.signal,
    method: "POST",
    body: JSON.stringify(input),
  });

  return resp.json();
}

export default component$(({ state }: { state: State }) => {
  return (
    <div
      class={`flex align-center ${
        state.inputError ? "justify-between" : "justify-end"
      }`}
    >
      {state.inputError && (
        <div class="text-red-500">{state.inputError.message}</div>
      )}
      <button
        disabled={!!state.inputError || state.isLoading}
        class="self-end disabled:opacity-50 bg-orange-500 enabled:hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick$={async () => {
          state.isLoading = true;
          const time = Date.now();
          const data = await getSteps(state.input);
          state.results = data.steps;
          state.reqDuration = Date.now() - time;
          state.isLoading = false;
        }}
      >
        Calculate
      </button>
    </div>
  );
});
