import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Logo, Iso, COLORS } from "../lib/brand.jsx";
import { Icon } from "../lib/icon.jsx";

/*
 * El ciclo de Kinima: cómo viaja la información y las acciones entre el centro y el hogar.
 * Es un ciclo (4 → vuelve a 1), así que la navegación envuelve en ambos sentidos.
 */
const STEPS = [
  {
    t: "El profesional registra la sesión",
    p: "En el centro, el profesional realiza la actividad con el niño y registra la sesión: qué se trabajó, cómo respondió y qué sigue.",
    icon: "rutina", c: COLORS.teal, bg: "var(--tint-teal)", tc: "#23716C", label: "En el centro",
  },
  {
    t: "Se realiza en el hogar",
    p: "La familia recibe la actividad en la app y la retoma en casa, jugando con el dispositivo Kinima.",
    icon: "casa", c: COLORS.yellow, bg: "var(--tint-yellow)", tc: "#7A5A12", label: "En el hogar",
  },
  {
    t: "Se registra la actividad",
    p: "Cada sesión en el hogar queda registrada automáticamente: duración, aciertos y constancia.",
    icon: "reportes", c: COLORS.coral, bg: "var(--tint-coral)", tc: "#B04A33", label: "Registro automático",
  },
  {
    t: "El profesional revisa",
    p: "El profesional ve lo que pasó en casa y ajusta la próxima sesión — y el ciclo vuelve a empezar.",
    icon: "progreso", c: "var(--navy2)", bg: "var(--tint-navy)", tc: "var(--navy)", label: "De vuelta en el centro",
  },
];
const N = STEPS.length;
const ANGLES = [0, 90, 180, 270]; // arriba, derecha, abajo, izquierda

export default function Proceso() {
  const [cur, setCur] = useState(0);
  const tabRefs = useRef([]);

  useEffect(() => { window.scrollTo(0, 0); document.title = "Kinima · El ciclo de Kinima"; return () => { document.title = "Kinima · Movimiento que continúa"; }; }, []);

  const go = (i) => setCur(((i % N) + N) % N);
  const onKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(cur + 1); tabRefs.current[(cur + 1) % N]?.focus(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(cur - 1); tabRefs.current[(cur - 1 + N) % N]?.focus(); }
  };

  const step = STEPS[cur];

  return (
    <>
      <header className="pp-header">
        <div className="wrap pp-nav">
          <Link className="pp-brand" to="/" aria-label="Volver a Kinima"><Logo height={32} /><small>Cómo funciona</small></Link>
          <Link className="pp-back" to="/"><span aria-hidden="true">←</span> Volver a Kinima</Link>
        </div>
      </header>

      <main className="wrap">
        <div className="proc-hero">
          <p className="eyebrow">El ciclo de Kinima</p>
          <h1>La información viaja en un círculo, no en una línea.</h1>
          <p className="lead">Lo que pasa en el centro y lo que pasa en el hogar se retroalimentan todo el tiempo. Elegí un paso para ver de qué se trata, o navegá con las flechas: el recorrido no tiene principio ni fin, vuelve a empezar solo.</p>
        </div>

        <div className="proc">
          <div className="proc-ring" role="tablist" aria-label="Pasos del ciclo de Kinima">
            <div className="proc-halo" aria-hidden="true" />
            <svg className="proc-track" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--line)" strokeWidth="1.4" strokeDasharray="2 5" />
            </svg>

            {STEPS.map((s, i) => (
              <div className="proc-arrow" style={{ "--a": `${(ANGLES[i] + 45) % 360}deg` }} key={`arr-${i}`} aria-hidden="true">
                <Icon name="flecha" size={16} color="var(--muted)" />
              </div>
            ))}

            {STEPS.map((s, i) => (
              <button
                key={s.t}
                ref={(el) => (tabRefs.current[i] = el)}
                className={`proc-node ${cur === i ? "on" : ""}`}
                style={{ "--a": `${ANGLES[i]}deg`, "--c": s.c, "--bg": s.bg, "--tc": s.tc }}
                role="tab"
                aria-selected={cur === i}
                aria-controls="proc-panel"
                tabIndex={cur === i ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={onKey}
              >
                <span className="proc-node-ico"><Icon name={s.icon} size={24} color={s.tc} /></span>
                <span className="proc-node-n">{i + 1}</span>
              </button>
            ))}

            <div className="proc-center"><Iso color={COLORS.teal} width={34} /></div>
          </div>

          <div className="proc-panel" id="proc-panel" role="tabpanel" style={{ "--c": step.c, "--bg": step.bg, "--tc": step.tc }}>
            <span className="proc-panel-ico"><Icon name={step.icon} size={28} color={step.tc} /></span>
            <p className="mock-label">{step.label} <span>Paso {cur + 1} de {N}</span></p>
            <h3>{step.t}</h3>
            <p>{step.p}</p>
            <div className="proc-nav">
              <button className="icon-round" onClick={() => go(cur - 1)} aria-label="Paso anterior">←</button>
              <div className="proc-dots">
                {STEPS.map((s, i) => (
                  <button key={s.t} className={`proc-dot ${cur === i ? "on" : ""}`} style={{ "--c": s.c }} onClick={() => go(i)} aria-label={`Ir al paso ${i + 1}: ${s.t}`} />
                ))}
              </div>
              <button className="icon-round" onClick={() => go(cur + 1)} aria-label="Paso siguiente">→</button>
            </div>
          </div>
        </div>

        <div className="pp-cta">
          <div><h2>Esto es un módulo de referencia.</h2><p>Mientras definimos cómo se integra a la página principal, lo dejamos accesible acá.</p></div>
          <Link className="btn btn-line" to="/#como-funciona">Ver "Cómo funciona" en la home <span aria-hidden="true">→</span></Link>
        </div>
      </main>

      <footer className="pp-footer"><div className="wrap"><span>© 2026 Kinima · El ciclo de Kinima</span><span style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}><a href="mailto:contacto@kinima.uy">contacto@kinima.uy</a><Link to="/">Volver a Kinima</Link></span></div></footer>
    </>
  );
}
