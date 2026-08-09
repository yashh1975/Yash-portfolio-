import { AnimatePresence, motion } from "motion/react";
import { Bot, Download, PartyPopper, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, RESUMES, SITE, SKILL_GROUPS } from "./data";

function Shell({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-background/70 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card relative max-h-[85vh] w-full max-w-2xl overflow-y-auto p-7 sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Shell open={open} onClose={onClose} label="Resume preview">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Resume preview</p>
      <h3 className="mt-2 font-display text-3xl font-bold text-gradient">{SITE.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{SITE.role}</p>

      <div className="mt-7 space-y-6 text-sm">
        <div>
          <h4 className="font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">Summary</h4>
          <p className="mt-2 leading-relaxed text-foreground/90">
            CS & Design undergraduate building scalable applications, AI solutions and secure cloud
            systems.
          </p>
        </div>
        <div>
          <h4 className="font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">Core skills</h4>
          <p className="mt-2 leading-relaxed text-foreground/90">
            {SKILL_GROUPS.flatMap((g) => g.skills.map((s) => s.name)).join(" · ")}
          </p>
        </div>
        <div>
          <h4 className="font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">Projects</h4>
          <ul className="mt-2 space-y-1.5 text-foreground/90">
            {PROJECTS.map((p) => (
              <li key={p.title}>
                <span className="font-semibold">{p.title}</span> — {p.metric}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Download resume
        </h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {RESUMES.map((r) => (
            <a
              key={r.label}
              href={r.file}
              download={r.filename}
              className="group rounded-2xl border border-border/60 bg-secondary/40 p-4 transition-colors hover:border-primary/60"
            >
              <span className="flex items-center gap-2 font-display text-sm font-semibold">
                <Download className="size-4 text-primary" /> {r.label}
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
                {r.desc}
              </span>
            </a>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function HireMeEgg() {
  const [open, setOpen] = useState(false);
  const buffer = useRef("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1 && e.key !== " ") return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(-30);
      if (buffer.current.includes("sudo hire yashwanth")) {
        buffer.current = "";
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Shell open={open} onClose={() => setOpen(false)} label="Hire me">
      <PartyPopper className="size-7 text-primary" />
      <h3 className="mt-4 font-display text-3xl font-bold text-gradient">Access granted.</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        You typed the secret command. Permissions elevated — you may now hire Yashwanth Kumar S.
      </p>
      <pre className="mt-6 overflow-x-auto rounded-2xl bg-secondary p-5 text-xs text-foreground/90">
{`$ sudo hire yashwanth
[sudo] password: ********
✔ availability ......... immediate
✔ stack ................ Java · Python · React · AWS
✔ ships ................ fast, and tested
→ offer accepted 🎉`}
      </pre>
      <a
        href={`mailto:${SITE.email}?subject=Let's%20work%20together`}
        className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
        style={{ background: "var(--gradient-brand)" }}
      >
        <Sparkles className="size-4" /> Send the offer
      </a>
    </Shell>
  );
}

type Msg = { from: "bot" | "me"; text: string };

function answer(q: string): string {
  const s = q.toLowerCase();
  if (/project|built|build|work/.test(s))
    return `I've shipped ${PROJECTS.length} flagship projects: ${PROJECTS.map((p) => p.title).join(", ")}. Ask about any one of them!`;
  for (const p of PROJECTS) {
    if (s.includes(p.title.toLowerCase().split(" ")[0] ?? p.title)) return `${p.title}: ${p.blurb} (${p.metric})`;
  }
  if (/skill|tech|stack|language/.test(s))
    return `Core stack: ${SKILL_GROUPS.map((g) => `${g.title} (${g.skills.map((k) => k.name).join(", ")})`).join(" · ")}`;
  if (/cloud|aws|gcp/.test(s)) return "AWS and Google Cloud — S3, IAM, EC2, plus secure storage architecture in SecureVault.";
  if (/ai|ml|machine/.test(s)) return "Scikit-learn, TensorFlow, NLP and generative AI — see SMS Spam Detection (97% accuracy) and the Synthetic Data Platform.";
  if (/security|cyber/.test(s)) return "NPTEL Cybersecurity certified: networking, Linux and security fundamentals, applied in SecureVault's AES-256 encryption.";
  if (/hire|contact|email|resume/.test(s)) return `Reach me at ${SITE.email} — or use the contact form below. Psst: try typing "sudo hire yashwanth".`;
  if (/hi|hello|hey/.test(s)) return "Hey! Ask me about Yashwanth Kumar S’s skills, projects, certifications or availability.";
  return "I can talk about skills, projects, cloud, AI/ML, cybersecurity, certifications and how to get in touch.";
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm Yash's portfolio assistant. Ask me anything about his work." },
  ]);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMsgs((m) => [...m, { from: "me", text: q }]);
    setTimeout(() => setMsgs((m) => [...m, { from: "bot", text: answer(q) }]), 420);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open portfolio assistant"
        className="fixed bottom-6 right-6 z-[70] grid size-14 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:scale-110"
        style={{ background: "var(--gradient-brand)" }}
      >
        {open ? <X className="size-5" /> : <Bot className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card fixed bottom-24 right-6 z-[70] flex h-[26rem] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-4">
              <Bot className="size-4 text-primary" />
              <p className="font-display text-sm font-semibold">Portfolio Assistant</p>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "bot"
                      ? "bg-secondary text-foreground/90"
                      : "ml-auto text-primary-foreground"
                  }`}
                  style={m.from === "me" ? { background: "var(--gradient-brand)" } : undefined}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border/60 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills or projects…"
                aria-label="Message"
                className="flex-1 rounded-full border border-border/70 bg-background/40 px-4 py-2.5 text-sm outline-none focus:border-primary/60"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid size-10 shrink-0 place-items-center rounded-full text-primary-foreground"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
