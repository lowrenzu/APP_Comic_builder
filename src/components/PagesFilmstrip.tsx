import { Copy, Plus, Trash2 } from "lucide-react";
import { PageSheet } from "@/components/ComicCanvas";
import { useProject } from "@/hooks/useProject";

export function PagesFilmstrip() {
  const { pages, selectedPageId, selectPage, duplicatePage, deletePage, addPage } = useProject();
  return (
    <footer className="film">
      {pages.map((page) => {
        const scale = 72 / page.height;
        return (
          <figure
            key={page.id}
            className="thumb"
            data-on={page.id === selectedPageId ? "true" : "false"}
          >
            <button
              type="button"
              className="thumb-clip"
              style={{ width: page.width * scale, height: 72, border: 0, padding: 0 }}
              onClick={() => selectPage(page.id)}
            >
              <div style={{ width: page.width, height: page.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <PageSheet pageId={page.id} mode="thumb" />
              </div>
            </button>
            <figcaption>{page.name}</figcaption>
            <div className="row-actions">
              <button type="button" className="tiny" aria-label="Dupliquer la page" onClick={() => duplicatePage(page.id)}>
                <Copy size={12} />
              </button>
              <button type="button" className="tiny" aria-label="Supprimer la page" onClick={() => deletePage(page.id)}>
                <Trash2 size={12} />
              </button>
            </div>
          </figure>
        );
      })}
      <button type="button" className="btn btn-line" onClick={() => addPage("franco")}>
        <Plus size={14} /> Page
      </button>
    </footer>
  );
}
