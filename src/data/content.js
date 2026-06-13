export const profile = {
  name: "Umesh Budhathoki",
  firstName: "Umesh",
  lastName: "Budhathoki",
  role: "Business Systems Developer & Analyst",
  company: "Buller District Council",
  tagline: "Full-Stack Developer crafting web, mobile & cloud systems.",
  location: "West Coast, New Zealand",
  email: "Umesh.budathoki23@gmail.com",
  summary:
    "MIT graduate and full-stack developer who turns business needs into practical, scalable software. I design and build in-house applications, integrations and APIs across council core systems — from .NET and Blazor platforms to React front-ends, mobile apps and cloud automation.",
  about:
    "I'm a software engineer based on New Zealand's West Coast with a Master of Information Technology (First Class Honours). Over the past several years I've shipped products across .NET, React, Flutter and Azure — building everything from enterprise web platforms and community mobile apps to native macOS utilities. I like the whole journey: understanding the problem, designing the architecture, writing clean code, and translating technical concepts into plain language for the people who use them.",
  github: "https://github.com/umesheo",
  linkedin: "https://www.linkedin.com/in/umesh-budhathoki-208832106/",
  socials: [
    { label: "Email", href: "mailto:Umesh.budathoki23@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/umesh-budhathoki-208832106/" },
    { label: "GitHub", href: "https://github.com/umesheo" },
  ],
  stats: [
    { value: "6+", label: "Years building software" },
    { value: "15+", label: "Projects shipped" },
    { value: "2", label: "First-class degrees" },
    { value: "∞", label: "Cups of coffee" },
  ],
};

export const experiences = [
  {
    company: "Buller District Council",
    role: "Business Systems Developer & Analyst",
    period: "Apr 2026 — Present",
    location: "New Zealand · Hybrid",
    points: [
      "Design, develop and maintain in-house applications, integrations and APIs across the council's core systems.",
      "Build and support websites, digital services and data pipelines.",
      "Connect business needs with practical, scalable technology solutions.",
      "Create dashboards, reporting tools and automation to improve operational insights.",
      "Lead testing, deployment and lifecycle management of solutions.",
      "Provide Tier 3 technical support and resolve complex system issues.",
      "Drive continuous improvement across systems and processes.",
      "Translate technical concepts into plain language for a wide range of stakeholders.",
      "Led a firewall upgrade to Sophos XGS 2300, strengthening network security and resilience.",
      "Integrated Jira ticketing with IT asset tracking to streamline support and lifecycle management.",
      "Delivered automation and Power BI reporting projects for data-driven operational insights.",
    ],
  },
  {
    company: "Buller District Council",
    role: "Acting IT Manager",
    period: "Oct 2025 — Dec 2025",
    location: "New Zealand",
    points: [
      "Handled network security, disaster recovery and DRaaS; designed firewalls and managed cloud backup points.",
      "Led solution architecture and implementation for new projects across the council.",
      "Led the IT team and upgraded existing hardware for meetings and operations.",
    ],
  },
  {
    company: "Buller District Council",
    role: "Technical Support Developer",
    period: "Jul 2025 — Mar 2026",
    location: "New Zealand",
    points: [
      "Provided timely technical support and troubleshooting for hardware, software and network issues.",
      "Administered Microsoft Office 365, Active Directory and Azure environments.",
      "Supported IT & GIS projects and applied ITIL principles to improve service delivery.",
    ],
  },
  {
    company: "Nemean Consulting Ltd",
    role: "Web Developer / ICT Engineer",
    period: "May 2023 — Jun 2025",
    location: "New Zealand · On-site",
    points: [
      "Designed, developed and maintained the company website using .NET Blazor and MVC architecture.",
      "Optimised backend functionality with ASP.NET and C# to improve operational efficiency.",
      "Managed IT infrastructure, data backups and network security; drove SEO and digital marketing.",
    ],
  },
  {
    company: "Innovate Tech — MySecondTeacher",
    role: "Java & .NET Developer",
    period: "2022 — 2023",
    location: "Remote",
    points: [
      "Designed advanced Java & .NET curriculum including DSA, C#, MAUI and Blazor for an online learning platform.",
      "Produced engaging step-by-step programming tutorial videos and collaborated with animators.",
      "Worked with QA instructors to refine educational content for a seamless learner experience.",
    ],
  },
  {
    company: "Troopers Group",
    role: "Project Manager & Mobile Developer",
    period: "2020 — 2022",
    location: "Nepal",
    points: [
      "Led development of a mobile app connecting users with essential workers using Agile methodology.",
      "Built the admin panel with PHP, Laravel, MySQL and Firebase — ratings, location matching and favourites.",
      "Managed budgets, feasibility studies, risk and a team of two developers; pitched to investors.",
    ],
  },
];

export const projects = [
  {
    title: "NotchBar",
    subtitle: "Spotify in your Mac notch",
    year: "2026",
    category: "Native macOS · Swift",
    description:
      "A native macOS utility that turns the unused MacBook notch into a personal Spotify player — album art, live waveforms and full playback controls that expand on hover, just like Dynamic Island. Built native in Swift, under 5 MB and less than 1% CPU.",
    tags: ["Swift", "macOS", "Spotify API", "UI/UX"],
    href: "https://notchbar-website.vercel.app/",
    accent: "#1db954",
    featured: true,
  },
  {
    title: "Coast Waters Ltd (Demo)",
    subtitle: "Demo for Coast Waters Ltd",
    year: "2026",
    category: "Web Platform · Demo Redesign",
    description:
      "A demo redesign of the Coast Waters Ltd website, created for presentation purposes. Coast Waters is a CCO established by the Buller, Grey and Westland District Councils — this concept explores an interactive West Coast map, district rate explorers and a transition roadmap that makes a $258.5M infrastructure reform easy to understand.",
    tags: ["React", "Interactive Map", "Data Viz", "UX"],
    href: "https://coast-waters-redesign.vercel.app/",
    accent: "#2ea6e6",
    featured: true,
  },
  {
    title: "BDC Connect",
    subtitle: "Community engagement app",
    year: "2026",
    category: "Mobile App · Full Stack",
    description:
      "A community engagement mobile app for the Buller District Council. Residents get a live feed of council updates, report infrastructure & environment issues, vote in polls and send feedback — with secure auth, admin tooling and category filtering.",
    tags: ["Flutter", "Auth", "Feed", "Admin Panel"],
    image: "/projects/bdc-feed.png",
    imageAlt: "/projects/bdc-login.png",
    accent: "#2f6bff",
    featured: true,
  },
  {
    title: "BDC Visitor Sign-In",
    subtitle: "Digital visitor management",
    year: "2026",
    category: "Internal Platform · Kiosk",
    description:
      "A council-wide digital kiosk that replaces the paper visitor register. Visitors self check-in and out, hosts get automatic notifications, Customer Service issues visitor cards, and admins get reporting dashboards — with H&S compliance, auto check-out and a 40-second confirmation flow.",
    tags: ["Kiosk", "Automation", "Notifications", "Reporting"],
    visualType: "poster",
    image: "/projects/bdc-visitor.png",
    accent: "#1f4ed8",
    featured: true,
  },
  {
    title: "HikerVerse",
    subtitle: "Discover NZ's best trails",
    year: "2025",
    category: "Mobile App · Personal",
    description:
      "A personal mobile app for hikers and campers to discover the best hiking and camping spots around New Zealand. Browse curated places with locations, ratings and reviews, search and save favourites — wrapped in a playful, hand-drawn UI.",
    tags: ["React Native", "Auth", "Geolocation", "Ratings"],
    image: "/projects/hikerverse-home.png",
    imageAlt: "/projects/hikerverse-login.png",
    href: "https://github.com/umesheo",
    accent: "#16a34a",
    featured: true,
  },
  {
    title: "Mihitek",
    subtitle: "IT services & digital solutions",
    year: "2025",
    category: "Web · IT Services",
    description:
      "Corporate website for Mihitek, a New Zealand IT services company delivering cloud architecture, cybersecurity, software development and 24/7 support. Built to showcase their services — IT support, cloud, cyber security, app and web development, AI solutions and onsite assistance — with a modern, trust-focused design and lead capture.",
    tags: ["Web Design", "Responsive", "SEO", "Lead Gen"],
    href: "https://mihitek.com/",
    accent: "#6366f1",
    featured: false,
  },
  {
    title: "Creovira",
    subtitle: "Infrastructure consultancy site",
    year: "2025",
    category: "Web · Engineering",
    description:
      "A corporate website for Creovira, a New Zealand engineering and infrastructure consultancy specialising in transport, 3 Waters, civil, asset management and strategic advisory. Built to showcase their services, project portfolio, team and enquiries with a clean, professional design.",
    tags: ["Web Design", "Responsive", "SEO", "CMS"],
    href: "https://creovira.com/",
    accent: "#0ea5a4",
    featured: false,
  },
  {
    title: "Nemean Consulting",
    subtitle: "Corporate web platform",
    year: "2024",
    category: "Web · .NET Blazor",
    description:
      "Company website and web platform built with .NET Blazor and MVC, focused on performance, security and a user-friendly design — enhanced with SEO and digital marketing to grow traffic and visibility.",
    tags: [".NET", "Blazor", "C#", "SEO"],
    href: "https://www.nemean.nz",
    accent: "#e0b65b",
    featured: false,
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["C#", "Java", "Python", "JavaScript", "PHP", "SQL", "Dart", "Swift"],
  },
  {
    title: "Frameworks",
    items: [".NET", "Blazor", "MAUI", "MVC", "React", "Flutter", "Laravel", "Three.js"],
  },
  {
    title: "Cloud & DevOps",
    items: ["Azure", "CI/CD", "Git", "Bash", "Active Directory", "Office 365"],
  },
  {
    title: "Data & Design",
    items: ["SQL Server", "Oracle", "Firebase", "MySQL", "Photoshop", "Premiere Pro"],
  },
];

export const education = [
  {
    degree: "Master of Information Technology",
    grade: "First Class Honours",
    school: "MIT · Auckland Institute of Studies, NZ",
  },
  {
    degree: "BSc (Hons) Computing",
    grade: "First Class Honours",
    school: "London Metropolitan University, UK",
  },
  {
    degree: "Associate Degree, IT",
    grade: "Computing",
    school: "NC Wesleyan & Navarro College, USA",
  },
];
