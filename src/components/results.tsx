import { component$ } from "@builder.io/qwik";
import type { State } from "~/components/types";

export default component$(({ state }: { state: State }) => {
  return (
    <>
      <h2>Results</h2>
      <div>
        {state.isLoading
          ? "LOADING..."
          : `Request duration: ${state.reqDuration}ms`}
      </div>
      <div>{state.results.length > 0 && JSON.stringify(state.results)}</div>
    </>
  );
});
