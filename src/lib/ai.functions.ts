import { createServerFn } from "@tanstack/react-start";
import { ConnectorType } from "@/lib/app-data/types";

export const generateAssetImage = createServerFn({ method: "POST" })
  .validator((input: { prompt: string; category: string }) => {
    const prompt = input?.prompt?.trim().slice(0, 600) ?? "";
    if (prompt.length < 3) throw new Error("Décrivez l'asset à créer.");
    return { prompt, category: (input.category ?? "custom").slice(0, 40) };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "L'IA n'est pas disponible dans cet environnement." };
    const styled = `${data.prompt}. Franco-Belgian comic illustration, clean ink, painterly color, no text, no watermark, no panel border.`;
    const res = await fetch("https://api.x.ai/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-imagine-image",
        prompt: styled,
        n: 1,
        response_format: "b64_json",
      }),
    });
    if (!res.ok) return { ok: false as const, error: `Génération impossible (${res.status}).` };
    const body = (await res.json()) as {
      data?: { b64_json?: string; url?: string }[];
    };
    let b64 = body.data?.[0]?.b64_json ?? "";
    const url = body.data?.[0]?.url ?? "";
    if (!b64 && url) {
      const img = await fetch(url);
      if (!img.ok) return { ok: false as const, error: "Image générée mais non récupérable." };
      const bytes = new Uint8Array(await img.arrayBuffer());
      let binary = "";
      for (const byte of bytes) binary += String.fromCharCode(byte);
      b64 = btoa(binary);
    }
    if (!b64) return { ok: false as const, error: "Réponse image vide." };
    return { ok: true as const, dataUrl: `data:image/png;base64,${b64}` };
  });

export const searchCloudImages = createServerFn({ method: "POST" })
  .validator((input: { query: string }) => ({
    query: (input?.query ?? "").trim().slice(0, 160),
  }))
  .handler(async ({ data }) => {
    const { callTool } = await import("@/lib/app-data/client.server");
    const result = await callTool(
      "google_drive_search",
      { query: data.query || "type:image" },
      { connectorType: ConnectorType.GoogleDrive },
    );
    const payload = result.data;
    const files: { id: string; name: string }[] = [];
    const list = Array.isArray(payload)
      ? payload
      : payload && typeof payload === "object"
        ? ((payload as { files?: unknown[]; items?: unknown[] }).files ??
          (payload as { items?: unknown[] }).items ??
          [])
        : [];
    if (Array.isArray(list)) {
      for (const item of list) {
        if (!item || typeof item !== "object") continue;
        const row = item as { id?: unknown; name?: unknown; title?: unknown };
        const name = typeof row.name === "string" ? row.name : typeof row.title === "string" ? row.title : "";
        if (!name) continue;
        files.push({ id: typeof row.id === "string" ? row.id : name, name });
      }
    }
    return {
      ok: result.ok,
      error: result.errorMessage ?? null,
      loginRequired: Boolean(result.loginRequired),
      pending: Boolean(result.pending),
      files,
    };
  });
