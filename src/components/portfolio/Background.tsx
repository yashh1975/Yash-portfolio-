import { useEffect, useRef } from "react";

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let lastWidth = window.innerWidth;
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const count = isMobile ? 18 : 65;

    const pts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * (isMobile ? 0.0003 : 0.0006),
      vy: (Math.random() - 0.5) * (isMobile ? 0.0003 : 0.0006),
      r: Math.random() * 1.5 + 0.5,
    }));

    const resize = () => {
      // Ignore height-only resize triggers from mobile browser address bar collapse
      if (w > 0 && Math.abs(window.innerWidth - lastWidth) < 10) return;
      lastWidth = window.innerWidth;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]!;
        ctx.beginPath();
        ctx.arc(a.x * w, a.y * h, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(148,163,255,0.55)";
        ctx.fill();

        // Only draw distance connecting lines on desktop to maintain 60fps on mobile
        if (!isMobile) {
          for (let j = i + 1; j < pts.length; j++) {
            const b = pts[j]!;
            const dx = (a.x - b.x) * w;
            const dy = (a.y - b.y) * h;
            const d = Math.hypot(dx, dy);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(a.x * w, a.y * h);
              ctx.lineTo(b.x * w, b.y * h);
              ctx.strokeStyle = `rgba(129,140,248,${0.15 * (1 - d / 120)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="animate-blob absolute -left-40 -top-40 size-[28rem] rounded-full opacity-35 blur-[90px] sm:size-[38rem] sm:opacity-40 sm:blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 65%)" }}
      />
      <div
        className="animate-blob absolute -right-32 top-1/3 size-[26rem] rounded-full opacity-30 blur-[90px] sm:size-[34rem] sm:opacity-35 sm:blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 65%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 size-[24rem] rounded-full opacity-25 blur-[90px] sm:size-[30rem] sm:opacity-30 sm:blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--secondary-accent), transparent 65%)",
          animationDelay: "-14s",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-70" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%)",
        }}
      />
    </div>
  );
}
