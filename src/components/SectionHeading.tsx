interface Props {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ index, eyebrow, title, subtitle }: Props) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-signal-400">
        <span className="text-ink-500">{index}</span>
        <span className="h-px w-8 bg-ink-600" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-400">{subtitle}</p>}
    </div>
  );
}
