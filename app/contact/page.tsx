import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import GAPageView from "../components/GAPageView"
import { contactPage, modulesSection } from "../data/content"
import styles from "./page.module.css"

const EMAIL = "contact@yexlabs.xyz"

/* The intake list is derived from the modules so the two can never drift. */
const intakeOptions = [
  ...modulesSection.modules.map((module) => `${module.name} module`),
  ...contactPage.intake.extraOptions
]

const enquiryBody = encodeURIComponent(`Hi Yex Labs,

- Business and number of sites:
- The part of the week that costs the most:
- Systems currently in use:
- What a good outcome looks like in 90 days:
`)

function mailto(subject: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Yex Labs — ${subject}`
  )}&body=${enquiryBody}`
}

export default function Contact() {
  return (
    <>
      <GAPageView />
      <main>
        <NavBar />

        <section className="sectionTight" aria-labelledby="contact-title">
          <div className={`container ${styles.grid}`}>
            <div>
              <p className="label">
                <span className="labelTick" aria-hidden="true" />
                {contactPage.label}
              </p>

              <h1 id="contact-title" className={styles.title}>
                {contactPage.titleLead} <em>{contactPage.titleEmphasis}</em>
                {contactPage.titleTail}
              </h1>

              <p className={styles.lead}>{contactPage.lead}</p>

              <dl className={styles.facts}>
                {contactPage.facts.map((fact) => (
                  <div key={fact.term} className={styles.fact}>
                    <dt className="label">
                      <span className="labelTick" aria-hidden="true" />
                      {fact.term}
                    </dt>
                    <dd>
                      {fact.href ? (
                        <a href={fact.href} className={styles.factValue}>
                          {fact.value}
                        </a>
                      ) : (
                        <span className={styles.factValue}>{fact.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              className={`onAccent ${styles.intake}`}
              aria-labelledby="intake-title"
            >
              <p className="label">
                <span className="labelTick" aria-hidden="true" />
                {contactPage.intake.label}
              </p>
              <h2 id="intake-title" className={styles.intakeTitle}>
                {contactPage.intake.title}
              </h2>
              <p className={styles.intakeBody}>{contactPage.intake.body}</p>

              <div className={styles.options}>
                {intakeOptions.map((option, index) => (
                  <a
                    key={option}
                    className={styles.option}
                    href={mailto(option)}
                  >
                    <span className={styles.optionIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.optionLabel}>{option}</span>
                    <span className={styles.optionArrow} aria-hidden="true">
                      →
                    </span>
                  </a>
                ))}
              </div>

              <a
                className={`action actionPrimary ${styles.emailAction}`}
                href={mailto("Enquiry")}
              >
                {contactPage.intake.action} <span data-arrow>→</span>
              </a>
            </div>
          </div>
        </section>

        <section
          className={`section ${styles.promptSection}`}
          aria-labelledby="prompts-title"
        >
          <div className={`container ${styles.promptGrid}`}>
            <div>
              <p className="label">
                <span className="labelTick" aria-hidden="true" />
                {contactPage.prompts.label}
              </p>
              <h2 id="prompts-title" className={styles.promptTitle}>
                {contactPage.prompts.title}
              </h2>
            </div>

            <div className={styles.promptList}>
              {contactPage.prompts.items.map((item, index) => (
                <div key={item} className={styles.promptItem}>
                  <span className={styles.promptNum}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
