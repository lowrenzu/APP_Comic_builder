import type { Asset, AssetCategory } from "@/types";

export function filterAssets(
  assets: Asset[],
  category: AssetCategory | "all",
  query: string,
  favoritesOnly = false,
  tag = "",
): Asset[] {
  const q = query.trim().toLowerCase();
  return assets.filter((asset) => {
    if (category !== "all" && asset.category !== category) return false;
    if (favoritesOnly && !asset.favorite) return false;
    if (tag && !asset.tags.includes(tag)) return false;
    if (!q) return true;
    const hay = `${asset.name} ${asset.description} ${asset.tags.join(" ")} ${asset.viewLabel ?? ""}`.toLowerCase();
    return hay.includes(q);
  });
}

export interface CharacterGroup {
  key: string;
  name: string;
  description: string;
  views: Asset[];
  sheet?: Asset;
}

export function groupCharacters(assets: Asset[]): CharacterGroup[] {
  const views = assets.filter((a) => a.category === "character");
  const sheets = assets.filter((a) => a.category === "modelsheet");
  const order: string[] = [];
  const map = new Map<string, Asset[]>();
  for (const asset of views) {
    const key = asset.characterKey ?? asset.id;
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)?.push(asset);
  }
  return order.map((key) => {
    const group = map.get(key) ?? [];
    const primary = group[0];
    return {
      key,
      name: primary?.name.replace(/ — .*/, "") ?? "Personnage",
      description: primary?.description ?? "",
      views: group,
      sheet: sheets.find((s) => s.characterKey === key),
    };
  });
}

export function resolveSrc(asset: Asset | undefined, blobUrls: Record<string, string>): string {
  if (!asset) return "";
  if (asset.src.startsWith("idb:")) return blobUrls[asset.src.slice(4)] ?? "";
  return asset.src;
}
