export function ProjectPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase()

  return (
    <div
      aria-hidden
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-[linear-gradient(135deg,_var(--color-secondary)_0%,_var(--color-background)_100%)]"
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <span className="relative font-mono text-4xl font-semibold tracking-wide text-muted-foreground/40">
        {initials}
      </span>
    </div>
  )
}
