import { Fragment, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { detections, repo } from "../data/content";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight, CheckIcon, CopyIcon } from "./Icons";

/** Tiny SPL syntax highlighter — enough to make the queries easy to scan. */
function highlight(line: string): ReactNode {
  if (line.trim().startsWith("/*")) {
    return <span className="italic text-slate-500">{line}</span>;
  }
  const re =
    /("[^"]*")|(\|)|(\b[A-Za-z_]+(?==))|(\b(?:rex|bin|stats|where|like|by|count|OR|AND)\b)|(\b\d+(?:\.\d+)?\b)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const [tok, str, pipe, field, kw, num] = m;
    const cls = str
      ? "text-warn"
      : pipe
        ? "text-signal-400 font-semibold"
        : field
          ? "text-info"
          : kw
            ? "text-signal-300"
            : num
              ? "text-danger"
              : "";
    out.push(
      <span key={k++} className={cls}>
        {tok}
      </span>
    );
    last = m.index + tok.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

function CodeBlock({
  label,
  code,
  spl,
  copyable,
}: {
  label: string;
  code: string;
  spl?: boolean;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="force-dark overflow-hidden rounded-xl border border-white/[0.08] bg-ink-950">
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-white/[0.02] px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</span>
        {copyable && (
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            {copied ? <CheckIcon className="h-3.5 w-3.5 text-signal-400" /> : <CopyIcon className="h-3.5 w-3.5" />}
            {copied ? "copied" : "copy"}
          </button>
        )}
      </div>
      <pre className="thin-scroll overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6 text-slate-300">
        <code>
          {code.split("\n").map((line, i) => (
            <Fragment key={i}>
              {spl ? highlight(line) : line}
              {"\n"}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
}

const remediation = [
  { t: "Contain", d: "Disable the rogue accounts and audit local Administrators membership." },
  { t: "Harden detection", d: "Promote the SPL to real-time correlation rules for 4720, 4728, 4732 and 1102." },
  { t: "Protect logs", d: "Restrict wevtutil via GPO and enable command-line process logging (4688)." },
  { t: "Harden Linux", d: "PermitRootLogin no, key-based auth, and monitor for non-root UID 0 accounts." },
];

export default function Detections() {
  const [activeId, setActiveId] = useState(detections[0].id);
  const d = detections.find((x) => x.id === activeId) ?? detections[0];

  return (
    <section id="detections" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <SectionHeading
        index="05"
        eyebrow="Detection engineering"
        title="Attack it. Log it. Detect it."
        subtitle="From my Splunk capstone: four controlled attacks against Windows and Kali endpoints, each paired with the SPL that catches it. Pick a scenario to see the telemetry and the query."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        {/* scenario picker */}
        <div
          role="tablist"
          aria-label="Attack scenarios"
          className="thin-scroll -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {detections.map((x, i) => {
            const on = x.id === activeId;
            return (
              <button
                key={x.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActiveId(x.id)}
                className={cn(
                  "group shrink-0 rounded-xl border px-4 py-3.5 text-left transition lg:shrink",
                  on
                    ? "border-signal-500/50 bg-signal-500/[0.08]"
                    : "border-white/[0.08] bg-ink-900/60 hover:border-white/20"
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-mono text-xs",
                      on ? "text-signal-300" : "text-ink-500 group-hover:text-slate-400"
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className={cn("text-sm font-semibold", on ? "text-white" : "text-slate-300")}>
                    {x.label}
                  </span>
                </span>
                <span className="mt-1.5 flex items-center gap-2 pl-7 font-mono text-[11px] text-slate-500">
                  {x.mitre}
                  <span className="h-1 w-1 rounded-full bg-ink-600" />
                  {x.platform}
                </span>
              </button>
            );
          })}
        </div>

        {/* detail */}
        <div role="tabpanel" className="space-y-4 lg:col-span-8" key={d.id}>
          <div className="animate-fade-up rounded-2xl border border-white/[0.08] bg-ink-900/70 p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-xs font-semibold text-white">
                MITRE {d.mitre}
              </span>
              <span
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-xs font-semibold ring-1 ring-inset",
                  d.severity === "High"
                    ? "bg-danger/10 text-danger ring-danger/30"
                    : "bg-warn/10 text-warn ring-warn/30"
                )}
              >
                {d.severity} severity
              </span>
              <span className="font-mono text-xs text-slate-500">{d.platform}</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-white">{d.technique}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{d.why}</p>
            <p className="mt-4 font-mono text-xs text-slate-500">
              <span className="text-signal-400">telemetry →</span> {d.telemetry}
            </p>
          </div>

          <div className="animate-fade-up anim-d1 grid gap-4 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <CodeBlock label="Simulated in lab" code={d.simulate} />
            </div>
            <div className="xl:col-span-3">
              <CodeBlock label="SPL detection" code={d.spl} spl copyable />
            </div>
          </div>
        </div>
      </div>

      {/* incident report */}
      <div className="mt-14 overflow-hidden rounded-2xl border border-danger/25 bg-gradient-to-br from-danger/[0.07] via-ink-900/60 to-ink-900/60">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <span className="rounded-md bg-danger px-2.5 py-1 font-bold text-on-accent">HIGH</span>
              <span className="text-slate-400">IR-2026-1003-01</span>
              <span className="text-ink-500">·</span>
              <span className="text-signal-400">Contained (lab simulation)</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-white">
              Local admin created, logs wiped — and the evidence survived.
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-400">
              Two accounts were created on host PAPUS and added to Administrators, then{" "}
              <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-slate-200">
                wevtutil cl Security
              </code>{" "}
              erased the local log. Because events were already forwarded to Splunk over TCP 9997, EventCodes
              4720 and 4728 remained in the index — the key finding of the project.
            </p>
            <a
              href={repo("SIEM-Deployment-Capstone")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-signal-300 transition hover:text-white"
            >
              Read the full report on GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500">Remediation plan</p>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {remediation.map((r, i) => (
                <li key={r.t} className="rounded-xl border border-white/[0.08] bg-ink-950/60 p-4">
                  <p className="flex items-center gap-2.5 text-sm font-semibold text-white">
                    <span className="grid h-5 w-5 place-items-center rounded bg-signal-500/15 font-mono text-[11px] text-signal-300">
                      {i + 1}
                    </span>
                    {r.t}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
