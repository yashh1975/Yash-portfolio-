import { motion } from "motion/react";
import {
  Award,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Medal,
  Quote,
  Rocket,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  ACHIEVEMENTS,
  CERTIFICATIONS,
  EXPERIENCE,
  PROJECTS,
  SITE,
  SKILL_GROUPS,
  STATS,
  type Category,
} from "./data";
import { Counter, Reveal, SectionHeading, TiltCard } from "./primitives";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Code2,
  Layers,
  Database,
  Cloud,
  Wrench,
  BrainCircuit,
  ShieldCheck,
  Medal,
  Award,
  GraduationCap,
  Rocket,
};

export function About() {
  return (
    <section id="about" className="section-pad px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="Who I Am" />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="glass-card p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-foreground/90">
              I am a Computer Science and Design undergraduate passionate about software
              engineering, artificial intelligence, cloud computing, cybersecurity, and modern web
              technologies.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I enjoy building impactful applications that combine clean architecture with intuitive
              user experiences.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              My goal is to become a software engineer capable of solving real-world problems using
              scalable technologies.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <TiltCard className="glass-card h-full p-6">
                  <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Tech Arsenal"
          sub="A toolkit spanning full-stack engineering, machine learning and cloud security."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, gi) => {
            const Icon = ICONS[group.icon] ?? Code2;
            return (
              <Reveal key={group.title} delay={gi * 0.06}>
                <TiltCard className="glass-card gradient-border h-full p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid size-10 place-items-center rounded-xl text-primary-foreground"
                      style={{ background: "var(--gradient-brand)" }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {group.skills.map((s) => (
                      <li key={s.name}>
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground/90">{s.name}</span>
                          <span className="text-muted-foreground">{s.level}%</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary/80">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: "var(--gradient-brand)",
                              width: `${s.level}%`,
                              transformOrigin: "left center",
                            }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const FILTERS: Category[] = ["All", "AI", "Cloud", "Web", "Security"];

export function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const list = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="section-pad px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Work"
          title="Selected Projects"
          sub="Products built end-to-end — from model training to deployed interface."
        />

        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-5 py-2 text-sm transition-all",
                filter === f
                  ? "text-primary-foreground shadow-[var(--shadow-float)]"
                  : "glass text-muted-foreground hover:text-foreground",
              )}
              style={filter === f ? { background: "var(--gradient-brand)" } : undefined}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <TiltCard className="glass-card group h-full overflow-hidden">
                <div
                  className="relative flex h-44 items-end overflow-hidden p-6"
                  style={{ background: "var(--gradient-surface)" }}
                >
                  <div
                    className="absolute -right-10 -top-12 size-44 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: "var(--gradient-brand)" }}
                  />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div className="relative">
                    <span className="glass rounded-full px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                      {p.category}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-semibold">{p.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  {p.metric ? (
                    <p className="text-sm font-semibold text-gradient">{p.metric}</p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      className="glass inline-flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm transition-colors hover:border-primary/50"
                    >
                      <Github className="size-4" /> Code
                    </a>
                    {p.demo ? (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                        style={{ background: "var(--gradient-brand)" }}
                      >
                        <ExternalLink className="size-4" /> Live Demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({
  title,
  meta,
  children,
  index,
}: {
  title: string;
  meta: string;
  children?: React.ReactNode;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.06} className="relative pl-10">
      <span
        className="absolute left-[11px] top-3 size-3 -translate-x-1/2 rounded-full ring-4 ring-background"
        style={{ background: "var(--gradient-brand)" }}
      />
      <div className="glass-card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{meta}</span>
        </div>
        {children}
      </div>
    </Reveal>
  );
}

export function Journey() {
  const [cert, setCert] = useState<(typeof CERTIFICATIONS)[number] | null>(null);
  const [failed, setFailed] = useState(false);

  return (
    <section id="journey" className="section-pad px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          title="Experience & Certifications"
          sub="Learning tracks, internships and credentials that shaped the way I build."
        />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Experience
            </h3>
            <div className="relative space-y-5 before:absolute before:left-[11px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-accent/40 before:to-transparent">
              {EXPERIENCE.map((e, i) => (
                <TimelineItem key={e.role} title={e.role} meta={e.period} index={i}>
                  <p className="mt-1 text-sm text-gradient">{e.org}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {"certFile" in e && e.certFile ? (
                    <button
                      type="button"
                      onClick={() => {
                        setFailed(false);
                        setCert({
                          title: `${e.role} — ${e.org}`,
                          org: e.org,
                          year: e.period,
                          file: e.certFile as string,
                          kind: (e.certKind as "image" | "pdf") ?? "pdf",
                        });
                      }}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-gradient"
                    >
                      View certificate <ExternalLink className="size-3.5 text-primary" />
                    </button>
                  ) : null}
                </TimelineItem>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Certifications
            </h3>
            <div className="relative space-y-5 before:absolute before:left-[11px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-accent/60 before:via-primary/40 before:to-transparent">
              {CERTIFICATIONS.map((c, i) => (
                <TimelineItem key={c.title} title={c.title} meta={c.year} index={i}>
                  <p className="mt-1 text-sm text-muted-foreground">{c.org}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setFailed(false);
                      setCert(c);
                    }}
                    className="mt-3 inline-flex items-center gap-2 text-sm text-gradient"
                  >
                    View certificate <ExternalLink className="size-3.5 text-primary" />
                  </button>
                </TimelineItem>
              ))}
            </div>
          </div>
        </div>
      </div>

      {cert ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.title} certificate`}
          onClick={() => setCert(null)}
          className="fixed inset-0 z-[90] grid place-items-center bg-background/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-3xl overflow-hidden p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {cert.org} · {cert.year}
                </p>
              </div>
              <button
                onClick={() => setCert(null)}
                className="glass rounded-full px-4 py-1.5 text-sm"
                aria-label="Close certificate preview"
              >
                Close
              </button>
            </div>
            <div className="mt-5 grid min-h-[16rem] place-items-center overflow-hidden rounded-2xl bg-secondary/40">
              {failed ? (
                <p className="p-8 text-center text-sm text-muted-foreground">
                  Certificate preview unavailable —{" "}
                  <a href={cert.file} target="_blank" rel="noreferrer" className="text-gradient">
                    open the file
                  </a>
                </p>
              ) : cert.kind === "pdf" ? (
                <iframe
                  src={cert.file}
                  title={`${cert.title} certificate issued by ${cert.org}`}
                  className="h-[70vh] w-full"
                />
              ) : (
                <img
                  src={cert.file}
                  alt={`${cert.title} certificate issued by ${cert.org}`}
                  onError={() => setFailed(true)}
                  className="max-h-[70vh] w-full object-contain"
                />
              )}
            </div>
            <a
              href={cert.file}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-gradient"
            >
              Open in new tab <ExternalLink className="size-3.5 text-primary" />
            </a>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}

type GhStats = { contributions: number; repos: number; levels: number[] };
type LcStats = { solved: number; easy: number; medium: number; hard: number };

const DEFAULT_GH: GhStats = {
  contributions: 69,
  repos: 14,
  levels: Array.from({ length: 7 * 26 }, (_, i) =>
    i % 7 === 0 ? 3 : i % 3 === 0 ? 1 : i % 5 === 0 ? 2 : i % 11 === 0 ? 4 : 0,
  ),
};

const DEFAULT_LC: LcStats = {
  solved: 154,
  easy: 72,
  medium: 68,
  hard: 14,
};

function useProfileStats() {
  const [gh, setGh] = useState<GhStats>(DEFAULT_GH);
  const [lc, setLc] = useState<LcStats>(DEFAULT_LC);

  useEffect(() => {
    let alive = true;
    (async () => {
      // 1. GitHub User API
      try {
        const uRes = await fetch(`https://api.github.com/users/${SITE.githubUser}`);
        if (uRes.ok) {
          const u = await uRes.json();
          if (alive && u?.public_repos) {
            setGh((prev) => ({ ...prev, repos: u.public_repos }));
          }
        }
      } catch {
        /* fallback to DEFAULT_GH */
      }

      // 2. GitHub Contributions API
      try {
        const cRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${SITE.githubUser}?y=last`,
        );
        if (cRes.ok) {
          const c = await cRes.json();
          const days: { level: number }[] = (c?.contributions ?? []).slice(-182);
          if (alive && days.length > 0) {
            setGh((prev) => ({
              ...prev,
              contributions: c?.total?.lastYear ?? prev.contributions,
              levels: days.map((d) => d.level ?? 0),
            }));
          }
        }
      } catch {
        /* fallback */
      }

      // 3. LeetCode Stats API
      try {
        const r = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${SITE.leetcodeUser}`,
        );
        if (r.ok) {
          const d = await r.json();
          if (alive && d?.status === "success" && typeof d?.totalSolved === "number") {
            setLc({
              solved: d.totalSolved,
              easy: d.easySolved ?? 0,
              medium: d.mediumSolved ?? 0,
              hard: d.hardSolved ?? 0,
            });
            return;
          }
        }
      } catch {
        /* fallback to DEFAULT_LC */
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { gh, lc };
}

function Heatmap({ levels }: { levels?: number[] }) {
  const cells = useMemo(
    () => levels ?? DEFAULT_GH.levels,
    [levels],
  );

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px] py-1">
      {cells.map((lvl, i) => {
        let opacityClass = "bg-secondary/40";
        if (lvl === 1) opacityClass = "bg-primary/30";
        if (lvl === 2) opacityClass = "bg-primary/60";
        if (lvl === 3) opacityClass = "bg-primary/85";
        if (lvl >= 4) opacityClass = "bg-primary shadow-[0_0_8px_var(--primary)]";

        return (
          <span
            key={i}
            className={cn("size-2.5 rounded-[2px] transition-colors duration-200", opacityClass)}
          />
        );
      })}
    </div>
  );
}

export function Profiles() {
  const { gh, lc } = useProfileStats();

  return (
    <section id="profiles" className="section-pad px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Coding Profiles"
          title="Where I Practice"
          sub="Consistency over intensity — daily problem solving and shipping in public."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <TiltCard className="glass-card h-full p-6">
              <div className="flex items-center gap-3">
                <Github className="size-5 text-primary" />
                <h3 className="font-display text-lg font-semibold">GitHub</h3>
              </div>
              <div className="mt-6 overflow-x-auto pb-2">
                <Heatmap levels={gh?.levels} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  <Counter to={gh?.contributions ?? 0} />
                </span>{" "}
                contributions in the last year ·{" "}
                <span className="font-semibold text-foreground">{gh?.repos ?? 0}</span> public repos
              </p>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-gradient"
              >
                View profile <ExternalLink className="size-3.5 text-primary" />
              </a>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.08}>
            <TiltCard className="glass-card h-full p-6">
              <div className="flex items-center gap-3">
                <Code2 className="size-5 text-primary" />
                <h3 className="font-display text-lg font-semibold">LeetCode</h3>
              </div>
              <dl className="mt-6 space-y-4">
                {[
                  ["Problems solved", lc?.solved ?? 0, ""],
                  ["Easy", lc?.easy ?? 0, ""],
                  ["Medium", lc?.medium ?? 0, ""],
                  ["Hard", lc?.hard ?? 0, ""],
                ].map(([label, value, suffix]) => (
                  <div key={label as string} className="flex items-center justify-between">
                    <dt className="text-sm text-muted-foreground">{label as string}</dt>
                    <dd className="font-display text-xl font-bold text-gradient">
                      <Counter to={value as number} suffix={suffix as string} />
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href={SITE.leetcode}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-gradient"
              >
                View profile <ExternalLink className="size-3.5 text-primary" />
              </a>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.16}>
            <TiltCard className="glass-card h-full p-6">
              <div className="flex items-center gap-3">
                <Linkedin className="size-5 text-primary" />
                <h3 className="font-display text-lg font-semibold">LinkedIn</h3>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Aspiring software developer exploring AI, Cloud and DevOps — sharing project
                builds, learnings and certifications. Based in {SITE.location}.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="font-display text-xl font-bold text-gradient">
                  <Counter to={SITE.linkedinConnections} suffix="+" />
                </p>
              </div>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                Open to connect &amp; collaborate
              </p>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-gradient"
              >
                Connect <ExternalLink className="size-3.5 text-primary" />
              </a>
            </TiltCard>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = ICONS[a.icon] ?? Award;
            return (
              <Reveal key={a.title} delay={i * 0.06}>
                <div className="glass-card flex h-full items-center gap-4 p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </span>
                  <p className="text-sm font-medium">{a.title}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <Quote className="size-5 text-primary" />
        <p className="font-display text-2xl font-semibold text-gradient sm:text-3xl">
          Code. Learn. Build. Repeat.
        </p>
        <div className="flex gap-3">
          {[
            { Icon: Github, href: SITE.github, label: "GitHub" },
            { Icon: Linkedin, href: SITE.linkedin, label: "LinkedIn" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="glass grid size-10 place-items-center rounded-xl text-muted-foreground transition-all hover:-translate-y-1 hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. Designed & built with care.
        </p>
      </div>
    </footer>
  );
}
