import { component$, useStore } from "@builder.io/qwik";

export default component$(() => {
  const state = useStore({
    input: {
      wishes: { Alice: ["A", "B"] },
      projects: { A: 1, B: 2 },
    },
  });

  return (
    <textarea
      value={JSON.stringify(state.input)}
      onInput$={(ev) => {
        const stringState = (ev.target as HTMLInputElement).value;
        state.input = JSON.parse(stringState);
      }}
    />
  );
});
