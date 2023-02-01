import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export const ResultsNavigator = component$(
  ({
    stepIndex,
    resultsCount,
  }: {
    stepIndex: Signal<number>;
    resultsCount: number;
  }) => {
    const steps = Array(resultsCount).fill(0);
    return (
      <div>
        {steps.map((_, index) => {
          const isSelected = index === stepIndex.value;
          return (
            <label class="p-2">
              <input
                type="radio"
                value={index}
                checked={isSelected}
                onClick$={() => {
                  stepIndex.value = index;
                }}
              />
            </label>
          );
        })}
      </div>
    );
  }
);
