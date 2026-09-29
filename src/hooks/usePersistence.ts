import { useEffect } from "react";
import { DEMO_ASSETS } from "@/data/demoAssets";
import { createDemoProject, DEMO_LAYOUT_REV } from "@/data/demoProject";
import { useProjectStore } from "@/store/projectStore";
import { idbGet } from "@/utils/idb";
import { parseProjectFile, STORAGE_KEY, toProjectFile } from "@/utils/projectSerializer";

const REV_KEY = "atelier-bd-layout-rev";

/** Replace the stock collage when a newer planche ships. Keeps imported projects. */
export function migrateDemoLayout(): boolean {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem(REV_KEY) === String(DEMO_LAYOUT_REV)) return false;
  let parsed: ReturnType<typeof parseProjectFile> = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) parsed = parseProjectFile(JSON.parse(raw));
  } catch {
    parsed = null;
  }
  const stock =
    !parsed || (parsed.project.id === "projet-ile" && parsed.assets.every((asset) => asset.source === "demo"));
  if (!stock) {
    localStorage.setItem(REV_KEY, String(DEMO_LAYOUT_REV));
    return false;
  }
  if (!parsed) {
    localStorage.setItem(REV_KEY, String(DEMO_LAYOUT_REV));
    return false;
  }
  const demo = createDemoProject();
  const state = useProjectStore.getState();
  const pageId = demo.pages.some((p) => p.id === state.selectedPageId) ? state.selectedPageId : demo.pages[0].id;
  const meta = { ...demo.meta, updatedAt: Date.now() };
  useProjectStore.setState({
    meta,
    pages: demo.pages,
    panels: demo.panels,
    layers: demo.layers,
    assets: DEMO_ASSETS,
    selectedPageId: pageId,
    selectedPanelId: demo.panels.find((p) => p.pageId === pageId)?.id ?? null,
    selectedLayerIds: [],
    past: [],
    future: [],
    saveState: "saved",
  });
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(toProjectFile(meta, demo.pages, demo.panels, demo.layers, DEMO_ASSETS, pageId)),
    );
    localStorage.setItem(REV_KEY, String(DEMO_LAYOUT_REV));
  } catch {
    /* quota : la mémoire suffit pour cette session */
  }
  return true;
}

if (typeof window !== "undefined") migrateDemoLayout();

export function usePersistence() {
  const hydrate = useProjectStore((s) => s.setBlobUrls);

  useEffect(() => {
    const migrated = migrateDemoLayout();
    if (!migrated) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = parseProjectFile(JSON.parse(raw));
          if (parsed) {
            useProjectStore.setState({
              meta: parsed.project,
              pages: parsed.pages,
              panels: parsed.panels,
              layers: parsed.layers,
              assets: parsed.assets,
              selectedPageId: parsed.selectedPageId || parsed.pages[0]?.id,
              selectedPanelId:
                parsed.panels.find((p) => p.pageId === (parsed.selectedPageId || parsed.pages[0]?.id))?.id ?? null,
              selectedLayerIds: [],
              past: [],
              future: [],
              saveState: "saved",
            });
          }
        }
      } catch {
        /* projet local illisible : on garde l'exemple */
      }
    }

    let cancel = false;
    const assets = useProjectStore.getState().assets;
    void (async () => {
      const urls: Record<string, string> = {};
      for (const asset of assets) {
        if (!asset.src.startsWith("idb:")) continue;
        const data = await idbGet(asset.src.slice(4));
        if (data) urls[asset.src.slice(4)] = data;
      }
      if (!cancel && Object.keys(urls).length) hydrate(urls);
    })();
    return () => {
      cancel = true;
    };
  }, [hydrate]);

  useEffect(() => {
    let timer: number | undefined;
    const unsub = useProjectStore.subscribe((state, prev) => {
      const changed =
        state.pages !== prev.pages ||
        state.panels !== prev.panels ||
        state.layers !== prev.layers ||
        state.assets !== prev.assets ||
        state.meta !== prev.meta ||
        state.selectedPageId !== prev.selectedPageId;
      if (!changed) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const s = useProjectStore.getState();
        try {
          const file = toProjectFile(s.meta, s.pages, s.panels, s.layers, s.assets, s.selectedPageId);
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...file, project: { ...file.project, updatedAt: Date.now() } }));
          useProjectStore.setState({ saveState: "saved" });
        } catch {
          useProjectStore.getState().toast("Sauvegarde locale impossible.");
        }
      }, 450);
    });
    return () => {
      unsub();
      window.clearTimeout(timer);
    };
  }, []);
}
