import { AnimatePresence, motion } from "motion/react";
import { Menu, Palette, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Journey", "journey"],
  ["Profiles", "profiles"],
  ["Contact", "contact"],
] as const;

const ACCENTS = [
  { name: "Indigo", primary: "oklch(0.53 0.23 274)", accent: "oklch(0.65 0.24 305)", cyan: "oklch(0.72 0.13 210)" },
  { name: "Cyan", primary: "oklch(0.68 0.14 205)", accent: "oklch(0.62 0.19 250)", cyan: "oklch(0.78 0.15 175)" },
  { name: "Violet", primary: "oklch(0.62 0.24 305)", accent: "oklch(0.68 0.2 340)", cyan: "oklch(0.7 0.16 280)" },
  { name: "Emerald", primary: "oklch(0.66 0.16 165)", accent: "oklch(0.72 0.15 195)", cyan: "oklch(0.78 0.14 150)" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const applyAccent = (a: (typeof ACCENTS)[number]) => {
    const s = document.documentElement.style;
    s.setProperty("--primary", a.primary);
    s.setProperty("--accent", a.accent);
    s.setProperty("--secondary-accent", a.cyan);
    setPalette(false);
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6",
          scrolled ? "glass shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)]" : "border border-transparent",
        )}
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          yash<span className="text-gradient">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <div className="relative">
            <button
              onClick={() => setPalette((p) => !p)}
              aria-label="Change accent color"
              className="grid size-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Palette className="size-4" />
            </button>
            <AnimatePresence>
              {palette && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="glass absolute right-0 mt-2 flex gap-2 rounded-2xl p-3"
                >
                  {ACCENTS.map((a) => (
                    <button
                      key={a.name}
                      title={a.name}
                      aria-label={`${a.name} accent`}
                      onClick={() => applyAccent(a)}
                      className="size-6 rounded-full ring-1 ring-border transition-transform hover:scale-110"
                      style={{ background: `linear-gradient(135deg, ${a.primary}, ${a.accent})` }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid size-9 place-items-center rounded-full border border-border/60 text-muted-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-2 grid max-w-6xl gap-1 rounded-3xl p-3 md:hidden"
          >
            {LINKS.map(([label, id]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
