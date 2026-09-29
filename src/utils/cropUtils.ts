import type { CSSProperties } from "react";
import type { CropRect, MaskShape } from "@/types";

export const FULL_CROP: CropRect = { x: 0, y: 0, w: 1, h: 1 };

export function cropImageStyle(crop: CropRect): CSSProperties {
  const w = Math.max(0.02, crop.w);
  const h = Math.max(0.02, crop.h);
  return {
    position: "absolute",
    width: `${100 / w}%`,
    height: `${100 / h}%`,
    left: `${(-crop.x / w) * 100}%`,
    top: `${(-crop.y / h) * 100}%`,
    maxWidth: "none",
    objectFit: "fill",
  };
}

/** Fill a frame without stretching. A partial crop recenters and zooms. */
export function coverImageStyle(crop: CropRect): CSSProperties {
  const cx = (crop.x + crop.w / 2) * 100;
  const cy = (crop.y + crop.h / 2) * 100;
  const zoom = 1 / Math.max(0.12, Math.max(crop.w, crop.h));
  return {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: `${cx}% ${cy}%`,
    transform: zoom > 1.04 ? `scale(${Math.min(zoom, 5)})` : undefined,
    transformOrigin: `${cx}% ${cy}%`,
  };
}

export function maskToClip(mask: MaskShape | null): string | undefined {
  if (!mask) return undefined;
  if (mask.type === "ellipse") {
    const cx = (mask.x + mask.w / 2) * 100;
    const cy = (mask.y + mask.h / 2) * 100;
    return `ellipse(${Math.max(1, mask.w * 50)}% ${Math.max(1, mask.h * 50)}% at ${cx}% ${cy}%)`;
  }
  if (mask.type === "free" && mask.points && mask.points.length >= 3) {
    return `polygon(${mask.points.map((p) => `${p.x * 100}% ${p.y * 100}%`).join(", ")})`;
  }
  const top = mask.y * 100;
  const right = (1 - mask.x - mask.w) * 100;
  const bottom = (1 - mask.y - mask.h) * 100;
  const left = mask.x * 100;
  return `inset(${top}% ${Math.max(0, right)}% ${Math.max(0, bottom)}% ${left}%)`;
}