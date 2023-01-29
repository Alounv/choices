import { component$ } from "@builder.io/qwik";

export interface Input {
  wishes: Record<string, string[]>;
  projects: Record<string, number>;
}

export interface InputState {
  input: Input;
  error: Error | null;
}

export default component$(({ state }: { state: InputState }) => {
  return (
    <textarea
      value={JSON.stringify(state.input)}
      rows={10}
      class={`w-full bg-slate-100 p-2 border-2${
        state.error ? "border-red-500 border-2 rounded-sm" : ""
      }`}
      onInput$={(ev) => {
        const stringState = (ev.target as HTMLInputElement).value;
        try {
          state.error = null;
          state.input = JSON.parse(stringState);
        } catch (e) {
          state.error = e as Error;
        }
      }}
    />
  );
});
