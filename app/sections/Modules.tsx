import SectionHead from "../components/SectionHead"
import { modulesSection } from "../data/content"
import styles from "./Modules.module.css"

export default function Modules() {
  return (
    <section
      id="modules"
      className={`section ${styles.section}`}
      aria-labelledby="modules-title"
    >
      <div className="container">
        <SectionHead
          id="modules-title"
          label={modulesSection.label}
          title={modulesSection.title}
          lead={modulesSection.lead}
        />

        <div className={styles.rows}>
          {modulesSection.modules.map((module) => (
            <article key={module.n} className={styles.row}>
              <div className={styles.n}>{module.n}</div>

              <h3 className={styles.name}>{module.name}</h3>

              <div>
                <p className={styles.body}>{module.body}</p>
                <div className={styles.tags}>
                  {module.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className={styles.readout} aria-hidden="true">
                <span className={styles.value}>{module.readout.value}</span>
                <span className={styles.unit}>{module.readout.unit}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
