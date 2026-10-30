// All portfolio content lives here. Edit this file to change what the site shows.

import {
  siDocker,
  siFastapi,
  siGit,
  siJavascript,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSpringboot,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import {
  BadgeCheck,
  Brain,
  Coffee,
  Presentation,
  Trophy,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { features } from "process";

export const profile = {
  name: "Rineesha Saginala",
  role: "Associate Software Engineer",
  location: "Hyderabad, India",
  email: "rineeshasaginala03@gmail.com",
  // Resume PDF in /public
  resume: "/Rineesha%20Resume.pdf",
  socials: {
    github: "https://github.com/rineesha3",
    linkedin: "https://www.linkedin.com/in/rineesha-saginala/",
  },
  intro:
    "I'm a software engineer passionate about web development and AI systems. I enjoy solving challenging problems and building practical solutions, from designing backend APIs to deploying machine learning models in real-world applications.",
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  // Screenshot in /public
  image: string;
  tech: string[];
  // GitHub repo
  href: string;
  // Deployed app, if there is one
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "youtubexnotes",
    title: "YouTubeXnotes",
    summary:
      "Distraction-free YouTube learning workspace with split-screen Markdown notes, playlist import and progress tracking.",
    image: "/projects/youtubexnotes.png",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    href: "https://github.com/Rineesha3/YoutubeNotes",
    live: "https://youtubenotesx.onrender.com/",
  },
  {
    slug: "mindprint",
    title: "MindPrint",
    summary:
      "MBTI personality predictor that reads your writing with CatBoost models and sharpens the result through an adaptive quiz.",
    image: "/projects/mindprint.png",
    tech: ["Python", "CatBoost", "FastAPI", "React"],
    href: "https://github.com/Rineesha3/MindPrint",
    live: "https://mind-print-one.vercel.app/",
  },
  {
    slug: "air-quality-predictor",
    title: "Air Quality Predictor",
    summary:
      "Predicts the AQI for Indian cities on any date with an XGBoost model, plus health precautions and cleaner nearby cities.",
    image: "/projects/aqi.png",
    tech: ["Python", "XGBoost", "FastAPI", "ASP.NET MVC"],
    href: "https://github.com/Rineesha3/AQI_System",
    live: "https://aqi-web-bsr4.onrender.com/",
  },
  {
    slug: "stylesync",
    title: "StyleSync",
    summary:
      "Recommends clothing colours from skin tone and hairstyles from face shape using deep learning models.",
    image: "/projects/stylesync.png",
    tech: ["TensorFlow", "Flask", "Node.js", "MongoDB"],
    href: "https://github.com/Rineesha3/Color_and_Hairstyle_Recommendation_System",
  },
  {
    slug: "hospital-management",
    title: "Hospital Management System",
    summary:
      "Appointment booking platform with patient, doctor and admin dashboards, secured with role-based access.",
    image: "/projects/hospital.png",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    href: "https://github.com/Rineesha3/hospitalManagement",
  },
];

// Logos come from simple-icons — browse https://simpleicons.org and import more by name
export type Tool = {
  name: string;
  // A simple-icons logo, or a lucide icon + brand colour when no official logo exists
  icon: SimpleIcon | { Icon: LucideIcon; hex: string };
};

export const tools: Tool[] = [
  { name: "Python", icon: siPython },
  { name: "Java", icon: { Icon: Coffee, hex: "E76F00" } },
  { name: "JavaScript", icon: siJavascript },
  { name: "TypeScript", icon: siTypescript },
  { name: "FastAPI", icon: siFastapi },
  { name: "Machine Learning", icon: { Icon: Brain, hex: "8B5CF6" } },
  { name: "Spring Boot", icon: siSpringboot },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Postgres", icon: siPostgresql },
  { name: "MongoDB", icon: siMongodb },
  { name: "Docker", icon: siDocker },
  { name: "Git", icon: siGit },
];

export type Experience = {
  title: string;
  company: string;
  companyUrl?: string;
  // Logo image in /public
  logo?: string;
  period: string;
  tech: string[];
  points: string[];
};

export const experiences: Experience[] = [
  {
    title: "Associate Software Engineer",
    company: "Tektalis",
    companyUrl: "https://tektalis.com",
    logo: "/logos/tektalis.png",
    period: "June 2026 – Present",
    tech: ["Python", "FastAPI", "React", "Spring Boot", "MySQL", "CMMN"],
    points: [
      "Developed enterprise applications using Python, FastAPI, React, and TypeScript, contributing to backend services, frontend interfaces, RESTful APIs, and application integrations.",
      "Worked on PRO-Connect, a bilingual CRM and membership platform supporting member management, events, activities, administration, and mailing workflows.",
      "Implemented authentication, database models, business logic, and React features for PRO-Connect’s membership and administrative workflows.",
      "Designed and configured CMMN case models in CaseFabric for dynamic workflows, case plans, tasks, and process logic.",
      "Integrated CaseFabric case models with Spring Boot services and existing APIs, while performing integration testing, debugging, and issue resolution.",
    ],
  },
  {
    title: "Software Development Intern",
    company: "Tektalis",
    companyUrl: "https://tektalis.com",
    logo: "/logos/tektalis.png",
    period: "Dec 2025 – May 2026",
    tech: ["Java", "Spring Boot", "React", "Postgres", "Python", "FastAPI"],
    points: [
      "Developed EMS using Java, Spring Boot, React, and PostgreSQL, supporting enterprise employee management and administrative workflows.",
      "Built RESTful APIs for employee data management, authentication, and application workflows, integrating backend services with a responsive React frontend.",
      "Integrated an AI-powered chatbot using Python and FastAPI, enabling conversational interactions and automated assistance within the application.",
      "Contributed across the software development lifecycle, including database design, API integration, software testing, debugging, and deployment.",
    ],
  },
];

export type Education = {
  degree: string;
  school: string;
  period: string;
  // Optional line for GPA, honours, focus area, etc.
  detail?: string;
};

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science (AI & ML)",
    school: "Neil Gogte Institute of Technology, Hyderabad",
    period: "2022 – 2026",
    detail: "CGPA: 8.62",
  },
];

export type Achievement = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

export const achievements: Achievement[] = [
  {
    title: "1st Place",
    detail: "Malla Reddy University Hackathon — Intrusion Detection System",
    icon: Trophy,
  },
  {
    title: "Research Presenter",
    detail: "ICCCNet 2025 — AI-based recommendation system",
    icon: Presentation,
  },
  {
    title: "Event Coordinator",
    detail: "NGIT Hackathon — 200+ participants",
    icon: UsersRound,
  },
  {
    title: "Member",
    detail: "Computer Society of India (CSI)",
    icon: BadgeCheck,
  },
];
