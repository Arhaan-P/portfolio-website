"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

import { Magnetic } from "@/components/motion/magnetic"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLenis } from "lenis/react"
import { navLinks, site } from "@/data/site"

export function Nav() {
  const [open, setOpen] = React.useState(false)
  const [activeLink, setActiveLink] = React.useState<string>("#top")
  const [hidden, setHidden] = React.useState(false)
  const { scrollY } = useScroll()
  const lenis = useLenis()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && lenis) {
      e.preventDefault()
      if (href === '#top') {
        lenis.scrollTo(0)
      } else {
        lenis.scrollTo(href)
      }
    }
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  // Intersection Observer to track which section is in view
  React.useEffect(() => {
    if (typeof window === "undefined") return

    const observerOptions = {
      rootMargin: "-20% 0px -80% 0px", // Trigger when element is 20% from top to 80% from bottom
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`
          // Only update if this is a section we track in our nav
          if (navLinks.some((link) => link.href === id) || id === "#top") {
            setActiveLink(id)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections that correspond to nav links
    const sections = document.querySelectorAll("section[id], header[id]")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 z-50 border-b border-border/10 bg-background/50 backdrop-blur-md supports-backdrop-filter:bg-background/40"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="#top"
          onClick={(e) => handleLinkClick(e, "#top")}
          className="font-heading text-sm font-bold tracking-tighter hover:text-primary transition-colors flex items-center gap-2 group"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            {site.name.charAt(0)}
          </span>
          <span className="hidden sm:inline-block">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const isActive = activeLink === link.href
            return (
              <Magnetic key={link.href} intensity={0.1}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none rounded-full ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_0_15px_var(--glow-primary)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </Magnetic>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex rounded-full border-white/10 hover:bg-white/10 hover:glow-sm transition-all"
            nativeButton={false}
            render={<a href={site.resumeUrl} download />}
          >
            Resume
          </Button>
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="glass-card border-l-white/10">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleLinkClick(e, link.href)
                      setOpen(false)
                    }}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none ${
                      activeLink === link.href
                        ? "bg-primary/20 text-primary border border-primary/30 glow-sm"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <a
                  href={site.resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-primary hover:bg-white/5 transition-colors text-center border border-primary/50"
                >
                  Download Resume
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}

