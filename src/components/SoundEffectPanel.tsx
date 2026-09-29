import { SFX_GROUPS, SFX_PRESETS, sfxPreset } from "@/data/soundEffects";
import { primaryLayer, useProjectStore } from "@/store/projectStore";

export function SoundEffectPanel() {
  const layer = useProjectStore((s) => primaryLayer(s));
  const update = useProjectStore((s) => s.updateSelectedLayers);
  if (!layer || layer.type !== "sfx") return null;
  return (
    <div className="prop-block">
      <div className="pane-kicker">Onomatopée</div>
      <label className="field">
        <span>Preset</span>
        <select
          value={SFX_PRESETS.some((preset) => preset.id === layer.sfxVariant) ? layer.sfxVariant : "boom"}
          onChange={(e) => {
            const preset = sfxPreset(e.target.value);
            update({
              sfxVariant: preset.id,
              text: preset.text,
              color: preset.color,
              name: preset.text,
              rotation: preset.rotation,
              fontSize: preset.fontSize,
            });
          }}
        >
          {SFX_GROUPS.map((group) => (
            <optgroup key={group} label={group}>
              {SFX_PRESETS.filter((preset) => preset.group === group).map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.text}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <div className="seg" style={{ marginTop: 8 }}>
        {([-18, -8, 0, 8, 18] as const).map((rotation) => (
          <button
            key={rotation}
            type="button"
            data-on={layer.rotation === rotation ? "true" : "false"}
            onClick={() => update({ rotation })}
          >
            {rotation > 0 ? `+${rotation}°` : `${rotation}°`}
          </button>
        ))}
      </div>
      <label className="field" style={{ marginTop: 8 }}>
        <span>Texte</span>
        <input value={layer.text} onChange={(e) => update({ text: e.target.value, name: e.target.value })} />
      </label>
    </div>
  );
}