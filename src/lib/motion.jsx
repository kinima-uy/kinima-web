import { createContext, useContext, useEffect, useState } from "react";
import { gsap } from "gsap";

/* Pausa global de movimiento (accesibilidad). Arranca pausado si el sistema pide reducir movimiento. */
const MotionContext = createContext({ paused: false, setPaused: () => {} });

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(prefersReduced);
  useEffect(() => {
    document.documentElement.classList.toggle("still", paused);
    paused ? gsap.globalTimeline.pause() : gsap.globalTimeline.resume();
  }, [paused]);
  return <MotionContext.Provider value={{ paused, setPaused }}>{children}</MotionContext.Provider>;
}

export const useMotion = () => useContext(MotionContext);

export function MotionToggle() {
  const { paused, setPaused } = useMotion();
  const label = paused ? "Activar movimiento" : "Pausar movimiento";
  return (
    <button type="button" className="motion-toggle" aria-pressed={paused} aria-label={label} onClick={() => setPaused(!paused)}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        {paused ? <path d="M8 5l11 7-11 7z" fill="currentColor" stroke="none" /> : <path d="M9 6v12M15 6v12" />}
      </svg>
      <span>{label}</span>
    </button>
  );
}

/** Ref que siempre refleja el último valor (para loops con requestAnimationFrame). */
export function useLatest(value) {
  const [ref] = useState(() => ({ current: value }));
  ref.current = value;
  return ref;
}
