import { component$, useContext, useSignal } from "@builder.io/qwik";
import { ResultsCtx } from "~/routes";
import { ResultsNavigator } from "./navigator";
import { UserResult } from "./user-result";

export const ResultsDisplay = component$(() => {
  const { error, reqDuration, isLoading, results } = useContext(ResultsCtx);
  const stepIndex = useSignal<number>(0);
  const currentStep = results[stepIndex.value] || {};
  const users = Object.keys(currentStep);

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
            <UserResult name={name} currentStep={currentStep} />
          ))}
        </ul>
      )}
    </>
  );
});
