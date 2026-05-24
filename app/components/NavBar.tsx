"use client"

import React from "react"
import Link from "next/link"
import navBarStyles from "./NavBar.module.css"

const menuItems = [
  { text: "Services", link: "/#services" },
  { text: "Clients", link: "/clients" },
  { text: "Approach", link: "/#approach" },
  { text: "Contact", link: "/contact" }
]

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <header className={navBarStyles.outerContainer}>
      <div className={`sectionContainer ${navBarStyles.row}`}>
        <Link href="/" className={navBarStyles.brand} aria-label="YexLabs home">
          <span className={navBarStyles.brandMark}>Y</span>
          <span>
            YexLabs
            <small>Consulting</small>
          </span>
        </Link>

        <nav className={navBarStyles.menuButtons} aria-label="Primary">
          {menuItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className={navBarStyles.menuItem}
            >
              {item.text}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={navBarStyles.desktopCta}>
          Book a consult <span>→</span>
        </Link>

        <button
          type="button"
          className={navBarStyles.mobileMenu}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {isMobileMenuOpen ? (
        <div className={`sectionContainer ${navBarStyles.mobileMenuPanel}`}>
          {menuItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className={navBarStyles.mobileMenuItem}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.text}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  )
}
