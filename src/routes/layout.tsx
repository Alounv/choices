import { component$, Slot } from "@builder.io/qwik";
import { GithubLogo } from "~/components/icons/gihub";
import Header from "../components/header";

export default component$(() => {
  return (
    <div class="bg-slate-200 min-h-full">
      <div class="bg-white max-w-2xl m-auto p-4">
        <main>
          <Header />
          <section>
            <Slot />
          </section>
        </main>
        <footer>
          <a href="https://github.com/Alounv/project-choice" target="_blank">
            Github
            <GithubLogo />
          </a>
        </footer>
      </div>
    </div>
  );
});
