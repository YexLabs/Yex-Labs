"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import LocalClock from "./LocalClock"
import styles from "./NavBar.module.css"

const menuItems = [
  { text: "Brain", href: "/#brain" },
  { text: "Modules", href: "/#modules" },
  { text: "Deployment", href: "/#deployment" },
  { text: "Work", href: "/clients" }
]


export default function NavBar() {
  /* The hero no longer sits under the bar, so there is nothing to measure
     against: the pill is weightless at the top of any page and firms up the
     moment the page moves. One rule, correct on every route.

     A scroll listener rather than IntersectionObserver — the observer only
     fires while the page is actually rendering, which strands the bar in its
     initial state in background tabs and during prerender. */
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 4)
    sync()
    window.addEventListener("scroll", sync, { passive: true })
    return () => window.removeEventListener("scroll", sync)
  }, [])

  /* The page is light throughout now, so the pill no longer flips between a
     dark and a light state. It only firms up once it leaves the top. */
  return (
    <header className={styles.header}>
      <div
        className={`glass ${styles.pill} ${scrolled ? styles.raised : ""}`}
      >
        <Link href="/" className={styles.brand} aria-label="Yex Labs home">
          <span className={styles.wordmark}>Yex Labs</span>
          <LocalClock className={styles.clock} />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {menuItems.map((item) => (
            <Link key={item.text} href={item.href} className={styles.link}>
              {item.text}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.cta}>
          Book a deployment <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen ? (
        <div className={`glass ${styles.panel}`}>
          {menuItems.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className={styles.panelLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.text}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`action actionPrimary ${styles.panelCta}`}
            onClick={() => setMenuOpen(false)}
          >
            Book a deployment <span data-arrow>→</span>
          </Link>
        </div>
      ) : null}
    </header>
  )
}
