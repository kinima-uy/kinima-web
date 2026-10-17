import { useEffect, useRef, useState } from "react";
import { useMotion } from "../lib/motion.jsx";
import { Iso, COLORS } from "../lib/brand.jsx";
import { SecHead, Check } from "./Sections.jsx";
import Game from "./Game.jsx";

/*
 * Para usar los prototipos definitivos: en STEPS, cambiá `mock` por una imagen, por ejemplo
 *   mock: <img src="/prototipos/portal.png" alt="Portal profesional de Kinima" style={{ width: "100%", borderRadius: 14 }} />
 * y guardá la imagen en /public/prototipos/.
 */

const Ico = ({ d, c, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">{d}</svg>
);
const EX = {
  squat: <path d="M12 4v8M7 20l5-8 5 8" />,
  balance: <path d="M12 3v10M12 13l-4 8M12 13l5-3" />,
  march: <path d="M8 20l2-7 4 2 2 5M10 13l2-6" />,
};

function PortalMock() {
  const rows = [
    { t: "Sentadillas", s: "Fuerza de piernas", q: "3 × 10", bg: "var(--tint-teal)", c: "#23716C", i: EX.squat },
    { t: "Equilibrio en una pierna", s: "Estabilidad", q: "3 × 20 s", bg: "var(--tint-yellow)", c: "#7A5A12", i: EX.balance },
    { t: "Marcha en el lugar", s: "Coordinación", q: "2 min", bg: "var(--tint-coral)", c: "#B04A33", i: EX.march },
  ];
  const nav = [
    ["Pacientes", <><circle cx="9" cy="8" r="3.5" /><path d="M3 20c.8-3.5 3.2-5 6-5s5.2 1.5 6 5M16 4a3.5 3.5 0 0 1 0 7M18 15c1.6.6 2.6 2.2 3 5" /></>],
    ["Rutinas", <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8M8 17h5" /></>],
    ["Mensajes", <path d="M4 5h16v11H9l-5 4z" />],
    ["Reportes", <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />],
  ];
  return (
    <div className="browser" aria-hidden="true">
      <div className="b-bar"><i /><i /><i /><div className="b-url">portal.kinima.uy/pacientes/martina</div></div>
      <div className="b-body">
        <div className="b-side">
          <div className="brand"><Iso color={COLORS.teal} width={20} />Kinima</div>
          {nav.map(([t, d], i) => <div className={`b-nav ${i === 0 ? "act" : ""}`} key={t}><Ico d={d} c="currentColor" />{t}</div>)}
        </div>
        <div className="b-main">
          <div className="b-pt"><span className="av">M</span><div><strong>Martina R. · 7 años</strong><small>Semana 3 de 8 · próxima sesión jueves</small></div></div>
          <div className="b-tabs"><span className="act">Rutina</span><span>Progreso</span><span>Notas</span></div>
          {rows.map((r) => (
            <div className="b-row" key={r.t}>
              <span className="h" /><span className="ei" style={{ background: r.bg }}><Ico d={r.i} c={r.c} /></span>
              <span><b>{r.t}</b><small>{r.s}</small></span><span className="q">{r.q}</span>
            </div>
          ))}
          <div className="b-add">+ Agregar actividad</div>
          <div className="b-foot"><small style={{ color: "var(--muted)" }}>Se envía a la familia y a la tele</small><span className="b-btn">Guardar rutina</span></div>
        </div>
      </div>
    </div>
  );
}

function FamilyMock() {
  const acts = [
    { t: "Sentadillas", s: "3 × 10 · 4 min", ok: true, bg: "var(--tint-teal)", c: "#23716C", i: EX.squat },
    { t: "Equilibrio", s: "3 × 20 s · 3 min", ok: true, bg: "var(--tint-yellow)", c: "#7A5A12", i: EX.balance },
    { t: "Marcha", s: "2 min", ok: false, bg: "var(--tint-coral)", c: "#B04A33", i: EX.march },
  ];
  const tabs = [
    ["Inicio", <path d="M3 11l9-7 9 7M5 10v10h14V10" />],
    ["Rutina", <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8" /></>],
    ["Progreso", <path d="M4 20V10M10 20V4M16 20v-7" />],
    ["Mensajes", <path d="M4 5h16v11H9l-5 4z" />],
  ];
  return (
    <div className="phone" aria-hidden="true">
      <div className="ph-screen">
        <div className="ph-notch" />
        <div className="ph-body">
          <div className="ph-top"><div><small>Hola, familia de</small><strong>Martina</strong></div><span className="av">M</span></div>
          <div className="ph-card">
            <div><strong>Rutina de hoy</strong><small>12 min · 3 actividades</small></div>
            <svg width="46" height="46" viewBox="0 0 46 46"><circle cx="23" cy="23" r="19" fill="none" stroke="#2C4A66" strokeWidth="6" /><circle cx="23" cy="23" r="19" fill="none" stroke="#F2C96D" strokeWidth="6" strokeLinecap="round" strokeDasharray="80 120" transform="rotate(-90 23 23)" /><text x="23" y="27" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="12" fill="#F7F5EF">2/3</text></svg>
            <span className="go">Seguir en la tele</span>
          </div>
          <p className="ph-h">Actividades</p>
          {acts.map((a) => (
            <div className="ph-act" key={a.t}>
              <span className="ei" style={{ background: a.bg }}><Ico d={a.i} c={a.c} size={15} /></span>
              <span><b>{a.t}</b><small>{a.s}</small></span>
              <span className={`ck ${a.ok ? "ok" : ""}`}>{a.ok && <Check size={11} w={3.5} />}</span>
            </div>
          ))}
          <div className="ph-msg"><span className="av">L</span><span><b>Laura, fisioterapeuta</b><br />¡Muy bien esta semana! Sumamos 2 repeticiones más.</span></div>
        </div>
        <div className="ph-tabs">{tabs.map(([t, d], i) => <span className={i === 0 ? "act" : ""} key={t}><Ico d={d} c="currentColor" size={16} />{t}</span>)}</div>
      </div>
    </div>
  );
}

function DashMock() {
  const bars = [55, 70, 6, 62, 85, 78, 44];
  return (
    <div className="dash" aria-hidden="true">
      <div className="d-top"><strong>Martina · semana 3</strong><small>Datos de ejemplo</small></div>
      <div className="d-kpis">
        <div className="d-kpi"><small>Constancia</small><b>6/7</b> <em>días</em></div>
        <div className="d-kpi"><small>Minutos</small><b>68</b> <em>+12</em></div>
        <div className="d-kpi"><small>Repeticiones</small><b>186</b> <em>+20</em></div>
      </div>
      <div className="d-chart">{bars.map((h, i) => <div key={i} className={h < 10 ? "miss" : ""} style={{ height: h + "%", animationDelay: i * .05 + "s" }} />)}</div>
      <div className="d-days">{["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="d-note">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A5A12" strokeWidth="2.2" strokeLinecap="round" style={{ flex: "none" }}><path d="M12 3v3M5 6l2 2M19 6l-2 2M8 14a4 4 0 1 1 8 0c0 2-2 3-2 5h-4c0-2-2-3-2-5z" /></svg>
        <span><b>Sugerencia para la próxima sesión:</b> el equilibrio mejoró toda la semana. Podés subirlo a 25 s.</span>
      </div>
    </div>
  );
}

const STEPS = [
  { t: "El profesional propone actividades", p: "Desde su portal arma la rutina de cada niño: ejercicios, repeticiones y objetivos.", c: "var(--teal)", label: "Portal profesional", mock: <PortalMock /> },
  { t: "La familia prepara y acompaña", p: "En la app ve la rutina del día, recibe recordatorios y mensajes del profesional.", c: "var(--yellow)", label: "Aplicación familiar", mock: <FamilyMock /> },
  { t: "El niño juega en la tele", p: "La cámara del dispositivo lee sus movimientos y los convierte en un juego que responde a lo que hace.", c: "#A9D7A0", label: "Experiencia en la tele", mock: <div className="tvs"><div className="tv"><Game mode="march" label="Concepto del juego: la personita marcha por un camino con colinas" /></div></div> },
  { t: "Seguimiento", p: "El sistema contempla el registro de la actividad para que el profesional pueda ajustar la próxima rutina.", c: "var(--coral)", label: "Seguimiento semanal", mock: <DashMock /> },
];
const DUR = 7000;

export default function HowItWorks() {
  const { paused } = useMotion();
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const [started, setStarted] = useState(false);
  const secRef = useRef(null), tabRefs = useRef([]);
  /* En celulares (pasos y pantalla apilados) no avanza solo: cada uno toca el paso que quiere ver */
  const [wide, setWide] = useState(() => typeof matchMedia === "undefined" || matchMedia("(min-width: 900px)").matches);
  useEffect(() => {
    const mq = matchMedia("(min-width: 900px)"), on = () => setWide(mq.matches);
    mq.addEventListener("change", on); return () => mq.removeEventListener("change", on);
  }, []);
  const running = auto && started && !paused && wide;

  useEffect(() => {
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: .3 });
    io.observe(secRef.current); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % STEPS.length), DUR);
    return () => clearTimeout(t);
  }, [running, cur]);

  const pick = (i) => { setAuto(false); setCur(i); };
  const onKey = (e) => {
    const n = STEPS.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); pick((cur + 1) % n); tabRefs.current[(cur + 1) % n]?.focus(); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); pick((cur + n - 1) % n); tabRefs.current[(cur + n - 1) % n]?.focus(); }
  };

  return (
    <section id="como-funciona" ref={secRef} style={{ paddingTop: 24 }}>
      <div className="wrap">
        <SecHead eyebrow="Cómo funciona" title="Un sistema conectado, paso a paso." lead="Así es el funcionamiento previsto de Kinima. Las pantallas son prototipos conceptuales." />
        <div className="how">
          <ol className="steps" role="tablist" aria-label="Pasos del sistema">
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <button ref={(el) => (tabRefs.current[i] = el)} className="step" role="tab" id={`tab-${i}`} aria-controls={`pan-${i}`} aria-selected={cur === i} tabIndex={cur === i ? 0 : -1} onClick={() => pick(i)} onKeyDown={onKey}>
                  <span className="n" style={{ background: s.c }}>{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                  <span className="prog"><i key={`${cur}-${running}`} style={running ? { animation: `progfill ${DUR}ms linear forwards` } : { width: "100%" }} /></span>
                </button>
              </li>
            ))}
          </ol>
          <div className="screen">
            {STEPS.map((s, i) => (
              <div key={s.t} className={`panel ${cur === i ? "on" : ""}`} id={`pan-${i}`} role="tabpanel" aria-labelledby={`tab-${i}`} aria-hidden={cur !== i} inert={cur !== i ? "" : undefined}>
                <p className="mock-label">{s.label} <span>Prototipo</span></p>
                {s.mock}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
