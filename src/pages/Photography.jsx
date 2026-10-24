import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Logo, asset } from "../lib/brand.jsx";

/*
 * Para sumar fotos: guardalas en /public/fotografia/ y agregalas a WORKS con su categoría (d: futbol, handball, mascotas, retratos…),
 * su tamaño en píxeles (w, h) y un texto `alt` que describa la foto para lectores de pantalla.
 * La galería respeta la forma de cada foto (vertical u horizontal).
 */
const F = (src, d, w, h, alt) => ({ src: `fotografia/${src}.jpg`, d, w, h, alt });
const WORKS = [
  F("handball-01", "handball", 1200, 800, "Jugador de handball salta para lanzar al arco"),
  F("mascotas-01", "mascotas", 800, 1200, "Cachorro labrador negro sentado en el pasto con la lengua afuera"),
  F("futbol-01", "futbol", 900, 1200, "Jugadora sacando un lateral con la pelota sobre la cabeza"),
  F("handball-02", "handball", 800, 1200, "El arquero se estira para atajar un lanzamiento"),
  F("retratos-01", "retratos", 800, 1200, "Retrato de una joven de pelo largo y ondulado sobre fondo blanco"),
  F("futbol-02", "futbol", 900, 1200, "Jugadora a punto de cabecear una pelota en el aire"),
  F("handball-03", "handball", 1200, 800, "Jugadores disputan la pelota cerca del área"),
  F("retratos-06", "retratos", 800, 1200, "Joven de buzo gris y pantalón de corderoy sentada en un banco de madera"),
  F("handball-08", "handball", 1200, 800, "Hinchada festejando en la tribuna"),
  F("mascotas-02", "mascotas", 800, 1200, "Cachorro labrador negro mordiendo una rama acostado en el pasto"),
  F("futbol-03", "futbol", 900, 1200, "Dos jugadoras disputan la pelota en carrera"),
  F("retratos-02", "retratos", 800, 1200, "Joven de pelo enrulado con la mano sobre la cabeza, sentada junto a una silla"),
  F("handball-04", "handball", 800, 1200, "Defensa y ataque chocan en plena jugada de handball"),
  F("handball-07", "handball", 1200, 800, "El arquero festeja con el puño apretado"),
  F("mascotas-03", "mascotas", 800, 1200, "Perfil de un cachorro labrador negro mirando hacia un costado"),
  F("futbol-04", "futbol", 900, 1200, "Arquera atrapa la pelota frente al arco"),
  F("handball-05", "handball", 1200, 800, "Jugador de espaldas se prepara para lanzar"),
  F("retratos-04", "retratos", 1200, 800, "Retrato de frente de una joven de pelo enrulado"),
  F("futbol-05", "futbol", 900, 1200, "Jugadora de espaldas conduce la pelota hacia el arco"),
  F("handball-09", "handball", 1200, 800, "El equipo festeja abrazado en la cancha"),
  F("mascotas-04", "mascotas", 800, 1200, "Cachorro labrador negro acostado entre las plantas, mirando a cámara"),
  F("futbol-06", "futbol", 900, 1200, "Cuerpo a cuerpo entre dos jugadoras por la pelota"),
  F("retratos-03", "retratos", 800, 1200, "Retrato de frente de una joven con musculosa negra"),
  F("handball-06", "handball", 1200, 800, "Arquero de rojo con los brazos abiertos frente al arco"),
  F("futbol-07", "futbol", 900, 1200, "Jugadora salta para cabecear"),
  F("handball-10", "handball", 1200, 800, "Los jugadores levantan la copa"),
  F("mascotas-05", "mascotas", 1200, 800, "Cachorro labrador negro descansando en el pasto junto a las plantas"),
  F("futbol-08", "futbol", 900, 1200, "Jugadora patea la pelota mientras una rival la marca"),
  F("retratos-05", "retratos", 800, 1200, "Joven con musculosa negra mirando hacia un costado"),
  F("futbol-09", "futbol", 900, 1200, "Jugadora avanza con la pelota entre dos rivales"),
  F("handball-11", "handball", 1200, 800, "Foto del plantel campeón con la copa"),
  F("retratos-07", "retratos", 800, 1200, "Joven sentada en un banco de madera mirando a cámara"),
  F("futbol-10", "futbol", 900, 1200, "Arquera camina por la cancha con la pelota bajo el brazo"),
];
const CATEGORIAS = [["todos", "Todas"], ["handball", "Handball"], ["futbol", "Fútbol femenino"], ["mascotas", "Mascotas"], ["retratos", "Retratos"]];
const PACKS = [
  { t: "Deporte", p: "Partidos, torneos y jornadas deportivas, fotos de plantel y retratos de jugadores para las redes del club.", c: "var(--teal)" },
  { t: "Mascotas y retratos", p: "Sesiones al aire libre con tu mascota, retratos para vos o para tu familia.", c: "var(--yellow)" },
  { t: "Eventos y lo que se te ocurra", p: "Cumpleaños, eventos, productos o cualquier otra idea. Contanos qué necesitás y lo armamos.", c: "var(--coral)" },
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
  const [cat, setCat] = useState("todos");
  const lista = WORKS.filter((w) => cat === "todos" || w.d === cat);
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
            <p className="eyebrow">Kinima Photography</p>
            <h1>Fotos que <em>impulsan</em> Kinima.</h1>
            <p className="lead" style={{ marginTop: 16 }}>Somos el equipo detrás de Kinima. Hacemos fotografía en general: deporte, mascotas, retratos, eventos y lo que se te ocurra. Lo que recaudamos se usa para desarrollar el proyecto.</p>
            <div className="ctas" style={{ marginTop: 22 }}>
              <Link className="btn btn-navy" to="/#contacto" state={QUIERO}>Pedir una sesión <span aria-hidden="true">→</span></Link>
              <a className="btn btn-line" href="#trabajos">Ver fotos</a>
            </div>
          </div>
          <button type="button" className="pp-hero-ph" onClick={() => { setCat("todos"); setOpen(0); }} aria-label="Ampliar foto destacada">
            <img src={asset(WORKS[0].src)} alt={WORKS[0].alt} />
          </button>
        </div>

        <section className="pp-sec" id="trabajos" style={{ paddingTop: 16 }}>
          <div className="pp-h">
            <h2>Algunas de nuestras fotos</h2>
            <div className="pp-filters" role="group" aria-label="Filtrar por tipo de foto">
              {CATEGORIAS.map(([k, t]) => <button key={k} type="button" aria-pressed={cat === k} onClick={() => { setCat(k); }}>{t}</button>)}
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
            <li style={{ "--c": "var(--teal)" }}><b>1. Nos escribís</b><span>Contanos qué querés fotografiar: un partido, tu mascota, un evento…</span></li>
            <li style={{ "--c": "var(--yellow)" }}><b>2. Coordinamos</b><span>Fecha, lugar y qué tipo de fotos necesitás.</span></li>
            <li style={{ "--c": "var(--coral)" }}><b>3. Recibís tus fotos</b><span>Editadas y listas para compartir.</span></li>
          </ol>
        </section>

        <div className="pp-cta">
          <div><h2>¿Ya hiciste una sesión con nosotras?</h2><p>Pedinos el estado del proyecto y te contamos cómo va.</p></div>
          <Link className="btn btn-navy" to="/#contacto" state={PAQUETE}>Solicitar el estado <span aria-hidden="true">→</span></Link>
        </div>
      </main>
      <footer className="pp-footer"><div className="wrap"><span>© 2026 Kinima Photography · Fondos para el desarrollo de Kinima</span><span style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}><a href="mailto:contacto@kinima.uy">contacto@kinima.uy</a><a href="https://www.instagram.com/kinima.uy/" target="_blank" rel="noopener noreferrer">Instagram @kinima.uy</a><Link to="/">Volver a Kinima</Link></span></div></footer>
      {open >= 0 && <Lightbox i={open} lista={lista} onClose={() => setOpen(-1)} onMove={move} />}
    </>
  );
}
