import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { usePrefersReducedMotion } from "../hooks/useInView";

interface Line {
  time: string;
  level: number;
  rule: string;
  text: string;
  tag?: string;
}

// Illustrative replay of the SSH brute-force scenario from the Wazuh home lab.
const LINES: Line[] = [
  { time: "22:41:02", level: 3, rule: "5501", text: "PAM: Login session opened." },
  { time: "22:41:09", level: 5, rule: "5503", text: "PAM: User login failed." },
  { time: "22:41:11", level: 5, rule: "5760", text: "sshd: authentication failed." },
  { time: "22:41:12", level: 5, rule: "5760", text: "sshd: authentication failed." },
  { time: "22:41:13", level: 5, rule: "5760", text: "sshd: authentication failed." },
  {
    time: "22:41:14",
    level: 10,
    rule: "5763",
    text: "sshd: brute force trying to get access to the system.",
    tag: "T1110",
  },
];

const levelStyle = (level: number) =>
  level >= 10
    ? "bg-danger/15 text-danger ring-danger/30"
    : level >= 5
      ? "bg-warn/15 text-warn ring-warn/30"
      : "bg-info/15 text-info ring-info/30";

export default function AlertConsole() {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? LINES.length : 0);

  useEffect(() => {
    if (reduced) {
      setCount(LINES.length);
      return;
    }
    const delay = count >= LINES.length ? 5000 : count === 0 ? 900 : 1000;
    const id = window.setTimeout(() => setCount((c) => (c >= LINES.length ? 0 : c + 1)), delay);
    return () => window.clearTimeout(id);
  }, [count, reduced]);

  const alerting = count >= LINES.length;

  return (
    <div
      className="force-dark relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-2xl shadow-slate-900/30 ring-1 ring-signal-500/10 backdrop-blur"
      role="img"
      aria-label="Animated replay of a Wazuh SSH brute-force detection escalating to a level 10 alert"
    >
      {/* scan line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-signal-400/[0.04] to-transparent animate-scan" />

      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-500/70" />
        </div>
        <p className="font-mono text-[11px] text-slate-500">wazuh · lab replay</p>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-signal-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal-400 animate-ping-soft" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-400" />
          </span>
          live
        </span>
      </div>

      <div className="h-[15.5rem] space-y-1.5 overflow-hidden px-4 py-4 font-mono text-[12px] leading-5 sm:text-[12.5px]">
        {LINES.slice(0, count).map((l, i) => (
          <div
            key={`${l.time}-${i}`}
            className={cn(
              "animate-line-in flex items-start gap-2.5 rounded-md px-2 py-1",
              l.level >= 10 && "bg-danger/[0.07]"
            )}
          >
            <span className="shrink-0 text-slate-400">{l.time}</span>
            <span
              className={cn(
                "shrink-0 rounded px-1.5 text-[10.5px] font-semibold ring-1 ring-inset",
                levelStyle(l.level)
              )}
            >
              L{l.level}
            </span>
            <span className="min-w-0 text-slate-300">
              <span className="text-slate-400">{l.rule}</span> {l.text}
              {l.tag && (
                <span className="ml-2 rounded bg-white/5 px-1.5 text-[10.5px] text-slate-400">{l.tag}</span>
              )}
            </span>
          </div>
        ))}
        {count < LINES.length && (
          <div className="flex items-center gap-2 px-2 py-1 text-ink-500">
            <span>{">"}</span>
            <span className="inline-block h-3.5 w-2 bg-signal-400/80 animate-blink" />
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex items-center justify-between gap-3 border-t px-4 py-3 transition-colors duration-500",
          alerting ? "border-danger/30 bg-danger/10" : "border-white/[0.07] bg-white/[0.02]"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid h-7 w-7 place-items-center rounded-md font-mono text-xs font-bold transition-colors duration-500",
              alerting ? "bg-danger text-on-accent" : "bg-ink-700 text-slate-500"
            )}
          >
            !
          </span>
          <div>
            <p className={cn("text-xs font-semibold", alerting ? "text-danger" : "text-slate-500")}>
              {alerting ? "Brute force detected" : "Monitoring authentication events…"}
            </p>
            <p className="font-mono text-[11px] text-slate-500">
              {alerting ? "Rule level 10 · MITRE T1110.001 Password Guessing" : "Correlating failures per source"}
            </p>
          </div>
        </div>
        <span className="hidden font-mono text-[11px] text-slate-500 sm:block">
          {Math.min(count, LINES.length)}/{LINES.length} events
        </span>
      </div>
    </div>
  );
}
