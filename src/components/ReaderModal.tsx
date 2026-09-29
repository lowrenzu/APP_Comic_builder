import { useEffect, useMemo, useRef, useState } from "react";
import { PageSheet } from "@/components/ComicCanvas";
import { isWebtoonPreset } from "@/data/templates";
import { useProjectStore } from "@/store/projectStore";
import type { Page } from "@/types";

export function ReaderModal() {
  const open = useProjectStore((s) => s.readerOpen);
  const mode = useProjectStore((s) => s.readerMode);
  const pages = useProjectStore((s) => s.pages);
  const selectedPageId = useProjectStore((s) => s.selectedPageId);
  const setReader = useProjectStore((s) => s.setReader);
  const stageRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 1100, h: 860 });
  const [index, setIndex] = useState(0);

  const albumPages = useMemo(() => pages.filter((p) => !isWebtoonPreset(p.preset)), [pages]);
  const webtoonPages = useMemo(() => pages.filter((p) => isWebtoonPreset(p.preset)), [pages]);
  const spread = albumPages.length ? albumPages : pages;
  const strip = webtoonPages.length ? webtoonPages : pages;
  const page = spread[Math.min(index, Math.max(0, spread.length - 1))];

  const wasOpen = useRef(false);
  useEffect(() => {
    if (open && !wasOpen.current) {
      const i = spread.findIndex((p) => p.id === selectedPageId);
      setIndex(i >= 0 ? i : 0);
    }
    wasOpen.current = open;
  }, [open, selectedPageId, spread]);

  useEffect(() => {
    if (!open) return;
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Escape") setReader(false);
      if (mode !== "album") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setIndex((i) => Math.min(spread.length - 1, i + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mode, setReader, spread.length]);

  if (!open) return null;

  const go = (dir: -1 | 1) => setIndex((i) => Math.min(spread.length - 1, Math.max(0, i + dir)));

  return (
    <div className="reader" role="dialog" aria-label="Lecture" data-mode={mode}>
      <div className="reader-bar">
        <div className="reader-title">
          <strong>Lecture</strong>
          <span>{mode === "album" ? page?.name : "Défilement"}</span>
        </div>
        <div className="seg reader-seg">
          <button type="button" data-on={mode === "album" ? "true" : "false"} onClick={() => setReader(true, "album")}>
            Album
          </button>
          <button type="button" data-on={mode === "webtoon" ? "true" : "false"} onClick={() => setReader(true, "webtoon")}>
            Webtoon
          </button>
        </div>
        <button type="button" className="btn btn-accent" onClick={() => setReader(false)}>
          Fermer
        </button>
      </div>

      {mode === "album" && page ? (
        <div className="reader-stage">
          <button type="button" className="reader-turn" disabled={index <= 0} onClick={() => go(-1)} aria-label="Planche précédente">
            ‹
          </button>
          <div className="reader-fit" ref={stageRef}>
            <AlbumPage page={page} box={box} onSide={(dir) => go(dir)} />
          </div>
          <button
            type="button"
            className="reader-turn"
            disabled={index >= spread.length - 1}
            onClick={() => go(1)}
            aria-label="Planche suivante"
          >
            ›
          </button>
        </div>
      ) : (
        <div className="reader-webtoon" ref={stageRef}>
          {strip.map((p) => {
            const scale = Math.min(1, Math.max(0.2, (box.w - 28) / p.width));
            return (
              <div key={p.id} className="reader-web-page" style={{ width: p.width * scale, height: p.height * scale }}>
                <div style={{ width: p.width, height: p.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                  <PageSheet pageId={p.id} mode="read" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="reader-foot">
        {mode === "album" ? (
          <>
            <div className="reader-dots">
              {spread.map((p, i) => (
                <button key={p.id} type="button" data-on={i === index ? "true" : "false"} onClick={() => setIndex(i)} aria-label={p.name} />
              ))}
            </div>
            <span>
              {index + 1} / {spread.length}
              <em>flèches pour tourner</em>
            </span>
          </>
        ) : (
          <span>Défilement vertical</span>
        )}
      </div>
    </div>
  );
}

function AlbumPage({
  page,
  box,
  onSide,
}: {
  page: Page;
  box: { w: number; h: number };
  onSide: (dir: -1 | 1) => void;
}) {
  const scale = Math.max(0.05, Math.min((box.w - 8) / page.width, (box.h - 8) / page.height));
  return (
    <div
      key={page.id}
      className="reader-sheet"
      style={{ width: page.width * scale, height: page.height * scale }}
      onPointerUp={(e) => {
        if (e.button !== 0) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        if (x < 0.22) onSide(-1);
        else if (x > 0.78) onSide(1);
      }}
    >
      <div style={{ width: page.width, height: page.height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <PageSheet pageId={page.id} mode="read" />
      </div>
    </div>
  );
}