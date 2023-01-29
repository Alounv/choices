import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header";
import GithubLogo from "../components/icons/gihub";

export default component$(() => {
  return (
    <div class="bg-slate-200 min-h-full p-4 pt-16">
      <div class=" max-w-2xl m-auto">
        <main>
          <Header />
          <section class="bg-white p-4">
            <Slot />
          </section>
        </main>
        <footer class="mt-4">
          <a
            class="flex items-center justify-center gap-2"
            href="https://github.com/Alounv/project-choice"
            target="_blank"
          >
            Github
            <GithubLogo className="h-4 w-4" />
          </a>
        </footer>
      </div>
    </div>
  );
});
