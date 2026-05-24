import homepageStyles from "./page.module.css"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import GAPageView from "./components/GAPageView"

const services = [
  {
    n: "01",
    title: "AI Product Design",
    body: "Turn early ideas into shippable AI product flows, prototypes, technical scopes, and implementation plans.",
    tags: ["Product", "Prototype", "Scope"]
  },
  {
    n: "02",
    title: "Internal AI Automation",
    body: "Replace repetitive operations with practical agent workflows, custom dashboards, and team-ready automation.",
    tags: ["Operations", "Agents", "Dashboards"]
  },
  {
    n: "03",
    title: "Scale Systems",
    body: "Engineer ultra-efficient processes across support, sales, research, reporting, and back-office work.",
    tags: ["Support", "Sales", "Reporting"]
  },
  {
    n: "04",
    title: "GTM Engine",
    body: "Build the automation layer behind outbound, lead enrichment, CRM hygiene, lifecycle messaging, and conversion loops.",
    tags: ["Growth", "CRM", "Pipeline"]
  },
  {
    n: "05",
    title: "Custom Agents",
    body: "Design agents that work inside your real stack, connect to your data, and execute useful business actions.",
    tags: ["LLM", "Tools", "Data"]
  },
  {
    n: "06",
    title: "Stablecoins & RWA",
    body: "Advise on stablecoin adoption, onchain yield strategy, RWA workflows, and blockchain integrations where they create leverage.",
    tags: ["Treasury", "Onchain", "RWA"]
  }
]

const clients = [
  { mark: "HP", name: "Honeypot Finance", work: "Research · smart contracts · AI workflow" },
  { mark: "TD", name: "torodex.xyz", work: "Research · smart contracts · AI workflow" },
  { mark: "LV", name: "launchvibes.tech", work: "Design client" },
  { mark: "FL", name: "florus.ai", work: "Design client" },
  { mark: "GC", name: "geocompanion", work: "Design client" },
  { mark: "CD", name: "Canadao", work: "Operations" },
  { mark: "1D", name: "1dao", work: "Operations" }
]

const engagementModels = [
  {
    title: "Diagnostic",
    cadence: "1 week · fixed scope",
    price: "from $3.5k",
    items: [
      "Workflow and data audit",
      "Opportunity map with ROI estimates",
      "90-day implementation plan"
    ]
  },
  {
    title: "Sprint",
    cadence: "3-8 weeks · fixed scope",
    price: "from $12k",
    featured: true,
    items: [
      "Production-ready deployment",
      "Integration with your stack",
      "Team rollout and handoff"
    ]
  },
  {
    title: "Embedded",
    cadence: "Monthly retainer",
    price: "from $6k / month",
    items: [
      "Technical cofounder support",
      "Roadmap ownership",
      "Monthly metrics review"
    ]
  }
]

export default function Home() {
  return (
    <>
      <GAPageView />
      <main className={homepageStyles.main}>
        <NavBar />

        <section className={homepageStyles.hero}>
          <div className={`sectionContainer ${homepageStyles.heroInner}`}>
            <p className={homepageStyles.eyebrow}>
              <span className="eyebrowDot" />
              AI consulting · SMB-focused · North America
            </p>
            <h1 className={homepageStyles.heroTitle}>
              Your technical backbone from <em>Day 0</em> to exit.
            </h1>
            <div className={homepageStyles.heroMeta}>
              <div className={homepageStyles.heroActions}>
                <a href="/contact" className="button1">
                  Book a diagnostic <span>→</span>
                </a>
                <a href="#clients" className="button3">
                  See client work
                </a>
              </div>
              <p className={homepageStyles.heroCopy}>
                YexLabs acts like a third-party technical cofounder for small
                and mid-sized teams that need to design, automate, and scale
                faster. We move from AI-powered product design and prototypes
                to internal automation, custom agents, GTM systems, and
                selective blockchain integration.
              </p>
            </div>
          </div>
        </section>

        <section className={`sectionTight ${homepageStyles.kpiSection}`}>
          <div className={`sectionContainer ${homepageStyles.kpiRow}`}>
            <div className={homepageStyles.kpi}>
              <strong>6</strong>
              <span>Service lanes from product design to onchain strategy</span>
            </div>
            <div className={homepageStyles.kpi}>
              <strong>SMB</strong>
              <span>Built for practical budgets and fast operating cycles</span>
            </div>
            <div className={homepageStyles.kpi}>
              <strong>90d</strong>
              <span>Roadmaps shaped around measurable quarterly outcomes</span>
            </div>
            <div className={homepageStyles.kpi}>
              <strong>AI</strong>
              <span>Agents, workflows, dashboards, and GTM systems that ship</span>
            </div>
          </div>
        </section>

        <section className={homepageStyles.clientStripSection} id="clients">
          <div className={`sectionContainer ${homepageStyles.clientStrip}`}>
            <div className={homepageStyles.clientStripLabel}>
              Selected clients · research · design · operations
            </div>
            {clients.map((client) => (
              <div
                key={client.name}
                className={homepageStyles.clientLogo}
                title={client.work}
              >
                <span>{client.mark}</span>
                {client.name}
              </div>
            ))}
          </div>
        </section>

        <section className={`section ${homepageStyles.paperSection}`} id="services">
          <div className="sectionContainer">
            <div className={homepageStyles.sectionHead}>
              <div>
                <p className={homepageStyles.eyebrow}>
                  <span className="eyebrowDot" />
                  What we do
                </p>
                <h2>Practical AI consulting for teams that need shipped systems.</h2>
              </div>
              <p>
                Pick a focused sprint or bring us in across the company. We
                help founders clarify what to build, automate the work around
                it, and install the GTM systems needed to scale.
              </p>
            </div>
            <div className={homepageStyles.serviceRows}>
              {services.map((service) => (
                <article key={service.title} className={homepageStyles.serviceRow}>
                  <div className={homepageStyles.serviceNum}>— {service.n}</div>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                  <div className={homepageStyles.tags}>
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="approach">
          <div className="sectionContainer">
            <div className={homepageStyles.sectionHead}>
              <div>
                <p className={homepageStyles.eyebrow}>
                  <span className="eyebrowDot" />
                  How we work
                </p>
                <h2>Three engagement modes. One operating standard.</h2>
              </div>
              <p>
                Every engagement begins with the same question: where does AI
                create real leverage for the business, and what is the shortest
                path to a production system the team will actually use?
              </p>
            </div>
            <div className={homepageStyles.engagementGrid}>
              {engagementModels.map((model) => (
                <article
                  key={model.title}
                  className={`${homepageStyles.engagementCard} ${
                    model.featured ? homepageStyles.featuredCard : ""
                  }`}
                >
                  <p className={homepageStyles.eyebrow}>
                    <span className="eyebrowDot" />
                    {model.title}
                  </p>
                  <h3>{model.cadence}</h3>
                  <strong>{model.price}</strong>
                  <ul>
                    {model.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`sectionTight ${homepageStyles.ctaSection}`}>
          <div className={`sectionContainer ${homepageStyles.ctaBox}`}>
            <div>
              <p className={homepageStyles.eyebrow}>
                <span className="eyebrowDot" />
                Let&apos;s talk
              </p>
              <h2>Have a workflow that is costing you speed or margin?</h2>
              <p>
                Send us the bottleneck. We will help identify whether the next
                move is design, automation, agent engineering, GTM systems, or
                onchain strategy.
              </p>
            </div>
            <a href="/contact" className={homepageStyles.inverseButton}>
              Start a consulting request <span>→</span>
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
