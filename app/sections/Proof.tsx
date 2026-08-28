import Image from "next/image"
import Link from "next/link"
import { clients, type Client } from "../clientData"
import { proofSection } from "../data/content"
import styles from "./Proof.module.css"

function ClientBrand({ client }: { client: Client }) {
  if (!client.logo) {
    return <span className={styles.mark}>{client.mark}</span>
  }

  const isWordmark = client.logoVariant === "wordmark"
  const className = [
    styles.logo,
    isWordmark ? styles.wordmark : "",
    client.logoVariant === "disc" ? styles.disc : ""
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Image
      src={client.logo}
      alt={`${client.name} logo`}
      width={isWordmark ? 114 : 60}
      height={isWordmark ? 30 : 60}
      className={className}
    />
  )
}

export default function Proof() {
  return (
    <section className="sectionTight" aria-labelledby="proof-label">
      <div className="container">
        <div className={styles.head}>
          <p id="proof-label" className="label">
            <span className="labelTick" aria-hidden="true" />
            {proofSection.label}
          </p>
          <Link href="/clients" className="linkArrow">
            {proofSection.linkLabel} <span data-arrow>→</span>
          </Link>
        </div>

        <div className={styles.grid}>
          {clients.map((client) =>
            client.url ? (
              <a
                key={client.id}
                href={client.url}
                target="_blank"
                rel="noreferrer"
                className={styles.cell}
                aria-label={client.name}
                title={client.name}
              >
                <ClientBrand client={client} />
              </a>
            ) : (
              <div
                key={client.id}
                className={styles.cell}
                aria-label={client.name}
                title={client.name}
              >
                <ClientBrand client={client} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
