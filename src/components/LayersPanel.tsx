import { Copy, Group, Trash2, Ungroup } from "lucide-react";
import type { DragEvent, ReactNode } from "react";
import { useState } from "react";
import { LayerRow } from "@/components/LayerRow";
import { useLayers } from "@/hooks/useLayers";
import { useProjectStore } from "@/store/projectStore";
import type { Layer } from "@/types";
import { FONT_UI } from "@/utils/fonts";
import { childLayers, nextZ } from "@/utils/layerUtils";

type LayerFilter = "all" | "image" | "bubble" | "text";

export function LayersPanel() {
  const panelId = useProjectStore((s) => s.selectedPanelId);
  const { layers, selectedLayerIds, toggleLayer, duplicateSelected, deleteSelected, groupSelected, ungroupSelected, reorderSelected } =
    useLayers();
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<LayerFilter>("all");
  const panelLayers = layers.filter((l) => l.panelId === panelId);
  const imageCount = panelLayers.filter((l) => l.type === "image").length;

  const shown = (layer: Layer): boolean => {
    if (filter === "all") return true;
    if (layer.type === "group") return childLayers(panelLayers, panelId ?? "", layer.id).some(shown);
    if (filter === "image") return layer.type === "image";
    if (filter === "bubble") return layer.type === "bubble" || layer.type === "sfx";
    return layer.type === "text";
  };

  const renderBranch = (parentId: string | null, depth: number) => {
    const nodes = childLayers(panelLayers, panelId ?? "", parentId).slice().reverse();
    return nodes.filter(shown).map((layer) => (
      <LayerBranch
        key={layer.id}
        layer={layer}
        depth={depth}
        closed={closed}
        setClosed={setClosed}
        selected={selectedLayerIds.includes(layer.id)}
        onSelect={(additive) => toggleLayer(layer.id, additive)}
        renderBranch={renderBranch}
      />
    ));
  };

  return (
    <section className="inspector-layers">
      <div className="pane-head">
        <div>
          <div className="pane-kicker">Empilement · {imageCount} image{imageCount > 1 ? "s" : ""}</div>
          <div className="pane-title">Calques</div>
        </div>
        <div className="row-actions">
          <button type="button" className="icon-btn" title="Monter" onClick={() => reorderSelected("raise")}>
            ↑
          </button>
          <button type="button" className="icon-btn" title="Descendre" onClick={() => reorderSelected("lower")}>
            ↓
          </button>
          <button type="button" className="icon-btn" title="Grouper" onClick={() => groupSelected()}>
            <Group size={14} />
          </button>
          <button type="button" className="icon-btn" title="Dissocier" onClick={() => ungroupSelected()}>
            <Ungroup size={14} />
          </button>
          <button type="button" className="icon-btn" title="Dupliquer" onClick={() => duplicateSelected()}>
            <Copy size={14} />
          </button>
          <button type="button" className="icon-btn" title="Supprimer" onClick={() => deleteSelected()}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="layer-filters">
        {(
          [
            ["all", "Tous"],
            ["image", "Images"],
            ["bubble", "Bulles"],
            ["text", "Textes"],
          ] as const
        ).map(([id, label]) => (
          <button key={id} type="button" className="chip" data-on={filter === id ? "true" : "false"} onClick={() => setFilter(id)}>
            {label}
          </button>
        ))}
      </div>
      <div className="layer-list">
        {panelId ? renderBranch(null, 0) : <p className="hint">Sélectionnez une case.</p>}
        {!panelLayers.length && panelId ? <p className="hint">Case vide. Glissez un asset depuis la bibliothèque.</p> : null}
      </div>
      <div className="prop-block row-actions">
        <button type="button" className="btn btn-line" onClick={() => reorderSelected("front")}>
          Premier plan
        </button>
        <button type="button" className="btn btn-line" onClick={() => reorderSelected("back")}>
          Arrière-plan
        </button>
        <button type="button" className="btn btn-line" onClick={() => useProjectStore.getState().lockBackgrounds()}>
          Cadenas décors
        </button>
        <button
          type="button"
          className="btn btn-line"
          onClick={() => {
            const id = uidGroup();
            if (!panelId) return;
            const z = nextZ(useProjectStore.getState().layers, panelId);
            useProjectStore.getState().patchLayers([
              ...useProjectStore.getState().layers,
              {
                ...emptyGroup(id, panelId, z),
              },
            ]);
            useProjectStore.getState().selectLayers([id]);
          }}
        >
          + Groupe
        </button>
      </div>
      <HistoryList />
    </section>
  );
}

function HistoryList() {
  const pastLabels = useProjectStore((s) => s.pastLabels);
  const futureLabels = useProjectStore((s) => s.futureLabels);
  const undo = useProjectStore((s) => s.undo);
  const redo = useProjectStore((s) => s.redo);
  const jump = useProjectStore((s) => s.jumpHistory);
  const recent = pastLabels.map((label, index) => ({ label, index })).slice(-12).reverse();
  return (
    <div className="prop-block">
      <div className="pane-kicker">Historique</div>
      <div className="row-actions">
        <button type="button" className="btn btn-line" disabled={!pastLabels.length} onClick={() => undo()}>
          Annuler
        </button>
        <button type="button" className="btn btn-line" disabled={!futureLabels.length} onClick={() => redo()}>
          Rétablir
        </button>
      </div>
      <div className="history-list">
        {futureLabels.length ? <p className="hint">{futureLabels.length} à rétablir</p> : null}
        <p className="hint">Maintenant</p>
        {recent.map((item) => (
          <button key={item.index} type="button" className="history-step" onClick={() => jump(item.index)}>
            {item.label}
          </button>
        ))}
        {!pastLabels.length ? <p className="hint">Aucune étape.</p> : null}
      </div>
    </div>
  );
}

function LayerBranch({
  layer,
  depth,
  closed,
  setClosed,
  selected,
  onSelect,
  renderBranch,
}: {
  layer: Layer;
  depth: number;
  closed: Record<string, boolean>;
  setClosed: (v: Record<string, boolean>) => void;
  selected: boolean;
  onSelect: (additive: boolean) => void;
  renderBranch: (parentId: string | null, depth: number) => ReactNode;
}) {
  const update = useProjectStore((s) => s.patchLayers);
  const open = !closed[layer.id];
  const place = (event: DragEvent<HTMLElement>) =>
    event.clientY > event.currentTarget.getBoundingClientRect().top + event.currentTarget.getBoundingClientRect().height / 2
      ? "below"
      : "above";
  return (
    <>
      <LayerRow
        layer={layer}
        depth={depth}
        open={open}
        selected={selected}
        onToggleOpen={() => setClosed({ ...closed, [layer.id]: !closed[layer.id] })}
        onSelect={onSelect}
        onToggleVisible={() =>
          update(
            useProjectStore.getState().layers.map((l) => (l.id === layer.id ? { ...l, visible: !l.visible } : l)),
          )
        }
        onToggleLock={() =>
          update(useProjectStore.getState().layers.map((l) => (l.id === layer.id ? { ...l, locked: !l.locked } : l)))
        }
        onDragStart={(event) => {
          event.dataTransfer.setData("application/x-atelier-layer", layer.id);
          event.dataTransfer.effectAllowed = "move";
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
          event.currentTarget.dataset.drop = place(event);
        }}
        onDragLeave={(event) => {
          delete event.currentTarget.dataset.drop;
        }}
        onDrop={(event) => {
          event.preventDefault();
          const from = event.dataTransfer.getData("application/x-atelier-layer");
          const where = place(event);
          delete event.currentTarget.dataset.drop;
          if (from) useProjectStore.getState().moveLayer(from, layer.id, where);
        }}
      />
      {layer.type === "group" && open ? renderBranch(layer.id, depth + 1) : null}
    </>
  );
}

function uidGroup() {
  return `group-${Math.random().toString(36).slice(2, 8)}`;
}

function emptyGroup(id: string, panelId: string, z: number): Layer {
  return {
    id,
    panelId,
    parentId: null,
    name: "Groupe",
    type: "group",
    visible: true,
    locked: false,
    opacity: 1,
    blendMode: "normal",
    z,
    x: 10,
    y: 10,
    w: 40,
    h: 40,
    rotation: 0,
    flipH: false,
    flipV: false,
    crop: { x: 0, y: 0, w: 1, h: 1 },
    mask: null,
    text: "",
    fontFamily: FONT_UI,
    fontSize: 16,
    fontWeight: 600,
    italic: false,
    color: "#1c2128",
    align: "center",
    bubbleStyle: "classic",
    sfxVariant: "boom",
  };
}
