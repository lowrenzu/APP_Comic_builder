import { useShallow } from "zustand/react/shallow";
import { useProjectStore } from "@/store/projectStore";

export function useLayers() {
  return useProjectStore(
    useShallow((s) => ({
      layers: s.layers,
      selectedLayerIds: s.selectedLayerIds,
      editingLayerId: s.editingLayerId,
      selectLayers: s.selectLayers,
      toggleLayer: s.toggleLayer,
      updateSelectedLayers: s.updateSelectedLayers,
      renameLayer: s.renameLayer,
      deleteSelected: s.deleteSelected,
      duplicateSelected: s.duplicateSelected,
      reorderSelected: s.reorderSelected,
      groupSelected: s.groupSelected,
      ungroupSelected: s.ungroupSelected,
      setEditing: s.setEditing,
    })),
  );
}
