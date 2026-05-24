export type ClientLogoVariant = "disc" | "wordmark"

export type Client = {
  id: string
  mark: string
  name: string
  work: string
  url?: string
  logo?: string
  logoVariant?: ClientLogoVariant
}

export const clients: Client[] = [
  {
    id: "honeypot",
    mark: "HP",
    name: "Honeypot Finance",
    work: "Research · smart contracts · AI workflow",
    url: "https://honeypotfinance.xyz/",
    logo: "/clients/honeypot-finance-logo.jpg"
  },
  {
    id: "torodex",
    mark: "TD",
    name: "torodex.xyz",
    work: "Research · smart contracts · AI workflow",
    url: "https://torodex.xyz/",
    logo: "/clients/torodex-logo.png",
    logoVariant: "disc"
  },
  {
    id: "florus",
    mark: "FL",
    name: "florus.ai",
    work: "Design · prototype · implementation",
    url: "https://www.florus.ai/",
    logo: "/clients/florus-logo-mark.svg",
    logoVariant: "disc"
  },
  {
    id: "canadao",
    mark: "CD",
    name: "Canadao",
    work: "Operations"
  },
  {
    id: "1dao",
    mark: "1D",
    name: "1DAO",
    work: "PMF · vision · implementation guidance",
    url: "https://1dao.world/",
    logo: "/clients/1dao-logo.png"
  },
  {
    id: "splatter",
    mark: "SP",
    name: "Splatter Protocol",
    work: "Protocol design · frontend · GTM automation",
    url: "https://splatter-front.vercel.app/",
    logo: "/clients/splatter-logo.svg",
    logoVariant: "wordmark"
  }
]

export const caseStudies = [
  {
    clientId: "florus",
    label: "AI design workflow",
    title: "Product prototype and design implementation.",
    summary:
      "YexLabs helped Florus turn an early AI product direction into a designed, buildable product system and supported the path from concept to implementation.",
    delivered: [
      "Full design prototype for the core Florus product experience",
      "Design implementation support for the live product surface",
      "AI-assisted design workflow to move faster from concept to usable product"
    ]
  },
  {
    clientId: "honeypot",
    label: "DeFi R&D to TGE support",
    title: "From white paper design to protocol prototype and launch planning.",
    summary:
      "YexLabs supported Honeypot Finance across the strategy and implementation stack, connecting DeFi model research with smart-contract execution and TGE preparation.",
    delivered: [
      "White paper design and technical narrative support",
      "DeFi model research and development",
      "Prototype build for the product and protocol direction",
      "Smart contract development support",
      "Marketing plan design and integration toward the TGE"
    ]
  },
  {
    clientId: "splatter",
    label: "Protocol productization",
    title: "Design, frontend implementation, ecosystem planning, and GTM automation.",
    summary:
      "YexLabs helped Splatter Protocol package a technical protocol into a clearer product and ecosystem story while supporting implementation and growth workflows.",
    delivered: [
      "Design prototypes and design implementation",
      "Frontend code implementation",
      "Business plan and ecosystem consultancy",
      "Key partner introduction support",
      "GTM automation planning and workflow design"
    ]
  },
  {
    clientId: "1dao",
    label: "PMF and vision design",
    title: "Founder-level product-market-fit design and implementation guidance.",
    summary:
      "YexLabs supported 1DAO with early-stage product direction, vision design, and practical implementation guidance.",
    delivered: [
      "Product-market-fit design and positioning support",
      "Vision design for the product and operating model",
      "Implementation guidance across product, workflow, and technical choices"
    ]
  }
]

export const feedbackSources = [
  {
    clientId: "honeypot",
    name: "Emilie Zhang",
    role: "Business Development Manager, Honeypot Finance",
    url: "https://www.linkedin.com/in/emilie-zhang-48833594/",
    summary:
      "YexLabs helped turn a complex DeFi product story into clearer white paper direction, launch materials, and partner-facing strategy that business teams could actually use."
  },
  {
    clientId: "honeypot",
    name: "punk2sang",
    role: "VP Engineering, Honeypot Finance",
    url: "https://x.com/punk2sang",
    summary:
      "YexLabs connected DeFi model R&D with prototype execution and smart-contract planning, helping the engineering side move faster across product, protocol, and launch constraints."
  },
  {
    clientId: "splatter",
    name: "Andres",
    role: "Cofounder, Splatter Protocol",
    summary:
      "YexLabs made Splatter easier to explain, demo, and ship by combining design prototypes, frontend implementation, ecosystem planning, partner introductions, and GTM automation."
  },
  {
    clientId: "torodex",
    name: "Romeo",
    role: "Cofounder, Toro / torodex.xyz",
    summary:
      "YexLabs brought founder-level judgment to product direction, technical architecture, and execution planning, with practical tradeoff thinking that helped Toro sharpen what to build next."
  },
  {
    clientId: "1dao",
    name: "Chaochao",
    role: "Cofounder, 1DAO",
    url: "https://www.linkedin.com/in/chao-chao-sound/",
    summary:
      "YexLabs helped clarify the 1DAO vision, PMF narrative, and implementation priorities so the team could move forward with a sharper product roadmap."
  }
]
