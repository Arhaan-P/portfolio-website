import { site } from "@/data/site"

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
