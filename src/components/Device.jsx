import { Link } from "react-router-dom";
import { SecHead } from "./Sections.jsx";
import { Iso, COLORS, asset } from "../lib/brand.jsx";
import { DEVICE_IMAGE } from "../config.js";
import { Icon } from "../lib/icon.jsx";

const SPECS = [
  { t: "Raspberry Pi 5", d: "El cerebro del dispositivo: procesa el movimiento y hace funcionar el juego.", credit: true, c: "var(--teal)", t2: "var(--tint-teal)",
    icon: "chip" },
  { t: "Cámara", d: "Lee los movimientos del niño frente a la tele, sin sensores ni cables en el cuerpo.", c: "var(--yellow)", t2: "var(--tint-yellow)",
    icon: "camara" },
  { t: "Se conecta a la tele", d: "Usa la tele que ya hay en casa como pantalla del juego.", c: "var(--coral)", t2: "var(--tint-coral)",
    icon: "tele" },
  { t: "Conectado al sistema", d: "Comparte la actividad con la app familiar y el portal profesional.", c: "var(--navy)", t2: "var(--tint-navy)",
    icon: "wifi" },
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
                  <Icon name={s.icon} size={24} />
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
