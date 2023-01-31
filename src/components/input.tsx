import { component$ } from "@builder.io/qwik";
import { ProjectsInput } from "./projects-input";
import { WishesInput } from "./wishes-input";

export const InputArea = component$(() => {
  return (
    <>
      <ProjectsInput />
      <WishesInput />
    </>
  );
});
