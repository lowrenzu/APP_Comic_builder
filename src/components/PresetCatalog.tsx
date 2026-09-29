import type { ReactNode } from "react";
import { BubbleShape } from "@/components/BubbleShape";
import { BUBBLE_GROUPS, BUBBLE_PRESETS, type BubblePreset } from "@/data/bubbles";
import { SFX_GROUPS, SFX_PRESETS, type SfxPreset } from "@/data/soundEffects";
import { PAGE_PRESETS, PRESET_FAMILIES, isWebtoonPreset, layoutBoxes, type PagePresetInfo } from "@/data/templates";
import { useProjectStore } from "@/store/projectStore";
import { resolveFont } from "@/utils/fonts";

function match(query: string, ...parts: string[]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return parts.some((part) => part.toLowerCase().includes(q));
}

function placeBubble(preset: BubblePreset) {
  const panel = useProjectStore.getState().selectedPanelId;
  if (!panel) {
    useProjectStore.getState().toast("Sélectionnez une case.");
    return;
  }
  useProjectStore.getState().addBubble(panel, preset.style, preset.sample);
}

function placeSfx(preset: SfxPreset) {
  const panel = useProjectStore.getState().selectedPanelId;
  if (!panel) {
    useProjectStore.getState().toast("Sélectionnez une case.");
    return;
  }
  useProjectStore.getState().addSfx(panel, preset.id);
}

function BubbleCard({ preset }: { preset: BubblePreset }) {
  return (
    <button type="button" className="preset-card" onClick={() => placeBubble(preset)}>
      <span className="preset-stage">
        <span className="preset-bubble">
          <span className="bubble-wrap" data-style={preset.style}>
            <BubbleShape style={preset.style} />
            <span
              className="bubble-text"
              style={{
                color: preset.ink,
                fontFamily: resolveFont(preset.fontFamily),
                fontStyle: preset.italic ? "italic" : "normal",
                fontWeight: preset.weight ?? 500,
                fontSize: 11,
              }}
            >
              {preset.sample}
            </span>
          </span>
        </span>
      </span>
      <strong>{preset.name}</strong>
      <em>{preset.group}</em>
    </button>
  );
}

function SfxCard({ preset }: { preset: SfxPreset }) {
  return (
    <button type="button" className="preset-card" onClick={() => placeSfx(preset)}>
      <span className="preset-stage sfx-stage">
        <span style={{ color: preset.color, transform: `rotate(${preset.rotation}deg)`, fontSize: Math.min(26, preset.fontSize * 0.62) }}>
          {preset.text}
        </span>
      </span>
      <strong>{preset.text}</strong>
      <em>{preset.group}</em>
    </button>
  );
}

function LayoutCard({ info }: { info: PagePresetInfo }) {
  const boxes = layoutBoxes(info.id);
  const ratio = info.width / info.height;
  return (
    <button
      type="button"
      className="preset-card"
      onClick={() => {
        useProjectStore.getState().addPage(info.id);
        useProjectStore.getState().toast(`Planche « ${info.name} » ajoutée.`);
      }}
    >
      <span className="preset-stage layout-stage" data-night={isWebtoonPreset(info.id) ? "true" : "false"}>
        <span className="layout-thumb" style={{ aspectRatio: `${Math.max(0.35, Math.min(ratio, 2.4))}` }}>
          {boxes.map((box, index) => (
            <i
              key={`${info.id}-${index}`}
              style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
            />
          ))}
        </span>
      </span>
      <strong>{info.name}</strong>
      <em>{info.blurb}</em>
    </button>
  );
}

function Shelf({ title, action, onAction, children }: { title: string; action?: string; onAction?: () => void; children: ReactNode }) {
  return (
    <section className="shelf">
      <div className="shelf-head">
        <strong>{title}</strong>
        {action && onAction ? (
          <button type="button" className="shelf-more" onClick={onAction}>
            {action}
          </button>
        ) : null}
      </div>
      <div className="shelf-row">{children}</div>
    </section>
  );
}

export function PresetShelves({ query }: { query: string }) {
  const setCategory = useProjectStore((s) => s.setLibraryCategory);
  const layouts = PAGE_PRESETS.filter((p) => match(query, p.name, p.blurb, p.family));
  const bubbles = BUBBLE_PRESETS.filter((p) => match(query, p.name, p.sample, p.group));
  const sfx = SFX_PRESETS.filter((p) => match(query, p.text, p.group));
  if (!layouts.length && !bubbles.length && !sfx.length) return null;
  return (
    <div className="shelves">
      {layouts.length ? (
        <Shelf title="Gabarits" action="Tout voir" onAction={() => setCategory("layout")}>
          {layouts.slice(0, 12).map((info) => (
            <LayoutCard key={info.id} info={info} />
          ))}
        </Shelf>
      ) : null}
      {bubbles.length ? (
        <Shelf title="Bulles" action="Tout voir" onAction={() => setCategory("bubble")}>
          {bubbles.slice(0, 12).map((preset) => (
            <BubbleCard key={preset.style} preset={preset} />
          ))}
        </Shelf>
      ) : null}
      {sfx.length ? (
        <Shelf title="Onomatopées" action="Tout voir" onAction={() => setCategory("sfx")}>
          {sfx.slice(0, 8).map((preset) => (
            <SfxCard key={preset.id} preset={preset} />
          ))}
        </Shelf>
      ) : null}
    </div>
  );
}

export function LayoutPresets({ query }: { query: string }) {
  const items = PAGE_PRESETS.filter((p) => match(query, p.name, p.blurb, p.family));
  if (!items.length) return <p className="hint">Aucun gabarit pour cette recherche.</p>;
  return (
    <div className="preset-groups">
      {PRESET_FAMILIES.map((family) => {
        const group = items.filter((p) => p.family === family);
        if (!group.length) return null;
        return (
          <section key={family}>
            <div className="shelf-head">
              <strong>{family}</strong>
            </div>
            <div className="preset-grid">
              {group.map((info) => (
                <LayoutCard key={info.id} info={info} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function BubblePresets({ query }: { query: string }) {
  const items = BUBBLE_PRESETS.filter((p) => match(query, p.name, p.sample, p.group));
  if (!items.length) return <p className="hint">Aucune bulle pour cette recherche.</p>;
  return (
    <div className="preset-groups">
      {BUBBLE_GROUPS.map((group) => {
        const rows = items.filter((p) => p.group === group);
        if (!rows.length) return null;
        return (
          <section key={group}>
            <div className="shelf-head">
              <strong>{group}</strong>
            </div>
            <div className="preset-grid">
              {rows.map((preset) => (
                <BubbleCard key={preset.style} preset={preset} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function SfxPresets({ query }: { query: string }) {
  const items = SFX_PRESETS.filter((p) => match(query, p.text, p.group));
  if (!items.length) return <p className="hint">Aucune onomatopée pour cette recherche.</p>;
  return (
    <div className="preset-groups">
      {SFX_GROUPS.map((group) => {
        const rows = items.filter((p) => p.group === group);
        if (!rows.length) return null;
        return (
          <section key={group}>
            <div className="shelf-head">
              <strong>{group}</strong>
            </div>
            <div className="preset-grid">
              {rows.map((preset) => (
                <SfxCard key={preset.id} preset={preset} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
