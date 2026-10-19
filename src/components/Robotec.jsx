import { Link } from "react-router-dom";
import { asset } from "../lib/brand.jsx";
import { ROBOTEC_URL } from "../config.js";

/* Logo de Robotec (vectorizado). variant: "isologo" (con el robot), "dark" (letras negras) o "light" (letras crema, para fondos oscuros). */
export function RobotecLogo({ variant = "dark", height = 28, className }) {
  const src = { isologo: "robotec-isologo.svg", dark: "robotec-logo.svg", light: "robotec-logo-light.svg" }[variant];
  return <img src={asset(src)} alt="Robotec" className={className} style={{ height, width: "auto", display: "block" }} />;
}

/* Banda de sponsor principal en la home */
export function MainSponsor() {
  return (
    <section id="robotec" className="ms-sec">
      <div className="wrap">
        <div className="ms">
          <Link to="/robotec" className="ms-logo" aria-label="Conocé a Robotec, nuestro sponsor principal">
            <RobotecLogo variant="isologo" height={150} />
          </Link>
          <div className="ms-txt">
            <p className="eyebrow">Sponsor principal</p>
            <h2>Robotec hace posible el dispositivo.</h2>
            <p>Robotec es nuestro primer sponsor. Nos brinda las Raspberry Pi 5 con las que construimos el dispositivo de Kinima, la pieza que lee el movimiento y hace funcionar el juego. Sin su apoyo sería muy difícil financiar el hardware del proyecto.</p>
            <div className="ctas" style={{ marginTop: 6 }}>
              <Link className="btn btn-navy" to="/robotec">Conocé a Robotec <span aria-hidden="true">→</span></Link>
              {ROBOTEC_URL && <a className="btn btn-line" href={ROBOTEC_URL} target="_blank" rel="noopener noreferrer">robotec.com.uy <span aria-hidden="true">↗</span></a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
