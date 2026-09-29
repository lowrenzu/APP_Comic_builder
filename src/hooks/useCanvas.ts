import { useShallow } from "zustand/react/shallow";
import { useProjectStore } from "@/store/projectStore";

export function useCanvas() {
  return useProjectStore(
    useShallow((s) => ({
      tool: s.tool,
      zoom: s.zoom,
      setZoom: s.setZoom,
      setTool: s.setTool,
      beginGesture: s.beginGesture,
      endGesture: s.endGesture,
      patchLayers: s.patchLayers,
      placeAsset: s.placeAsset,
      addText: s.addText,
      addBubble: s.addBubble,
      addSfx: s.addSfx,
    })),
  );
}
