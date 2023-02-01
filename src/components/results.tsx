import {
  component$,
  useClientEffect$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { ResultsCtx } from "~/routes";
import { ResultsNavigator } from "./navigator";
import { UserResult } from "./user-result";

export const ResultsDisplay = component$(() => {
  const inputStore = useContext(ResultsCtx);
  const { error, reqDuration, isLoading, results } = inputStore;
  const stepIndex = useSignal<number>(0);
  const currentStep = results[stepIndex.value] || {};
  const users = Object.keys(currentStep);

  useClientEffect$(({ track }) => {
    const { results } = track(inputStore);
    stepIndex.value = 0;
    const timer = setInterval(() => {
      if (stepIndex.value >= results.length - 1) {
        clearInterval(timer);
      } else {
        stepIndex.value++;
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <h2>Results</h2>
      <div>
        {isLoading ? `Loading...` : `Request duration: ${reqDuration}ms`}
        {error && <div class="text-red-500">{error.message}</div>}
      </div>

      <ResultsNavigator stepIndex={stepIndex} resultsCount={results.length} />

      {results.length > 0 && (
        <ul class="flex flex-col gap-4">
          {users.map((name) => (
            <UserResult key={name} name={name} currentStep={currentStep} />
          ))}
        </ul>
      )}
    </>
  );
});
