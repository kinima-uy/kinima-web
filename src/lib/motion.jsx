import { createContext, useContext, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Icon } from "./icon.jsx";

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
      <Icon name={paused ? "play" : "pausa"} size={18} />
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
