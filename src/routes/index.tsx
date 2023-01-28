import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Input from "~/components/input";

export default component$(() => {
  return (
    <div>
      <h2 class="bg-red">Please enter your wishes and projects</h2>

      <Input />

      <h2>Results</h2>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Project Choice",
  meta: [
    {
      name: "description",
      content:
        "Project Choice is a tool to fairly assign projects to participants",
    },
  ],
};
