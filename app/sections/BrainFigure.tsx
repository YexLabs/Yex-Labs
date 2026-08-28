import Image from "next/image"
import Figure from "../components/Figure"
import { brainSection } from "../data/content"
import styles from "./FigureSplit.module.css"

/**
 * Fig. 2 — the answer, on the dark punctuation surface. This and the hero are
 * the only two ink sections on the page; the contrast is what makes the
 * argument land.
 */
export default function BrainFigure() {
  return (
    /* GIC's atmospheric card: the ink surface is an inset 24px plate inside the
       paper canvas, not a full-bleed band. */
    <section id="brain" className="section" aria-labelledby="brain-title">
      <div className="container">
        <div
          className={`onAccent atmospheric ${styles.onAccent} ${styles.split} ${styles.reversed}`}
        >
          <div className={styles.copy}>
            <p className="label">
              <span className="labelTick" aria-hidden="true" />
              {brainSection.label}
            </p>
            <h2 id="brain-title" className={styles.title}>
              {brainSection.title}
            </h2>
            <div className={styles.body}>
              {brainSection.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className={styles.points}>
              {brainSection.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <Figure caption={brainSection.caption} onAccent>
            <Image
              src="/art/fig-2-company-brain.svg"
              alt="The same six systems wired into a central company brain."
              width={1200}
              height={900}
              className={styles.diagram}
            />
          </Figure>
        </div>
      </div>
    </section>
  )
}
