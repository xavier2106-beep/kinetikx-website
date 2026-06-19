// 33 agents in Xavier-positioned 7×5 grid (row-major, 2 empty cells).
// Source of truth: ~/Documents/KVS/Agents-Team/Agents Team.xlsx (Agents sheet).
// Last positioning map: XGL via Telegram 2026-06-19.

export type Agent = {
  key: string;
  fullName: string;
  position: string;
  dept: "CEO Office" | "CIO Office" | "Brand" | "Engineering";
  tagline: string;
};

export const AGENTS: Record<string, Agent> = {
  MacAgent:  { key: "MacAgent",  fullName: "MacAgent McKinnon",       position: "Chief of Staff",                       dept: "CEO Office",  tagline: "Orchestrator of the Mac. Conductor of the agent fleet." },
  Charlotte: { key: "Charlotte", fullName: "Charlotte Akiyama",       position: "Executive PA",                         dept: "CEO Office",  tagline: "Calendar guardian. Inbox surgeon. The day, on rails." },
  Nina:      { key: "Nina",      fullName: "Nina Solheim",            position: "Studio Engineer in Residence",         dept: "CEO Office",  tagline: "Code over ceremony. Always." },
  Theo:      { key: "Theo",      fullName: "Theo Bushwald",           position: "PMO",                                  dept: "CEO Office",  tagline: "Surfaces what's stuck. Nudges what's slow. Escalates what's lost." },
  Rebecca:   { key: "Rebecca",   fullName: "Rebecca Falcone",         position: "Legal Counsel & Acting CIO",           dept: "CIO Office",  tagline: "Strategy under jurisdiction. Compliance with teeth." },
  Warren:    { key: "Warren",    fullName: "Warren Buchanan",         position: "Finance & Accounts",                   dept: "CIO Office",  tagline: "Numbers that hold up under audit, and inside the deck." },
  Tia:       { key: "Tia",       fullName: "Tia Murong",              position: "HR & Procurement",                     dept: "CIO Office",  tagline: "People in. Process clean. Vendors honest." },
  Beatrice:  { key: "Beatrice",  fullName: "Beatrice Wanjiku-Bakari", position: "Business Intelligence",                dept: "CIO Office",  tagline: "Plan vs. actual, told straight. Every venture, every week." },
  Cameron:   { key: "Cameron",   fullName: "Cameron Jones",           position: "Query & BI Programming",               dept: "CIO Office",  tagline: "Queries that ship. Dashboards that don't lie." },
  Athena:    { key: "Athena",    fullName: "Athena De Santis",        position: "Security & Audit",                     dept: "CIO Office",  tagline: "The threat model nobody wants to write. Written." },
  Rosa:      { key: "Rosa",      fullName: "Rosa Tavares",            position: "Records & Contracts",                  dept: "CIO Office",  tagline: "The data room you want, before you need it." },
  Reggie:    { key: "Reggie",    fullName: "Reggie Winter",           position: "Compliance Ops",                       dept: "CIO Office",  tagline: "Filings on time. Regulators uneventful." },
  Lucy:      { key: "Lucy",      fullName: "Lucy Del Mar",            position: "Head of Marketing & Sales",            dept: "Brand",       tagline: "Brand under control. Pipeline under pressure." },
  Teresa:    { key: "Teresa",    fullName: "Teresa Veloso",           position: "Lead Research",                        dept: "Brand",       tagline: "Profiles deep enough to hand-deliver the pitch." },
  Margaux:   { key: "Margaux",   fullName: "Margaux Mouniama",        position: "Graphic Designer",                     dept: "Brand",       tagline: "Visual identity, frame-perfect. Brand, every pixel." },
  Oscar:     { key: "Oscar",     fullName: "Oscar Bailey",            position: "Video Content Creator",                dept: "Brand",       tagline: "Story-boards to motion. Tutorials to launch films." },
  Helena:    { key: "Helena",    fullName: "Helena Cesarić",          position: "Social Media Content Writer",          dept: "Brand",       tagline: "Copy that reads human. Brand voice, frame after frame." },
  Anthony:   { key: "Anthony",   fullName: "Anthony Costa",           position: "Digital Media Specialist",             dept: "Brand",       tagline: "Media plans that move metrics. Channels that pay." },
  Marco:     { key: "Marco",     fullName: "Marco Vega",              position: "Product Marketing Manager",            dept: "Brand",       tagline: "Positioning before noise. Messaging that earns the click." },
  Sophia:    { key: "Sophia",    fullName: "Sophia Lazzaro",          position: "Social Media Manager",                 dept: "Brand",       tagline: "The community, kept alive. The feed, kept warm." },
  Pierre:    { key: "Pierre",    fullName: "Pierre de Fontaine",      position: "Press & Media Relations",              dept: "Brand",       tagline: "The right journalist, the right week. Story angles that land." },
  Lea:       { key: "Lea",       fullName: "Lea Mistral",             position: "Sales & Outreach B2B",                 dept: "Brand",       tagline: "Pipeline as a discipline. B2B as a sport." },
  Nadia:     { key: "Nadia",     fullName: "Nadia O'Hara",            position: "Customer Support B2C",                 dept: "Brand",       tagline: "Voice that calms. Answer that fits. Loyalty that compounds." },
  Natasha:   { key: "Natasha",   fullName: "Natasha Sólyom",          position: "Customer Support B2B",                 dept: "Brand",       tagline: "The escalation never reaches you. Quietly handled." },
  Claude:    { key: "Claude",    fullName: "Claude Hamilton",         position: "CTO / Architect",                      dept: "Engineering", tagline: "The build, made coherent. Stack, fleet, and roadmap as one." },
  Fred:      { key: "Fred",      fullName: "Fred Marković",           position: "Back End",                             dept: "Engineering", tagline: "Schema, API, performance — the work most people never see." },
  Edison:    { key: "Edison",    fullName: "Edison Rao",              position: "Back End (Channels)",                  dept: "Engineering", tagline: "Webhooks, queues, retries — the plumbing kept honest." },
  Julie:     { key: "Julie",     fullName: "Julie Ben Amor",          position: "Front End Web",                        dept: "Engineering", tagline: "Web UI that snaps. Interactions that obey." },
  Tara:      { key: "Tara",      fullName: "Tara Mehra",              position: "Front End Mobile",                     dept: "Engineering", tagline: "Pixel-perfect mobile. Native feel, web speed." },
  Mike:      { key: "Mike",      fullName: "Mike Tan",                position: "React Native",                         dept: "Engineering", tagline: "One codebase. Two stores. Zero compromise." },
  Anna:      { key: "Anna",      fullName: "Anna Lindberg",           position: "Video Processing",                     dept: "Engineering", tagline: "ffmpeg whisperer. Encoding pipelines that don't melt." },
  Alex:      { key: "Alex",      fullName: "Alex Moon",               position: "QA",                                   dept: "Engineering", tagline: "The bug found before the user. The doc kept current." },
  Sam:       { key: "Sam",       fullName: "Sam Beckett",             position: "Dev Ops",                              dept: "Engineering", tagline: "Servers up. Configs sane. Deploys boring." },
};

// Grid 7 rows × 5 cols, row-major (left-to-right then top-to-bottom).
// Source: XGL via Matrix 2026-06-19.
export const GRID: (keyof typeof AGENTS | "EMPTY")[][] = [
  ["MacAgent", "Rebecca", "Claude",  "Lucy",     "Charlotte"],
  ["Nina",     "Fred",    "Tara",    "Mike",     "Edison"],
  ["Sam",      "Athena",  "Julie",   "Alex",     "Anna"],
  ["Beatrice", "Cameron", "Marco",   "Teresa",   "Lea"],
  ["Warren",   "Tia",     "Margaux", "Oscar",    "Helena"],
  ["Reggie",   "Rosa",    "Anthony", "Sophia",   "Pierre"],
  ["EMPTY",    "Theo",    "Nadia",   "Natasha",  "EMPTY"],
];
