import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, background: "var(--gradient-brand)" }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFine(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!fine) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed z-[55] size-[420px] rounded-full opacity-40 blur-3xl transition-transform duration-300 ease-out"
        style={{
          left: pos.x - 210,
          top: pos.y - 210,
          background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 60%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[56] size-2 rounded-full"
        style={{ background: "var(--gradient-brand)" }}
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: "spring", stiffness: 900, damping: 40, mass: 0.2 }}
      />
    </>
  );
}

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ pointerEvents: done ? "none" : "auto" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative size-20">
          <span className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-primary/60" />
          <span
            className="absolute inset-3 rounded-full opacity-80 blur-md"
            style={{ background: "var(--gradient-brand)" }}
          />
          <span className="absolute inset-0 grid place-items-center font-display text-lg font-bold">
            Y
          </span>
        </div>
        <div className="h-px w-40 overflow-hidden bg-border">
          <motion.div
            className="h-full"
            style={{ background: "var(--gradient-brand)" }}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
