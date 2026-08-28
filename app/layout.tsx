import type { Metadata } from "next"
import type React from "react"
import {
  Lora,
  Inter_Tight as InterTight,
  JetBrains_Mono as JetBrainsMono
} from "next/font/google"
import "./reset.css"
import "./globals.css"
import GoogleAnalytics from "./components/GoogleAnalytics"

/* Display serif — the face Meuze sets its section headings in. Chosen over a
   high-contrast display serif because the hero sets white type over a dark
   dithered photograph, where hairline strokes disappear. Real weights (400-600)
   mean the same face carries both the 84px hero and the 21px module names. */
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap"
})

const interTight = InterTight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
})

const jetbrainsMono = JetBrainsMono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "Yex Labs — The company brain for local business",
  description:
    "Yex Labs forward-deploys engineers into local businesses, builds a model of how each one actually runs, and installs modular AI business intelligence on top of it.",
  openGraph: {
    title: "Yex Labs — The company brain for local business",
    description:
      "Forward-deployed engineering, a company brain trained on your operation, and modular AI business intelligence.",
    type: "website",
    images: ["/art/og.png"]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    /* The font variables must land on <html>, not <body>: globals.css composes
       them into --font-display/--font-ui/--font-mono at :root, and a custom
       property resolves its var() references on the element that declares it. */
    <html
      lang="en"
      className={`${lora.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Geist Pixel is the wordmark face — the one deliberate pixel moment
            in the system. Loaded by link rather than next/font because it is
            too recent to appear in this Next version's font manifest. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font --
            the rule targets the Pages Router; a link in the App Router root
            layout head is site-wide, not per-page. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist+Pixel&display=swap"
        />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
