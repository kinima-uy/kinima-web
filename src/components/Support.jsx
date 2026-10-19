import { Link } from "react-router-dom";
import { BlobField } from "./Ambient.jsx";
import { SecHead, Check } from "./Sections.jsx";
import { useContactPreset } from "./Contact.jsx";
import { asset } from "../lib/brand.jsx";
import { Icon } from "../lib/icon.jsx";

const GROUPS = [
  {
    motivo: "Sponsor", bg: "var(--teal)", title: "Sponsors", text: "Empresas que quieran apoyar el desarrollo del dispositivo, las apps y las pruebas.",
    gainTitle: "Qué gana tu empresa",
    gains: ["Asociar tu marca a un proyecto de innovación con impacto social en la infancia.", "Presencia de tu marca en la web, la presentación final y los materiales del proyecto.", "Contenido real para comunicar tu responsabilidad social.", "Invitación a la presentación del sistema y acceso a los avances."],
    icon: "centro",
  },
  {
    motivo: "Centro", bg: "var(--yellow)", title: "Alianzas", text: "Centros, profesionales y organizaciones que quieran conocer la propuesta y sumarse a las pruebas.",
    gainTitle: "Qué gana tu equipo",
    gains: ["Probar Kinima antes que nadie con sus pacientes.", "Co-diseñar las herramientas según cómo trabajan.", "Más información sobre lo que pasa en casa entre sesiones.", "Reconocimiento como institución aliada del proyecto."],
    icon: "checkCirculo",
  },
  {
    motivo: "Otra", bg: "var(--coral)", title: "Otras formas de apoyo", text: "Contribuciones, servicios, equipamiento o ayuda para difundir el proyecto.",
    gainTitle: "Qué ganás vos",
    gains: ["Ser parte de un proyecto que acompaña a niños en su rehabilitación.", "Enterarte primero de los avances y novedades.", "Aparecer en los agradecimientos del proyecto."],
    icon: "corazon",
  },
];

export function Support() {
  const preset = useContactPreset();
  return (
    <section className="apoya" id="apoya">
      <BlobField preset="apoya" />
      <div className="wrap">
        <SecHead eyebrow="Sumate a Kinima" title="Ayudanos a que el movimiento continúe." lead="Kinima está en desarrollo y buscamos personas, empresas e instituciones que quieran acompañarnos en esta etapa. Apoyar Kinima es ganar también." />
        <div className="sup">
          {GROUPS.map((g) => (
            <article className="s" key={g.title}>
              <span className="s-ico" style={{ background: g.bg }}><Icon name={g.icon} size={26} color="#19324A" /></span>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
              <div className="gain">
                <p>{g.gainTitle}</p>
                <ul>{g.gains.map((x) => <li key={x}><Check color="#F2C96D" size={16} />{x}</li>)}</ul>
              </div>
              <a href="#contacto" className="s-link" onClick={() => preset(g.motivo)}>Conversemos <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
        <div className="sup-ctas">
          <a className="btn btn-cream" href="#contacto" onClick={() => preset("Sponsor")}>Quiero apoyar Kinima <span aria-hidden="true">→</span></a>
        </div>
        <p className="sup-note">Las formas de reconocimiento se definen junto a cada sponsor o aliado, según el tipo de apoyo.</p>
      </div>
    </section>
  );
}

export function PhotoTeaser() {
  const preset = useContactPreset();
  return (
    <section id="fotografia">
      <div className="wrap photo">
        <div className="photo-copy">
          <p className="eyebrow">Kinima Photography</p>
          <h2>También financiamos Kinima con fotografía.</h2>
          <span className="gline" />
          <p className="lead">Hacemos fotografía en general: deporte, mascotas, retratos, eventos y lo que se te ocurra. Lo que recaudamos se usa para desarrollar Kinima. Contanos tu idea y lo hablamos.</p>
          <div className="photo-ctas"><Link className="btn btn-navy" to="/fotografia">Ver Kinima Photography <span aria-hidden="true">→</span></Link></div>
          <div className="pkg-box">
            <strong>¿Ya hiciste una sesión con nosotras?</strong>
            <p>Gracias por ser parte. Podés pedirnos el estado del proyecto cuando quieras y te contamos cómo va.</p>
            <a href="#contacto" className="s-link" style={{ color: "var(--tealtx)", paddingTop: 0 }} onClick={() => preset("Paquete", "Hola, hice una sesión de fotos con Kinima Photography y me gustaría recibir el estado del proyecto.")}>Solicitar el estado del proyecto <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <Link className="collage" to="/fotografia" aria-label="Ver las fotos de Kinima Photography">
          <img className="a" src={asset("fotografia/mascotas-01.jpg")} alt="" loading="lazy" />
          <img className="b" src={asset("fotografia/handball-01.jpg")} alt="" loading="lazy" />
          <img className="c2" src={asset("fotografia/handball-09.jpg")} alt="" loading="lazy" />
        </Link>
      </div>
    </section>
  );
}
