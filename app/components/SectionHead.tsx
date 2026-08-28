import styles from "./SectionHead.module.css"

type SectionHeadProps = {
  label: string
  title: string
  lead?: string
  /** Headline id, used as the section's aria-labelledby target. */
  id?: string
  onAccent?: boolean
  /** Drop the two-column split and stack label, title, and lead. */
  stacked?: boolean
}

/**
 * The standard section opening: a monospace label, a display-serif title, and
 * a supporting lead set across the gutter, closed by a hairline.
 */
export default function SectionHead({
  label,
  title,
  lead,
  id,
  onAccent = false,
  stacked = false
}: SectionHeadProps) {
  const classes = [
    styles.head,
    onAccent ? styles.onAccent : "",
    stacked ? styles.stacked : ""
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes}>
      <div>
        <p className="label">
          <span className="labelTick" aria-hidden="true" />
          {label}
        </p>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
      </div>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </div>
  )
}
