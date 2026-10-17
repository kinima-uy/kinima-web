import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Header, Hero, Challenge, Proposal, Audiences, Status, Footer } from "../components/Sections.jsx";
import { Trail } from "../components/Ambient.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Ecosystem from "../components/Ecosystem.jsx";
import Device from "../components/Device.jsx";
import { MainSponsor } from "../components/Robotec.jsx";
import { Support, PhotoTeaser } from "../components/Support.jsx";
import Team from "../components/Team.jsx";
import Faq from "../components/Faq.jsx";
import Contact, { ContactPresetProvider } from "../components/Contact.jsx";
import { prefersReduced } from "../lib/motion.jsx";
import { SHOW_PHOTOGRAPHY } from "../config.js";

/* Entradas suaves al hacer scroll (solo para lo que está debajo de la primera pantalla). */
function useReveal(rootRef) {
  useEffect(() => {
    if (prefersReduced()) return;
    const sel = ".sec-head,.start > *,.c,.pl,.vs,.e,.tl li,.how,.eco,.s,.photo > *,.m,.contact,.device-fig,.spec,.ms";
    const els = [...rootRef.current.querySelectorAll(sel)];
    const obs = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const el = e.target, i = Math.min([...el.parentElement.children].indexOf(el), 4);
      el.style.transition = `transform .8s cubic-bezier(.2,.8,.3,1) ${i * .07}s, opacity .8s ease ${i * .07}s`;
      el.style.transform = ""; el.style.opacity = "";
      setTimeout(() => { el.style.transition = ""; }, 1300);
    }), { threshold: .1 });
    els.forEach((el) => { if (el.getBoundingClientRect().top > innerHeight) { el.style.transform = "translateY(28px)"; el.style.opacity = ".35"; obs.observe(el); } });
    return () => obs.disconnect();
  }, [rootRef]);
}

export default function Home() {
  const mainRef = useRef(null);
  const { hash, state } = useLocation();
  useReveal(mainRef);
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60);
    else window.scrollTo(0, 0);
  }, [hash]);

  return (
    <ContactPresetProvider initial={state?.motivo ? state : null}>
      <Header />
      <main ref={mainRef}>
        <Trail containerRef={mainRef} />
        <Hero />
        <Challenge />
        <Proposal />
        <HowItWorks />
        <Ecosystem />
        <Device />
        <MainSponsor />
        <Audiences />
        <Status />
        <Support />
        {SHOW_PHOTOGRAPHY && <PhotoTeaser />}
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </ContactPresetProvider>
  );
}
