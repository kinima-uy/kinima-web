import { useEffect, useRef } from "react";

/* Puntito con el degradado de Kinima que sigue al mouse y crece sobre lo que se puede tocar. */
export default function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const c = ref.current;
    let x = -100, y = -100, cx = -100, cy = -100, raf;
    const move = (e) => { x = e.clientX; y = e.clientY; c.style.opacity = "1"; };
    const leave = () => { c.style.opacity = "0"; };
    const over = (e) => c.classList.toggle("big", !!e.target.closest("a,button,summary,label,input,textarea,.node,.tv"));
    const loop = () => { cx += (x - cx) * .22; cy += (y - cy) * .22; c.style.transform = `translate(${cx}px,${cy}px)`; raf = requestAnimationFrame(loop); };
    addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerover", over);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); document.removeEventListener("pointerover", over); };
  }, []);
  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
