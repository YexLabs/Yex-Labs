import Image from "next/image"
import SectionHead from "../components/SectionHead"
import { deploymentSection } from "../data/content"
import styles from "./Deployment.module.css"

export default function Deployment() {
  return (
    <section
      id="deployment"
      className={`section ${styles.section}`}
      aria-labelledby="deployment-title"
    >
      {/* Washed-back ground for the section. Gives the lower-left, where the
          sticky plate runs out before the steps do, something to be. */}
      <Image
        src="/art/backdrop.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.backdrop}
      />
      <div className={styles.backdropFade} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <SectionHead
          id="deployment-title"
          label={deploymentSection.label}
          title={deploymentSection.title}
          lead={deploymentSection.lead}
        />

        <div className={styles.grid}>
          <div className={styles.plateCol}>
            <Image
              src="/art/deployment.jpg"
              alt="An engineer at work on site, surrounded by the real mess of the job."
              width={1600}
              height={1200}
              className={styles.plate}
            />
          </div>

          <div className={styles.steps}>
            {deploymentSection.steps.map((step) => (
              <article key={step.n} className={styles.step}>
                <div className={styles.n}>{step.n}</div>
                <div>
                  <h3 className={styles.name}>{step.name}</h3>
                  <p className={styles.body}>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
