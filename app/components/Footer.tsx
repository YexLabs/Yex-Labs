import Link from "next/link"
import styles from "./Footer.module.css"

/* PROVISIONAL COPY — see app/data/content.ts. Must not restate the manifesto's
   closing line; the colophon summarises, it does not repeat. */
const STATEMENT = "Intelligence that shows up in person."

const columns = [
  {
    head: "Modules",
    links: [
      { label: "Demand", href: "/#modules" },
      { label: "Labour", href: "/#modules" },
      { label: "Inventory", href: "/#modules" },
      { label: "Cash & margin", href: "/#modules" },
      { label: "Customers", href: "/#modules" },
      { label: "Reporting", href: "/#modules" }
    ]
  },
  {
    head: "Company",
    links: [
      { label: "The brain", href: "/#brain" },
      { label: "Deployment", href: "/#deployment" },
      { label: "Client work", href: "/clients" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    head: "Elsewhere",
    links: [
      { label: "contact@yexlabs.xyz", href: "mailto:contact@yexlabs.xyz" },
      { label: "Writing", href: "https://medium.com/@yexlabs", external: true },
      { label: "X / Twitter", href: "https://twitter.com/yex_labs", external: true }
    ]
  }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.statement}>
        <div className="container">
          <p className={styles.statementText}>{STATEMENT}</p>
        </div>
      </div>

      <div className={`container ${styles.columns}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.wordmark}>
            Yex Labs
          </Link>
          <p className={styles.blurb}>
            Forward-deployed engineering and modular business intelligence for
            local businesses. We sit on top of the systems you already run.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.head} className={styles.col} aria-label={column.head}>
            <p className={styles.colHead}>{column.head}</p>
            {column.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                {...("external" in link && link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {year} Yex Labs</span>
        <span>Toronto · North America</span>
      </div>
    </footer>
  )
}
