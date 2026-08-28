/**
 * PROVISIONAL COPY.
 *
 * The design pass came first by request — every string here is written to the
 * right length and register for its slot, but the wording is a placeholder for
 * the copy pass. Keep line counts and character counts close when rewriting or
 * the layout rhythm will drift.
 */

export const hero = {
  label: "Forward-deployed AI · Local business",
  title: "The brain your business",
  titleTail: " has been running without.",
  lead:
    "Yex Labs puts engineers inside local businesses, builds a working model of how yours actually runs, and installs modular intelligence on top of it.",
  primaryCta: { label: "Book a deployment", href: "/contact" },
  secondaryCta: { label: "See the modules", href: "#modules" },
  footnote: "Toronto · North America · on site from week zero"
}

/** One idea per line. Set large, in the display serif, with room around it. */
export const manifesto = [
  "A local business already knows almost everything about itself.",
  "It knows it in a till, a diary, a supplier's inbox, a group chat, and one person's head.",
  "None of those things talk to each other, so the knowledge dies at closing time.",
  "We build the part that remembers."
]

export const gapSection = {
  label: "The problem",
  figure: "Fig. 1",
  caption: "Fig. 1 — Six systems, no shared memory.",
  title: "Every system you run, talking to no one.",
  body: [
    "The tools are not the problem. The till is fine. The rota is fine. The accounting package is fine. Each one is a competent record of one slice of the week.",
    "What is missing is the layer that reads all of them at once and knows what it means for this business, in this street, in this month."
  ],
  systems: ["Till", "Rota", "Invoices", "Inbox", "Bookings", "Reviews"]
}

export const brainSection = {
  label: "The answer",
  figure: "Fig. 2",
  caption: "Fig. 2 — One model, trained on one business.",
  title: "A company brain, trained on your operation.",
  body: [
    "We do not hand you software and wish you luck. An engineer deploys into the business, learns how it actually runs, and wires every system you already own into a single model.",
    "The brain is yours. It is trained on your history, your suppliers, your street, and your calendar — and it gets better every week it runs."
  ],
  points: [
    "Replaces nothing you already pay for",
    "Learns from your history, not an industry average",
    "Every number comes with the reason behind it"
  ]
}

export const modulesSection = {
  label: "Modular BI",
  title: "Six modules. Turn them on one at a time.",
  lead:
    "Each module reads from the same brain, so switching one on makes the others sharper. Start with the one that is costing you the most.",
  modules: [
    {
      n: "01",
      name: "Demand",
      body:
        "Covers, bookings, and jobs forecast hour by hour from your own history, the weather, and what is happening locally.",
      readout: { value: "740", unit: "guests · fri forecast" },
      tags: ["Forecast", "Seasonality", "Local events"]
    },
    {
      n: "02",
      name: "Labour",
      body:
        "Shifts sized against the forecast rather than last week's roster. Quiet at open, covered at peak, costed before you publish it.",
      readout: { value: "−9h", unit: "vs usual roster" },
      tags: ["Rota", "Cost per hour", "Coverage"]
    },
    {
      n: "03",
      name: "Inventory",
      body:
        "Counts that update from the shelf, reorder points that follow demand, and purchase orders that leave on the supplier's cutoff.",
      readout: { value: "−22%", unit: "waste vs baseline" },
      tags: ["Counts", "Reorder", "Suppliers"]
    },
    {
      n: "04",
      name: "Cash & margin",
      body:
        "Where the money actually went, per item and per day, reconciled against the bank without waiting for month end.",
      readout: { value: "+14%", unit: "gross margin" },
      tags: ["Reconciliation", "Unit economics", "Pricing"]
    },
    {
      n: "05",
      name: "Customers",
      body:
        "Every review, message, booking, and no-show in one thread, with the replies drafted and the patterns surfaced.",
      readout: { value: "4.8", unit: "avg rating · 90d" },
      tags: ["Reviews", "Retention", "Messaging"]
    },
    {
      n: "06",
      name: "Reporting",
      body:
        "One page that the owner, the manager, and the accountant all read the same way, generated the moment the week closes.",
      readout: { value: "1", unit: "page, every monday" },
      tags: ["Weekly close", "Board pack", "Exports"]
    }
  ]
}

/**
 * PLACEHOLDER FIGURES — do not publish these numbers.
 * Replace with measured results from live deployments before launch.
 */
export const readout = {
  label: "Placeholder figures · pending live deployment data",
  metrics: [
    { value: "+14%", unit: "Gross margin", note: "vs pre-deployment baseline" },
    { value: "−9h", unit: "Weekly labour", note: "vs usual roster" },
    { value: "−22%", unit: "Waste", note: "vs pre-deployment baseline" },
    { value: "4.6h", unit: "Owner time back", note: "per week" },
    { value: "0", unit: "Systems replaced", note: "we sit on top of yours" }
  ]
}

export const deploymentSection = {
  label: "How we deploy",
  title: "Forward deployed, not forwarded to support.",
  lead:
    "The engineering happens where the business happens. Six weeks from a first visit to modules running on their own.",
  steps: [
    {
      n: "Week 00",
      name: "Deploy",
      body:
        "An engineer spends the week on site. Behind the counter, in the stockroom, on the van. We map how the business really runs, which is never how the software thinks it runs."
    },
    {
      n: "Week 02",
      name: "Model",
      body:
        "Every system you already own is wired into one brain — till, calendar, invoices, suppliers, inbox. It trains on your history, not on an industry template."
    },
    {
      n: "Week 06",
      name: "Run",
      body:
        "Modules go live one at a time. At first you approve every decision from your phone. Then you approve the exceptions. Then you stop approving."
    }
  ]
}

export const industriesSection = {
  label: "Where it runs",
  title: "Built for businesses with a floor, a rota, and a supplier.",
  lead:
    "Food service, clinics and salons, trades and workshops. Owner-operated up to a few dozen sites — the range where the data exists but nobody has time to read it.",
  captions: ["Food service", "Clinics & salons", "Trades & workshops"]
}

export const proofSection = {
  label: "Selected work · 2023 — present",
  title: "Teams we have built systems for.",
  linkLabel: "View client work"
}

export const closing = {
  label: "Start here",
  title: "Send us one week of your data.",
  body:
    "One week of till exports, one rota, and last month's invoices is enough for us to show you what the brain would already know. No install, no commitment.",
  primaryCta: { label: "Book a deployment", href: "/contact" },
  secondaryCta: { label: "contact@yexlabs.xyz", href: "mailto:contact@yexlabs.xyz" }
}

/* ------------------------------------------------------------------ *
 * /clients
 *
 * NOTE ON HISTORY: the case studies in clientData.ts are real, shipped
 * engagements in DeFi, protocol design, and GTM. They predate the local
 * business positioning and must not be rewritten to fit it. The framing
 * below connects the two honestly rather than erasing the earlier work.
 * ------------------------------------------------------------------ */

export const clientsPage = {
  label: "Client work · 2023 — present",
  title: "The work behind the brain.",
  lead:
    "Before Yex Labs focused on local business, we built products, protocols, and go-to-market systems for founding teams. The engineering discipline is the same one we now deploy behind a counter — the customer is what changed.",
  roster: {
    label: "Selected clients",
    title: "Teams we have shipped with."
  },
  cases: {
    label: "Case studies",
    title: "What we actually delivered.",
    lead:
      "Implementation-oriented summaries of shipped scope. No unapproved customer quotes, no invented metrics.",
    deliveredLabel: "What we delivered"
  },
  feedback: {
    label: "Client feedback",
    title: "In their words, approximately.",
    lead:
      "Directional summaries written from the work context. Each will be replaced with an exact quote once the source approves final wording."
  },
  more: {
    label: "Additional clients",
    title: "Visible now, case details later."
  },
  cta: {
    label: "Work with us",
    title: "Bring us in where the operation actually runs.",
    body:
      "If you run a local business, start with a deployment. If you are building something else and want the same engineering, say so and we will tell you honestly whether we are the right team.",
    action: { label: "Book a deployment", href: "/contact" }
  }
}

/* ------------------------------------------------------------------ *
 * /contact
 * ------------------------------------------------------------------ */

export const contactPage = {
  label: "Start a conversation",
  titleLead: "Tell us what the week",
  titleEmphasis: "actually costs you",
  titleTail: ".",
  lead:
    "A few lines about the business, the part of the week that hurts most, and what a good outcome looks like. We reply with a practical next step, not a deck.",
  facts: [
    {
      term: "Email",
      value: "contact@yexlabs.xyz",
      href: "mailto:contact@yexlabs.xyz"
    },
    { term: "Focus", value: "Local business · owner-operated to multi-site" },
    {
      term: "Coverage",
      value: "Toronto · North America · on site from week zero"
    }
  ] as ReadonlyArray<{ term: string; value: string; href?: string }>,
  intake: {
    label: "Intake",
    title: "Pick the closest starting point.",
    body:
      "Each one opens a pre-filled email. If the problem spans several, describe the business goal first and we will work out the shape.",
    extraOptions: [
      "Full deployment — all six modules",
      "Not sure yet — start with a diagnostic"
    ],
    action: "Or just email us"
  },
  prompts: {
    label: "What to include",
    title: "A useful first message is short.",
    items: [
      "What the business does, and how many sites.",
      "Which part of the week costs you the most time or margin.",
      "What systems you already run — till, rota, accounting, suppliers.",
      "What a good outcome looks like ninety days from now."
    ]
  }
}
