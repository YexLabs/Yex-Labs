import Link from "next/link"
import { closing } from "../data/content"
import styles from "./Closing.module.css"

export default function Closing() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="closing-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="label">
            <span className="labelTick" aria-hidden="true" />
            {closing.label}
          </p>
          <h2 id="closing-title" className={styles.title}>
            {closing.title}
          </h2>
        </div>

        <div>
          <p className={styles.body}>{closing.body}</p>
          <div className={styles.actions}>
            <Link href={closing.primaryCta.href} className="action actionSolid">
              {closing.primaryCta.label} <span data-arrow>→</span>
            </Link>
            <a href={closing.secondaryCta.href} className={styles.email}>
              {closing.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
