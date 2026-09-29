import { useAssets } from "@/hooks/useAssets";
import { AssetCard } from "@/components/AssetBrowser";
import { groupCharacters } from "@/utils/assetUtils";
import { useProjectStore } from "@/store/projectStore";

export function CharacterLibrary() {
  const { assets, libraryQuery, libraryTag } = useAssets();
  const q = libraryQuery.trim().toLowerCase();
  const groups = groupCharacters(assets).filter((group) => {
    if (libraryTag && !group.views.some((view) => view.tags.includes(libraryTag))) return false;
    if (!q) return true;
    return `${group.name} ${group.description} ${group.views.flatMap((view) => view.tags).join(" ")}`.toLowerCase().includes(q);
  });
  if (!groups.length) return <p className="hint">Aucun personnage dans le projet.</p>;
  return (
    <div>
      {groups.map((group) => (
        <section key={group.key} className="char-block">
          <strong>{group.name}</strong>
          <p className="hint">{group.description}</p>
          <div className="char-views">
            {group.views.map((view) => (
              <div key={view.id} style={{ width: 92 }}>
                <AssetCard asset={view} />
              </div>
            ))}
          </div>
          {group.sheet ? (
            <button
              type="button"
              className="btn btn-line"
              style={{ marginTop: 8 }}
              onClick={() => {
                const panel = useProjectStore.getState().selectedPanelId;
                if (!panel || !group.sheet) return;
                useProjectStore.getState().placeAsset(group.sheet.id, panel);
              }}
            >
              Poser le model sheet
            </button>
          ) : null}
        </section>
      ))}
    </div>
  );
}
