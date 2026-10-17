import { SecHead } from "./Sections.jsx";
import { asset } from "../lib/brand.jsx";

const LinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" /></svg>
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
