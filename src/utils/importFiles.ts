import type { AssetCategory } from "@/types";
import { useProjectStore } from "@/store/projectStore";
import { idbSet, readFileAsDataUrl } from "@/utils/idb";
import { uid } from "@/utils/ids";

export async function importImageFiles(
  files: File[],
  category: AssetCategory,
  placeInPanel?: string,
  at?: { x: number; y: number },
): Promise<void> {
  const images = files.filter((file) => file.type.startsWith("image/"));
  if (!images.length) {
    useProjectStore.getState().toast("Formats acceptés : PNG, JPG, WEBP, SVG, GIF.");
    return;
  }
  let firstId = "";
  for (const file of images) {
    const data = await readFileAsDataUrl(file);
    const id = uid("asset");
    await idbSet(id, data);
    const name = file.name.replace(/\.[^.]+$/, "") || "Import";
    useProjectStore.getState().addAsset(
      {
        id,
        name,
        description: "",
        category,
        tags: ["import"],
        favorite: false,
        createdAt: Date.now(),
        source: "import",
        src: `idb:${id}`,
        mime: file.type || "image/png",
      },
      data,
    );
    if (!firstId) firstId = id;
  }
  if (placeInPanel && firstId) {
    useProjectStore.getState().placeAsset(firstId, placeInPanel, at);
  }
  useProjectStore.getState().toast(
    images.length > 1 ? `${images.length} assets ajoutés à la bibliothèque.` : "Asset ajouté à la bibliothèque.",
  );
}
