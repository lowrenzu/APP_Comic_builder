import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BookOpen, Eye, ImageDown, Redo2, Undo2 } from "lucide-react";
import { useRef } from "react";
import { PAGE_PRESETS, PRESET_FAMILIES } from "@/data/templates";
import { useHistory } from "@/hooks/useHistory";
import { useProject } from "@/hooks/useProject";
import { useProjectStore } from "@/store/projectStore";
import { canvasToBlob, renderPage } from "@/utils/exportUtils";
import { slugify } from "@/utils/ids";
import { downloadBlob, downloadText, embedAssets, materializeAssets, parseProjectFile, toProjectFile } from "@/utils/projectSerializer";

export function TopBar() {
  const { meta, updateMeta, saveState, addPage } = useProject();
  const { undo, redo, canUndo, canRedo } = useHistory();
  const fileRef = useRef<HTMLInputElement>(null);
  const libraryOpen = useProjectStore((s) => s.libraryOpen);

  const exportPages = async (kind: "png" | "jpeg", all: boolean) => {
    const s = useProjectStore.getState();
    const pages = all ? s.pages : s.pages.filter((p) => p.id === s.selectedPageId);
    const canvases = [];
    for (const page of pages) {
      canvases.push(await renderPage(page, s.panels, s.layers, s.assets, s.blobUrls, 2));
    }
    if (!canvases.length || !canvases[0]) return;
    const width = Math.max(...canvases.map((c) => c.width));
    const gap = all ? 24 : 0;
    const height = canvases.reduce((sum, c) => sum + c.height, 0) + gap * (canvases.length - 1);
    const sheet = document.createElement("canvas");
    sheet.width = width;
    sheet.height = height;
    const ctx = sheet.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#efe6d6";
    ctx.fillRect(0, 0, width, height);
    let y = 0;
    for (const canvas of canvases) {
      ctx.drawImage(canvas, 0, y);
      y += canvas.height + gap;
    }
    const blob = await canvasToBlob(sheet, kind === "png" ? "image/png" : "image/jpeg");
    downloadBlob(`${slugify(s.meta.title)}${all ? "-planches" : ""}.${kind === "png" ? "png" : "jpg"}`, blob);
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="brand-name">
          <strong>ATELIER</strong>
          <em>BD PRO</em>
        </div>
      </div>
      <div className="vdiv" />
      <input
        className="title-input"
        aria-label="Titre du projet"
        value={meta.title}
        onChange={(e) => updateMeta({ title: e.target.value })}
      />
      <span className="hint">{meta.subtitle}</span>
      <div className="vdiv" />
      <button type="button" className="icon-btn" aria-label="Annuler" disabled={!canUndo} onClick={() => undo()}>
        <Undo2 size={15} />
      </button>
      <button type="button" className="icon-btn" aria-label="Rétablir" disabled={!canRedo} onClick={() => redo()}>
        <Redo2 size={15} />
      </button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="btn btn-line">Nouvelle page</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="menu-pop" align="start">
            {PRESET_FAMILIES.map((family) => (
              <div key={family}>
                <DropdownMenu.Label className="menu-label">{family}</DropdownMenu.Label>
                {PAGE_PRESETS.filter((preset) => preset.family === family).map((preset) => (
                  <DropdownMenu.Item key={preset.id} className="menu-item" onSelect={() => addPage(preset.id)}>
                    {preset.name}
                  </DropdownMenu.Item>
                ))}
              </div>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().setLibraryOpen(!libraryOpen)}>
        Bibliothèque
      </button>
      <div className="top-actions">
        <span className="save-pill" data-dirty={saveState === "dirty" ? "true" : "false"}>
          <i />
          <span>{saveState === "dirty" ? "Modifications" : "Enregistré"}</span>
        </span>
        <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().setReader(true, "album")}>
          <BookOpen size={14} /> Lecture
        </button>
        <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().setOverview(true)}>
          <Eye size={14} /> Ensemble
        </button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="btn btn-accent">
            <ImageDown size={14} /> Exporter
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="menu-pop" align="end">
              <DropdownMenu.Item className="menu-item" onSelect={() => void exportPages("png", false)}>
                PNG — page
              </DropdownMenu.Item>
              <DropdownMenu.Item className="menu-item" onSelect={() => void exportPages("jpeg", false)}>
                JPEG — page
              </DropdownMenu.Item>
              <DropdownMenu.Item className="menu-item" onSelect={() => void exportPages("png", true)}>
                PNG — toutes les pages
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="menu-item"
                onSelect={() => {
                  void (async () => {
                    const s = useProjectStore.getState();
                    const assets = await embedAssets(s.assets);
                    const file = toProjectFile(s.meta, s.pages, s.panels, s.layers, assets, s.selectedPageId);
                    downloadText(`${slugify(s.meta.title)}.json`, JSON.stringify(file, null, 2));
                  })();
                }}
              >
                JSON — projet
              </DropdownMenu.Item>
              <DropdownMenu.Item className="menu-item" onSelect={() => fileRef.current?.click()}>
                Importer JSON
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="menu-item"
                onSelect={() => {
                  if (confirm("Recharger le projet exemple ?")) useProjectStore.getState().resetDemo();
                }}
              >
                Exemple — Le Secret de l'Île
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="menu-item"
                onSelect={() => {
                  if (confirm("Créer un projet vide ?")) useProjectStore.getState().newBlank();
                }}
              >
                Nouveau projet
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        <input
          ref={fileRef}
          hidden
          type="file"
          accept="application/json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            void file.text().then(async (text) => {
              const parsed = parseProjectFile(JSON.parse(text));
              if (!parsed) {
                useProjectStore.getState().toast("Fichier projet illisible.");
                return;
              }
              const materialized = await materializeAssets(parsed.assets);
              useProjectStore.getState().loadFile({ ...parsed, assets: materialized.assets }, materialized.blobUrls);
            });
            e.target.value = "";
          }}
        />
      </div>
    </header>
  );
}
