import { focusAreas } from "../data/content";
import SectionHeading from "./SectionHeading";
import { BoltIcon, FactoryIcon, ShieldIcon, TerminalIcon } from "./Icons";

const icons = {
  shield: ShieldIcon,
  terminal: TerminalIcon,
  bolt: BoltIcon,
  factory: FactoryIcon,
} as const;

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeading index="01" eyebrow="About" title="I learn security by building it." />

          <figure className="mt-10 rounded-xl border border-signal-500/20 bg-signal-500/[0.05] p-6">
            <blockquote className="font-display text-xl font-medium leading-snug text-white">
              “Raw log noise isn’t detection — correlation is.”
            </blockquote>
            <figcaption className="mt-3 font-mono text-xs text-slate-500">
              — takeaway from my Wazuh SIEM home lab
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-5 text-base leading-relaxed text-slate-400 sm:text-[17px]">
            <p>
              My GitHub is a running record of how I work: I deploy a SIEM — Splunk, Wazuh — attack my own lab
              machines, study exactly what that activity looks like in the telemetry, and then write the
              detections that would catch it.
            </p>
            <p>
              From there I look for the repetitive parts of the job and automate them. An alert comes in, the
              hash is enriched against VirusTotal, an LLM drafts the assessment, a ticket is opened and my
              phone buzzes — so the analyst’s time goes to the decisions that actually matter.
            </p>
            <p>
              Two builds sum that up. <a href="#sentinel" className="font-medium text-signal-300 underline decoration-signal-500/40 underline-offset-4 hover:decoration-signal-300">SOC Sentinel</a> is
              a live platform I designed and deployed that puts scanning, ATT&amp;CK mapping, incident response
              and an AI co-pilot in one dashboard. The{" "}
              <a href="#pipeline" className="font-medium text-signal-300 underline decoration-signal-500/40 underline-offset-4 hover:decoration-signal-300">AI n8n triage pipeline</a>{" "}
              turns a raw malware alert into an AI-written report, a Trello ticket and a phone notification.
            </p>
            <p>
              I’m particularly interested in how AI can sharpen SOC work, and in the overlap between
              traditional IT security and operational technology.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {focusAreas.map((f) => {
              const Icon = icons[f.icon];
              return (
                <div
                  key={f.title}
                  className="group rounded-xl border border-white/[0.08] bg-ink-900/70 p-5 transition hover:border-signal-500/40 hover:bg-ink-850"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-signal-500/10 text-signal-400 ring-1 ring-inset ring-signal-500/20 transition group-hover:bg-signal-500/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
