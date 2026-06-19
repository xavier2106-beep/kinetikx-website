// 33 agents in Xavier-positioned 7×5 grid (row-major, 2 empty cells).
// Source of truth: ~/Documents/KVS/Agents-Team/Agents Team.xlsx (Agents sheet).
// Last positioning map: XGL via Telegram 2026-06-19.
// Nationality + zodiac mapping: XGL via Telegram 2026-06-19.

// Zodiac symbols with U+FE0E (text variation selector) appended to force
// monochrome text rendering instead of the default colored-emoji presentation
// some systems use (iOS Safari renders these glyphs in purple/orange otherwise).
export const ZODIAC_SYMBOL: Record<string, string> = {
  Aries:       "♈︎",
  Taurus:      "♉︎",
  Gemini:      "♊︎",
  Cancer:      "♋︎",
  Leo:         "♌︎",
  Virgo:       "♍︎",
  Libra:       "♎︎",
  Scorpio:     "♏︎",
  Sagittarius: "♐︎",
  Capricorn:   "♑︎",
  Aquarius:    "♒︎",
  Pisces:      "♓︎",
};

export type Agent = {
  key: string;
  fullName: string;
  position: string;
  dept: "CEO Office" | "CIO Office" | "Brand" | "Engineering";
  tagline: string;
  nationality: string;
  flag: string;
  zodiac: string;
};

export const AGENTS: Record<string, Agent> = {
  MacAgent:  { key: "MacAgent",  fullName: "MacAgent McKinnon",       position: "Chief of Staff",                       dept: "CEO Office",  tagline: "Orchestrator of the Mac. Conductor of the agent fleet.",       nationality: "Scottish",       flag: "🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}", zodiac: "Gemini" },
  Charlotte: { key: "Charlotte", fullName: "Charlotte Akiyama",       position: "Executive PA",                         dept: "CEO Office",  tagline: "Calendar guardian. Inbox surgeon. The day, on rails.",         nationality: "Japanese",       flag: "🇯🇵", zodiac: "Scorpio" },
  Nina:      { key: "Nina",      fullName: "Nina Solheim",            position: "Studio Engineer in Residence",         dept: "CEO Office",  tagline: "Code over ceremony. Always.",                                  nationality: "Norwegian",      flag: "🇳🇴", zodiac: "Scorpio" },
  Theo:      { key: "Theo",      fullName: "Theo Bushwald",           position: "PMO",                                  dept: "CEO Office",  tagline: "Surfaces what's stuck. Nudges what's slow. Escalates what's lost.", nationality: "Austrian",   flag: "🇦🇹", zodiac: "Pisces" },
  Rebecca:   { key: "Rebecca",   fullName: "Rebecca Falcone",         position: "Legal Counsel & Acting CIO",           dept: "CIO Office",  tagline: "Strategy under jurisdiction. Compliance with teeth.",          nationality: "American",       flag: "🇺🇸", zodiac: "Aries" },
  Warren:    { key: "Warren",    fullName: "Warren Buchanan",         position: "Finance & Accounts",                   dept: "CIO Office",  tagline: "Numbers that hold up under audit, and inside the deck.",       nationality: "Scottish",       flag: "🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}", zodiac: "Cancer" },
  Tia:       { key: "Tia",       fullName: "Tia Murong",              position: "HR & Procurement",                     dept: "CIO Office",  tagline: "People in. Process clean. Vendors honest.",                    nationality: "Chinese",        flag: "🇨🇳", zodiac: "Gemini" },
  Beatrice:  { key: "Beatrice",  fullName: "Beatrice Wanjiku-Bakari", position: "Business Intelligence",                dept: "CIO Office",  tagline: "Plan vs. actual, told straight. Every venture, every week.",   nationality: "Kenyan",         flag: "🇰🇪", zodiac: "Sagittarius" },
  Cameron:   { key: "Cameron",   fullName: "Cameron Jones",           position: "Query & BI Programming",               dept: "CIO Office",  tagline: "Queries that ship. Dashboards that don't lie.",                nationality: "Tanzanian",      flag: "🇹🇿", zodiac: "Aries" },
  Athena:    { key: "Athena",    fullName: "Athena De Santis",        position: "Security & Audit",                     dept: "CIO Office",  tagline: "The threat model nobody wants to write. Written.",             nationality: "Italian",        flag: "🇮🇹", zodiac: "Pisces" },
  Rosa:      { key: "Rosa",      fullName: "Rosa Tavares",            position: "Records & Contracts",                  dept: "CIO Office",  tagline: "The data room you want, before you need it.",                  nationality: "Portuguese",     flag: "🇵🇹", zodiac: "Capricorn" },
  Reggie:    { key: "Reggie",    fullName: "Reggie Winter",           position: "Compliance Ops",                       dept: "CIO Office",  tagline: "Filings on time. Regulators uneventful.",                      nationality: "Swiss",          flag: "🇨🇭", zodiac: "Virgo" },
  Lucy:      { key: "Lucy",      fullName: "Lucy Del Mar",            position: "Head of Marketing & Sales",            dept: "Brand",       tagline: "Brand under control. Pipeline under pressure.",                nationality: "Spanish",        flag: "🇪🇸", zodiac: "Leo" },
  Teresa:    { key: "Teresa",    fullName: "Teresa Veloso",           position: "Lead Research",                        dept: "Brand",       tagline: "Profiles deep enough to hand-deliver the pitch.",              nationality: "Brazilian",      flag: "🇧🇷", zodiac: "Libra" },
  Margaux:   { key: "Margaux",   fullName: "Margaux Mouniama",        position: "Graphic Designer",                     dept: "Brand",       tagline: "Visual identity, frame-perfect. Brand, every pixel.",          nationality: "French (Réunion)", flag: "🇷🇪", zodiac: "Gemini" },
  Oscar:     { key: "Oscar",     fullName: "Oscar Bailey",            position: "Video Content Creator",                dept: "Brand",       tagline: "Story-boards to motion. Tutorials to launch films.",           nationality: "Jamaican",       flag: "🇯🇲", zodiac: "Aquarius" },
  Helena:    { key: "Helena",    fullName: "Helena Cesarić",          position: "Social Media Content Writer",          dept: "Brand",       tagline: "Copy that reads human. Brand voice, frame after frame.",       nationality: "Croatian",       flag: "🇭🇷", zodiac: "Libra" },
  Anthony:   { key: "Anthony",   fullName: "Anthony Costa",           position: "Digital Media Specialist",             dept: "Brand",       tagline: "Media plans that move metrics. Channels that pay.",            nationality: "Greek",          flag: "🇬🇷", zodiac: "Taurus" },
  Marco:     { key: "Marco",     fullName: "Marco Vega",              position: "Product Marketing Manager",            dept: "Brand",       tagline: "Positioning before noise. Messaging that earns the click.",    nationality: "Spanish",        flag: "🇪🇸", zodiac: "Leo" },
  Sophia:    { key: "Sophia",    fullName: "Sophia Lazzaro",          position: "Social Media Manager",                 dept: "Brand",       tagline: "The community, kept alive. The feed, kept warm.",              nationality: "Italian",        flag: "🇮🇹", zodiac: "Aries" },
  Pierre:    { key: "Pierre",    fullName: "Pierre de Fontaine",      position: "Press & Media Relations",              dept: "Brand",       tagline: "The right journalist, the right week. Story angles that land.", nationality: "French",        flag: "🇫🇷", zodiac: "Aquarius" },
  Lea:       { key: "Lea",       fullName: "Lea Mistral",             position: "Sales & Outreach B2B",                 dept: "Brand",       tagline: "Pipeline as a discipline. B2B as a sport.",                    nationality: "French",         flag: "🇫🇷", zodiac: "Aquarius" },
  Nadia:     { key: "Nadia",     fullName: "Nadia O'Hara",            position: "Customer Support B2C",                 dept: "Brand",       tagline: "Voice that calms. Answer that fits. Loyalty that compounds.",  nationality: "Irish",          flag: "🇮🇪", zodiac: "Taurus" },
  Natasha:   { key: "Natasha",   fullName: "Natasha Sólyom",          position: "Customer Support B2B",                 dept: "Brand",       tagline: "The escalation never reaches you. Quietly handled.",           nationality: "Hungarian",      flag: "🇭🇺", zodiac: "Sagittarius" },
  Claude:    { key: "Claude",    fullName: "Claude Hamilton",         position: "CTO / Architect",                      dept: "Engineering", tagline: "The build, made coherent. Stack, fleet, and roadmap as one.",  nationality: "Australian",     flag: "🇦🇺", zodiac: "Taurus" },
  Fred:      { key: "Fred",      fullName: "Fred Marković",           position: "Back End",                             dept: "Engineering", tagline: "Schema, API, performance — the work most people never see.",   nationality: "Serbian",        flag: "🇷🇸", zodiac: "Capricorn" },
  Edison:    { key: "Edison",    fullName: "Edison Rao",              position: "Back End (Channels)",                  dept: "Engineering", tagline: "Webhooks, queues, retries — the plumbing kept honest.",        nationality: "Indian",         flag: "🇮🇳", zodiac: "Sagittarius" },
  Julie:     { key: "Julie",     fullName: "Julie Ben Amor",          position: "Front End Web",                        dept: "Engineering", tagline: "Web UI that snaps. Interactions that obey.",                   nationality: "Tunisian",       flag: "🇹🇳", zodiac: "Leo" },
  Tara:      { key: "Tara",      fullName: "Tara Mehra",              position: "Front End Mobile",                     dept: "Engineering", tagline: "Pixel-perfect mobile. Native feel, web speed.",                nationality: "Indian",         flag: "🇮🇳", zodiac: "Taurus" },
  Mike:      { key: "Mike",      fullName: "Mike Tan",                position: "React Native",                         dept: "Engineering", tagline: "One codebase. Two stores. Zero compromise.",                   nationality: "Singaporean",    flag: "🇸🇬", zodiac: "Pisces" },
  Anna:      { key: "Anna",      fullName: "Anna Lindberg",           position: "Video Processing",                     dept: "Engineering", tagline: "ffmpeg whisperer. Encoding pipelines that don't melt.",        nationality: "German",         flag: "🇩🇪", zodiac: "Sagittarius" },
  Alex:      { key: "Alex",      fullName: "Alex Moon",               position: "QA",                                   dept: "Engineering", tagline: "The bug found before the user. The doc kept current.",         nationality: "South Korean",   flag: "🇰🇷", zodiac: "Cancer" },
  Sam:       { key: "Sam",       fullName: "Sam Beckett",             position: "Dev Ops",                              dept: "Engineering", tagline: "Servers up. Configs sane. Deploys boring.",                    nationality: "South African",  flag: "🇿🇦", zodiac: "Capricorn" },
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
