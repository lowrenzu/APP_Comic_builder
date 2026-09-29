import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { r as ConnectorType } from "./types-4jafLSle.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.functions-PD_2jkk1.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateAssetImage_createServerFn_handler = createServerRpc({
	id: "9218de97fbe2ce3951dcffb7b83ea438c5ebd620086089084965a9bd5167b610",
	name: "generateAssetImage",
	filename: "src/lib/ai.functions.ts"
}, (opts) => generateAssetImage.__executeServer(opts));
var generateAssetImage = createServerFn({ method: "POST" }).validator((input) => {
	const prompt = input?.prompt?.trim().slice(0, 600) ?? "";
	if (prompt.length < 3) throw new Error("Décrivez l'asset à créer.");
	return {
		prompt,
		category: (input.category ?? "custom").slice(0, 40)
	};
}).handler(generateAssetImage_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "L'IA n'est pas disponible dans cet environnement."
	};
	const styled = `${data.prompt}. Franco-Belgian comic illustration, clean ink, painterly color, no text, no watermark, no panel border.`;
	const res = await fetch("https://api.x.ai/v1/images/generations", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-imagine-image",
			prompt: styled,
			n: 1,
			response_format: "b64_json"
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Génération impossible (${res.status}).`
	};
	const body = await res.json();
	let b64 = body.data?.[0]?.b64_json ?? "";
	const url = body.data?.[0]?.url ?? "";
	if (!b64 && url) {
		const img = await fetch(url);
		if (!img.ok) return {
			ok: false,
			error: "Image générée mais non récupérable."
		};
		const bytes = new Uint8Array(await img.arrayBuffer());
		let binary = "";
		for (const byte of bytes) binary += String.fromCharCode(byte);
		b64 = btoa(binary);
	}
	if (!b64) return {
		ok: false,
		error: "Réponse image vide."
	};
	return {
		ok: true,
		dataUrl: `data:image/png;base64,${b64}`
	};
});
var searchCloudImages_createServerFn_handler = createServerRpc({
	id: "26338cd62d977a6f269c3aa6b6f22caabc46b72cface37627f76c180d8dadaa3",
	name: "searchCloudImages",
	filename: "src/lib/ai.functions.ts"
}, (opts) => searchCloudImages.__executeServer(opts));
var searchCloudImages = createServerFn({ method: "POST" }).validator((input) => ({ query: (input?.query ?? "").trim().slice(0, 160) })).handler(searchCloudImages_createServerFn_handler, async ({ data }) => {
	const { callTool } = await import("./client.server-Bkv9yx1l.mjs");
	const result = await callTool("google_drive_search", { query: data.query || "type:image" }, { connectorType: ConnectorType.GoogleDrive });
	const payload = result.data;
	const files = [];
	const list = Array.isArray(payload) ? payload : payload && typeof payload === "object" ? payload.files ?? payload.items ?? [] : [];
	if (Array.isArray(list)) for (const item of list) {
		if (!item || typeof item !== "object") continue;
		const row = item;
		const name = typeof row.name === "string" ? row.name : typeof row.title === "string" ? row.title : "";
		if (!name) continue;
		files.push({
			id: typeof row.id === "string" ? row.id : name,
			name
		});
	}
	return {
		ok: result.ok,
		error: result.errorMessage ?? null,
		loginRequired: Boolean(result.loginRequired),
		pending: Boolean(result.pending),
		files
	};
});
//#endregion
export { generateAssetImage_createServerFn_handler, searchCloudImages_createServerFn_handler };
