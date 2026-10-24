import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Logo, Iso, COLORS } from "../lib/brand.jsx";
import { BlobField } from "./Ambient.jsx";
import Game from "./Game.jsx";
import { RobotecLogo } from "./Robotec.jsx";
import { SHOW_PHOTOGRAPHY } from "../config.js";
import { Icon } from "../lib/icon.jsx";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export function Check({ color = "#fff", size = 14, w = 3 }) {
  return <Icon name="check" size={size} color={color} />;
}

export function SecHead({ eyebrow, title, lead, style }) {
  return (
    <div className="sec-head" style={style}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      <span className="gline" />
    </div>
  );
}

/* ---------- Header ---------- */
export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="top">
      <div className="wrap nav">
        <a className="logo" href="#inicio" aria-label="Kinima, ir al inicio"><Logo height={34} /></a>
        <button className="menu-btn" type="button" aria-expanded={open} aria-controls="links" onClick={() => setOpen(!open)}>{open ? "Cerrar" : "Menú"}</button>
        <nav className={`links ${open ? "open" : ""}`} id="links" aria-label="Principal" onClick={(e) => e.target.closest("a") && close()}>
          <a href="#propuesta">El proyecto</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#equipo">Nosotras</a>
          <a href="#preguntas">Preguntas</a>
          <a className="btn btn-navy" href="#apoya">Apoyar Kinima</a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  return (
    <section className="hero" id="inicio">
      <BlobField preset="hero" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="pill"><i />Proyecto en desarrollo</span>
          <h1>Movimiento que <em>continúa</em>.</h1>
          <p className="lead">Estamos desarrollando Kinima, un sistema que busca acompañar la continuidad de la rehabilitación infantil desde el hogar, conectando a niños, familias y profesionales mediante tecnología y juego.</p>
          <div className="ctas">
            <a className="btn btn-navy" href="#propuesta">Conocé el proyecto <span aria-hidden="true">→</span></a>
            <a className="btn btn-line" href="#apoya">Quiero colaborar</a>
          </div>
          <p className="advised"><span aria-hidden="true" />Con el asesoramiento de profesionales de Teletón</p>
          <p className="advised"><span aria-hidden="true" />Sponsor principal:&nbsp;<Link to="/robotec">Robotec</Link></p>
          <div className="trio">
            <span><b style={{ background: "var(--teal)" }} />Juego en la tele</span>
            <span><b style={{ background: "var(--yellow)" }} />App familiar</span>
            <span><b style={{ background: "var(--coral)" }} />Portal profesional</span>
          </div>
        </div>
        <div className="tvwrap">
          <div className="tv"><Game mode="stars" label="Concepto del juego en la tele: la personita salta para atrapar estrellas mientras Martina hace el ejercicio" /></div>
          <div className="stand" aria-hidden="true" />
          <p className="tv-caption"><span>Concepto</span>Así se vería el juego en la tele</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- El desafío ---------- */
export function Challenge() {
  const cards = [
    { n: "01", t: "Continuidad", p: "Sostener en casa las actividades indicadas en el centro, semana a semana, sin que se pierdan.", bg: "var(--tint-teal)", c: "#23716C", icon: "continuidad" },
    { n: "02", t: "Participación", p: "Acompañar al niño y a su familia en el hogar, con actividades motivadoras y fáciles de seguir.", bg: "var(--tint-yellow)", c: "#7A5A12", icon: "casa" },
    { n: "03", t: "Conexión", p: "Facilitar el vínculo con el profesional, que hoy no ve lo que pasa en casa entre sesión y sesión.", bg: "var(--tint-coral)", c: "#B04A33", icon: "conexion" },
  ];
  return (
    <section id="desafio" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="start" style={{ marginBottom: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p className="eyebrow">El desafío</p>
            <h2>La rehabilitación no termina cuando termina una sesión.</h2>
          </div>
          <div className="txt">
            <span className="gline" />
            <p className="quote">¿Qué sucede entre una sesión y la siguiente?</p>
            <p className="lead">La continuidad de las actividades en el hogar puede implicar desafíos para niños, familias y profesionales.</p>
          </div>
        </div>
        <div className="cards3">
          {cards.map((c) => (
            <article className="c lift" key={c.n}>
              <div className="c-top">
                <div className="ico" style={{ background: c.bg }}><Icon name={c.icon} size={26} color={c.c} /></div>
                <span className="num">{c.n}</span>
              </div>
              <h3>{c.t}</h3>
              <p>{c.p}</p>
            </article>
          ))}
        </div>
        <div className="teleton">
          <div className="teleton-k"><Iso color={COLORS.cream} width={40} /></div>
          <div className="teleton-txt">
            <p className="eyebrow">Por qué Teletón</p>
            <h3>Aprendemos de quienes acompañan la rehabilitación infantil todos los días.</h3>
            <p>Kinima cuenta con el asesoramiento de profesionales de Teletón. Su experiencia nos ayuda a entender qué pasa con los niños y sus familias entre una sesión y otra, y a pensar cada parte del sistema desde las necesidades reales de la rehabilitación.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Nuestra propuesta ---------- */
export function Proposal() {
  return (
    <section id="propuesta" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <SecHead eyebrow="Nuestra propuesta" title="Una forma de continuar el movimiento en casa." lead="Kinima busca transformar las actividades indicadas por profesionales en experiencias interactivas para el hogar, donde el niño juega, la familia acompaña y el profesional sigue el proceso." />
        <div className="pillars">
          <div className="pl" style={{ "--c": "var(--teal)" }}><h3>Continuidad</h3><p>Las actividades siguen en casa, todos los días.</p></div>
          <div className="pl" style={{ "--c": "var(--yellow)" }}><h3>Participación</h3><p>El juego invita al niño y suma a la familia.</p></div>
          <div className="pl" style={{ "--c": "var(--coral)" }}><h3>Conexión</h3><p>Centro y hogar comparten un mismo proceso.</p></div>
        </div>
        <div className="vs">
          <div className="vs-col">
            <p className="vs-h">Una app de ejercicios</p>
            <ul><li>Una lista de tareas para cumplir</li><li>El niño repite sin respuesta</li><li>La familia no sabe si lo hace bien</li><li>El profesional no ve qué pasó</li></ul>
          </div>
          <div className="vs-col k">
            <p className="vs-h"><Iso color={COLORS.teal} width={24} />Kinima</p>
            <ul><li>Un juego que responde al movimiento</li><li>La personita muestra y festeja cada avance</li><li>La familia acompaña con una guía clara</li><li>El profesional sigue el proceso y ajusta</li></ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Para quiénes ---------- */
export function Audiences() {
  const items = [
    { tag: "Niños y niñas", tc: "var(--tealtx)", bg: "var(--tint-teal)", t: "Participar jugando", p: "Cada actividad es un desafío en la tele, con la personita que muestra el movimiento y festeja cada avance.", c: COLORS.teal },
    { tag: "Familias", tc: "#7A5A12", bg: "var(--tint-yellow)", t: "Herramientas para acompañar", p: "La rutina del día, recordatorios y una guía clara para saber cómo acompañar desde casa.", c: COLORS.yellow },
    { tag: "Profesionales", tc: "#B04A33", bg: "var(--tint-coral)", t: "Proponer y consultar", p: "Un espacio para asignar actividades a cada paciente y seguir cómo van entre sesiones.", c: COLORS.coral },
    { tag: "Centros de rehabilitación", tc: "var(--navy)", bg: "var(--tint-navy)", t: "Continuidad fuera del centro", p: "Una propuesta para extender el trabajo del equipo al hogar de cada niño.", c: COLORS.navy },
  ];
  return (
    <section id="para-quien" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <SecHead eyebrow="Para quiénes" title="Diseñado para conectar diferentes experiencias." />
        <div className="exp">
          {items.map((it) => (
            <article className="e lift" style={{ background: it.bg }} key={it.tag}>
              <span className="tag" style={{ color: it.tc }}>{it.tag}</span>
              <h3>{it.t}</h3>
              <p>{it.p}</p>
              <Iso color={it.c} className="mini" width={96} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Estado del proyecto ---------- */
export function Status() {
  const ref = useRef(null);
  useEffect(() => {
    const tl = ref.current;
    const upd = () => { const r = tl.getBoundingClientRect(); tl.style.setProperty("--p", clamp((innerHeight * .7 - r.top) / r.height, 0, 1)); };
    addEventListener("scroll", upd, { passive: true }); upd();
    return () => removeEventListener("scroll", upd);
  }, []);
  const steps = [
    { s: "done", t: "01 · Investigación y concepto", d: "Completo · con el asesoramiento de profesionales de Teletón" },
    { s: "done", t: "02 · Identidad y diseño del sistema", d: "Completo" },
    { s: "now", t: "03 · Prototipado", d: "En curso · presentación en diciembre 2026" },
    { s: "", t: "04 · Pruebas y validación", d: "Diciembre 2026 a febrero 2027" },
  ];
  return (
    <section id="proyecto" style={{ paddingTop: 24 }}>
      <div className="wrap status">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p className="eyebrow">En desarrollo</p>
          <h2 style={{ fontSize: "clamp(32px,4vw,46px)", lineHeight: 1.08 }}>Kinima está tomando forma.</h2>
          <span className="gline" />
          <p className="lead">Todavía no está disponible. Estos son los pasos que ya dimos y los que vienen.</p>
        </div>
        <ol className="tl" ref={ref}>
          {steps.map((st) => (
            <li className={st.s} key={st.t}>
              <span className="dot" aria-hidden="true">{st.s === "done" && <Check />}</span>
              <div><strong>{st.t}</strong><span>{st.d}</span></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer>
      <BlobField preset="footer" />
      <div className="wrap">
        <div className="foot">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16, maxWidth: "30em" }}>
            <Logo variant="crema" height={40} className="logo-f" />
            <p className="tag">Movimiento que continúa.</p>
          </div>
          <div className="foot-cols">
            <nav aria-label="Explorá"><p className="fh">Explorá</p><a href="#propuesta">El proyecto</a><a href="#como-funciona">Cómo funciona</a><a href="#apoya">Apoyá Kinima</a>{SHOW_PHOTOGRAPHY && <Link to="/fotografia">Kinima Photography</Link>}</nav>
            <nav aria-label="Conectemos"><p className="fh">Conectemos</p><a href="#contacto">Contacto</a><a href="mailto:contacto@kinima.uy">contacto@kinima.uy</a><a href="https://www.instagram.com/kinima.uy/" target="_blank" rel="noopener noreferrer">Instagram @kinima.uy</a><a href="https://www.linkedin.com/in/solalexandrovic/" target="_blank" rel="noopener noreferrer">LinkedIn de Sol</a><a href="https://www.linkedin.com/in/carolina-aizenstat-a446b32ab/" target="_blank" rel="noopener noreferrer">LinkedIn de Carolina</a></nav>
          </div>
        </div>
        <Link className="foot-sponsor" to="/robotec">Sponsor principal <RobotecLogo variant="light" height={20} /></Link>
        <div className="foot-bottom"><span>© 2026 Kinima · Proyecto en desarrollo · Diseño Multimedia, Universidad ORT Uruguay · Con el asesoramiento de profesionales de Teletón</span><a href="#privacidad">Privacidad</a></div>
      </div>
    </footer>
  );
}
