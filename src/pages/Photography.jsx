import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Logo, asset } from "../lib/brand.jsx";

/*
 * Para sumar fotos: guardalas en /public/fotografia/ y agregalas a WORKS.
 * Las fotos son verticales (3:4). Los textos `alt` describen la foto para lectores de pantalla.
 */
const WORKS = [
  { src: "fotografia/futbol-01.jpg", alt: "Jugadora sacando un lateral con la pelota sobre la cabeza" },
  { src: "fotografia/futbol-02.jpg", alt: "Jugadora a punto de cabecear una pelota en el aire" },
  { src: "fotografia/futbol-03.jpg", alt: "Dos jugadoras disputan la pelota en carrera" },
  { src: "fotografia/futbol-04.jpg", alt: "Arquera atrapa la pelota frente al arco" },
  { src: "fotografia/futbol-05.jpg", alt: "Jugadora de espaldas conduce la pelota hacia el arco" },
  { src: "fotografia/futbol-06.jpg", alt: "Cuerpo a cuerpo entre dos jugadoras por la pelota" },
  { src: "fotografia/futbol-07.jpg", alt: "Jugadora salta para cabecear" },
  { src: "fotografia/futbol-08.jpg", alt: "Jugadora patea la pelota mientras una rival la marca" },
  { src: "fotografia/futbol-09.jpg", alt: "Jugadora avanza con la pelota entre dos rivales" },
  { src: "fotografia/futbol-10.jpg", alt: "Arquera camina por la cancha con la pelota bajo el brazo" },
];
const PACKS = [
  { t: "Partidos y torneos", p: "Cobertura de un partido, un torneo o una jornada deportiva, con fotos editadas de acción y celebración.", c: "var(--teal)" },
  { t: "Equipos y jugadores", p: "Fotos de plantel, retratos individuales y contenido para las redes del club.", c: "var(--yellow)" },
  { t: "¿Tenés otra idea?", p: "Arrancamos con deporte, pero cualquier pedido se puede considerar. Contanos qué necesitás y lo hablamos.", c: "var(--coral)" },
];
const PAQUETE = { motivo: "Paquete", msg: "Hola, hice una sesión de fotos con Kinima Photography y me gustaría recibir el estado del proyecto." };
const QUIERO = { motivo: "Fotos", msg: "Hola, me interesa una sesión de Kinima Photography. Es para: " };

function Lightbox({ i, onClose, onMove }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current; d?.showModal();
    const key = (e) => { if (e.key === "ArrowRight") onMove(1); if (e.key === "ArrowLeft") onMove(-1); };
    addEventListener("keydown", key);
    return () => { removeEventListener("keydown", key); d?.close(); };
  }, [onMove]);
  const w = WORKS[i];
  return (
    <dialog ref={ref} className="lb" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-label={`Foto ${i + 1} de ${WORKS.length}`}>
      <img src={asset(w.src)} alt={w.alt} />
      <button type="button" className="lb-x" onClick={onClose} aria-label="Cerrar">×</button>
      <button type="button" className="lb-p" onClick={() => onMove(-1)} aria-label="Foto anterior">‹</button>
      <button type="button" className="lb-n" onClick={() => onMove(1)} aria-label="Foto siguiente">›</button>
      <p className="lb-c">{i + 1} / {WORKS.length}</p>
    </dialog>
  );
}

export default function Photography() {
  const [open, setOpen] = useState(-1);
  const move = useCallback((d) => setOpen((o) => (o + d + WORKS.length) % WORKS.length), []);
  useEffect(() => { window.scrollTo(0, 0); document.title = "Kinima Photography"; return () => { document.title = "Kinima · Movimiento que continúa"; }; }, []);
  return (
    <>
      <header className="pp-header">
        <div className="wrap pp-nav">
          <Link className="pp-brand" to="/" aria-label="Volver a Kinima"><Logo height={32} /><small>Photography</small></Link>
          <Link className="pp-back" to="/"><span aria-hidden="true">←</span> Volver a Kinima</Link>
        </div>
      </header>
      <main className="wrap">
        <div className="pp-hero">
          <div>
            <p className="eyebrow">Kinima Photography · Deporte</p>
            <h1>Fotos de deporte que <em>impulsan</em> Kinima.</h1>
            <p className="lead" style={{ marginTop: 16 }}>Somos el equipo detrás de Kinima. Fotografiamos partidos, torneos y equipos, y lo que recaudamos se usa para desarrollar el proyecto. Empezamos con deporte, pero cualquier pedido se puede hablar.</p>
            <div className="ctas" style={{ marginTop: 22 }}>
              <Link className="btn btn-navy" to="/#contacto" state={QUIERO}>Pedir una sesión <span aria-hidden="true">→</span></Link>
              <a className="btn btn-line" href="#trabajos">Ver fotos</a>
            </div>
          </div>
          <button type="button" className="pp-hero-ph" onClick={() => setOpen(1)} aria-label="Ampliar foto destacada">
            <img src={asset(WORKS[1].src)} alt={WORKS[1].alt} />
          </button>
        </div>

        <section className="pp-sec" id="trabajos" style={{ paddingTop: 16 }}>
          <div className="pp-h"><h2>Fútbol femenino</h2><p style={{ color: "var(--muted)" }}>Tocá una foto para verla grande</p></div>
          <div className="pp-gallery">
            {WORKS.map((w, i) => (
              <button type="button" key={w.src} className="pp-shot" onClick={() => setOpen(i)} aria-label={`Ampliar: ${w.alt}`}>
                <img src={asset(w.src)} alt="" loading="lazy" width="900" height="1200" />
              </button>
            ))}
          </div>
        </section>

        <section className="pp-sec">
          <div className="pp-h"><h2>Qué hacemos</h2><p style={{ color: "var(--muted)" }}>Precios a consultar</p></div>
          <div className="pp-services">
            {PACKS.map((p) => <div className="pp-svc" key={p.t} style={{ borderTop: `4px solid ${p.c}` }}><h3>{p.t}</h3><p>{p.p}</p></div>)}
          </div>
          <div className="pp-impact" style={{ marginTop: 16 }}>
            <span className="gline" />
            <b>Cada sesión suma movimiento.</b>
            <p>Con tu sesión financiás prototipos, componentes y pruebas de Kinima. Además, podés pedirnos el estado del proyecto cuando quieras.</p>
          </div>
        </section>

        <section className="pp-sec">
          <div className="pp-h"><h2>Cómo funciona</h2></div>
          <ol className="pp-steps">
            <li style={{ "--c": "var(--teal)" }}><b>1. Nos escribís</b><span>Contanos qué evento o equipo querés fotografiar.</span></li>
            <li style={{ "--c": "var(--yellow)" }}><b>2. Coordinamos</b><span>Fecha, lugar y qué tipo de fotos necesitás.</span></li>
            <li style={{ "--c": "var(--coral)" }}><b>3. Recibís tus fotos</b><span>Editadas y listas para compartir.</span></li>
          </ol>
        </section>

        <div className="pp-cta">
          <div><h2>¿Ya hiciste una sesión con nosotras?</h2><p>Pedinos el estado del proyecto y te contamos cómo va.</p></div>
          <Link className="btn btn-navy" to="/#contacto" state={PAQUETE}>Solicitar el estado <span aria-hidden="true">→</span></Link>
        </div>
      </main>
      <footer className="pp-footer"><div className="wrap"><span>© 2026 Kinima Photography · Fondos para el desarrollo de Kinima</span><span style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}><a href="mailto:kinima.uruguay@gmail.com">kinima.uruguay@gmail.com</a><a href="https://www.instagram.com/kinima.uy/" target="_blank" rel="noopener noreferrer">Instagram @kinima.uy</a><Link to="/">Volver a Kinima</Link></span></div></footer>
      {open >= 0 && <Lightbox i={open} onClose={() => setOpen(-1)} onMove={move} />}
    </>
  );
}
