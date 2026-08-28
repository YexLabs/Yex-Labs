import Image from "next/image"
import SectionHead from "../components/SectionHead"
import { industriesSection } from "../data/content"
import styles from "./Industries.module.css"

const plates = [
  {
    src: "/art/industry-a.jpg",
    alt: "A cafe bar counter mid-service, glassware and bottles on the back wall."
  },
  {
    src: "/art/industry-b.jpg",
    alt: "A small barber reception with a waiting chair, desk, magazines and grooming tools."
  },
  {
    src: "/art/industry-c.jpg",
    alt: "A workbench in genuine working disorder, tools and part-finished work."
  }
]

export default function Industries() {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="industries-title"
    >
      <div className="container">
        <SectionHead
          id="industries-title"
          label={industriesSection.label}
          title={industriesSection.title}
          lead={industriesSection.lead}
        />

        <div className={styles.grid}>
          {plates.map((plate, index) => (
            <figure key={plate.src} className={styles.item}>
              <Image
                src={plate.src}
                alt={plate.alt}
                width={800}
                height={800}
                className={styles.plate}
              />
              <figcaption className={styles.caption}>
                {industriesSection.captions[index]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
