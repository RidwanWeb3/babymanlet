import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Copy, Check, ArrowRight, Sparkles, Baby, Users, Rocket, Zap, LineChart, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const X_URL = "https://x.com/BabyManlet";

/* ---------- Background layers ---------- */

function BackgroundFX() {
  const mouse = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const on = (e: MouseEvent) => {
      mouse.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [mouse, mouseY]);

  const bubbles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* animated gradient blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #bfe0ff 0%, transparent 60%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #dcd1ff 0%, transparent 60%)" }}
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #cfeeff 0%, transparent 60%)" }}
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floating bubbles */}
      {bubbles.map((_, i) => {
        const size = 6 + ((i * 13) % 22);
        const left = (i * 53) % 100;
        const delay = (i % 7) * 0.7;
        const dur = 12 + (i % 6) * 2;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: -20,
              boxShadow: "0 0 20px rgba(190,220,255,0.7)",
            }}
            animate={{ y: [0, -900], opacity: [0, 0.9, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        );
      })}

      {/* sparkle stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.span
          key={`s${i}`}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 73) % 100}%`,
            boxShadow: "0 0 8px rgba(255,255,255,0.9)",
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: (i % 5) * 0.4 }}
        />
      ))}

      {/* mouse light */}
      <MouseLight />
    </div>
  );
}

function MouseLight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const on = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, [x, y]);
  return (
    <motion.div
      className="absolute h-[420px] w-[420px] rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(180,220,255,0.35) 0%, rgba(180,220,255,0) 60%)",
        filter: "blur(20px)",
      }}
    />
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(1100px,92vw)]"
    >
      <div className="glass flex items-center justify-between rounded-full px-3 py-2 sm:px-4">
        <a href="#top" className="flex items-center gap-2">
          <img src="/assets/logo.jpeg" alt="Baby Manlet" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/70" />
          <span className="font-display text-base font-bold tracking-tight sm:text-lg">Baby Manlet</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/70 md:flex">
          <a href="#about" className="hover:text-foreground">About</a>
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#token" className="hover:text-foreground">Token</a>
          <a href="#roadmap" className="hover:text-foreground">Roadmap</a>
        </nav>
        <a
          href={X_URL}
          target="_blank"
          rel="noreferrer"
          className="group relative overflow-hidden rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background sm:text-sm"
        >
          <span className="relative z-10">Follow on X</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </a>
      </div>
    </motion.header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = e.clientX - r.left - r.width / 2;
    const cy = e.clientY - r.top - r.height / 2;
    setTilt({ x: cx / 30, y: cy / 30 });
  };

  return (
    <section id="top" className="relative flex min-h-screen items-center pt-28 pb-16">
      <div className="mx-auto grid w-[min(1200px,92vw)] items-center gap-10 md:grid-cols-2 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground/70">
            <Sparkles className="h-3.5 w-3.5" /> A new legend is born
          </div>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight">
            <span className="text-shine animate-shine">BABY</span>
            <br />
            <span className="text-shine animate-shine">MANLET</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-foreground/70">
            <span className="font-semibold text-foreground">Baby Manlet is born.</span> Smaller.
            Stronger. Ready to conquer crypto — the next generation begins.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="#token">Buy Now <ArrowRight className="h-4 w-4" /></PrimaryButton>
            <GhostButton href={X_URL} external>Join Community</GhostButton>
            <GhostButton href="#token">View Chart <LineChart className="h-4 w-4" /></GhostButton>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-foreground/60">
            <div><div className="font-display text-2xl font-bold text-foreground">$BABYMANLET</div>Ticker</div>
            <div className="h-8 w-px bg-foreground/10" />
            <div><div className="font-display text-2xl font-bold text-foreground">TBA</div>Chain</div>
            <div className="h-8 w-px bg-foreground/10" />
            <div><div className="font-display text-2xl font-bold text-foreground">∞</div>Potential</div>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 -z-10 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, #bfe0ff 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ rotateY: tilt.x, rotateX: -tilt.y, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div className="glow-baby rounded-[3rem] p-2 glass-strong">
              <img
                src="/assets/logo.jpeg"
                alt="Baby Manlet 3D mascot"
                className="h-[min(70vh,560px)] w-auto rounded-[2.5rem] object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            {/* floating orbs */}
            <motion.div
              className="absolute -left-6 top-10 h-14 w-14 rounded-full glass"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -right-4 bottom-16 h-10 w-10 rounded-full glass"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}

function PrimaryButton({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </a>
  );
}
function GhostButton({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground/80 transition hover:-translate-y-0.5 hover:text-foreground"
    >
      {children}
    </a>
  );
}

/* ---------- Section title ---------- */
function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="glass mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground/70">
        <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
      </div>
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-foreground/60">{sub}</p>}
    </motion.div>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <SectionTitle eyebrow="About" title="A new legend is born." />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong mt-12 rounded-[2.5rem] p-8 sm:p-14"
        >
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div className="space-y-5 text-lg leading-relaxed text-foreground/75">
              <p>From the success of <span className="font-semibold text-foreground">Manlet</span>, a new legend is born.</p>
              <p>👶🔥 <span className="font-semibold text-foreground">Baby Manlet</span> has arrived — smaller, stronger, and ready to conquer the crypto world.</p>
              <p>The legacy continues. The next generation begins.</p>
              <p className="font-display text-2xl font-bold text-foreground">🚀 BABY MANLET IS BORN.</p>
            </div>
            <motion.img
              src="/assets/logo.jpeg"
              alt="Baby Manlet"
              className="mx-auto h-56 w-56 rounded-3xl object-cover glow-baby"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
const FEATURES = [
  { icon: Baby, title: "Smaller. But Stronger.", desc: "Compact, mighty, and built to punch far above its weight class." },
  { icon: Users, title: "Community Driven.", desc: "Powered by believers. Every holder is part of the family." },
  { icon: Sparkles, title: "Born From A Legend.", desc: "The DNA of Manlet — refined, refreshed, and reborn." },
  { icon: Rocket, title: "Next Generation Meme.", desc: "Cinematic branding, premium vibes, unstoppable memetics." },
];

function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <SectionTitle eyebrow="Features" title="Small package. Massive potential." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden rounded-3xl p-7"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ background: "radial-gradient(circle, #bfe0ff, transparent 70%)" }} />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="glass mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
              >
                <f.icon className="h-5 w-5 text-foreground/80" />
              </motion.div>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why timeline ---------- */
function WhyTimeline() {
  const steps = [
    { title: "Legacy", desc: "The story of Manlet echoes forward." },
    { title: "Birth", desc: "Baby Manlet is born — smaller and stronger." },
    { title: "Community", desc: "The family grows. Believers unite." },
    { title: "Moon", desc: "Next generation. Unlimited potential." },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-28">
      <div className="mx-auto w-[min(900px,92vw)]">
        <SectionTitle eyebrow="Why Baby Manlet" title="From legacy to moon." />
        <div ref={ref} className="relative mt-16 pl-8">
          <div className="absolute left-3 top-0 h-full w-px bg-foreground/10" />
          <motion.div
            style={{ height: h }}
            className="absolute left-3 top-0 w-px bg-gradient-to-b from-[#7fb8e6] to-[#c6e4ff]"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="glow-baby absolute -left-[22px] top-2 h-4 w-4 rounded-full bg-white ring-4 ring-[#dceeff]" />
              <div className="glass rounded-2xl p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-foreground/50">Step 0{i + 1}</div>
                <h3 className="mt-1 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-1 text-foreground/60">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Token ---------- */
function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="glass flex items-center justify-between gap-3 rounded-2xl p-4">
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-foreground/50">{label}</div>
        <div className="mt-0.5 truncate font-display text-lg font-semibold">{value}</div>
      </div>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
        aria-label={`Copy ${label}`}
        className="shrink-0 rounded-xl bg-white/70 p-2.5 text-foreground/70 transition hover:bg-white hover:text-foreground"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function Token() {
  const rows = [
    { label: "Name", value: "BABY MANLET" },
    { label: "Ticker", value: "$BABYMANLET" },
    { label: "Chain", value: "TBA" },
    { label: "Contract", value: "Coming Soon" },
    { label: "Taxes", value: "TBA" },
    { label: "Liquidity", value: "TBA" },
    { label: "Ownership", value: "TBA" },
  ];
  return (
    <section id="token" className="relative py-28">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <SectionTitle eyebrow="Token" title="The tokenomics." sub="Transparent. Fair. Coming soon." />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong mt-12 grid gap-6 rounded-[2.5rem] p-8 sm:p-12 md:grid-cols-[240px_1fr]"
        >
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <motion.img
              src="/assets/logo.jpeg"
              alt="Baby Manlet"
              className="h-40 w-40 rounded-3xl object-cover glow-baby"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              loading="lazy"
            />
            <div className="font-display text-2xl font-bold">$BABYMANLET</div>
            <div className="text-sm text-foreground/60">The next generation begins.</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map((r) => <CopyRow key={r.label} {...r} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Roadmap ---------- */
function Roadmap() {
  const phases = [
    { phase: "Phase 1", icon: Baby, items: ["Birth", "Community", "Launch"] },
    { phase: "Phase 2", icon: Zap, items: ["Listings", "Marketing", "Partnerships"] },
    { phase: "Phase 3", icon: Rocket, items: ["Expansion", "Ecosystem", "Moon"] },
  ];
  return (
    <section id="roadmap" className="relative py-28">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <SectionTitle eyebrow="Roadmap" title="The path to the moon." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass relative overflow-hidden rounded-3xl p-8"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, #bfe0ff, transparent 70%)" }} />
              <div className="flex items-center gap-3">
                <div className="glass inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-xl font-bold">{p.phase}</div>
              </div>
              <ul className="mt-6 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-foreground/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7fb8e6] shadow-[0_0_10px_#7fb8e6]" />
                    <span className="font-medium">{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Community CTA ---------- */
function Community() {
  return (
    <section className="relative py-28">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="glass-strong relative overflow-hidden rounded-[2.5rem] p-10 text-center sm:p-16"
        >
          <motion.div
            className="absolute inset-0 -z-10 opacity-70"
            style={{ background: "radial-gradient(circle at 50% 50%, #cfeeff 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.img
            src="/assets/logo.jpeg"
            alt="Baby Manlet"
            className="mx-auto h-40 w-40 rounded-3xl object-cover glow-baby"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            loading="lazy"
          />
          <h2 className="mt-8 font-display text-4xl font-bold sm:text-6xl">Join Baby Manlet</h2>
          <p className="mx-auto mt-4 max-w-xl text-foreground/60">
            Follow us on X and be part of the next generation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton href={X_URL} external>Follow us on X <ArrowRight className="h-4 w-4" /></PrimaryButton>
            <GhostButton href="#token">See the Token</GhostButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative pb-10 pt-6">
      <div className="mx-auto flex w-[min(1200px,92vw)] flex-col items-center justify-between gap-4 text-sm text-foreground/60 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.jpeg" alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-white/70" />
          <span className="font-display font-semibold text-foreground">Baby Manlet</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={X_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">X (Twitter)</a>
        </div>
        <div>© {new Date().getFullYear()} Baby Manlet · Made with ❤️</div>
      </div>
    </footer>
  );
}

/* ---------- Root ---------- */
function Landing() {
  return (
    <main className="relative overflow-x-hidden">
      <BackgroundFX />
      <Nav />
      <Hero />
      <About />
      <Features />
      <WhyTimeline />
      <Token />
      <Roadmap />
      <Community />
      <Footer />
    </main>
  );
}
