import { bubblePreset } from "@/data/bubbles";
import type { Asset, Layer, Page, Panel } from "@/types";
import { resolveSrc } from "@/utils/assetUtils";
import { resolveFont } from "@/utils/fonts";
import { childLayers } from "@/utils/layerUtils";

const imageCache = new Map<string, HTMLImageElement>();

function loadImage(src: string): Promise<HTMLImageElement | null> {
  if (!src) return Promise.resolve(null);
  const cached = imageCache.get(src);
  if (cached) return Promise.resolve(cached);
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function composite(mode: string): GlobalCompositeOperation {
  if (mode === "normal") return "source-over";
  return mode as GlobalCompositeOperation;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawBubble(ctx: CanvasRenderingContext2D, layer: Layer, x: number, y: number, w: number, h: number) {
  const preset = bubblePreset(layer.bubbleStyle);
  ctx.fillStyle = preset.fill;
  ctx.strokeStyle = preset.ink;
  ctx.lineWidth = Math.max(2, h * 0.04);
  const style = layer.bubbleStyle;
  if (style === "shout" || style === "scream" || style === "electric" || style === "boom" || style === "anger") {
    ctx.beginPath();
    const cx = x + w / 2;
    const cy = y + h / 2;
    const spikes = style === "electric" ? 18 : style === "boom" ? 12 : 14;
    for (let i = 0; i < spikes; i += 1) {
      const ang = (i / spikes) * Math.PI * 2 - Math.PI / 2;
      const rad = i % 2 === 0 ? 0.52 : 0.34;
      const px = cx + Math.cos(ang) * w * rad;
      const py = cy + Math.sin(ang) * h * rad;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (style === "narration" || style === "caption" || style === "banner" || style === "note" || style === "radio" || style === "location" || style === "chapter" || style === "glitch") {
    if (style === "chapter" || style === "banner") {
      ctx.fillRect(x, y + h * 0.16, w, h * 0.68);
    } else if (style === "glitch") {
      ctx.globalAlpha = 0.45;
      ctx.fillRect(x + 6, y + 8, w - 8, h - 14);
      ctx.globalAlpha = 1;
      ctx.fillRect(x, y + 4, w - 8, h - 14);
      ctx.strokeRect(x, y + 4, w - 8, h - 14);
    } else if (style === "location") {
      ctx.fillRect(x, y + h * 0.22, w, h * 0.56);
      ctx.fillStyle = preset.ink;
      ctx.fillRect(x, y + h * 0.22, 6, h * 0.56);
      ctx.strokeRect(x, y + h * 0.22, w, h * 0.56);
    } else {
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      if (style === "radio") ctx.strokeRect(x + 5, y + 5, Math.max(2, w - 10), Math.max(2, h - 10));
    }
  } else if (style === "whisper" || style === "icy" || style === "sleep") {
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w * 0.46, h * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
  } else if (style === "thought") {
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h * 0.42, w * 0.42, h * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + w * 0.28, y + h * 0.82, h * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (style === "oval" || style === "cloud" || style === "dark") {
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w * 0.46, h * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else {
    const radius = style === "square" || style === "tech" ? 4 : Math.min(w, h) * (style === "rounded" ? 0.4 : 0.28);
    const body = style === "rounded" || style === "classic" || style === "double" || style === "square" || style === "tech" ? 0.82 : 0.92;
    roundRect(ctx, x, y, w, h * body, radius);
    ctx.fill();
    ctx.stroke();
    if (style === "double") {
      roundRect(ctx, x + 5, y + 5, w - 10, h * 0.82 - 10, Math.max(4, radius - 4));
      ctx.stroke();
    }
    if (style === "classic" || style === "double" || style === "square" || style === "rounded" || style === "tech") {
      const tipX = ((layer.tailX ?? 28) / 100) * w;
      const tipY = ((layer.tailY ?? 100) / 100) * h;
      const len = layer.tailLen ?? 1;
      ctx.beginPath();
      ctx.moveTo(x + tipX - w * 0.08 * len, y + tipY - h * 0.24 * len);
      ctx.lineTo(x + tipX, y + tipY);
      ctx.lineTo(x + tipX + w * 0.14 * len, y + tipY - h * 0.18 * len);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
  drawLabel(ctx, layer, x + w * 0.08, y + h * 0.08, w * 0.84, h * 0.66);
}

function drawLabel(ctx: CanvasRenderingContext2D, layer: Layer, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = layer.color;
  ctx.textAlign = layer.align;
  ctx.textBaseline = "middle";
  const style = layer.italic ? "italic" : "normal";
  const family = resolveFont(layer.fontFamily, layer.type === "sfx" ? "sfx" : undefined);
  const weight = layer.type === "sfx" ? 400 : layer.fontWeight;
  ctx.font = `${style} ${weight} ${layer.fontSize}px ${family}`;
  const tx = layer.align === "left" ? x : layer.align === "right" ? x + w : x + w / 2;
  const lines = layer.text.split("\n");
  const lineH = layer.fontSize * 1.15;
  const start = y + h / 2 - ((lines.length - 1) * lineH) / 2;
  if (layer.type === "sfx") {
    ctx.lineWidth = Math.max(3, layer.fontSize * 0.08);
    ctx.strokeStyle = "#14181e";
    ctx.lineJoin = "round";
    for (let i = 0; i < lines.length; i += 1) {
      ctx.strokeText(lines[i], tx, start + i * lineH);
      ctx.fillText(lines[i], tx, start + i * lineH);
    }
    return;
  }
  for (let i = 0; i < lines.length; i += 1) ctx.fillText(lines[i], tx, start + i * lineH, w);
}

async function drawLayer(
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  layers: Layer[],
  assets: Asset[],
  blobUrls: Record<string, string>,
  px: number,
  py: number,
  pw: number,
  ph: number,
  alphaMul: number,
) {
  if (!layer.visible) return;
  if (layer.type === "group") {
    const kids = childLayers(layers, layer.panelId, layer.id);
    for (const kid of kids) await drawLayer(ctx, kid, layers, assets, blobUrls, px, py, pw, ph, alphaMul * layer.opacity);
    return;
  }
  const x = px + (layer.x / 100) * pw;
  const y = py + (layer.y / 100) * ph;
  const w = (layer.w / 100) * pw;
  const h = (layer.h / 100) * ph;
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alphaMul * layer.opacity));
  ctx.globalCompositeOperation = composite(layer.blendMode);
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate((layer.rotation * Math.PI) / 180);
  ctx.scale(layer.flipH ? -1 : 1, layer.flipV ? -1 : 1);
  const feather = layer.mask?.feather ?? 0;
  const soft = feather > 0 && layer.mask;
  ctx.beginPath();
  if (!soft && layer.mask?.type === "ellipse") {
    const m = layer.mask;
    ctx.ellipse(-w / 2 + (m.x + m.w / 2) * w, -h / 2 + (m.y + m.h / 2) * h, Math.max(1, (m.w * w) / 2), Math.max(1, (m.h * h) / 2), 0, 0, Math.PI * 2);
    ctx.clip();
  } else if (layer.mask?.type === "free" && layer.mask.points && layer.mask.points.length >= 3 && !soft) {
    const pts = layer.mask.points;
    ctx.moveTo(-w / 2 + pts[0].x * w, -h / 2 + pts[0].y * h);
    for (const p of pts.slice(1)) ctx.lineTo(-w / 2 + p.x * w, -h / 2 + p.y * h);
    ctx.closePath();
    ctx.clip();
  } else if (layer.mask?.type === "rect" && !soft) {
    const m = layer.mask;
    ctx.rect(-w / 2 + m.x * w, -h / 2 + m.y * h, m.w * w, m.h * h);
    ctx.clip();
  }
  if (layer.type === "image" && layer.assetId) {
    const image = await loadImage(resolveSrc(assets.find((a) => a.id === layer.assetId), blobUrls));
    if (image) {
      const crop = layer.crop;
      const sx = crop.x * image.width;
      const sy = crop.y * image.height;
      const sw = Math.max(1, crop.w * image.width);
      const sh = Math.max(1, crop.h * image.height);
      const bright = layer.brightness ?? 1;
      const contrast = layer.contrast ?? 1;
      if (bright !== 1 || contrast !== 1) ctx.filter = `brightness(${bright}) contrast(${contrast})`;
      ctx.drawImage(image, sx, sy, sw, sh, -w / 2, -h / 2, w, h);
      ctx.filter = "none";
      if ((layer.tintAmount ?? 0) > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "color";
        ctx.globalAlpha = Math.max(0, Math.min(1, layer.tintAmount ?? 0));
        ctx.fillStyle = layer.tint || "#ffffff";
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.restore();
      }
    }
  } else if (layer.type === "bubble") drawBubble(ctx, layer, -w / 2, -h / 2, w, h);
  else if (layer.type === "text" || layer.type === "sfx") drawLabel(ctx, layer, -w / 2, -h / 2, w, h);
  if (soft && layer.mask) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-in";
    ctx.filter = `blur(${feather}px)`;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    const m = layer.mask;
    if (m.type === "ellipse") {
      ctx.ellipse(-w / 2 + (m.x + m.w / 2) * w, -h / 2 + (m.y + m.h / 2) * h, Math.max(1, (m.w * w) / 2), Math.max(1, (m.h * h) / 2), 0, 0, Math.PI * 2);
    } else if (m.type === "free" && m.points && m.points.length >= 3) {
      ctx.moveTo(-w / 2 + m.points[0].x * w, -h / 2 + m.points[0].y * h);
      for (const p of m.points.slice(1)) ctx.lineTo(-w / 2 + p.x * w, -h / 2 + p.y * h);
      ctx.closePath();
    } else {
      ctx.rect(-w / 2 + m.x * w, -h / 2 + m.y * h, m.w * w, m.h * h);
    }
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

export async function renderPage(
  page: Page,
  panels: Panel[],
  layers: Layer[],
  assets: Asset[],
  blobUrls: Record<string, string>,
  scale = 2,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(page.width * scale);
  canvas.height = Math.round(page.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.scale(scale, scale);
  ctx.fillStyle = page.background;
  ctx.fillRect(0, 0, page.width, page.height);
  const pagePanels = panels.filter((p) => p.pageId === page.id);
  for (const panel of pagePanels) {
    const px = (panel.x / 100) * page.width;
    const py = (panel.y / 100) * page.height;
    const pw = (panel.w / 100) * page.width;
    const ph = (panel.h / 100) * page.height;
    ctx.save();
    roundRect(ctx, px, py, pw, ph, panel.radius);
    ctx.fillStyle = panel.fill;
    ctx.fill();
    ctx.clip();
    const roots = childLayers(layers, panel.id, null);
    for (const layer of roots) await drawLayer(ctx, layer, layers, assets, blobUrls, px, py, pw, ph, 1);
    if (panel.halftone) {
      ctx.globalAlpha = 0.22;
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "#1a1e24";
      for (let y = 0; y < ph; y += 5) {
        for (let x = 0; x < pw; x += 5) {
          ctx.beginPath();
          ctx.arc(px + x, py + y, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
    if (panel.borderWidth > 0) {
      ctx.save();
      ctx.strokeStyle = panel.border;
      ctx.lineWidth = panel.borderWidth;
      roundRect(ctx, px, py, pw, ph, panel.radius);
      ctx.stroke();
      ctx.restore();
    }
  }
  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("export"))), type, 0.92);
  });
}
