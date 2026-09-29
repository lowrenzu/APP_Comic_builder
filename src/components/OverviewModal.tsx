import { PageSheet } from "@/components/ComicCanvas";
import { ModalFrame } from "@/components/ModalFrame";
import { useProjectStore } from "@/store/projectStore";

export function OverviewModal() {
  const open = useProjectStore((s) => s.overviewOpen);
  const setOpen = useProjectStore((s) => s.setOverview);
  const pages = useProjectStore((s) => s.pages);
  const current = useProjectStore((s) => s.selectedPageId);
  return (
    <ModalFrame open={open} onOpenChange={setOpen} title="Vue d'ensemble" description="Toutes les planches du projet." wide>
      <div className="asset-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
        {pages.map((page, index) => {
          const scale = 150 / page.width;
          return (
            <button
              key={page.id}
              type="button"
              className="thumb"
              data-on={page.id === current ? "true" : "false"}
              onClick={() => {
                useProjectStore.getState().selectPage(page.id);
                setOpen(false);
              }}
            >
              <div className="thumb-clip" style={{ width: page.width * scale, height: page.height * scale }}>
                <div style={{ width: page.width, height: page.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                  <PageSheet pageId={page.id} mode="thumb" />
                </div>
              </div>
              <figcaption>
                {index + 1}. {page.name}
              </figcaption>
            </button>
          );
        })}
      </div>
    </ModalFrame>
  );
}
