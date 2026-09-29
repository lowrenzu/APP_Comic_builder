import { useRef } from "react";
import { Star, Trash2 } from "lucide-react";
import { useAssets, useAssetUrl } from "@/hooks/useAssets";
import { useProjectStore } from "@/store/projectStore";
import type { Asset, AssetCategory } from "@/types";
import { filterAssets } from "@/utils/assetUtils";

function Thumb({ asset, cover }: { asset: Asset; cover?: boolean }) {
  const src = useAssetUrl(asset.id);
  return (
    <div className={cover ? "checker-wide" : "checker"}>
      {src ? <img src={src} alt={asset.name} draggable={false} /> : null}
    </div>
  );
}

export function AssetCard({ asset }: { asset: Asset }) {
  const updateAsset = useProjectStore((s) => s.updateAsset);
  const removeAsset = useProjectStore((s) => s.removeAsset);
  const place = useProjectStore((s) => s.placeAsset);
  const panelId = useProjectStore((s) => s.selectedPanelId);
  const cover = asset.category === "background" || asset.category === "photo" || asset.category === "modelsheet";
  const gesture = useRef({ x: 0, y: 0, dragged: false, placed: false });
  const placeHere = () => {
    if (gesture.current.placed) return;
    gesture.current.placed = true;
    window.setTimeout(() => {
      gesture.current.placed = false;
    }, 50);
    if (!panelId) {
      useProjectStore.getState().toast("Sélectionnez une case.");
      return;
    }
    place(asset.id, panelId);
  };
  return (
    <article
      className="asset-card"
      draggable
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest(".star")) return;
        gesture.current = { x: e.clientX, y: e.clientY, dragged: false, placed: false };
      }}
      onDragStart={(e) => {
        gesture.current.dragged = true;
        e.dataTransfer.setData("application/x-atelier-asset", asset.id);
        e.dataTransfer.effectAllowed = "copy";
      }}
      onDragEnd={(e) => {
        const moved = Math.hypot(e.clientX - gesture.current.x, e.clientY - gesture.current.y);
        if (moved < 8) placeHere();
      }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest(".star")) return;
        if (gesture.current.dragged && Math.hypot(e.clientX - gesture.current.x, e.clientY - gesture.current.y) >= 8) return;
        placeHere();
      }}
    >
      <Thumb asset={asset} cover={cover} />
      <div className="card-meta">
        <strong title={asset.description || asset.name}>{asset.viewLabel ? `${asset.viewLabel}` : asset.name}</strong>
        <button
          type="button"
          className="star"
          data-on={asset.favorite ? "true" : "false"}
          aria-label="Favori"
          onClick={() => updateAsset(asset.id, { favorite: !asset.favorite })}
        >
          <Star size={13} fill={asset.favorite ? "currentColor" : "none"} />
        </button>
        {asset.source !== "demo" ? (
          <button type="button" className="star" aria-label="Supprimer" onClick={() => removeAsset(asset.id)}>
            <Trash2 size={13} />
          </button>
        ) : null}
      </div>
      {asset.tags.length ? (
        <div className="card-tags">
          {asset.tags.slice(0, 2).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function AssetBrowser({ category }: { category?: AssetCategory | "all" }) {
  const { assets, libraryCategory, libraryQuery, favoritesOnly, libraryTag } = useAssets();
  const raw = category ?? libraryCategory;
  const cat: AssetCategory | "all" = raw === "layout" || raw === "bubble" || raw === "sfx" ? "all" : raw;
  const filtered = filterAssets(assets, cat, libraryQuery, favoritesOnly, libraryTag ?? "");

  if (!filtered.length) {
    if (cat === "all") return null;
    return <p className="hint">Aucun asset. Importez une image ou changez la recherche.</p>;
  }

  return (
    <div className="asset-grid">
      {filtered.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}
