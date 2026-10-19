/* Íconos: MingCute, la familia iconográfica de Kinima (manual de marca, p. 35). */
import { MINGCUTE } from "./mingcute.js";

export function Icon({ name, size = 24, color = "currentColor", ...rest }) {
  const d = MINGCUTE[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillRule="evenodd" aria-hidden="true" {...rest}>
      {d && d.map((x, i) => <path key={i} d={x} />)}
    </svg>
  );
}
