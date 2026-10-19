import { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { PersonParts, PERSON_VIEWBOX, personRefs, HIP, GROUND } from "../lib/brand.jsx";

const NS = "http://www.w3.org/2000/svg";
const SPARK = ["#F2C96D", "#EF8B76", "#55BDB5", "#7DCFA6"];
const STAR = "M0,-11 L3.2,-3.6 11,-3.4 4.9,1.6 7,9.2 0,4.8 -7,9.2 -4.9,1.6 -11,-3.4 -3.2,-3.6Z";
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* La personita dentro de la escena: 59 × 56 unidades, con los pies en y = 149. */
const KID_W = 59, KID_H = 56, KID_Y = 96, KID_CX = 29.4;

function hills(base, amp, k, ph) {
  let d = `M0 200 L0 ${base}`;
  for (let x = 0; x <= 640; x += 8) {
    const y = base - amp * (.6 * Math.sin(2 * Math.PI * x / 320 * k + ph) + .4 * Math.sin(2 * Math.PI * x / 320 * (k + 1) + ph * 1.7));
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d + " L640 200 Z";
}
const FAR = hills(132, 14, 2, .4), NEAR = hills(146, 9, 3, 1.2);

function Cloud({ x, y, s }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff">
      <ellipse cx="0" cy="0" rx="18" ry="8" /><ellipse cx="-8" cy="-5" rx="9" ry="8" /><ellipse cx="7" cy="-7" rx="11" ry="10" />
    </g>
  );
}

export function burst(parent, tl, at, x, y, n, dist, size) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + (i % 2) * .3, d = dist * (.7 + ((i * 37) % 10) / 30);
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x); c.setAttribute("cy", y); c.setAttribute("r", size * (.6 + (i % 3) * .25)); c.setAttribute("fill", SPARK[i % 4]); c.setAttribute("opacity", 0);
    parent.appendChild(c);
    tl.fromTo(c, { x: 0, y: 0, opacity: 1 }, { x: Math.cos(a) * d, y: Math.sin(a) * d, opacity: 0, duration: .8, ease: "power2.out", onComplete: () => c.remove() }, at);
  }
}

/**
 * Pantalla del juego en la tele.
 * mode "stars": la personita camina y salta para atrapar estrellas (5 = ¡Lo lograste!).
 * mode "march": marcha en el lugar mientras el paisaje avanza.
 */
export default function Game({ mode = "stars", label }) {
  const id = useId().replace(/:/g, "");
  const root = useRef(null);
  const march = mode === "march";

  useEffect(() => {
    const host = root.current, q = (s) => host.querySelector(s);
    const kidSvg = q(".kid-svg"), K = personRefs(kidSvg), star = q(".star"), starIn = q(".star-in"), sfx = q(".sfx");
    const stars = [...host.querySelectorAll(".g-stars i")], win = q(".g-win");
    const ctx = gsap.context(() => {
      gsap.set([K.legR, K.legL, K.torso], { svgOrigin: HIP });
      gsap.set(K.arms, { transformOrigin: "50% 50%" });
      gsap.to(q(".clouds"), { x: -320, duration: 70, ease: "none", repeat: -1 });
    }, host);
    let vis = false, master = null, alive = true;
    const io = new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (master) vis ? master.resume() : master.pause(); });
    io.observe(host);

    if (march) {
      ctx.add(() => {
        gsap.to(q(".near"), { x: -320, duration: 9, ease: "none", repeat: -1 });
        gsap.to(q(".far"), { x: -320, duration: 22, ease: "none", repeat: -1 });
        const tl = gsap.timeline({ repeat: -1 });
        [0, 1].forEach((k) => {
          const leg = k ? K.legL : K.legR, rot = k ? 26 : -26;
          tl.to(leg, { rotation: rot, duration: .2, ease: "power2.out" }).to(leg, { rotation: 0, duration: .2, ease: "power2.in" })
            .to(K.torso, { rotation: k ? 5 : -5, duration: .2, yoyo: true, repeat: 1 }, "<-.2").to(K.fig, { y: -10, duration: .2, yoyo: true, repeat: 1 }, "<");
        });
        master = tl;
      });
    } else {
      let count = 0;
      const xs = [160, 215, 110, 190, 135];
      const round = () => {
        if (!alive) return;
        ctx.add(() => {
          const sx = xs[count % xs.length], kidX = sx - KID_CX, curX = parseFloat(kidSvg.getAttribute("x"));
          const tl = gsap.timeline({ onComplete: round }); master = tl; if (!vis) tl.pause();
          tl.set(star, { attr: { transform: `translate(${sx} 80)` } })
            .fromTo(starIn, { scale: 0, rotation: -40, opacity: 1, transformOrigin: "50% 50%" }, { scale: 1, rotation: 0, duration: .5, ease: "back.out(2.5)" })
            .to(starIn, { y: -4, duration: .6, yoyo: true, repeat: 1, ease: "sine.inOut" }, "<.2");
          const dist = Math.abs(kidX - curX), walk = dist > 2 ? clamp(dist / 90, .5, 1.2) : 0;
          if (walk) {
            const steps = Math.max(2, Math.round(walk / .25));
            tl.to(kidSvg, { attr: { x: kidX }, duration: walk, ease: "sine.inOut" }, .3);
            for (let s = 0; s < steps; s++) tl.to(s % 2 ? K.legL : K.legR, { rotation: s % 2 ? 22 : -22, duration: walk / steps / 2, yoyo: true, repeat: 1 }, .3 + s * walk / steps);
          }
          const j = .45 + walk;
          tl.to(K.fig, { y: 24, duration: .18, ease: "power2.in" }, j).to(K.legR, { rotation: -20, duration: .18 }, j).to(K.legL, { rotation: 20, duration: .18 }, j)
            .to(K.fig, { y: -125, duration: .36, ease: "power2.out" }, j + .18).to(K.arms, { scaleX: 1.15, duration: .3 }, j + .18)
            .to(K.legR, { rotation: -34, duration: .3 }, j + .18).to(K.legL, { rotation: 34, duration: .3 }, j + .18)
            .to(K.shadow, { scale: .55, opacity: .05, transformOrigin: "50% 50%", duration: .36 }, j + .18)
            .to(starIn, { scale: 1.7, opacity: 0, duration: .3, ease: "power2.out" }, j + .5)
            .call(() => { count++; stars.forEach((s, n) => s.classList.toggle("on", n < ((count - 1) % 5) + 1)); }, null, j + .52);
          burst(sfx, tl, j + .5, sx, 80, 8, 24, 2.6);
          tl.to(K.fig, { y: 0, duration: .32, ease: "power2.in" }, j + .54).to([K.legR, K.legL], { rotation: 0, duration: .3 }, j + .56).to(K.arms, { scaleX: 1, duration: .3 }, j + .56)
            .to(K.shadow, { scale: 1, opacity: .12, duration: .32 }, j + .54)
            .to(K.fig, { scaleY: .9, scaleX: 1.06, svgOrigin: GROUND, duration: .08, yoyo: true, repeat: 1 }, j + .86);
          if (count % 5 === 4) {
            tl.to(win, { opacity: 1, duration: .3 }, j + 1).fromTo(win.firstElementChild, { scale: .6 }, { scale: 1, duration: .5, ease: "back.out(2.5)" }, j + 1);
            burst(sfx, tl, j + 1.05, 160, 95, 14, 70, 3.4);
            tl.to(win, { opacity: 0, duration: .3 }, j + 2.4).call(() => stars.forEach((s) => s.classList.remove("on")), null, j + 2.7).to({}, { duration: .3 });
          } else tl.to({}, { duration: .5 });
        });
      };
      round();
    }
    return () => { alive = false; io.disconnect(); ctx.revert(); };
  }, [march]);

  return (
    <div className="game" ref={root} role="img" aria-label={label}>
      <svg className="scene" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BFE8E2" /><stop offset=".75" stopColor="#EAF6F2" /><stop offset="1" stopColor="#F7F5EF" /></linearGradient>
        </defs>
        <rect width="320" height="200" fill={`url(#${id}sky)`} />
        <circle cx="272" cy="40" r="26" fill="#F2C96D" opacity=".25" /><circle cx="272" cy="40" r="17" fill="#F2C96D" />
        <g className="clouds" opacity=".95">
          {[0, 320].map((o) => <g key={o} transform={`translate(${o} 0)`}><Cloud x={40} y={34} s={1} /><Cloud x={150} y={22} s={.7} /><Cloud x={230} y={46} s={.9} /></g>)}
        </g>
        <g className="far"><path d={FAR} fill="#A9DCD5" /></g>
        <g className="near">
          <path d={NEAR} fill="#7FCBC2" />
          {march && <g fill="#F2C96D">{[30, 120, 200, 290, 350, 440, 520, 610].map((x) => <circle key={x} cx={x} cy="150" r="2.2" />)}</g>}
        </g>
        <rect y="150" width="320" height="50" fill="#F4ECD8" />
        <path d="M0 162 C80 156 240 168 320 160" stroke="#E7DCC0" strokeWidth="10" fill="none" strokeLinecap="round" />
        <g className="star" transform="translate(160 80)" opacity={march ? 0 : 1}>
          <g className="star-in"><circle r="16" fill="#F2C96D" opacity=".25" /><path d={STAR} fill="#F2C96D" stroke="#E0A92E" strokeWidth="1.2" strokeLinejoin="round" /></g>
        </g>
        <svg className="kid-svg" x={160 - KID_CX} y={KID_Y} width={KID_W} height={KID_H} viewBox={PERSON_VIEWBOX} overflow="visible">
          <PersonParts shadowOpacity={0.12} />
        </svg>
        <g className="sfx" />
      </svg>
      <div className="g-hud">
        <span className="g-pill"><span className="av">M</span>{march ? "Marcha en el bosque" : "Martina"}</span>
        {march
          ? <span className="g-pill st"><b>1:24</b></span>
          : <span className="g-pill st"><span className="g-stars">{[0, 1, 2, 3, 4].map((i) => <i key={i} />)}</span></span>}
      </div>
      <div className="g-bubble"><i /><span>{march ? "¡Levantá las rodillas!" : "¡Saltá para atrapar la estrella!"}</span></div>
      <div className="g-win"><span>¡Lo lograste!</span></div>
    </div>
  );
}
