import { manifesto } from "../data/content"
import styles from "./Manifesto.module.css"

export default function Manifesto() {
  const lines = manifesto.slice(0, -1)
  const closingLine = manifesto[manifesto.length - 1]

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.mark} aria-hidden="true" />
        {lines.map((line) => (
          <p key={line} className={styles.line}>
            {line}
          </p>
        ))}
        <p className={`${styles.line} ${styles.close}`}>{closingLine}</p>
      </div>
    </section>
  )
}
