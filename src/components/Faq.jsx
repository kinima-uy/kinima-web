import { useState } from "react";
import { SecHead } from "./Sections.jsx";
import { SHOW_PHOTOGRAPHY } from "../config.js";

const WHO = { all: "General", fam: "Familias", pro: "Profesionales", spo: "Sponsors" };
const FAQS = [
  { c: "all", q: "¿Qué es Kinima?", a: "Un sistema en desarrollo que busca dar continuidad a la rehabilitación infantil en el hogar. Combina un dispositivo, un juego en la tele, una app para la familia y un portal para el profesional." },
  { c: "all", q: "¿Qué tiene que ver Teletón con Kinima?", a: "Kinima cuenta con el asesoramiento de profesionales de Teletón, que nos ayudan a entender la rehabilitación infantil y lo que pasa en casa entre sesiones. No es un producto de Teletón ni tenemos un convenio formal: es nuestro proyecto, pensado junto a su experiencia." },
  { c: "all", q: "¿Kinima ya está disponible?", a: "Todavía no. Estamos en etapa de prototipado y planeamos pruebas entre diciembre de 2026 y febrero de 2027." },
  { c: "all", q: "¿Dónde trabajan?", a: "Somos de Montevideo, Uruguay. El proyecto nace en la Universidad ORT Uruguay y las primeras pruebas van a ser en Uruguay." },
  { c: "fam", q: "¿Cualquiera puede acceder al kit?", a: "La idea es que el kit llegue a cada familia a través de su profesional o centro de rehabilitación, que es quien decide si Kinima es adecuado para ese niño y arma su rutina. Si te interesa, dejanos tu contacto y te avisamos cuando haya novedades." },
  { c: "fam", q: "¿Cuánto vale el kit?", a: "Todavía no tiene precio. Lo vamos a definir después de las pruebas, con el objetivo de que sea lo más accesible posible." },
  { c: "all", q: "¿Cómo funciona el dispositivo?", a: "Es un dispositivo que se conecta a la tele de casa. Funciona con una Raspberry Pi 5 y una cámara que reconoce el movimiento del niño mientras juega, sin sensores ni cables en el cuerpo." },
  { c: "fam", q: "¿Qué se necesita en casa?", a: "La idea es que alcance con el dispositivo Kinima, una tele y un celular para la app familiar. Lo vamos a confirmar durante las pruebas." },
  { c: "fam", q: "¿Kinima reemplaza la rehabilitación profesional?", a: "No. Kinima acompaña lo que pasa entre sesiones. El profesional sigue definiendo el tratamiento y las actividades." },
  { c: "pro", q: "¿Cómo puedo sumar Kinima a mis procesos de rehabilitación?", a: "Hoy, sumándote a las pruebas entre diciembre y febrero. Escribinos eligiendo \"Centro o institución\" o \"Profesional o familia\" y te contamos cómo participar y qué necesitamos de tu equipo." },
  { c: "pro", q: "¿Con qué hospitales o centros tienen convenios?", a: "Todavía no tenemos convenios formales. Contamos con el asesoramiento de profesionales de Teletón y estamos buscando centros y profesionales que quieran sumarse como aliados para las pruebas." },
  { c: "pro", q: "¿Cómo funcionaría con mis pacientes?", a: "Desde el portal elegís actividades y repeticiones para cada paciente. El niño las hace jugando en casa y vos ves cómo fue la semana para ajustar la rutina." },
  { c: "spo", q: "¿Quién apoya a Kinima?", a: "Nuestro sponsor principal es Robotec, que nos brinda las Raspberry Pi 5 con las que construimos el dispositivo. Además contamos con el asesoramiento de profesionales de Teletón." },
  { c: "spo", q: "¿Cómo puedo apoyar el proyecto?", a: "Como sponsor, como aliado institucional o con otras formas de apoyo como servicios, equipamiento o difusión." },
  { c: "spo", q: "¿Qué gana mi empresa al apoyar Kinima?", a: "Asociarse a un proyecto de innovación con impacto social, presencia de marca en la web y la presentación, y acceso a los avances. Las formas de reconocimiento las definimos juntos." },
  SHOW_PHOTOGRAPHY && { c: "spo", q: "Hice una sesión de fotos con Kinima Photography, ¿cómo sigo el proyecto?", a: "Escribinos eligiendo \"Ya hice una sesión de fotos\" en el formulario y te mandamos el estado actualizado del proyecto." },
  SHOW_PHOTOGRAPHY && { c: "spo", q: "¿Qué fotos hacen en Kinima Photography?", a: "Fotografía en general: deporte, mascotas, retratos, eventos y lo que se te ocurra. Escribinos con tu idea y lo hablamos." },
  { c: "all", q: "¿Cómo puedo contactar al equipo?", a: "Con el formulario de esta página, por mail a contacto@kinima.uy o por Instagram en @kinima.uy." },
].filter(Boolean);
const FILTERS = [["all", "Todas"], ["fam", "Familias"], ["pro", "Profesionales y centros"], ["spo", "Sponsors y colaboradores"]];

export default function Faq() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(0);
  const visible = FAQS.map((f, i) => ({ ...f, i })).filter((f) => filter === "all" || f.c === filter);

  const choose = (f) => {
    setFilter(f);
    const first = FAQS.findIndex((x) => f === "all" || x.c === f);
    setOpen(first);
  };

  return (
    <section id="preguntas" style={{ paddingTop: 132 }}>
      <div className="wrap faq">
        <SecHead eyebrow="Preguntas frecuentes" title="¿Tenés dudas sobre Kinima?" lead="Elegí tu perfil para ver las preguntas que más te sirven." style={{ margin: 0 }} />
        <div className="list">
          <div className="ffilter" role="group" aria-label="Filtrar preguntas">
            {FILTERS.map(([k, t]) => <button key={k} type="button" aria-pressed={filter === k} onClick={() => choose(k)}>{t}</button>)}
          </div>
          {visible.map((f) => {
            /* Una sola pregunta abierta a la vez; la respuesta se despliega con animación */
            const isOpen = open === f.i;
            return (
              <div key={f.q} className={`qa ${isOpen ? "open" : ""}`}>
                <h3 className="q">
                  <button type="button" id={`q-${f.i}`} aria-expanded={isOpen} aria-controls={`a-${f.i}`} onClick={() => setOpen(isOpen ? -1 : f.i)}>
                    <span className="q-t">{f.q}</span><span className="who">{WHO[f.c]}</span><span className="pm" aria-hidden="true">+</span>
                  </button>
                </h3>
                <div className="ans" id={`a-${f.i}`} role="region" aria-labelledby={`q-${f.i}`} inert={isOpen ? undefined : ""}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
