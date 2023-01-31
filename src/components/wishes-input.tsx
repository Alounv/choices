import { component$, useContext } from "@builder.io/qwik";
import { InputCtx } from "~/routes";
import type { Input } from "./types";

export const WishesInput = component$(() => {
  const state = useContext<Input>(InputCtx);
  const { wishes } = state;
  const sortedUsers = Object.entries(wishes);
  sortedUsers.sort(([A], [B]) => A.localeCompare(B));

  return (
    <>
      <h2>Preferences</h2>

      <div class="flex flex-col gap-1">
        {sortedUsers.map(([user, wishes]) => (
          <Wishes key={user} user={user} userWishes={wishes} />
        ))}

        <button
          class="px-4 py-1 text-blue-500 rounded-md self-start"
          onClick$={() => {
            state.projects = {
              ...state.projects,
              [`New User (${sortedUsers.length + 1})`]: 1,
            };
          }}
        >
          ➕ add user
        </button>
      </div>
    </>
  );
});

export const Wishes = component$(
  ({ user, userWishes }: { user: string; userWishes: string[] }) => {
    const state = useContext<Input>(InputCtx);
    const { wishes } = state;
    const projectsName = Object.keys(state.projects);

    return (
      <div class="flex gap-2">
        <input
          type="text"
          value={user}
          onChange$={(event) => {
            const newUser = event.target.value;
            delete wishes[user];
            wishes[newUser] = userWishes;
            state.wishes = { ...wishes };
          }}
          class="w-32 bg-slate-100 px-2 border-2 rounded-md"
        />
        <input
          type="array"
          value={userWishes.join(" > ")}
          onChange$={(event) => {
            const newWishes = event.target.value
              .split(">")
              .map((wish) => wish.trim())
              .filter((wish) => projectsName.includes(wish));

            if ([...new Set(newWishes)].length !== projectsName.length) {
              state.error = new Error("Please enter all projects");
            }

            wishes[user] = newWishes;
            state.wishes = { ...wishes };
            console.log(wishes);
          }}
          class="flex-1 bg-slate-100 px-2 border-2 rounded-md"
        />
        <button
          onClick$={() => {
            delete wishes[user];
            state.wishes = { ...wishes };
          }}
          class="p-2 font-bold text-red-500"
        >
          X
        </button>
      </div>
    );
  }
);
