import { useShallow } from "zustand/react/shallow";
import { useProjectStore } from "@/store/projectStore";
import { resolveSrc } from "@/utils/assetUtils";

export function useAssets() {
  return useProjectStore(
    useShallow((s) => ({
      assets: s.assets,
      blobUrls: s.blobUrls,
      libraryCategory: s.libraryCategory,
      libraryQuery: s.libraryQuery,
      favoritesOnly: s.favoritesOnly,
      libraryTag: s.libraryTag,
      recentAssetIds: s.recentAssetIds,
      setLibraryCategory: s.setLibraryCategory,
      setLibraryQuery: s.setLibraryQuery,
      setFavoritesOnly: s.setFavoritesOnly,
      setLibraryTag: s.setLibraryTag,
      addAsset: s.addAsset,
      updateAsset: s.updateAsset,
      removeAsset: s.removeAsset,
      placeAsset: s.placeAsset,
    })),
  );
}

export function useAssetUrl(assetId?: string): string {
  return useProjectStore((s) => resolveSrc(s.assets.find((a) => a.id === assetId), s.blobUrls));
}
