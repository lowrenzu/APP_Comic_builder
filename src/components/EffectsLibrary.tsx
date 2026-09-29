import { AssetBrowser } from "@/components/AssetBrowser";

export function EffectsLibrary() {
  return (
    <>
      <p className="hint">Les effets se posent en mode Screen pour laisser passer le décor.</p>
      <AssetBrowser category="effect" />
    </>
  );
}
