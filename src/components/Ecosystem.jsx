import { useEffect, useRef, useState } from "react";
import { useMotion, useLatest } from "../lib/motion.jsx";
import { Iso, COLORS } from "../lib/brand.jsx";
import { SecHead } from "./Sections.jsx";
import { Icon } from "../lib/icon.jsx";

const NS = "http://www.w3.org/2000/svg";
const NODES = [
  { id: "tv", area: "tv", c: "var(--teal)", t: "var(--tint-teal)", col: COLORS.teal, title: "Experiencia en TV", sub: "Juego y movimiento",
    text: "El niño juega en la tele de su casa. El dispositivo lee su movimiento y lo transforma en desafíos que responden a lo que hace, con la personita de Kinima como guía.",
    icon: "tele" },
  { id: "app", area: "app", c: "var(--yellow)", t: "var(--tint-yellow)", col: COLORS.yellow, title: "Aplicación familiar", sub: "Acompañamiento en casa",
    text: "La familia ve la rutina del día, recibe recordatorios y tiene una guía clara para acompañar. También puede comunicarse con el profesional.",
    icon: "celular" },
  { id: "pro", area: "pro", c: "var(--coral)", t: "var(--tint-coral)", col: COLORS.coral, title: "Portal profesional", sub: "Planificación y seguimiento",
    text: "El profesional propone actividades para cada niño, consulta cómo fue la semana y ajusta la rutina antes de la próxima sesión.",
    icon: "compu" },
];

export default function Ecosystem() {
  const [sel, setSel] = useState(0);
  const { paused } = useMotion();
  const pausedRef = useLatest(paused), selRef = useLatest(sel);
  const ecoRef = useRef(null), svgRef = useRef(null), devRef = useRef(null), nodeRefs = useRef([]), items = useRef([]);

  useEffect(() => {
    const eco = ecoRef.current, svg = svgRef.current;
    let vis = false, t = 0, prev = performance.now(), raf, rt;
    const io = new IntersectionObserver((es) => { vis = es[0].isIntersecting; }); io.observe(eco);
    const build = () => {
      svg.replaceChildren(); items.current = [];
      if (getComputedStyle(svg).display === "none") return;
      const r = eco.getBoundingClientRect(); svg.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
      const c = devRef.current.getBoundingClientRect(), cx = c.left + c.width / 2 - r.left, cy = c.top + c.height / 2 - r.top;
      nodeRefs.current.forEach((n, i) => {
        const b = n.getBoundingClientRect(), nx = b.left + b.width / 2 - r.left, ny = b.top + b.height / 2 - r.top, mx = (cx + nx) / 2;
        const d = Math.abs(nx - cx) < 20 ? `M${cx} ${cy} L ${nx} ${ny}` : `M${cx} ${cy} C ${mx} ${cy}, ${mx} ${ny}, ${nx} ${ny}`;
        const p = document.createElementNS(NS, "path");
        p.setAttribute("d", d); p.setAttribute("fill", "none"); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-dasharray", "2 12");
        const k = document.createElementNS(NS, "circle"); k.setAttribute("r", "5"); k.setAttribute("fill", NODES[i].col);
        svg.append(p, k);
        items.current.push({ p, k, len: p.getTotalLength() });
      });
      paint(selRef.current);
    };
    const loop = (now) => {
      const dt = Math.min(.05, (now - prev) / 1000); prev = now;
      const it = items.current[selRef.current];
      if (vis && it) {
        if (!pausedRef.current) t += dt;
        let f = (t * .35) % 1; if (selRef.current === 1) f = 1 - f;
        const pt = it.p.getPointAtLength(it.len * f); it.k.setAttribute("cx", pt.x); it.k.setAttribute("cy", pt.y);
      }
      raf = requestAnimationFrame(loop);
    };
    const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(build, 120); }); ro.observe(eco);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); clearTimeout(rt); };
  }, [pausedRef, selRef]);

  function paint(s) {
    items.current.forEach((it, i) => {
      const on = i === s;
      it.p.setAttribute("stroke", on ? NODES[i].col : COLORS.navy); it.p.setAttribute("stroke-width", on ? 4 : 3);
      it.p.setAttribute("stroke-opacity", on ? 1 : .15); it.k.setAttribute("opacity", on ? 1 : 0);
    });
  }
  useEffect(() => paint(sel), [sel]);

  const node = (n, i) => (
    <button key={n.id} type="button" className="node" ref={(el) => (nodeRefs.current[i] = el)} aria-pressed={sel === i} onClick={() => setSel(i)}
      style={{ gridArea: n.area, "--c": n.c, "--t": n.t }}>
      <span className="node-ico"><Icon name={n.icon} size={28} /></span>
      <span className="node-t">{n.title}</span><span className="node-s">{n.sub}</span>
    </button>
  );

  return (
    <section className="waved" id="ecosistema">
      <div className="wrap">
        <SecHead eyebrow="Ecosistema Kinima" title="Tres experiencias, un mismo sistema." lead="Kinima no es solamente un juego: es un conjunto de experiencias conectadas alrededor de un dispositivo en el hogar. Tocá cada parte para conocerla." />
        <div className="eco" ref={ecoRef}>
          <svg className="eco-lines" ref={svgRef} aria-hidden="true" />
          {node(NODES[0], 0)}
          {node(NODES[1], 1)}
          <div className="core" style={{ gridArea: "core" }}>
            <div className="device" ref={devRef} aria-hidden="true"><span className="led" /><Iso color={COLORS.cream} width={34} /></div>
            <p className="core-t">Dispositivo Kinima</p>
            <p className="core-s">El componente que conecta la experiencia interactiva con el hogar.</p>
          </div>
          {node(NODES[2], 2)}
        </div>
        <div className="eco-detail" aria-live="polite">
          <p className="eyebrow">{NODES[sel].title}</p>
          <p className="eco-txt">{NODES[sel].text}</p>
        </div>
      </div>
    </section>
  );
}
