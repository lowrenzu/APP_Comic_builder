import { useEffect, useState } from "react";
import { ModalFrame } from "@/components/ModalFrame";
import { useAssetUrl } from "@/hooks/useAssets";
import { primaryLayer, useProjectStore } from "@/store/projectStore";
import type { CropRect } from "@/types";
import { FULL_CROP } from "@/utils/cropUtils";

export function ImageCropModal() {
  const open = useProjectStore((s) => s.cropOpen);
  const setOpen = useProjectStore((s) => s.setCropOpen);
  const layer = useProjectStore((s) => primaryLayer(s));
  const src = useAssetUrl(layer?.type === "image" ? layer.assetId : undefined);
  const [crop, setCrop] = useState<CropRect>(FULL_CROP);

  useEffect(() => {
    if (open && layer?.type === "image") setCrop(layer.crop);
  }, [open, layer]);

  return (
    <ModalFrame open={open} onOpenChange={setOpen} title="Recadrage" description="L'image source reste intacte. Seule la zone visible change.">
      {layer?.type !== "image" || !src ? (
        <p className="hint">Sélectionnez un calque image.</p>
      ) : (
        <>
          <CropStage src={src} crop={crop} onChange={setCrop} />
          <div className="row-actions" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => {
                useProjectStore.getState().updateSelectedLayers({ crop });
                setOpen(false);
              }}
            >
              Appliquer
            </button>
            <button type="button" className="btn btn-line" onClick={() => setCrop(FULL_CROP)}>
              Tout voir
            </button>
          </div>
        </>
      )}
    </ModalFrame>
  );
}

function CropStage({ src, crop, onChange }: { src: string; crop: CropRect; onChange: (crop: CropRect) => void }) {
  return (
    <div
      className="checker-wide"
      style={{ aspectRatio: "4 / 3", position: "relative", userSelect: "none" }}
      onPointerDown={(e) => {
        const host = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - host.left) / host.width;
        const y = (e.clientY - host.top) / host.height;
        const start = { ...crop, px: e.clientX, py: e.clientY };
        const move = (ev: PointerEvent) => {
          const dx = (ev.clientX - start.px) / host.width;
          const dy = (ev.clientY - start.py) / host.height;
          onChange({
            ...crop,
            x: clamp01(start.x + dx, 1 - crop.w),
            y: clamp01(start.y + dy, 1 - crop.h),
          });
        };
        const up = () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
        };
        if (x < crop.x || y < crop.y || x > crop.x + crop.w || y > crop.y + crop.h) {
          onChange({ x: clamp01(x - 0.15, 0.7), y: clamp01(y - 0.15, 0.7), w: 0.4, h: 0.4 });
          return;
        }
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
      }}
    >
      <img src={src} alt="" draggable={false} style={{ opacity: 0.45 }} />
      <div
        style={{
          position: "absolute",
          left: `${crop.x * 100}%`,
          top: `${crop.y * 100}%`,
          width: `${crop.w * 100}%`,
          height: `${crop.h * 100}%`,
          overflow: "hidden",
          boxShadow: "0 0 0 1px #ff9d2e, 0 0 0 999px rgba(9,13,18,0.35)",
        }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            width: `${100 / crop.w}%`,
            height: `${100 / crop.h}%`,
            left: `${(-crop.x / crop.w) * 100}%`,
            top: `${(-crop.y / crop.h) * 100}%`,
            maxWidth: "none",
          }}
        />
      </div>
      <div className="prop-grid" style={{ position: "relative", marginTop: 8 }}>
        {(["x", "y", "w", "h"] as const).map((key) => (
          <label key={key} className="field">
            <span>{key}</span>
            <input
              type="number"
              step={0.01}
              min={0.02}
              max={1}
              value={Math.round(crop[key] * 100) / 100}
              onChange={(e) => onChange({ ...crop, [key]: Number(e.target.value) })}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function clamp01(n: number, max: number) {
  return Math.max(0, Math.min(max, n));
}
