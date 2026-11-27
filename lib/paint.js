import { SHEET, SW, SH, CW, CH, PAD, BW, ROWY, POLY } from './data';

export function paint(el, k) {
  if (!el) return;
  const ew = el.offsetWidth, eh = el.offsetHeight;
  if (!ew || !eh) return;
  const sx = ew / BW, sy = eh / CH;
  const bx = (k % 5) * CW - PAD, by = ROWY[Math.floor(k / 5)];
  const s = el.style;
  s.backgroundImage = `url("${SHEET}")`;
  s.backgroundSize = `${SW * sx}px ${SH * sy}px`;
  s.backgroundPosition = `${-bx * sx}px ${-by * sy}px`;
  s.clipPath = POLY[k];
}