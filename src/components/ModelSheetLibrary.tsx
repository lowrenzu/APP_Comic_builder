import { AssetBrowser } from "@/components/AssetBrowser";

export function ModelSheetLibrary() {
  return (
    <>
      <p className="hint">Feuilles de référence. Glissez une vue dans une case — l'original reste dans la bibliothèque.</p>
      <AssetBrowser category="modelsheet" />
    </>
  );
}
