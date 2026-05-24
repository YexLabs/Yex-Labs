import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import contactStyles from "./page.module.css"

const serviceOptions = [
  "AI Product Design",
  "Internal AI Automation",
  "Scale Systems",
  "GTM Engine",
  "Custom Agents",
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
        <div className={`sectionContainer ${contactStyles.heroGrid}`}>
          <div>
            <p className={contactStyles.eyebrow}>
              <span className="eyebrowDot" />
              Start a conversation
            </p>
            <h1 className={contactStyles.title}>
              Tell us where the <em>leverage</em> is hiding.
            </h1>
            <p className={contactStyles.lead}>
              Share a few lines about the business, the workflow you are trying
              to fix, and what a strong outcome would look like. We reply with a
              practical next step.
            </p>
            <div className={contactStyles.contactFacts}>
              <div>
                <p>Email</p>
                <a href="mailto:contact@yexlabs.xyz">contact@yexlabs.xyz</a>
              </div>
              <div>
                <p>Focus</p>
                <span>SMB teams · startups · operators</span>
              </div>
              <div>
                <p>Coverage</p>
                <span>North America · remote-first</span>
              </div>
            </div>
          </div>

          <div className={contactStyles.intakePanel}>
            <p className={contactStyles.panelLabel}>Consulting intake</p>
            <h2>Choose the closest service area.</h2>
            <p>
              If the request spans multiple areas, describe the business goal
              first. The service links open a pre-filled email brief.
            </p>
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
                  <span>→</span>
                </a>
              ))}
            </div>
            <a
              className={`button1 ${contactStyles.emailButton}`}
              href={`mailto:contact@yexlabs.xyz?subject=${subject}&body=${body}`}
            >
              Email YexLabs <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className={`sectionTight ${contactStyles.promptSection}`}>
        <div className={`sectionContainer ${contactStyles.gridSection}`}>
          <div>
            <p className={contactStyles.eyebrow}>
              <span className="eyebrowDot" />
              What to include
            </p>
            <h2>A useful first message does not need to be long.</h2>
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
