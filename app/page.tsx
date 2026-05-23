import Image from "next/image"
import CodeTextAnimations from "./components/CodeTextAnimations"
import homepageStyles from "./page.module.css"
import NavBar from "./components/NavBar.tsx"
import Footer from "./components/Footer.tsx"
import Logo from "@/public/yexlabs-logo-v2.svg"
import GAPageView from "./components/GAPageView.tsx"

export default function Home() {
  const services = [
    {
      title: "AI Product Design",
      body: "Turn early ideas into shippable AI product flows, prototypes, technical scopes, and implementation plans."
    },
    {
      title: "Internal AI Automation",
      body: "Replace repetitive operations with practical agent workflows, custom dashboards, and team-ready automation."
    },
    {
      title: "Scale Systems",
      body: "Engineer ultra-efficient processes across support, sales, research, reporting, and back-office work."
    },
    {
      title: "GTM Engine",
      body: "Build the automation layer behind outbound, lead enrichment, CRM hygiene, lifecycle messaging, and conversion loops."
    },
    {
      title: "Custom Agents",
      body: "Design agents that work inside your real stack, connect to your data, and execute useful business actions."
    },
    {
      title: "Stablecoins & RWA",
      body: "Advise on stablecoin adoption, onchain yield strategy, RWA workflows, and blockchain integrations where they create leverage."
    }
  ]

  const clients = [
    "Honeypot Finance",
    "torodex.xyz",
    "launchvibes.tech",
    "florus.ai",
    "Canadao",
    "1dao"
  ]

  return (
    <>
      <GAPageView />
      <main className={homepageStyles.main}>
        <NavBar hideLogo />
        <section className={`section ${homepageStyles.hero}`}>
          <div className={`sectionContainer ${homepageStyles.heroContainer}`}>
            <div className={homepageStyles.logoWrap}>
              <Logo
                style={{
                  maxWidth: "340px",
                  width: "100%",
                  height: "auto",
                  color: "var(--text-secondary)",
                  margin: "0 auto"
                }}
              />
            </div>
            <p className={homepageStyles.eyebrow}>
              AI automation consulting for ambitious startups
            </p>
            <h1 className={homepageStyles.heroTitle}>
              Your technical backbone from Day 0 to exit.
            </h1>
            <p className={homepageStyles.heroCopy}>
              YexLabs acts like a third-party technical cofounder for founders
              who need to design, automate, and scale faster. We move from
              AI-powered product design and prototypes to internal automation,
              custom agents, GTM systems, and selective blockchain integration.
            </p>
            <CodeTextAnimations />
            <div className={homepageStyles.heroActions}>
              <a href="/contact" className="button1">
                Consult With Us
              </a>
              <a
                href="#services"
                className={`button3 ${homepageStyles.secondaryAction}`}
              >
                View Services
              </a>
            </div>
          </div>
        </section>
        <section className="section" id="about">
          <div className={`sectionContainer ${homepageStyles.splitSection}`}>
            <Image
              src="/info-circle.svg"
              className={homepageStyles.sectionIcon}
              width={0}
              height={0}
              alt="info"
            />
            <div>
              <h2>About</h2>
              <p className={homepageStyles.sectionLead}>
                We run a consulting firm for founders and operators who need
                senior technical leverage without building a full team too
                early. Our work covers the systems that actually change startup
                velocity: product strategy, AI workflow automation, custom agent
                engineering, operational cost reduction, growth infrastructure,
                and tokenized finance strategy when it fits the business.
              </p>
              <p className={homepageStyles.sectionLead}>
                The goal is simple: become the technical backbone that helps
                your startup scale from first concept to enterprise-grade
                execution.
              </p>
            </div>
          </div>
        </section>
        <section className="section" id="services">
          <div className={`sectionContainer ${homepageStyles.splitSection}`}>
            <Image
              src="/rectangle.svg"
              className={homepageStyles.sectionIcon}
              width={0}
              height={0}
              alt="services"
            />
            <div className={homepageStyles.fullWidth}>
              <h2>Consulting Services</h2>
              <p className={homepageStyles.sectionLead}>
                Pick a focused sprint or bring us in across the company. We can
                help founders clarify what to build, automate the work around
                it, and install the GTM systems needed to scale.
              </p>
              <div className={homepageStyles.serviceGrid}>
                {services.map((service) => (
                  <article
                    key={service.title}
                    className={homepageStyles.serviceCard}
                  >
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className={`sectionContainer ${homepageStyles.splitSection}`}>
            <Image
              src="/people.svg"
              className={homepageStyles.sectionIcon}
              width={0}
              height={0}
              alt="info"
            />
            <div className={homepageStyles.fullWidth}>
              <h2>Selected Clients</h2>
              <div className={homepageStyles.clientsGrid}>
                {clients.map((client) => (
                  <div key={client} className={homepageStyles.clientItem}>
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={`section ${homepageStyles.ctaSection}`}>
          <div className={`sectionContainer ${homepageStyles.ctaContainer}`}>
            <h2>Need a technical cofounder without the full-time overhead?</h2>
            <p>
              Tell us where the business is stuck. We will map the
              highest-leverage automation, product, and GTM opportunities.
            </p>
            <a href="/contact" className="button1">
              Start a Consulting Request
            </a>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}
