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
//
// Guardrails carried over from the HERAKLYS incident (Charlotte 2026-09-04) :
//   (1) Tripwire mypage.nysm.me for PII exposure BEFORE re-enabling the
//       demo link in the drawer (host public + API-level, not just SSR HTML).
//   (2) Section 7 key numbers = XGL-arbitrated only. No automatic DB pulls
//       into published copy. Placeholders stay until he explicitly approves.
//   (3) Section 1 product description = Rebecca review required. Video
//       profiling is EU AI Act art. 5 + NYC LL144 + GDPR / Loi 25 territory.
//       No "scoring / profiling / matching automatisé" claim ships without
//       her sign-off.
//   (4) Any endpoint that emits data derived from the demo tenant DB
//       (ICS, .vcf, PDF exports, CSV downloads…) DEFAULTS to fail-closed
//       404 on the demo host. Never fail-open. Enforced in the route
//       handler, not just in middleware. See /booking/[id]/ics/route.ts
//       for the HERAKLYS reference implementation.
export const NYSM_DETAIL: VentureDetail = {
  description: [
    "N•Y•S•M is The Revealer — a video-résumé platform that lets candidates ship a professionally-produced 60-second pitch instead of a static CV. Script, record, reveal: three steps between a job seeker and a hiring manager watching them speak, not scanning their bullet points.",
    "[LUCY placeholder] Second paragraph — product positioning: why video, why now, what makes NYSM different from Loom-style upload or the LinkedIn one-shot camera.",
    "[LUCY placeholder] Third paragraph — market moment + why-now + KinetiKx thesis fit.",
  ],
  conceptDiagramSrc: "/images/ventures/diagrams/nysm.png", // XGL msg 7147
  conceptDiagramCaption: undefined,
  // === TAM · SAM · SOM · Teresa v1 (2026-09-10, QC Lucy) ==================
  // Source : Content-Kits/_cross-venture/03-tam-sam-som/
  //          KVS-TAM-SAM-SOM-9-ventures-v1.pdf (NYSM section, pp. 2-4).
  market: {
    tam: {
      label: "TAM",
      amountLabel: "$1.5B",
      paragraph:
        "The GCC HR-tech software market — the software-mediated slice of talent acquisition and management — is the defensible ceiling for a video-first hiring platform priced in AED. IMARC pegs it at USD 760 M in 2025 with a 9.45% CAGR to USD 1.76 B by 2034 ; Astute Analytica's broader read (including outsourced HR services) sizes it at USD 2.56 B in 2023 growing to USD 5.48 B by 2032. NYSM anchors on the USD 1.5 B midpoint (2024/2025), which sits comfortably between the IMARC floor and the Astute upper bound and matches the software-only frame in which NYSM competes.",
    },
    sam: {
      label: "SAM",
      amountLabel: "$200–250M",
      paragraph:
        "The serviceable slice is online, structured recruitment software for white-collar mid-to-high-volume employers across the GCC — excluding blue-collar volume hiring, government procurement, and enterprise HCM suites. Applying a 25–30% subsegment filter to the working TAM (recruitment share of GCC HR-tech spend) yields USD 375–450 M, tightened with a MENA video-interview cross-check (~USD 58–61 M today) to a defensible working SAM of USD 200–250 M. The universe : UAE alone has ~390,000 registered private-sector companies with >12,000 subject to Emiratisation targets across 14 sectors, and 69% of UAE employers reported expansion hiring plans for 2024.",
    },
    som: {
      label: "SOM",
      amountLabel: "~$7M · modelled",
      paragraph:
        "NYSM's GTM stages Dubai-first launch (September 2026) → UAE penetration through 2027 → KSA and wider GCC from 2027/2028. Year 1 targets the ~12,000+ Emiratisation-mandate companies plus mid-size white-collar employers on digital channels. Capturing 0.5–1% of SAM in Year 1 yields USD 1.1–2.25 M ARR, rising to 2–5% by Year 3 as UAE penetration matures and KSA/Qatar layer in — a modelled 3-year cumulative capture of USD 4.5–11 M, midpoint ~USD 7 M by end of Year 3 (~3% of SAM). Conservative on purpose : no enterprise or government anchor assumed, consistent with an AED-priced token economy that favours volume SME and mid-market adoption.",
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

// === TCHIP·IN ============================================================
// XGL msg 7341-7345 (2026-09-13) : populate drawer with Teresa's market
// data from KVS-TAM-SAM-SOM-9-ventures-v1.pdf. Other tabs are [LUCY]
// placeholders until Lucy pushes the corresponding Content-Kits buckets.
export const TCHIPIN_DETAIL: VentureDetail = {
  description: [
    "TCHIP·IN is The Gifter — a crowd-gifting platform built for the GCC's occasion economy. The whole circle chips in for the moments that matter : weddings, Eid, corporate milestones, birthdays, farewells. One GiftPot, many contributors, one collective gift.",
    "[LUCY placeholder] Second paragraph — product positioning : why crowd-gifting, why now, what makes Tchip·In different from Western equivalents (GoFundMe-for-gifts, group-buy tools) in a market where the occasion pool is fundamentally larger and denser.",
    "[LUCY placeholder] Third paragraph — market moment + why GCC first + KinetiKx thesis fit.",
  ],
  conceptDiagramSrc: "/images/ventures/diagrams/tchipin.png",
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "$4.5B",
      paragraph:
        "The addressable market is the GCC digitally-enabled gifting economy — the subset of gifting spend that moves through digital rails or is addressable by a digital-first platform. Triangulating the MENA food-and-specialty gifting market (USD 6.04 B in 2024 → USD 8.47 B by 2032) and the Middle East gift card and incentive card market (USD 7.32 B in 2024, 12.2% CAGR), the GCC-only digitally-addressable pool — personal plus corporate, excluding in-person retail gift purchases — is estimated at USD 4–5 B in 2025. The Eid/Ramadan seasonal spike alone reached USD 17.3 B in KSA and USD 16.4 B in the UAE economy-wide. USD 4.5 B is used as the mid-point conservative anchor.",
    },
    sam: {
      label: "SAM",
      amountLabel: "$600M",
      paragraph:
        "Tchip·In doesn't compete for all gifting spend — it competes for occasions where a group collectively funds a gift : weddings, Eid household giving, corporate employee milestones, farewells, birthdays. Bottom-up : UAE hosts ~17,700–21,000 weddings/year at ~USD 68,000 average spend, and KSA holds 150,000+ weddings/year ; guest cash gifts represent 15–25% of wedding occasion spend, yielding a GCC crowd-giftable wedding pool of USD 1.5–2 B. Layer in a conservative Gulf Eid household digital-gifting pool of ~USD 1.6 B and corporate milestone gifting (~USD 240–640 M), then apply a 15–25% digital penetration rate, and the crowd-gifting SAM lands at USD 500–700 M in 2025 — mid-point USD 600 M.",
    },
    som: {
      label: "SOM",
      amountLabel: "~$18M · modelled",
      paragraph:
        "Tchip·In's GTM is UAE-first, regulation-first : the MVP is scoped against the UAE's regulated payments and stored-value framework, with licensed program-management partners as the foundation. Year 1 opens the ~17,700–21,000 UAE weddings + Eid occasion volumes + initial corporate partnerships ; at a 0.5–1% capture rate in Year 1, growing to 3–5% by Year 3 as UAE penetration matures and KSA is added, the three-year cumulative capture is 2–4% of SAM = USD 12–24 M. In GiftPot terms : ~36,000–60,000 active GiftPots closed over three years at USD 300–500 average GiftPot value. Modelled midpoint : ~USD 18 M cumulative / ~45,000 active GiftPots / ~3% of SAM by Year 3.",
    },
  },
  uiUx: {
    paragraph:
      "[LUCY placeholder] Product experience — GiftPot creation, contribution flow, delivery + redemption. Mobile-first with WhatsApp share as the primary invite channel.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "[LUCY placeholder] Revenue model — Trx fee + revenue share ; per Tchip·In cohort card summary.",
    "[LUCY placeholder] Segment split : B2C (household occasion pots) vs corporate milestone pots.",
  ],
  gtm: [
    "[LUCY placeholder] Acquisition strategy — occasion-anchored (wedding season Q3/Q4, Eid Q1/Q2), influencer + venue partnerships, corporate HR sponsor deals.",
    "[LUCY placeholder] Expected cycle, ARPPU, CAC assumptions.",
  ],
  keyNumbers: [
    { label: "Product status", value: "Build → MVP 12/26", hint: "per cohort card" },
    { label: "[LUCY] Waitlist", value: "[LUCY]", hint: "to-date" },
    { label: "[LUCY] Anchor occasion partners", value: "[LUCY]", hint: "signed / in talks" },
    { label: "[LUCY] Regulatory scope", value: "[LUCY]", hint: "UAE stored-value licence path" },
    { label: "Market opportunity", value: "$4.5B TAM", hint: "GCC digital gifting (Teresa v1)" },
    { label: "[LUCY] Corporate pilots", value: "[LUCY]", hint: "HR sponsor deals" },
    { label: "[LUCY] Languages at launch", value: "[LUCY]", hint: "AR / EN" },
    { label: "[LUCY] Team size", value: "[LUCY]", hint: "current headcount" },
  ],
  team: {
    intro:
      "[LUCY placeholder] KinetiKx Venture Studios framing — founder-led with an AI-native squad. Mirror the HERAKLYS team paragraph, tuned for Tchip·In's product surface.",
    members: [
      { name: "Xavier (XGL)", role: "Founder + Product Architect", note: "Vision + partnerships + GCC network" },
      { name: "[LUCY] Nina Solheim", role: "Engineering (web + payments)", note: "[LUCY]" },
      { name: "[LUCY] Rebecca Falcone", role: "Legal counsel", note: "Payments licence + KYC/AML" },
      { name: "[LUCY] Lucy del Mar", role: "Brand, marketing & sales", note: "[LUCY]" },
      { name: "[LUCY] additions", role: "[LUCY]", note: "Advisors, occasion / venue partners" },
    ],
  },
};

// === PETS·NATION =========================================================
export const PETSNATION_DETAIL: VentureDetail = {
  description: [
    "PETS·NATION is The Caretaker — a full-lifecycle pet-care platform for the GCC. One app for every need your animal has : food and treats delivered, vet booked, groomer or sitter matched, insurance managed, records kept.",
    "[LUCY placeholder] Second paragraph — product positioning : why an integrated stack, why the GCC market is under-served by 200+ fragmented single-service tools with no dominant platform.",
    "[LUCY placeholder] Third paragraph — market moment + regulatory landscape + KinetiKx thesis fit.",
  ],
  conceptDiagramSrc: "/images/ventures/diagrams/petsnation.png",
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "$1.1B",
      paragraph:
        "The GCC pet economy — food, veterinary services, grooming, boarding and sitting, insurance, accessories, and retail — is the cleanest anchor for a full-lifecycle platform. GCC veterinary hospitals were valued at USD 766 M in 2024 (7.31% CAGR toward USD 1.43 B by 2033), with the companion-animal segment (cats, dogs, smaller pets — the Pets·Nation core) accounting for ~USD 494 M. GCC pet food adds USD 266 M in 2024 (4.88% CAGR), and grooming, boarding, sitting, insurance and accessories add USD 300–380 M, summing to a GCC total pet economy of USD 1.06–1.14 B — anchored at USD 1.1 B.",
    },
    sam: {
      label: "SAM",
      amountLabel: "$200M",
      paragraph:
        "The SAM is the share of the GCC pet economy transactable via digital channels — the urban, high-digital-adoption slice Pets·Nation can reach without physical-only engagement. Bottom-up : 62.1 M GCC population × urbanisation rates yields ~10.9 M urban households ; applying an 18–20% pet-ownership rate for primary markets (UAE/KSA/Qatar/Kuwait) and 12–15% for Bahrain/Oman gives ~2.2 M pet-owning households and ~3.3 M pets. At a 28% digital-addressable spend per pet (blended UAE + KSA per-pet spend of ~USD 400/year), the bottom-up SAM lands at USD 190–220 M — anchored at USD 200 M in 2024.",
    },
    som: {
      label: "SOM",
      amountLabel: "~$3.5M · modelled",
      paragraph:
        "Pets·Nation is pre-build as of September 2026 ; the SOM models a conservative pre-launch penetration curve in a nascent-digital vertical. Three-phase GTM : Year 1 UAE MVP targets 3–5% of UAE digitally-active pet-owning households (~8,800 active pet profiles) ; Year 2 deepens UAE to 7–8% and adds KSA at 2–3% (~26,000–28,000 profiles) ; Year 3 scales UAE to ~12%, KSA to 6%, plus Qatar/Kuwait entry (~55,000–65,000 profiles). At USD 350/year average digital spend × 15% blended take rate (12% commission + premium subs), plus USD 300 K–500 K B2B merchant fees, modelled Year 3 revenue is USD 3.4–3.7 M — ~1.75% of SAM.",
    },
  },
  uiUx: {
    paragraph:
      "[LUCY placeholder] Product experience — one app, unified pet profile, all services accessible in a few taps. Mobile-first ; vet-integration white-label option for clinics.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "[LUCY placeholder] Revenue model — Subscription + Revenue Share (per cohort card).",
    "[LUCY placeholder] Segment split : B2C households vs B2B clinics/groomers.",
  ],
  gtm: [
    "[LUCY placeholder] Acquisition strategy — vet clinic partnerships as trust anchor, pet-influencer content, adoption-event sponsorships.",
    "[LUCY placeholder] Expected cycle, ARPPU per pet, CAC assumptions.",
  ],
  keyNumbers: [
    { label: "Product status", value: "Build → MVP Q1 27", hint: "per cohort card" },
    { label: "[LUCY] Vet partners", value: "[LUCY]", hint: "signed / in pipeline" },
    { label: "[LUCY] Pet profiles seed", value: "[LUCY]", hint: "beta cohort" },
    { label: "[LUCY] SKU depth", value: "[LUCY]", hint: "food + accessories catalog" },
    { label: "Market opportunity", value: "$1.1B TAM", hint: "GCC pet economy (Teresa v1)" },
    { label: "[LUCY] Insurance partners", value: "[LUCY]", hint: "underwriting integrations" },
    { label: "[LUCY] Retention D30", value: "[LUCY]", hint: "beta cohort curves" },
    { label: "[LUCY] Team size", value: "[LUCY]", hint: "current headcount" },
  ],
  team: {
    intro:
      "[LUCY placeholder] KinetiKx Venture Studios framing — founder-led with an AI-native squad. Mirror the HERAKLYS team paragraph, tuned for Pets·Nation's product surface.",
    members: [
      { name: "Xavier (XGL)", role: "Founder + Product Architect", note: "Vision + partnerships" },
      { name: "[LUCY] Nina Solheim", role: "Engineering (web + mobile)", note: "[LUCY]" },
      { name: "[LUCY] Rebecca Falcone", role: "Legal counsel", note: "Vet regulation + insurance" },
      { name: "[LUCY] Lucy del Mar", role: "Brand, marketing & sales", note: "[LUCY]" },
      { name: "[LUCY] additions", role: "[LUCY]", note: "Vet advisor board, kennel/grooming partners" },
    ],
  },
};

// === LIQUID SPACE ========================================================
export const LIQUID_SPACE_DETAIL: VentureDetail = {
  description: [
    "LIQUID SPACE is a drink out of this world — a premium non-alcoholic beverage brand engineered as ritual, not substitute. GCC-designed, Canadian-produced, distributed through nightlife on-premise and premium retail. The bartender's serve, the mocktail base, the hero drink of the alcohol-free venue.",
    "[LUCY placeholder] Second paragraph — product positioning : why the ritual over the ingredient, why the GCC is the only major market where the majority of the nightlife-attending population does not drink alcohol.",
    "[LUCY placeholder] Third paragraph — market moment + why Canadian production + KinetiKx thesis fit.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "$1.2–1.5B",
      paragraph:
        "The broadest defensible frame is the GCC premium and zero-alcohol beverage subsegment, sitting within a ~USD 20 B GCC non-alcoholic beverage market (MEA NAB was USD 59.7 B in 2025 at 5.27% CAGR). The UAE zero-alcohol beverages market alone reached USD 1.2 B in 2025, growing at a historical 8.8% CAGR (2020–2025) with a forward CAGR of 7.96% through 2032 ; GCC non-alcoholic beer — the closest publicly benchmarked analog — was USD 92 M in 2025 at 4.75% CAGR. The GCC is the only major market where the majority of the nightlife-attending population does not drink alcohol, making it uniquely over-indexed for premium NA product development ; TAM anchors at USD 1.2–1.5 B (GCC premium/zero-alcohol, 2025).",
    },
    sam: {
      label: "SAM",
      amountLabel: "~$100M",
      paragraph:
        "The serviceable market is bounded to venues and channels where Liquid Space's ritual positioning commands a premium serve : on-premise nightlife (clubs, lounges, beach clubs, festivals) plus adjacent premium retail and DTC across the GCC, with UAE as the launch anchor. Dubai hosts ~268 licensed nightclub-category venues plus ~70 beach clubs ; adding hotel bars, licensed rooftop lounges, and festival circuits lifts total GCC-accessible premium on-premise venues to 400–500, with a further 300–400 as the entertainment build-out matures. Applying an 8–12% premium-experiential share to the UAE zero-alcohol market, scaling to GCC reach, and filtering to Liquid Space's addressable on-premise + selective-retail channels yields a working SAM of ~USD 100 M (2025–2026 midpoint), growing to USD 130–180 M by 2028.",
    },
    som: {
      label: "SOM · Year 3",
      amountLabel: "~$3–5M · modelled",
      paragraph:
        "Liquid Space's GTM is on-premise-first, with bartenders as evangelists — a proven diffusion model in premium NA (Athletic Brewing, Lyre's). Year 1 (2027, UAE launch) targets 30–50 venue partnerships (clubs, lounges, beach clubs) averaging 60 cans/service night over a 6-month active season, implying ~400,000–500,000 cans. Year 2 (UAE deepening + KSA entry) scales to 100–150 active venues UAE + early KSA/Qatar entry at 1.2–1.8 M cans annually. Year 3 (2029, GCC momentum) reaches 200–250 GCC venues plus retail + DTC at 2.5–3.5 M cans annually. Modelled headline : ~USD 3–5 M revenue / ~2.5–3.5 M cans / ~3–5% of SAM by Year 3.",
    },
  },
  uiUx: {
    paragraph:
      "[LUCY placeholder] Product experience — CPG-first : the packaging is the interface. Ritual + retail + render (the visual codes) : a 250 ml sleek can, three signature serves (Signature, Sunset, Midnight), bartender toolkit + shelf-ready secondary packaging.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "[LUCY placeholder] Revenue model — CPG margin (wholesale + on-premise partnerships + selective premium retail + DTC). Bartender revenue-share on hero-serve programs.",
    "[LUCY placeholder] Segment split : UAE launch → GCC (KSA / Qatar / Kuwait) expansion → optional retail-first entry into KSA where regulation permits.",
  ],
  gtm: [
    "[LUCY placeholder] Acquisition strategy — bartender-led seeding, venue tastings, festival + hotel partnerships, targeted premium retail placement (spinneys / carrefour premium / speciality).",
    "[LUCY placeholder] Expected sell-in cycle, per-venue economics, distribution partner landscape.",
  ],
  keyNumbers: [
    { label: "Product status", value: "MVP formulation", hint: "Canadian production, GCC-designed" },
    { label: "[LUCY] Anchor venue LOIs", value: "[LUCY]", hint: "UAE nightlife pilot" },
    { label: "[LUCY] Distributor pipeline", value: "[LUCY]", hint: "GCC-1 partners" },
    { label: "[LUCY] Regulatory clearances", value: "[LUCY]", hint: "UAE registration status" },
    { label: "Market opportunity", value: "$1.2–1.5B TAM", hint: "GCC premium/zero-alcohol (Teresa v1)" },
    { label: "[LUCY] Team size", value: "[LUCY]", hint: "GCC + Canadian ops" },
    { label: "[LUCY] Founders", value: "[LUCY]", hint: "co-founder profiles" },
    { label: "[LUCY] Formulation IP", value: "[LUCY]", hint: "unique to GCC preferences" },
  ],
  team: {
    intro:
      "[LUCY placeholder] KinetiKx Venture Studios framing — founder-led with a Canadian production anchor and GCC nightlife anchors. Mirror the HERAKLYS team paragraph, tuned for Liquid Space's CPG surface.",
    members: [
      { name: "Xavier (XGL)", role: "Founder + Product Architect", note: "Vision + GCC nightlife network" },
      { name: "[LUCY] Co-founder (unnamed)", role: "F&B / product formulation", note: "Canadian production lead" },
      { name: "[LUCY] Rebecca Falcone", role: "Legal counsel", note: "F&B regulation + GCC registration" },
      { name: "[LUCY] Lucy del Mar", role: "Brand, marketing & venue relationships", note: "[LUCY]" },
      { name: "[LUCY] additions", role: "[LUCY]", note: "Distributor advisors, bartender ambassadors" },
    ],
  },
};

// === KINETIKX VENTURE STUDIOS (K·VS) =====================================
// The studio itself has a drawer — same pattern as its ventures. The
// content leans on K·VS's own operating model rather than a product.
export const KINETIKX_VS_DETAIL: VentureDetail = {
  description: [
    "K·VS is the venture studio behind every KinetiKx venture — founder-led, AI-native, anchor-client funded. We build ventures on mandate for GCC enterprises, family offices, and government-linked principals ; every mandate seeds a venture that KinetiKx retains equity in and operates alongside the anchor.",
    "[LUCY placeholder] Second paragraph — operating model : five ventures per Journey cohort, Journey One live, Journey Two queued, senior-heavy teams accelerated by agentic AI delivery, shared platform and tooling across cohort.",
    "[LUCY placeholder] Third paragraph — market position : why the GCC needs an owner-operator studio (not a consulting firm, not a fund), why we are that studio.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "~$2.0B",
      paragraph:
        "The addressable market for K·VS is the GCC/MENA corporate mandate market — the budget envelope GCC enterprises, family offices, and government-linked entities allocate to outside partners to build, transform, or spin out ventures on their behalf. GCC consulting reached USD 7.4 B in 2024 and USD 8.3 B in 2025 (12% growth), one of the fastest-growing consulting markets globally ; within that envelope, the transformation-and-innovation segment is anchored on the GCC strategy consulting proxy of USD 2.1 B (2024) → USD 2.2 B (2025), and a conservative 8–10% venture-building-mandate share of GCC digital-transformation spend (USD 18.2 B, 2025) implies a GCC mandate TAM of ~USD 1.5–1.8 B. Widened to include MENA (Egypt, Jordan, Morocco), the working TAM lands at ~USD 2.0 B in 2025.",
    },
    sam: {
      label: "SAM",
      amountLabel: "~$38M/yr",
      paragraph:
        "The SAM filters that TAM to enterprises and principals who can realistically engage a high-touch, IP-retaining venture studio : GCC large enterprises with active innovation mandates (~250, filtered from Fortune 500 Arabia and Vision 2030-aligned sectors), GCC/MENA family offices with venture-building appetite (~45, from ~290 MENA SFOs × 58% VC-active rate × mandate-readiness filter), and government-linked / quasi-sovereign entities (~20 conservative estimate) — ~315 addressable anchor-client mandates in total. Applying an average anchor-mandate value of ~USD 1 M/mandate/year (blended fee-and-equity, conservative vs. BCG Digital Ventures' implied USD 1.5–2 M) and a 12% mandate-active rate yields ~38 active mandates/year at USD 1 M each = ~USD 38 M/year, with a ceiling near ~USD 71 M/year at higher activity and mandate value.",
    },
    som: {
      label: "SOM",
      amountLabel: "~$18M · modelled",
      paragraph:
        "Studio capacity — not market opportunity — is the constraint. K·VS runs senior-heavy teams with agentic AI-accelerated delivery and a Journeys structure of five ventures per cohort ; Journey One is live, Journey Two follows as the next cohort. A realistic capacity envelope is 3–4 active anchor-client mandates in Year 1, 5–7 in Year 2, and 7–10 in Year 3 as Journey Two opens and the studio expands into a second cohort. At the anchor mandate-value proxy of USD 1 M/mandate, the SOM revenue range is USD 3–4 M in Year 1, USD 5–6 M in Year 2, USD 8–10 M in Year 3 — 3-year cumulative ~USD 16–20 M, modelled midpoint ~USD 18 M, or 14–17% of the 3-year SAM pool.",
    },
  },
  uiUx: {
    paragraph:
      "[LUCY placeholder] Operating platform — internal tooling stack that every K·VS venture inherits (shared auth, comms, data plane, brand system, legal templates). This is not a customer-facing app ; the demo is the cohort of ventures themselves.",
    demoUrl: "https://www.kinetikx.com/#cohort",
    demoLabel: "Meet the cohort",
    demoNote: "The cohort strip on this page is the studio's product surface.",
    screenshots: [],
  },
  businessModel: [
    "[LUCY placeholder] Revenue model — Mandate fees (Founding LP + anchor-client) + venture equity + platform royalty from spun-out ventures once they reach revenue thresholds.",
    "[LUCY placeholder] Segment split : Anchor-client mandates (enterprise / family office / government-linked) vs Founding LP capital pool.",
  ],
  gtm: [
    "[LUCY placeholder] Acquisition — direct engagement with GCC enterprise and family-office principals ; Founding LP class is invitation-based (qualified investors by warm intro).",
    "[LUCY placeholder] Journey One is closed to new anchor mandates ; Journey Two opens for anchor conversations in [LUCY quarter].",
  ],
  keyNumbers: [
    { label: "Journey One", value: "5 ventures live", hint: "NYSM · HERAKLYS · TCHIP·IN · PETS·NATION · LIQUID SPACE" },
    { label: "Journey Two", value: "5 ventures queued", hint: "FIN·WEL · AOSX · STAR·DUST · FALCON · DEUCE" },
    { label: "Thesis horizon", value: "36 months", hint: "$15M today → $65M SEED → $240M Series A" },
    { label: "Model", value: "SaaS + equity", hint: "mandate + platform royalty" },
    { label: "Studio location", value: "Dubai + Montréal", hint: "GCC ops + Canadian engineering hub" },
    { label: "Market opportunity", value: "~$2.0B TAM", hint: "GCC/MENA mandate market (Teresa v1)" },
    { label: "[LUCY] Founding LPs signed", value: "[LUCY]", hint: "conversion vs cap" },
    { label: "[LUCY] Anchor mandates 2026", value: "[LUCY]", hint: "signed / in DD" },
  ],
  team: {
    intro:
      "[LUCY placeholder] K·VS's operating team — senior-heavy, AI-native, cross-cohort. Mirror the HERAKLYS team paragraph, framed as \"the operators behind the ventures\".",
    members: [
      { name: "Xavier (XGL)", role: "Founder + General Partner", note: "Studio principal + venture architect" },
      { name: "[LUCY] Rebecca Falcone", role: "Senior Legal + CIO", note: "Governance, IP, compliance" },
      { name: "[LUCY] Lucy del Mar", role: "Brand + Marketing lead", note: "Cross-cohort narrative + sales" },
      { name: "[LUCY] Nina Solheim", role: "Studio Engineer in Residence", note: "Shared tooling + venture engineering support" },
      { name: "[LUCY] additions", role: "[LUCY]", note: "Advisors, GP network, cohort operators" },
    ],
  },
};

// Slug → detail lookup. Add new venture keys here as content lands.
// A venture without an entry hides the "click to expand" affordance.
export const VENTURE_DETAILS: Record<string, VentureDetail> = {
  heraklys: HERAKLYS_DETAIL,
  nysm: NYSM_DETAIL,
  tchipin: TCHIPIN_DETAIL,
  petsnation: PETSNATION_DETAIL,
  "liquid-space": LIQUID_SPACE_DETAIL,
  "kinetikx-vs": KINETIKX_VS_DETAIL,
};
