import { readout } from "../data/content"
import styles from "./Readout.module.css"

/**
 * Instrument strip. The figures are placeholders — see data/content.ts. The
 * label above the grid says so on the page, and must stay until real numbers
 * from a live deployment replace them.
 */
export default function Readout() {
  return (
    <section className="sectionTight" aria-labelledby="readout-label">
      <div className="container">
        <div className={styles.head}>
          <p id="readout-label" className="label">
            <span className="labelTick" aria-hidden="true" />
            {readout.label}
          </p>
          <span className={styles.rule} aria-hidden="true" />
        </div>

        <ul className={styles.grid}>
          {readout.metrics.map((metric) => (
            <li key={metric.unit} className={styles.cell}>
              <span className={styles.value}>{metric.value}</span>
              <span className={styles.unit}>{metric.unit}</span>
              <span className={styles.note}>{metric.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
