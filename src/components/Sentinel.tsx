import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { attackTactics, profile, sentinel, type SentinelIcon } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/useInView";
import SectionHeading from "./SectionHeading";
import {
  ArrowUpRight,
  BugIcon,
  FileTextIcon,
  GridIcon,
  PlugIcon,
  RadarIcon,
  SearchIcon,
  ShieldIcon,
  SparklesIcon,
  TerminalIcon,
} from "./Icons";

const icons: Record<SentinelIcon, typeof SearchIcon> = {
  search: SearchIcon,
  bug: BugIcon,
  grid: GridIcon,
  file: FileTextIcon,
  plug: PlugIcon,
  terminal: TerminalIcon,
  radar: RadarIcon,
  sparkles: SparklesIcon,
};

function BrowserFrame() {
  return (
    <figure>
      <a
        href={profile.sentinel}
        target="_blank"
        rel="noreferrer"
        aria-label="Open the live SOC Sentinel site in a new tab"
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-slate-900/15 ring-1 ring-signal-500/10 dark:shadow-black/60 transition duration-300 hover:-translate-y-0.5 hover:ring-signal-500/40"
      >
        <div className="flex items-center gap-3 border-b border-white/[0.07] bg-ink-850 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-500/70" />
          </div>
          <span className="mx-auto flex min-w-0 max-w-sm flex-1 items-center justify-center gap-2 truncate rounded-md bg-ink-950 px-3 py-1 font-mono text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-400" />
            <span className="truncate">{profile.sentinelHost}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-signal-300" />
        </div>
        <img
          src={sentinel.shot}
          alt="Screenshot of the SOC Sentinel landing page: the headline 'One platform for vulnerability scanning, threat detection and incident response' with ATT&CK, technique, port and AI co-pilot statistics"
          width={1200}
          height={891}
          loading="lazy"
          className="block h-auto w-full"
        />
      </a>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-slate-500">
        ↑ the live landing page. Click to open it.
      </figcaption>
    </figure>
  );
}

function AttackMatrix() {
  const reduced = usePrefersReducedMotion();
  const [hot, setHot] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setHot((h) => (h + 1) % attackTactics.length), 1100);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="mt-20 overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/70 p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal-400">MITRE ATT&amp;CK®</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
            Speak the same language as every red team.
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-400">
            Every alert, scan finding and incident can be tagged with real ATT&amp;CK technique IDs, from
            Reconnaissance (T1595) through Impact (T1486), with built-in detection and mitigation guidance so
            analysts know what to do next.
          </p>
        </div>
        <ul className="space-y-2 text-sm text-slate-300 lg:col-span-5">
          {[
            "14 enterprise tactics, 60+ techniques bundled in-app",
            "One-click tagging of incidents with ATT&CK IDs",
            "AI co-pilot explains any technique in plain language",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-400" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <ol className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-7">
        {attackTactics.map((t, i) => {
          const on = i === hot;
          return (
            <li
              key={t.id}
              onMouseEnter={() => setHot(i)}
              className={cn(
                "rounded-lg border px-3 py-3 transition-colors duration-500",
                on
                  ? "border-signal-400/60 bg-signal-400/10"
                  : "border-white/[0.07] bg-ink-950/60"
              )}
            >
              <span className={cn("block font-mono text-[10px]", on ? "text-signal-300" : "text-ink-500")}>
                {t.id}
              </span>
              <span
                className={cn(
                  "mt-1 block text-[12px] font-medium leading-tight",
                  on ? "text-white" : "text-slate-400"
                )}
              >
                {t.name}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Sentinel() {
  const [activeId, setActiveId] = useState(sentinel.features[0].id);
  const index = Math.max(
    0,
    sentinel.features.findIndex((f) => f.id === activeId)
  );
  const f = sentinel.features[index];
  const FeatureIcon = icons[f.icon];

  return (
    <section id="sentinel" className="border-t border-white/[0.07] bg-section">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          index="02"
          eyebrow="Built by me · live product"
          title="SOC Sentinel: my AI-powered security operations platform."
          subtitle="Not just a lab. A deployed web platform I designed and built to put scanning, detection, ATT&CK mapping, incident response and an AI co-pilot in one place."
        />

        {/* hero row */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-signal-500/30 bg-signal-500/10 px-3 py-1 font-mono text-xs text-signal-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-signal-400 animate-ping-soft" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-400" />
                </span>
                Live on Netlify
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-slate-400">
                Designed · built · deployed by me
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl font-semibold leading-snug text-white">
              {sentinel.tagline}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-400 sm:text-base">{sentinel.pitch}</p>
            <p className="mt-3 font-mono text-xs text-signal-400">{sentinel.audience}</p>

            <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08]">
              {sentinel.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end bg-ink-950 px-4 py-4">
                  <dt className="mt-1 text-xs text-slate-500">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-tight text-white">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={profile.sentinel}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-signal-400 px-5 py-3 text-sm font-semibold text-on-accent shadow-lg shadow-signal-500/20 transition hover:bg-signal-300"
              >
                Visit SOC Sentinel
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`${profile.sentinel}/dashboard`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-signal-500/50 hover:bg-white/[0.06]"
              >
                Launch dashboard
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">The dashboard sits behind a sign-in. Create an account to explore it.</p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {sentinel.stack.map((t) => (
                <li key={t} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-slate-400">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <BrowserFrame />
          </div>
        </div>

        {/* feature explorer */}
        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Everything a modern SOC needs.
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-400">
            From external attack-surface scanning to AI-assisted incident response, built around SOC, red team
            and bug bounty workflows. Pick a module.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-12">
            <div
              role="tablist"
              aria-label="SOC Sentinel modules"
              aria-orientation="vertical"
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1"
            >
              {sentinel.features.map((x, i) => {
                const Icon = icons[x.icon];
                const on = x.id === activeId;
                return (
                  <button
                    key={x.id}
                    role="tab"
                    id={`sentinel-tab-${x.id}`}
                    aria-selected={on}
                    aria-controls="sentinel-panel"
                    onClick={() => setActiveId(x.id)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                      on
                        ? "border-signal-500/50 bg-signal-500/[0.08]"
                        : "border-white/[0.08] bg-ink-900/60 hover:border-white/20"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-lg ring-1 ring-inset transition",
                        on
                          ? "bg-signal-400 text-on-accent ring-signal-400"
                          : "bg-white/[0.04] text-slate-400 ring-white/10 group-hover:text-white"
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] text-slate-400">0{i + 1}</span>
                      <span className={cn("block text-sm font-semibold leading-snug", on ? "text-white" : "text-slate-300")}>
                        {x.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              key={f.id}
              role="tabpanel"
              id="sentinel-panel"
              aria-labelledby={`sentinel-tab-${f.id}`}
              className="animate-fade-up rounded-2xl border border-white/[0.08] bg-ink-900/80 p-6 sm:p-8 lg:col-span-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-signal-500/10 text-signal-300 ring-1 ring-inset ring-signal-500/25">
                  <FeatureIcon className="h-7 w-7" />
                </span>
                <span className="font-mono text-xs text-slate-500">
                  module {String(index + 1).padStart(2, "0")} / {String(sentinel.features.length).padStart(2, "0")}
                </span>
              </div>
              <h4 className="mt-6 font-display text-2xl font-semibold text-white">{f.title}</h4>
              <p className="mt-3 text-base leading-relaxed text-slate-400">{f.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {f.chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-lg border border-signal-500/20 bg-signal-500/[0.06] px-3 py-1.5 font-mono text-xs text-signal-200"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setActiveId(
                      sentinel.features[(index - 1 + sentinel.features.length) % sentinel.features.length].id
                    )
                  }
                  className="font-mono text-xs text-slate-400 transition hover:text-white"
                >
                  ← previous
                </button>
                <button
                  type="button"
                  onClick={() => setActiveId(sentinel.features[(index + 1) % sentinel.features.length].id)}
                  className="font-mono text-xs text-slate-400 transition hover:text-white"
                >
                  next →
                </button>
              </div>
            </div>
          </div>
        </div>

        <AttackMatrix />

        {/* workflow */}
        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            How SOC Sentinel fits your workflow.
          </h3>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sentinel.workflow.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-white/[0.08] bg-ink-900/70 p-6 transition hover:border-signal-500/30"
              >
                <span className="font-mono text-sm text-signal-400">{s.n}</span>
                <h4 className="mt-3 font-display text-lg font-semibold leading-snug text-white">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* responsible use */}
        <div className="mt-10 flex gap-4 rounded-2xl border border-signal-500/20 bg-signal-500/[0.05] p-6 sm:p-7">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-signal-500/15 text-signal-300">
            <ShieldIcon className="h-6 w-6" />
          </span>
          <div>
            <h4 className="font-display text-lg font-semibold text-white">
              Built for authorized, responsible security testing.
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{sentinel.responsibleUse}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
