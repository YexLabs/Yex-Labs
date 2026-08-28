import Image from "next/image"
import Link from "next/link"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import GAPageView from "../components/GAPageView"
import SectionHead from "../components/SectionHead"
import {
  caseStudies,
  clients,
  feedbackSources,
  type Client
} from "../clientData"
import { clientsPage } from "../data/content"
import styles from "./page.module.css"

const caseStudyClientIds = new Set(caseStudies.map((study) => study.clientId))
const logoOnlyClients = clients.filter(
  (client) => !caseStudyClientIds.has(client.id)
)

function getClient(clientId: string) {
  return clients.find((client) => client.id === clientId)
}

function ClientLogo({ client, size = 60 }: { client: Client; size?: number }) {
  if (!client.logo) {
    return <span className={styles.clientMark}>{client.mark}</span>
  }

  const isWordmark = client.logoVariant === "wordmark"

  return (
    <Image
      src={client.logo}
      alt={`${client.name} logo`}
      width={isWordmark ? 114 : size}
      height={isWordmark ? 30 : size}
      className={
        isWordmark
          ? styles.clientWordmark
          : client.logoVariant === "disc"
            ? styles.clientDiscLogo
            : undefined
      }
    />
  )
}

export default function ClientsPage() {
  return (
    <>
      <GAPageView />
      <main>
        <NavBar />

        <section className="sectionTight" aria-labelledby="clients-title">
          <div className={`container ${styles.head}`}>
            <div>
              <p className="label">
                <span className="labelTick" aria-hidden="true" />
                {clientsPage.label}
              </p>
              <h1 id="clients-title" className={styles.title}>
                {clientsPage.title}
              </h1>
            </div>
            <p className={styles.headLead}>{clientsPage.lead}</p>
          </div>
        </section>

        <section className="sectionTight" aria-labelledby="roster-label">
          <div className="container">
            <p id="roster-label" className="label">
              <span className="labelTick" aria-hidden="true" />
              {clientsPage.roster.label}
            </p>
            <div className={styles.logoGrid}>
              {clients.map((client) => {
                const inner = (
                  <>
                    <ClientLogo client={client} />
                    {client.logoVariant !== "wordmark" ? client.name : null}
                  </>
                )

                return client.url ? (
                  <a
                    key={client.id}
                    href={client.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.logoCard}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={client.id} className={styles.logoCard}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="cases-title">
          <div className="container">
            <SectionHead
              id="cases-title"
              label={clientsPage.cases.label}
              title={clientsPage.cases.title}
              lead={clientsPage.cases.lead}
            />

            <div className={styles.caseList}>
              {caseStudies.map((study) => {
                const client = getClient(study.clientId)
                if (!client) return null

                const brand = (
                  <>
                    <ClientLogo client={client} size={40} />
                    {client.logoVariant !== "wordmark" ? (
                      <span className={styles.caseName}>{client.name}</span>
                    ) : null}
                  </>
                )

                return (
                  <article key={study.clientId} className={styles.caseCard}>
                    <div className={styles.caseMeta}>
                      {client.url ? (
                        <a
                          href={client.url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.caseBrand}
                        >
                          {brand}
                        </a>
                      ) : (
                        <span className={styles.caseBrand}>{brand}</span>
                      )}
                      <span className={styles.caseLabel}>{study.label}</span>
                    </div>

                    <div>
                      <h3 className={styles.caseTitle}>{study.title}</h3>
                      <p className={styles.caseSummary}>{study.summary}</p>

                      <div className={styles.delivered}>
                        <p className={`label ${styles.deliveredLabel}`}>
                          <span className="labelTick" aria-hidden="true" />
                          {clientsPage.cases.deliveredLabel}
                        </p>
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

        <section
          className={`section ${styles.feedbackSection}`}
          aria-labelledby="feedback-title"
        >
          <div className="container">
            <SectionHead
              id="feedback-title"
              label={clientsPage.feedback.label}
              title={clientsPage.feedback.title}
              lead={clientsPage.feedback.lead}
            />

            <div className={styles.feedbackGrid}>
              {feedbackSources.map((source) => (
                <article
                  key={`${source.clientId}-${source.name}`}
                  className={styles.feedbackCard}
                >
                  <p className="label">
                    <span className="labelTick" aria-hidden="true" />
                    {getClient(source.clientId)?.name ?? source.role}
                  </p>
                  <h3 className={styles.feedbackName}>{source.name}</h3>
                  <p className={styles.feedbackRole}>{source.role}</p>
                  <p className={styles.feedbackQuote}>{source.summary}</p>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`linkArrow ${styles.feedbackLink}`}
                    >
                      View profile <span data-arrow>→</span>
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sectionTight" aria-labelledby="more-title">
          <div className={`container ${styles.rosterBox}`}>
            <div>
              <p className="label">
                <span className="labelTick" aria-hidden="true" />
                {clientsPage.more.label}
              </p>
              <h2 id="more-title" className={styles.caseTitle}>
                {clientsPage.more.title}
              </h2>
            </div>
            <div className={styles.rosterList}>
              {logoOnlyClients.map((client) => {
                const inner = (
                  <>
                    <ClientLogo client={client} size={26} />
                    {client.logoVariant !== "wordmark" ? client.name : null}
                  </>
                )

                return client.url ? (
                  <a
                    key={client.id}
                    href={client.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.rosterItem}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={client.id} className={styles.rosterItem}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="clients-cta-title">
          <div className="container">
            <div className={`onAccent atmospheric ${styles.ctaCard}`}>
              <div>
                <p className="label">
                  <span className="labelTick" aria-hidden="true" />
                  {clientsPage.cta.label}
                </p>
                <h2 id="clients-cta-title" className={styles.ctaTitle}>
                  {clientsPage.cta.title}
                </h2>
              </div>
              <div>
                <p className={styles.ctaBody}>{clientsPage.cta.body}</p>
                <Link
                  href={clientsPage.cta.action.href}
                  className={`action actionPrimary ${styles.ctaAction}`}
                >
                  {clientsPage.cta.action.label} <span data-arrow>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
