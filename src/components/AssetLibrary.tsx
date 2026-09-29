import { Search, Star } from "lucide-react";
import { AssetBrowser, AssetCard } from "@/components/AssetBrowser";
import { BackgroundLibrary } from "@/components/BackgroundLibrary";
import { CharacterLibrary } from "@/components/CharacterLibrary";
import { EffectsLibrary } from "@/components/EffectsLibrary";
import { ModelSheetLibrary } from "@/components/ModelSheetLibrary";
import { PhotoLibrary } from "@/components/PhotoLibrary";
import { BubblePresets, LayoutPresets, PresetShelves, SfxPresets } from "@/components/PresetCatalog";
import { useAssets } from "@/hooks/useAssets";
import { useProjectStore } from "@/store/projectStore";
import type { LibraryCategory } from "@/types";
import { CATEGORY_LABEL } from "@/types";
import { importImageFiles } from "@/utils/importFiles";

const CATS: { id: LibraryCategory; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "layout", label: "Gabarits" },
  { id: "bubble", label: "Bulles" },
  { id: "sfx", label: "Onomatopées" },
  { id: "character", label: CATEGORY_LABEL.character },
  { id: "modelsheet", label: CATEGORY_LABEL.modelsheet },
  { id: "background", label: CATEGORY_LABEL.background },
  { id: "photo", label: CATEGORY_LABEL.photo },
  { id: "object", label: CATEGORY_LABEL.object },
  { id: "vehicle", label: CATEGORY_LABEL.vehicle },
  { id: "effect", label: CATEGORY_LABEL.effect },
  { id: "texture", label: CATEGORY_LABEL.texture },
  { id: "custom", label: CATEGORY_LABEL.custom },
];

export function AssetLibrary() {
  const { libraryCategory, libraryQuery, favoritesOnly, libraryTag, recentAssetIds, assets, setLibraryCategory, setLibraryQuery, setFavoritesOnly, setLibraryTag } =
    useAssets();
  const placeholder =
    libraryCategory === "character"
      ? "Rechercher un personnage..."
      : libraryCategory === "background"
        ? "Rechercher un décor..."
        : libraryCategory === "layout"
          ? "Rechercher un gabarit..."
          : libraryCategory === "bubble"
            ? "Rechercher une bulle..."
            : libraryCategory === "sfx"
              ? "Rechercher une onomatopée..."
              : "Rechercher un asset...";
  const imageCategory =
    libraryCategory === "all" ||
    libraryCategory === "object" ||
    libraryCategory === "vehicle" ||
    libraryCategory === "texture" ||
    libraryCategory === "custom";

  return (
    <aside className="library">
      <div className="pane-head">
        <div>
          <div className="pane-kicker">Médiathèque</div>
          <div className="pane-title">Bibliothèque</div>
        </div>
        <button type="button" className="btn btn-accent" onClick={() => useProjectStore.getState().setImportOpen(true)}>
          Importer
        </button>
      </div>
      <label className="search">
        <Search size={14} />
        <input value={libraryQuery} placeholder={placeholder} onChange={(e) => setLibraryQuery(e.target.value)} />
      </label>
      <div className="chips">
        {CATS.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="chip"
            data-on={libraryCategory === cat.id ? "true" : "false"}
            onClick={() => setLibraryCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
        <button type="button" className="chip" data-on={favoritesOnly ? "true" : "false"} onClick={() => setFavoritesOnly(!favoritesOnly)}>
          <Star size={11} /> Favoris
        </button>
      </div>
      <div className="tag-row">
        {[...new Set(assets.flatMap((asset) => asset.tags))].slice(0, 16).map((tag) => (
          <button
            key={tag}
            type="button"
            className="chip"
            data-on={libraryTag === tag ? "true" : "false"}
            onClick={() => setLibraryTag(libraryTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div
        className="asset-scroll"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (!e.dataTransfer.files.length) return;
          e.preventDefault();
          const cat =
            libraryCategory === "all" || libraryCategory === "bubble" || libraryCategory === "sfx" || libraryCategory === "layout"
              ? "custom"
              : libraryCategory;
          void importImageFiles([...e.dataTransfer.files], cat);
        }}
      >
        {libraryCategory === "all" && !favoritesOnly && !libraryQuery && !libraryTag && recentAssetIds.length ? (
          <div className="shelves">
            <div className="shelf-head">
              <strong>Récents</strong>
            </div>
            <div className="asset-grid">
              {recentAssetIds
                .map((id) => assets.find((asset) => asset.id === id))
                .filter((asset) => asset != null)
                .map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
          </div>
        ) : null}
        {libraryCategory === "all" && !favoritesOnly ? <PresetShelves query={libraryQuery} /> : null}
        {libraryCategory === "layout" ? <LayoutPresets query={libraryQuery} /> : null}
        {libraryCategory === "bubble" ? <BubblePresets query={libraryQuery} /> : null}
        {libraryCategory === "sfx" ? <SfxPresets query={libraryQuery} /> : null}
        {libraryCategory === "character" ? <CharacterLibrary /> : null}
        {libraryCategory === "modelsheet" ? <ModelSheetLibrary /> : null}
        {libraryCategory === "background" ? <BackgroundLibrary /> : null}
        {libraryCategory === "photo" ? <PhotoLibrary /> : null}
        {libraryCategory === "effect" ? <EffectsLibrary /> : null}
        {imageCategory ? <AssetBrowser /> : null}
      </div>
    </aside>
  );
}