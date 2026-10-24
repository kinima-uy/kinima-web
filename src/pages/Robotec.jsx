import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo, Iso, COLORS } from "../lib/brand.jsx";
import { RobotecLogo } from "../components/Robotec.jsx";
import { ROBOTEC_URL } from "../config.js";

const GIVES = [
  { t: "Las Raspberry Pi 5", d: "Las placas con las que armamos los prototipos del dispositivo y las pruebas con familias.", c: "var(--teal)" },
  { t: "Lo que no podíamos financiar", d: "El hardware es la parte más cara del proyecto. Su aporte nos permite enfocarnos en diseñar y programar.", c: "var(--yellow)" },
  { t: "Confianza desde el principio", d: "Apostaron por Kinima cuando todavía era una idea en desarrollo.", c: "var(--coral)" },
];
const ROLE = [
  ["Lee la cámara", "Procesa en tiempo real la imagen de la cámara para reconocer los movimientos del niño."],
  ["Hace funcionar el juego", "Corre el juego que se ve en la tele y responde a lo que el niño hace."],
  ["Conecta el sistema", "Envía la actividad a la app familiar y al portal del profesional."],
];

export default function Robotec() {
  useEffect(() => { window.scrollTo(0, 0); document.title = "Robotec · Sponsor principal de Kinima"; return () => { document.title = "Kinima · Movimiento que continúa"; }; }, []);
  return (
    <>
      <header className="pp-header">
        <div className="wrap pp-nav">
          <Link className="pp-brand" to="/" aria-label="Volver a Kinima"><Logo height={32} /><small>Sponsors</small></Link>
          <Link className="pp-back" to="/"><span aria-hidden="true">←</span> Volver a Kinima</Link>
        </div>
      </header>
      <main className="wrap">
        <div className="rb-hero">
          <div className="rb-hero-copy">
            <p className="eyebrow">Sponsor principal</p>
            <h1>Gracias, <span className="rb-name">Robotec</span>.</h1>
            <p className="lead">Robotec es el primer sponsor de Kinima. Nos brinda las Raspberry Pi 5 que hacen funcionar el dispositivo. Sin su apoyo sería muy difícil financiar todo el hardware del proyecto.</p>
            <div className="ctas" style={{ marginTop: 8 }}>
              {ROBOTEC_URL && <a className="btn btn-navy" href={ROBOTEC_URL} target="_blank" rel="noopener noreferrer">Visitá Robotec <span aria-hidden="true">↗</span></a>}
              <Link className={`btn ${ROBOTEC_URL ? "btn-line" : "btn-navy"}`} to="/#dispositivo">Ver el dispositivo</Link>
            </div>
          </div>
          <div className="rb-duo" aria-hidden="true">
            <div className="rb-card"><RobotecLogo variant="isologo" height={170} /></div>
            <span className="rb-plus">+</span>
            <div className="rb-card"><Iso color={COLORS.teal} width={86} /></div>
          </div>
        </div>

        <section className="pp-sec">
          <div className="pp-h"><h2>Qué aporta Robotec</h2></div>
          <div className="pp-services">
            {GIVES.map((g) => <div className="pp-svc" key={g.t} style={{ borderTop: `4px solid ${g.c}` }}><h3>{g.t}</h3><p>{g.d}</p></div>)}
          </div>
        </section>

        <section className="pp-sec">
          <div className="rb-role">
            <div>
              <p className="eyebrow" style={{ color: "var(--yellow)" }}>La Raspberry Pi 5 en Kinima</p>
              <h2>El cerebro del dispositivo.</h2>
              <p>Dentro de cada dispositivo Kinima hay una Raspberry Pi 5. Es la que hace que el movimiento del niño se transforme en juego.</p>
            </div>
            <ol>
              {ROLE.map(([t, d], i) => <li key={t}><span>{i + 1}</span><div><b>{t}</b><p>{d}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="pp-sec">
          <div className="pp-h"><h2>Dónde está Robotec en Kinima</h2></div>
          <ul className="rb-where">
            <li>En esta web, como sponsor principal.</li>
            <li>En la presentación final del proyecto en la Universidad ORT Uruguay.</li>
            <li>En las pruebas con familias y profesionales, de diciembre de 2026 a febrero de 2027.</li>
            <li>En nuestras redes, cuando contamos los avances.</li>
          </ul>
        </section>

        <div className="pp-cta">
          <div><h2>¿Tu empresa también quiere sumarse?</h2><p>Hay lugar para más sponsors y aliados. Te contamos cómo.</p></div>
          <Link className="btn btn-navy" to="/#contacto" state={{ motivo: "Sponsor", msg: "Hola, nos interesa apoyar Kinima como sponsor." }}>Quiero apoyar Kinima <span aria-hidden="true">→</span></Link>
        </div>
      </main>
      <footer className="pp-footer"><div className="wrap"><span>© 2026 Kinima · Gracias a Robotec, nuestro sponsor principal</span><span style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}><a href="mailto:contacto@kinima.uy">contacto@kinima.uy</a><a href="https://www.instagram.com/kinima.uy/" target="_blank" rel="noopener noreferrer">Instagram @kinima.uy</a><Link to="/">Volver a Kinima</Link></span></div></footer>
    </>
  );
}
