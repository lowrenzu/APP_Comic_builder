import { useShallow } from "zustand/react/shallow";
import { useProjectStore } from "@/store/projectStore";

export function useHistory() {
  return useProjectStore(
    useShallow((s) => ({
      undo: s.undo,
      redo: s.redo,
      canUndo: s.past.length > 0,
      canRedo: s.future.length > 0,
    })),
  );
}
