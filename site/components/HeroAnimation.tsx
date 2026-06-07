"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "motion/react";

/* ─── typing commands that cycle in the terminal ─────────────────────── */
const COMMANDS = [
  {
    cmd: "ns get https://api.github.com/users/slhnx",
    status: "200 OK",
    ms: "42ms",
    color: "text-emerald-400",
    badge: "GET",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    cmd: 'ns post /v1/auth/login --data \'{"email":"dev@netshift.dev"}\'',
    status: "201 Created",
    ms: "128ms",
    color: "text-sky-400",
    badge: "POST",
    badgeColor: "bg-sky-500/10 border-sky-500/30 text-sky-400",
  },
  {
    cmd: "ns run get-octocat",
    status: "200 OK",
    ms: "18ms",
    color: "text-violet-400",
    badge: "RUN",
    badgeColor: "bg-violet-500/10 border-violet-500/30 text-violet-400",
  },
  {
    cmd: "ns delete /v1/users/42 --auth bearer",
    status: "204 No Content",
    ms: "84ms",
    color: "text-rose-400",
    badge: "DEL",
    badgeColor: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  },
];

/* ─── floating metric badges ─────────────────────────────────────────── */
const BADGES = [
  { label: "200 OK", sub: "42 ms", top: "14%", left: "-8%", delay: 0.6, color: "text-emerald-400", dot: "bg-emerald-500" },
  { label: "Local-first", sub: "no cloud", top: "72%", left: "-10%", delay: 0.9, color: "text-sky-400", dot: "bg-sky-500" },
  { label: "< 50 ms", sub: "avg latency", top: "20%", right: "-8%", delay: 1.1, color: "text-violet-400", dot: "bg-violet-500" },
  { label: "Config as Code", sub: ".json files", top: "68%", right: "-10%", delay: 0.75, color: "text-amber-400", dot: "bg-amber-500" },
];

/* ─── node positions on the orbit ring ──────────────────────────────── */
const ORBIT_NODES = [0, 72, 144, 216, 288]; // degrees

function useTypingEffect(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

function OrbitRing({ radius, speed, reverse = false }: { radius: number; speed: number; reverse?: boolean }) {
  const ref = useRef<SVGGElement>(null);
  const angle = useRef(0);

  useAnimationFrame((_, delta) => {
    angle.current += (delta / 1000) * speed * (reverse ? -1 : 1);
    if (ref.current) {
      ref.current.style.transform = `rotate(${angle.current}deg)`;
    }
  });

  return (
    <g ref={ref} style={{ transformOrigin: "center", transformBox: "fill-box" }}>
      {ORBIT_NODES.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={i === 0 ? 5 : 3}
              className={i === 0 ? "fill-primary" : "fill-muted-foreground/40"}
            />
            {i === 0 && (
              <circle
                cx={x}
                cy={y}
                r={10}
                className="fill-primary/10 stroke-primary/20"
                strokeWidth={1}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

export function HeroAnimation() {
  const [cmdIdx, setCmdIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "result" | "fade">("typing");
  const cmd = COMMANDS[cmdIdx];
  const { displayed, done } = useTypingEffect(cmd.cmd, 22);

  /* command lifecycle: type → show result → pause → fade → next */
  useEffect(() => {
    if (!done) return;
    const showResult = setTimeout(() => setPhase("result"), 300);
    const fadeOut = setTimeout(() => setPhase("fade"), 2600);
    const next = setTimeout(() => {
      setCmdIdx((i) => (i + 1) % COMMANDS.length);
      setPhase("typing");
    }, 3200);
    return () => {
      clearTimeout(showResult);
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [done]);

  return (
    <div className="relative mx-auto mt-16 max-w-[680px] select-none">
      {/* ── outer glow backdrop ──────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(56,189,248,0.10) 0%, rgba(139,92,246,0.06) 50%, transparent 100%)",
          filter: "blur(32px)",
        }}
      />

      {/* ── orbit SVG layer ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-visible">
        <svg
          width="700"
          height="420"
          viewBox="-350 -210 700 420"
          className="absolute opacity-20 dark:opacity-30"
          aria-hidden
        >
          {/* rings */}
          <ellipse cx={0} cy={0} rx={310} ry={100} className="fill-none stroke-border" strokeWidth={0.8} />
          <ellipse cx={0} cy={0} rx={220} ry={70} className="fill-none stroke-border" strokeWidth={0.6} />
          {/* animated nodes */}
          <g transform="translate(0, 0)">
            <OrbitRing radius={140} speed={18} />
            <OrbitRing radius={95} speed={26} reverse />
          </g>
          {/* center glow dot */}
          <circle cx={0} cy={0} r={6} className="fill-primary/60" />
          <circle cx={0} cy={0} r={14} className="fill-primary/10 stroke-primary/20" strokeWidth={1} />
        </svg>
      </div>

      {/* ── main terminal card ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl backdrop-blur-xl"
      >
        {/* scanline shimmer */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.015) 50%, transparent 100%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* top bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-background/50 px-3 py-1 font-mono text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            netshift — terminal
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={cmd.badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`rounded border px-2 py-0.5 font-mono text-[10px] font-medium ${cmd.badgeColor}`}
            >
              {cmd.badge}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* terminal body */}
        <div className="space-y-3 p-5 font-mono text-[13px]">
          {/* prompt line */}
          <div className="flex items-start gap-2">
            <span className="mt-px shrink-0 text-muted-foreground/60">❯</span>
            <motion.span
              key={cmdIdx}
              className="text-foreground break-all"
              animate={{ opacity: phase === "fade" ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              {displayed}
              {!done && (
                <motion.span
                  className="ml-0.5 inline-block h-[1em] w-[2px] bg-foreground align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
              )}
            </motion.span>
          </div>

          {/* response block */}
          <AnimatePresence>
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-xl border border-border/60 bg-background/40 p-4 space-y-2.5"
              >
                <div className="flex items-center gap-3">
                  <span className={`rounded border border-border px-1.5 py-0.5 text-[11px] ${cmd.color}`}>
                    {cmd.status}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{cmd.ms} · JSON · production</span>
                </div>
                <pre className="overflow-x-auto text-left text-[11.5px] leading-relaxed text-zinc-400 dark:text-zinc-400">
{`{
  "id": 1,
  "login": "octocat",
  "type": "User"
}`}
                </pre>
                <div className="flex items-center gap-1.5 border-t border-border/40 pt-2 text-[11px] text-muted-foreground">
                  <span className="text-emerald-400">✓</span>
                  <span>saved as</span>
                  <span className="text-sky-400">~/.netshift/requests/demo.json</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* bottom status bar */}
        <div className="flex items-center justify-between border-t border-border/40 bg-muted/20 px-5 py-2 font-mono text-[10.5px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              connected
            </span>
            <span>netshift v0.1.0</span>
          </div>
          <span>UTF-8 · JSON · local</span>
        </div>
      </motion.div>

      {/* ── floating badges ──────────────────────────────────── */}
      {BADGES.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: b.delay, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06, y: -2 }}
          style={{
            position: "absolute",
            top: b.top,
            left: (b as { left?: string }).left,
            right: (b as { right?: string }).right,
          }}
          className="hidden lg:flex items-center gap-2 rounded-xl border border-border/70 bg-card/90 px-3 py-2 shadow-lg backdrop-blur-sm"
        >
          <span className={`h-2 w-2 rounded-full ${b.dot} shrink-0`} />
          <div>
            <div className={`font-mono text-[11px] font-medium ${b.color}`}>{b.label}</div>
            <div className="font-mono text-[10px] text-muted-foreground">{b.sub}</div>
          </div>
        </motion.div>
      ))}

      {/* ── pulsing beam line under terminal ─────────────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -z-10 h-12 w-2/3 -translate-x-1/2 rounded-full bg-sky-500/20 blur-2xl"
        animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.9, 1.1, 0.9] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
    </div>
  );
}
