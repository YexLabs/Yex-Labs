"use client"

import React from "react"
import Link from "next/link"
import navBarStyles from "./NavBar.module.css"
import ListIcon from "../../public/list.svg"
import Logo from "@/public/yexlabs-logo-v2.svg"

const menuItems = [
  {
    text: "Services",
    link: "/#services"
  },
  {
    text: "Contact",
    link: "/contact"
  }
]

export default function NavBar({ hideLogo = false }: { hideLogo?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <div className={navBarStyles.outerContainer}>
      <div
        className="sectionContainer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "50px"
        }}
      >
        {hideLogo ? (
          <div></div>
        ) : (
          <Link href="/" style={{ maxHeight: "44px" }}>
            <Logo
              style={{
                width: "160px",
                height: "auto",
                color: "var(--text-secondary)"
              }}
            />
          </Link>
        )}
        <div className={navBarStyles.menuButtons}>
          {menuItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className={`button3 ${navBarStyles.menuItem}`}
            >
              {item.text}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className={navBarStyles.mobileMenu}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <ListIcon className={navBarStyles.listIcon} />
        </button>
      </div>
      {isMobileMenuOpen ? (
        <div className={`sectionContainer ${navBarStyles.mobileMenuPanel}`}>
          {menuItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className={`button3 ${navBarStyles.mobileMenuItem}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.text}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
