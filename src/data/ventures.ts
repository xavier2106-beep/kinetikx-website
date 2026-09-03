// XGL msg 7042 (2026-09-03) · venture detail data model + HERAKLYS pilot copy.
// Lucy owns final copy per section (brief sent Support Crowd 2026-09-03) —
// placeholders here read as "coming from Lucy" so the shell + motion can ship
// and Lucy's real copy swaps in-place with zero refactor.

export type MarketTier = {
  label: string;
  amountLabel: string; // display-ready ("$4.1B", "$820M", etc.)
  paragraph: string;
};

export type KeyNumber = {
  label: string;
  value: string;
  hint?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  note?: string;
};

export type VentureDetail = {
  description: string[]; // one string per paragraph
  conceptDiagramSrc?: string; // XGL to provide
  conceptDiagramCaption?: string;
  market: {
    tam: MarketTier;
    sam: MarketTier;
    som: MarketTier;
  };
  uiUx: {
    paragraph: string;
    demoUrl?: string;
    demoLabel?: string;
    screenshots?: { src: string; alt: string }[];
  };
  businessModel: string[];
  gtm: string[];
  keyNumbers: KeyNumber[];
  team: {
    intro: string;
    members: TeamMember[];
  };
};

// === HERAKLYS · pilot placeholder content ================================
// Replace each section with Lucy's exec-summary copy when it lands.
// Sections marked [LUCY] are the ones waiting on her; the rest are
// tech-side facts I can source myself from the CSL ERP repo.
export const HERAKLYS_DETAIL: VentureDetail = {
  description: [
    "HERAKLYS is the operating system for private sport venues — a multi-tenant SaaS that replaces the legacy patchwork of booking, membership, POS, loyalty, digital signage and staff-ops tools that every mid-to-large racquet / racket / court-based club stitches together today.",
    "Built on a per-tenant perpetual-licence commercial model — customers own their instance forever, with source-code escrow — HERAKLYS aligns the vendor-client relationship around long-term partnership rather than lock-in extraction.",
    "[LUCY placeholder] Third paragraph — market moment + why-now + KinetiKx thesis fit.",
  ],
  conceptDiagramSrc: undefined, // XGL to provide
  conceptDiagramCaption: "The 15-module architecture — booking, membership, loyalty, POS, digital signage, staff ops, marketing, reporting, integrations.",
  market: {
    tam: {
      label: "TAM",
      amountLabel: "[LUCY]",
      paragraph:
        "[LUCY placeholder] Total addressable market — global private sport-venue software category, including racquet/racket clubs, padel/pickleball chains, tennis/badminton facilities, multi-sport complexes.",
    },
    sam: {
      label: "SAM",
      amountLabel: "[LUCY]",
      paragraph:
        "[LUCY placeholder] Serviceable available market — QC/CA + GCC premium sport-venue chains within our reachable geographies over 24-36 months, filtered by digital-maturity threshold and revenue tier.",
    },
    som: {
      label: "SOM",
      amountLabel: "[LUCY]",
      paragraph:
        "[LUCY placeholder] Serviceable obtainable market — realistic capture 24-36 months post-launch given CSL pilot + Delegatus + XGL warm-intro pipeline.",
    },
  },
  uiUx: {
    paragraph:
      "The member-facing WebApp is designed as a native-app-quality PWA — 3-face card flip on member landing, sport → date → time → court booking flow, wallet + loyalty + perks in one tap. The admin console covers 15 operational modules with role-based access. A live demo tenant runs at demo.heraklys.com — fictional venue, real functional depth.",
    demoUrl: "https://demo.heraklys.com",
    demoLabel: "Open live demo",
    screenshots: [],
  },
  businessModel: [
    "**Perpetual licence per tenant** — each customer buys their instance once, owns it forever, no renewal-cliff risk. Legal template signed by Rebecca (KVS in-house counsel), external counsel signs off on first paid client for stamp weight.",
    "**Recurring hosting + support** — DigitalOcean Toronto managed infrastructure with white-glove ops. Base $/month per venue + usage tiers for storage/compute overages.",
    "**Add-on modules** — POS integration, payroll, wallet passes, digital signage, marketing automation. Each is a discrete price line.",
    "**[LUCY] segment paragraph** — primary segment (multi-site private sport chains in GCC + QC), secondary (single-site premium clubs), stretch (municipal + community centres).",
  ],
  gtm: [
    "**Pilot** — CSL (Complexe Sportif Longueuil, QC) is the live implementation partner. 5,300 members, real transactions, real staff feedback. Serves as reference client for every future prospect visit.",
    "**Legal + intro network** — Delegatus (via Rebecca) opens the QC private-club ecosystem. XGL's Dubai network opens GCC.",
    "**[LUCY] pipeline paragraph** — first 5 external clients target, ACV expectation, expected sales cycle, land-and-expand mechanics per venue.",
  ],
  keyNumbers: [
    { label: "Pilot client", value: "CSL Longueuil", hint: "5,300 members live" },
    { label: "Repo scale", value: "~200 tables", hint: "131 tenant-scoped RLS" },
    { label: "Modules shipped", value: "10/15", hint: "GO LIVE Q4 2026" },
    { label: "Transactions imported", value: "27,453", hint: "$2.7M Jeggy history" },
    { label: "Compute infra", value: "Supabase MTL + Vercel", hint: "DO Toronto Q4 bascule" },
    { label: "AI-native", value: "Stanley + Sienna + Nino", hint: "3-agent runtime, budget-capped" },
    { label: "[LUCY] MRR pilot", value: "[LUCY]", hint: "CSL pilot revenue" },
    { label: "[LUCY] Pipeline value", value: "[LUCY]", hint: "target ACV × prospects" },
  ],
  team: {
    intro:
      "HERAKLYS is built by a digital-native venture studio squad — a small team of humans plus a coordinated agent bench that handles engineering, brand, legal, and QA at software speed.",
    members: [
      { name: "Xavier G. Layre", role: "Founder + Product", note: "KinetiKx founder, HERAKLYS thesis owner" },
      { name: "Nina", role: "Full-stack engineer + tech sidekick", note: "Foundation Week AI Core builder, CSL ERP lead engineer" },
      { name: "Rebecca", role: "In-house counsel", note: "MSA + LICENSE + DPA drafting, external counsel liaison" },
      { name: "Lucy", role: "Brand + marketing", note: "kinetikx.com + demo.heraklys.com + venture positioning" },
      { name: "Noémie", role: "Junior engineer", note: "CMS + Digital Signage" },
      { name: "[LUCY] additions", role: "[LUCY]", note: "Any additional team callouts (advisors, coaches)" },
    ],
  },
};

// Slug → detail lookup. Add new venture keys here as content lands.
// A venture without an entry hides the "click to expand" affordance.
export const VENTURE_DETAILS: Record<string, VentureDetail> = {
  heraklys: HERAKLYS_DETAIL,
};
