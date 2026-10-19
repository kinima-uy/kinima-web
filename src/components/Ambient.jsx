import { useEffect, useRef } from "react";
import { useMotion, useLatest } from "../lib/motion.jsx";
import { Iso } from "../lib/brand.jsx";

const hexA = (h, a) => { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const FIELDS = {
  hero: [{ c: "#55BDB5", x: .82, y: .2, r: .32, a: .30, s: .22, ax: .06, ay: .08 }, { c: "#F2C96D", x: .62, y: .85, r: .26, a: .34, s: .28, ax: .08, ay: .05 }, { c: "#EF8B76", x: .08, y: .55, r: .18, a: .24, s: .34, ax: .05, ay: .1 }, { c: "#55BDB5", x: .5, y: .5, r: .12, a: .22, s: .5, ax: 0, ay: 0, follow: .85 }],
  apoya: [{ c: "#55BDB5", x: .1, y: .15, r: .4, a: .26, s: .2, ax: .1, ay: .1 }, { c: "#F2C96D", x: .9, y: .25, r: .32, a: .2, s: .27, ax: .08, ay: .1 }, { c: "#EF8B76", x: .6, y: 1, r: .38, a: .22, s: .22, ax: .12, ay: .05 }, { c: "#F2C96D", x: .5, y: .5, r: .12, a: .3, s: .5, ax: 0, ay: 0, follow: .9 }],
  footer: [{ c: "#55BDB5", x: .15, y: .2, r: .35, a: .2, s: .2, ax: .1, ay: .1 }, { c: "#F2C96D", x: .75, y: .9, r: .3, a: .16, s: .26, ax: .1, ay: .08 }, { c: "#EF8B76", x: .95, y: .2, r: .25, a: .18, s: .3, ax: .06, ay: .1 }],
};

/** Fondo de manchas de color que se mueven y una que sigue al mouse. */
export function BlobField({ preset }) {
  const ref = useRef(null);
  const { paused } = useMotion();
  const pausedRef = useLatest(paused);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1);
    const host = canvas.parentElement;
    const blobs = FIELDS[preset].map((b, i) => ({ ph: i * 1.7, ...b }));
    const ptr = { x: .5, y: .5, tx: .5, ty: .5, active: false };
    let W = 0, H = 0, vis = true, t = Math.random() * 20, prev = performance.now(), raf;
    const draw = () => {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      if (!ptr.active) { ptr.tx = .5 + Math.sin(t * .35) * .3; ptr.ty = .5 + Math.cos(t * .27) * .25; }
      ptr.x += (ptr.tx - ptr.x) * .06; ptr.y += (ptr.ty - ptr.y) * .06;
      const M = Math.max(W, H);
      for (const b of blobs) {
        let x = b.x + Math.sin(t * b.s + b.ph) * b.ax, y = b.y + Math.cos(t * b.s * .8 + b.ph) * b.ay;
        if (b.follow) { x = x * (1 - b.follow) + ptr.x * b.follow; y = y * (1 - b.follow) + ptr.y * b.follow; }
        const px = x * W, py = y * H, r = b.r * M * (1 + Math.sin(t * b.s * 1.4 + b.ph) * .1);
        const g = ctx.createRadialGradient(px, py, 0, px, py, r);
        g.addColorStop(0, hexA(b.c, b.a)); g.addColorStop(.55, hexA(b.c, b.a * .45)); g.addColorStop(1, hexA(b.c, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
      }
    };
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); ptr.tx = (e.clientX - r.left) / r.width; ptr.ty = (e.clientY - r.top) / r.height; ptr.active = true; };
    const onLeave = () => { ptr.active = false; };
    host.addEventListener("pointermove", onMove); host.addEventListener("pointerleave", onLeave);
    const size = () => { const r = host.getBoundingClientRect(); W = r.width; H = r.height; canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(); };
    const ro = new ResizeObserver(size); ro.observe(host);
    const io = new IntersectionObserver((es) => { vis = es[0].isIntersecting; }); io.observe(canvas);
    const loop = (now) => { const dt = Math.min(.05, (now - prev) / 1000); prev = now; if (vis && !pausedRef.current) { t += dt; draw(); } else if (vis && ptr.active) draw(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); };
  }, [preset, pausedRef]);
  return <canvas ref={ref} className="field" aria-hidden="true" />;
}

/** Línea suave que se dibuja a lo largo de la página al hacer scroll. */
export function Trail({ containerRef }) {
  const svgRef = useRef(null), pathRef = useRef(null), dotRef = useRef(null);
  useEffect(() => {
    const main = containerRef.current, svg = svgRef.current, live = pathRef.current, dot = dotRef.current;
    let len = 0, top = 0, H = 1, tm;
    const update = () => {
      const p = clamp((scrollY + innerHeight * .6 - top) / H, 0, 1);
      live.style.strokeDashoffset = len * (1 - p);
      const pt = live.getPointAtLength(len * p); dot.setAttribute("cx", pt.x); dot.setAttribute("cy", pt.y);
    };
    const build = () => {
      const W = main.clientWidth; H = main.offsetHeight; top = main.getBoundingClientRect().top + scrollY;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.style.height = H + "px";
      const seg = W < 700 ? 520 : 700, xs = [.94, .04, .96, .06, .95, .03, .96, .05, .94, .04];
      let px = W * .75, py = 0, i = 0, d = `M ${px} ${py}`;
      while (py < H) { const nx = W * xs[i % xs.length], ny = Math.min(H, py + seg); d += ` C ${px} ${py + seg * .55} ${nx} ${ny - seg * .55} ${nx} ${ny}`; px = nx; py = ny; i++; }
      live.setAttribute("d", d); len = live.getTotalLength(); live.style.strokeDasharray = len; update();
    };
    addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(() => { clearTimeout(tm); tm = setTimeout(build, 150); }); ro.observe(main);
    build();
    return () => { removeEventListener("scroll", update); ro.disconnect(); clearTimeout(tm); };
  }, [containerRef]);
  return (
    <svg id="trail" ref={svgRef} aria-hidden="true">
      <defs><linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1400" spreadMethod="reflect"><stop offset="0" stopColor="#55BDB5" /><stop offset=".5" stopColor="#F2C96D" /><stop offset="1" stopColor="#EF8B76" /></linearGradient></defs>
      <path ref={pathRef} fill="none" stroke="url(#tg)" strokeWidth="3" strokeLinecap="round" opacity=".28" />
      <circle ref={dotRef} r="6" fill="#55BDB5" opacity=".5" />
    </svg>
  );
}

/** Banda con las palabras del movimiento, lenta y constante. */
export function Marquee() {
  const trackRef = useRef(null);
  const { paused } = useMotion();
  const pausedRef = useLatest(paused);
  useEffect(() => {
    const el = trackRef.current; let x = 0, prev = performance.now(), raf;
    const loop = (now) => { const dt = Math.min(.05, (now - prev) / 1000); prev = now; if (!pausedRef.current) { const half = el.scrollWidth / 2; x -= 32 * dt; if (x <= -half) x += half; el.style.transform = `translateX(${x}px)`; } raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pausedRef]);
  const words = ["Abrirse", "Bajar", "Sostenerse", "Inclinarse", "Saltar", "Continuar"], cols = ["#55BDB5", "#F2C96D", "#EF8B76"];
  const unit = (k) => (
    <div className="mq-item" key={k}>
      {words.map((w, i) => (
        <span key={w} style={{ display: "contents" }}>
          <span className={i % 2 ? "o" : ""}>{w}</span>
          <Iso color={cols[i % 3]} width={46} />
        </span>
      ))}
    </div>
  );
  return <div className="marquee" aria-hidden="true"><div className="mq-track" ref={trackRef}>{unit("a")}{unit("b")}</div></div>;
}
