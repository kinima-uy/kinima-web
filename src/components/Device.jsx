import { Link } from "react-router-dom";
import { SecHead } from "./Sections.jsx";
import { Iso, COLORS, asset } from "../lib/brand.jsx";
import { DEVICE_IMAGE } from "../config.js";

const SPECS = [
  { t: "Raspberry Pi 5", d: "El cerebro del dispositivo: procesa el movimiento y hace funcionar el juego.", credit: true, c: "var(--teal)", t2: "var(--tint-teal)",
    icon: <><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></> },
  { t: "Cámara", d: "Lee los movimientos del niño frente a la tele, sin sensores ni cables en el cuerpo.", c: "var(--yellow)", t2: "var(--tint-yellow)",
    icon: <><path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="12.5" r="3.5" /></> },
  { t: "Se conecta a la tele", d: "Usa la tele que ya hay en casa como pantalla del juego.", c: "var(--coral)", t2: "var(--tint-coral)",
    icon: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></> },
  { t: "Conectado al sistema", d: "Comparte la actividad con la app familiar y el portal profesional.", c: "var(--navy)", t2: "var(--tint-navy)",
    icon: <><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="19.5" r="1" fill="currentColor" /></> },
];

export default function Device() {
  return (
    <section id="dispositivo" style={{ paddingTop: 132 }}>
      <div className="wrap">
        <SecHead eyebrow="El dispositivo" title="Una cámara que entiende el movimiento." lead="El corazón de Kinima es un dispositivo que se conecta a la tele de casa. Funciona con una Raspberry Pi 5 y una cámara que reconoce el movimiento del niño mientras juega." />
        <div className="device-grid">
          <figure className="device-fig">
            {DEVICE_IMAGE
              ? <img src={asset(DEVICE_IMAGE)} alt="Render conceptual del kit Kinima: la caja con el dispositivo con cámara, el cable, el soporte y la guía rápida" loading="lazy" />
              : <div className="device-ph"><Iso color={COLORS.teal} width={64} /><span>Render del dispositivo</span></div>}
            <figcaption>Render conceptual del kit Kinima</figcaption>
          </figure>
          <ul className="specs">
            {SPECS.map((s) => (
              <li key={s.t} className="spec">
                <span className="spec-ico" style={{ background: s.t2, color: s.c === "var(--navy)" ? "var(--navy)" : "#19324A" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{s.icon}</svg>
                </span>
                <div><h3>{s.t}</h3><p>{s.d}</p>{s.credit && <Link className="credit" to="/robotec">Aportada por Robotec, nuestro sponsor principal →</Link>}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
