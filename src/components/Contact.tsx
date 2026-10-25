import { profile } from "../data/content";
import { portraitSrc } from "./Portrait";
import { ArrowUpRight, GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-white/[0.07]">
      <div
        className="absolute left-1/2 top-0 -z-10 h-[26rem] w-[50rem] -translate-x-1/2 rounded-full bg-signal-500/[0.08] blur-[110px]"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          {portraitSrc && (
            <img
              src={portraitSrc}
              alt={`Portrait of ${profile.name}`}
              width={96}
              height={96}
              loading="lazy"
              className="mx-auto mb-7 h-24 w-24 rounded-full border border-signal-500/40 object-cover object-[50%_22%] shadow-lg shadow-slate-900/10 ring-4 ring-signal-500/15"
            />
          )}
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal-400">
            <span className="text-ink-500">07</span> &nbsp;/&nbsp; Contact
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Let’s talk security.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
            Hiring for a SOC or security team, working on detection or automation, or just want to compare lab
            notes? email or LinkedIn is the best way to reach me — and my code lives on GitHub.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href={`mailto:${profile.email}`}
            className="group rounded-2xl border border-white/10 bg-ink-900/80 p-7 transition hover:-translate-y-0.5 hover:border-signal-500/50 hover:bg-ink-850"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-signal-400/10 text-signal-400 ring-1 ring-inset ring-signal-500/30">
                <MailIcon className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-signal-300" />
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold text-white">Email</h3>
            <p className="mt-1 text-sm text-slate-400">Opportunities, collaboration and questions.</p>
            <p className="mt-4 break-all font-mono text-xs text-signal-400">{profile.email}</p>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-ink-900/80 p-7 transition hover:-translate-y-0.5 hover:border-signal-500/50 hover:bg-ink-850"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0a66c2]/10 text-[#0a66c2] ring-1 ring-inset ring-[#0a66c2]/35 dark:bg-[#0a66c2]/15 dark:text-[#5ea8ee] dark:ring-[#0a66c2]/40">
                <LinkedinIcon className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-signal-300" />
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold text-white">LinkedIn</h3>
            <p className="mt-1 text-sm text-slate-400">Experience, background and direct messages.</p>
            <p className="mt-4 break-all font-mono text-xs text-signal-400">in/pascal-anorue-840465375</p>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-ink-900/80 p-7 transition hover:-translate-y-0.5 hover:border-signal-500/50 hover:bg-ink-850"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.06] text-white ring-1 ring-inset ring-white/15">
                <GithubIcon className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-signal-300" />
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold text-white">GitHub</h3>
            <p className="mt-1 text-sm text-slate-400">Labs, pipelines, detection rules and write-ups.</p>
            <p className="mt-4 break-all font-mono text-xs text-signal-400">@{profile.handle}</p>
          </a>
        </div>
      </div>
    </section>
  );
}
