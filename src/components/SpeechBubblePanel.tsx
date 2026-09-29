import { BUBBLE_GROUPS, BUBBLE_PRESETS, bubblePreset } from "@/data/bubbles";
import { primaryLayer, useProjectStore } from "@/store/projectStore";

export function SpeechBubblePanel() {
  const layer = useProjectStore((s) => primaryLayer(s));
  const update = useProjectStore((s) => s.updateSelectedLayers);
  if (!layer || layer.type !== "bubble") return null;
  return (
    <div className="prop-block">
      <div className="pane-kicker">Bulle</div>
      <label className="field">
        <span>Forme</span>
        <select
          value={layer.bubbleStyle}
          onChange={(e) => {
            const preset = bubblePreset(e.target.value as typeof layer.bubbleStyle);
            update({
              bubbleStyle: preset.style,
              color: preset.ink,
              fontFamily: preset.fontFamily ?? layer.fontFamily,
              fontWeight: preset.weight ?? layer.fontWeight,
              italic: preset.italic ?? false,
              fontSize: preset.fontSize ?? layer.fontSize,
            });
          }}
        >
          {BUBBLE_GROUPS.map((group) => (
            <optgroup key={group} label={group}>
              {BUBBLE_PRESETS.filter((preset) => preset.group === group).map((preset) => (
                <option key={preset.style} value={preset.style}>
                  {preset.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <label className="field" style={{ marginTop: 8 }}>
        <span>Longueur de queue {Math.round((layer.tailLen ?? 1) * 100)}</span>
        <input
          type="range"
          min={35}
          max={280}
          value={Math.round((layer.tailLen ?? 1) * 100)}
          onChange={(e) => update({ tailLen: Number(e.target.value) / 100 })}
        />
      </label>
      <label className="field" style={{ marginTop: 8 }}>
        <span>Texte</span>
        <textarea value={layer.text} onChange={(e) => update({ text: e.target.value })} />
      </label>
    </div>
  );
}