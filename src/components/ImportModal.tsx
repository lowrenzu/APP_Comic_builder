import { useState } from "react";
import { ModalFrame } from "@/components/ModalFrame";
import { useProjectStore } from "@/store/projectStore";
import type { AssetCategory } from "@/types";
import { CATEGORY_LABEL } from "@/types";
import { importImageFiles } from "@/utils/importFiles";

const CATS: AssetCategory[] = ["character", "modelsheet", "background", "photo", "object", "vehicle", "effect", "texture", "custom"];

export function ImportModal() {
  const open = useProjectStore((s) => s.importOpen);
  const setOpen = useProjectStore((s) => s.setImportOpen);
  const [category, setCategory] = useState<AssetCategory>("custom");
  const [hot, setHot] = useState(false);
  return (
    <ModalFrame
      open={open}
      onOpenChange={setOpen}
      title="Importer des assets"
      description="PNG, JPG, WEBP, SVG ou GIF. Chaque fichier devient un asset réutilisable."
    >
      <label className="field">
        <span>Catégorie</span>
        <select value={category} onChange={(e) => setCategory(e.target.value as AssetCategory)}>
          {CATS.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABEL[cat]}
            </option>
          ))}
        </select>
      </label>
      <label
        className="dropzone"
        data-hot={hot ? "true" : "false"}
        style={{ display: "block", marginTop: 12 }}
        onDragOver={(e) => {
          e.preventDefault();
          setHot(true);
        }}
        onDragLeave={() => setHot(false)}
        onDrop={(e) => {
          e.preventDefault();
          setHot(false);
          void importImageFiles([...e.dataTransfer.files], category).then(() => setOpen(false));
        }}
      >
        Déposez vos images ici
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          multiple
          hidden
          onChange={(e) => {
            const files = [...(e.target.files ?? [])];
            void importImageFiles(files, category).then(() => setOpen(false));
          }}
        />
        <div>
          <span className="btn btn-line" style={{ marginTop: 8 }}>
            Parcourir
          </span>
        </div>
      </label>
    </ModalFrame>
  );
}
