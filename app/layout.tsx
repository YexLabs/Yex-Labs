import type { Metadata } from "next"
import type React from "react"
import {
  Inter_Tight as InterTight,
  JetBrains_Mono as JetBrainsMono,
  Newsreader
} from "next/font/google"
import "./reset.css"
import "./globals.css"
import GoogleAnalytics from "./components/GoogleAnalytics"

const interTight = InterTight({
  subsets: ["latin"],
  variable: "--font-sans"
})
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  adjustFontFallback: false
})
const jetbrainsMono = JetBrainsMono({
  subsets: ["latin"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: "YexLabs",
  description:
    "AI automation consulting and technical cofounder services for startups."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
