import type { BubbleStyle } from "@/types";

const SPIKES: Partial<Record<BubbleStyle, { fill: string; stroke: string; points: string }>> = {
  shout: {
    fill: "#fff4e4",
    stroke: "#1c2128",
    points: "100,4 118,28 148,10 142,40 176,36 154,58 196,70 150,78 168,108 128,90 112,116 96,88 60,112 72,82 28,96 52,70 8,62 48,50 22,24 62,36 78,8",
  },
  scream: {
    fill: "#ffe4e1",
    stroke: "#7a1d1d",
    points: "100,2 122,26 154,6 146,38 186,28 158,52 198,68 152,74 176,112 124,86 108,118 90,86 48,116 64,80 18,98 46,66 4,58 42,46 16,20 58,32 74,4",
  },
  electric: {
    fill: "#e5fbff",
    stroke: "#0e4a5c",
    points: "100,2 114,34 146,14 132,46 178,40 150,62 196,78 148,82 168,116 118,88 104,118 88,86 46,114 70,78 22,92 48,64 6,54 44,44 24,18 64,30 80,4",
  },
  boom: {
    fill: "#fff1d6",
    stroke: "#1c2128",
    points: "100,8 112,36 140,22 128,48 164,48 136,64 168,84 132,84 140,112 108,90 100,116 88,90 56,112 66,84 30,86 58,66 28,48 64,50 52,24 84,38",
  },
  anger: {
    fill: "#ffd9d4",
    stroke: "#7a1d1d",
    points: "100,0 126,22 160,4 148,36 196,30 160,54 198,78 152,78 170,118 116,88 100,120 82,88 28,118 48,78 2,76 40,54 6,28 52,36 42,4 74,22",
  },
};

export function BubbleShape({ style }: { style: BubbleStyle }) {
  const spike = SPIKES[style];
  if (spike) {
    return (
      <svg className="bubble-svg" viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden>
        <polygon fill={spike.fill} stroke={spike.stroke} strokeWidth="3" vectorEffect="non-scaling-stroke" points={spike.points} />
      </svg>
    );
  }
  return <div className={`bubble-skin ${style}`} aria-hidden />;
}