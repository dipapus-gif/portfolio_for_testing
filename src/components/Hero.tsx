import { profile } from "../data/content";
import { HeroPhoto } from "./Portrait";
import { GithubIcon, LinkedinIcon, ShieldIcon } from "./Icons";

const socials = [
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.github, label: "GitHub", Icon: GithubIcon },
  { href: profile.sentinel, label: "SOC Sentinel (live site)", Icon: ShieldIcon },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-r from-ink-950 to-ink-850"
    >
      {/* dark theme only: faint grid; both themes: soft glow behind the photo */}
      <div className="absolute inset-0 -z-10 hidden bg-grid dark:block" aria-hidden />
      <div
        className="absolute bottom-0 right-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-signal-400/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl px-5 sm:px-8 lg:min-h-[100svh] lg:grid-cols-2 lg:gap-6">
        {/* copy */}
        <div className="flex flex-col justify-center pb-12 pt-32 lg:py-28 lg:pr-6">
          <h1 className="animate-fade-up text-balance text-[2.1rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl">
            Hi, I’m <span className="text-signal-400">{profile.short}</span>
          </h1>
          <p className="animate-fade-up anim-d1 mt-3 text-balance text-2xl font-bold leading-snug text-slate-200 sm:text-[1.9rem]">
            SOC Analyst &amp; Pentester
          </p>
          <p className="animate-fade-up anim-d2 mt-5 max-w-lg text-base leading-relaxed text-slate-400">
            AI-driven cybersecurity enthusiast working across IT/OT, SOC operations and offensive security. I
            build SIEM labs, attack them, and automate the response. I’ve also shipped my own SOC platform and
            an AI malware-triage pipeline.
          </p>

          <div className="animate-fade-up anim-d3 mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-signal-400 px-8 py-3 text-sm font-medium text-on-accent shadow-md shadow-signal-400/25 transition hover:bg-signal-300"
            >
              Hire Me
            </a>
            <a
              href="#projects"
              className="inline-flex items-center rounded-lg border-2 border-signal-400 px-[1.875rem] py-2.5 text-sm font-medium text-signal-400 transition hover:bg-signal-400 hover:text-on-accent"
            >
              See Projects
            </a>
          </div>

          <ul className="animate-fade-up anim-d4 mt-10 flex items-center gap-4 lg:absolute lg:bottom-10 lg:left-8 lg:mt-0">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-signal-400 text-signal-400 transition hover:bg-signal-400 hover:text-on-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* photo — sits on the bottom edge and bleeds off it */}
        <div className="animate-fade-up anim-d2 flex items-end justify-center lg:justify-end">
          <HeroPhoto />
        </div>
      </div>
    </section>
  );
}
