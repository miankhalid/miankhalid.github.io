/* ============================================================
   YOUR SITE CONTENT. Edit this file only.
   Add/remove/reorder items freely. Save & commit: site updates.
   Keep the commas and quotes as shown.
   ============================================================ */
window.SITE = {

  // ---- Identity / hero ----
  name: "Khalid",
  role: "Engineering Lead & AI-Enabled Forward-Deployed Engineer",
  tagline: "13+ years building backend, mobile, and AI-augmented systems end-to-end.",
  location: "Lahore, Pakistan",
  avatar: "assets/profile.jpeg",
  resume: "",

  // ---- About / bio ----
  about: [
    "Sr. Staff Engineer with 13+ years in backend engineering, mobile systems, system design, and cross-functional team leadership.",
    "Currently focused on Node.js/TypeScript backends, REST API design, and AI-augmented development workflows.",
    "Proven track record of owning end-to-end delivery, from architecture decisions and risk planning through rollout and post-launch reporting, across teams spanning backend, mobile, QA, and product.",
    "Leverage AI tooling (Claude Code, Opencode, Pi.dev) with token-usage discipline to ship production-grade systems faster without sacrificing quality."
  ],

  // ---- Contact / social links (each optional; omit to hide) ----
  contact: {
    email: "",
    github: "https://github.com/miankhalid",
    linkedin: "https://www.linkedin.com/in/miankhalid/",
    x: "",
    website: ""
  },

  // ---- Skills (grouped; add/remove groups & items freely) ----
  skills: [
    { group: "Languages",    items: ["TypeScript", "Java", "Kotlin", "JavaScript", "Python", "Swift", "Objective-C"] },
    { group: "Frameworks",   items: ["Node.js", "Fastify", "React Native", "Android"] },
    { group: "Databases",    items: ["SQLite", "PostgreSQL"] },
    { group: "State & Data", items: ["Redux", "Redux Toolkit"] },
    { group: "Dev Tools",    items: ["Claude Code", "Opencode", "Pi.dev", "GitHub", "FullStory", "Amplitude", "Splunk", "NewRelic", "DataDog", "VS Code", "Antigravity", "Zed", "Unity3D", "Logdy"] },
    { group: "Leadership",   items: ["Mentoring", "Team Leadership", "Team Building", "Client Relations"] },
    { group: "Process",      items: ["Agile Application Development", "Scrum", "Kanban"] },
    { group: "Design & UX",  items: ["A11y", "Figma", "Miro"] },
    { group: "Testing",      items: ["Unit Testing", "Test Automation", "End-to-End Testing"] }
  ],

  // ---- Experience (most recent first) ----
  experience: [
    {
      role: "Sr. Staff Engineer",
      org: "Arbisoft",
      period: "Jul 2015 - Present",
      points: [
        "Own end-to-end delivery: architecture decisions, risk planning, rollout, and post-launch reporting, across teams spanning backend, mobile, QA, and product.",
        "Focused on Node.js/TypeScript backends, REST API design, and AI-augmented development workflows.",
        "Led the mobile apps team on edX, rewriting native apps for Android (Jetpack Compose) and iOS (SwiftUI)."
      ]
    },
    {
      role: "Senior Software Engineer",
      org: "Intellectual Labs",
      period: "Apr 2013 - Jun 2015",
      points: []
    },
    {
      role: "Software Engineer",
      org: "Game View Studios Pvt Ltd",
      period: "Jul 2012 - Mar 2013",
      points: []
    }
  ],

  // ---- Education ----
  education: [
    { degree: "BIT", org: "NUST SEECS", period: "Sep 2008 - Jun 2012" }
  ],

  // ---- Projects (★ add a project = append one block here ★) ----
  projects: [
    {
      title: "Leavzy",
      blurb: "Employee leaves management system, a standalone HR system for tracking employee leaves through a role-based workflow. JWT + rotating refresh tokens, permission-based RBAC with row-level policy enforcement, derived leave-balance engine with proration and holiday calendar math, BullMQ + Redis async workers.",
      tags: ["Node.js", "Fastify", "TypeScript", "Prisma", "PostgreSQL", "BullMQ", "Redis", "Zod", "Vitest"],
      link: "",
      image: ""
    },
    {
      title: "Textalize Analyzer",
      blurb: "LangGraph agent for meeting-report analysis. Multi-node agent extracts action items, scores meetings on an 8×4 milestone rubric, and drafts submissions per person/team. Dual-LLM routing: Groq Llama-3.3-70B primary via LiteLLM, Gemini 2.0 Flash fallback. Streamlit UI, flat-file reports, checkpoint workflow, graphify knowledge-graph.",
      tags: ["LangGraph", "Agent Skills", "Streamlit", "Graphify"],
      link: "",
      image: ""
    },
    {
      title: "MetabolicLens",
      blurb: "POC of a metabolic health tracking app. AI-powered food-photo analysis computing an Insulin Load Score (0–100) based on Dr. Jason Fung's metabolic principle. FastAPI backend for photo upload, meal history, and scoring; Google Gemini 2.5 Flash for photo analysis; React Native frontend with camera capture, gallery picker, and fasting tracker.",
      tags: ["Python", "FastAPI", "Gemini 2.5 Flash", "React Native"],
      link: "",
      image: ""
    },
    {
      title: "Workstream",
      blurb: "ERP system designed to digitize and streamline complex organizational workflows. Spearheaded the mobile app's migration from JavaScript to TypeScript with Redux Toolkit, refactored core modules and optimized the API client, enforced strict ESLint + pre-commit hooks, and added end-to-end tests for critical paths.",
      tags: ["TypeScript", "React Native", "Redux Toolkit"],
      link: "https://play.google.com/store/apps/details?id=com.arbisoft.workstream&hl=en-US",
      image: ""
    },
    {
      title: "edX Mobile",
      blurb: "MOOC provider mobile apps. Led the mobile apps team and contributed to the edX learning platform, rewriting native apps for Android (Jetpack Compose) and iOS (SwiftUI), improving architecture and UX, integrating in-app purchases, and supporting the Open edX mobile community.",
      tags: ["Android", "Jetpack Compose", "iOS", "SwiftUI"],
      link: "https://play.google.com/store/apps/details?id=org.edx.mobile&hl=en",
      image: ""
    },
    {
      title: "Cheetay",
      blurb: "Delivery app for food, grocery, medicine, and dairy services. Collaborated with the Cheetay team at Arbisoft during a critical phase, contributing extra hours alongside the main edX project to meet strict deadlines.",
      tags: ["Android"],
      link: "https://www.apkshub.com/app/com.app.cheetay",
      image: ""
    },
    {
      title: "Gifdub",
      blurb: "Android app to record audio over GIFs and create shareable videos, built from scratch. Integrated Giphy API for GIFs and VidMe API for video uploading, Android SDK audio recording, social sharing, and push notifications.",
      tags: ["Android"],
      link: "https://apkpure.net/gifdub-voiceover-gifs/com.bitkitchen.gifdub",
      image: ""
    },
    {
      title: "PicPlayPost",
      blurb: "App for creating video collages from videos, photos, and GIFs, shareable on social networks. Used Android SDK and ffmpeg for media rendering, editing, and encoding; ensured backward compatibility with Android 4.1.x/4.2.x.",
      tags: ["Android", "ffmpeg"],
      link: "https://play.google.com/store/apps/details?id=com.flambestudios.picplaypost",
      image: ""
    },
    {
      title: "Smash Runner",
      blurb: "2D platform runner game with multiple levels, built in Unity3D and C#. Designed game architecture including level design and character running logic; integrated ads and in-app purchases.",
      tags: ["Unity3D", "C#"],
      link: "",
      image: ""
    },
    {
      title: "LISA Hockey",
      blurb: "App for players, coaches, and managers in Holland's hockey league. Server communication via XML including custom listings, webview, and validations; integrated Google Maps, push notifications, and Twitter.",
      tags: ["Android"],
      link: "https://play.google.com/store/apps/details?id=nl.lisaxhockey.general",
      image: ""
    },
    {
      title: "TimeTeens",
      blurb: "Trading Card Game (TCG) enabling users to build decks and complete missions. Handled server-client communication via JSON; developed animations and game screens with memory optimization.",
      tags: ["Game Dev"],
      link: "",
      image: ""
    }
    // ,{ title:"", blurb:"", tags:[], link:"", image:"" }   ← copy this line to add another
  ]
};
