import footerStyles from "./Footer.module.css"
import Link from "next/link"

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={`sectionContainer ${footerStyles.container}`}>
        <div className={footerStyles.brandCol}>
          <Link href="/" className={footerStyles.brand}>
            YexLabs<span>.</span>
          </Link>
          <p>
            AI consulting for small and mid-sized teams that need practical
            product, automation, GTM, agent, and onchain systems without
            enterprise timelines.
          </p>
          <Link href="/contact" className={footerStyles.footerCta}>
            Start a project <span>→</span>
          </Link>
        </div>

        <div className={footerStyles.section}>
          <h5>Services</h5>
          <Link href="/#services">AI Product Design</Link>
          <Link href="/#services">Internal AI Automation</Link>
          <Link href="/#services">Scale Systems</Link>
          <Link href="/#services">GTM Engine</Link>
          <Link href="/#services">Custom Agents</Link>
          <Link href="/#services">Stablecoins & RWA</Link>
        </div>

        <div className={footerStyles.section}>
          <h5>Company</h5>
          <Link href="/#approach">Approach</Link>
          <Link href="/#clients">Selected Clients</Link>
          <Link href="/contact">Contact</Link>
          <Link href="https://medium.com/@yexlabs" target="_blank">
            Insights
          </Link>
        </div>

        <div className={footerStyles.section}>
          <h5>Contact</h5>
          <Link href="mailto:contact@yexlabs.xyz">contact@yexlabs.xyz</Link>
          <span>Toronto · North America</span>
          <Link href="https://twitter.com/yex_labs" target="_blank">
            Twitter
          </Link>
        </div>
      </div>

      <div className={`sectionContainer ${footerStyles.bottom}`}>
        <span>© {year} YexLabs Consulting. All rights reserved.</span>
        <span>Built for measurable operating leverage.</span>
      </div>
    </footer>
  )
}
