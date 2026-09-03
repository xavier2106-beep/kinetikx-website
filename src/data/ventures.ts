// XGL msg 7042 (2026-09-03) · venture detail data model + HERAKLYS pilot copy.
// Copy landed 2026-09-03 from Lucy del Mar (`~/Documents/Lucy/Docs/2026-09-03-
// heraklys-venture-drawer-content.md`) — investor executive-summary tone, EN.
// Numbers backfilled by Nina from CSL Supabase (matrix-dm 2026-09-03).
//
// Editorial guardrails baked into this copy (per Lucy's INTERNAL NOTES —
// stripped from published output but kept here for any future editor) :
//   A · Pilot venue stays unnamed until post-launch — "5,300-member multi-
//       sport club in Quebec", never "CSL" / "Complexe Sportif Longueuil".
//   B · No pilot MRR / contract value until the 2026-09-18 board decision.
//   C · Pricing stays in bands ($300–400k+ 5Y value, "low-to-mid six figures"
//       first year). No list prices without XGL sign-off.
//   D · Data residence deliberately "primary hosting in Canada" — never
//       "data never leaves Canada" (Loi 25 + US sub-processors).
//   E · AI claims always "under human governance" — never "autonomous".
//   F · TAM chart axis label should read "five-year customer value (USD)",
//       not ARR.

export type MarketTier = {
  label: string;
  amountLabel: string; // display-ready ("$2.52B", "$841M", …)
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
  description: string[]; // one string per paragraph, supports **bold**
  conceptDiagramSrc?: string; // XGL to provide the image
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
    demoNote?: string;
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

// === HERAKLYS · pilot content (Lucy 2026-09-03) ==========================
export const HERAKLYS_DETAIL: VentureDetail = {
  description: [
    "HERAKLYS is a Sport Venue Operating System — the commercial and operational backbone of a modern sports venue, delivered as one platform the venue **owns**. Fourteen integrated modules cover the full revenue and operations surface: memberships and tiers, bookings and payments, dynamic pricing, loyalty, CRM and sponsorships, marketing, member web and mobile app, business intelligence, surveys, digital signage, messaging, asset management, access control, and back-office automation. Where incumbents rent fragmented point solutions to venues, HERAKLYS replaces the patchwork with a single system of record — one truth for every transaction, every member, every court-hour.",
    "What makes the model different is the evolution layer: an embedded AI development and support team, operating under strict human governance. It resolves routine member and staff requests around the clock, and it continuously builds, tests and proposes platform improvements that humans validate before deployment. The venue's system in 2028 will be better than the one it bought in 2026 — without a rebuild project, and without surprise invoices.",
    "The positioning in one line: **owned by the venue, improved by the network, evolved through AI.** Venues stop being hostages of subscription software; they become owners of their operating system — and stakeholders in its growth, since founding venues participate in the revenue of every subsequent deployment.",
  ],
  conceptDiagramSrc: undefined, // XGL to provide the image
  conceptDiagramCaption:
    "One platform, fourteen modules, one governed AI evolution layer.",
  market: {
    tam: {
      label: "TAM",
      amountLabel: "$2.52B",
      paragraph:
        "Five-year value pool. A bottom-up, venue-unit assessment across the UAE, Saudi Arabia, rest of GCC, Canada, Spain and Portugal identifies 8,950 enterprise-plausible venue deployments — multi-sport clubs, racquet and padel centres, recreation complexes, aquatic/ice/golf venues and institutional sports centres, after excluding micro-operators. At geography-specific five-year customer values ($210k–$365k per venue), that is a $2.52B total addressable pool. These are cumulative five-year customer-value figures, not annualised SaaS market sizes.",
    },
    sam: {
      label: "SAM",
      amountLabel: "$841M",
      paragraph:
        "Filtering for ideal customer profile, product readiness, language and regulatory fit yields 2,925 serviceable venue deployments over 2026–2030. Canada and Spain hold the largest venue pools; the GCC offers higher per-venue economics and faster reference concentration — which is why the entry sequence is a Canada / UAE beachhead, then KSA and Iberian channel expansion.",
    },
    som: {
      label: "SOM",
      amountLabel: "$37.4M",
      paragraph:
        "Base case, with $20.9M–$59.0M range. Executable five-year capture: ~110 contracted venue deployments by year five — 3.8% of SAM, 1.2% of TAM — constrained by sales capacity and implementation throughput, not by market size. The gating factor is repeatable deployment and referenceability; the first flagship deployment (live now in Quebec) is precisely that proof.",
    },
  },
  uiUx: {
    paragraph:
      "HERAKLYS is built for three users at once: the member who books, pays and enters in three taps; the staff member who runs the counter from one screen instead of five tools; and the director who watches occupancy, revenue and attendance live instead of reconstructing them in spreadsheets weeks later. Bilingual (EN / FR) by design, mobile-first, with an interface that behaves like the consumer apps members already love.",
    // 2026-09-03 · demo link + creds temporarily masked pending i18n tenant-
    // conditioning fix (task #319). Root cause : demo.heraklys.com SSRs the
    // default i18n catalogue, which leaks "Complexe Sportif Longueuil" +
    // "CSL" in the HTML before any login → Loi 25 anonymity exposure. Lucy
    // caught this in QC. Re-enable both once the message catalogue reads
    // `{venue_name}`/`{venue_short}` from `tenants.display_name` at runtime.
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote:
      "Live demo access is being finalised — a fully operating instance on fictional venue data will be published here shortly.",
    screenshots: [],
  },
  businessModel: [
    "HERAKLYS monetises in four movements: **Deploy** (implementation engagement), **Own** (a perpetual platform licence — the venue owns its system and its data, permanently), **Participate** (a small share of platform-mediated or platform-created revenue, so HERAKLYS earns only when the venue grows), and **Expand** (AI Resource Units for the governed AI team, platform assurance, additional sites, and marketplace development). The blend front-loads licence and implementation revenue, then compounds through participation and AI capacity — a blended five-year customer value of $300k–$400k+ per enterprise venue, materially above per-seat SaaS economics.",
    "**Primary segment**: private multi-sport clubs and chains with complex operations — multiple revenue streams, high transaction volume, 2,000+ members — in the GCC and Canada / Quebec. **Secondary**: municipal and community recreation complexes, sports academies, racquet / padel groups and resort venues. The unit of sale is the venue deployment: a 20-site chain is 20 deployments with head-office economics.",
  ],
  gtm: [
    "The first five customers come through three channels that require no cold outbound: the **flagship pilot** — a 5,300-member, 30+ court multi-sport club in Quebec already running HERAKLYS, whose board-level transformation case doubles as the sales collateral for every club that resembles it; **professional-network introductions** in Quebec's club and legal / advisory ecosystem; and **founder-led warm introductions** across the GCC, where decision-makers are concentrated and reference visibility travels fast. Founding venues participate in the revenue of subsequent sales — turning the first customers into an active referral engine rather than passive logos.",
    "Expected enterprise sales cycle: 3–6 months (club boards decide seasonally; the pilot's documented payback case shortens the argument). First-year contract value per venue sits in the **low-to-mid six figures** (implementation + perpetual licence + AI capacity), with participation revenue compounding from year one.",
  ],
  // Wording per Lucy 2026-09-03 (matrix-dm) — the CAD $2.7M is *migrated
  // and reconciled on-platform*, not processed live ; the on-platform tx
  // count is aggregate across payments + bookings + loyalty events, not
  // "payments processed". Phrasing is defensible + safe.
  keyNumbers: [
    { label: "Flagship pilot", value: "1 venue live", hint: "5,300-member multi-sport club · Quebec" },
    { label: "Venue transactions on-platform", value: "87,000+", hint: "27.5k payment charges · 33.2k bookings · 27.1k loyalty events" },
    { label: "Transaction volume migrated", value: "CAD $2.7M+", hint: "Reconciled on-platform" },
    { label: "Active tenants", value: "3", hint: "2 production + 1 public demo · row-level-isolated multi-tenant" },
    { label: "Codebase depth", value: "104k lines TS / SQL", hint: "224 Postgres tables · 42 API routes" },
    { label: "Modules integrated", value: "14 + AI layer", hint: "Under human governance" },
    { label: "Primary hosting", value: "Canada", hint: "Supabase AWS ca-central-1 (Montréal) + Vercel" },
    { label: "Languages at launch", value: "EN + FR", hint: "Loi 25 / Loi 96 built in" },
    { label: "Market opportunity", value: "8,950-venue TAM", hint: "110-venue five-year SOM" },
    // 2026-09-03 · demo URL removed from Key Numbers pending task #319 i18n
    // fix — same anonymity leak Lucy caught on UI/UX tab. Re-add both once
    // demo.heraklys.com no longer leaks Longueuil / CSL in its SSR HTML.
    { label: "Live public demo", value: "Publishing shortly", hint: "Fictional venue, real depth" },
  ],
  team: {
    intro:
      "HERAKLYS is built by KinetiKx Venture Studios the way it believes ventures should be built in 2026: a founder with an AI-native operating squad, not an org chart. One human at the wheel, a digital-native squad at every function, human validation on everything that ships — the same governance model the product itself sells.",
    members: [
      {
        name: "Xavier (XGL)",
        role: "Founder + Product Architect",
        note: "Venue economics, platform vision, GCC / Canada network",
      },
      {
        name: "Nina Solheim",
        role: "Studio Engineer in Residence",
        note: "Platform + web engineering, AI Core, infrastructure",
      },
      {
        name: "Noémie Bérenger",
        role: "Dedicated Developer",
        note: "Venue ERP, digital signage, content management",
      },
      {
        name: "Rebecca Falcone",
        role: "Legal Counsel",
        note: "Contracts, Loi 25 / Loi 96 compliance, data governance",
      },
      {
        name: "Lucy del Mar",
        role: "Brand, Marketing & Sales",
        note: "Positioning, kinetikx.com, prospect materials",
      },
      {
        name: "Sonnet",
        role: "Engineering Support",
        note: "Overnight builds, tests, code review",
      },
    ],
  },
};

// === NYSM · pilot 2 (XGL msg 7086) · placeholders pending Lucy copy ======
// Mirror of the HERAKLYS pattern — Lucy is briefed for the exec-summary
// content (2026-09-04, matrix-dm). XGL provides the concept diagram image.
export const NYSM_DETAIL: VentureDetail = {
  description: [
    "N•Y•S•M is The Revealer — a video-résumé platform that lets candidates ship a professionally-produced 60-second pitch instead of a static CV. Script, record, reveal: three steps between a job seeker and a hiring manager watching them speak, not scanning their bullet points.",
    "[LUCY placeholder] Second paragraph — product positioning: why video, why now, what makes NYSM different from Loom-style upload or the LinkedIn one-shot camera.",
    "[LUCY placeholder] Third paragraph — market moment + why-now + KinetiKx thesis fit.",
  ],
  conceptDiagramSrc: undefined, // XGL to provide the image
  conceptDiagramCaption:
    "[LUCY placeholder] One-line caption if the image benefits from context.",
  market: {
    tam: {
      label: "TAM",
      amountLabel: "[LUCY]",
      paragraph:
        "[LUCY placeholder] Total addressable — global HR tech / hiring software (already teased at $4B+ on the cohort card). Bottom-up ideal: annual job-seeker × ARPU + recruiter seats × ACV.",
    },
    sam: {
      label: "SAM",
      amountLabel: "[LUCY]",
      paragraph:
        "[LUCY placeholder] Serviceable available — geography + language + segment filters applied to the TAM over 24-36 months.",
    },
    som: {
      label: "SOM",
      amountLabel: "[LUCY]",
      paragraph:
        "[LUCY placeholder] Serviceable obtainable — realistic 24-36 month capture given pilot + warm-intro pipeline.",
    },
  },
  uiUx: {
    paragraph:
      "[LUCY placeholder] Product experience: script assistant → record on any device → reveal via a public share page that plays like a Loom without the enterprise vibe. Mobile-first for candidates, dashboard for recruiters.",
    demoUrl: "https://mypage.nysm.me",
    demoLabel: "See a real reveal",
    demoNote:
      "[LUCY placeholder] One-line note about what the visitor will find at the demo URL.",
    screenshots: [],
  },
  businessModel: [
    "[LUCY placeholder] Revenue model — Candidate-side vs recruiter-side monetisation, freemium threshold, paid tiers, add-ons.",
    "[LUCY placeholder] Segment — primary (job seekers in which geographies + verticals), secondary (recruiters, agencies, schools).",
  ],
  gtm: [
    "[LUCY placeholder] Acquisition strategy for the first N users + first M recruiters. Viral loops, paid, partnerships, ATS integrations.",
    "[LUCY placeholder] Expected cycle, ACV per recruiter side, CAC assumptions.",
  ],
  keyNumbers: [
    { label: "Product status", value: "MVP live", hint: "mypage.nysm.me · Stage 0" },
    { label: "[LUCY] User signups", value: "[LUCY]", hint: "to-date" },
    { label: "[LUCY] Videos published", value: "[LUCY]", hint: "reveals shipped" },
    { label: "[LUCY] Retention D7 / D30", value: "[LUCY]", hint: "cohort curves" },
    { label: "[LUCY] Recruiter pilots", value: "[LUCY]", hint: "in conversation / signed" },
    { label: "[LUCY] MRR / Pipeline", value: "[LUCY]", hint: "if published-safe" },
    { label: "Market opportunity", value: "$4B+ TAM", hint: "HR Tech / Hiring — Lucy to refine" },
    { label: "Languages at launch", value: "[LUCY]", hint: "which locales live today" },
  ],
  team: {
    intro:
      "[LUCY placeholder] KinetiKx Venture Studios framing — founder-led with an AI-native squad. Mirror the HERAKLYS team paragraph, tuned for NYSM's product surface.",
    members: [
      { name: "Xavier (XGL)", role: "Founder + Product Architect", note: "Vision + partnerships + GCC/Canada network" },
      { name: "[LUCY] Nina Solheim", role: "Engineering (web + infra)", note: "[LUCY]" },
      { name: "[LUCY] Mike", role: "Mobile (S7 · React Native / Expo)", note: "[LUCY]" },
      { name: "[LUCY] Rebecca Falcone", role: "Legal counsel", note: "Contracts, privacy, GDPR/Loi 25" },
      { name: "[LUCY] Lucy del Mar", role: "Brand, marketing & sales", note: "[LUCY]" },
      { name: "[LUCY] additions", role: "[LUCY]", note: "Any additional callouts (advisors, coaches)" },
    ],
  },
};

// Slug → detail lookup. Add new venture keys here as content lands.
// A venture without an entry hides the "click to expand" affordance.
export const VENTURE_DETAILS: Record<string, VentureDetail> = {
  heraklys: HERAKLYS_DETAIL,
  nysm: NYSM_DETAIL,
};
