import { AssetBrowser } from "@/components/AssetBrowser";

export function PhotoLibrary() {
  return (
    <>
      <p className="hint">Photos de décor, texture ou référence. Recadrage et masque non destructifs.</p>
      <AssetBrowser category="photo" />
    </>
  );
}
