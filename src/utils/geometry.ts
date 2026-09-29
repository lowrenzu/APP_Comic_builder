export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function boundsOf(boxes: Box[]): Box {
  if (!boxes.length) return { x: 10, y: 10, w: 30, h: 30 };
  const x = Math.min(...boxes.map((b) => b.x));
  const y = Math.min(...boxes.map((b) => b.y));
  const right = Math.max(...boxes.map((b) => b.x + b.w));
  const bottom = Math.max(...boxes.map((b) => b.y + b.h));
  return { x, y, w: Math.max(2, right - x), h: Math.max(2, bottom - y) };
}

export function resizeBox(
  start: Box,
  handle: string,
  dx: number,
  dy: number,
  shift: boolean,
  aspect: number,
): Box {
  let x = start.x;
  let y = start.y;
  let w = start.w;
  let h = start.h;
  if (handle.includes("e")) w = start.w + dx;
  if (handle.includes("s")) h = start.h + dy;
  if (handle.includes("w")) {
    x = start.x + dx;
    w = start.w - dx;
  }
  if (handle.includes("n")) {
    y = start.y + dy;
    h = start.h - dy;
  }
  if (w < 0) {
    x += w;
    w = -w;
  }
  if (h < 0) {
    y += h;
    h = -h;
  }
  if (shift && aspect > 0) {
    const nh = w / aspect;
    if (handle.includes("n") && !handle.includes("s")) y = start.y + start.h - nh;
    h = Math.abs(nh);
  }
  return { x, y, w: Math.max(2, w), h: Math.max(2, h) };
}

export function localDelta(
  dxPct: number,
  dyPct: number,
  panelW: number,
  panelH: number,
  rotation: number,
): { dx: number; dy: number } {
  const dxPx = (dxPct / 100) * panelW;
  const dyPx = (dyPct / 100) * panelH;
  const r = (-rotation * Math.PI) / 180;
  const lx = dxPx * Math.cos(r) - dyPx * Math.sin(r);
  const ly = dxPx * Math.sin(r) + dyPx * Math.cos(r);
  return { dx: (lx / panelW) * 100, dy: (ly / panelH) * 100 };
}

/** Aimante le bord, le centre ou le bord opposé sur les guides. */
export function snapPosition(box: Box, guidesX: number[], guidesY: number[], threshold = 1.8): Box {
  const snap = (start: number, size: number, guides: number[]) => {
    const points = [start, start + size / 2, start + size];
    let shift = 0;
    let best = threshold;
    for (const point of points) {
      for (const guide of guides) {
        const dist = Math.abs(point - guide);
        if (dist < best) {
          best = dist;
          shift = guide - point;
        }
      }
    }
    return start + shift;
  };
  return { ...box, x: snap(box.x, box.w, guidesX), y: snap(box.y, box.h, guidesY) };
}
