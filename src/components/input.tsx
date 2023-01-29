import { component$ } from "@builder.io/qwik";
import type { State } from "./types";

export default component$(({ state }: { state: State }) => {
  return (
    <>
      <h2>Please enter your wishes and projects</h2>
      <textarea
        value={JSON.stringify(state.input)}
        rows={10}
        class="w-full bg-slate-100 p-2 border-2 rounded-md"
        onInput$={(ev) => {
          const stringState = (ev.target as HTMLInputElement).value;
          try {
            state.inputError = null;
            state.input = JSON.parse(stringState);
          } catch (e) {
            state.inputError = e as Error;
          }
        }}
      />
    </>
  );
});
