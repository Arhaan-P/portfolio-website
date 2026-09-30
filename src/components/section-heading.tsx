import { navLinks } from "@/data/site"

/**
 * Panel header: a mono index matching the section's place in the nav, the title,
 * and a hairline rule. The index and rule are decorative, so the heading's
 * accessible name is just the title. Sections without a nav entry get no index.
 */
export function SectionHeading({
  href,
  title,
  sub,
  align = "start",
  className = "section-head",
}: {
  href?: string
  title: string
  sub?: string
  align?: "start" | "center"
  className?: string
}) {
  const pos = href ? navLinks.findIndex((l) => l.href === href) : -1
  const index = pos >= 0 ? String(pos + 1).padStart(2, "0") : null
  const centered = align === "center"

  return (
    <div className={className}>
      <h2 className={`panel-title ${centered ? "justify-center" : ""}`}>
        {centered && <span aria-hidden className="panel-rule" />}
        {index && (
          <span aria-hidden className="panel-index">
            {index}
          </span>
        )}
        <span>{title}</span>
        <span aria-hidden className="panel-rule" />
      </h2>
      {sub && <p className={`section-sub ${centered ? "mx-auto" : ""}`}>{sub}</p>}
    </div>
  )
}
