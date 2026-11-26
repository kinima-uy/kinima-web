import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Logo, Iso, COLORS, PersonParts, PERSON_VIEWBOX, personRefs, HIP, GROUND } from "../lib/brand.jsx";
import { Icon } from "../lib/icon.jsx";
import { burst } from "../components/Game.jsx";

/*
 * Mini Kinima: una versión jugable y básica de lo que pasa en casa.
 * 1) Elegís un nivel (lo elige el profesional en la vida real).
 * 2) Jugás con las flechas: moverse para alinearte con la estrella, saltar para atraparla.
 * 3) Al terminar, ves el resultado como se vería en la app de familias —
 *    la sesión en casa, registrada y lista para que el profesional la revise.
 */

const NIVELES = [
  { id: "facil", label: "Fácil", desc: "Pasos grandes, salto generoso.", target: 3, radius: 34, c: COLORS.teal, bg: "var(--tint-teal)", tc: "#23716C" },
  { id: "medio", label: "Medio", desc: "Hay que apuntar un poco mejor.", target: 5, radius: 23, c: COLORS.yellow, bg: "var(--tint-yellow)", tc: "#7A5A12" },
  { id: "dificil", label: "Difícil", desc: "El salto tiene que ser preciso.", target: 7, radius: 15, c: COLORS.coral, bg: "var(--tint-coral)", tc: "#B04A33" },
];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const X_MIN = 85, X_MAX = 255, KID_CX = 29.4, KID_W = 59, KID_H = 56, KID_Y = 96;
const STAR_PATH = "M0,-11 L3.2,-3.6 11,-3.4 4.9,1.6 7,9.2 0,4.8 -7,9.2 -4.9,1.6 -11,-3.4 -3.2,-3.6Z";
const STEP = 30;
const randX = (avoid) => { let x; do { x = X_MIN + Math.random() * (X_MAX - X_MIN); } while (Math.abs(x - avoid) < 45); return x; };

function hills(base, amp, k, ph) {
  let d = `M0 200 L0 ${base}`;
  for (let x = 0; x <= 320; x += 8) {
    const y = base - amp * (.6 * Math.sin(2 * Math.PI * x / 320 * k + ph) + .4 * Math.sin(2 * Math.PI * x / 320 * (k + 1) + ph * 1.7));
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d + " L320 200 Z";
}
const FAR = hills(132, 14, 2, .4), NEAR = hills(146, 9, 3, 1.2);

function Cloud({ x, y, s }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff">
      <ellipse cx="0" cy="0" rx="18" ry="8" /><ellipse cx="-8" cy="-5" rx="9" ry="8" /><ellipse cx="7" cy="-7" rx="11" ry="10" />
    </g>
  );
}

/** Un paso de caminata hacia targetX (en px de la escena). */
function walkTo(kidSvgEl, K, targetX) {
  const curX = parseFloat(kidSvgEl.getAttribute("x"));
  const dist = Math.abs(targetX - curX);
  const tl = gsap.timeline();
  if (dist < 1) return tl;
  const dur = clamp(dist / 85, .16, .5);
  tl.to(kidSvgEl, { attr: { x: targetX }, duration: dur, ease: "sine.inOut" }, 0)
    .to(K.legR, { rotation: -22, duration: dur / 2, yoyo: true, repeat: 1 }, 0)
    .to(K.legL, { rotation: 22, duration: dur / 2, yoyo: true, repeat: 1 }, dur / 2 > .1 ? dur / 4 : 0)
    .to(K.torso, { rotation: -3, duration: dur / 2, yoyo: true, repeat: 1 }, 0);
  return tl;
}

/** El salto: misma forma que la escena decorativa, pero disparado por la persona que juega. */
function jump(K, onPeak) {
  const tl = gsap.timeline();
  tl.to(K.fig, { y: 24, duration: .16, ease: "power2.in" }, 0)
    .to(K.legR, { rotation: -20, duration: .16 }, 0)
    .to(K.legL, { rotation: 20, duration: .16 }, 0)
    .to(K.fig, { y: -120, duration: .32, ease: "power2.out" }, .16)
    .to(K.arms, { scaleX: 1.15, duration: .26 }, .16)
    .to(K.legR, { rotation: -34, duration: .26 }, .16)
    .to(K.legL, { rotation: 34, duration: .26 }, .16)
    .to(K.shadow, { scale: .55, opacity: .05, transformOrigin: "50% 50%", duration: .32 }, .16)
    .call(() => onPeak && onPeak(), null, .46)
    .to(K.fig, { y: 0, duration: .3, ease: "power2.in" }, .5)
    .to([K.legR, K.legL], { rotation: 0, duration: .28 }, .52)
    .to(K.arms, { scaleX: 1, duration: .28 }, .52)
    .to(K.shadow, { scale: 1, opacity: .12, duration: .3 }, .5);
  return tl;
}

function MiniJuego({ nivel, onTerminado }) {
  const root = useRef(null);
  const kidSvgRef = useRef(null);
  const starRef = useRef(null);
  const Kref = useRef(null);
  const jumpingRef = useRef(false);
  const kidXRef = useRef(160 - KID_CX);
  const starXRef = useRef(160);
  const [catches, setCatches] = useState(0);
  const [starX, setStarX] = useState(160);
  const [toast, setToast] = useState(null);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 700);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => { starXRef.current = starX; }, [starX]);

  useEffect(() => {
    const host = root.current, kidSvg = kidSvgRef.current;
    const K = personRefs(kidSvg);
    Kref.current = K;
    gsap.set([K.legR, K.legL, K.torso], { svgOrigin: HIP });
    gsap.set(K.arms, { transformOrigin: "50% 50%" });
    const cloudsTl = gsap.to(host.querySelector(".mj-clouds"), { x: -320, duration: 60, ease: "none", repeat: -1 });

    const onKey = (e) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "Spacebar"].includes(e.key)) e.preventDefault();
      if (jumpingRef.current) return;
      if (e.key === "ArrowLeft") {
        kidXRef.current = clamp(kidXRef.current - STEP, X_MIN - KID_CX, X_MAX - KID_CX);
        walkTo(kidSvg, K, kidXRef.current);
      } else if (e.key === "ArrowRight") {
        kidXRef.current = clamp(kidXRef.current + STEP, X_MIN - KID_CX, X_MAX - KID_CX);
        walkTo(kidSvg, K, kidXRef.current);
      } else if (e.key === "ArrowUp" || e.key === " " || e.key === "Spacebar") {
        if (!e.repeat) {
          jumpingRef.current = true;
          jump(K, () => {
            const kidCenter = kidXRef.current + KID_CX;
            if (Math.abs(kidCenter - starXRef.current) <= nivel.radius) {
              const btl = gsap.timeline();
              burst(host.querySelector(".mj-sfx"), btl, 0, starXRef.current, 80, 9, 26, 2.6);
              setToast("si");
              setCatches((n) => {
                const next = n + 1;
                if (next >= nivel.target) {
                  setTimeout(() => onTerminado(Math.round((Date.now() - startedAt.current) / 1000)), 650);
                } else {
                  const nx = randX(starXRef.current);
                  setStarX(nx);
                }
                return next;
              });
            } else {
              setToast("no");
            }
          }).eventCallback("onComplete", () => { jumpingRef.current = false; });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); cloudsTl.kill(); };
  }, [nivel, onTerminado]);

  return (
    <div className="mj-juego" ref={root}>
      <svg className="mj-scene" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="mjsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BFE8E2" /><stop offset=".75" stopColor="#EAF6F2" /><stop offset="1" stopColor="#F7F5EF" /></linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#mjsky)" />
        <circle cx="272" cy="40" r="26" fill="#F2C96D" opacity=".25" /><circle cx="272" cy="40" r="17" fill="#F2C96D" />
        <g className="mj-clouds" opacity=".95">
          {[0, 320].map((o) => <g key={o} transform={`translate(${o} 0)`}><Cloud x={40} y={34} s={1} /><Cloud x={150} y={22} s={.7} /><Cloud x={230} y={46} s={.9} /></g>)}
        </g>
        <path d={FAR} fill="#A9DCD5" /><path d={NEAR} fill="#7FCBC2" />
        <rect y="150" width="320" height="50" fill="#F4ECD8" />
        <path d="M0 162 C80 156 240 168 320 160" stroke="#E7DCC0" strokeWidth="10" fill="none" strokeLinecap="round" />
        <g ref={starRef} transform={`translate(${starX} 80)`}>
          <circle r={nivel.radius} fill={nivel.c} opacity=".12" />
          <circle r="16" fill="#F2C96D" opacity=".3" /><path d={STAR_PATH} fill="#F2C96D" stroke="#E0A92E" strokeWidth="1.2" strokeLinejoin="round" />
        </g>
        <svg className="kid-svg" ref={kidSvgRef} x={160 - KID_CX} y={KID_Y} width={KID_W} height={KID_H} viewBox={PERSON_VIEWBOX} overflow="visible">
          <PersonParts shadowOpacity={0.12} />
        </svg>
        <g className="mj-sfx" />
      </svg>
      <div className="mj-hud">
        <span className="mj-pill" style={{ "--c": nivel.c, "--bg": nivel.bg, "--tc": nivel.tc }}>{nivel.label}</span>
        <span className="mj-pill mj-count">
          {Array.from({ length: nivel.target }).map((_, i) => <span key={i} className={`mj-star-dot ${i < catches ? "on" : ""}`}>★</span>)}
        </span>
      </div>
      {toast && <div className={`mj-toast ${toast}`}>{toast === "si" ? "★" : "✕"}</div>}
      <div className="mj-keys">
        <span className="mj-key">←</span><span className="mj-key">→</span><span className="mj-key mj-key-wide">↑</span>
      </div>
    </div>
  );
}

function ElegirNivel({ onElegir }) {
  return (
    <div className="mj-niveles">
      {NIVELES.map((n, i) => (
        <button key={n.id} className="mj-nivel" style={{ "--c": n.c, "--bg": n.bg, "--tc": n.tc }} onClick={() => onElegir(n)}>
          <span className="mj-nivel-ico"><Icon name="rutina" size={28} color={n.tc} /></span>
          <strong>{n.label}</strong>
          <span className="mj-nivel-dots">{[0, 1, 2].map((d) => <i key={d} className={d <= i ? "on" : ""} />)}</span>
          <span className="mj-nivel-stars">{Array.from({ length: n.target }).map((_, s) => <span key={s}>★</span>)}</span>
        </button>
      ))}
    </div>
  );
}

function Resultado({ nivel, segundos, onJugarDeNuevo, onOtroNivel }) {
  const mm = String(Math.floor(segundos / 60)).padStart(2, "0"), ss = String(segundos % 60).padStart(2, "0");
  return (
    <div className="mj-resultado">
      <div className="mj-puente">
        <div className="mj-puente-ico mj-puente-casa"><Icon name="casa" size={26} color={COLORS.yellow} /><span>Vos, en casa</span></div>
        <span className="mj-puente-flecha"><Icon name="flecha" size={20} color="var(--muted)" /></span>
        <div className="mj-puente-ico mj-puente-prof"><Icon name="centro" size={26} color={COLORS.teal} /><span>Tu profesional</span></div>
      </div>
      <div className="mj-phone">
        <div className="mj-phone-top"><Iso color={COLORS.teal} width={18} /><span>App de familias</span></div>
        <div className="mj-phone-row">
          <span className="mj-phone-check"><Icon name="check" size={18} color="#fff" /></span>
          <div><strong>¡Listo!</strong><small>{nivel.target}/{nivel.target} ★ · {mm}:{ss}</small></div>
        </div>
        <div className="mj-phone-bubble">
          <span className="mj-phone-av">P</span>
          <p>¡Muy bien! 👏</p>
        </div>
      </div>
      <div className="mj-resultado-btns">
        <button className="btn btn-line" onClick={onJugarDeNuevo}>Jugar de nuevo</button>
        <button className="btn btn-line" onClick={onOtroNivel}>Otro nivel</button>
      </div>
    </div>
  );
}

export default function Proceso() {
  const [stage, setStage] = useState("nivel"); // nivel | jugar | resultado
  const [nivel, setNivel] = useState(null);
  const [segundos, setSegundos] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); document.title = "Kinima · Jugá como en casa"; return () => { document.title = "Kinima · Movimiento que continúa"; }; }, []);

  const elegir = (n) => { setNivel(n); setStage("jugar"); };
  const terminar = (s) => { setSegundos(s); setStage("resultado"); };

  return (
    <>
      <header className="pp-header">
        <div className="wrap pp-nav">
          <Link className="pp-brand" to="/" aria-label="Volver a Kinima"><Logo height={32} /><small>Jugá como en casa</small></Link>
          <Link className="pp-back" to="/"><span aria-hidden="true">←</span> Volver a Kinima</Link>
        </div>
      </header>

      <main className="wrap">
        <div className="proc-hero mj-hero">
          <p className="eyebrow">Jugá como en casa</p>
          {stage === "nivel" && <h1>Elegí un nivel</h1>}
          {stage === "jugar" && <h1>¡Atrapá las estrellas!</h1>}
          {stage === "resultado" && <h1>¡Bien ahí! 🎉</h1>}
        </div>

        {stage === "nivel" && <ElegirNivel onElegir={elegir} />}
        {stage === "jugar" && nivel && <MiniJuego nivel={nivel} onTerminado={terminar} />}
        {stage === "resultado" && nivel && (
          <Resultado nivel={nivel} segundos={segundos}
            onJugarDeNuevo={() => setStage("jugar")}
            onOtroNivel={() => { setNivel(null); setStage("nivel"); }} />
        )}

        <div className="pp-cta mj-cta">
          <Link className="btn btn-line" to="/#como-funciona">Ver "Cómo funciona" <span aria-hidden="true">→</span></Link>
        </div>
      </main>

      <footer className="pp-footer"><div className="wrap"><span>© 2026 Kinima · Jugá como en casa</span><span style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}><a href="mailto:contacto@kinima.uy">contacto@kinima.uy</a><Link to="/">Volver a Kinima</Link></span></div></footer>
    </>
  );
}
