import { AssetLibrary } from "@/components/AssetLibrary";
import { CanvasWorkspace } from "@/components/CanvasWorkspace";
import { LayersPanel } from "@/components/LayersPanel";
import { LeftToolbar } from "@/components/LeftToolbar";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { useProjectStore } from "@/store/projectStore";

export function Workspace() {
  const libraryOpen = useProjectStore((s) => s.libraryOpen);
  return (
    <>
      <LeftToolbar />
      {libraryOpen ? <AssetLibrary /> : <div style={{ display: "none" }} />}
      <CanvasWorkspace />
      <aside className="inspector">
        <PropertiesPanel />
        <LayersPanel />
      </aside>
    </>
  );
}
