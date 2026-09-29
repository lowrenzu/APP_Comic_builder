import { useShallow } from "zustand/react/shallow";
import { useProjectStore } from "@/store/projectStore";

export function useProject() {
  return useProjectStore(
    useShallow((s) => ({
      meta: s.meta,
      pages: s.pages,
      panels: s.panels,
      selectedPageId: s.selectedPageId,
      selectedPanelId: s.selectedPanelId,
      updateMeta: s.updateMeta,
      updatePage: s.updatePage,
      selectPage: s.selectPage,
      addPage: s.addPage,
      deletePage: s.deletePage,
      duplicatePage: s.duplicatePage,
      saveState: s.saveState,
    })),
  );
}
