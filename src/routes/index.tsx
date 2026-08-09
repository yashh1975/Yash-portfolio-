import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Background } from "@/components/portfolio/Background";
import { Contact } from "@/components/portfolio/Contact";
import { CursorGlow, LoadingScreen, ScrollProgress } from "@/components/portfolio/Effects";
import { Hero } from "@/components/portfolio/Hero";
import { Nav } from "@/components/portfolio/Nav";
import { ChatBot, HireMeEgg, ResumeModal } from "@/components/portfolio/Overlays";
import { About, Footer, Journey, Profiles, Projects, Skills } from "@/components/portfolio/Sections";

const TITLE = "Yashwanth Kumar S — Software Engineer, AI & Cloud Developer";
const DESC =
  "Portfolio of Yashwanth Kumar S: software engineer building scalable applications, AI solutions and secure cloud systems with Java, Python, React and AWS.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [resume, setResume] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="relative"
    >
      <LoadingScreen />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Nav />

      <Hero onResume={() => setResume(true)} />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Profiles />
      <Contact />
      <Footer />

      <ResumeModal open={resume} onClose={() => setResume(false)} />
      <HireMeEgg />
      <ChatBot />
    </motion.main>
  );
}
