import { ChevronDown, ChevronRight, Eye, EyeOff, GripVertical, Lock, LockOpen } from "lucide-react";
import type { DragEvent } from "react";
import { useAssetUrl } from "@/hooks/useAssets";
import type { Layer, LayerType } from "@/types";

export function LayerRow({
  layer,
  depth,
  open,
  selected,
  onToggleOpen,
  onSelect,
  onToggleVisible,
  onToggleLock,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
}: {
  layer: Layer;
  depth: number;
  open?: boolean;
  selected: boolean;
  onToggleOpen?: () => void;
  onSelect: (additive: boolean) => void;
  onToggleVisible: () => void;
  onToggleLock: () => void;
  onDragStart: (event: DragEvent<HTMLElement>) => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
  onDragLeave: (event: DragEvent<HTMLElement>) => void;
}) {
  return (
    <div
      className="layer-row"
      data-on={selected ? "true" : "false"}
      data-hidden={!layer.visible ? "true" : "false"}
      style={{ paddingLeft: depth * 12 }}
      onClick={(e) => onSelect(e.shiftKey || e.metaKey || e.ctrlKey)}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(false);
      }}
    >
      <span
        className="layer-grip"
        draggable
        title="Glisser pour changer l'ordre"
        aria-label="Changer l'ordre"
        onDragStart={onDragStart}
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={12} />
      </span>
      {layer.type === "group" ? (
        <button
          type="button"
          className="tiny"
          onClick={(e) => {
            e.stopPropagation();
            onToggleOpen?.();
          }}
          aria-label={open ? "Replier" : "Déplier"}
        >
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        className="tiny"
        aria-label={layer.visible ? "Masquer" : "Afficher"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisible();
        }}
      >
        {layer.visible ? <Eye size={13} /> : <EyeOff size={13} />}
      </button>
      <button
        type="button"
        className="tiny"
        aria-label={layer.locked ? "Déverrouiller" : "Verrouiller"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleLock();
        }}
      >
        {layer.locked ? <Lock size={12} /> : <LockOpen size={12} />}
      </button>
      <LayerMark layer={layer} />
      <span className="layer-name">{layer.name}</span>
      <span className="pane-kicker">{Math.round(layer.opacity * 100)}</span>
    </div>
  );
}

function LayerMark({ layer }: { layer: Layer }) {
  const src = useAssetUrl(layer.type === "image" ? layer.assetId : undefined);
  if (layer.type === "image" && src) return <img className="layer-thumb" src={src} alt="" />;
  return <span className="layer-kind">{KIND[layer.type]}</span>;
}

const KIND: Record<LayerType, string> = {
  image: "Img",
  text: "Txt",
  bubble: "Bul",
  sfx: "Sfx",
  group: "Grp",
};
