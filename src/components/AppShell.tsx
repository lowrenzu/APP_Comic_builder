import { useEffect } from "react";
import { AiImageModal } from "@/components/AiImageModal";
import { CloudImportModal } from "@/components/CloudImportModal";
import { ImageCropModal } from "@/components/ImageCropModal";
import { ImportModal } from "@/components/ImportModal";
import { OverviewModal } from "@/components/OverviewModal";
import { PagesFilmstrip } from "@/components/PagesFilmstrip";
import { ReaderModal } from "@/components/ReaderModal";
import { ToastSystem } from "@/components/ToastSystem";
import { TopBar } from "@/components/TopBar";
import { Workspace } from "@/components/Workspace";
import { usePersistence } from "@/hooks/usePersistence";
import { useProjectStore } from "@/store/projectStore";
import { translateLayers } from "@/utils/layerUtils";

export function AppShell() {
  usePersistence();
  const libraryOpen = useProjectStore((s) => s.libraryOpen);
  const pane = useProjectStore((s) => s.mobilePane);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      const s = useProjectStore.getState();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) s.redo();
        else s.undo();
        return;
      }
      if (typing) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        s.duplicateSelected();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        s.copySelected();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "v") {
        e.preventDefault();
        s.pasteClipboard();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "g") {
        e.preventDefault();
        if (e.shiftKey) s.ungroupSelected();
        else s.groupSelected();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "a") {
        e.preventDefault();
        const ids = s.layers.filter((l) => l.panelId === s.selectedPanelId && !l.parentId).map((l) => l.id);
        s.selectLayers(ids);
      } else if (e.key === "Delete" || e.key === "Backspace") {
        s.deleteSelected();
      } else if (e.key === "v" || e.key === "V") s.setTool("select");
      else if (e.key === "t" || e.key === "T") s.setTool("text");
      else if (e.key === "[") s.reorderSelected("lower");
      else if (e.key === "]") s.reorderSelected("raise");
      else if (e.key.startsWith("Arrow") && s.selectedLayerIds.length && s.tool !== "crop") {
        e.preventDefault();
        const layer = s.layers.find((item) => item.id === s.selectedLayerIds.at(-1));
        const panel = s.panels.find((item) => item.id === layer?.panelId);
        const page = s.pages.find((item) => item.id === panel?.pageId);
        const pw = Math.max(40, (page?.width ?? 800) * ((panel?.w ?? 100) / 100));
        const ph = Math.max(40, (page?.height ?? 1100) * ((panel?.h ?? 100) / 100));
        const px = e.shiftKey ? 10 : 1;
        const dx = (e.key === "ArrowLeft" ? -px : e.key === "ArrowRight" ? px : 0) / pw * 100;
        const dy = (e.key === "ArrowUp" ? -px : e.key === "ArrowDown" ? px : 0) / ph * 100;
        if (!s.gesture) s.beginGesture();
        s.patchLayers(translateLayers(useProjectStore.getState().layers, s.selectedLayerIds, dx, dy), "live");
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (!e.key.startsWith("Arrow")) return;
      useProjectStore.getState().endGesture();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return (
    <>
      <div className="shell" data-lib={libraryOpen ? "open" : "closed"} data-pane={pane}>
        <TopBar />
        <Workspace />
        <PagesFilmstrip />
        <nav className="mobile-nav" aria-label="Sections">
          <button type="button" data-on={pane === "canvas" ? "true" : "false"} onClick={() => useProjectStore.getState().setMobilePane("canvas")}>
            Planche
          </button>
          <button type="button" data-on={pane === "assets" ? "true" : "false"} onClick={() => useProjectStore.getState().setMobilePane("assets")}>
            Assets
          </button>
          <button type="button" data-on={pane === "layers" ? "true" : "false"} onClick={() => useProjectStore.getState().setMobilePane("layers")}>
            Calques
          </button>
        </nav>
      </div>
      <ImportModal />
      <ImageCropModal />
      <AiImageModal />
      <CloudImportModal />
      <OverviewModal />
      <ReaderModal />
      <ToastSystem />
    </>
  );
}
