import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import heroArt from "@/assets/hero-dev.png";
import { ROLES, SITE } from "./data";
import { Magnetic } from "./primitives";

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = ROLES[i % ROLES.length]!;
    const speed = del ? 40 : 85;
    const t = setTimeout(() => {
      if (!del) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) setTimeout(() => setDel(true), 1300);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="text-gradient font-display">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-pulse bg-primary align-middle" />
    </span>
  );
}

export function Hero({ onResume }: { onResume: () => void }) {
  const { scrollY } = useScroll();
  const artY = useTransform(scrollY, [0, 600], [0, 90]);
  const textY = useTransform(scrollY, [0, 600], [0, 40]);

  return (
    <section id="top" className="relative flex min-h-screen items-center px-4 pt-28 pb-20 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ y: textY }}>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="glass gradient-border inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="size-3.5 text-primary" />
            Open to SDE / AI internships & new-grad roles
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl font-bold leading-[1.02] sm:text-7xl"
          >
            <span className="block text-muted-foreground text-2xl font-medium sm:text-3xl">
              Hi, I&apos;m
            </span>
            <span className="text-gradient">{SITE.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="mt-4 font-display text-lg text-foreground/85 sm:text-xl"
          >
            {SITE.role}
          </motion.p>

          <p className="mt-3 min-h-[2.2rem] text-xl font-semibold sm:text-2xl">
            <Typewriter />
          </p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            I build scalable applications, intelligent AI solutions, and modern web experiences that
            solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={onResume}
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:scale-[1.03]"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary/50"
              >
                Contact Me
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.65, duration: 0.7 }}
            className="mt-8 flex items-center gap-3"
          >
            {[
              { Icon: Github, href: SITE.github, label: "GitHub" },
              { Icon: Linkedin, href: SITE.linkedin, label: "LinkedIn" },
              { Icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="glass grid size-11 place-items-center rounded-2xl text-muted-foreground transition-all hover:-translate-y-1 hover:text-foreground"
              >
                <Icon className="size-4.5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: artY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[30rem]"
        >
          <span className="animate-spin-slow absolute inset-4 rounded-full border border-dashed border-primary/30" />
          <span
            className="animate-spin-slow absolute inset-12 rounded-full border border-accent/25"
            style={{ animationDirection: "reverse", animationDuration: "26s" }}
          />
          <span
            className="absolute inset-16 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--gradient-brand)" }}
          />
          <img
            src={heroArt}
            alt="Futuristic illustration of a developer workspace with floating code panels and a network globe"
            width={1024}
            height={1024}
            className="animate-float relative size-full object-contain drop-shadow-[0_30px_60px_rgba(79,70,229,0.35)]"
          />
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-foreground sm:block"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}
