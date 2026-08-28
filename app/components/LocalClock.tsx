"use client"

import { useEffect, useState } from "react"

const TIME_ZONE = "America/Toronto"
const PLACE = "Toronto"

function formatNow() {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: TIME_ZONE
    }).format(new Date())
  } catch {
    /* Intl or the tz database can be unavailable in constrained runtimes.
       The clock is decorative, so degrade to hiding it rather than throwing. */
    return null
  }
}

type LocalClockProps = {
  className?: string
}

/**
 * Live local time beside the wordmark. Renders nothing on the server so the
 * markup cannot mismatch on hydration, then fills in and ticks once mounted.
 */
export default function LocalClock({ className }: LocalClockProps) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setTime(formatNow())
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <span className={className}>
      {PLACE} · <time>{time}</time>
    </span>
  )
}
