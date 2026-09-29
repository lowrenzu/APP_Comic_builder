import { CanvasToolbar } from "@/components/CanvasToolbar";
import { ComicCanvas } from "@/components/ComicCanvas";

export function CanvasWorkspace() {
  return (
    <section className="stage">
      <CanvasToolbar />
      <ComicCanvas />
    </section>
  );
}
