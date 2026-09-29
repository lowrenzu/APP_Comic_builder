import { useState } from "react";
import { ModalFrame } from "@/components/ModalFrame";
import { generateAssetImage } from "@/lib/ai.functions";
import { useProjectStore } from "@/store/projectStore";
import type { AssetCategory } from "@/types";
import { CATEGORY_LABEL } from "@/types";
import { idbSet } from "@/utils/idb";
import { uid } from "@/utils/ids";

const IDEAS: { label: string; category: AssetCategory; prompt: string }[] = [
  { label: "Personnage", category: "character", prompt: "Personnage de bande dessinée en pied, fond simple" },
  { label: "Décor", category: "background", prompt: "Décor large de case, sans personnage" },
  { label: "Objet", category: "object", prompt: "Objet isolé utile à une case d'aventure" },
  { label: "Véhicule", category: "vehicle", prompt: "Véhicule d'expédition, vue de côté" },
  { label: "Effet", category: "effect", prompt: "Effet lumineux isolé sur fond noir" },
];

export function AiImageModal() {
  const open = useProjectStore((s) => s.aiOpen);
  const setOpen = useProjectStore((s) => s.setAiOpen);
  const [prompt, setPrompt] = useState("Un éclaireur sous la pluie, cape courte, lampe à huile");
  const [category, setCategory] = useState<AssetCategory>("character");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <ModalFrame
      open={open}
      onOpenChange={setOpen}
      title="Générer un asset"
      description="L'image rejoint la bibliothèque. Glissez-la ensuite dans une case — rien n'est peint directement sur la planche."
    >
      <div className="row-actions">
        {IDEAS.map((idea) => (
          <button
            key={idea.label}
            type="button"
            className="btn btn-line"
            onClick={() => {
              setCategory(idea.category);
              setPrompt(idea.prompt);
            }}
          >
            {idea.label}
          </button>
        ))}
      </div>
      <label className="field" style={{ marginTop: 10 }}>
        <span>Catégorie</span>
        <select value={category} onChange={(e) => setCategory(e.target.value as AssetCategory)}>
          {IDEAS.map((idea) => (
            <option key={idea.category} value={idea.category}>
              {CATEGORY_LABEL[idea.category]}
            </option>
          ))}
        </select>
      </label>
      <label className="field" style={{ marginTop: 8 }}>
        <span>Description</span>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>
      {error ? <p className="hint">{error}</p> : null}
      <button
        type="button"
        className="btn btn-accent"
        style={{ marginTop: 12 }}
        disabled={busy}
        onClick={() => {
          setBusy(true);
          setError("");
          void generateAssetImage({ data: { prompt, category } })
            .then(async (result) => {
              if (!result.ok) {
                setError(result.error);
                return;
              }
              const id = uid("asset");
              await idbSet(id, result.dataUrl);
              const name = prompt.slice(0, 42);
              useProjectStore.getState().addAsset(
                {
                  id,
                  name,
                  description: prompt,
                  category,
                  tags: ["ia"],
                  favorite: false,
                  createdAt: Date.now(),
                  source: "ai",
                  src: `idb:${id}`,
                  mime: "image/png",
                },
                result.dataUrl,
              );
              useProjectStore.getState().toast("Asset IA ajouté à la bibliothèque.");
              setOpen(false);
            })
            .catch(() => setError("La génération a échoué."))
            .finally(() => setBusy(false));
        }}
      >
        {busy ? "Génération…" : "Créer l'asset"}
      </button>
    </ModalFrame>
  );
}
