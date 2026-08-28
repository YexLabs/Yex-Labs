import Image from "next/image"
import Figure from "../components/Figure"
import { gapSection } from "../data/content"
import styles from "./FigureSplit.module.css"

/** Fig. 1 — the problem, stated on paper. */
export default function GapFigure() {
  return (
    <section className="section" aria-labelledby="gap-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.copy}>
          <p className="label">
            <span className="labelTick" aria-hidden="true" />
            {gapSection.label}
          </p>
          <h2 id="gap-title" className={styles.title}>
            {gapSection.title}
          </h2>
          <div className={styles.body}>
            {gapSection.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className={styles.systems}>
            {gapSection.systems.map((system) => (
              <li key={system}>{system}</li>
            ))}
          </ul>
        </div>

        <Figure caption={gapSection.caption}>
          <Image
            src="/art/fig-1-isolated-systems.svg"
            alt="Six disconnected systems: Till, Rota, Invoices, Inbox, Bookings, and Reviews."
            width={1200}
            height={900}
            className={styles.diagram}
          />
        </Figure>
      </div>
    </section>
  )
}
