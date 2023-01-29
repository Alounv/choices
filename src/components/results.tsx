import { component$, useStore } from "@builder.io/qwik";
import type { State } from "~/components/types";

export default component$(({ state }: { state: State }) => {
  const { results, isLoading, reqDuration } = state;
  const local = useStore({ stepIndex: 0 });
  const currentStep = results[local.stepIndex] || {};
  const users = Object.keys(currentStep);
  const firstWishes = users.map((user) => ({
    user,
    project: currentStep[user].wishes[0],
  }));

  return (
    <>
      <h2>Results</h2>
      <div>
        {isLoading ? `Loading...` : `Request duration: ${reqDuration}ms`}
      </div>

      <div>
        {results.map((_, index) => {
          const isSelected = index === local.stepIndex;
          return (
            <label class="p-2">
              <input
                type="radio"
                value={index}
                checked={isSelected}
                onClick$={() => {
                  local.stepIndex = index;
                }}
              />
            </label>
          );
        })}
      </div>

      {results.length > 0 && (
        <ul class="flex flex-col gap-4">
          {users.map((name) => {
            const { denials, wishes, points, assigned } = currentStep[name];
            wishes.reverse();
            return (
              <li class="flex gap-2 items-center">
                <span class="font-bold">{name}</span>
                <span> {Array(points).fill("⚬").join("")}</span>
                <span class="text-xs">
                  {Array(denials).fill("🚫").join("")}
                </span>
                <span class="flex-1" />
                {wishes.map((w, i) => {
                  const isLast = i === wishes.length - 1;
                  const otherFirstWishes = firstWishes
                    .filter((l) => l.user !== name)
                    .map((l) => l.project);
                  const isDisputed = isLast && otherFirstWishes.includes(w);
                  return (
                    <span
                      class={`border-2 px-1 ${isLast ? "font-bold" : ""} ${
                        isDisputed ? "border-red-700 bg-red-700 text-white" : ""
                      } `}
                    >
                      {w}
                    </span>
                  );
                })}
                <span> ➡️ </span>
                {assigned.map((a) => {
                  return (
                    <span
                      class={`border-2 text-white px-1 border-sky-500 bg-sky-500`}
                    >
                      {a}
                    </span>
                  );
                })}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
});
