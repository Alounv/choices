import {
  component$,
  useClientEffect$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { InputCtx, ResultsCtx } from "~/routes";
import type { Step } from "~/types";
import { ResultsNavigator } from "./navigator";
import { UserResult } from "./user-result";

export const ResultsDisplay = component$(() => {
  const resultStore = useContext(ResultsCtx);
  const { wishes } = useContext(InputCtx);
  const { error, reqDuration, isLoading, results } = resultStore;
  const stepIndex = useSignal<number>(0);

  const initialStep: Step = {};
  Object.entries(wishes).forEach(([user, projects]) => {
    initialStep[user] = {
      denials: 0,
      points: 0,
      assigned: [],
      wishes: projects,
    };
  });

  const currentStep = results[stepIndex.value] || initialStep;
  const users = Object.keys(currentStep);

  useClientEffect$(({ track }) => {
    const { results } = track(resultStore);
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

      <ul class="flex flex-col gap-4">
        {users.map((name) => (
          <UserResult key={name} name={name} currentStep={currentStep} />
        ))}
      </ul>
    </>
  );
});
