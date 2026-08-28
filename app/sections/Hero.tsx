import Link from "next/link"
import DitherField from "../components/DitherField"
import { hero } from "../data/content"
import styles from "./Hero.module.css"

export default function Hero() {
  return (
    /* id="hero" is what NavBar observes for its scrolled state. */
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      {/* Dithered wave field, filling the section behind everything else. */}
      <DitherField />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="label">
            <span className="labelTick" aria-hidden="true" />
            {hero.label}
          </p>

          {/* Two-tone: the sentence opens solid and its continuation drops to
              muted, which is where hierarchy comes from on a light page. */}
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
            <span className="muted">{hero.titleTail}</span>
          </h1>

          <p className={styles.lead}>{hero.lead}</p>

          <div className={styles.actions}>
            <Link href={hero.primaryCta.href} className="action actionSolid">
              {hero.primaryCta.label} <span data-arrow>→</span>
            </Link>
            <Link href={hero.secondaryCta.href} className="action actionGhost">
              {hero.secondaryCta.label}
            </Link>
          </div>

          <p className={styles.footnote}>{hero.footnote}</p>
        </div>
      </div>
    </section>
  )
}
