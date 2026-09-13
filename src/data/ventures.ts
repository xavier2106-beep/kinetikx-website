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
      "KinetiKx Venture Studios is the founder. HERAKLYS is a studio venture — conceived, built and operated by the K•VS bench: strategy, venture architecture, commercial and development, augmented with agentic AI delivery.",
    members: [
      { name: "KinetiKx Venture Studios", role: "Founder" },
    ],
  },
};

// === Journey 1 + Studio · lifted verbatim from Lucy Content-Kits v1 =======
// Lift date : 2026-09-13 · Lucy Matrix DM ruling (Nina↔Lucy DM) :
//   • Source of truth = .md files under
//     /Users/xgl/Documents/KVS/Content-Kits/<slug>/{01,03,04,05,06,08}/
//   • Team tab stays as [LUCY placeholder] — blocked on XGL input
//   • Concept diagrams pending Margaux (2026-09-13)
//   • liquid-space Coca/RedBull annex EXCLUDED (internal DD only)
//   • falcon-eos content is STAGING-ONLY until XGL genericisation ruling ;
//     do not promote to prod
//   • Every SOM label carries " · modelled"
// After population Nina pings Lucy for tab-by-tab QC before XGL passes.

// === NYSM ===
export const NYSM_DETAIL: VentureDetail = {
  description: [
    "NYSM (nysm.me) is a two-sided, video-first hiring platform. Candidates replace the static CV with a **Video CV** — a structured, scene-by-scene video interview recorded on their phone, guided by an AI interviewer voice, a teleprompter and real-time coaching. The result is a shareable, subtitled video profile carrying the signals no PDF can: communication, energy, presence. Recruiters post a job, receive Video CVs instead of a stack of identical résumés, and get an AI match report that scores and *explains* each candidate's fit — shortlist in one click, share with the hiring board via secure links. Both sides are first-class citizens: \"Looking for a job?\" and \"Are you recruiting?\" are the two front doors of the platform.",
    "The AI does the heavy lifting at every step — parsing the CV, generating tailored interview questions, subtitling, matching — while a radically transparent token economy replaces the industry's opaque paywalls: subscriptions are unlimited — your tokens are the only meter. Clear AED pricing published from day one, a 45-day trial for recruiting teams, and premium AI matching that gives both sides a concrete reason to upgrade rather than a toll on basics. Launched from Dubai for the GCC first.",
    "Recruitment platforms monetise friction; NYSM monetises resolution. Video is the richest cheap signal in hiring and nobody has industrialised it end-to-end — guided recording, AI matching, board-ready sharing — for a market as high-volume and underserved as the GCC. Built by KinetiKx Venture Studios in Journey One, it ships AI-accelerated and doubles as the studio's front-door proof: the product does to hiring what the studio does to venture building — shows, instead of telling.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "~$1.5B",
      paragraph:
        "The GCC HR technology market — software-mediated recruitment and talent management — is NYSM's total addressable market. IMARC Group sizes it at USD 760.8 M in 2025, growing at a CAGR of 9.45% to reach USD 1.76 B by 2034; Astute Analytica provides a higher estimate of USD 2.56 B in 2023 growing to USD 5.48 B by 2032 at a CAGR of 9.05%. A mid-point working figure of ~USD 1.5 B (2024/2025, GCC HR-tech software) is used for downstream derivation — sitting comfortably between the IMARC conservative floor and the Astute upper bound.",
    },
    sam: {
      label: "SAM",
      amountLabel: "$200–250M",
      paragraph:
        "NYSM's serviceable addressable market is the slice of GCC HR-tech spend attributable to online, structured recruitment for white-collar and mid-to-high-volume employers — the segment where a video-first, AI-guided hiring workflow adds measurable signal beyond a PDF stack. This excludes oil & gas blue-collar volume hiring, government sector, and enterprise HCM suites. Applying a conservative 25–30% share attributable to online, structured recruitment software to the working TAM yields USD 375–450 M, tightened with a MENA video-interview cross-check to a defensible working SAM of ~USD 200–250 M (GCC, 2025).",
    },
    som: {
      label: "SOM · modelled",
      amountLabel: "~$7M · modelled",
      paragraph:
        "NYSM's GTM is staged: Dubai-first launch (September 2026), UAE penetration through 2027, KSA and wider GCC expansion from 2027/2028. Capturing 0.5–1% of SAM in Year 1 yields USD 1.1–2.25 M ARR, rising to a 3-year cumulative capture of 2–5% of SAM = USD 4.5–11 M as UAE penetration matures and KSA/Qatar are added — midpoint ~USD 7 M by end of Year 3, representing approximately 3% of SAM. This figure is intentionally conservative: it assumes NYSM is a challenger brand in Years 1–2, with network-effect acceleration only beginning in Year 3.",
    },
  },
  uiUx: {
    paragraph:
      "**Now You See Me (NYSM)** is a two-sided, video-first recruitment platform. Candidates replace the static CV with a **Video CV (VCV)** — a structured, scene-by-scene video interview guided by AI. The candidate journey: upload a CV → AI parses it and generates tailored interview questions → the candidate records their VCV scene by scene on their phone, guided by a spoken AI interviewer voice, an on-screen teleprompter and real-time coaching → reviews each take → publishes. The result is a shareable, subtitled video profile that shows communication skills, energy and presence. The recruiter journey: post a job description → receive VCV applications → an AI match report scores and explains candidate fit → shortlist in one click → share selected VCVs with the hiring board via secure links. Cloud-native and API-first: a Node.js/Express API on Google Cloud Run, PostgreSQL (Supabase) with row-level security, and Next.js/React front-ends on Vercel. Video runs through a professional ingest/streaming pipeline (Mux + Google Cloud Storage) with automatic subtitle generation.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "NYSM is a two-sided platform with two paying front doors. Candidates pay for a richer Video CV experience — premium AI coaching on recording, richer public MyPage surfaces, deeper interview preparation. Recruiters and hiring teams pay for the workflow that turns Video CVs into hires: AI match reports that score and explain fit, multi-seat portals with role-based access, and secure board-sharing of shortlists. Enterprise hiring desks — the high-volume employers the GCC labour market is built on — are the anchor buyer.",
    "The commercial model is a four-tier token economy layered on unlimited subscriptions: the plan is never the cap, the tokens are. Every AI-heavy action — parsing a CV, generating tailored interview questions, running a match report, subtitling a video — meters a transparent amount of tokens, and tokens are the only meter. All pricing is published in AED from day one, and recruiting teams get a 45-day trial before any commitment.",
    "Every Video CV recorded on the platform is subtitled, structured and searchable by construction, which makes the recruiter side more valuable at each new candidate. Every job posted brings more candidates to record. Premium AI matching is the concrete upgrade reason on the hiring side; premium candidate coaching and public pages are the concrete upgrade reason on the candidate side. The token meter absorbs the marginal cost of AI honestly, and the platform's economics improve the more the network is used.",
  ],
  gtm: [
    "Two demand sides, one platform. On the recruiter side, the anchor segment is GCC volume-hiring employers — enterprise hiring desks and staffing teams that process large candidate pools and feel the pain of paper-first screening most acutely — with mid-market employers as the natural expansion segment. On the candidate side, the anchor segment is the mobile-first workforce of the Gulf, for whom recording a Video CV from a phone is the natural motion and English/Arabic subtitling is table stakes.",
    "Two front doors on the product itself — \"Looking for a job?\" and \"Are you recruiting?\" — anchor the entire funnel. On the recruiter side, the primary channels are direct outbound and hiring-team sales into enterprise desks, backed by a 45-day trial that lets a team put NYSM alongside their existing ATS at zero commitment. On the candidate side, the primary channels are organic and social — every published Video CV is a shareable, subtitled asset that recruits the next candidate, and the MyPage personal candidate site turns every candidate into a distribution surface.",
    "Launch is Dubai-first, GCC-first — the market where volume hiring, mobile-first candidates and a majority non-résumé-native workforce align. The near-term sequence follows the product roadmap: native iOS/Android apps expand the candidate top of funnel, premium AI matching gives the recruiter side its concrete upgrade reason, public MyPage pages turn candidates into acquisition channels, and multilingual Video CVs open the platform beyond English into the region's operating languages.",
  ],
  keyNumbers: [
    { label: "Video CV", value: "1", hint: "One Video CV shows what a thousand PDFs never will: presence, energy, communication." },
    { label: "Subscriptions wasted", value: "0", hint: "Unlimited — your tokens are the only meter." },
    { label: "Subtitled", value: "100%", hint: "Every VCV is automatically subtitled — screen candidates with the sound off." },
    { label: "Plans", value: "4", hint: "A four-tier token economy, from first VCV to enterprise hiring desk." },
    { label: "Launch", value: "2026", hint: "Built, staged and launching now — not a pitch deck." },
  ],
  team: {
    intro:
      "Built within KinetiKx Venture Studios (Journey One): the studio bench — strategy, venture architecture, commercial and development — stands behind the founding team.",
    members: [
      { name: "Rana Naoum", role: "Co-Founder", note: "[BIO + PHOTO PENDING]" },
      { name: "Osman Sultan", role: "Co-Founder", note: "[BIO + PHOTO PENDING]" },
    ],
  },
};

// === TCHIPIN ===
export const TCHIPIN_DETAIL: VentureDetail = {
  description: [
    "Tchip•In is the GCC's crowd-gifting platform. One person creates a shared GiftPot for the occasion — a wedding, an Eid gesture, a school farewell, a colleague's send-off — in under three minutes. Everyone chips in from an invite link, no app download required to give. The beneficiary redeems the pot the way *they* want: to a bank account, a prepaid card, gift cards, an e-commerce checkout, in-store — or paid forward into someone else's pot. Merchants get a portal to put their gift products in front of the highest-intent audience there is: a group that has already collected the money.",
    "Under the celebration is serious fintech. Tchip•In handles pooled consumer funds, so it is built regulation-first: scoped against the UAE's regulated payments and stored-value framework, with licensed program-management partners as the foundation — in payments, licensing strategy leads code. The model is freemium with micro convenience fees on contribution and redemption, plus merchant commissions; the full design system and product definition are in place, with the MVP build underway.",
    "The GCC is one of the most gifting-intensive cultures in the world — weddings, religious festivals, corporate milestones — and it has no purpose-built collective-gifting product. The rails now exist (open banking, wallets, instant payments); what's missing is the layer that turns them into a social ritual. Regulation-first is slower and harder — and that is exactly the moat: whoever holds the licences holds the market.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "~$4.5B",
      paragraph:
        "The addressable market is the GCC digitally-enabled gifting economy — the subset of gifting spend that moves through digital rails or is addressable by a digital-first platform. The MENA food-and-specialty gifting market was valued at USD 6.04 B in 2024, growing to USD 8.47 B by 2032 at a CAGR of 4.16%; the Middle East gift card and incentive card market reached USD 7.32 B in 2024, growing at 12.2% CAGR historically. Triangulating these frames, GCC-only digitally-addressable gifting — personal plus corporate, excluding in-person retail gift purchases — is conservatively estimated at USD 4–5 B in 2025, with strong Eid/Ramadan seasonality. USD 4.5 B is used as the mid-point conservative anchor.",
    },
    sam: {
      label: "SAM",
      amountLabel: "~$600M",
      paragraph:
        "Tchip•In competes for occasions where a group of people collectively funds a gift — weddings, Eid household giving, corporate employee milestones, farewells, birthdays. Bottom-up: UAE hosts ~17,700–21,000 weddings annually; average UAE wedding spend ~USD 68,000; guest cash gifting represents 15–25% of occasion spend, yielding a GCC crowd-giftable wedding pool of USD 1.5–2.0 B. Combining wedding guest gifting, digital Eid household gifting (~USD 1.6 B addressable pool), and corporate milestone gifting, then applying a 15–25% digital penetration rate, the crowd-gifting SAM lands at USD 500–700 M in 2025 — mid-point USD 600 M.",
    },
    som: {
      label: "SOM · modelled",
      amountLabel: "~$18M · modelled",
      paragraph:
        "Tchip•In's GTM is UAE-first, regulation-first: the regulatory foundation — UAE licensing pathway and program-manager partnership — comes before the MVP build. At a 0.5–1% capture rate in Year 1, growing to 3–5% by Year 3 as UAE penetration matures and KSA is added, the three-year cumulative SAM capture is 2–4% = USD 12–24 M. In GiftPot terms: approximately 36,000–60,000 active GiftPots closed over the 3-year window at USD 300–500 average GiftPot value. Modelled midpoint: ~USD 18 M cumulative / ~45,000 active GiftPots / ~3% of SAM by Year 3.",
    },
  },
  uiUx: {
    paragraph:
      "**Tchip•In** is a crowd-gifting platform for the GCC. One person creates a shared **GiftPot** for an occasion — a wedding, a farewell, a graduation, a birthday — in under three minutes; everyone chips in through whatever payment method suits them; the beneficiary redeems the pot the way *they* want. For contributors (\"Tchippers\"): join a pot in seconds from an invite link — no app download required to give. For organisers: create and share a pot, track contributions, close and deliver the gift. For beneficiaries: redeem flexibly — to a bank account, a prepaid card, gift cards, e-commerce checkout, in-store — or pay it forward into another GiftPot. For merchants: a portal to offer gift-card products and redemption experiences, plug into e-commerce checkouts, and reach high-intent gifting audiences. A full design system (dual-brand colour system, token taxonomy, mobile/web/merchant screen sets) is established ahead of build.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "Tchip•In has three sets of paying users on one platform. Contributors — \"Tchippers\" — pay a micro convenience fee on the money they chip in from an invite link, no app download required to give. Beneficiaries pay a micro convenience fee when they redeem the pot the way *they* want: to a bank account, a prepaid card, gift cards, an e-commerce checkout, in-store — or paid forward into someone else's pot. Merchants pay commissions on gift-card products and redemption experiences sold through the platform's merchant portal, where they get access to the highest-intent audience there is: a group that has already collected the money.",
    "The commercial model is freemium on the celebration and paid on the resolution — the base flow (create a GiftPot, invite, contribute) stays free, and the platform meters value at the two moments a real transaction actually happens: contribution and redemption. Tchip•In handles pooled consumer funds, so the platform is being built regulation-first, scoped against the UAE's regulated payments and stored-value framework, with licensed program-management partners as the foundation. That structural choice — licensing strategy leads code — turns a compliance line item into a defensible payments layer that every fee flows through.",
    "Every GiftPot is a group-level acquisition event: one organiser brings a whole social circle onto the platform in a single occasion. Each redemption path — bank, prepaid card, gift cards, e-commerce, in-store, or paid forward — is either a merchant transaction the platform monetises or a new pot that restarts the loop. Regulation-first is slower and harder — and that is exactly the moat: whoever holds the licences holds the market.",
  ],
  gtm: [
    "One platform, three sides — with organisers as the wedge. The anchor user segment is the GCC organiser: the person already running the WhatsApp collection for a wedding, an Eid gesture, a school farewell, a colleague's send-off, in a region that is one of the most gifting-intensive cultures in the world. The Tchippers around them are the second segment, brought in one GiftPot at a time. On the supply side, merchants — gift-card issuers, e-commerce checkouts and in-store partners — are the third, targeted through the merchant portal for the highest-intent audience there is.",
    "The web app is the critical front door, because one-tap contribution cannot depend on an install; no app download required to give. Native mobile apps (iOS/Android) carry the organiser and beneficiary experience. Every published GiftPot is itself a viral acquisition surface: an invite link brings a whole social circle onto the platform in a single occasion. On the supply side, direct merchant onboarding through the merchant portal builds catalogue depth and redemption-experience partnerships in parallel with user growth.",
    "The sequence is regulation-first by design: the regulatory foundation — UAE licensing pathway and program-manager partnership — comes before the MVP, because in payments licensing strategy leads code. The MVP then launches GiftPot creation, contribution and core redemption rails UAE-first. Release 2 layers on the merchant network, retail redemption and richer gifting moments. Geographic expansion moves into KSA and the wider GCC, then into further regional markets.",
  ],
  keyNumbers: [
    { label: "The old way", value: "14", hint: "One volunteer chasing fourteen people on WhatsApp, an envelope of mismatched cash. Never again." },
    { label: "Create a GiftPot", value: "3 min", hint: "From idea to live GiftPot in under three minutes." },
    { label: "Downloads to give", value: "0", hint: "Everyone chips in from an invite link — no app required." },
    { label: "Ways to redeem", value: "6", hint: "Bank, prepaid card, gift cards, checkout, in-store — or pay it forward into someone else's pot." },
    { label: "Regulated", value: "100%", hint: "Pooled funds run through the UAE's licensed payments framework. Regulation-first is the moat." },
  ],
  team: {
    intro:
      "Built within KinetiKx Venture Studios (Journey One): the studio bench — strategy, venture architecture, commercial and development — stands behind the founding team.",
    members: [
      { name: "Louloua Younes", role: "Co-Founder", note: "[BIO + PHOTO PENDING]" },
    ],
  },
};

// === PETSNATION ===
export const PETSNATION_DETAIL: VentureDetail = {
  description: [
    "Pets•Nation is the super-app for GCC pet life. One platform combining everything an owner needs: a marketplace of vetted services — vets, groomers, trainers, sitters, boarding, food, insurance, transport; a digital Pet Passport carrying the animal's medical history, identity and personality profile; and a community layer where owners connect, adopt, and organise. For service providers, it's a merchant portal reaching the region's most loyal spenders; for municipalities, it's infrastructure for animal welfare — from adoption programs to lost-pet response.",
    "The model layers three engines on one audience: marketplace commissions from service bookings, premium subscriptions for owners who want the full toolkit, and B2B access for merchants and institutional partners. The Pet Passport is the strategic core — the record that makes every other feature stickier, the way a health record anchors a health platform. UAE first, then KSA and the wider GCC.",
    "Pet ownership in the UAE has grown by a third since the pandemic, spending per pet keeps climbing, and the sector is a textbook case of a booming market with no purpose-built platform — fragmented supply, passionate demand, zero digital consolidation. Everyone underestimates pet owners; nobody has ever built them an ecosystem here. The studio playbook fits perfectly: an underserved vertical, a super-app pattern proven in other categories, and AI-accelerated delivery to get there before anyone notices the gap.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "$1.1B",
      paragraph:
        "The GCC pet economy — food, veterinary services, grooming, boarding and sitting, insurance, accessories, and retail — is the cleanest derivation anchor for a full-lifecycle platform. GCC veterinary hospitals were valued at USD 766.4 M in 2024 (7.31% CAGR toward USD 1.43 B by 2033), with the companion-animal segment accounting for ~USD 494 M. GCC pet food adds USD 266.2 M in 2024 (4.88% CAGR). Grooming, boarding, sitting, insurance and accessories add an estimated USD 300–380 M. Summing these layers, the GCC total pet economy sits at USD 1.06–1.14 B in 2024 — anchored at USD 1.1 B. This triangulates against the UAE-only market estimate of approximately USD 360–400 M, representing the UAE's ~35–38% GCC share.",
    },
    sam: {
      label: "SAM",
      amountLabel: "$200M",
      paragraph:
        "The SAM is the share of the GCC pet economy transactable via digital channels — the urban, smartphone-dense, high-digital-adoption slice Pets•Nation can reach. Bottom-up: 62.1 M GCC population across ~14.3 M total households; applying urbanisation rates yields ~10.9 M urban-addressable households. At a blended 18–20% pet-ownership rate for primary GCC markets (UAE/KSA/Qatar/Kuwait) and 12–15% for Bahrain/Oman, the addressable base is ~2.2 M pet-owning households and ~3.3 M pets. Applying a 28% digital-addressable spend rate at ~USD 400/year blended per-pet digital spend yields a bottom-up SAM of USD 190–220 M — anchored at USD 200 M in 2024.",
    },
    som: {
      label: "SOM · modelled",
      amountLabel: "~$3.5M · modelled",
      paragraph:
        "Pets•Nation is pre-build as of September 2026; the SOM models a conservative pre-launch penetration curve with no single dominant platform in the GCC pet-services space. Three-phase GTM: Year 1 UAE MVP targets 3–5% of UAE digitally-active pet-owning households (~8,800 active pet profiles); Year 2 deepens UAE to 7–8% and adds a KSA pilot at 2–3% (~26,000–28,000 profiles combined); Year 3 scales UAE to ~12%, KSA to 6%, plus Qatar/Kuwait entry (~55,000–65,000 profiles). At USD 350/year average digital spend × 15% blended take rate plus B2B merchant fees, modelled Year 3 revenue is ~USD 3.4–3.7 M, midpoint USD 3.5 M — ~1.75% of SAM.",
    },
  },
  uiUx: {
    paragraph:
      "**Pets•Nation** is the pet super-app for the GCC — one platform for the region's pet-owning households, a market approaching USD 1 B and underserved by fragmented, single-purpose tools. Everything a pet owner needs lives in one place: community, education, wellbeing and marketplace. The four pillars: **Community** (owner profiles, social feed, Doggy Date meetups, adopt-a-pet); **Education** (guides, training content, responsible-ownership resources localised for the region); **Wellbeing** (Pet Passport — a portable digital identity and health record for every pet — vet and grooming access, Pet Locator); **Marketplace** (products and services commerce, PetBnB peer-to-peer boarding/sitting). Signature features: Pet Passport, Pet Locator (positioned as a first for the UAE), Doggy Date and PetBnB. The MVP scopes the four pillars down to a launchable core: profiles, Pet Passport, community feed, service discovery and initial marketplace.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "Pets•Nation has three revenue engines running on one audience. Pet owners pay premium subscriptions for the full toolkit — the layers above the free community and Pet Passport core. Service providers — vets, groomers, trainers, sitters, boarding, food, insurance, transport — pay marketplace commissions on service bookings, plus B2B access into a concentrated, high-intent audience through the merchant surfaces. Institutional partners and municipalities engage on the civic side, where public pet infrastructure can be integrated into the app experience (roadmap — no partnership is signed today).",
    "The three engines share one flywheel: the Pet Passport is the strategic core — the portable digital identity and health record that anchors everything the owner does on the platform. Once a pet's identity, medical history and personality live in Pets•Nation, every other feature — service discovery, marketplace bookings, community, Pet Locator, PetBnB — becomes stickier by construction. Consumer premium, marketplace commissions and B2B access each capture a different slice of the same underlying engagement, and none of them requires paying to acquire the customer twice.",
    "GCC pet owners run their pet's life across a dozen disconnected tools today; consolidating that fragmentation is a super-app opportunity in a booming, underserved vertical. Every Pet Passport recorded makes the marketplace and community more valuable; every service provider onboarded makes the platform more useful to owners. The super-app pattern is proven in other categories in the region — Pets•Nation applies it to the vertical everyone has underestimated.",
  ],
  gtm: [
    "One super-app, three sides. On the consumer side, the anchor segment is the GCC pet owner — the region's most emotionally engaged consumer segment, today running their pet's life across a dozen disconnected tools. On the supply side, the anchor segment is fragmented pet services — vets, groomers, trainers, sitters, boarding, food, insurance, transport — that today have no shared demand channel into concentrated, high-intent owners. On the institutional side, municipalities and civic partners are a strategic segment for public pet infrastructure (roadmap — potential, not signed).",
    "The mobile app is the primary front door for owners, structured around the four pillars. The Pet Passport is the acquisition hook and the retention core in one: once a pet's identity, medical history and personality live in Pets•Nation, the owner comes back for everything else. Signature features — Pet Locator (positioned as a first for the UAE), Doggy Date, PetBnB — turn the app social rather than purely transactional, which turns every active owner into an organic acquisition channel.",
    "UAE first, then KSA and the wider GCC. The MVP scopes the four pillars down to a launchable core: profiles, Pet Passport, community feed, service discovery and initial marketplace. The wellbeing layer follows with vet integrations, Pet Locator rollout and municipality partnerships. Full marketplace depth — including PetBnB and the adoption network — comes next, and GCC expansion into KSA and the wider Gulf closes the near-term sequence.",
  ],
  keyNumbers: [
    { label: "Pet owners, GCC", value: "5M", hint: "Five million pet owners — the region's most engaged consumer segment, with no home." },
    { label: "Tools today", value: "12", hint: "A dozen disconnected tools to run one pet's life. Pets•Nation replaces them all." },
    { label: "Pet Passport", value: "1", hint: "One record — identity, medical history, personality — that makes everything else stickier." },
    { label: "Revenue engines", value: "3", hint: "Marketplace commissions, premium subscriptions, B2B access — three engines on one audience." },
    { label: "Post-pandemic", value: "+30%", hint: "UAE pet ownership up nearly a third since the pandemic — and spend per pet keeps climbing." },
  ],
  team: {
    intro:
      "KinetiKx Venture Studios is the founder. Pets•Nation is a studio venture — conceived, built and operated by the K•VS bench: strategy, venture architecture, commercial and development, augmented with agentic AI delivery.",
    members: [
      { name: "KinetiKx Venture Studios", role: "Founder" },
    ],
  },
};

// === LIQUID SPACE ===
export const LIQUID_SPACE_DETAIL: VentureDetail = {
  description: [
    "Liquid Space is a premium non-alcoholic ritual drink built for the night. A 330 mL can, edible glitter suspended in the liquid, and — on the Lumina edition — an LED ring at the base that ignites at a touch. Twelve zodiac-coded editions make the can a statement of identity, not just a beverage: you don't order *a* Liquid Space, you order *yours*. It's built for the GCC's music-scene generation — and for the venues that serve them: clubs, lounges, beach clubs and festivals get a high-margin, high-theatre serve where the alternative was a free tap water.",
    "The ritual is the product: the light comes on, the glitter swirls, and for twenty seconds the drink owns the table. Behind the theatre is disciplined CPG: manufactured in Canada at a specialised bottling partner whose line has already shipped a million cans in the category, with food-grade certified ingredients and a UAE import pathway built on established precedent. Launch is on-premise first — bartenders as evangelists of the serve — flanked by direct-to-consumer online and selective premium retail. Six editions at launch, the full zodiac to follow.",
    "The no-alcohol market is the only structurally growing segment of nightlife beverage, and the GCC — where a whole entertainment economy is being built around a majority non-drinking population — is its natural capital. Venues adopt what makes their room look alive and their margin look better; guests adopt what makes them visible. Liquid Space is engineered to do both, with collectability built into the SKU logic itself. Sip the sky. Light up the night.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "~$1.2–1.5B",
      paragraph:
        "The GCC premium and zero-alcohol beverage subsegment is the derivation anchor — sitting within a ~USD 20 B GCC non-alcoholic beverage market (MEA NAB was USD 59.7 B in 2025, 5.27% CAGR to USD 94.8 B by 2034). The UAE zero-alcohol beverages market reached USD 1.2 B in 2025, growing at a historical CAGR of 8.8% (2020–2025) with a forward CAGR of 7.96% through 2032. GCC non-alcoholic beer — the closest publicly benchmarked analog to premium canned NA beverages — was valued at USD 92.1 M in 2025, growing at 4.75% CAGR through 2034. The GCC is the only major market where the majority of the nightlife-attending population does not drink alcohol, making it uniquely over-indexed for premium NA product development. TAM anchors at ~USD 1.2–1.5 B (GCC premium/zero-alcohol subsegment, 2025).",
    },
    sam: {
      label: "SAM",
      amountLabel: "~$100M",
      paragraph:
        "The serviceable market is bounded to venues and channels where Liquid Space's ritual positioning commands a premium serve: on-premise nightlife (clubs, lounges, beach clubs, festivals) and adjacent premium retail and DTC across the GCC, with UAE as the launch anchor. Dubai hosts approximately 268 licensed nightclub-category venues and ~70 beach clubs; adding hotel bars, licensed rooftop lounges and festival circuits lifts total GCC-accessible premium on-premise venue count to an estimated 400–500 UAE venues, with a further 300–400 as the entertainment build-out matures. Applying an 8–12% premium-experiential share to the UAE zero-alcohol market (USD 1.2 B), scaling to GCC reach at UAE ~40% of GCC premium NA spending, and filtering to addressable on-premise plus selective-premium channels yields a working SAM of ~USD 100 M (2025–2026 midpoint), growing toward USD 130–180 M by 2028.",
    },
    som: {
      label: "SOM · Year 3",
      amountLabel: "~$3–5M · modelled",
      paragraph:
        "Liquid Space's GTM is on-premise-first, with bartenders as evangelists — a proven diffusion model in the premium NA category. Year 1 (2027 — UAE on-premise launch) targets 30–50 venue partnerships at an average of 60 cans per service night over a 6-month active season, implying ~400,000–500,000 cans. Year 2 (UAE deepening plus GCC entry) scales to 100–150 active venues across UAE plus early KSA/Qatar entry at 1.2–1.8 million cans annually. Year 3 (GCC momentum plus Phase 3 pipeline) reaches 200–250 GCC venues plus retail plus DTC at 2.5–3.5 million cans annually. Modelled headline: ~USD 3–5 M revenue / ~2.5–3.5 M cans / ~3–5% of SAM by Year 3 (2029).",
    },
  },
  uiUx: {
    paragraph:
      "**Liquid Space** is a premium non-alcoholic ritual drink built for the night. A 330 mL can, non-alcoholic, non-carbonated, with food-grade edible glitter suspended in the liquid, and — on the Lumina edition — a capacitive-triggered LED ring at the base that ignites at a touch: designed for the dark rooms it lives in. Twelve zodiac signs across two tiers — Standard and **Lumina** — with six SKUs at launch and the full zodiac to follow. The ritual: the light comes on, the glitter swirls, and for twenty seconds the drink owns the table. On-premise first — clubs, lounges, rooftops and festivals, with bartenders as the evangelists of the serve — plus direct-to-consumer online, quick-commerce and selective premium retail. Brand book v1 shipped; six launch editions locked with final can renders; glitter supply confirmed; manufacturing and import routes defined. Pre-launch phase — first commercial sale targeted January 2027 in the UAE.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "Two customer surfaces sit end-to-end on the same can. On-premise venues — nightclubs, lounges, rooftops, beach clubs and festivals — buy at wholesale and serve at premium, turning the twenty-second ritual into a high-margin, high-theatre alternative to the free glass of water that non-drinkers get today. Guests buy the finished serve on-premise, and buy the can directly through the brand's own D2C shop and quick-commerce — online delivery only, by design. Selective premium retail is held as an option, not a launch channel.",
    "The commercial model is a classic branded-CPG stack made premium at every touchpoint, with a set volume architecture: roughly **50% of volume moves through distributors specialised in F&B venues**, **30–35% through direct B2B sales** — F&B venues, concerts and events, corporate events, festivals — and **~15% direct-to-consumer via online delivery only**, with premium retail held as a later option rather than a launch channel. The three channels carry a deliberate margin ladder — D2C the highest margin, direct B2B in between, distributor-led the lowest but the one that buys scale. Twelve zodiac editions across two tiers — Standard and Lumina — turn the SKU logic itself into a monetisation lever: guests don't order *a* Liquid Space, they order *theirs*, and collectability compounds average basket.",
    "The no-alcohol segment is the only structurally growing segment of nightlife beverage, and the twenty-second serve is engineered to be the reason a venue looks alive and its margin looks better on the same order. Bartenders become evangelists because the ritual is the product; guests become distribution because the can is visibly *theirs*. Every launched edition strengthens the collectability logic that drives the next one, and the shipped production line — already proven in the category — absorbs volume growth without reopening the industrial equation.",
  ],
  gtm: [
    "The primary target is the GCC's music-scene generation — the majority non-drinking population around whom a whole entertainment economy is being built — and the venues that serve them: nightlife venues (clubs, lounges, rooftops, beach clubs) and event operators (festivals and large-format nights). One secondary segment extends the reach without dispersing the brand: collectors and gifters via D2C online and quick-commerce. Premium retail is held as an option for later, not a launch segment.",
    "On-premise first, with a set volume architecture. Roughly **half of all volume moves through distributors specialised in F&B venues** — the layer that puts the can behind the bar at scale. Another **30–35% is direct B2B**: the brand's own sales into F&B venues, concerts and events, corporate events and festivals. The remaining **~15% is direct-to-consumer, online delivery only** — the brand's own shop and quick-commerce, highest margin, direct collector relationship. In every channel, bartenders remain the evangelists of the twenty-second serve. Events sit across the whole architecture: they are on-premise, they are content, and they push guests back into D2C for the edition they saw served.",
    "Phase 1 is the UAE launch in January 2027 — on-premise venues plus D2C — with six of the twelve zodiac editions in market. Phase 2 is the GCC, KSA-led, riding the region's entertainment build-out. Phase 3 is the nightlife capitals — London, Ibiza, Berlin, New York, Miami — where the ritual has to travel intact. Across the sequence, the full twelve-sign range and seasonal or event editions are the recurring launch beats that keep collectability compounding rather than resetting.",
  ],
  keyNumbers: [
    { label: "Alcohol", value: "0%", hint: "All of the night. None of the alcohol." },
    { label: "The can", value: "330 mL", hint: "One can, engineered as a ritual — glitter in the liquid, light at the base." },
    { label: "Zodiac editions", value: "12", hint: "You don't order *a* Liquid Space. You order *yours*." },
    { label: "At launch", value: "6", hint: "Six editions at launch — the full zodiac to follow." },
    { label: "The moment", value: "20 sec", hint: "The light ignites, the glitter swirls — for twenty seconds the drink owns the table." },
    { label: "Proven line", value: "1M+", hint: "Manufactured on a specialised line that has already shipped a million cans in the category." },
  ],
  team: {
    intro:
      "Built within KinetiKx Venture Studios (Journey One): the studio bench — strategy, venture architecture, commercial and development — stands behind the founding team.",
    members: [
      { name: "Xavier G. Layre", role: "Co-Founder", note: "Founder of KinetiKx Venture Studios. [BIO + PHOTO PENDING]" },
      { name: "J.N Gautier", role: "Co-Founder", note: "[BIO + PHOTO PENDING]" },
    ],
  },
};

// === FINWEL ===
export const FINWEL_DETAIL: VentureDetail = {
  description: [
    "FIN•WEL is a financial wellbeing platform for the mass workforce — employees earning under AED 11,000 a month in facilities management, hospitality, logistics, retail and construction. Distributed through employers as a white-label benefit, it covers the full employee money lifecycle: early wage access when the month runs long, payroll processing, loyalty and rewards, savings, and — in time — responsible micro-credit. Employers with 500 to 5,000 staff get a retention tool and relief from the informal salary-advance queue at HR's door; employees get dignity and control over money they have already earned.",
    "FIN•WEL is deliberately capital-light: an orchestration layer over licensed financial partners, who carry every regulated activity — deposits, cards, lending — while the platform owns the employer relationship, the employee experience and the payroll data layer. No lending book, no balance-sheet exposure. A signed rewards partnership already anchors the loyalty module. And the timing is regulatory: the UAE's 2026 unified-payday resolution has made payroll compliance a board-level concern and turned early wage access from perk into pressure valve.",
    "The demand is structural, the distribution is B2B2C (one employer contract onboards thousands of employees), and the regulatory moment is now. Above all, the studio's founder has run a UAE fintech in employee financial wellbeing as CEO — this is a category he knows from the inside: where the product works, where the model breaks, and how to build the version that lasts.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "~$1.2B",
      paragraph:
        "The UAE and GCC mass-workforce financial-services stack — payroll infrastructure, earned-wage access, employee loyalty and rewards, and adjacent financial-wellbeing services — is FIN•WEL's total addressable market. Anchoring on discrete published verticals: UAE payroll outsourcing was ~USD 99 M in 2024 (CAGR 5.64% to USD 151 M by 2030); the Middle East & Africa earned-wage-access market was ~USD 0.51 B in 2025 (growing at ~25% CAGR); the UAE loyalty and rewards market was ~USD 423 M in 2024 (13.6% CAGR to USD 818 M by 2029). The union of these quantified layers aggregates to approximately USD 1.0–1.1 B; adding the broader GCC employee financial-wellbeing fintech segment (~USD 155–305 M) brings the working TAM to ~USD 1.2 B (2025, range USD 1.0–1.5 B).",
    },
    sam: {
      label: "SAM",
      amountLabel: "~$180M",
      paragraph:
        "FIN•WEL's serviceable market is white-label, employer-mediated financial-wellbeing benefits for workers earning under AED 11,000/month, at UAE-based employers of 500–5,000 staff in facilities management, hospitality, logistics, retail and construction. Over 60% of UAE's 9.4 M-strong labour force earns below AED 5,000/month; the under-AED-11k threshold captures approximately 70–80% of private-sector workers — ~5.5 M workers. Filtering for target verticals and the 500–5,000-staff employer band yields a target employee population of ~1.2–1.75 M UAE workers. At a blended employer-benefit-platform fee equivalent of USD 5–8 per employee per month, the UAE-only SAM is approximately USD 72–168 M annually; adding GCC first-ring expansion (KSA, Qatar, ~50% uplift on UAE base) yields a blended SAM of ~USD 180 M (2025, midpoint).",
    },
    som: {
      label: "SOM · modelled",
      amountLabel: "~$6M · modelled",
      paragraph:
        "FIN•WEL's B2B2C GTM is employer-led: one employer contract onboards hundreds to thousands of employees at once. Year 1 UAE foundation targets 5–10 employer contracts at an average of 1,200–1,500 employees per employer, yielding 6,000–15,000 onboarded employees. Year 2 compounds to 25–40 contracts; Year 3 reaches approximately 60–100 contracts with an onboarded employee base of 75,000–150,000. At ARPU of USD 5–8 per employee per month and 60–70% platform utilisation, modelled Year 3 run-rate revenue is ~USD 3–10 M, midpoint ~USD 6 M — approximately 5% of UAE-only SAM. The unified-payday reform is a qualitative accelerant: it compresses employer decision timelines and converts payroll compliance from an HR back-office issue into a board-level imperative.",
    },
  },
  uiUx: {
    paragraph:
      "**Finwel** is a white-label, employer-distributed financial wellbeing platform for the UAE's mass workforce — the millions earning modest monthly salaries in facilities management, hospitality, logistics, retail, construction and F&B. The employer is the customer; the employee is the user. For employees: access a portion of earned salary before payday (earned-wage access), collect rewards and incentives, build savings, send money home, and manage it all from an app designed for entry-level Android devices in their own language. For employers: a dashboard that plugs into existing HR and payroll systems, turns financial wellbeing into measurable retention, and keeps payroll compliant with the UAE's tightening wage-protection rules. Product surfaces: **employee app** (Android-first, iOS follows, built for low-end devices, multilingual EN/AR plus key workforce languages); **employer dashboard** (React web admin — enrolment, programs, reporting); **data layer** (API integration into client HRMS/ERP, with file-based fallback); **digital account** (partner-issued IBAN, prepaid card and remittance rails). Finwel is architected as a capital-light orchestrator: every regulated activity runs on licensed partners. A rewards partnership is already signed.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "Finwel sells B2B2C: the employer is the customer, the employee is the user. Employers with roughly 500 to 5,000 staff in facilities management, hospitality, logistics, retail and construction contract for a white-label financial wellbeing platform that plugs into their existing HR and payroll systems — a retention tool, a compliance tool, and relief from the informal salary-advance queue at HR's door. Employees earning under AED 11,000 a month get dignified access to money they have already earned, plus rewards, savings, remittance and a digital account, from an app designed for entry-level Android devices in their own language.",
    "Finwel is deliberately capital-light: an orchestration layer over licensed financial partners, who carry every regulated activity — deposits, cards, wage processing, remittance, lending — while the platform owns the employer contract, the employee experience and the payroll data layer. There is no lending book and no balance-sheet exposure by design. Under the surface, an internal payments-orchestration layer keeps partners swappable, and an event-driven double-entry ledger sits at the core from day one. A signed rewards partnership already anchors the loyalty module, so revenue is generated from the earliest live employees rather than waiting on later product releases.",
    "The demand is structural, and the regulatory moment is now: the UAE's 2026 unified-payday resolution has made payroll compliance a board-level concern and turned early wage access from perk into pressure valve. Distribution is B2B2C, so one employer contract onboards thousands of employees at once — the fastest path from signature to scale in mass-workforce fintech. Above all, the studio's founder has run a UAE fintech in employee financial wellbeing as CEO — a category known from the inside: where the product works, where the model breaks, and how to build the version that lasts.",
  ],
  gtm: [
    "B2B2C by design. The anchor customer segment is UAE employers with roughly 500 to 5,000 staff in facilities management, hospitality, logistics, retail, construction and F&B — the industries where the mass workforce and the informal salary-advance queue at HR's door are largest. The anchor user segment is their employees, earning under AED 11,000 a month: the millions paid on the 1st and broke by the 20th, not because they earn nothing but because the financial system was never built for them.",
    "Distribution is direct enterprise sales into HR and payroll decision-makers, with the platform positioned as both a retention tool and a compliance tool — a regulatory moment turned into an executive conversation, because the UAE's unified-payday resolution has made payday infrastructure a board-level topic. Once an employer signs, activation is embedded: the employee app (Android-first, iOS follows, multilingual EN/AR plus key workforce languages) is enrolled through the workplace, and the employer dashboard turns financial wellbeing into measurable retention.",
    "UAE-first, deliberately staged. Foundations come before build — regulatory structuring and partner agreements, because in regulated payroll finance partner and licensing structure lead code. The wedge follows: earned-wage access plus rewards plus employer dashboard plus Android app. The money layer — digital account, card and remittance — layers on next. Credit and savings come only when partner-funded and demand-proven. Expansion moves into KSA next, then into high-remittance growth markets on the same capital-light orchestration model.",
  ],
  keyNumbers: [
    { label: "The reality", value: "1st → 20th", hint: "Paid on the 1st, broke by the 20th. The problem is timing, not income." },
    { label: "Built for", value: "<AED 11k", hint: "The workforce earning under AED 11,000 a month — the majority the system was never built for." },
    { label: "Employer sweet spot", value: "500–5,000", hint: "One employer contract onboards thousands of employees at once. B2B2C is the distribution." },
    { label: "Balance-sheet exposure", value: "0", hint: "An orchestration layer over licensed partners — no lending book, capital-light by design." },
    { label: "The moment", value: "2026", hint: "The UAE's unified-payday resolution turned early wage access from perk into pressure valve." },
  ],
  team: {
    intro:
      "KinetiKx Venture Studios is the founder. FIN•WEL is a studio venture — conceived, built and operated by the K•VS bench: strategy, venture architecture, commercial and development, augmented with agentic AI delivery.",
    members: [
      { name: "KinetiKx Venture Studios", role: "Founder" },
    ],
  },
};

// === AOSX ===
export const AOSX_DETAIL: VentureDetail = {
  description: [
    "AOSX is the first plug-and-play AI box that activates a complete, fully operational team of AI colleagues in under 24 hours — for less than $10k a year. Not chatbots, not dashboards: named agents with a voice, a face, a personality, that you brief, delegate to and manage exactly like human colleagues. It serves three worlds with the same box: the solo entrepreneur who needs a full team on day one, the family that wants a household running smoothly, and the family office or SME that needs ten specialists without ten salaries.",
    "AOSX is sovereign by design — an on-premise platform where the agents run on hardware you own, and your data never becomes someone else's training set. You don't buy a complicated technology; you choose your agents, choose their skills, and start. The interface is the breakthrough: finally an AI layer built so AI understands humans — conversation, context, character — instead of forcing humans to learn machines. One box, your agents, your data, your house rules.",
    "Every business owner has now seen what AI can do and hit the same three walls: complexity, subscription sprawl, and data leaving the building. AOSX removes all three in a single purchase decision — a box, a team, a flat per-agent cost. And it isn't a concept: the studio behind it, KinetiKx Venture Studios, already runs its own operations on named AI colleagues every day. AOSX is that lived reality, productised.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "~$180M",
      paragraph:
        "The GCC agentic AI and autonomous-agent platform segment is the derivation anchor. The GCC AI market (all sectors) was valued at approximately USD 1.5 B in 2024 growing to USD 3.5 B by 2035 at a CAGR of ~8%; the GCC generative AI segment reached USD 419.5 M in 2025 and is projected at USD 4.79 B by 2034 at a CAGR of 30%. The sub-segment most directly comparable to AOSX — agentic AI and autonomous-agent platforms in the Middle East & Africa region — was valued at approximately USD 102 M in 2024 and is projected to reach USD 1.07 B by 2030 at a CAGR of approximately 49%. GCC nations represent the dominant share of the MEA agentic AI market, underpinned by national AI strategies. The GCC agentic AI platform market is estimated at approximately USD 180 M (2025), growing toward ~USD 1.0 B by 2030.",
    },
    sam: {
      label: "SAM · 2030 maturity",
      amountLabel: "~$500M at 2030",
      paragraph:
        "AOSX's serviceable market is the sub-set of the GCC agentic AI market that matches its three target customer profiles — solo entrepreneurs, household/family buyers, and family offices/SMEs — with a genuine preference for sovereign, on-premise AI. Bottom-up: ~2.0 M active registered SMEs across GCC (of which 300,000–400,000 have sufficient operational complexity); ~800–1,000 active GCC family offices (near-universal sovereignty preference); ~20,000–40,000 HNWI target households. Combined: ~75,000 sovereignty-preferring target customers. At a blended ARPU of ~USD 8,500/year (below the under-USD-10k ceiling), this implies a potential annual spend pool of ~USD 638 M at full adoption. Expressed against the 2030 market horizon (~USD 1.0 B), a conservatively rounded SAM of ~USD 500 M at 2030 market maturity represents ~50% of the projected GCC agentic-AI market.",
    },
    som: {
      label: "SOM · modelled",
      amountLabel: "~$27M · modelled",
      paragraph:
        "AOSX enters pre-launch with a waitlist site in build and a first cohort targeting 500–1,000 units, distributed through direct online and high-end retail concierge channels. Year 1 (GCC launch): 500–800 boxes placed, annual revenue ~USD 4.25 M–6.8 M at ~USD 8,500 ARPU proxy. Year 2 (GCC deepening): 1,200–2,000 cumulative boxes, cumulative ARR ~USD 10 M–17 M. Year 3 (GCC established plus first international signal): 2,500–4,000 cumulative boxes, cumulative ARR ~USD 21 M–34 M, midpoint ~USD 27 M / ~3,200 boxes. As a share of the ~USD 500 M SAM, a Year 3 ARR of ~USD 27 M represents approximately ~5% of SAM — consistent with the product's deliberate exclusivity positioning and curated first-cohort experience.",
    },
  },
  uiUx: {
    paragraph:
      "**AOSX** is a team in a box: a plug-and-play appliance that hosts a team of five to ten named AI agents — each with a name, a voice, a face, a personality, a role and persistent memory. You don't open a dashboard or learn an app. You call them, video-call them, send a voice note, or message them on Telegram — the way you'd work with human staff. Product surfaces: **the appliance** (compact device, Mac-mini form factor — the agents' home and their memory); **voice and video** (call your agents; they answer as themselves, with their own voice and face); **messaging** (Telegram and voice notes for asynchronous work); **aosx.com** (waitlist and configuration site — the only web surface by design). There is deliberately no dashboard and no app: the interface is conversation. On-device-first architecture: local inference on Apple-silicon neural hardware handles wake-word, speech transcription, dialogue and routing. Each agent draws on a local knowledge graph plus vector memory. Perimeter integrations via OAuth: Google Workspace, Microsoft 365, Slack, Notion, Dropbox, accounting and payment tools — the agents work inside the buyer's existing life, not a parallel one.",
    demoUrl: "https://aosx.com",
    demoLabel: "Join the waitlist",
    demoNote: undefined,
    screenshots: [],
  },
  businessModel: [
    "AOSX is sold as a plug-and-play appliance — one box that activates a complete, fully operational team of AI colleagues in under 24 hours. Buyers pay for the appliance and their agents, at a flat per-agent cost that keeps the total under $10k a year for a full team. Three launch personas share the same box: the solo entrepreneur who needs a full team on day one, the head of household who wants the family running smoothly, and the family office or SME that needs ten specialists without ten salaries. There is deliberately no dashboard and no app to subscribe to — the interface is conversation, and the agents run on hardware the buyer owns.",
    "The commercial model is a single, transparent purchase decision that removes the three walls every business owner has hit with AI: complexity, subscription sprawl, and data leaving the building. Complexity is absorbed into the box — you don't buy a technology, you choose your agents and their skills and you start. Subscription sprawl is replaced by a flat per-agent cost. Data leaving the building is stopped by sovereignty: an on-premise platform where the agents run on hardware you own and your data never becomes someone else's training set.",
    "Every agent is more than a subscription line: it is a named colleague with persistent memory that remembers every conversation, document and decision because memory lives on the appliance, not in someone else's cloud. Each perimeter integration raises switching cost with every OAuth connection. Second-wave personas (boutique professional services, private clients) extend the same box to new segments without a new product; the model is one appliance, three worlds — and more to come.",
  ],
  gtm: [
    "One box, three worlds. The three launch personas are set: solo entrepreneurs who need a full team on day one, heads of household who want a family running smoothly, and family offices/SMEs that need ten specialists without ten salaries. Every persona has hit the same three walls with AI — complexity, subscription sprawl, data leaving the building — and AOSX removes all three in a single purchase decision. Second-wave personas — boutique professional services and private clients — extend the same box to new segments without a new product.",
    "aosx.com is the only web surface by design: waitlist and configuration site, no dashboard, no app. Distribution runs on two rails: direct online through the site, and high-end retail concierge partners — deliberately not mass-market marketplaces. The interface is conversation everywhere the buyer already works: voice and video calls to named agents, Telegram messaging, voice notes. Perimeter integrations let the agents work inside the buyer's existing life, which turns each new integration into an implicit channel for the next persona.",
    "Waitlist launch on aosx.com opens the funnel. First cohort — 500 to 1,000 units, waitlist-prioritised — anchors the initial deployment across Dubai-based headquarters and the target geographies: GCC, EU, UK and US. From 2027 to 2028 the sequence extends to second-wave personas (boutique professional services and private clients) and scaled manufacturing, on the same appliance and the same interface — sovereign by design, one box, your agents, your data, your house rules.",
  ],
  keyNumbers: [
    { label: "A full AI team", value: "<$10k", hint: "A complete, operational team of AI colleagues — for less than $10k a year." },
    { label: "Time to live", value: "24h", hint: "Plug in the box. Your team is fully operational in under 24 hours." },
    { label: "One box", value: "1", hint: "One box. Your agents, your data, your house rules." },
    { label: "Three worlds", value: "3", hint: "Solo entrepreneurs, families, family offices — the same box serves all three." },
    { label: "Data leaving", value: "0", hint: "Sovereign by design: your data never becomes someone else's training set." },
  ],
  team: {
    intro:
      "KinetiKx Venture Studios is the founder. AOSX is a studio venture — conceived, built and operated by the K•VS bench: strategy, venture architecture, commercial and development, augmented with agentic AI delivery.",
    members: [
      { name: "KinetiKx Venture Studios", role: "Founder" },
    ],
  },
};

// [LUCY 2026-09-13] STAGING-ONLY. Do not promote to prod until XGL genericisation ruling.
// === FALCON EOS ===
export const FALCON_EOS_DETAIL: VentureDetail = {
  description: [
    "Falcon EventOS is a unified platform giving live events a persistent attendee identity: one profile that follows the attendee across every event in a city's calendar — sports, concerts, festivals, exhibitions, trade shows. For event owners and organisers, it turns a series of disconnected ticket sales into a compounding, owned audience: who came, what they loved, what they'll come back for. For attendees, it means one identity, seamless entry, personalised experiences and rewards that carry over from event to event.",
    "Attendee data, engagement and monetisation live in one system instead of being scattered across ticketing vendors, sponsors' spreadsheets and one-off apps. Organisers see their audience as an asset they own and grow; sponsors finally get audited, persistent audience value instead of one-weekend impressions. The platform launches at Dubai scale — home of flagship international events — with an anchor partner whose calendar spans the city's marquee sporting moments, then licenses white-label to event owners worldwide.",
    "It follows the KinetiKx anchor-client playbook already proven in the studio: a world-class operator funds and stress-tests the build on real flagship events, KinetiKx retains the core IP, and every subsequent licensee deploys a platform hardened at the highest level of live-event operations. The economics of events are shifting from tickets to audience relationships — EventOS is the infrastructure for that shift, built where the world's most ambitious event calendar lives.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "$400–570M",
      paragraph:
        "The GCC/MENA event-tech layer — the chain-of-derivation anchor — is the working TAM, sitting within a USD 6.88 B GCC live-events industry (Mordor Intelligence, 2025, growing to USD 9.11 B by 2031 at 4.78% CAGR) and a global event-management software market of USD 9.1 B in 2025 (MarketsandMarkets, growing to USD 36.8 B by 2031 at 14.6% CAGR). Attendee-technology investment in the Middle East exceeds USD 600 M and is growing past USD 700 M. Applying the GCC/MENA region's ~5–7% share of the global event-tech market to the USD 9.1 B global base yields a GCC/MENA event-tech addressable layer of approximately USD 400–570 M in 2025. Saudi Arabia holds 45% of GCC event-management market share; Dubai alone represents 55% of UAE event spend.",
    },
    sam: {
      label: "SAM",
      amountLabel: "~$45M/yr",
      paragraph:
        "Falcon EventOS's target deployment profile requires large-format flagship events — 50,000+ attendees per edition, or a multi-event city calendar operated by a single rights holder — where attendee data, cross-event sponsorship, and owned-audience monetisation represent meaningful revenue levers. GCC addressable flagship-format operators: UAE (8–12 operators, 1.5–2.5 M attendees/year), Saudi Arabia (10–15 operators, 3–5 M attendees/year), wider GCC Qatar/Kuwait/Bahrain/Oman (4–6 operators, 0.5–0.8 M attendees/year) — ~25–35 GCC flagship-format operators managing ~5.5–8.3 M attendees annually. At a blended per-attendee platform fee of USD 5–8 per attendee per event (conservatively discounted from enterprise benchmarks), applied to the GCC flagship-format operator cohort, the platform-level SAM is approximately USD 27.5–66.4 M/year — mid-point ~USD 45 M/year.",
    },
    som: {
      label: "SOM · modelled",
      amountLabel: "~$10M ARR · modelled",
      paragraph:
        "Falcon EventOS is an anchor-launch-stage platform. The 90-day discovery producing a working sandbox is the locked next step (sandbox target: November 2026; pilot at a flagship sporting event: January 2027; full-scale deployment at rugby-scale, 100,000+ attendees: November 2027). Year 1 (late-2026 to end-2027) delivers anchor-partner deployment fees; 100,000–200,000 attendees under management. Year 2 (2028) opens 2–3 GCC white-label licensing conversations; combined attendees under management 400,000–700,000. Year 3 (2029) adds 2–4 further operators; 5–8 licensed operators total; ~1 M attendees under management. At blended per-attendee fees across 750,000–1.5 M annual attendances, modelled ARR ~USD 10 M by end of Year 3 — approximately 22% of the ~USD 45 M SAM mid-point.",
    },
  },
  uiUx: {
    paragraph:
      "**Falcon EventOS** is a unified events platform that gives live events a **persistent attendee identity** that carries across every event in a city's calendar. Product surfaces: **branded event apps** (native mobile apps skinned per event property — multi-tenant theming from day one); **attendee web portal** (tickets, wallet, profile, calendar); **sponsor dashboard** (self-serve inventory, activation and automated reporting); **hospitality/B2B portal** (corporate guest and premium-experience management); **ops command centre** (real-time gate, occupancy and flow monitoring); **access edge** (handheld validation app plus turnstile edge devices). Architecture: cloud-native on Google Cloud, PostgreSQL, event-driven messaging, analytics warehouse feeding sponsor and ops reporting. Mobile apps in React Native; web in Next.js. Apple and Google Wallet integration, regional payment acquiring, and an AI layer powering the attendee concierge, event recaps and sponsor-report narratives. Hybrid buy-vs-build: best-in-class ticketing and cashless rails are integrated, while the identity graph, apps, audience platform and sponsor tooling are owned IP. Current state: product definition complete; 90-day discovery to working sandbox underway; sandbox demo target November 2026.",
    demoUrl: undefined,
    demoLabel: undefined,
    demoNote: "Sandbox demonstration in build — full end-to-end journey (identity → ticket → gate → cashless → sponsor dashboard) targeting November 2026.",
    screenshots: [],
  },
  businessModel: [
    "Falcon EventOS is paid for by two customer sets. Event owners and organisers pay for the platform that turns disconnected ticket sales into a compounding, consented, owned year-round audience — one persistent attendee identity that carries across every event in a city's calendar, and the operational spine to run each edition: branded event apps, attendee web portal, hospitality management for corporate guests, and an ops command centre covering gate throughput and live occupancy. Sponsors pay for the new digital sponsor inventory and self-serve dashboards with automated reporting — audited, persistent audience value instead of one-weekend impressions.",
    "The commercial model follows the KinetiKx anchor-client playbook: a world-class operator funds and stress-tests the build on real flagship events, KinetiKx retains the core IP, and every subsequent licensee deploys a platform hardened at the highest level of live-event operations. Hybrid buy-vs-build keeps the platform capital-honest — best-in-class ticketing and cashless rails are integrated, while the identity graph, apps, audience platform and sponsor tooling are owned IP. Modular core with isolated high-stakes satellites means each new licensee inherits the same battle-tested platform.",
    "The economics of events are shifting from tickets to audience relationships, and Falcon EventOS is the infrastructure for that shift. Every event run on the platform deepens the attendee identity graph and expands the sponsor inventory catalogue; every new licensee inherits a platform already validated at the highest level of live-event operations. World-class events build audiences of 100,000+ per edition and today let them evaporate the day the gates close — EventOS turns those audiences into an owned, year-round asset, then licenses white-label to event owners worldwide.",
  ],
  gtm: [
    "Two demand sides on one platform. The anchor customer segment is event owners and organisers running world-class events — sports, concerts, festivals, exhibitions, trade shows — that today let hundreds of thousands of attendees per edition evaporate and re-acquire the same people every year through channels they don't own. The second segment is sponsors, who today pay for one-weekend impressions and want audited, persistent audience value instead. Attendees are the audience the platform serves across both — one identity across every event in the city's calendar.",
    "The platform launches at Dubai scale through the anchor-client playbook: a world-class operator funds and stress-tests the build on real flagship events, KinetiKx retains the core IP, and every subsequent licensee inherits a platform hardened at that level. Beyond the anchor, distribution runs on white-label licensing to non-competing event owners worldwide, with the same modular core deployed per property through branded event apps that feel native to each event. Sponsors reach the platform through the self-serve sponsor dashboard, which turns audience-data access into a distribution channel of its own.",
    "Discovery and sandbox run from September to November 2026, producing a working end-to-end sandbox. A pilot follows at a flagship golf event in January 2027, then a second property extension (racing) in March 2027. Phase-2 build runs from April to July 2027, and full-scale deployment at rugby-scale (100K+ attendees) lands in November 2027. Beyond the anchor, the platform is licensed white-label to non-competing event owners worldwide.",
  ],
  keyNumbers: [
    { label: "Per edition", value: "100,000+", hint: "World-class events build six-figure audiences — then let them evaporate. EventOS keeps them." },
    { label: "Identity", value: "1", hint: "One persistent attendee identity across every event in the city's calendar." },
    { label: "Owned audience", value: "365", hint: "From event weekends to a year-round, consented, owned audience." },
    { label: "Surfaces", value: "6", hint: "Branded apps to ops command centre — six surfaces, one platform." },
    { label: "To sandbox", value: "90", hint: "A 90-day discovery delivers a working end-to-end sandbox: identity → ticket → gate → cashless → sponsor dashboard." },
  ],
  team: {
    intro: "[LUCY placeholder] — Team draft blocked on XGL input per Lucy DM 2026-09-13.",
    members: [{ name: "Xavier (XGL)", role: "Founder + Product Architect" }],
  },
};

// === KINETIKX VS ===
export const KINETIKX_VS_DETAIL: VentureDetail = {
  description: [
    "K•VS takes ideas — ours or a client's — from zero to one, then escorts them beyond Series A. What makes the model unusual is who funds it: enterprise anchor clients engage the studio on their own transformation, for fees, equity or both. The client funds the build and keeps the benefit; where the fit is right, an anchor client can come all the way in as a shareholder. Services become platforms. Clients become partners. IP stays in the studio. For investors, family offices and institutions, that means venture upside with a de-risked cost base. For corporates, it means an innovation engine with real venture economics — not a lab that ships nothing.",
    "The studio operates by Journeys — cohorts of five ventures built in parallel on one shared playbook. Journey One is live: NYSM (HRtech), HERAKLYS (sportstech), Liquid Space (F&B), Tchip•In (fintech) and Pets•Nation (petcare). All are built AI-accelerated: small senior teams, agentic delivery, enterprise-grade output at startup speed. What one venture learns on Monday, the other four apply on Tuesday. A failure doesn't kill the studio; a win lifts everything. Journey Two follows.",
    "Because the founder has done the hard version of this for 25+ years in the GCC: turning a $3M-deficit subsidiary into a $25M+ revenue business, running a $25M innovation fund, building and exiting his own agency. The studio industrialises that operating pattern — and Dubai gives it the capital, the talent and the regulatory runway to compound.",
  ],
  conceptDiagramSrc: undefined,
  conceptDiagramCaption: undefined,
  market: {
    tam: {
      label: "TAM",
      amountLabel: "~$2.0B",
      paragraph:
        "The addressable market for K•VS is the GCC/MENA corporate mandate market — the budget envelope GCC enterprises, family offices, and government-linked entities allocate to outside partners to build, transform, or spin out ventures on their behalf. The GCC consulting market reached USD 7.4 B in 2024 (13.3% growth year-on-year) and is projected to exceed USD 8.3 B in 2025 (12% growth). GCC strategy consulting — the closest published proxy for the innovation-and-build mandate sub-segment — was valued at USD 2.1 B in 2024, growing to approximately USD 2.2 B in 2025. Applying a conservative 8–10% venture-building-mandate share of GCC digital-transformation spend (USD 18.2 B, 2025) implies a GCC mandate TAM of ~USD 1.5–1.8 B, widening to ~USD 2.0 B when MENA is included.",
    },
    sam: {
      label: "SAM",
      amountLabel: "~$38M/yr",
      paragraph:
        "The SAM filters the TAM to clients who can realistically engage a high-touch, IP-retaining venture studio: GCC large enterprises with active innovation mandates (~250, filtered from Fortune 500 Arabia and Vision 2030-aligned sectors), GCC/MENA family offices with venture-building appetite (~45, from ~290 MENA single family offices × 58% VC-active rate × mandate-readiness filter), and government-linked/quasi-sovereign entities (~20 conservative estimate) — ~315 addressable anchor-client mandates total. At an average anchor-mandate value of ~USD 1 M/mandate/year (blended fee-and-equity, conservative) and a 12% mandate-active rate, approximately 38 active mandates/year at USD 1 M each = ~USD 38 M/year, with a ceiling near ~USD 71 M/year at higher activity and mandate value.",
    },
    som: {
      label: "SOM · modelled",
      amountLabel: "~$18M · modelled",
      paragraph:
        "Studio capacity — not market opportunity — is the constraint. K•VS runs senior-heavy teams with agentic AI-accelerated delivery and a Journeys structure of five ventures per cohort; Journey One is live, Journey Two follows. A realistic capacity envelope is 3–4 active anchor-client mandates in Year 1, 5–7 in Year 2, and 7–10 in Year 3 as Journey Two opens. At the mandate-value proxy of USD 1 M/mandate, the SOM range is USD 3–4 M in Year 1, USD 5–6 M in Year 2, USD 8–10 M in Year 3 — 3-year cumulative ~USD 16–20 M, modelled midpoint ~USD 18 M, or 14–17% of the 3-year SAM pool. This is capacity-constrained, not market-constrained.",
    },
  },
  uiUx: {
    paragraph:
      "**KinetiKx Venture Studios (K•VS)** is a Dubai venture studio that takes ideas from zero to one and escorts them beyond Series A. The model is de-risked by design: enterprise anchor clients fund the build and keep the benefit — and where the fit is right, an anchor client can come all the way in as a shareholder. Studio surfaces: **kinetikx.com** (studio site, venture drawers, JOURNEY•ONE), the venture products themselves, and the founder's build-in-public channel. Proof points: **AOSX** (sovereign on-premise AI platform — named AI colleagues on client-owned hardware, concept to operational prototype inside the studio); **Sport & Leisure Management OS** (enterprise ERP under Canadian client mandate — API-first, multi-tenant, unifying membership, reservations, payments, retail, F&B and analytics); **NYSM** (two-sided video-first recruitment platform from concept to working product with cloud video pipeline and native apps in progress). Current state September 2026: Journey One in full build — one venture approaching public launch (NYSM), one platform under contract and moving to production with its anchor client (sports OS), one consumer product heading to first commercial sale (Liquid Space), AOSX proven as an operational prototype. Studio bench and six co-founders assembled.",
    demoUrl: "https://www.kinetikx.com/#cohort",
    demoLabel: "Meet the cohort",
    demoNote: "The cohort strip on this page is the studio's product surface.",
    screenshots: [],
  },
  businessModel: [
    "KinetiKx Venture Studios (K•VS) has two paying audiences engaging the same operating machine. Enterprise anchor clients pay the studio to build and run their own transformation — for fees, equity or both — and where the fit is right, an anchor client can come all the way in as a shareholder in the venture born from that mandate. Investors, family offices and institutions engage the other side: structured access to a studio-built portfolio of ventures, taken from zero to one and escorted beyond Series A. On both sides, the buyer gets venture upside with a de-risked cost base — not a lab that ships nothing.",
    "Every anchor engagement funds real work — strategy, venture architecture, commercial and development — delivered by small senior teams augmented with agentic AI. The client funds the build and keeps the benefit; the studio retains the IP. Services become platforms, clients become partners, and each successful mandate compounds three ways: fees during the build, equity in the venture that grows out of it, and a productised platform that can be white-labelled beyond the original client. The studio's own operating pattern — turning a $3M-deficit subsidiary into a $25M+ revenue business with EBITDA at scale — is the discipline the model is built on.",
    "K•VS operates in Journeys — cohorts of five ventures built in parallel on one shared playbook, one design system, one bench. Journey One is live with five named ventures across HRtech, sportstech, F&B, fintech and petcare. What one venture learns on Monday, the other four apply on Tuesday. A failure does not kill the studio; a win lifts everything. Founded in Dubai in 2023, the studio industrialises 25+ years of GCC operating experience — and Journey Two will run on infrastructure already paid for by Journey One.",
  ],
  gtm: [
    "Two demand sides feeding one studio. On the corporate innovation side, the anchor segment is GCC enterprise clients who need real venture economics from their transformation spend — not another consultancy deck — and who can commit as anchor customers on fees, equity or both. On the capital side, the segment is investors, family offices and institutions looking for structured exposure to a studio-built portfolio rather than one-off bets. The through-line: buyers on both sides want venture upside with a de-risked cost base.",
    "kinetikx.com is the primary front door — a studio site with venture drawers and the JOURNEY•ONE view of the five ventures currently in build. Around it, the venture products themselves (NYSM, HERAKLYS, Liquid Space, Tchip•In, Pets•Nation) act as living proof surfaces, and the founder's build-in-public channel converts credibility earned across 25+ years in the GCC into inbound. Enterprise anchor mandates are won through direct relationships, and each successful mandate seeds the next: services become platforms, clients become partners.",
    "Dubai-headquartered, GCC-first — the market that gives the studio the capital, talent and regulatory runway to compound. Near-term, the sequence is set by Journey One: one venture approaching public launch, one platform under contract and moving to production with its anchor client, one consumer product heading to first commercial sale, and the AOSX platform proven as an operational prototype. Each anchor-client mandate becomes a platform with white-label reach; investors get an investor platform for structured access to the studio model; and Journey Two follows as the next cohort of five ventures built on infrastructure already paid for by the first.",
  ],
  keyNumbers: [
    { label: "The turnaround", value: "$3M → $25M+", hint: "From a $3M deficit to $25M+ in revenue — the operating playbook this studio is built on." },
    { label: "Profitability", value: "32%", hint: "EBITDA at scale. We build businesses, not burn rates." },
    { label: "People scaled", value: "500+", hint: "A 500+ person organisation, rebuilt and led hands-on — not advised from a boardroom." },
    { label: "Founded", value: "2023", hint: "A venture studio born from operating experience, headquartered in Dubai." },
    { label: "Journey One", value: "5", hint: "Five ventures in active build — and a second journey already forming behind them." },
  ],
  team: {
    intro:
      "Studio bench and six co-founders assembled. The K•VS bench spans strategy, venture architecture, commercial and development, augmented with agentic AI delivery — small senior teams building enterprise-grade output at startup speed.",
    members: [
      {
        name: "Xavier G. Layre",
        role: "Founder",
        note: "[BIO + PHOTO PENDING]",
      },
      {
        name: "Other co-founders",
        role: "Co-founders",
        note: "To be confirmed.",
      },
    ],
  },
};

export const VENTURE_DETAILS: Record<string, VentureDetail> = {
  heraklys: HERAKLYS_DETAIL,
  nysm: NYSM_DETAIL,
  tchipin: TCHIPIN_DETAIL,
  petsnation: PETSNATION_DETAIL,
  "liquid-space": LIQUID_SPACE_DETAIL,
  "kinetikx-vs": KINETIKX_VS_DETAIL,
  finwel: FINWEL_DETAIL,
  aosx: AOSX_DETAIL,
  "falcon-eos": FALCON_EOS_DETAIL,
};