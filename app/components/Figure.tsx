import type { ReactNode } from "react"
import styles from "./Figure.module.css"

type FigureProps = {
  caption: string
  children: ReactNode
  onAccent?: boolean
}

/** A plate of line art with its monospace figure caption. */
export default function Figure({ caption, children, onAccent = false }: FigureProps) {
  return (
    <figure className={`${styles.figure} ${onAccent ? styles.onAccent : ""}`}>
      <div className={styles.plate}>{children}</div>
      <figcaption className={styles.caption}>
        {caption}
        <span className={styles.rule} aria-hidden="true" />
      </figcaption>
    </figure>
  )
}
