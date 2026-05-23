import NavBar from "../components/NavBar.tsx"
import Footer from "../components/Footer.tsx"
import contactStyles from "./page.module.css"

const serviceOptions = [
  "AI-powered product design and prototypes",
  "AI workflow automation for cost saving",
  "AI workflow automation for scaling business",
  "AI automation for ultra-efficient operations",
  "GTM engine design and automation",
  "Stablecoin adoption and onchain yield strategy",
  "RWA and blockchain integration"
]

const intakePrompts = [
  "What are you trying to build or scale?",
  "Which workflow, cost center, or GTM motion feels most constrained?",
  "What systems should the automation connect to?",
  "What would a strong 30-day outcome look like?"
]

export default function Contact() {
  const subject = encodeURIComponent("YexLabs consulting request")
  const body = encodeURIComponent(`Hi YexLabs,

I want to discuss:
- Service:
- Company/stage:
- Current bottleneck:
- Ideal outcome:
- Timeline:
`)

  return (
    <main className={contactStyles.main}>
      <NavBar />
      <section className={`section ${contactStyles.hero}`}>
        <div className={`sectionContainer ${contactStyles.heroContainer}`}>
          <p className={contactStyles.eyebrow}>Consulting intake</p>
          <h1 className={contactStyles.title}>
            Tell us where your startup needs technical leverage.
          </h1>
          <p className={contactStyles.lead}>
            We help founders turn unclear product, automation, and GTM problems
            into practical systems. Choose the closest service area and send a
            short brief.
          </p>
          <a
            className="button1"
            href={`mailto:contact@yexlabs.xyz?subject=${subject}&body=${body}`}
          >
            Email YexLabs
          </a>
        </div>
      </section>

      <section className="section">
        <div className={`sectionContainer ${contactStyles.gridSection}`}>
          <div>
            <h2>Service Areas</h2>
            <p className={contactStyles.sectionCopy}>
              These are the most common ways we plug into a company. If the
              request spans multiple areas, describe the business goal first.
            </p>
          </div>
          <div className={contactStyles.serviceGrid}>
            {serviceOptions.map((service) => (
              <a
                key={service}
                className={contactStyles.serviceCard}
                href={`mailto:contact@yexlabs.xyz?subject=${encodeURIComponent(
                  `YexLabs consulting: ${service}`
                )}&body=${body}`}
              >
                {service}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`sectionContainer ${contactStyles.gridSection}`}>
          <div>
            <h2>What To Include</h2>
            <p className={contactStyles.sectionCopy}>
              A useful first message does not need to be long. Clear context
              lets us quickly identify whether the work should start with
              design, automation, engineering, or strategy.
            </p>
          </div>
          <div className={contactStyles.promptList}>
            {intakePrompts.map((prompt) => (
              <div key={prompt} className={contactStyles.promptItem}>
                {prompt}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
