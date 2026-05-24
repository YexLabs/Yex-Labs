import Image from "next/image"
import Link from "next/link"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import GAPageView from "../components/GAPageView"
import {
  caseStudies,
  clients,
  feedbackSources,
  type Client
} from "../clientData"
import clientStyles from "./page.module.css"

const caseStudyClientIds = new Set(caseStudies.map((study) => study.clientId))
const logoOnlyClients = clients.filter((client) => !caseStudyClientIds.has(client.id))

function getClient(clientId: string) {
  return clients.find((client) => client.id === clientId)
}

function ClientBrand({
  client,
  showName = true
}: {
  client: Client
  showName?: boolean
}) {
  return (
    <>
      {client.logo ? (
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={client.logoVariant === "wordmark" ? 114 : 60}
          height={client.logoVariant === "wordmark" ? 30 : 60}
          className={
            client.logoVariant === "wordmark"
              ? clientStyles.clientWordmark
              : client.logoVariant === "disc"
                ? clientStyles.clientDiscLogo
                : undefined
          }
        />
      ) : (
        <span className={clientStyles.clientMark}>{client.mark}</span>
      )}
      {showName && client.logoVariant !== "wordmark" ? client.name : null}
    </>
  )
}

export default function ClientsPage() {
  return (
    <>
      <GAPageView />
      <main className={clientStyles.main}>
        <NavBar />

        <section className={`section ${clientStyles.hero}`}>
          <div className={`sectionContainer ${clientStyles.heroGrid}`}>
            <div>
              <p className={clientStyles.eyebrow}>
                <span className="eyebrowDot" />
                Client work · 2023 — present
              </p>
              <h1>
                Case studies across AI product, DeFi, protocol design, and GTM.
              </h1>
            </div>
            <p>
              YexLabs acts as a technical backbone for teams that need more than
              a strategy deck. The work spans design prototypes, implementation,
              research, smart contracts, partner strategy, and automation
              systems.
            </p>
          </div>
        </section>

        <section className={`sectionTight ${clientStyles.logoSection}`}>
          <div className={`sectionContainer ${clientStyles.logoGrid}`}>
            {clients.map((client) => {
              const content = <ClientBrand client={client} />

              return client.url ? (
                <a
                  key={client.id}
                  href={client.url}
                  target="_blank"
                  rel="noreferrer"
                  className={clientStyles.logoCard}
                >
                  {content}
                </a>
              ) : (
                <div key={client.id} className={clientStyles.logoCard}>
                  {content}
                </div>
              )
            })}
          </div>
        </section>

        <section className={`section ${clientStyles.caseSection}`}>
          <div className="sectionContainer">
            <div className={clientStyles.sectionHead}>
              <div>
                <p className={clientStyles.eyebrow}>
                  <span className="eyebrowDot" />
                  Case studies
                </p>
                <h2>What we have done for client teams.</h2>
              </div>
              <p>
                These are implementation-oriented summaries. They describe the
                consulting scope and shipped work without presenting unapproved
                customer quotes.
              </p>
            </div>

            <div className={clientStyles.caseList}>
              {caseStudies.map((study) => {
                const client = getClient(study.clientId)

                if (!client) {
                  return null
                }

                return (
                  <article key={study.clientId} className={clientStyles.caseCard}>
                    <div className={clientStyles.caseMeta}>
                      {client.url ? (
                        <a href={client.url} target="_blank" rel="noreferrer">
                          <ClientBrand client={client} />
                        </a>
                      ) : (
                        <div>
                          <ClientBrand client={client} />
                        </div>
                      )}
                      <span>{study.label}</span>
                    </div>
                    <div className={clientStyles.caseBody}>
                      <div>
                        <h3>{study.title}</h3>
                        <p>{study.summary}</p>
                      </div>
                      <div className={clientStyles.delivered}>
                        <p>What we delivered</p>
                        <ul>
                          {study.delivered.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className={`section ${clientStyles.feedbackSection}`}>
          <div className="sectionContainer">
            <div className={clientStyles.sectionHead}>
              <div>
                <p className={clientStyles.eyebrow}>
                  <span className="eyebrowDot" />
                  Client feedback
                </p>
                <h2>Client feedback from shipped work.</h2>
              </div>
              <p>
                These are directional testimonial summaries based on the work
                context. Exact quotes can replace them after each source
                approves final wording.
              </p>
            </div>

            <div className={clientStyles.feedbackGrid}>
              {feedbackSources.map((source) => {
                const client = getClient(source.clientId)

                return (
                  <article key={`${source.clientId}-${source.name}`}>
                    <p>{client?.name ?? source.role}</p>
                    <h3>{source.name}</h3>
                    <span>{source.role}</span>
                    <p>{source.summary}</p>
                    {source.url ? (
                      <a href={source.url} target="_blank" rel="noreferrer">
                        View profile <span>→</span>
                      </a>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className={`sectionTight ${clientStyles.rosterSection}`}>
          <div className={`sectionContainer ${clientStyles.rosterBox}`}>
            <div>
              <p className={clientStyles.eyebrow}>
                <span className="eyebrowDot" />
                Additional selected clients
              </p>
              <h2>Visible now, case details later.</h2>
            </div>
            <div className={clientStyles.rosterList}>
              {logoOnlyClients.map((client) => {
                const content = <ClientBrand client={client} />

                return client.url ? (
                  <a
                    key={client.id}
                    href={client.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={client.id}>{content}</div>
                )
              })}
            </div>
          </div>
        </section>

        <section className={`sectionTight ${clientStyles.ctaSection}`}>
          <div className={`sectionContainer ${clientStyles.ctaBox}`}>
            <div>
              <p className={clientStyles.eyebrow}>
                <span className="eyebrowDot" />
                Need this kind of support?
              </p>
              <h2>Bring us in where product, automation, and execution meet.</h2>
            </div>
            <Link href="/contact" className={clientStyles.ctaLink}>
              Start a consulting request <span>→</span>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
