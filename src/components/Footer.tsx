import { profile } from "../data/content";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="font-mono text-xs text-slate-500">
          © {new Date().getFullYear()} {profile.name}
          <span aria-hidden className="mx-2 text-ink-500">·</span>
          built with React &amp; Tailwind
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#top"
            className="font-mono text-xs text-slate-500 transition hover:text-signal-300"
          >
            back to top ↑
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-slate-500 transition hover:text-white"
          >
            <MailIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-500 transition hover:text-white"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-500 transition hover:text-white"
          >
            <LinkedinIcon className="h-[17px] w-[17px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
