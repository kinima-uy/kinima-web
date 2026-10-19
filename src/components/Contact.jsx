import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PersonParts, PERSON_VIEWBOX, personRefs, HIP } from "../lib/brand.jsx";
import { burst } from "./Game.jsx";
import { SHOW_PHOTOGRAPHY, WEB3FORMS_KEY } from "../config.js";
import { Icon } from "../lib/icon.jsx";

/* ---------- motivo preseleccionado desde otros botones de la página ---------- */
const PresetContext = createContext({ preset: { motivo: "Sponsor", msg: "", n: 0 }, setPreset: () => {} });
export function ContactPresetProvider({ initial, children }) {
  const [preset, setPreset] = useState({ motivo: initial?.motivo || "Sponsor", msg: initial?.msg || "", n: initial ? 1 : 0 });
  return <PresetContext.Provider value={{ preset, setPreset }}>{children}</PresetContext.Provider>;
}
export function useContactPreset() {
  const { setPreset } = useContext(PresetContext);
  return (motivo, msg = "") => setPreset((p) => ({ motivo, msg, n: p.n + 1 }));
}

const ALL_ROLES = [["Sponsor", "Sponsor o empresa"], ["Centro", "Centro o institución"], ["Profesional", "Profesional o familia"], ["Fotos", "Pedir una sesión de fotos"], ["Paquete", "Ya hice una sesión de fotos"], ["Otra", "Otra colaboración"]];
const ROLES = ALL_ROLES.filter(([v]) => SHOW_PHOTOGRAPHY || (v !== "Paquete" && v !== "Fotos"));
const VALID = {
  nombre: (v) => v.trim().length > 1,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  mensaje: (v) => v.trim().length > 2,
};
const ERR = { nombre: "Escribí tu nombre.", email: "Revisá el email, parece incompleto.", mensaje: "Contanos en una línea qué te gustaría saber." };

function thanksText(rol, email, org) {
  return {
    Sponsor: `Recibimos tu interés en apoyar Kinima${org ? ` desde ${org}` : ""}. Te escribimos a ${email} para coordinar una presentación del proyecto.`,
    Centro: `Recibimos tu consulta${org ? ` de ${org}` : ""}. Te escribimos a ${email} para conversar sobre una posible alianza y las pruebas.`,
    Profesional: `Recibimos tu consulta. Te escribimos a ${email} para contarte cómo participar de las pruebas.`,
    Fotos: `¡Gracias! Te escribimos a ${email} para coordinar la sesión y pasarte el precio.`,
    Paquete: `¡Gracias por apoyar Kinima con tu sesión de fotos! Te mandamos a ${email} el estado actualizado del proyecto.`,
    Otra: `Recibimos tu mensaje. Te escribimos a ${email} para ver juntas cómo podés sumarte.`,
  }[rol];
}

/*
 * Envío con Netlify Forms: en Netlify, cada consulta queda en Forms y te puede llegar por mail.
 * El formulario "espejo" que Netlify necesita detectar está en /index.html.
 */
export default function Contact() {
  const { preset } = useContext(PresetContext);
  const [values, setValues] = useState({ rol: preset.motivo, nombre: "", email: "", organizacion: "", mensaje: preset.msg });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);
  const thanksRef = useRef(null);

  useEffect(() => {
    if (!preset.n) return;
    setSent(null);
    setValues((v) => ({ ...v, rol: preset.motivo, mensaje: preset.msg || v.mensaje }));
  }, [preset]);

  const set = (k) => (e) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: !VALID[k](v) }));
  };
  const blur = (k) => () => values[k] && setErrors((er) => ({ ...er, [k]: !VALID[k](values[k]) }));

  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const er = Object.fromEntries(Object.keys(VALID).map((k) => [k, !VALID[k](values[k])]));
    setErrors(er);
    const bad = Object.keys(er).find((k) => er[k]);
    if (bad) { document.getElementById(`f-${bad}`)?.focus(); return; }
    setSending(true); setFailed(false);
    if (!import.meta.env.VITE_PREVIEW) try {
      let res;
      // En Netlify (kinima.netlify.app) se usa Netlify Forms; en Vercel y kinima.uy, Web3Forms.
      const onNetlify = location.hostname.endsWith("netlify.app");
      if (WEB3FORMS_KEY && !onNetlify) {
        // Vercel (u otro hosting): la consulta se envía con Web3Forms y llega por mail.
        const motivo = (ALL_ROLES.find(([v]) => v === values.rol) || [, values.rol])[1];
        res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `Nueva consulta en la web de Kinima · ${motivo}`,
            from_name: "Web de Kinima",
            replyto: values.email.trim(),
            Motivo: motivo, Nombre: values.nombre, Email: values.email, "Organización": values.organizacion || "-", Mensaje: values.mensaje,
            botcheck: e.target.querySelector('[name="bot-field"]')?.value || "",
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!data.success) throw new Error("web3forms");
      } else {
        const body = new URLSearchParams({ "form-name": "contacto", ...values }).toString();
        res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      }
      // En la web publicada solo se agradece si Netlify recibió la consulta.
      // En la compu (localhost) no hay servidor de formularios, así que ahí se deja pasar.
      const local = ["localhost", "127.0.0.1"].includes(location.hostname);
      if (!res.ok && !local) throw new Error(res.status);
    } catch (err) {
      setSending(false); setFailed(true); return;
    }
    setSending(false);
    setSent({ nombre: values.nombre.trim().split(" ")[0], text: thanksText(values.rol, values.email.trim(), values.organizacion.trim()) });
  };

  useEffect(() => {
    if (!sent || !thanksRef.current) return;
    const T = personRefs(thanksRef.current);
    const ctx = gsap.context(() => {
      gsap.set([T.legR, T.legL], { svgOrigin: HIP });
      const tl = gsap.timeline({ repeat: 1, repeatDelay: .4 });
      tl.to(T.fig, { y: -80, duration: .35, ease: "power2.out" }).to(T.legR, { rotation: -28, duration: .3 }, "<").to(T.legL, { rotation: 28, duration: .3 }, "<")
        .to(T.fig, { y: 0, duration: .32, ease: "power2.in" }).to([T.legR, T.legL], { rotation: 0, duration: .3 }, "<");
      burst(T.fx, tl, .3, 213.5, 430, 10, 110, 9);
    });
    return () => ctx.revert();
  }, [sent]);

  const reset = () => { setValues({ rol: "Sponsor", nombre: "", email: "", organizacion: "", mensaje: "" }); setErrors({}); setSent(null); setTimeout(() => document.getElementById("f-nombre")?.focus(), 0); };

  const field = (k, label, type = "text", ac) => (
    <div className={`field ${errors[k] ? "bad" : ""}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input id={`f-${k}`} name={k} type={type} autoComplete={ac} value={values[k]} onChange={set(k)} onBlur={blur(k)} aria-invalid={!!errors[k]} />
      <span className="err">{ERR[k]}</span>
    </div>
  );

  return (
    <section id="contacto" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="contact">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p className="eyebrow">Contacto</p>
            <h2>¿Querés ser parte de Kinima?</h2>
            <span className="gline" />
            <p className="lead">Si te interesa conocer más, colaborar o explorar una posible alianza, nos encantaría conversar.</p>
            <div className="channels">
              <a className="mail" href="mailto:kinima.uruguay@gmail.com">
                <Icon name="mail" size={20} />
                kinima.uruguay@gmail.com
              </a>
              <a className="mail" href="https://www.instagram.com/kinima.uy/" target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" size={20} />
                @kinima.uy
              </a>
            </div>
          </div>
          <div>
            {!sent ? (
              <form name="contacto" method="POST" noValidate onSubmit={submit}>
                <fieldset>
                  <legend>Me interesa Kinima como…</legend>
                  <div className="roles">
                    {ROLES.map(([v, t]) => (
                      <span key={v} style={{ display: "contents" }}>
                        <input type="radio" name="rol" id={`r-${v}`} value={v} checked={values.rol === v} onChange={set("rol")} />
                        <label htmlFor={`r-${v}`}>{t}</label>
                      </span>
                    ))}
                  </div>
                </fieldset>
                <div className="f2">{field("nombre", "Nombre", "text", "name")}{field("email", "Email", "email", "email")}</div>
                <div className="field">
                  <label htmlFor="f-organizacion">Organización <span className="opt">(opcional)</span></label>
                  <input id="f-organizacion" name="organizacion" type="text" autoComplete="organization" value={values.organizacion} onChange={set("organizacion")} />
                </div>
                <div className={`field ${errors.mensaje ? "bad" : ""}`}>
                  <label htmlFor="f-mensaje">Mensaje</label>
                  <textarea id="f-mensaje" name="mensaje" value={values.mensaje} onChange={set("mensaje")} onBlur={blur("mensaje")} aria-invalid={!!errors.mensaje} />
                  <span className="err">{ERR.mensaje}</span>
                </div>
                <p className="privacy" id="privacidad">Usamos tus datos solo para responder tu consulta. No los compartimos con nadie.</p>
                {failed && <p className="err-box" role="alert">No pudimos enviar tu consulta. Revisá tu conexión y probá de nuevo.</p>}
                <button className="btn btn-navy" type="submit" style={{ alignSelf: "flex-start" }} disabled={sending}>{sending ? "Enviando…" : <>Enviar consulta <span aria-hidden="true">→</span></>}</button>
              </form>
            ) : (
              <div className="sent" aria-live="polite">
                <svg ref={thanksRef} viewBox={PERSON_VIEWBOX} width="120" aria-hidden="true" style={{ overflow: "visible" }}><PersonParts /></svg>
                <h3>¡Gracias, {sent.nombre}!</h3>
                <p>{sent.text}</p>
                <button className="btn btn-navy" type="button" onClick={reset}>Enviar otra consulta</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
