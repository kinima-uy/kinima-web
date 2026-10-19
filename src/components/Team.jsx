import { SecHead } from "./Sections.jsx";
import { asset } from "../lib/brand.jsx";
import { Icon } from "../lib/icon.jsx";

const LinkedIn = () => (
  <Icon name="linkedin" size={18} />
);

/* Para sumar la foto de Carolina: guardala en /public/carolina.jpg y poné photo: asset("carolina.jpg"). */
const TEAM = [
  {
    name: "Sol Alexandrovic", short: "Sol", role: "Diseño y desarrollo", photo: asset("sol.jpg"),
    bio: "Estudiante avanzada de Diseño Multimedia en la Universidad ORT Uruguay y diseñadora web. En Kinima lidera la experiencia de usuario y la identidad, y programa los sistemas: diseñó la marca y el sistema de diseño, y diseña y desarrolla las apps para familias y profesionales con foco en la accesibilidad.",
    skills: ["UX/UI", "Programación", "Branding", "Sistema de diseño", "Accesibilidad"],
    linkedin: "https://www.linkedin.com/in/solalexandrovic/",
  },
  {
    name: "Carolina Aizenstat", short: "Carolina", role: "Tecnología y producto", photo: asset("carolina.jpg"),
    bio: "Estudiante de Diseño Multimedia en la Universidad ORT Uruguay. En Kinima lidera la parte física y técnica: el hardware y la electrónica del dispositivo, el tracking del movimiento y el diseño industrial.",
    skills: ["Hardware", "Electrónica", "Tracking", "Diseño industrial"],
    linkedin: "https://www.linkedin.com/in/carolina-aizenstat-a446b32ab/",
  },
];

export default function Team() {
  return (
    <section className="waved" id="equipo">
      <div className="wrap">
        <SecHead eyebrow="Detrás del proyecto" title="Conocé al equipo." lead="Somos Sol y Carolina. Nos complementamos: una desde el diseño y la programación de los sistemas, otra desde el hardware y el producto, y el audiovisual y la web los hacemos juntas. Kinima es nuestro proyecto final de Diseño Multimedia en la Universidad ORT Uruguay, desarrollado con el asesoramiento de profesionales de Teletón." />
        <div className="team">
          {TEAM.map((m) => (
            <article className="m" key={m.name}>
              <div className="photo-frame">
                {m.photo
                  ? <img src={m.photo} alt={m.name} width="150" height="150" loading="lazy" />
                  : <div className="ph" role="img" aria-label={`Foto de ${m.short}, próximamente`}>{m.short[0]}</div>}
              </div>
              <div className="m-body">
                <p className="role">{m.role}</p>
                <h3>{m.name}</h3>
                <p>{m.bio}</p>
                <div className="skills">{m.skills.map((s) => <span key={s}>{s}</span>)}</div>
                <a className="li-btn" href={m.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn />LinkedIn de {m.short}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
