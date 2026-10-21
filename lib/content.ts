/**
 * Portfolio logos — pre-cropped to content bounds (matching selectsyndicate.io
 * optical framing). `scale` is a light visual-weight tweak inside a shared box.
 */
export const portfolio = [
  { src: "/assets/logo-spacex.png", alt: "SpaceX", scale: 1 },
  { src: "/assets/logo-anthropic.png", alt: "Anthropic", scale: 1 },
  { src: "/assets/logo-openai.png", alt: "OpenAI", scale: 0.95 },
  { src: "/assets/logo-figure.png", alt: "Figure", scale: 0.92 },
  { src: "/assets/logo-anduril.png", alt: "Anduril", scale: 1 },
  { src: "/assets/logo-saronic.png", alt: "Saronic", scale: 1 },
  { src: "/assets/logo-lambda.png", alt: "Lambda", scale: 1 },
  { src: "/assets/logo-shield.png", alt: "Shield AI", scale: 1 },
  { src: "/assets/logo-coco.png", alt: "Coco Robotics", scale: 0.95 },
  { src: "/assets/logo-taiv.png", alt: "TAIV", scale: 0.95 },
  { src: "/assets/logo-primer.png", alt: "Primer", scale: 0.9 },
  { src: "/assets/logo-positron.png", alt: "Positron", scale: 1 },
] as const;

export const principles = [
  {
    number: "01",
    title: "Curated with conviction.",
    body: "A selective approach to opportunities, from mature seed through pre-IPO.",
  },
  {
    number: "02",
    title: "Context, beyond access.",
    body: "Detailed investment memos, diligence resources, and founder access when relevant.",
  },
  {
    number: "03",
    title: "Personal by design.",
    body: "Concierge-level support, with a digital investment process built around you.",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Start a conversation.",
    body: "Tell us about your interests and explore whether the Syndicate is a fit.",
  },
  {
    number: "02",
    title: "Explore the opportunity.",
    body: "Review curated deals, investment memos, and supporting diligence materials.",
  },
  {
    number: "03",
    title: "Make your own decision.",
    body: "Choose the opportunities that align with your objectives, with personal support and a digital process.",
  },
] as const;

export const faqs = [
  {
    q: "Who is Select Syndicate for?",
    a: "Select Syndicate connects Select members and institutional partners with private-market opportunities. Investments are available only to eligible accredited investors or, for certain opportunities, qualified purchasers. Eligibility and requirements depend on the offering.",
  },
  {
    q: "What kinds of companies do you invest in?",
    a: "Our focus spans mature seed to pre-IPO companies. The portfolio includes businesses in artificial intelligence, aerospace, robotics, and other emerging industries. Each opportunity has its own investment thesis and risks.",
  },
  {
    q: "Is access included in Select membership?",
    a: "Access to the Syndicate is included in Select membership. Any investment is separate and subject to investor eligibility, availability, and the terms of its offering documents. Institutional partners can contact us directly.",
  },
  {
    q: "What are the minimums and fees?",
    a: "Minimum commitments, fees, and other terms vary by opportunity and are set out in the relevant offering documents. Get in touch to discuss current opportunities and their requirements.",
  },
] as const;

export const nav = [
  { href: "#approach", label: "Our approach" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#performance", label: "Performance" },
  { href: "#app", label: "In the app" },
  { href: "#experience", label: "Experience" },
] as const;

/** Sections that sit on light surfaces — header switches to dark-on-light */
export const lightSections = [
  "app",
  "experience",
  "connect",
  "site-footer",
] as const;
