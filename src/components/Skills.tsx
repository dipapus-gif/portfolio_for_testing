import { skillGroups } from "../data/content";
import SectionHeading from "./SectionHeading";
import { BoltIcon, LayersIcon, ShieldIcon, TerminalIcon } from "./Icons";

const icons = {
  layers: LayersIcon,
  terminal: TerminalIcon,
  bolt: BoltIcon,
  shield: ShieldIcon,
} as const;

export default function Skills() {
  return (
    <section id="skills" className="border-t border-white/[0.07] bg-section">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          index="06"
          eyebrow="Toolkit"
          title="What I work with."
          subtitle="The tools and telemetry sources that show up across my platform, pipelines, labs and write-ups."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((g) => {
            const Icon = icons[g.icon];
            return (
              <div
                key={g.title}
                className="rounded-2xl border border-white/[0.08] bg-ink-900/70 p-6 transition hover:border-signal-500/30 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-signal-500/10 text-signal-400 ring-1 ring-inset ring-signal-500/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{g.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-white/[0.08] bg-ink-950/60 px-3 py-1.5 font-mono text-xs text-slate-300 transition hover:border-signal-500/40 hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
