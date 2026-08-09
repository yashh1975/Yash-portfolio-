export const RESUMES = [
  {
    label: "AI / ML Resume",
    desc: "Machine learning, NLP and generative AI focus.",
    file: "/resumes/AI_YASH_RESUME.pdf",
    filename: "Yashwanth-Kumar-S-AI-Resume.pdf",
  },
  {
    label: "Cloud / DevOps Resume",
    desc: "Cloud engineering, CI/CD and secure infrastructure focus.",
    file: "/resumes/CLOUD_YASH_RESUME.pdf",
    filename: "Yashwanth-Kumar-S-Cloud-Resume.pdf",
  },
];

export const SITE = {
  name: "Yashwanth Kumar S",
  role: "Software Engineer | AI Enthusiast | Cloud Developer",
  email: "yashwanthkumarr2005@gmail.com",
  github: "https://github.com/yashh1975",
  githubUser: "yashh1975",
  linkedin: "https://www.linkedin.com/in/yashh2005/",
  leetcode: "https://leetcode.com/u/YASHWANTHKUMARS/",
  leetcodeUser: "YASHWANTHKUMARS",
  linkedinConnections: 500,
  location: "Bangalore, India",
};

export const ROLES = [
  "Java Developer",
  "Cloud Engineer",
  "AI Developer",
  "Machine Learning Enthusiast",
  "Cybersecurity Learner",
  "Prompt Engineer",
];

export const STATS = [
  { value: 3, suffix: "+", label: "Years Learning" },
  { value: 12, suffix: "", label: "Public Repositories" },
  { value: 10, suffix: "", label: "Certifications" },
  { value: 1000, suffix: "+", label: "Coding Problems Goal" },
];

export const SKILL_GROUPS = [
  {
    title: "Programming",
    icon: "Code2",
    skills: [
      { name: "Java", level: 90 },
      { name: "Python", level: 88 },
      { name: "SQL", level: 82 },
      { name: "JavaScript", level: 84 },
      { name: "HTML", level: 92 },
      { name: "CSS", level: 88 },
    ],
  },
  {
    title: "Frameworks",
    icon: "Layers",
    skills: [
      { name: "React", level: 85 },
      { name: "Streamlit", level: 88 },
      { name: "FastAPI", level: 78 },
    ],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 85 },
    ],
  },
  {
    title: "Cloud",
    icon: "Cloud",
    skills: [
      { name: "AWS", level: 82 },
      { name: "Google Cloud", level: 75 },
      { name: "DevOps (CI/CD)", level: 80 },
      { name: "Docker", level: 76 },
      { name: "Linux Server Ops", level: 78 },
    ],
  },
  {
    title: "Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 93 },
      { name: "Figma", level: 90 },
      { name: "Prompt Engineering", level: 86 },
    ],
  },
  {
    title: "AI / ML",
    icon: "BrainCircuit",
    skills: [
      { name: "Scikit-learn", level: 84 },
      { name: "TensorFlow", level: 74 },
      { name: "Machine Learning", level: 82 },
      { name: "NLP", level: 78 },
    ],
  },
  {
    title: "Cybersecurity",
    icon: "ShieldCheck",
    skills: [
      { name: "Networking", level: 76 },
      { name: "Linux", level: 80 },
      { name: "Security Fundamentals", level: 78 },
    ],
  },
];

export type Category = "All" | "AI" | "Cloud" | "Web" | "Security";

export const PROJECTS: {
  title: string;
  blurb: string;
  tags: string[];
  category: Exclude<Category, "All">;
  metric?: string;
  code: string;
  demo?: string;
}[] = [
  {
    title: "SMS Spam Detection",
    blurb:
      "Real-time spam classifier built with TF-IDF vectorisation and classical ML, wrapped in a Streamlit interface.",
    tags: ["Python", "Streamlit", "TF-IDF", "NLP", "ML"],
    category: "AI",
    metric: "97% accuracy",
    code: "https://github.com/yashh1975/SMS-Spam-detection",
    demo: "https://ai-sms-spam-detector.streamlit.app/",
  },
  {
    title: "Estate-IQ",
    blurb:
      "AI-powered real estate analytics platform surfacing price trends, locality scoring and investment signals.",
    tags: ["Python", "ML", "Analytics", "React"],
    category: "AI",
    metric: "Predictive pricing",
    code: "https://github.com/yashh1975/Estate-IQ",
    demo: "https://estate-iq.streamlit.app/",
  },
  {
    title: "SecureVault",
    blurb:
      "Secure cloud file storage with AES-256 client-side encryption, MongoDB Atlas metadata and AWS S3 objects.",
    tags: ["AES-256", "MongoDB Atlas", "AWS S3", "Node"],
    category: "Security",
    metric: "Zero-knowledge storage",
    code: "https://github.com/yashh1975/secure-vault",
    demo: "https://secure-vault-umber.vercel.app/",
  },
  {
    title: "AI Study Pal",
    blurb:
      "AI-powered study companion that summarises material, generates quizzes and answers subject questions on demand.",
    tags: ["Generative AI", "Python", "Streamlit", "LLM"],
    category: "AI",
    metric: "Personalised learning",
    code: "https://github.com/yashh1975/AI-Study-Pal",
  },
  {
    title: "Habit Tracker Android App",
    blurb:
      "Native Android application to create, track and visualise daily habits with streaks and reminders.",
    tags: ["Android", "Java", "Mobile", "SQLite"],
    category: "Cloud",
    metric: "Daily streak tracking",
    code: "https://github.com/yashh1975/habit-tracker-android-application-",
  },
  {
    title: "Anjaneya Gold Company",
    blurb:
      "Business website with a fully responsive frontend, modern UI system and fast static delivery.",
    tags: ["HTML", "CSS", "JavaScript", "UI"],
    category: "Web",
    metric: "100% responsive",
    code: "https://github.com/yashh1975/Anjaneya-gold-company",
    demo: "https://anjaneyagoldcompany.com",
  },
];

export const CERTIFICATIONS: {
  title: string;
  org: string;
  year: string;
  /** Certificate file URL (image or PDF). */
  file: string;
  kind: "image" | "pdf";
}[] = [
  {
    title: "Artificial Intelligence Fundamentals",
    org: "IBM SkillsBuild",
    year: "2025",
    file: "/certs/Artificial_Intelligence_Fundamentals.pdf",
    kind: "pdf",
  },
  {
    title: "Mobile Virtual Reality and Artificial Intelligence (Elite)",
    org: "NPTEL",
    year: "2025",
    file: "/certs/Mobile_Virtual_Reality_and_Artificial_Intelligence_Elite.pdf",
    kind: "pdf",
  },
  {
    title: "Introduction to Machine Learning",
    org: "Infosys Springboard",
    year: "2025",
    file: "/certs/Introduction_to_Machine_Learning.pdf",
    kind: "pdf",
  },
  {
    title: "Cyber Security Foundation",
    org: "Infosys Springboard",
    year: "2025",
    file: "/certs/Cyber_Security_Foundation.pdf",
    kind: "pdf",
  },
  {
    title: "AI Chatbots Development — Generative AI with ChatGPT",
    org: "Udemy",
    year: "2025",
    file: "/certs/CERTI_AI.pdf",
    kind: "pdf",
  },
  {
    title: "CCNA: Introduction to Networks",
    org: "Cisco Networking Academy",
    year: "2024",
    file: "/certs/CCNA_Introduction_to_Networks.pdf",
    kind: "pdf",
  },
  {
    title: "CCNA: Switching, Routing & Wireless Essentials",
    org: "Cisco Networking Academy",
    year: "2024",
    file: "/certs/CCNA_Switching_Routing_Wireless_Essentials.pdf",
    kind: "pdf",
  },
  {
    title: "CCNA: Enterprise Networking, Security & Automation",
    org: "Cisco Networking Academy",
    year: "2024",
    file: "/certs/CCNA_Enterprise_Networking_Security_Automation.pdf",
    kind: "pdf",
  },
  {
    title: "Securing CloudOps Deployments",
    org: "Infosys Springboard",
    year: "2025",
    file: "/certs/Securing_CloudOps_Deployments.pdf",
    kind: "pdf",
  },
  {
    title: "Technology Job Simulation",
    org: "Deloitte (Forage)",
    year: "2025",
    file: "/certs/CERTI_DELOITTE.pdf",
    kind: "pdf",
  },
];

export const EXPERIENCE = [
  {
    role: "End-to-End DevOps Intern",
    org: "SMAG-J Enterprises",
    period: "2025",
    certFile: "/certs/End-to-End_DevOps.png",
    certKind: "image" as const,
    points: [
      "Worked across the full DevOps lifecycle — version control, CI/CD pipelines and deployment.",
      "Automated build and release workflows for containerised applications.",
    ],
  },
  {
    role: "AI / ML Intern",
    org: "Launched Global",
    period: "2025",
    certFile: "/certs/AI_ML_Intern.pdf",
    certKind: "pdf" as const,
    points: [
      "Built and evaluated ML pipelines for text classification workloads.",
      "Shipped a Streamlit demo used for stakeholder review.",
    ],
  },
  {
    role: "B.E. Computer Science & Design",
    org: "Undergraduate Studies",
    period: "2023 — Present",
    points: [
      "Coursework across DSA, DBMS, OS, networks and human-centred design.",
      "Led multiple team projects from concept to deployed product.",
    ],
  },
];

export const ACHIEVEMENTS = [
  { title: "National Level Taekwondo Participant", icon: "Medal" },
  { title: "Multiple Technical Certifications", icon: "Award" },
  { title: "Strong Academic Performance", icon: "GraduationCap" },
  { title: "Active Project Builder", icon: "Rocket" },
];
