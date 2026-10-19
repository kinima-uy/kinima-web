import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Logo, asset } from "../lib/brand.jsx";

/*
 * Para sumar fotos: guardalas en /public/fotografia/ y agregalas a WORKS con su deporte (d),
 * su tamaño en píxeles (w, h) y un texto `alt` que describa la foto para lectores de pantalla.
 * La galería respeta la forma de cada foto (vertical u horizontal).
 */
const F = (src, d, w, h, alt) => ({ src: `fotografia/${src}.jpg`, d, w, h, alt });
const WORKS = [
  F("handball-01", "handball", 1200, 800, "Jugador de handball salta para lanzar al arco"),
  F("futbol-01", "futbol", 900, 1200, "Jugadora sacando un lateral con la pelota sobre la cabeza"),
  F("handball-02", "handball", 800, 1200, "El arquero se estira para atajar un lanzamiento"),
  F("futbol-02", "futbol", 900, 1200, "Jugadora a punto de cabecear una pelota en el aire"),
  F("handball-03", "handball", 1200, 800, "Jugadores disputan la pelota cerca del área"),
  F("handball-08", "handball", 1200, 800, "Hinchada festejando en la tribuna"),
  F("futbol-03", "futbol", 900, 1200, "Dos jugadoras disputan la pelota en carrera"),
  F("handball-04", "handball", 800, 1200, "Defensa y ataque chocan en plena jugada de handball"),
  F("handball-07", "handball", 1200, 800, "El arquero festeja con el puño apretado"),
  F("futbol-04", "futbol", 900, 1200, "Arquera atrapa la pelota frente al arco"),
  F("handball-05", "handball", 1200, 800, "Jugador de espaldas se prepara para lanzar"),
  F("futbol-05", "futbol", 900, 1200, "Jugadora de espaldas conduce la pelota hacia el arco"),
  F("handball-09", "handball", 1200, 800, "El equipo festeja abrazado en la cancha"),
  F("futbol-06", "futbol", 900, 1200, "Cuerpo a cuerpo entre dos jugadoras por la pelota"),
  F("handball-06", "handball", 1200, 800, "Arquero de rojo con los brazos abiertos frente al arco"),
  F("futbol-07", "futbol", 900, 1200, "Jugadora salta para cabecear"),
  F("handball-10", "handball", 1200, 800, "Los jugadores levantan la copa"),
  F("futbol-08", "futbol", 900, 1200, "Jugadora patea la pelota mientras una rival la marca"),
  F("futbol-09", "futbol", 900, 1200, "Jugadora avanza con la pelota entre dos rivales"),
  F("handball-11", "handball", 1200, 800, "Foto del plantel campeón con la copa"),
  F("futbol-10", "futbol", 900, 1200, "Arquera camina por la cancha con la pelota bajo el brazo"),
];
const DEPORTES = [["todos", "Todos"], ["handball", "Handball"], ["futbol", "Fútbol femenino"]];
const PACKS = [
  { t: "Partidos y torneos", p: "Cobertura de un partido, un torneo o una jornada deportiva, con fotos editadas de acción y celebración.", c: "var(--teal)" },
  { t: "Equipos y jugadores", p: "Fotos de plantel, retratos individuales y contenido para las redes del club.", c: "var(--yellow)" },
  { t: "¿Tenés otra idea?", p: "Arrancamos con deporte, pero cualquier pedido se puede considerar. Contanos qué necesitás y lo hablamos.", c: "var(--coral)" },
];
const PAQUETE = { motivo: "Paquete", msg: "Hola, hice una sesión de fotos con Kinima Photography y me gustaría recibir el estado del proyecto." };
const QUIERO = { motivo: "Fotos", msg: "Hola, me interesa una sesión de Kinima Photography. Es para: " };

function Lightbox({ i, lista, onClose, onMove }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current; d?.showModal();
    const key = (e) => { if (e.key === "ArrowRight") onMove(1); if (e.key === "ArrowLeft") onMove(-1); };
    addEventListener("keydown", key);
    return () => { removeEventListener("keydown", key); d?.close(); };
  }, [onMove]);
  const w = lista[i];
  return (
    <dialog ref={ref} className="lb" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-label={`Foto ${i + 1} de ${lista.length}`}>
      <img src={asset(w.src)} alt={w.alt} />
      <button type="button" className="lb-x" onClick={onClose} aria-label="Cerrar">×</button>
      <button type="button" className="lb-p" onClick={() => onMove(-1)} aria-label="Foto anterior">‹</button>
      <button type="button" className="lb-n" onClick={() => onMove(1)} aria-label="Foto siguiente">›</button>
      <p className="lb-c">{i + 1} / {lista.length}</p>
    </dialog>
  );
}

export default function Photography() {
  const [open, setOpen] = useState(-1);
  const [dep, setDep] = useState("todos");
  const lista = WORKS.filter((w) => dep === "todos" || w.d === dep);
  const n = lista.length;
  const move = useCallback((d) => setOpen((o) => (o + d + n) % n), [n]);
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
            <p className="lead" style={{ marginTop: 16 }}>Somos el equipo detrás de Kinima. Fotografiamos partidos, torneos y equipos de fútbol, handball y más, y lo que recaudamos se usa para desarrollar el proyecto. Empezamos con deporte, pero cualquier pedido se puede hablar.</p>
            <div className="ctas" style={{ marginTop: 22 }}>
              <Link className="btn btn-navy" to="/#contacto" state={QUIERO}>Pedir una sesión <span aria-hidden="true">→</span></Link>
              <a className="btn btn-line" href="#trabajos">Ver fotos</a>
            </div>
          </div>
          <button type="button" className="pp-hero-ph" onClick={() => { setDep("todos"); setOpen(0); }} aria-label="Ampliar foto destacada">
            <img src={asset(WORKS[0].src)} alt={WORKS[0].alt} />
          </button>
        </div>

        <section className="pp-sec" id="trabajos" style={{ paddingTop: 16 }}>
          <div className="pp-h">
            <h2>Algunas de nuestras fotos</h2>
            <div className="pp-filters" role="group" aria-label="Filtrar por deporte">
              {DEPORTES.map(([k, t]) => <button key={k} type="button" aria-pressed={dep === k} onClick={() => setDep(k)}>{t}</button>)}
            </div>
          </div>
          <div className="pp-gallery">
            {lista.map((w, i) => (
              <button type="button" key={w.src} className="pp-shot" onClick={() => setOpen(i)} aria-label={`Ampliar: ${w.alt}`}>
                <img src={asset(w.src)} alt="" loading="lazy" width={w.w} height={w.h} />
              </button>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 12, fontSize: 15 }}>Tocá una foto para verla grande.</p>
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
      {open >= 0 && <Lightbox i={open} lista={lista} onClose={() => setOpen(-1)} onMove={move} />}
    </>
  );
}
