import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { A as Eye, B as BookOpen, C as LayoutGrid, D as GripVertical, E as Group, F as Cloud, I as ChevronRight, L as ChevronDown, M as Crop, N as Copy, O as FlipVertical2, P as Columns2, R as Camera, S as Library, T as ImageDown, _ as MousePointer2, a as Undo2, b as Lock, c as Trash2, d as Search, f as Scaling, g as Move, h as Plus, i as Ungroup, j as EyeOff, k as FlipHorizontal2, l as Star, m as Redo2, n as WandSparkles, o as Type, p as Rows2, r as User, t as Zap, u as Sparkles, v as Mountain, w as Image$1, x as LockOpen, y as MessageCircle, z as Box } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as create, t as useShallow } from "../_libs/zustand.mjs";
import { a as Root2, i as Portal2, n as Item2, o as Trigger, r as Label2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CzSDP5f-.js
var routes_CzSDP5f__exports = /* @__PURE__ */ __exportAll({
	component: () => Home,
	t: () => importImageFiles
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ModalFrame({ open, onOpenChange, title, description, wide, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: wide ? "modal modal-wide" : "modal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "pane-title",
					children: title
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "hint",
					children: description
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "sr-only",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { marginTop: 12 },
					children
				})
			]
		})] })
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateAssetImage = createServerFn({ method: "POST" }).validator((input) => {
	const prompt = input?.prompt?.trim().slice(0, 600) ?? "";
	if (prompt.length < 3) throw new Error("Décrivez l'asset à créer.");
	return {
		prompt,
		category: (input.category ?? "custom").slice(0, 40)
	};
}).handler(createSsrRpc("9218de97fbe2ce3951dcffb7b83ea438c5ebd620086089084965a9bd5167b610"));
var searchCloudImages = createServerFn({ method: "POST" }).validator((input) => ({ query: (input?.query ?? "").trim().slice(0, 160) })).handler(createSsrRpc("26338cd62d977a6f269c3aa6b6f22caabc46b72cface37627f76c180d8dadaa3"));
var now = 1715e9;
function demo(partial) {
	return {
		description: "",
		tags: [],
		favorite: false,
		createdAt: now,
		source: "demo",
		mime: partial.src.endsWith(".png") ? "image/png" : "image/jpeg",
		...partial
	};
}
var DEMO_ASSETS = [
	demo({
		id: "a-georges",
		name: "Georges",
		description: "Border Collie brun et blanc",
		category: "character",
		src: "/demo/georges-face.png",
		tags: [
			"chien",
			"héros",
			"face"
		],
		favorite: true,
		characterKey: "georges",
		viewLabel: "Face"
	}),
	demo({
		id: "a-georges-profile",
		name: "Georges",
		description: "Border Collie brun et blanc",
		category: "character",
		src: "/demo/georges-profile.png",
		tags: ["chien", "profil"],
		characterKey: "georges",
		viewLabel: "Profil"
	}),
	demo({
		id: "a-heroine",
		name: "Léna",
		description: "Exploratrice, cheveux courts, sacoche de cuir",
		category: "character",
		src: "/demo/heroine.png",
		tags: ["héroïne", "face"],
		favorite: true,
		characterKey: "lena",
		viewLabel: "Face"
	}),
	demo({
		id: "a-explorer",
		name: "Marlow",
		description: "Explorateur, barbe argentée, veste kaki",
		category: "character",
		src: "/demo/explorer.png",
		tags: ["explorateur"],
		characterKey: "marlow",
		viewLabel: "Face"
	}),
	demo({
		id: "a-alien",
		name: "Silar",
		description: "Présence teal, marques bioluminescentes",
		category: "character",
		src: "/demo/alien.png",
		tags: ["alien"],
		characterKey: "silar",
		viewLabel: "Face"
	}),
	demo({
		id: "a-sheet-georges",
		name: "Model sheet — Georges",
		description: "Face, profil, poses et expressions",
		category: "modelsheet",
		src: "/demo/sheet-georges.jpg",
		tags: ["georges", "référence"],
		characterKey: "georges",
		viewLabel: "Feuille"
	}),
	demo({
		id: "a-sheet-heroine",
		name: "Model sheet — Léna",
		description: "Vues de référence de l'héroïne",
		category: "modelsheet",
		src: "/demo/sheet-heroine.jpg",
		tags: ["léna", "référence"],
		characterKey: "lena",
		viewLabel: "Feuille"
	}),
	demo({
		id: "a-ocean",
		name: "Océan",
		description: "Pacifique en fin d'après-midi",
		category: "background",
		src: "/demo/ocean.jpg",
		tags: ["mer", "ciel"],
		favorite: true
	}),
	demo({
		id: "a-forest",
		name: "Forêt",
		description: "Jungle intérieure, lumière dorée",
		category: "background",
		src: "/demo/forest.jpg",
		tags: ["jungle"]
	}),
	demo({
		id: "a-ruins",
		name: "Ruines",
		description: "Arches de pierre envahies de mousse",
		category: "background",
		src: "/demo/ruins.jpg",
		tags: ["ruines", "île"]
	}),
	demo({
		id: "a-island",
		name: "Île",
		description: "Île volcanique vue depuis le large",
		category: "background",
		src: "/demo/island.jpg",
		tags: ["île", "horizon"]
	}),
	demo({
		id: "a-base",
		name: "Base futuriste",
		description: "Installation enfouie dans la falaise",
		category: "background",
		src: "/demo/base.jpg",
		tags: ["base", "nuit"]
	}),
	demo({
		id: "a-photo",
		name: "Côte volcanique",
		description: "Photo de référence — sable noir",
		category: "photo",
		src: "/demo/photo-coast.jpg",
		tags: ["photo", "côte"]
	}),
	demo({
		id: "a-texture",
		name: "Mousse et pierre",
		description: "Texture de surface",
		category: "texture",
		src: "/demo/texture-moss.jpg",
		tags: ["texture", "mousse"]
	}),
	demo({
		id: "a-vehicle",
		name: "Canot",
		description: "Annexe d'expédition",
		category: "vehicle",
		src: "/demo/vehicle.png",
		tags: ["bateau"]
	}),
	demo({
		id: "a-artifact",
		name: "Artefact",
		description: "Pierre gravée, cœur ambre",
		category: "object",
		src: "/demo/artifact.png",
		tags: ["relique"]
	}),
	demo({
		id: "a-computer",
		name: "Ordinateur de terrain",
		description: "Tablette cartographique",
		category: "object",
		src: "/demo/computer.png",
		tags: ["tech"]
	}),
	demo({
		id: "a-weapon",
		name: "Pistolet de détresse",
		description: "Fusée de signalisation",
		category: "object",
		src: "/demo/weapon.png",
		tags: ["signal"]
	}),
	demo({
		id: "a-lamp",
		name: "Lanterne",
		description: "Lanterne d'expédition",
		category: "object",
		src: "/demo/lamp.png",
		tags: ["lumière"]
	}),
	demo({
		id: "a-fx-light",
		name: "Lumière",
		description: "Halo ambre",
		category: "effect",
		src: "/demo/fx-light.png",
		tags: ["glow"]
	}),
	demo({
		id: "a-fx-smoke",
		name: "Fumée",
		description: "Volutes",
		category: "effect",
		src: "/demo/fx-smoke.png",
		tags: ["smoke"]
	}),
	demo({
		id: "a-fx-explosion",
		name: "Explosion",
		description: "Éclat de feu",
		category: "effect",
		src: "/demo/fx-explosion.png",
		tags: ["boom"]
	}),
	demo({
		id: "a-fx-lightning",
		name: "Éclairs",
		description: "Arc électrique",
		category: "effect",
		src: "/demo/fx-lightning.png",
		tags: ["zap"]
	}),
	demo({
		id: "a-fx-dust",
		name: "Poussière",
		description: "Particules dorées",
		category: "effect",
		src: "/demo/fx-dust.png",
		tags: ["dust"]
	})
];
var FONT_UI = "\"Inter\", ui-sans-serif, system-ui, sans-serif";
var FONT_DISPLAY = "\"Bangers\", system-ui, sans-serif";
var FONT_MARKER = "\"Permanent Marker\", cursive";
var UI_FONTS = [
	{
		value: FONT_UI,
		label: "Inter"
	},
	{
		value: FONT_DISPLAY,
		label: "Bangers"
	},
	{
		value: FONT_MARKER,
		label: "Permanent Marker"
	}
];
/** Map stored families, including the previous Plex / Lilita stacks, onto the studio fonts. */
function resolveFont(family, role) {
	if (role === "sfx") return FONT_DISPLAY;
	const name = (family ?? "").toLowerCase();
	if (name.includes("bangers") || name.includes("lilita")) return FONT_DISPLAY;
	if (name.includes("marker") || name.includes("permanent")) return FONT_MARKER;
	if (!name || name.includes("inter") || name.includes("plex") || name.includes("comic") || name.includes("mono")) return FONT_UI;
	return family || "\"Inter\", ui-sans-serif, system-ui, sans-serif";
}
var FULL_CROP = {
	x: 0,
	y: 0,
	w: 1,
	h: 1
};
function cropImageStyle(crop) {
	const w = Math.max(.02, crop.w);
	const h = Math.max(.02, crop.h);
	return {
		position: "absolute",
		width: `${100 / w}%`,
		height: `${100 / h}%`,
		left: `${-crop.x / w * 100}%`,
		top: `${-crop.y / h * 100}%`,
		maxWidth: "none",
		objectFit: "fill"
	};
}
/** Fill a frame without stretching. A partial crop recenters and zooms. */
function coverImageStyle(crop) {
	const cx = (crop.x + crop.w / 2) * 100;
	const cy = (crop.y + crop.h / 2) * 100;
	const zoom = 1 / Math.max(.12, Math.max(crop.w, crop.h));
	return {
		width: "100%",
		height: "100%",
		objectFit: "cover",
		objectPosition: `${cx}% ${cy}%`,
		transform: zoom > 1.04 ? `scale(${Math.min(zoom, 5)})` : void 0,
		transformOrigin: `${cx}% ${cy}%`
	};
}
function maskToClip(mask) {
	if (!mask) return void 0;
	if (mask.type === "ellipse") {
		const cx = (mask.x + mask.w / 2) * 100;
		const cy = (mask.y + mask.h / 2) * 100;
		return `ellipse(${Math.max(1, mask.w * 50)}% ${Math.max(1, mask.h * 50)}% at ${cx}% ${cy}%)`;
	}
	if (mask.type === "free" && mask.points && mask.points.length >= 3) return `polygon(${mask.points.map((p) => `${p.x * 100}% ${p.y * 100}%`).join(", ")})`;
	const top = mask.y * 100;
	const right = (1 - mask.x - mask.w) * 100;
	const bottom = (1 - mask.y - mask.h) * 100;
	const left = mask.x * 100;
	return `inset(${top}% ${Math.max(0, right)}% ${Math.max(0, bottom)}% ${left}%)`;
}
function boundsOf(boxes) {
	if (!boxes.length) return {
		x: 10,
		y: 10,
		w: 30,
		h: 30
	};
	const x = Math.min(...boxes.map((b) => b.x));
	const y = Math.min(...boxes.map((b) => b.y));
	const right = Math.max(...boxes.map((b) => b.x + b.w));
	const bottom = Math.max(...boxes.map((b) => b.y + b.h));
	return {
		x,
		y,
		w: Math.max(2, right - x),
		h: Math.max(2, bottom - y)
	};
}
function resizeBox(start, handle, dx, dy, shift, aspect) {
	let x = start.x;
	let y = start.y;
	let w = start.w;
	let h = start.h;
	if (handle.includes("e")) w = start.w + dx;
	if (handle.includes("s")) h = start.h + dy;
	if (handle.includes("w")) {
		x = start.x + dx;
		w = start.w - dx;
	}
	if (handle.includes("n")) {
		y = start.y + dy;
		h = start.h - dy;
	}
	if (w < 0) {
		x += w;
		w = -w;
	}
	if (h < 0) {
		y += h;
		h = -h;
	}
	if (shift && aspect > 0) {
		const nh = w / aspect;
		if (handle.includes("n") && !handle.includes("s")) y = start.y + start.h - nh;
		h = Math.abs(nh);
	}
	return {
		x,
		y,
		w: Math.max(2, w),
		h: Math.max(2, h)
	};
}
function localDelta(dxPct, dyPct, panelW, panelH, rotation) {
	const dxPx = dxPct / 100 * panelW;
	const dyPx = dyPct / 100 * panelH;
	const r = -rotation * Math.PI / 180;
	const lx = dxPx * Math.cos(r) - dyPx * Math.sin(r);
	const ly = dxPx * Math.sin(r) + dyPx * Math.cos(r);
	return {
		dx: lx / panelW * 100,
		dy: ly / panelH * 100
	};
}
/** Aimante le bord, le centre ou le bord opposé sur les guides. */
function snapPosition(box, guidesX, guidesY, threshold = 1.8) {
	const snap = (start, size, guides) => {
		const points = [
			start,
			start + size / 2,
			start + size
		];
		let shift = 0;
		let best = threshold;
		for (const point of points) for (const guide of guides) {
			const dist = Math.abs(point - guide);
			if (dist < best) {
				best = dist;
				shift = guide - point;
			}
		}
		return start + shift;
	};
	return {
		...box,
		x: snap(box.x, box.w, guidesX),
		y: snap(box.y, box.h, guidesY)
	};
}
function makeLayer(partial) {
	return {
		parentId: null,
		visible: true,
		locked: false,
		opacity: 1,
		blendMode: "normal",
		rotation: 0,
		flipH: false,
		flipV: false,
		crop: { ...FULL_CROP },
		mask: null,
		text: "",
		fontFamily: FONT_UI,
		fontSize: 20,
		fontWeight: 500,
		italic: false,
		color: "#1c2128",
		align: "center",
		bubbleStyle: "classic",
		sfxVariant: "boom",
		...partial
	};
}
function childLayers(layers, panelId, parentId) {
	return layers.filter((l) => l.panelId === panelId && l.parentId === parentId).sort((a, b) => a.z - b.z || a.id.localeCompare(b.id));
}
function nextZ(layers, panelId, parentId = null) {
	return layers.reduce((max, layer) => layer.panelId === panelId && layer.parentId === parentId ? Math.max(max, layer.z) : max, 0) + 1;
}
function siblingIds(layers, panelId, parentId) {
	return childLayers(layers, panelId, parentId).map((layer) => layer.id);
}
/** Rewrite one sibling group to z = 1…n (1 = back). Other groups stay untouched. */
function withSiblingOrder(layers, panelId, parentId, orderedIds) {
	const rank = new Map(orderedIds.map((id, index) => [id, index + 1]));
	let changed = false;
	const next = layers.map((layer) => {
		if (layer.panelId !== panelId || layer.parentId !== parentId) return layer;
		const z = rank.get(layer.id);
		if (z == null || z === layer.z) return layer;
		changed = true;
		return {
			...layer,
			z
		};
	});
	return changed ? next : layers;
}
function descendantsOf(layers, id) {
	const out = [];
	const walk = (pid) => {
		for (const layer of layers) if (layer.parentId === pid) {
			out.push(layer);
			walk(layer.id);
		}
	};
	walk(id);
	return out;
}
function isEffectivelyLocked(layers, layer) {
	if (layer.locked) return true;
	const byId = new Map(layers.map((l) => [l.id, l]));
	let pid = layer.parentId;
	while (pid) {
		const parent = byId.get(pid);
		if (!parent) break;
		if (parent.locked) return true;
		pid = parent.parentId;
	}
	return false;
}
function topmostIds(layers, ids) {
	const set = new Set(ids);
	const byId = new Map(layers.map((l) => [l.id, l]));
	return ids.filter((id) => {
		let pid = byId.get(id)?.parentId ?? null;
		while (pid) {
			if (set.has(pid)) return false;
			pid = byId.get(pid)?.parentId ?? null;
		}
		return true;
	});
}
function refitGroups(layers) {
	let next = layers;
	for (let pass = 0; pass < 4; pass += 1) next = next.map((layer) => {
		if (layer.type !== "group") return layer;
		const kids = next.filter((l) => l.parentId === layer.id);
		if (!kids.length) return layer;
		return {
			...layer,
			...boundsOf(kids)
		};
	});
	return next;
}
function translateLayers(layers, ids, dx, dy) {
	const roots = topmostIds(layers, ids);
	const move = /* @__PURE__ */ new Set();
	for (const id of roots) {
		const desc = descendantsOf(layers, id);
		if (desc.length) {
			for (const d of desc) move.add(d.id);
			const self = layers.find((l) => l.id === id);
			if (self && self.type !== "group") move.add(id);
		} else move.add(id);
	}
	return refitGroups(layers.map((layer) => move.has(layer.id) ? {
		...layer,
		x: layer.x + dx,
		y: layer.y + dy
	} : layer));
}
function placementFor(category) {
	switch (category) {
		case "background":
		case "photo":
		case "texture": return {
			x: 0,
			y: 0,
			w: 100,
			h: 100
		};
		case "character": return {
			x: 30,
			y: 6,
			w: 34,
			h: 88
		};
		case "modelsheet": return {
			x: 6,
			y: 16,
			w: 88,
			h: 68
		};
		case "effect": return {
			x: 18,
			y: 12,
			w: 58,
			h: 58
		};
		case "vehicle": return {
			x: 4,
			y: 46,
			w: 90,
			h: 40
		};
		default: return {
			x: 28,
			y: 28,
			w: 40,
			h: 40
		};
	}
}
function reorderLayer(layers, id, dir) {
	const layer = layers.find((l) => l.id === id);
	if (!layer) return layers;
	const ids = siblingIds(layers, layer.panelId, layer.parentId);
	const idx = ids.indexOf(id);
	if (idx < 0) return layers;
	const next = ids.slice();
	if (dir === "raise" && idx < next.length - 1) [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
	else if (dir === "lower" && idx > 0) [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
	else if (dir === "front") {
		next.splice(idx, 1);
		next.push(id);
	} else if (dir === "back") {
		next.splice(idx, 1);
		next.unshift(id);
	} else return layers;
	return withSiblingOrder(layers, layer.panelId, layer.parentId, next);
}
/** `above` = in front of the target (higher in the calques list). Same parent only. */
function moveLayerBeside(layers, id, targetId, place) {
	if (id === targetId) return layers;
	const layer = layers.find((l) => l.id === id);
	const target = layers.find((l) => l.id === targetId);
	if (!layer || !target) return layers;
	if (layer.panelId !== target.panelId || layer.parentId !== target.parentId) return layers;
	const ids = siblingIds(layers, layer.panelId, layer.parentId).filter((sid) => sid !== id);
	const at = ids.indexOf(targetId);
	if (at < 0) return layers;
	ids.splice(place === "above" ? at + 1 : at, 0, id);
	return withSiblingOrder(layers, layer.panelId, layer.parentId, ids);
}
var PAPER = "#f4efe6";
var INK$1 = "#1b1916";
var NIGHT$1 = "#101418";
var W = 800;
var H = 1280;
var M = 22;
function frame(pageW, pageH, x, y, w, h) {
	return {
		x: x / pageW * 100,
		y: y / pageH * 100,
		w: w / pageW * 100,
		h: h / pageH * 100
	};
}
function fitH(panel, pageW, pageH, imgW, imgH, x, height, bottom) {
	const panelPxW = panel.w / 100 * pageW;
	const panelPxH = panel.h / 100 * pageH;
	const wPx = height / 100 * panelPxH * (imgW / imgH);
	return {
		x,
		y: 100 - bottom - height,
		w: wPx / panelPxW * 100,
		h: height
	};
}
function fitW(panel, pageW, pageH, imgW, imgH, x, y, width) {
	const panelPxW = panel.w / 100 * pageW;
	const panelPxH = panel.h / 100 * pageH;
	return {
		x,
		y,
		w: width,
		h: width / 100 * panelPxW * (imgH / imgW) / panelPxH * 100
	};
}
function P(id, pageId, box, extra) {
	return {
		id,
		pageId,
		...box,
		fill: "#f7f4ee",
		border: INK$1,
		borderWidth: 3,
		radius: 0,
		halftone: false,
		...extra
	};
}
function img(id, panelId, name, assetId, box, z, extra) {
	return makeLayer({
		id,
		panelId,
		name,
		type: "image",
		assetId,
		...box,
		z,
		...extra
	});
}
function bubble(id, panelId, text, box, z, extra) {
	return makeLayer({
		id,
		panelId,
		name: text.replace(/\n/g, " ").slice(0, 24),
		type: "bubble",
		text,
		...box,
		z,
		fontSize: 20,
		...extra
	});
}
var HERO = [279, 820];
var DOG = [448, 620];
var DOG_P = [559, 485];
var ALIEN = [270, 815];
var ART = [361, 776];
var COMP = [754, 578];
var LAMP = [248, 593];
var BOAT = [735, 243];
var BUST = {
	x: 0,
	y: 0,
	w: 1,
	h: .58
};
function createDemoProject() {
	const pages = [
		{
			id: "page-1",
			name: "01 — L'approche",
			preset: "franco",
			background: PAPER,
			width: W,
			height: H
		},
		{
			id: "page-2",
			name: "02 — Sous les arbres",
			preset: "franco",
			background: PAPER,
			width: W,
			height: H
		},
		{
			id: "page-3",
			name: "03 — Contact",
			preset: "comics",
			background: PAPER,
			width: W,
			height: H
		},
		{
			id: "page-4",
			name: "04 — Défilement",
			preset: "webtoon",
			background: "#0b1016",
			width: 640,
			height: 2100
		}
	];
	const p1a = frame(W, H, M, M, 756, 400);
	const p1b = frame(W, H, M, 434, 372, 382);
	const p1c = frame(W, H, 406, 434, 372, 382);
	const p1d = frame(W, H, M, 828, 756, 430);
	const p2a = frame(W, H, M, M, 468, 1236);
	const p2b = frame(W, H, 502, M, 276, 612);
	const p2c = frame(W, H, 502, 646, 276, 612);
	const p3a = frame(W, H, M, M, 756, 400);
	const p3b = frame(W, H, M, 434, 372, 382);
	const p3c = frame(W, H, 406, 434, 372, 382);
	const p3d = frame(W, H, M, 828, 756, 430);
	const p4a = frame(640, 2100, 0, 0, 640, 680);
	const p4b = frame(640, 2100, 0, 696, 640, 760);
	const p4c = frame(640, 2100, 0, 1472, 640, 628);
	const panels = [
		P("p1a", "page-1", p1a),
		P("p1b", "page-1", p1b),
		P("p1c", "page-1", p1c),
		P("p1d", "page-1", p1d),
		P("p2a", "page-2", p2a),
		P("p2b", "page-2", p2b),
		P("p2c", "page-2", p2c),
		P("p3a", "page-3", p3a, { fill: NIGHT$1 }),
		P("p3b", "page-3", p3b, { fill: NIGHT$1 }),
		P("p3c", "page-3", p3c, { fill: NIGHT$1 }),
		P("p3d", "page-3", p3d, { fill: NIGHT$1 }),
		P("p4a", "page-4", p4a, {
			borderWidth: 0,
			fill: NIGHT$1
		}),
		P("p4b", "page-4", p4b, {
			borderWidth: 0,
			fill: NIGHT$1
		}),
		P("p4c", "page-4", p4c, {
			borderWidth: 0,
			fill: NIGHT$1
		})
	];
	const full = {
		x: 0,
		y: 0,
		w: 100,
		h: 100
	};
	const layers = [
		img("l-isle", "p1a", "Île", "a-island", full, 1, { locked: true }),
		bubble("l-narr-1", "p1a", "Quelque part au large — une île absente de toutes les cartes.", {
			x: 8,
			y: 74,
			w: 84,
			h: 20
		}, 4, {
			bubbleStyle: "narration",
			fontSize: 18,
			fontWeight: 500,
			italic: true,
			fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
			color: "#2a2418"
		}),
		img("l-ocean-1", "p1b", "Océan", "a-ocean", full, 1, { locked: true }),
		img("l-boat", "p1b", "Canot", "a-vehicle", fitW(p1b, W, H, BOAT[0], BOAT[1], -6, 56, 114), 2),
		bubble("l-thought", "p1b", "Cette odeur…", {
			x: 38,
			y: 5,
			w: 56,
			h: 30
		}, 5, {
			bubbleStyle: "thought",
			fontSize: 18
		}),
		img("l-ocean-2", "p1c", "Océan", "a-ocean", full, 1, {
			locked: true,
			crop: {
				x: 0,
				y: 0,
				w: 1,
				h: .72
			}
		}),
		img("l-lena-1", "p1c", "Léna", "a-heroine", fitH(p1c, W, H, HERO[0], HERO[1] * BUST.h, 40, 100, 0), 2, { crop: BUST }),
		bubble("l-say-1", "p1c", "Georges,\ntu sens ça ?", {
			x: 3,
			y: 4,
			w: 46,
			h: 32
		}, 4, { fontSize: 18 }),
		img("l-coast", "p1d", "Grève", "a-photo", full, 1, {
			locked: true,
			crop: {
				x: 0,
				y: 0,
				w: 1,
				h: .86
			}
		}),
		bubble("l-say-2", "p1d", "On accoste avant la nuit.", {
			x: 18,
			y: 4,
			w: 50,
			h: 16
		}, 4, {
			bubbleStyle: "square",
			fontSize: 20
		}),
		img("l-forest", "p2a", "Forêt", "a-forest", full, 1, { locked: true }),
		img("l-moss", "p2a", "Mousse", "a-texture", full, 2, {
			locked: true,
			opacity: .22,
			blendMode: "multiply"
		}),
		img("l-glow", "p2a", "Lumière", "a-fx-light", fitW(p2a, W, H, 900, 900, 4, 0, 92), 3, {
			blendMode: "screen",
			opacity: .7
		}),
		makeLayer({
			id: "g-heroes",
			panelId: "p2a",
			name: "Groupe — Personnages",
			type: "group",
			x: 0,
			y: 0,
			w: 100,
			h: 100,
			z: 6
		}),
		img("l-lena-3", "p2a", "Léna", "a-heroine", fitH(p2a, W, H, HERO[0], HERO[1], 42, 62, 0), 5, { parentId: "g-heroes" }),
		img("l-geo-3", "p2a", "Georges", "a-georges-profile", fitW(p2a, W, H, DOG_P[0], DOG_P[1], -6, 77, 74), 6, { parentId: "g-heroes" }),
		img("l-lamp-2", "p2a", "Lanterne", "a-lamp", fitH(p2a, W, H, LAMP[0], LAMP[1], 78, 16, 18), 7),
		bubble("l-narr-forest", "p2a", "La forêt ne figure sur aucune carte.", {
			x: 6,
			y: 3,
			w: 78,
			h: 8
		}, 8, {
			bubbleStyle: "narration",
			fontSize: 16,
			fontWeight: 500,
			italic: true,
			fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
			color: "#2a2418"
		}),
		img("l-ruins", "p2b", "Ruines", "a-ruins", full, 1, { locked: true }),
		img("l-artifact", "p2b", "Artefact", "a-artifact", fitH(p2b, W, H, ART[0], ART[1], 16, 64, 14), 3),
		img("l-dust", "p2b", "Poussière", "a-fx-dust", fitW(p2b, W, H, 900, 900, -6, 18, 112), 4, {
			blendMode: "screen",
			opacity: .72
		}),
		img("l-ruins-2", "p2c", "Ruines", "a-ruins", full, 1, {
			locked: true,
			crop: {
				x: .1,
				y: .15,
				w: .8,
				h: .7
			}
		}),
		img("l-comp", "p2c", "Ordinateur", "a-computer", fitW(p2c, W, H, COMP[0], COMP[1], 5, 40, 90), 2),
		bubble("l-say-3", "p2c", "Ce n'est pas une ruine.\nC'est une porte.", {
			x: 4,
			y: 3,
			w: 92,
			h: 26
		}, 5, { fontSize: 16 }),
		makeLayer({
			id: "l-crack",
			panelId: "p2c",
			name: "CRACK!",
			type: "sfx",
			sfxVariant: "crash",
			text: "CRACK!",
			color: "#ffb03a",
			x: 10,
			y: 76,
			w: 80,
			h: 16,
			z: 6,
			fontSize: 30,
			rotation: -8,
			fontFamily: "\"Bangers\", system-ui, sans-serif"
		}),
		img("l-base", "p3a", "Base", "a-base", full, 1, { locked: true }),
		bubble("l-narr-cliff", "p3a", "Minuit. La falaise s'allume.", {
			x: 3,
			y: 4,
			w: 46,
			h: 16
		}, 4, {
			bubbleStyle: "narration",
			fontSize: 16,
			fontWeight: 500,
			italic: true,
			fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
			color: "#2a2418"
		}),
		img("l-forest-2", "p3b", "Forêt", "a-forest", full, 1, { locked: true }),
		img("l-moss-2", "p3b", "Mousse", "a-texture", full, 2, {
			locked: true,
			opacity: .4,
			blendMode: "multiply"
		}),
		img("l-geo-4", "p3b", "Georges", "a-georges", fitH(p3b, W, H, DOG[0], DOG[1], -2, 72, 0), 3),
		img("l-lena-4", "p3b", "Léna", "a-heroine", fitH(p3b, W, H, HERO[0], HERO[1], 52, 94, 0), 4),
		bubble("l-say-4", "p3b", "Qu'est-ce que c'est ?", {
			x: 4,
			y: 3,
			w: 74,
			h: 22
		}, 6, { fontSize: 17 }),
		img("l-base-mid", "p3c", "Base", "a-base", full, 1, { locked: true }),
		img("l-alien", "p3c", "Silar", "a-alien", fitH(p3c, W, H, ALIEN[0], ALIEN[1], 60, 92, 0), 3),
		makeLayer({
			id: "l-zap",
			panelId: "p3c",
			name: "ZAP!",
			type: "sfx",
			sfxVariant: "zap",
			text: "ZAP!",
			color: "#9aefff",
			x: 4,
			y: 8,
			w: 48,
			h: 22,
			z: 5,
			rotation: -8,
			fontSize: 32,
			fontFamily: "\"Bangers\", system-ui, sans-serif"
		}),
		img("l-base-2", "p3d", "Base", "a-base", full, 1, {
			locked: true,
			crop: {
				x: 0,
				y: .08,
				w: 1,
				h: .84
			}
		}),
		img("l-smoke", "p3d", "Fumée", "a-fx-smoke", fitW(p3d, W, H, 900, 900, 46, 6, 36), 4, {
			blendMode: "screen",
			opacity: .8
		}),
		img("l-boom", "p3d", "Explosion", "a-fx-explosion", fitW(p3d, W, H, 900, 900, 60, 16, 34), 5, {
			blendMode: "screen",
			opacity: .88
		}),
		bubble("l-narr-2", "p3d", "La lumière répond.", {
			x: 3,
			y: 5,
			w: 36,
			h: 18
		}, 6, {
			bubbleStyle: "narration",
			fontSize: 17,
			fontWeight: 500,
			italic: true,
			fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
			color: "#2a2418"
		}),
		img("l-w-island", "p4a", "Île", "a-island", full, 1, { locked: true }),
		makeLayer({
			id: "l-w-title",
			panelId: "p4a",
			name: "Titre",
			type: "text",
			text: "LE SECRET DE L'ÎLE",
			x: 6,
			y: 74,
			w: 88,
			h: 12,
			z: 3,
			fontFamily: "\"Bangers\", system-ui, sans-serif",
			fontSize: 34,
			color: "#fff8ee",
			align: "center"
		}),
		makeLayer({
			id: "l-w-sub",
			panelId: "p4a",
			name: "Sous-titre",
			type: "text",
			text: "Récit d'expédition",
			x: 12,
			y: 86,
			w: 76,
			h: 6,
			z: 4,
			fontFamily: "\"Inter\", ui-sans-serif, system-ui, sans-serif",
			fontSize: 16,
			fontWeight: 500,
			italic: true,
			color: "#f4efe6",
			align: "center"
		}),
		img("l-w-forest", "p4b", "Forêt", "a-forest", full, 1, { locked: true }),
		img("l-w-geo", "p4b", "Georges", "a-georges", fitH(p4b, 640, 2100, DOG[0], DOG[1], 2, 62, 0), 2),
		img("l-w-lena", "p4b", "Léna", "a-heroine", fitH(p4b, 640, 2100, HERO[0], HERO[1], 48, 78, 0), 3),
		bubble("l-w-say", "p4b", "Ne cours pas.", {
			x: 6,
			y: 4,
			w: 48,
			h: 14
		}, 5, {
			bubbleStyle: "whisper",
			fontSize: 20,
			italic: true
		}),
		img("l-w-base", "p4c", "Base", "a-base", full, 1, {
			locked: true,
			crop: {
				x: .2,
				y: 0,
				w: .8,
				h: 1
			}
		}),
		img("l-w-alien", "p4c", "Silar", "a-alien", fitH(p4c, 640, 2100, ALIEN[0], ALIEN[1], 54, 86, 0), 3),
		makeLayer({
			id: "l-w-zap",
			panelId: "p4c",
			name: "ZAP!",
			type: "sfx",
			sfxVariant: "zap",
			text: "ZAP!",
			color: "#9aefff",
			x: 6,
			y: 6,
			w: 42,
			h: 14,
			z: 6,
			fontSize: 36,
			fontFamily: "\"Bangers\", system-ui, sans-serif"
		})
	];
	return {
		meta: {
			id: "projet-ile",
			title: "Le Secret de l'Île",
			subtitle: "Récit d'expédition",
			author: "Atelier",
			updatedAt: Date.now()
		},
		pages,
		panels,
		layers
	};
}
var BUBBLE_PRESETS = [
	{
		style: "classic",
		name: "Classique",
		sample: "On y va.",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Parole"
	},
	{
		style: "double",
		name: "Double trait",
		sample: "Je te l'avais dit.",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Parole"
	},
	{
		style: "square",
		name: "Carrée",
		sample: "Par ici.",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Parole"
	},
	{
		style: "oval",
		name: "Ovale",
		sample: "Regarde.",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Parole"
	},
	{
		style: "cloud",
		name: "Nuage",
		sample: "Doucement.",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Parole"
	},
	{
		style: "thought",
		name: "Pensée",
		sample: "Et si…",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Parole",
		italic: true
	},
	{
		style: "whisper",
		name: "Murmure",
		sample: "chut…",
		fill: "#f4f7fb",
		ink: "#4d5966",
		group: "Parole",
		italic: true
	},
	{
		style: "radio",
		name: "Radio",
		sample: "Base, vous me recevez ?",
		fill: "#f3f6ea",
		ink: "#1c2128",
		group: "Parole",
		fontFamily: FONT_UI,
		weight: 500,
		fontSize: 13
	},
	{
		style: "rounded",
		name: "Ronde",
		sample: "D'accord.",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Parole"
	},
	{
		style: "tech",
		name: "Technique",
		sample: "Système en ligne.",
		fill: "#eef3f8",
		ink: "#1c3a52",
		group: "Parole",
		fontFamily: FONT_UI,
		weight: 500,
		fontSize: 13
	},
	{
		style: "shout",
		name: "Cri",
		sample: "Attention !",
		fill: "#fff4e4",
		ink: "#1c2128",
		group: "Émotion",
		fontFamily: FONT_DISPLAY,
		weight: 400,
		fontSize: 18
	},
	{
		style: "scream",
		name: "Hurlement",
		sample: "NON !",
		fill: "#ffe4e1",
		ink: "#7a1d1d",
		group: "Émotion",
		fontFamily: FONT_DISPLAY,
		weight: 400,
		fontSize: 20
	},
	{
		style: "electric",
		name: "Éclair",
		sample: "ZZZT !",
		fill: "#e5fbff",
		ink: "#0e4a5c",
		group: "Émotion",
		fontFamily: FONT_DISPLAY,
		weight: 400,
		fontSize: 18
	},
	{
		style: "icy",
		name: "Givre",
		sample: "Il fait trop froid.",
		fill: "#eef8ff",
		ink: "#24566a",
		group: "Émotion",
		italic: true
	},
	{
		style: "dark",
		name: "Nuit",
		sample: "Qui est là ?",
		fill: "#1a1e24",
		ink: "#f4efe6",
		group: "Émotion"
	},
	{
		style: "boom",
		name: "Impact",
		sample: "BAM !",
		fill: "#fff1d6",
		ink: "#1c2128",
		group: "Émotion",
		fontFamily: FONT_DISPLAY,
		weight: 400,
		fontSize: 20
	},
	{
		style: "anger",
		name: "Colère",
		sample: "ASSEZ !",
		fill: "#ffd9d4",
		ink: "#7a1d1d",
		group: "Émotion",
		fontFamily: FONT_DISPLAY,
		weight: 400,
		fontSize: 18
	},
	{
		style: "glitch",
		name: "Glitch",
		sample: "Signal perdu.",
		fill: "#e8fff4",
		ink: "#0d3b2e",
		group: "Émotion",
		fontFamily: FONT_UI,
		weight: 500,
		fontSize: 13
	},
	{
		style: "sleep",
		name: "Sommeil",
		sample: "Zzz…",
		fill: "#f4f0ff",
		ink: "#3d3560",
		group: "Émotion",
		italic: true
	},
	{
		style: "narration",
		name: "Narration",
		sample: "Plus tard, sur la grève.",
		fill: "#f6e7c4",
		ink: "#2a2418",
		group: "Récit",
		fontFamily: FONT_UI,
		italic: true,
		weight: 500,
		fontSize: 14
	},
	{
		style: "caption",
		name: "Cartouche",
		sample: "Île de Sanguinet.",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Récit",
		fontFamily: FONT_UI,
		italic: true,
		weight: 500,
		fontSize: 14
	},
	{
		style: "banner",
		name: "Bandeau",
		sample: "FIN.",
		fill: "#1c2128",
		ink: "#fff8ee",
		group: "Récit",
		fontFamily: FONT_DISPLAY,
		weight: 400,
		fontSize: 18
	},
	{
		style: "note",
		name: "Note",
		sample: "Ne pas oublier la lampe.",
		fill: "#fff4c8",
		ink: "#2a2418",
		group: "Récit",
		fontFamily: FONT_MARKER,
		weight: 400,
		fontSize: 14
	},
	{
		style: "location",
		name: "Lieu",
		sample: "Port de Sanguinet",
		fill: "#fffdf8",
		ink: "#1c2128",
		group: "Récit",
		fontFamily: FONT_UI,
		weight: 500,
		fontSize: 14
	},
	{
		style: "chapter",
		name: "Chapitre",
		sample: "Chapitre 2",
		fill: "#1c2128",
		ink: "#fff8ee",
		group: "Récit",
		fontFamily: FONT_DISPLAY,
		weight: 400,
		fontSize: 18
	}
];
function bubblePreset(style) {
	return BUBBLE_PRESETS.find((b) => b.style === style) ?? BUBBLE_PRESETS[0];
}
var BUBBLE_GROUPS = [
	"Parole",
	"Récit",
	"Émotion"
];
var SFX_PRESETS = [
	{
		id: "boom",
		text: "BOOM!",
		color: "#ff9d2e",
		group: "Choc",
		rotation: -8,
		fontSize: 40
	},
	{
		id: "pow",
		text: "POW!",
		color: "#fff7ea",
		group: "Choc",
		rotation: 6,
		fontSize: 38
	},
	{
		id: "bam",
		text: "BAM!",
		color: "#ffe08a",
		group: "Choc",
		rotation: -4,
		fontSize: 40
	},
	{
		id: "paf",
		text: "PAF!",
		color: "#ffd0c2",
		group: "Choc",
		rotation: 8,
		fontSize: 36
	},
	{
		id: "blam",
		text: "BLAM!",
		color: "#ffb020",
		group: "Choc",
		rotation: -10,
		fontSize: 36
	},
	{
		id: "slam",
		text: "SLAM!",
		color: "#f4f7fa",
		group: "Choc",
		rotation: -6,
		fontSize: 34
	},
	{
		id: "badaboum",
		text: "BADABOUM!",
		color: "#ff9d2e",
		group: "Choc",
		rotation: -3,
		fontSize: 28
	},
	{
		id: "crash",
		text: "CRASH!",
		color: "#ffb84d",
		group: "Bris",
		rotation: -8,
		fontSize: 34
	},
	{
		id: "crac",
		text: "CRAC!",
		color: "#ffe7b0",
		group: "Bris",
		rotation: 7,
		fontSize: 36
	},
	{
		id: "craaac",
		text: "CRAAACK!",
		color: "#ffcf70",
		group: "Bris",
		rotation: -6,
		fontSize: 30
	},
	{
		id: "clac",
		text: "CLAC!",
		color: "#f4f7fa",
		group: "Bris",
		rotation: 4,
		fontSize: 34
	},
	{
		id: "toc",
		text: "TOC!",
		color: "#fffdf8",
		group: "Bris",
		rotation: -2,
		fontSize: 32
	},
	{
		id: "gling",
		text: "GLING!",
		color: "#d7f4ff",
		group: "Bris",
		rotation: 10,
		fontSize: 30
	},
	{
		id: "vroom",
		text: "VROOOM!",
		color: "#7dcea0",
		group: "Mouvement",
		rotation: -8,
		fontSize: 32
	},
	{
		id: "vroum",
		text: "VROUM!",
		color: "#9be7b5",
		group: "Mouvement",
		rotation: 5,
		fontSize: 34
	},
	{
		id: "woosh",
		text: "WOOSH!",
		color: "#c9e7ff",
		group: "Mouvement",
		rotation: -12,
		fontSize: 32
	},
	{
		id: "froosh",
		text: "FROOOSH!",
		color: "#b7fff0",
		group: "Mouvement",
		rotation: -6,
		fontSize: 28
	},
	{
		id: "plouf",
		text: "PLOUF!",
		color: "#8fd4ff",
		group: "Mouvement",
		rotation: 6,
		fontSize: 34
	},
	{
		id: "splash",
		text: "SPLASH!",
		color: "#7ec8ff",
		group: "Mouvement",
		rotation: -4,
		fontSize: 32
	},
	{
		id: "zap",
		text: "ZAP!",
		color: "#7dd3fc",
		group: "Énergie",
		rotation: -8,
		fontSize: 40
	},
	{
		id: "bzzzt",
		text: "BZZZT!",
		color: "#b6f36b",
		group: "Énergie",
		rotation: 4,
		fontSize: 32
	},
	{
		id: "crack",
		text: "CRACK!",
		color: "#ffb03a",
		group: "Énergie",
		rotation: -7,
		fontSize: 34
	},
	{
		id: "flash",
		text: "FLASH!",
		color: "#fff4c2",
		group: "Énergie",
		rotation: 0,
		fontSize: 34
	},
	{
		id: "huuum",
		text: "HUUUUM…",
		color: "#d6c7ff",
		group: "Énergie",
		rotation: -2,
		fontSize: 28
	},
	{
		id: "ha",
		text: "HA!",
		color: "#fffdf8",
		group: "Voix",
		rotation: 8,
		fontSize: 36
	},
	{
		id: "haaa",
		text: "HAAA!",
		color: "#ffe1e1",
		group: "Voix",
		rotation: -6,
		fontSize: 36
	},
	{
		id: "he",
		text: "HÉ!",
		color: "#ffe08a",
		group: "Voix",
		rotation: 5,
		fontSize: 36
	},
	{
		id: "ah",
		text: "AH…",
		color: "#f4f7fa",
		group: "Voix",
		rotation: -3,
		fontSize: 32
	}
];
var SFX_GROUPS = [
	"Choc",
	"Bris",
	"Mouvement",
	"Énergie",
	"Voix"
];
function sfxPreset(id) {
	return SFX_PRESETS.find((s) => s.id === id) ?? SFX_PRESETS[0];
}
function uid(prefix = "id") {
	return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
function slugify(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "atelier";
}
var INK = "#1a1e24";
var FILL = "#f7f4ee";
var NIGHT = "#12181f";
var margin = (cols, rows, gap = 2, m = 3) => {
	const w = (100 - m * 2 - gap * (cols - 1)) / cols;
	const h = (100 - m * 2 - gap * (rows - 1)) / rows;
	const out = [];
	for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) out.push({
		x: m + c * (w + gap),
		y: m + r * (h + gap),
		w,
		h
	});
	return out;
};
var bleed = (n, gap = .6) => {
	const h = (100 - gap * (n - 1)) / n;
	return Array.from({ length: n }, (_, i) => ({
		x: 0,
		y: i * (h + gap),
		w: 100,
		h,
		fill: NIGHT,
		borderWidth: 0
	}));
};
var SPECS = {
	franco: margin(2, 3, 2.2, 3),
	"franco-splash": [
		{
			x: 3,
			y: 2,
			w: 60,
			h: 62
		},
		{
			x: 65,
			y: 2,
			w: 32,
			h: 30
		},
		{
			x: 65,
			y: 34,
			w: 32,
			h: 30
		},
		{
			x: 3,
			y: 66,
			w: 94,
			h: 32
		}
	],
	"franco-bandes": [
		{
			x: 3,
			y: 2,
			w: 94,
			h: 30
		},
		{
			x: 3,
			y: 34,
			w: 94,
			h: 30
		},
		{
			x: 3,
			y: 66,
			w: 94,
			h: 32
		}
	],
	tiers: [
		{
			x: 3,
			y: 2,
			w: 94,
			h: 46
		},
		{
			x: 3,
			y: 50,
			w: 46,
			h: 48
		},
		{
			x: 51,
			y: 50,
			w: 46,
			h: 48
		}
	],
	grid: margin(2, 2, 2.4, 3),
	manga: [
		{
			x: 3,
			y: 2,
			w: 94,
			h: 22
		},
		{
			x: 51,
			y: 26,
			w: 46,
			h: 34
		},
		{
			x: 3,
			y: 26,
			w: 46,
			h: 34
		},
		{
			x: 3,
			y: 62,
			w: 94,
			h: 36
		}
	],
	"manga-stack": [
		{
			x: 4,
			y: 2,
			w: 92,
			h: 22
		},
		{
			x: 4,
			y: 26,
			w: 92,
			h: 22
		},
		{
			x: 4,
			y: 50,
			w: 92,
			h: 22
		},
		{
			x: 4,
			y: 74,
			w: 92,
			h: 24
		}
	],
	comics: [
		{
			x: 3,
			y: 2,
			w: 94,
			h: 28
		},
		{
			x: 3,
			y: 32,
			w: 30,
			h: 32
		},
		{
			x: 35,
			y: 32,
			w: 30,
			h: 32
		},
		{
			x: 67,
			y: 32,
			w: 30,
			h: 32
		},
		{
			x: 3,
			y: 66,
			w: 94,
			h: 32
		}
	],
	"comics-grid": margin(3, 3, 2, 3),
	webtoon: bleed(6, .7),
	"webtoon-beats": bleed(8, .45),
	splash: [{
		x: 3,
		y: 3,
		w: 94,
		h: 94
	}],
	cinematic: [{
		x: 3,
		y: 4,
		w: 94,
		h: 44
	}, {
		x: 3,
		y: 52,
		w: 94,
		h: 44
	}],
	strip: [
		{
			x: 2,
			y: 8,
			w: 31,
			h: 84
		},
		{
			x: 35,
			y: 8,
			w: 31,
			h: 84
		},
		{
			x: 68,
			y: 8,
			w: 30,
			h: 84
		}
	],
	diptyque: [{
		x: 3,
		y: 3,
		w: 46,
		h: 94
	}, {
		x: 51,
		y: 3,
		w: 46,
		h: 94
	}],
	insert: [{
		x: 3,
		y: 3,
		w: 94,
		h: 94
	}, {
		x: 64,
		y: 64,
		w: 30,
		h: 30
	}],
	pyramide: [
		{
			x: 22,
			y: 2,
			w: 56,
			h: 28
		},
		{
			x: 3,
			y: 32,
			w: 46,
			h: 30
		},
		{
			x: 51,
			y: 32,
			w: 46,
			h: 30
		},
		{
			x: 3,
			y: 64,
			w: 30,
			h: 34
		},
		{
			x: 35,
			y: 64,
			w: 30,
			h: 34
		},
		{
			x: 67,
			y: 64,
			w: 30,
			h: 34
		}
	],
	hero: [
		{
			x: 3,
			y: 2,
			w: 62,
			h: 96
		},
		{
			x: 67,
			y: 2,
			w: 30,
			h: 31
		},
		{
			x: 67,
			y: 35,
			w: 30,
			h: 31
		},
		{
			x: 67,
			y: 68,
			w: 30,
			h: 30
		}
	],
	"manga-cols": [
		{
			x: 68,
			y: 2,
			w: 29,
			h: 96
		},
		{
			x: 36,
			y: 2,
			w: 30,
			h: 96
		},
		{
			x: 3,
			y: 2,
			w: 31,
			h: 96
		}
	],
	"manga-chute": [
		{
			x: 3,
			y: 2,
			w: 46,
			h: 26
		},
		{
			x: 51,
			y: 2,
			w: 46,
			h: 26
		},
		{
			x: 3,
			y: 30,
			w: 94,
			h: 68
		}
	],
	"comics-split": [
		{
			x: 3,
			y: 2,
			w: 94,
			h: 36
		},
		{
			x: 3,
			y: 40,
			w: 46,
			h: 26
		},
		{
			x: 51,
			y: 40,
			w: 46,
			h: 26
		},
		{
			x: 3,
			y: 68,
			w: 30,
			h: 30
		},
		{
			x: 35,
			y: 68,
			w: 30,
			h: 30
		},
		{
			x: 67,
			y: 68,
			w: 30,
			h: 30
		}
	],
	"webtoon-talk": [
		{
			x: 0,
			y: 0,
			w: 100,
			h: 16,
			fill: NIGHT,
			borderWidth: 0
		},
		{
			x: 0,
			y: 16.6,
			w: 100,
			h: 24,
			fill: NIGHT,
			borderWidth: 0
		},
		{
			x: 0,
			y: 41.2,
			w: 100,
			h: 12,
			fill: NIGHT,
			borderWidth: 0
		},
		{
			x: 0,
			y: 53.8,
			w: 100,
			h: 26,
			fill: NIGHT,
			borderWidth: 0
		},
		{
			x: 0,
			y: 80.4,
			w: 100,
			h: 19.6,
			fill: NIGHT,
			borderWidth: 0
		}
	],
	carre: margin(2, 2, 2.4, 4),
	custom: [{
		x: 4,
		y: 4,
		w: 92,
		h: 92
	}]
};
var PAGE_PRESETS = [
	{
		id: "franco",
		name: "Franco-belge",
		family: "Album",
		blurb: "6 cases, 2 colonnes",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "franco-splash",
		name: "Splash + suites",
		family: "Album",
		blurb: "Grande case, deux inserts",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "franco-bandes",
		name: "Bandes",
		family: "Album",
		blurb: "3 bandes horizontales",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "tiers",
		name: "Tiers",
		family: "Album",
		blurb: "Établissant, puis 2 cases",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "grid",
		name: "Grille",
		family: "Album",
		blurb: "4 cases égales",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "diptyque",
		name: "Diptyque",
		family: "Album",
		blurb: "Deux cases pleine hauteur",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "insert",
		name: "Insert",
		family: "Album",
		blurb: "Grande case et médaillon",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "pyramide",
		name: "Pyramide",
		family: "Album",
		blurb: "1, puis 2, puis 3 cases",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "hero",
		name: "Héros",
		family: "Album",
		blurb: "Colonne haute, trois inserts",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "manga",
		name: "Manga",
		family: "Manga",
		blurb: "Bandeau, duo, chute",
		width: 720,
		height: 1080,
		background: "#f7f4ee"
	},
	{
		id: "manga-stack",
		name: "4-koma",
		family: "Manga",
		blurb: "4 bandes à lire en descendant",
		width: 720,
		height: 1100,
		background: "#f7f4ee"
	},
	{
		id: "manga-cols",
		name: "Colonnes",
		family: "Manga",
		blurb: "3 colonnes, lecture droite-gauche",
		width: 720,
		height: 1080,
		background: "#f7f4ee"
	},
	{
		id: "manga-chute",
		name: "Chute",
		family: "Manga",
		blurb: "Deux cases, puis une grande",
		width: 720,
		height: 1080,
		background: "#f7f4ee"
	},
	{
		id: "comics",
		name: "Comics",
		family: "Comics",
		blurb: "Splash, trio, chute",
		width: 760,
		height: 1160,
		background: "#efe6d6"
	},
	{
		id: "comics-grid",
		name: "Planche 9",
		family: "Comics",
		blurb: "Grille 3 × 3",
		width: 760,
		height: 1160,
		background: "#efe6d6"
	},
	{
		id: "comics-split",
		name: "Éclaté",
		family: "Comics",
		blurb: "Splash, duo, puis trio",
		width: 760,
		height: 1160,
		background: "#efe6d6"
	},
	{
		id: "webtoon",
		name: "Webtoon",
		family: "Webtoon",
		blurb: "6 écrans, fond nuit",
		width: 640,
		height: 2200,
		background: "#0c1116"
	},
	{
		id: "webtoon-beats",
		name: "Battements",
		family: "Webtoon",
		blurb: "8 cases plein cadre",
		width: 640,
		height: 2800,
		background: "#0c1116"
	},
	{
		id: "webtoon-talk",
		name: "Dialogue",
		family: "Webtoon",
		blurb: "5 hauteurs alternées",
		width: 640,
		height: 2400,
		background: "#0c1116"
	},
	{
		id: "splash",
		name: "Splash",
		family: "Cinéma",
		blurb: "Une seule case",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	},
	{
		id: "cinematic",
		name: "Cinéma",
		family: "Cinéma",
		blurb: "Deux écrans larges",
		width: 1e3,
		height: 680,
		background: "#efe6d6"
	},
	{
		id: "strip",
		name: "Strip",
		family: "Cinéma",
		blurb: "3 cases de gauche à droite",
		width: 1080,
		height: 420,
		background: "#efe6d6"
	},
	{
		id: "carre",
		name: "Carré",
		family: "Cinéma",
		blurb: "4 cases, format réseau",
		width: 1080,
		height: 1080,
		background: "#efe6d6"
	}
];
function pagePresetInfo(preset) {
	return PAGE_PRESETS.find((p) => p.id === preset) ?? {
		id: preset,
		name: "Libre",
		family: "Album",
		blurb: "Case unique",
		width: 800,
		height: 1120,
		background: "#efe6d6"
	};
}
function isWebtoonPreset(preset) {
	return preset === "webtoon" || preset === "webtoon-beats" || preset === "webtoon-talk";
}
function pageSize(preset) {
	const info = pagePresetInfo(preset);
	return {
		width: info.width,
		height: info.height
	};
}
function layoutBoxes(preset) {
	return SPECS[preset] ?? SPECS.custom;
}
function createPanels(preset, pageId) {
	return layoutBoxes(preset).map((spec) => ({
		id: uid("panel"),
		pageId,
		x: spec.x,
		y: spec.y,
		w: spec.w,
		h: spec.h,
		fill: spec.fill ?? FILL,
		border: INK,
		borderWidth: spec.borderWidth ?? 2.5,
		radius: 0,
		halftone: false
	}));
}
var PRESET_LABEL = {
	franco: "Franco-belge",
	"franco-splash": "Splash + suites",
	"franco-bandes": "Bandes",
	tiers: "Tiers",
	grid: "Grille",
	manga: "Manga",
	"manga-stack": "4-koma",
	comics: "Comics",
	"comics-grid": "Planche 9",
	webtoon: "Webtoon",
	"webtoon-beats": "Battements",
	splash: "Splash",
	cinematic: "Cinéma",
	strip: "Strip",
	carre: "Carré",
	diptyque: "Diptyque",
	insert: "Insert",
	pyramide: "Pyramide",
	hero: "Héros",
	"manga-cols": "Colonnes",
	"manga-chute": "Chute",
	"comics-split": "Éclaté",
	"webtoon-talk": "Dialogue",
	custom: "Libre"
};
var PRESET_FAMILIES = [
	"Album",
	"Manga",
	"Comics",
	"Webtoon",
	"Cinéma"
];
function snapOf(s) {
	return {
		pages: s.pages,
		panels: s.panels,
		layers: s.layers
	};
}
function loadInitial() {
	const demo = createDemoProject();
	return {
		meta: demo.meta,
		pages: demo.pages,
		panels: demo.panels,
		layers: demo.layers,
		assets: DEMO_ASSETS,
		selectedPageId: demo.pages[0].id
	};
}
var boot = loadInitial();
function describeChange(before, after) {
	if (after.pages.length !== before.pages.length) return after.pages.length > before.pages.length ? "Planche ajoutée" : "Planche retirée";
	if (after.panels.length !== before.panels.length) return after.panels.length > before.panels.length ? "Case ajoutée" : "Case retirée";
	if (after.layers.length > before.layers.length) {
		const added = after.layers.find((layer) => !before.layers.some((item) => item.id === layer.id));
		return added ? `Ajouter ${added.name}` : "Ajouter";
	}
	if (after.layers.length < before.layers.length) return "Supprimer";
	const changed = after.layers.find((layer) => {
		const old = before.layers.find((item) => item.id === layer.id);
		if (!old) return false;
		return old.x !== layer.x || old.y !== layer.y || old.w !== layer.w || old.h !== layer.h || old.rotation !== layer.rotation || old.mask !== layer.mask || old.opacity !== layer.opacity || old.text !== layer.text || old.tailLen !== layer.tailLen || old.tailX !== layer.tailX || old.assetId !== layer.assetId || old.locked !== layer.locked || old.crop !== layer.crop;
	});
	if (!changed) return "Modifier";
	const old = before.layers.find((item) => item.id === changed.id);
	if (!old) return "Modifier";
	if (old.assetId !== changed.assetId) return `Remplacer ${changed.name}`;
	if (old.mask !== changed.mask) return `Masque ${changed.name}`;
	if (old.x !== changed.x || old.y !== changed.y) return `Déplacer ${changed.name}`;
	if (old.text !== changed.text) return `Texte ${changed.name}`;
	if (old.opacity !== changed.opacity) return `Opacité ${changed.name}`;
	return `Modifier ${changed.name}`;
}
function commitSet(set, get, partial) {
	const s = get();
	if (s.gesture) {
		set({
			...partial,
			saveState: "dirty"
		});
		return;
	}
	const label = describeChange(s, {
		pages: partial.pages ?? s.pages,
		panels: partial.panels ?? s.panels,
		layers: partial.layers ?? s.layers
	});
	set({
		...partial,
		past: [...s.past, snapOf(s)].slice(-40),
		pastLabels: [...s.pastLabels, label].slice(-40),
		future: [],
		futureLabels: [],
		saveState: "dirty"
	});
}
var useProjectStore = create((set, get) => ({
	meta: boot.meta,
	pages: boot.pages,
	panels: boot.panels,
	layers: boot.layers,
	assets: boot.assets,
	blobUrls: {},
	past: [],
	future: [],
	pastLabels: [],
	futureLabels: [],
	clipboard: [],
	gesture: null,
	selectedPageId: boot.selectedPageId,
	selectedPanelId: boot.panels.find((p) => p.pageId === boot.selectedPageId)?.id ?? null,
	selectedLayerIds: [],
	editingLayerId: null,
	tool: "select",
	zoom: .72,
	libraryCategory: "all",
	libraryQuery: "",
	favoritesOnly: false,
	libraryTag: null,
	recentAssetIds: [],
	libraryOpen: true,
	saveState: "saved",
	readerOpen: false,
	readerMode: "album",
	overviewOpen: false,
	importOpen: false,
	cropOpen: false,
	cloudOpen: false,
	aiOpen: false,
	mobilePane: "canvas",
	toasts: [],
	toast: (text) => {
		const id = uid("toast");
		set((s) => ({ toasts: [...s.toasts, {
			id,
			text
		}].slice(-4) }));
		window.setTimeout(() => {
			set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
		}, 2800);
	},
	setTool: (tool) => {
		const category = {
			library: "all",
			image: "all",
			character: "character",
			background: "background",
			photo: "photo",
			modelsheet: "modelsheet",
			object: "object",
			effect: "effect",
			bubble: "bubble",
			sfx: "sfx"
		}[tool];
		set({
			tool,
			libraryCategory: category ?? get().libraryCategory,
			libraryOpen: category ? true : get().libraryOpen,
			cropOpen: get().cropOpen,
			aiOpen: tool === "ai" ? true : get().aiOpen,
			cloudOpen: tool === "cloud" ? true : get().cloudOpen,
			mobilePane: category ? "assets" : get().mobilePane
		});
		if (tool === "crop") {
			const layer = get().layers.find((l) => l.id === get().selectedLayerIds.at(-1));
			if (!layer || layer.type !== "image") get().toast("Sélectionnez une image à recadrer.");
		}
	},
	setZoom: (zoom) => set({ zoom }),
	setLibraryCategory: (libraryCategory) => set({ libraryCategory }),
	setLibraryQuery: (libraryQuery) => set({ libraryQuery }),
	setFavoritesOnly: (favoritesOnly) => set({ favoritesOnly }),
	setLibraryTag: (libraryTag) => set({ libraryTag }),
	noteRecent: (id) => set((s) => ({ recentAssetIds: [id, ...s.recentAssetIds.filter((x) => x !== id)].slice(0, 10) })),
	setLibraryOpen: (libraryOpen) => set({ libraryOpen }),
	setMobilePane: (mobilePane) => set({ mobilePane }),
	setReader: (readerOpen, mode) => set({
		readerOpen,
		readerMode: mode ?? get().readerMode
	}),
	setOverview: (overviewOpen) => set({ overviewOpen }),
	setImportOpen: (importOpen) => set({ importOpen }),
	setCropOpen: (cropOpen) => set({ cropOpen }),
	setCloudOpen: (cloudOpen) => set({ cloudOpen }),
	setAiOpen: (aiOpen) => set({ aiOpen }),
	setBlobUrls: (blobUrls) => set({ blobUrls: {
		...get().blobUrls,
		...blobUrls
	} }),
	selectPage: (id) => {
		set({
			selectedPageId: id,
			selectedPanelId: get().panels.find((p) => p.pageId === id)?.id ?? null,
			selectedLayerIds: [],
			editingLayerId: null
		});
	},
	selectPanel: (id) => set({
		selectedPanelId: id,
		selectedLayerIds: [],
		editingLayerId: null
	}),
	selectLayers: (ids) => {
		set({
			selectedLayerIds: ids,
			selectedPanelId: get().layers.find((l) => l.id === ids.at(-1))?.panelId ?? get().selectedPanelId,
			editingLayerId: null
		});
	},
	toggleLayer: (id, additive) => {
		const cur = get().selectedLayerIds;
		const next = additive ? cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] : [id];
		get().selectLayers(next);
	},
	setEditing: (editingLayerId) => set({ editingLayerId }),
	beginGesture: () => {
		const s = get();
		if (s.gesture) return;
		set({ gesture: snapOf(s) });
	},
	endGesture: () => {
		const s = get();
		if (!s.gesture) return;
		const changed = s.gesture.layers !== s.layers || s.gesture.panels !== s.panels || s.gesture.pages !== s.pages;
		const label = describeChange(s.gesture, s);
		set({
			gesture: null,
			past: changed ? [...s.past, s.gesture].slice(-40) : s.past,
			pastLabels: changed ? [...s.pastLabels, label].slice(-40) : s.pastLabels,
			future: changed ? [] : s.future,
			futureLabels: changed ? [] : s.futureLabels,
			saveState: changed ? "dirty" : s.saveState
		});
	},
	patchLayers: (layers, mode = "commit") => {
		const fitted = refitGroups(layers);
		if (mode === "live") set({
			layers: fitted,
			saveState: "dirty"
		});
		else commitSet(set, get, { layers: fitted });
	},
	patchPanels: (panels, mode = "commit") => {
		if (mode === "live") set({
			panels,
			saveState: "dirty"
		});
		else commitSet(set, get, { panels });
	},
	updateMeta: (partial) => commitSet(set, get, { meta: {
		...get().meta,
		...partial
	} }),
	updatePage: (id, partial) => {
		commitSet(set, get, { pages: get().pages.map((p) => p.id === id ? {
			...p,
			...partial
		} : p) });
	},
	updatePanel: (id, partial) => {
		commitSet(set, get, { panels: get().panels.map((p) => p.id === id ? {
			...p,
			...partial
		} : p) });
	},
	updateSelectedLayers: (partial) => {
		const ids = new Set(get().selectedLayerIds);
		if (!ids.size) return;
		commitSet(set, get, { layers: get().layers.map((l) => ids.has(l.id) ? {
			...l,
			...partial
		} : l) });
	},
	renameLayer: (id, name) => {
		commitSet(set, get, { layers: get().layers.map((l) => l.id === id ? {
			...l,
			name
		} : l) });
	},
	placeAsset: (assetId, panelId, at) => {
		const asset = get().assets.find((a) => a.id === assetId);
		if (!asset) return;
		get().noteRecent(assetId);
		const box = placementFor(asset.category);
		const w = box.w;
		const h = box.h;
		const x = at ? Math.min(96, Math.max(-15, at.x - w / 2)) : box.x;
		const y = at ? Math.min(96, Math.max(-15, at.y - h / 2)) : box.y;
		const layer = makeLayer({
			id: uid("layer"),
			panelId,
			name: asset.viewLabel ? `${asset.name} · ${asset.viewLabel}` : asset.name,
			type: "image",
			assetId: asset.id,
			x,
			y,
			w,
			h,
			z: nextZ(get().layers, panelId),
			blendMode: asset.category === "effect" ? "screen" : asset.category === "texture" ? "multiply" : "normal",
			opacity: asset.category === "texture" ? .45 : 1
		});
		commitSet(set, get, {
			layers: [...get().layers, layer],
			selectedPanelId: panelId,
			selectedLayerIds: [layer.id]
		});
	},
	replaceLayerAsset: (layerId, assetId) => {
		const asset = get().assets.find((a) => a.id === assetId);
		const layer = get().layers.find((l) => l.id === layerId);
		if (!asset || !layer || layer.locked) return;
		get().noteRecent(assetId);
		commitSet(set, get, {
			layers: get().layers.map((item) => item.id === layerId ? {
				...item,
				type: "image",
				assetId: asset.id,
				name: asset.viewLabel ? `${asset.name} · ${asset.viewLabel}` : asset.name
			} : item),
			selectedPanelId: layer.panelId,
			selectedLayerIds: [layerId]
		});
		get().toast(asset.category === "background" ? "Décor remplacé." : "Calque remplacé.");
	},
	lockBackgrounds: () => {
		const pageId = get().selectedPageId;
		const panelIds = new Set(get().panels.filter((p) => p.pageId === pageId).map((p) => p.id));
		const backgrounds = new Set(get().assets.filter((a) => a.category === "background").map((a) => a.id));
		const targets = get().layers.filter((l) => l.type === "image" && l.assetId && panelIds.has(l.panelId) && backgrounds.has(l.assetId));
		if (!targets.length) {
			get().toast("Aucun décor sur cette planche.");
			return;
		}
		const lock = targets.some((l) => !l.locked);
		const ids = new Set(targets.map((l) => l.id));
		commitSet(set, get, { layers: get().layers.map((l) => ids.has(l.id) ? {
			...l,
			locked: lock
		} : l) });
		get().toast(lock ? "Décors verrouillés." : "Décors déverrouillés.");
	},
	addText: (panelId, at) => {
		const layer = makeLayer({
			id: uid("layer"),
			panelId,
			name: "Texte",
			type: "text",
			text: "Texte",
			x: at.x - 16,
			y: at.y - 6,
			w: 36,
			h: 12,
			z: nextZ(get().layers, panelId),
			fontSize: 22,
			fontWeight: 700,
			color: "#1c2128"
		});
		commitSet(set, get, {
			layers: [...get().layers, layer],
			selectedPanelId: panelId,
			selectedLayerIds: [layer.id],
			editingLayerId: layer.id,
			tool: "select"
		});
	},
	addBubble: (panelId, style, text, at) => {
		const preset = bubblePreset(style);
		const x = at ? at.x - 22 : 18;
		const y = at ? at.y - 12 : 8;
		const layer = makeLayer({
			id: uid("layer"),
			panelId,
			name: preset.name,
			type: "bubble",
			bubbleStyle: style,
			text: text ?? preset.sample,
			x,
			y,
			w: 46,
			h: 24,
			z: nextZ(get().layers, panelId),
			fontSize: preset.fontSize ?? 16,
			fontFamily: preset.fontFamily ?? "\"Inter\", ui-sans-serif, system-ui, sans-serif",
			fontWeight: preset.weight ?? 700,
			italic: preset.italic ?? false,
			color: preset.ink
		});
		commitSet(set, get, {
			layers: [...get().layers, layer],
			selectedPanelId: panelId,
			selectedLayerIds: [layer.id],
			editingLayerId: layer.id
		});
	},
	addSfx: (panelId, variant, at) => {
		const preset = sfxPreset(variant);
		const layer = makeLayer({
			id: uid("layer"),
			panelId,
			name: preset.text,
			type: "sfx",
			sfxVariant: preset.id,
			text: preset.text,
			color: preset.color,
			x: at ? at.x - 24 : 20,
			y: at ? at.y - 10 : 16,
			w: 50,
			h: 22,
			z: nextZ(get().layers, panelId),
			fontSize: preset.fontSize,
			fontFamily: FONT_DISPLAY,
			rotation: preset.rotation
		});
		commitSet(set, get, {
			layers: [...get().layers, layer],
			selectedPanelId: panelId,
			selectedLayerIds: [layer.id]
		});
	},
	deleteSelected: () => {
		const ids = new Set(get().selectedLayerIds);
		if (!ids.size) return;
		for (const id of [...ids]) for (const d of descendantsOf(get().layers, id)) ids.add(d.id);
		commitSet(set, get, {
			layers: get().layers.filter((l) => !ids.has(l.id)),
			selectedLayerIds: [],
			editingLayerId: null
		});
	},
	duplicateSelected: () => {
		const selected = topmostIds(get().layers, get().selectedLayerIds);
		if (!selected.length) return;
		const idMap = /* @__PURE__ */ new Map();
		const sourceIds = /* @__PURE__ */ new Set();
		for (const id of selected) {
			sourceIds.add(id);
			idMap.set(id, uid("layer"));
			for (const d of descendantsOf(get().layers, id)) {
				sourceIds.add(d.id);
				idMap.set(d.id, uid("layer"));
			}
		}
		const base = [...get().layers];
		const clones = get().layers.filter((l) => sourceIds.has(l.id)).map((l) => ({
			...l,
			id: idMap.get(l.id) ?? uid("layer"),
			parentId: l.parentId && idMap.has(l.parentId) ? idMap.get(l.parentId) : l.parentId,
			name: `${l.name} copie`,
			x: l.x + 3,
			y: l.y + 3
		}));
		for (const clone of clones) {
			clone.z = base.filter((l) => l.panelId === clone.panelId && l.parentId === clone.parentId).reduce((m, l) => Math.max(m, l.z), 0) + 1;
			base.push(clone);
		}
		commitSet(set, get, {
			layers: refitGroups(base),
			selectedLayerIds: selected.map((id) => idMap.get(id))
		});
	},
	copySelected: () => {
		const selected = topmostIds(get().layers, get().selectedLayerIds);
		if (!selected.length) return;
		const ids = /* @__PURE__ */ new Set();
		for (const id of selected) {
			ids.add(id);
			for (const child of descendantsOf(get().layers, id)) ids.add(child.id);
		}
		set({ clipboard: get().layers.filter((layer) => ids.has(layer.id)).map((layer) => ({
			...layer,
			crop: { ...layer.crop },
			mask: layer.mask ? {
				...layer.mask,
				points: layer.mask.points?.map((point) => ({ ...point }))
			} : null
		})) });
		get().toast("Calques copiés.");
	},
	pasteClipboard: () => {
		const clip = get().clipboard;
		const panelId = get().selectedPanelId;
		if (!clip.length || !panelId) {
			get().toast("Rien à coller.");
			return;
		}
		const idMap = new Map(clip.map((layer) => [layer.id, uid("layer")]));
		const samePanel = clip.some((layer) => layer.panelId === panelId);
		let z = nextZ(get().layers, panelId);
		const clones = clip.map((layer) => {
			const parentInClip = layer.parentId != null && idMap.has(layer.parentId);
			const clone = {
				...layer,
				id: idMap.get(layer.id) ?? uid("layer"),
				panelId,
				parentId: parentInClip ? idMap.get(layer.parentId) : null,
				x: layer.x + (samePanel ? 4 : 0),
				y: layer.y + (samePanel ? 4 : 0),
				z: layer.z,
				crop: { ...layer.crop },
				mask: layer.mask ? {
					...layer.mask,
					points: layer.mask.points?.map((point) => ({ ...point }))
				} : null
			};
			if (!parentInClip) {
				clone.z = z;
				z += 1;
			}
			return clone;
		});
		const roots = clip.filter((layer) => !layer.parentId || !idMap.has(layer.parentId)).map((layer) => idMap.get(layer.id));
		commitSet(set, get, {
			layers: refitGroups([...get().layers, ...clones]),
			selectedPanelId: panelId,
			selectedLayerIds: roots
		});
	},
	jumpHistory: (index) => {
		const s = get();
		const target = s.past[index];
		if (!target) return;
		const skipped = s.past.slice(index + 1);
		const skippedLabels = s.pastLabels.slice(index + 1);
		set({
			...target,
			past: s.past.slice(0, index),
			pastLabels: s.pastLabels.slice(0, index),
			future: [
				...s.future.slice().reverse(),
				snapOf(s),
				...skipped.slice().reverse()
			],
			futureLabels: [
				...s.futureLabels.slice().reverse(),
				...skippedLabels.slice().reverse(),
				s.pastLabels[index] ?? "Étape"
			],
			saveState: "dirty",
			selectedLayerIds: s.selectedLayerIds.filter((id) => target.layers.some((layer) => layer.id === id))
		});
	},
	reorderSelected: (dir) => {
		const id = get().selectedLayerIds.at(-1);
		if (!id) return;
		commitSet(set, get, { layers: reorderLayer(get().layers, id, dir) });
	},
	moveLayer: (id, targetId, place) => {
		const next = moveLayerBeside(get().layers, id, targetId, place);
		if (next === get().layers) return;
		commitSet(set, get, { layers: next });
	},
	groupSelected: () => {
		const ids = topmostIds(get().layers, get().selectedLayerIds);
		if (ids.length < 2) {
			get().toast("Sélectionnez au moins deux calques.");
			return;
		}
		const chosen = get().layers.filter((l) => ids.includes(l.id));
		const panelId = chosen[0]?.panelId;
		const parentId = chosen[0]?.parentId ?? null;
		if (!panelId || chosen.some((l) => l.panelId !== panelId || l.parentId !== parentId)) {
			get().toast("Les calques doivent appartenir à la même case.");
			return;
		}
		const id = uid("group");
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		for (const l of chosen) {
			minX = Math.min(minX, l.x);
			minY = Math.min(minY, l.y);
			maxX = Math.max(maxX, l.x + l.w);
			maxY = Math.max(maxY, l.y + l.h);
		}
		const group = makeLayer({
			id,
			panelId,
			parentId,
			name: "Groupe",
			type: "group",
			x: minX,
			y: minY,
			w: maxX - minX,
			h: maxY - minY,
			z: Math.max(...chosen.map((l) => l.z)) + 1
		});
		const idSet = new Set(ids);
		commitSet(set, get, {
			layers: [...get().layers.map((l) => idSet.has(l.id) ? {
				...l,
				parentId: id
			} : l), group],
			selectedLayerIds: [id]
		});
	},
	ungroupSelected: () => {
		const groups = get().layers.filter((l) => get().selectedLayerIds.includes(l.id) && l.type === "group");
		if (!groups.length) return;
		let layers = get().layers;
		const freed = [];
		for (const group of groups) {
			layers = layers.filter((l) => l.id !== group.id).map((l) => l.parentId === group.id ? {
				...l,
				parentId: group.parentId
			} : l);
			freed.push(...get().layers.filter((l) => l.parentId === group.id).map((l) => l.id));
		}
		commitSet(set, get, {
			layers: refitGroups(layers),
			selectedLayerIds: freed
		});
	},
	addAsset: (asset, blobUrl) => {
		set({
			assets: [asset, ...get().assets],
			blobUrls: blobUrl ? {
				...get().blobUrls,
				[asset.src.replace("idb:", "")]: blobUrl
			} : get().blobUrls,
			saveState: "dirty"
		});
	},
	updateAsset: (id, partial) => {
		set({
			assets: get().assets.map((a) => a.id === id ? {
				...a,
				...partial
			} : a),
			saveState: "dirty"
		});
	},
	removeAsset: (id) => {
		set({
			assets: get().assets.filter((a) => a.id !== id),
			saveState: "dirty"
		});
		get().toast("Asset retiré. Les instances déjà posées restent dans les cases.");
	},
	addPage: (preset) => {
		const size = pageSize(preset);
		const id = uid("page");
		const page = {
			id,
			name: `${String(get().pages.length + 1).padStart(2, "0")} — ${PRESET_LABEL[preset]}`,
			preset,
			background: pagePresetInfo(preset).background,
			width: size.width,
			height: size.height
		};
		const panels = createPanels(preset, id);
		commitSet(set, get, {
			pages: [...get().pages, page],
			panels: [...get().panels, ...panels],
			selectedPageId: id,
			selectedPanelId: panels[0]?.id ?? null,
			selectedLayerIds: []
		});
	},
	deletePage: (id) => {
		if (get().pages.length <= 1) {
			get().toast("Le projet doit garder au moins une page.");
			return;
		}
		const panelIds = new Set(get().panels.filter((p) => p.pageId === id).map((p) => p.id));
		const pages = get().pages.filter((p) => p.id !== id);
		const nextId = get().selectedPageId === id ? pages[0].id : get().selectedPageId;
		commitSet(set, get, {
			pages,
			panels: get().panels.filter((p) => p.pageId !== id),
			layers: get().layers.filter((l) => !panelIds.has(l.panelId)),
			selectedPageId: nextId,
			selectedPanelId: get().panels.find((p) => p.pageId === nextId && !panelIds.has(p.id))?.id ?? null,
			selectedLayerIds: []
		});
	},
	duplicatePage: (id) => {
		const page = get().pages.find((p) => p.id === id);
		if (!page) return;
		const pageId = uid("page");
		const panelMap = /* @__PURE__ */ new Map();
		const panels = get().panels.filter((p) => p.pageId === id).map((p) => {
			const nid = uid("panel");
			panelMap.set(p.id, nid);
			return {
				...p,
				id: nid,
				pageId
			};
		});
		const layerMap = /* @__PURE__ */ new Map();
		const source = get().layers.filter((l) => panelMap.has(l.panelId));
		for (const layer of source) layerMap.set(layer.id, uid("layer"));
		const layers = source.map((l) => ({
			...l,
			id: layerMap.get(l.id),
			panelId: panelMap.get(l.panelId),
			parentId: l.parentId ? layerMap.get(l.parentId) ?? null : null
		}));
		const idx = get().pages.findIndex((p) => p.id === id);
		const pages = [...get().pages];
		pages.splice(idx + 1, 0, {
			...page,
			id: pageId,
			name: `${page.name} copie`
		});
		commitSet(set, get, {
			pages,
			panels: [...get().panels, ...panels],
			layers: [...get().layers, ...layers],
			selectedPageId: pageId,
			selectedPanelId: panels[0]?.id ?? null,
			selectedLayerIds: []
		});
	},
	reorderPages: (fromId, toId) => {
		if (fromId === toId) return;
		const pages = [...get().pages];
		const from = pages.findIndex((p) => p.id === fromId);
		const to = pages.findIndex((p) => p.id === toId);
		if (from < 0 || to < 0) return;
		const [item] = pages.splice(from, 1);
		pages.splice(to, 0, item);
		commitSet(set, get, { pages });
	},
	splitPanel: (dir) => {
		const panel = get().panels.find((p) => p.id === get().selectedPanelId);
		if (!panel) {
			get().toast("Sélectionnez une case à scinder.");
			return;
		}
		const gap = 1.4;
		if (dir === "h" && panel.h < 12 || dir === "v" && panel.w < 12) {
			get().toast("La case est trop petite pour être scindée.");
			return;
		}
		const id = uid("panel");
		let updated = panel;
		let created;
		if (dir === "h") {
			const h = (panel.h - gap) / 2;
			updated = {
				...panel,
				h
			};
			created = {
				...panel,
				id,
				y: panel.y + h + gap,
				h
			};
		} else {
			const w = (panel.w - gap) / 2;
			updated = {
				...panel,
				w
			};
			created = {
				...panel,
				id,
				x: panel.x + w + gap,
				w
			};
		}
		commitSet(set, get, {
			panels: [...get().panels.map((p) => p.id === panel.id ? updated : p), created],
			selectedPanelId: panel.id
		});
	},
	duplicatePanel: () => {
		const panel = get().panels.find((p) => p.id === get().selectedPanelId);
		if (!panel) return;
		const id = uid("panel");
		const copy = {
			...panel,
			id,
			x: Math.min(panel.x + 3, 70),
			y: Math.min(panel.y + 3, 70)
		};
		const map = /* @__PURE__ */ new Map();
		const source = get().layers.filter((l) => l.panelId === panel.id);
		for (const layer of source) map.set(layer.id, uid("layer"));
		const layers = source.map((l) => ({
			...l,
			id: map.get(l.id),
			panelId: id,
			parentId: l.parentId ? map.get(l.parentId) ?? null : null
		}));
		commitSet(set, get, {
			panels: [...get().panels, copy],
			layers: [...get().layers, ...layers],
			selectedPanelId: id,
			selectedLayerIds: []
		});
	},
	deletePanel: () => {
		const id = get().selectedPanelId;
		if (!id) return;
		const panel = get().panels.find((p) => p.id === id);
		commitSet(set, get, {
			panels: get().panels.filter((p) => p.id !== id),
			layers: get().layers.filter((l) => l.panelId !== id),
			selectedPanelId: get().panels.find((p) => p.pageId === panel?.pageId && p.id !== id)?.id ?? null,
			selectedLayerIds: []
		});
	},
	undo: () => {
		const s = get();
		const prev = s.past[s.past.length - 1];
		if (!prev) return;
		set({
			...prev,
			past: s.past.slice(0, -1),
			pastLabels: s.pastLabels.slice(0, -1),
			future: [...s.future, snapOf(s)],
			futureLabels: [...s.futureLabels, s.pastLabels.at(-1) ?? "Étape"],
			saveState: "dirty",
			selectedLayerIds: s.selectedLayerIds.filter((id) => prev.layers.some((l) => l.id === id))
		});
	},
	redo: () => {
		const s = get();
		const next = s.future[s.future.length - 1];
		if (!next) return;
		set({
			...next,
			future: s.future.slice(0, -1),
			futureLabels: s.futureLabels.slice(0, -1),
			past: [...s.past, snapOf(s)],
			pastLabels: [...s.pastLabels, s.futureLabels.at(-1) ?? "Étape"],
			saveState: "dirty"
		});
	},
	loadFile: (file, blobUrls) => {
		set({
			meta: file.project,
			pages: file.pages,
			panels: file.panels,
			layers: file.layers,
			assets: file.assets,
			blobUrls: {
				...get().blobUrls,
				...blobUrls
			},
			selectedPageId: file.selectedPageId || file.pages[0]?.id,
			selectedPanelId: file.panels.find((p) => p.pageId === (file.selectedPageId || file.pages[0]?.id))?.id ?? null,
			selectedLayerIds: [],
			past: [],
			pastLabels: [],
			future: [],
			futureLabels: [],
			saveState: "dirty"
		});
		get().toast("Projet importé.");
	},
	resetDemo: () => {
		const demo = createDemoProject();
		set({
			meta: demo.meta,
			pages: demo.pages,
			panels: demo.panels,
			layers: demo.layers,
			assets: DEMO_ASSETS,
			selectedPageId: demo.pages[0].id,
			selectedPanelId: demo.panels[0]?.id ?? null,
			selectedLayerIds: [],
			past: [],
			pastLabels: [],
			future: [],
			futureLabels: [],
			saveState: "dirty"
		});
		get().toast("Projet exemple rechargé.");
	},
	newBlank: () => {
		const size = pageSize("franco");
		const id = uid("page");
		const panels = createPanels("franco", id);
		set({
			meta: {
				id: uid("projet"),
				title: "Sans titre",
				subtitle: "",
				author: "",
				updatedAt: Date.now()
			},
			pages: [{
				id,
				name: "01 — Planche",
				preset: "franco",
				background: "#efe6d6",
				width: size.width,
				height: size.height
			}],
			panels,
			layers: [],
			selectedPageId: id,
			selectedPanelId: panels[0]?.id ?? null,
			selectedLayerIds: [],
			past: [],
			pastLabels: [],
			future: [],
			futureLabels: [],
			saveState: "dirty"
		});
	}
}));
function primaryLayer(state) {
	const id = state.selectedLayerIds.at(-1);
	return state.layers.find((l) => l.id === id);
}
var BLEND_MODES = [
	{
		id: "normal",
		label: "Normal"
	},
	{
		id: "multiply",
		label: "Multiply"
	},
	{
		id: "screen",
		label: "Screen"
	},
	{
		id: "overlay",
		label: "Overlay"
	},
	{
		id: "soft-light",
		label: "Soft Light"
	},
	{
		id: "hard-light",
		label: "Hard Light"
	},
	{
		id: "darken",
		label: "Darken"
	},
	{
		id: "lighten",
		label: "Lighten"
	},
	{
		id: "color",
		label: "Color"
	},
	{
		id: "luminosity",
		label: "Luminosity"
	}
];
var CATEGORY_LABEL = {
	all: "Tous",
	character: "Personnages",
	modelsheet: "Model sheets",
	background: "Décors",
	photo: "Photos",
	object: "Objets",
	vehicle: "Véhicules",
	effect: "Effets",
	texture: "Textures",
	bubble: "Bulles",
	sfx: "Onomatopées",
	custom: "Custom"
};
var DB_NAME = "atelier-bd-pro";
var STORE = "blobs";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function idbSet(key, value) {
	const db = await openDb();
	await new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readwrite");
		tx.objectStore(STORE).put(value, key);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
	db.close();
}
async function idbGet(key) {
	const db = await openDb();
	const value = await new Promise((resolve, reject) => {
		const req = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
		req.onsuccess = () => resolve(req.result ?? null);
		req.onerror = () => reject(req.error);
	});
	db.close();
	return value;
}
function readFileAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}
var IDEAS = [
	{
		label: "Personnage",
		category: "character",
		prompt: "Personnage de bande dessinée en pied, fond simple"
	},
	{
		label: "Décor",
		category: "background",
		prompt: "Décor large de case, sans personnage"
	},
	{
		label: "Objet",
		category: "object",
		prompt: "Objet isolé utile à une case d'aventure"
	},
	{
		label: "Véhicule",
		category: "vehicle",
		prompt: "Véhicule d'expédition, vue de côté"
	},
	{
		label: "Effet",
		category: "effect",
		prompt: "Effet lumineux isolé sur fond noir"
	}
];
function AiImageModal() {
	const open = useProjectStore((s) => s.aiOpen);
	const setOpen = useProjectStore((s) => s.setAiOpen);
	const [prompt, setPrompt] = (0, import_react.useState)("Un éclaireur sous la pluie, cape courte, lampe à huile");
	const [category, setCategory] = (0, import_react.useState)("character");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalFrame, {
		open,
		onOpenChange: setOpen,
		title: "Générer un asset",
		description: "L'image rejoint la bibliothèque. Glissez-la ensuite dans une case — rien n'est peint directement sur la planche.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row-actions",
				children: IDEAS.map((idea) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => {
						setCategory(idea.category);
						setPrompt(idea.prompt);
					},
					children: idea.label
				}, idea.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				style: { marginTop: 10 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Catégorie" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: category,
					onChange: (e) => setCategory(e.target.value),
					children: IDEAS.map((idea) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: idea.category,
						children: CATEGORY_LABEL[idea.category]
					}, idea.category))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				style: { marginTop: 8 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: prompt,
					onChange: (e) => setPrompt(e.target.value)
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-accent",
				style: { marginTop: 12 },
				disabled: busy,
				onClick: () => {
					setBusy(true);
					setError("");
					generateAssetImage({ data: {
						prompt,
						category
					} }).then(async (result) => {
						if (!result.ok) {
							setError(result.error);
							return;
						}
						const id = uid("asset");
						await idbSet(id, result.dataUrl);
						const name = prompt.slice(0, 42);
						useProjectStore.getState().addAsset({
							id,
							name,
							description: prompt,
							category,
							tags: ["ia"],
							favorite: false,
							createdAt: Date.now(),
							source: "ai",
							src: `idb:${id}`,
							mime: "image/png"
						}, result.dataUrl);
						useProjectStore.getState().toast("Asset IA ajouté à la bibliothèque.");
						setOpen(false);
					}).catch(() => setError("La génération a échoué.")).finally(() => setBusy(false));
				},
				children: busy ? "Génération…" : "Créer l'asset"
			})
		]
	});
}
function CloudImportModal() {
	const open = useProjectStore((s) => s.cloudOpen);
	const setOpen = useProjectStore((s) => s.setCloudOpen);
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [files, setFiles] = (0, import_react.useState)([]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalFrame, {
		open,
		onOpenChange: setOpen,
		title: "Import cloud",
		description: "Google Drive est optionnel. Sans connexion, importez depuis vos fichiers : l'atelier continue de fonctionner.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => {
						setOpen(false);
						useProjectStore.getState().setImportOpen(true);
					},
					children: "Import local"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				style: { marginTop: 10 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recherche Drive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					placeholder: "nom de l'image",
					onChange: (e) => setQuery(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-accent",
				style: { marginTop: 8 },
				onClick: () => {
					setStatus("Recherche…");
					searchCloudImages({ data: { query } }).then((result) => {
						if (result.loginRequired || result.pending) {
							setStatus("Google Drive n'est pas connecté dans cette session. L'import local reste disponible.");
							setFiles([]);
							return;
						}
						if (!result.ok) {
							setStatus(result.error || "Drive indisponible. L'atelier fonctionne sans cloud.");
							setFiles([]);
							return;
						}
						setFiles(result.files);
						setStatus(result.files.length ? `${result.files.length} fichier(s) trouvé(s).` : "Aucun fichier image listé.");
					});
				},
				children: "Chercher dans Drive"
			}),
			status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: status
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "hint",
				children: file.name
			}, file.id)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: "Google Photos n'est pas branché ici. Si un fichier Drive n'est pas téléchargeable, passez par Importer."
			})
		]
	});
}
function filterAssets(assets, category, query, favoritesOnly = false, tag = "") {
	const q = query.trim().toLowerCase();
	return assets.filter((asset) => {
		if (category !== "all" && asset.category !== category) return false;
		if (favoritesOnly && !asset.favorite) return false;
		if (tag && !asset.tags.includes(tag)) return false;
		if (!q) return true;
		return `${asset.name} ${asset.description} ${asset.tags.join(" ")} ${asset.viewLabel ?? ""}`.toLowerCase().includes(q);
	});
}
function groupCharacters(assets) {
	const views = assets.filter((a) => a.category === "character");
	const sheets = assets.filter((a) => a.category === "modelsheet");
	const order = [];
	const map = /* @__PURE__ */ new Map();
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
			sheet: sheets.find((s) => s.characterKey === key)
		};
	});
}
function resolveSrc(asset, blobUrls) {
	if (!asset) return "";
	if (asset.src.startsWith("idb:")) return blobUrls[asset.src.slice(4)] ?? "";
	return asset.src;
}
function useAssets() {
	return useProjectStore(useShallow((s) => ({
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
		placeAsset: s.placeAsset
	})));
}
function useAssetUrl(assetId) {
	return useProjectStore((s) => resolveSrc(s.assets.find((a) => a.id === assetId), s.blobUrls));
}
function ImageCropModal() {
	const open = useProjectStore((s) => s.cropOpen);
	const setOpen = useProjectStore((s) => s.setCropOpen);
	const layer = useProjectStore((s) => primaryLayer(s));
	const src = useAssetUrl(layer?.type === "image" ? layer.assetId : void 0);
	const [crop, setCrop] = (0, import_react.useState)(FULL_CROP);
	(0, import_react.useEffect)(() => {
		if (open && layer?.type === "image") setCrop(layer.crop);
	}, [open, layer]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalFrame, {
		open,
		onOpenChange: setOpen,
		title: "Recadrage",
		description: "L'image source reste intacte. Seule la zone visible change.",
		children: layer?.type !== "image" || !src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "hint",
			children: "Sélectionnez un calque image."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CropStage, {
			src,
			crop,
			onChange: setCrop
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row-actions",
			style: { marginTop: 12 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-accent",
				onClick: () => {
					useProjectStore.getState().updateSelectedLayers({ crop });
					setOpen(false);
				},
				children: "Appliquer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-line",
				onClick: () => setCrop(FULL_CROP),
				children: "Tout voir"
			})]
		})] })
	});
}
function CropStage({ src, crop, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "checker-wide",
		style: {
			aspectRatio: "4 / 3",
			position: "relative",
			userSelect: "none"
		},
		onPointerDown: (e) => {
			const host = e.currentTarget.getBoundingClientRect();
			const x = (e.clientX - host.left) / host.width;
			const y = (e.clientY - host.top) / host.height;
			const start = {
				...crop,
				px: e.clientX,
				py: e.clientY
			};
			const move = (ev) => {
				const dx = (ev.clientX - start.px) / host.width;
				const dy = (ev.clientY - start.py) / host.height;
				onChange({
					...crop,
					x: clamp01$1(start.x + dx, 1 - crop.w),
					y: clamp01$1(start.y + dy, 1 - crop.h)
				});
			};
			const up = () => {
				window.removeEventListener("pointermove", move);
				window.removeEventListener("pointerup", up);
			};
			if (x < crop.x || y < crop.y || x > crop.x + crop.w || y > crop.y + crop.h) {
				onChange({
					x: clamp01$1(x - .15, .7),
					y: clamp01$1(y - .15, .7),
					w: .4,
					h: .4
				});
				return;
			}
			window.addEventListener("pointermove", move);
			window.addEventListener("pointerup", up);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				draggable: false,
				style: { opacity: .45 }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					left: `${crop.x * 100}%`,
					top: `${crop.y * 100}%`,
					width: `${crop.w * 100}%`,
					height: `${crop.h * 100}%`,
					overflow: "hidden",
					boxShadow: "0 0 0 1px #ff9d2e, 0 0 0 999px rgba(9,13,18,0.35)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					draggable: false,
					style: {
						position: "absolute",
						width: `${100 / crop.w}%`,
						height: `${100 / crop.h}%`,
						left: `${-crop.x / crop.w * 100}%`,
						top: `${-crop.y / crop.h * 100}%`,
						maxWidth: "none"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prop-grid",
				style: {
					position: "relative",
					marginTop: 8
				},
				children: [
					"x",
					"y",
					"w",
					"h"
				].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: key }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						step: .01,
						min: .02,
						max: 1,
						value: Math.round(crop[key] * 100) / 100,
						onChange: (e) => onChange({
							...crop,
							[key]: Number(e.target.value)
						})
					})]
				}, key))
			})
		]
	});
}
function clamp01$1(n, max) {
	return Math.max(0, Math.min(max, n));
}
async function importImageFiles(files, category, placeInPanel, at) {
	const images = files.filter((file) => file.type.startsWith("image/"));
	if (!images.length) {
		useProjectStore.getState().toast("Formats acceptés : PNG, JPG, WEBP, SVG, GIF.");
		return;
	}
	let firstId = "";
	for (const file of images) {
		const data = await readFileAsDataUrl(file);
		const id = uid("asset");
		await idbSet(id, data);
		const name = file.name.replace(/\.[^.]+$/, "") || "Import";
		useProjectStore.getState().addAsset({
			id,
			name,
			description: "",
			category,
			tags: ["import"],
			favorite: false,
			createdAt: Date.now(),
			source: "import",
			src: `idb:${id}`,
			mime: file.type || "image/png"
		}, data);
		if (!firstId) firstId = id;
	}
	if (placeInPanel && firstId) useProjectStore.getState().placeAsset(firstId, placeInPanel, at);
	useProjectStore.getState().toast(images.length > 1 ? `${images.length} assets ajoutés à la bibliothèque.` : "Asset ajouté à la bibliothèque.");
}
var CATS$1 = [
	"character",
	"modelsheet",
	"background",
	"photo",
	"object",
	"vehicle",
	"effect",
	"texture",
	"custom"
];
function ImportModal() {
	const open = useProjectStore((s) => s.importOpen);
	const setOpen = useProjectStore((s) => s.setImportOpen);
	const [category, setCategory] = (0, import_react.useState)("custom");
	const [hot, setHot] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalFrame, {
		open,
		onOpenChange: setOpen,
		title: "Importer des assets",
		description: "PNG, JPG, WEBP, SVG ou GIF. Chaque fichier devient un asset réutilisable.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "field",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Catégorie" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: category,
				onChange: (e) => setCategory(e.target.value),
				children: CATS$1.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: cat,
					children: CATEGORY_LABEL[cat]
				}, cat))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "dropzone",
			"data-hot": hot ? "true" : "false",
			style: {
				display: "block",
				marginTop: 12
			},
			onDragOver: (e) => {
				e.preventDefault();
				setHot(true);
			},
			onDragLeave: () => setHot(false),
			onDrop: (e) => {
				e.preventDefault();
				setHot(false);
				importImageFiles([...e.dataTransfer.files], category).then(() => setOpen(false));
			},
			children: [
				"Déposez vos images ici",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/png,image/jpeg,image/webp,image/svg+xml,image/gif",
					multiple: true,
					hidden: true,
					onChange: (e) => {
						importImageFiles([...e.target.files ?? []], category).then(() => setOpen(false));
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "btn btn-line",
					style: { marginTop: 8 },
					children: "Parcourir"
				}) })
			]
		})]
	});
}
var HANDLES = [
	"nw",
	"n",
	"ne",
	"e",
	"se",
	"s",
	"sw",
	"w"
];
var SPIKES$1 = {
	shout: {
		fill: "#fff4e4",
		stroke: "#1c2128",
		points: "100,4 118,28 148,10 142,40 176,36 154,58 196,70 150,78 168,108 128,90 112,116 96,88 60,112 72,82 28,96 52,70 8,62 48,50 22,24 62,36 78,8"
	},
	scream: {
		fill: "#ffe4e1",
		stroke: "#7a1d1d",
		points: "100,2 122,26 154,6 146,38 186,28 158,52 198,68 152,74 176,112 124,86 108,118 90,86 48,116 64,80 18,98 46,66 4,58 42,46 16,20 58,32 74,4"
	},
	electric: {
		fill: "#e5fbff",
		stroke: "#0e4a5c",
		points: "100,2 114,34 146,14 132,46 178,40 150,62 196,78 148,82 168,116 118,88 104,118 88,86 46,114 70,78 22,92 48,64 6,54 44,44 24,18 64,30 80,4"
	},
	boom: {
		fill: "#fff1d6",
		stroke: "#1c2128",
		points: "100,8 112,36 140,22 128,48 164,48 136,64 168,84 132,84 140,112 108,90 100,116 88,90 56,112 66,84 30,86 58,66 28,48 64,50 52,24 84,38"
	},
	anger: {
		fill: "#ffd9d4",
		stroke: "#7a1d1d",
		points: "100,0 126,22 160,4 148,36 196,30 160,54 198,78 152,78 170,118 116,88 100,120 82,88 28,118 48,78 2,76 40,54 6,28 52,36 42,4 74,22"
	}
};
function BubbleShape$1({ style }) {
	const spike = SPIKES$1[style];
	if (spike) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "bubble-svg",
		viewBox: "0 0 200 120",
		preserveAspectRatio: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			fill: spike.fill,
			stroke: spike.stroke,
			strokeWidth: "3",
			vectorEffect: "non-scaling-stroke",
			points: spike.points
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `bubble-skin ${style}`,
		"aria-hidden": true
	});
}
function MaskOutline({ mask }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "mask-outline",
		viewBox: "0 0 100 100",
		preserveAspectRatio: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskShapeView$1, { mask })
	});
}
function MaskShapeView$1({ mask, fill = "none" }) {
	if (mask.type === "ellipse") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
		cx: (mask.x + mask.w / 2) * 100,
		cy: (mask.y + mask.h / 2) * 100,
		rx: Math.max(1, mask.w * 100 / 2),
		ry: Math.max(1, mask.h * 100 / 2),
		fill,
		stroke: "#ff9d2e",
		strokeWidth: "1.5",
		vectorEffect: "non-scaling-stroke"
	});
	if (mask.type === "free") {
		const points = mask.points ?? [];
		if (points.length < 2) return null;
		const d = points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ");
		return points.length >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: d,
			fill,
			stroke: "#ff9d2e",
			strokeWidth: "1.5",
			vectorEffect: "non-scaling-stroke"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: d,
			fill: "none",
			stroke: "#ff9d2e",
			strokeWidth: "1.5",
			vectorEffect: "non-scaling-stroke"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: mask.x * 100,
		y: mask.y * 100,
		width: mask.w * 100,
		height: mask.h * 100,
		fill,
		stroke: "#ff9d2e",
		strokeWidth: "1.5",
		vectorEffect: "non-scaling-stroke"
	});
}
function maskRef(layer) {
	return `mf-${layer.id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
function SoftMask({ layer }) {
	const mask = layer.mask;
	const feather = mask?.feather ?? 0;
	if (!mask || feather <= 0) return null;
	const id = maskRef(layer);
	const blur = Math.max(.006, feather / 320);
	const shape = mask.type === "ellipse" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
		cx: mask.x + mask.w / 2,
		cy: mask.y + mask.h / 2,
		rx: mask.w / 2,
		ry: mask.h / 2,
		fill: "white",
		filter: `url(#${id}-b)`
	}) : mask.type === "free" && mask.points && mask.points.length >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
		points: mask.points.map((point) => `${point.x},${point.y}`).join(" "),
		fill: "white",
		filter: `url(#${id}-b)`
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: mask.x,
		y: mask.y,
		width: mask.w,
		height: mask.h,
		fill: "white",
		filter: `url(#${id}-b)`
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "feather-svg",
		width: "0",
		height: "0",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
			id: `${id}-b`,
			primitiveUnits: "objectBoundingBox",
			x: "-40%",
			y: "-40%",
			width: "180%",
			height: "180%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: blur })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
			id,
			maskUnits: "objectBoundingBox",
			maskContentUnits: "objectBoundingBox",
			children: shape
		})] })
	});
}
function maskStyle(layer, clip) {
	if ((layer.mask?.feather ?? 0) > 0) {
		const url = `url(#${maskRef(layer)})`;
		return {
			mask: url,
			WebkitMask: url
		};
	}
	return { clipPath: clip };
}
function useCanvas() {
	return useProjectStore(useShallow((s) => ({
		beginGesture: s.beginGesture,
		endGesture: s.endGesture,
		patchLayers: s.patchLayers,
		placeAsset: s.placeAsset,
		addText: s.addText,
		addBubble: s.addBubble,
		addSfx: s.addSfx
	})));
}
function LayerVisual({ layer, stack }) {
	const src = useAssetUrl(layer.assetId);
	const editing = useProjectStore((s) => s.editingLayerId === layer.id);
	const setEditing = useProjectStore((s) => s.setEditing);
	const patchLayers = useProjectStore((s) => s.patchLayers);
	const clip = maskToClip(layer.mask);
	const selected = useProjectStore((s) => s.selectedLayerIds.includes(layer.id));
	const cropping = useProjectStore((s) => s.tool === "crop" && s.selectedLayerIds.includes(layer.id) && layer.type === "image");
	const bright = layer.brightness ?? 1;
	const contrast = layer.contrast ?? 1;
	const grade = bright !== 1 || contrast !== 1 ? `brightness(${bright}) contrast(${contrast})` : "";
	const fullBleed = layer.w >= 98 && layer.h >= 98;
	const partialCrop = layer.crop.x > .01 || layer.crop.y > .01 || layer.crop.w < .98 || layer.crop.h < .98;
	const cutout = layer.type === "image" && !fullBleed && layer.blendMode === "normal";
	const common = {
		position: "absolute",
		left: `${layer.x}%`,
		top: `${layer.y}%`,
		width: `${layer.w}%`,
		height: `${layer.h}%`,
		transform: `rotate(${layer.rotation}deg) scale(${layer.flipH ? -1 : 1}, ${layer.flipV ? -1 : 1})`,
		opacity: layer.opacity,
		mixBlendMode: layer.blendMode,
		zIndex: stack,
		display: layer.visible ? "block" : "none",
		filter: [cutout ? "drop-shadow(0 10px 8px rgba(0,0,0,.38))" : "", grade].filter(Boolean).join(" ") || void 0
	};
	if (layer.type === "image") {
		const tint = layer.tintAmount ?? 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "layer-node",
			style: common,
			"data-layer": layer.id,
			children: [cropping && src ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				draggable: false,
				style: {
					width: "100%",
					height: "100%",
					objectFit: "fill",
					opacity: .35
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "crop-live",
				style: {
					left: `${layer.crop.x * 100}%`,
					top: `${layer.crop.y * 100}%`,
					width: `${layer.crop.w * 100}%`,
					height: `${layer.crop.h * 100}%`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: layer.name,
					draggable: false,
					style: cropImageStyle(layer.crop)
				})
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "crop-window",
				style: maskStyle(layer, clip),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftMask, { layer }),
					src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: layer.name,
						draggable: false,
						style: fullBleed ? coverImageStyle(layer.crop) : partialCrop ? cropImageStyle(layer.crop) : {
							width: "100%",
							height: "100%",
							objectFit: "contain",
							objectPosition: "center bottom"
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hint",
						style: { padding: 8 },
						children: layer.name
					}),
					tint > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tint-wash",
						style: {
							background: layer.tint || "#fff",
							opacity: tint
						}
					}) : null
				]
			}), selected && layer.mask && !cropping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskOutline, { mask: layer.mask }) : null]
		});
	}
	if (layer.type === "bubble") {
		const tailRot = layer.bubbleStyle === "thought" ? 0 : Math.atan2((layer.tailX ?? 50) - 50, (layer.tailY ?? 100) - 74) * 180 / Math.PI;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "layer-node",
			style: common,
			"data-layer": layer.id,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bubble-wrap",
				"data-style": layer.bubbleStyle,
				style: {
					...maskStyle(layer, clip),
					["--tail-x"]: `${layer.tailX ?? (layer.bubbleStyle === "thought" ? 22 : 50)}%`,
					["--tail-y"]: `${layer.tailY ?? (layer.bubbleStyle === "thought" ? 86 : 100)}%`,
					["--tail-len"]: String(layer.tailLen ?? 1),
					["--tail-rot"]: `${tailRot}deg`
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftMask, { layer }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BubbleShape$1, { style: layer.bubbleStyle }),
					editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "inline-edit",
						autoFocus: true,
						defaultValue: layer.text,
						onBlur: (e) => {
							const value = e.target.value;
							patchLayers(useProjectStore.getState().layers.map((item) => item.id === layer.id ? {
								...item,
								text: value,
								name: value.slice(0, 24) || "Bulle"
							} : item));
							setEditing(null);
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bubble-text",
						style: {
							fontFamily: resolveFont(layer.fontFamily),
							fontSize: layer.fontSize,
							fontWeight: layer.fontWeight,
							fontStyle: layer.italic ? "italic" : "normal",
							color: layer.color,
							textAlign: layer.align,
							justifyContent: layer.align === "left" ? "flex-start" : layer.align === "right" ? "flex-end" : "center"
						},
						children: layer.text
					})
				]
			}), selected && layer.mask ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskOutline, { mask: layer.mask }) : null]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "layer-node",
		style: common,
		"data-layer": layer.id,
		children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			className: "inline-edit",
			autoFocus: true,
			defaultValue: layer.text,
			onBlur: (e) => {
				const value = e.target.value;
				patchLayers(useProjectStore.getState().layers.map((item) => item.id === layer.id ? {
					...item,
					text: value,
					name: value.slice(0, 24) || layer.name
				} : item));
				setEditing(null);
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: layer.type === "sfx" ? "sfx-wrap" : "text-wrap",
			style: {
				fontFamily: resolveFont(layer.fontFamily, layer.type === "sfx" ? "sfx" : void 0),
				fontSize: layer.fontSize,
				fontWeight: layer.fontWeight,
				fontStyle: layer.italic ? "italic" : "normal",
				color: layer.color,
				textAlign: layer.align,
				justifyContent: layer.align === "left" ? "flex-start" : layer.align === "right" ? "flex-end" : "center",
				...maskStyle(layer, clip)
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoftMask, { layer }), layer.text]
		}), selected && layer.mask ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskOutline, { mask: layer.mask }) : null]
	});
}
function Stack({ panelId, parentId }) {
	const nodes = childLayers(useProjectStore((s) => s.layers), panelId, parentId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: nodes.map((layer, index) => layer.type === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-layer": layer.id,
		style: {
			position: "absolute",
			inset: 0,
			opacity: layer.visible ? layer.opacity : 0,
			mixBlendMode: layer.blendMode,
			pointerEvents: "none",
			isolation: "isolate",
			zIndex: index + 1
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
			panelId,
			parentId: layer.id
		})
	}, layer.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerVisual, {
		layer,
		stack: index + 1
	}, layer.id)) });
}
function PageSheet({ pageId, mode }) {
	const page = useProjectStore((s) => s.pages.find((p) => p.id === pageId));
	const panels = useProjectStore((s) => s.panels).filter((p) => p.pageId === pageId);
	const selectedPanelId = useProjectStore((s) => s.selectedPanelId);
	const selectedLayerIds = useProjectStore((s) => s.selectedLayerIds);
	const layers = useProjectStore((s) => s.layers);
	const tool = useProjectStore((s) => s.tool);
	const { beginGesture, endGesture, patchLayers, placeAsset, addText, addBubble, addSfx } = useCanvas();
	if (!page) return null;
	const editable = mode === "edit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-sheet",
		"data-mode": mode,
		style: {
			width: page.width,
			height: page.height,
			background: page.background
		},
		children: panels.map((panel) => {
			const active = editable && panel.id === selectedPanelId;
			const selected = layers.filter((l) => selectedLayerIds.includes(l.id) && l.panelId === panel.id);
			const frame = selected.length === 1 ? selected[0] : null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-frame",
				"data-active": active ? "true" : "false",
				style: {
					left: `${panel.x}%`,
					top: `${panel.y}%`,
					width: `${panel.w}%`,
					height: `${panel.h}%`,
					background: panel.fill,
					borderRadius: panel.radius,
					boxShadow: panel.borderWidth ? `inset 0 0 0 ${panel.borderWidth}px ${panel.border}` : void 0
				},
				onDragOver: (e) => {
					if (!editable) return;
					e.preventDefault();
				},
				onDrop: (e) => {
					if (!editable) return;
					e.preventDefault();
					e.stopPropagation();
					const assetId = e.dataTransfer.getData("application/x-atelier-asset");
					const rect = e.currentTarget.getBoundingClientRect();
					const at = {
						x: (e.clientX - rect.left) / rect.width * 100,
						y: (e.clientY - rect.top) / rect.height * 100
					};
					if (assetId) {
						const state = useProjectStore.getState();
						const asset = state.assets.find((item) => item.id === assetId);
						let target = state.layers.filter((layer) => layer.panelId === panel.id && layer.type === "image" && !layer.locked && at.x >= layer.x && at.y >= layer.y && at.x <= layer.x + layer.w && at.y <= layer.y + layer.h).sort((a, b) => b.z - a.z)[0]?.id;
						if (!target && asset?.category === "background") target = state.layers.filter((layer) => {
							if (layer.panelId !== panel.id || layer.type !== "image" || layer.locked) return false;
							return state.assets.find((item) => item.id === layer.assetId)?.category === "background";
						}).sort((a, b) => a.z - b.z)[0]?.id;
						if (target) state.replaceLayerAsset(target, assetId);
						else placeAsset(assetId, panel.id, at);
					}
					const files = [...e.dataTransfer.files];
					if (files.length) import("./importFiles-CLJhzJlI.mjs").then(({ importImageFiles }) => importImageFiles(files, "custom", panel.id, at));
					useProjectStore.getState().selectPanel(panel.id);
				},
				onPointerDown: (e) => {
					if (!editable) return;
					const hit = e.target.closest("[data-layer]");
					if (!hit) {
						const rect = e.currentTarget.getBoundingClientRect();
						const at = {
							x: (e.clientX - rect.left) / rect.width * 100,
							y: (e.clientY - rect.top) / rect.height * 100
						};
						useProjectStore.getState().selectPanel(panel.id);
						if (tool === "text") addText(panel.id, at);
						else if (tool === "bubble") addBubble(panel.id, "classic", "…", at);
						else if (tool === "sfx") addSfx(panel.id, "boom", at);
						return;
					}
					const id = hit.dataset.layer;
					if (!id) return;
					const state = useProjectStore.getState();
					const layer = state.layers.find((l) => l.id === id);
					if (!layer || isEffectivelyLocked(state.layers, layer)) return;
					e.stopPropagation();
					let rootId = id;
					let parent = layer.parentId;
					while (parent) {
						if (state.selectedLayerIds.includes(parent)) {
							rootId = parent;
							break;
						}
						parent = state.layers.find((l) => l.id === parent)?.parentId ?? null;
					}
					if (rootId === id) {
						if (e.shiftKey) state.toggleLayer(id, true);
						else if (!state.selectedLayerIds.includes(id)) state.selectLayers([id]);
					}
					if (tool === "crop") return;
					const ids = useProjectStore.getState().selectedLayerIds;
					beginGesture();
					const origin = {
						x: e.clientX,
						y: e.clientY,
						layers: useProjectStore.getState().layers,
						ids
					};
					const move = (ev) => {
						const rect = e.currentTarget.getBoundingClientRect();
						const dx = (ev.clientX - origin.x) / rect.width * 100;
						const dy = (ev.clientY - origin.y) / rect.height * 100;
						if (Math.hypot(ev.clientX - origin.x, ev.clientY - origin.y) < 2) return;
						const moved = translateLayers(origin.layers, origin.ids, dx, dy);
						if (ev.altKey) {
							patchLayers(moved, "live");
							return;
						}
						const root = moved.find((item) => item.id === ids[0]);
						if (!root) {
							patchLayers(moved, "live");
							return;
						}
						const guidesX = [
							0,
							50,
							100
						];
						const guidesY = [
							0,
							50,
							100
						];
						for (const other of origin.layers) {
							if (other.panelId !== panel.id || ids.includes(other.id)) continue;
							guidesX.push(other.x, other.x + other.w / 2, other.x + other.w);
							guidesY.push(other.y, other.y + other.h / 2, other.y + other.h);
						}
						const snapped = snapPosition(root, guidesX, guidesY);
						const extraX = snapped.x - root.x;
						const extraY = snapped.y - root.y;
						patchLayers(Math.abs(extraX) + Math.abs(extraY) < .01 ? moved : translateLayers(moved, ids, extraX, extraY), "live");
					};
					const up = () => {
						window.removeEventListener("pointermove", move);
						window.removeEventListener("pointerup", up);
						endGesture();
					};
					window.addEventListener("pointermove", move);
					window.addEventListener("pointerup", up);
				},
				onDoubleClick: (e) => {
					const id = e.target.closest("[data-layer]")?.getAttribute("data-layer");
					if (!id || !editable) return;
					const layer = useProjectStore.getState().layers.find((l) => l.id === id);
					if (layer && (layer.type === "text" || layer.type === "bubble" || layer.type === "sfx")) useProjectStore.getState().setEditing(id);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {
						panelId: panel.id,
						parentId: null
					}),
					panel.halftone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "halftone" }) : null,
					editable && frame ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionBox, {
						panelId: panel.id,
						layer: frame
					}) : null
				]
			}, panel.id);
		})
	});
}
function SelectionBox({ panelId, layer }) {
	const ref = (0, import_react.useRef)(null);
	const beginGesture = useProjectStore((s) => s.beginGesture);
	const endGesture = useProjectStore((s) => s.endGesture);
	const patchLayers = useProjectStore((s) => s.patchLayers);
	const cropping = useProjectStore((s) => s.tool === "crop" && layer.type === "image");
	const onHandle = (handle) => (e) => {
		e.stopPropagation();
		e.preventDefault();
		const panel = ref.current?.parentElement;
		if (!panel) return;
		beginGesture();
		const origin = {
			x: e.clientX,
			y: e.clientY,
			layers: useProjectStore.getState().layers,
			box: {
				x: layer.x,
				y: layer.y,
				w: layer.w,
				h: layer.h
			},
			fontSize: layer.fontSize
		};
		const move = (ev) => {
			const rect = panel.getBoundingClientRect();
			const dxPct = (ev.clientX - origin.x) / rect.width * 100;
			const dyPct = (ev.clientY - origin.y) / rect.height * 100;
			if (handle === "rot") {
				const cx = origin.box.x + origin.box.w / 2;
				const cy = origin.box.y + origin.box.h / 2;
				const a0 = Math.atan2(origin.y - (rect.top + cy / 100 * rect.height), origin.x - (rect.left + cx / 100 * rect.width));
				const a1 = Math.atan2(ev.clientY - (rect.top + cy / 100 * rect.height), ev.clientX - (rect.left + cx / 100 * rect.width));
				const rotation = layer.rotation + (a1 - a0) * 180 / Math.PI;
				patchLayers(origin.layers.map((l) => l.id === layer.id ? {
					...l,
					rotation
				} : l), "live");
				return;
			}
			const local = localDelta(dxPct, dyPct, rect.width, rect.height, layer.rotation);
			const aspect = origin.box.h === 0 ? 1 : origin.box.w / origin.box.h;
			const box = resizeBox(origin.box, handle, local.dx, local.dy, ev.shiftKey, aspect);
			const scale = origin.box.h ? box.h / origin.box.h : 1;
			if (layer.type === "group") {
				const sx = box.w / origin.box.w;
				const sy = box.h / origin.box.h;
				const kids = new Set(origin.layers.filter((l) => l.parentId === layer.id).map((l) => l.id));
				let grew = true;
				while (grew) {
					grew = false;
					for (const item of origin.layers) if (item.parentId && kids.has(item.parentId) && !kids.has(item.id)) {
						kids.add(item.id);
						grew = true;
					}
				}
				patchLayers(origin.layers.map((l) => {
					if (l.id === layer.id) return {
						...l,
						...box
					};
					if (!kids.has(l.id)) return l;
					return {
						...l,
						x: box.x + (l.x - origin.box.x) * sx,
						y: box.y + (l.y - origin.box.y) * sy,
						w: Math.max(1, l.w * sx),
						h: Math.max(1, l.h * sy)
					};
				}), "live");
				return;
			}
			patchLayers(origin.layers.map((l) => l.id === layer.id ? {
				...l,
				...box,
				fontSize: l.type === "image" || l.type === "group" ? l.fontSize : Math.max(8, Math.round(origin.fontSize * scale))
			} : l), "live");
		};
		const up = () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
			endGesture();
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
	};
	const dragFraction = (apply) => (e) => {
		e.stopPropagation();
		e.preventDefault();
		const panel = ref.current?.parentElement;
		if (!panel) return;
		beginGesture();
		const origin = {
			x: e.clientX,
			y: e.clientY
		};
		const move = (ev) => {
			const rect = panel.getBoundingClientRect();
			const local = localDelta((ev.clientX - origin.x) / rect.width * 100, (ev.clientY - origin.y) / rect.height * 100, rect.width, rect.height, layer.rotation);
			apply(local.dx / Math.max(1, layer.w), local.dy / Math.max(1, layer.h));
		};
		const up = () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
			endGesture();
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
	};
	const write = (partial, mode) => {
		patchLayers(useProjectStore.getState().layers.map((item) => item.id === layer.id ? {
			...item,
			...partial
		} : item), mode);
	};
	const pos = {
		nw: {
			left: "0%",
			top: "0%"
		},
		n: {
			left: "50%",
			top: "0%"
		},
		ne: {
			left: "100%",
			top: "0%"
		},
		e: {
			left: "100%",
			top: "50%"
		},
		se: {
			left: "100%",
			top: "100%"
		},
		s: {
			left: "50%",
			top: "100%"
		},
		sw: {
			left: "0%",
			top: "100%"
		},
		w: {
			left: "0%",
			top: "50%"
		}
	};
	const tailed = layer.type === "bubble" && [
		"classic",
		"double",
		"square",
		"rounded",
		"tech",
		"thought"
	].includes(layer.bubbleStyle);
	const tailX = layer.tailX ?? (layer.bubbleStyle === "thought" ? 22 : 50);
	const tailY = layer.tailY ?? (layer.bubbleStyle === "thought" ? 86 : 100);
	const mask = layer.mask;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "sel-frame",
		"data-panel": panelId,
		style: {
			left: `${layer.x}%`,
			top: `${layer.y}%`,
			width: `${layer.w}%`,
			height: `${layer.h}%`,
			transform: `rotate(${layer.rotation}deg)`
		},
		children: cropping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "crop-frame",
			style: {
				left: `${layer.crop.x * 100}%`,
				top: `${layer.crop.y * 100}%`,
				width: `${layer.crop.w * 100}%`,
				height: `${layer.crop.h * 100}%`
			},
			onPointerDown: dragFraction((dx, dy) => {
				const crop = layer.crop;
				write({ crop: {
					...crop,
					x: Math.min(1 - crop.w, Math.max(0, crop.x + dx)),
					y: Math.min(1 - crop.h, Math.max(0, crop.y + dy))
				} }, "live");
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: "handle",
				style: {
					left: "100%",
					top: "100%"
				},
				onPointerDown: dragFraction((dx, dy) => {
					const crop = layer.crop;
					write({ crop: {
						...crop,
						w: Math.min(1 - crop.x, Math.max(.08, crop.w + dx)),
						h: Math.min(1 - crop.y, Math.max(.08, crop.h + dy))
					} }, "live");
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			HANDLES.map((handle) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: "handle",
				style: pos[handle],
				onPointerDown: onHandle(handle)
			}, handle)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: "handle handle-rot",
				style: {
					left: "50%",
					top: "-16px"
				},
				onPointerDown: onHandle("rot")
			}),
			mask && mask.type !== "free" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mask-frame",
				"data-round": mask.type === "ellipse" ? "true" : "false",
				style: {
					left: `${mask.x * 100}%`,
					top: `${mask.y * 100}%`,
					width: `${mask.w * 100}%`,
					height: `${mask.h * 100}%`
				},
				onPointerDown: dragFraction((dx, dy) => {
					write({ mask: {
						...mask,
						x: Math.min(1 - mask.w, Math.max(0, mask.x + dx)),
						y: Math.min(1 - mask.h, Math.max(0, mask.y + dy))
					} }, "live");
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
					className: "handle",
					style: {
						left: "100%",
						top: "100%"
					},
					onPointerDown: dragFraction((dx, dy) => {
						write({ mask: {
							...mask,
							w: Math.min(1 - mask.x, Math.max(.05, mask.w + dx)),
							h: Math.min(1 - mask.y, Math.max(.05, mask.h + dy))
						} }, "live");
					})
				})
			}) : null,
			mask?.type === "free" ? (mask.points ?? []).map((point, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: "handle",
				style: {
					left: `${point.x * 100}%`,
					top: `${point.y * 100}%`
				},
				onPointerDown: dragFraction((dx, dy) => {
					const points = (mask.points ?? []).map((p, i) => i === index ? {
						x: Math.min(1, Math.max(0, p.x + dx)),
						y: Math.min(1, Math.max(0, p.y + dy))
					} : p);
					write({ mask: {
						...mask,
						points
					} }, "live");
				})
			}, index)) : null,
			tailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: "handle handle-tail",
				title: "Pointer la queue",
				style: {
					left: `${tailX}%`,
					top: `${tailY}%`
				},
				onPointerDown: dragFraction((dx, dy) => {
					const nextX = Math.min(140, Math.max(-20, tailX + dx * 100));
					const nextY = Math.min(140, Math.max(-20, tailY + dy * 100));
					write({
						tailX: nextX,
						tailY: nextY,
						tailLen: Math.min(2.8, Math.max(.35, Math.hypot(nextX - 50, nextY - 74) / 32))
					}, "live");
				})
			}) : null
		] })
	});
}
function ComicCanvas() {
	const pageId = useProjectStore((s) => s.selectedPageId);
	const page = useProjectStore((s) => s.pages.find((p) => p.id === pageId));
	const zoom = useProjectStore((s) => s.zoom);
	const setZoom = useProjectStore((s) => s.setZoom);
	const scroller = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el) return;
		const onWheel = (e) => {
			if (!e.ctrlKey && !e.metaKey) return;
			e.preventDefault();
			const current = useProjectStore.getState().zoom;
			setZoom(Math.max(.15, Math.min(2.6, current * (e.deltaY > 0 ? .94 : 1.06))));
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, [setZoom]);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el || !page) return;
		const fit = Math.min((el.clientWidth - 48) / page.width, (el.clientHeight - 48) / page.height);
		if (Number.isFinite(fit) && fit > 0) setZoom(Math.max(.2, Math.min(fit, 1.25)));
	}, [
		pageId,
		page,
		setZoom
	]);
	if (!page) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "stage-scroll",
		ref: scroller,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "stage-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: page.width * zoom,
					height: page.height * zoom
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: page.width,
						height: page.height,
						transform: `scale(${zoom})`,
						transformOrigin: "top left"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSheet, {
						pageId: page.id,
						mode: "edit"
					})
				})
			})
		})
	});
}
function OverviewModal() {
	const open = useProjectStore((s) => s.overviewOpen);
	const setOpen = useProjectStore((s) => s.setOverview);
	const pages = useProjectStore((s) => s.pages);
	const current = useProjectStore((s) => s.selectedPageId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalFrame, {
		open,
		onOpenChange: setOpen,
		title: "Vue d'ensemble",
		description: "Toutes les planches du projet.",
		wide: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "asset-grid",
			style: { gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" },
			children: pages.map((page, index) => {
				const scale = 150 / page.width;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "thumb",
					"data-on": page.id === current ? "true" : "false",
					onClick: () => {
						useProjectStore.getState().selectPage(page.id);
						setOpen(false);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "thumb-clip",
						style: {
							width: page.width * scale,
							height: page.height * scale
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: page.width,
								height: page.height,
								transform: `scale(${scale})`,
								transformOrigin: "top left"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSheet, {
								pageId: page.id,
								mode: "thumb"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [
						index + 1,
						". ",
						page.name
					] })]
				}, page.id);
			})
		})
	});
}
function useProject() {
	return useProjectStore(useShallow((s) => ({
		meta: s.meta,
		pages: s.pages,
		panels: s.panels,
		selectedPageId: s.selectedPageId,
		selectedPanelId: s.selectedPanelId,
		updateMeta: s.updateMeta,
		updatePage: s.updatePage,
		selectPage: s.selectPage,
		addPage: s.addPage,
		deletePage: s.deletePage,
		duplicatePage: s.duplicatePage,
		saveState: s.saveState
	})));
}
function PagesFilmstrip() {
	const { pages, selectedPageId, selectPage, duplicatePage, deletePage, addPage } = useProject();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "film",
		children: [pages.map((page) => {
			const scale = 72 / page.height;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "thumb",
				"data-on": page.id === selectedPageId ? "true" : "false",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "thumb-clip",
						style: {
							width: page.width * scale,
							height: 72,
							border: 0,
							padding: 0
						},
						onClick: () => selectPage(page.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: page.width,
								height: page.height,
								transform: `scale(${scale})`,
								transformOrigin: "top left"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSheet, {
								pageId: page.id,
								mode: "thumb"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: page.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "tiny",
							"aria-label": "Dupliquer la page",
							onClick: () => duplicatePage(page.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 12 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "tiny",
							"aria-label": "Supprimer la page",
							onClick: () => deletePage(page.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
						})]
					})
				]
			}, page.id);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "btn btn-line",
			onClick: () => addPage("franco"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), " Page"]
		})]
	});
}
function ReaderModal() {
	const open = useProjectStore((s) => s.readerOpen);
	const mode = useProjectStore((s) => s.readerMode);
	const pages = useProjectStore((s) => s.pages);
	const selectedPageId = useProjectStore((s) => s.selectedPageId);
	const setReader = useProjectStore((s) => s.setReader);
	const stageRef = (0, import_react.useRef)(null);
	const [box, setBox] = (0, import_react.useState)({
		w: 1100,
		h: 860
	});
	const [index, setIndex] = (0, import_react.useState)(0);
	const albumPages = (0, import_react.useMemo)(() => pages.filter((p) => !isWebtoonPreset(p.preset)), [pages]);
	const webtoonPages = (0, import_react.useMemo)(() => pages.filter((p) => isWebtoonPreset(p.preset)), [pages]);
	const spread = albumPages.length ? albumPages : pages;
	const strip = webtoonPages.length ? webtoonPages : pages;
	const page = spread[Math.min(index, Math.max(0, spread.length - 1))];
	const wasOpen = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (open && !wasOpen.current) {
			const i = spread.findIndex((p) => p.id === selectedPageId);
			setIndex(i >= 0 ? i : 0);
		}
		wasOpen.current = open;
	}, [
		open,
		selectedPageId,
		spread
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const el = stageRef.current;
		if (!el) return;
		const measure = () => setBox({
			w: el.clientWidth,
			h: el.clientHeight
		});
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, [open, mode]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			const tag = e.target?.tagName;
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
	}, [
		open,
		mode,
		setReader,
		spread.length
	]);
	if (!open) return null;
	const go = (dir) => setIndex((i) => Math.min(spread.length - 1, Math.max(0, i + dir)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "reader",
		role: "dialog",
		"aria-label": "Lecture",
		"data-mode": mode,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reader-bar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reader-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Lecture" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mode === "album" ? page?.name : "Défilement" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "seg reader-seg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": mode === "album" ? "true" : "false",
							onClick: () => setReader(true, "album"),
							children: "Album"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": mode === "webtoon" ? "true" : "false",
							onClick: () => setReader(true, "webtoon"),
							children: "Webtoon"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-accent",
						onClick: () => setReader(false),
						children: "Fermer"
					})
				]
			}),
			mode === "album" && page ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "reader-stage",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "reader-turn",
						disabled: index <= 0,
						onClick: () => go(-1),
						"aria-label": "Planche précédente",
						children: "‹"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "reader-fit",
						ref: stageRef,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlbumPage, {
							page,
							box,
							onSide: (dir) => go(dir)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "reader-turn",
						disabled: index >= spread.length - 1,
						onClick: () => go(1),
						"aria-label": "Planche suivante",
						children: "›"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "reader-webtoon",
				ref: stageRef,
				children: strip.map((p) => {
					const scale = Math.min(1, Math.max(.2, (box.w - 28) / p.width));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "reader-web-page",
						style: {
							width: p.width * scale,
							height: p.height * scale
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: p.width,
								height: p.height,
								transform: `scale(${scale})`,
								transformOrigin: "top left"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSheet, {
								pageId: p.id,
								mode: "read"
							})
						})
					}, p.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "reader-foot",
				children: mode === "album" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reader-dots",
					children: spread.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": i === index ? "true" : "false",
						onClick: () => setIndex(i),
						"aria-label": p.name
					}, p.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					index + 1,
					" / ",
					spread.length,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "flèches pour tourner" })
				] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Défilement vertical" })
			})
		]
	});
}
function AlbumPage({ page, box, onSide }) {
	const scale = Math.max(.05, Math.min((box.w - 8) / page.width, (box.h - 8) / page.height));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "reader-sheet",
		style: {
			width: page.width * scale,
			height: page.height * scale
		},
		onPointerUp: (e) => {
			if (e.button !== 0) return;
			const rect = e.currentTarget.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			if (x < .22) onSide(-1);
			else if (x > .78) onSide(1);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: page.width,
				height: page.height,
				transform: `scale(${scale})`,
				transformOrigin: "top left"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSheet, {
				pageId: page.id,
				mode: "read"
			})
		})
	}, page.id);
}
function ToastSystem() {
	const toasts = useProjectStore((s) => s.toasts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "toast-stack",
		"aria-live": "polite",
		children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "toast",
			children: toast.text
		}, toast.id))
	});
}
function useHistory() {
	return useProjectStore(useShallow((s) => ({
		undo: s.undo,
		redo: s.redo,
		canUndo: s.past.length > 0,
		canRedo: s.future.length > 0
	})));
}
var imageCache = /* @__PURE__ */ new Map();
function loadImage(src) {
	if (!src) return Promise.resolve(null);
	const cached = imageCache.get(src);
	if (cached) return Promise.resolve(cached);
	return new Promise((resolve) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			imageCache.set(src, img);
			resolve(img);
		};
		img.onerror = () => resolve(null);
		img.src = src;
	});
}
function composite(mode) {
	if (mode === "normal") return "source-over";
	return mode;
}
function roundRect(ctx, x, y, w, h, r) {
	const radius = Math.max(0, Math.min(r, w / 2, h / 2));
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.arcTo(x + w, y, x + w, y + h, radius);
	ctx.arcTo(x + w, y + h, x, y + h, radius);
	ctx.arcTo(x, y + h, x, y, radius);
	ctx.arcTo(x, y, x + w, y, radius);
	ctx.closePath();
}
function drawBubble(ctx, layer, x, y, w, h) {
	const preset = bubblePreset(layer.bubbleStyle);
	ctx.fillStyle = preset.fill;
	ctx.strokeStyle = preset.ink;
	ctx.lineWidth = Math.max(2, h * .04);
	const style = layer.bubbleStyle;
	if (style === "shout" || style === "scream" || style === "electric" || style === "boom" || style === "anger") {
		ctx.beginPath();
		const cx = x + w / 2;
		const cy = y + h / 2;
		const spikes = style === "electric" ? 18 : style === "boom" ? 12 : 14;
		for (let i = 0; i < spikes; i += 1) {
			const ang = i / spikes * Math.PI * 2 - Math.PI / 2;
			const rad = i % 2 === 0 ? .52 : .34;
			const px = cx + Math.cos(ang) * w * rad;
			const py = cy + Math.sin(ang) * h * rad;
			if (i === 0) ctx.moveTo(px, py);
			else ctx.lineTo(px, py);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	} else if (style === "narration" || style === "caption" || style === "banner" || style === "note" || style === "radio" || style === "location" || style === "chapter" || style === "glitch") {
		if (style === "chapter" || style === "banner") ctx.fillRect(x, y + h * .16, w, h * .68);
		else if (style === "glitch") {
			ctx.globalAlpha = .45;
			ctx.fillRect(x + 6, y + 8, w - 8, h - 14);
			ctx.globalAlpha = 1;
			ctx.fillRect(x, y + 4, w - 8, h - 14);
			ctx.strokeRect(x, y + 4, w - 8, h - 14);
		} else if (style === "location") {
			ctx.fillRect(x, y + h * .22, w, h * .56);
			ctx.fillStyle = preset.ink;
			ctx.fillRect(x, y + h * .22, 6, h * .56);
			ctx.strokeRect(x, y + h * .22, w, h * .56);
		} else {
			ctx.fillRect(x, y, w, h);
			ctx.strokeRect(x, y, w, h);
			if (style === "radio") ctx.strokeRect(x + 5, y + 5, Math.max(2, w - 10), Math.max(2, h - 10));
		}
	} else if (style === "whisper" || style === "icy" || style === "sleep") {
		ctx.setLineDash([6, 5]);
		ctx.beginPath();
		ctx.ellipse(x + w / 2, y + h / 2, w * .46, h * .4, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
		ctx.setLineDash([]);
	} else if (style === "thought") {
		ctx.beginPath();
		ctx.ellipse(x + w / 2, y + h * .42, w * .42, h * .32, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(x + w * .28, y + h * .82, h * .08, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	} else if (style === "oval" || style === "cloud" || style === "dark") {
		ctx.beginPath();
		ctx.ellipse(x + w / 2, y + h / 2, w * .46, h * .42, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	} else {
		const radius = style === "square" || style === "tech" ? 4 : Math.min(w, h) * (style === "rounded" ? .4 : .28);
		roundRect(ctx, x, y, w, h * (style === "rounded" || style === "classic" || style === "double" || style === "square" || style === "tech" ? .82 : .92), radius);
		ctx.fill();
		ctx.stroke();
		if (style === "double") {
			roundRect(ctx, x + 5, y + 5, w - 10, h * .82 - 10, Math.max(4, radius - 4));
			ctx.stroke();
		}
		if (style === "classic" || style === "double" || style === "square" || style === "rounded" || style === "tech") {
			const tipX = (layer.tailX ?? 28) / 100 * w;
			const tipY = (layer.tailY ?? 100) / 100 * h;
			const len = layer.tailLen ?? 1;
			ctx.beginPath();
			ctx.moveTo(x + tipX - w * .08 * len, y + tipY - h * .24 * len);
			ctx.lineTo(x + tipX, y + tipY);
			ctx.lineTo(x + tipX + w * .14 * len, y + tipY - h * .18 * len);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
	}
	drawLabel(ctx, layer, x + w * .08, y + h * .08, w * .84, h * .66);
}
function drawLabel(ctx, layer, x, y, w, h) {
	ctx.fillStyle = layer.color;
	ctx.textAlign = layer.align;
	ctx.textBaseline = "middle";
	const style = layer.italic ? "italic" : "normal";
	const family = resolveFont(layer.fontFamily, layer.type === "sfx" ? "sfx" : void 0);
	ctx.font = `${style} ${layer.type === "sfx" ? 400 : layer.fontWeight} ${layer.fontSize}px ${family}`;
	const tx = layer.align === "left" ? x : layer.align === "right" ? x + w : x + w / 2;
	const lines = layer.text.split("\n");
	const lineH = layer.fontSize * 1.15;
	const start = y + h / 2 - (lines.length - 1) * lineH / 2;
	if (layer.type === "sfx") {
		ctx.lineWidth = Math.max(3, layer.fontSize * .08);
		ctx.strokeStyle = "#14181e";
		ctx.lineJoin = "round";
		for (let i = 0; i < lines.length; i += 1) {
			ctx.strokeText(lines[i], tx, start + i * lineH);
			ctx.fillText(lines[i], tx, start + i * lineH);
		}
		return;
	}
	for (let i = 0; i < lines.length; i += 1) ctx.fillText(lines[i], tx, start + i * lineH, w);
}
async function drawLayer(ctx, layer, layers, assets, blobUrls, px, py, pw, ph, alphaMul) {
	if (!layer.visible) return;
	if (layer.type === "group") {
		const kids = childLayers(layers, layer.panelId, layer.id);
		for (const kid of kids) await drawLayer(ctx, kid, layers, assets, blobUrls, px, py, pw, ph, alphaMul * layer.opacity);
		return;
	}
	const x = px + layer.x / 100 * pw;
	const y = py + layer.y / 100 * ph;
	const w = layer.w / 100 * pw;
	const h = layer.h / 100 * ph;
	ctx.save();
	ctx.globalAlpha = Math.max(0, Math.min(1, alphaMul * layer.opacity));
	ctx.globalCompositeOperation = composite(layer.blendMode);
	ctx.translate(x + w / 2, y + h / 2);
	ctx.rotate(layer.rotation * Math.PI / 180);
	ctx.scale(layer.flipH ? -1 : 1, layer.flipV ? -1 : 1);
	const feather = layer.mask?.feather ?? 0;
	const soft = feather > 0 && layer.mask;
	ctx.beginPath();
	if (!soft && layer.mask?.type === "ellipse") {
		const m = layer.mask;
		ctx.ellipse(-w / 2 + (m.x + m.w / 2) * w, -h / 2 + (m.y + m.h / 2) * h, Math.max(1, m.w * w / 2), Math.max(1, m.h * h / 2), 0, 0, Math.PI * 2);
		ctx.clip();
	} else if (layer.mask?.type === "free" && layer.mask.points && layer.mask.points.length >= 3 && !soft) {
		const pts = layer.mask.points;
		ctx.moveTo(-w / 2 + pts[0].x * w, -h / 2 + pts[0].y * h);
		for (const p of pts.slice(1)) ctx.lineTo(-w / 2 + p.x * w, -h / 2 + p.y * h);
		ctx.closePath();
		ctx.clip();
	} else if (layer.mask?.type === "rect" && !soft) {
		const m = layer.mask;
		ctx.rect(-w / 2 + m.x * w, -h / 2 + m.y * h, m.w * w, m.h * h);
		ctx.clip();
	}
	if (layer.type === "image" && layer.assetId) {
		const image = await loadImage(resolveSrc(assets.find((a) => a.id === layer.assetId), blobUrls));
		if (image) {
			const crop = layer.crop;
			const sx = crop.x * image.width;
			const sy = crop.y * image.height;
			const sw = Math.max(1, crop.w * image.width);
			const sh = Math.max(1, crop.h * image.height);
			const bright = layer.brightness ?? 1;
			const contrast = layer.contrast ?? 1;
			if (bright !== 1 || contrast !== 1) ctx.filter = `brightness(${bright}) contrast(${contrast})`;
			ctx.drawImage(image, sx, sy, sw, sh, -w / 2, -h / 2, w, h);
			ctx.filter = "none";
			if ((layer.tintAmount ?? 0) > 0) {
				ctx.save();
				ctx.globalCompositeOperation = "color";
				ctx.globalAlpha = Math.max(0, Math.min(1, layer.tintAmount ?? 0));
				ctx.fillStyle = layer.tint || "#ffffff";
				ctx.fillRect(-w / 2, -h / 2, w, h);
				ctx.restore();
			}
		}
	} else if (layer.type === "bubble") drawBubble(ctx, layer, -w / 2, -h / 2, w, h);
	else if (layer.type === "text" || layer.type === "sfx") drawLabel(ctx, layer, -w / 2, -h / 2, w, h);
	if (soft && layer.mask) {
		ctx.save();
		ctx.globalCompositeOperation = "destination-in";
		ctx.filter = `blur(${feather}px)`;
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		const m = layer.mask;
		if (m.type === "ellipse") ctx.ellipse(-w / 2 + (m.x + m.w / 2) * w, -h / 2 + (m.y + m.h / 2) * h, Math.max(1, m.w * w / 2), Math.max(1, m.h * h / 2), 0, 0, Math.PI * 2);
		else if (m.type === "free" && m.points && m.points.length >= 3) {
			ctx.moveTo(-w / 2 + m.points[0].x * w, -h / 2 + m.points[0].y * h);
			for (const p of m.points.slice(1)) ctx.lineTo(-w / 2 + p.x * w, -h / 2 + p.y * h);
			ctx.closePath();
		} else ctx.rect(-w / 2 + m.x * w, -h / 2 + m.y * h, m.w * w, m.h * h);
		ctx.fill();
		ctx.restore();
	}
	ctx.restore();
}
async function renderPage(page, panels, layers, assets, blobUrls, scale = 2) {
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(page.width * scale);
	canvas.height = Math.round(page.height * scale);
	const ctx = canvas.getContext("2d");
	if (!ctx) return canvas;
	ctx.scale(scale, scale);
	ctx.fillStyle = page.background;
	ctx.fillRect(0, 0, page.width, page.height);
	const pagePanels = panels.filter((p) => p.pageId === page.id);
	for (const panel of pagePanels) {
		const px = panel.x / 100 * page.width;
		const py = panel.y / 100 * page.height;
		const pw = panel.w / 100 * page.width;
		const ph = panel.h / 100 * page.height;
		ctx.save();
		roundRect(ctx, px, py, pw, ph, panel.radius);
		ctx.fillStyle = panel.fill;
		ctx.fill();
		ctx.clip();
		const roots = childLayers(layers, panel.id, null);
		for (const layer of roots) await drawLayer(ctx, layer, layers, assets, blobUrls, px, py, pw, ph, 1);
		if (panel.halftone) {
			ctx.globalAlpha = .22;
			ctx.globalCompositeOperation = "multiply";
			ctx.fillStyle = "#1a1e24";
			for (let y = 0; y < ph; y += 5) for (let x = 0; x < pw; x += 5) {
				ctx.beginPath();
				ctx.arc(px + x, py + y, .7, 0, Math.PI * 2);
				ctx.fill();
			}
		}
		ctx.restore();
		if (panel.borderWidth > 0) {
			ctx.save();
			ctx.strokeStyle = panel.border;
			ctx.lineWidth = panel.borderWidth;
			roundRect(ctx, px, py, pw, ph, panel.radius);
			ctx.stroke();
			ctx.restore();
		}
	}
	return canvas;
}
function canvasToBlob(canvas, type) {
	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => blob ? resolve(blob) : reject(/* @__PURE__ */ new Error("export")), type, .92);
	});
}
var STORAGE_KEY = "atelier-bd-pro-v1";
function toProjectFile(meta, pages, panels, layers, assets, selectedPageId) {
	const characters = /* @__PURE__ */ new Map();
	for (const asset of assets) {
		if (asset.category !== "character" || !asset.characterKey) continue;
		if (!characters.has(asset.characterKey)) characters.set(asset.characterKey, {
			key: asset.characterKey,
			name: asset.name,
			description: asset.description
		});
	}
	return {
		version: 1,
		project: meta,
		pages,
		panels,
		layers,
		assets,
		characters: [...characters.values()],
		modelSheets: assets.filter((a) => a.category === "modelsheet"),
		palettes: [],
		selectedPageId
	};
}
async function embedAssets(assets) {
	const out = [];
	for (const asset of assets) if (asset.src.startsWith("idb:")) {
		const data = await idbGet(asset.src.slice(4));
		out.push({
			...asset,
			src: data ?? ""
		});
	} else out.push(asset);
	return out;
}
async function materializeAssets(assets) {
	const blobUrls = {};
	const next = [];
	for (const asset of assets) if (asset.src.startsWith("data:")) {
		const id = asset.id || uid("asset");
		await idbSet(id, asset.src);
		blobUrls[id] = asset.src;
		next.push({
			...asset,
			id,
			src: `idb:${id}`
		});
	} else if (asset.src.startsWith("idb:")) {
		const key = asset.src.slice(4);
		const data = await idbGet(key);
		if (data) blobUrls[key] = data;
		next.push(asset);
	} else next.push(asset);
	return {
		assets: next,
		blobUrls
	};
}
function parseProjectFile(raw) {
	if (!raw || typeof raw !== "object") return null;
	const data = raw;
	if (!Array.isArray(data.pages) || !Array.isArray(data.panels) || !Array.isArray(data.layers)) return null;
	const assets = Array.isArray(data.assets) ? data.assets : DEMO_ASSETS;
	const project = data.project;
	if (!project || typeof project !== "object" || !project.title) return null;
	return {
		version: 1,
		project: {
			id: project.id || uid("projet"),
			title: project.title,
			subtitle: project.subtitle || "",
			author: project.author || "",
			updatedAt: project.updatedAt || Date.now()
		},
		pages: data.pages,
		panels: data.panels,
		layers: data.layers,
		assets,
		characters: data.characters ?? [],
		modelSheets: data.modelSheets ?? [],
		palettes: data.palettes ?? [],
		selectedPageId: data.selectedPageId || data.pages[0]?.id || ""
	};
}
function downloadText(filename, text, mime = "application/json") {
	const blob = new Blob([text], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function downloadBlob(filename, blob) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function TopBar() {
	const { meta, updateMeta, saveState, addPage } = useProject();
	const { undo, redo, canUndo, canRedo } = useHistory();
	const fileRef = (0, import_react.useRef)(null);
	const libraryOpen = useProjectStore((s) => s.libraryOpen);
	const exportPages = async (kind, all) => {
		const s = useProjectStore.getState();
		const pages = all ? s.pages : s.pages.filter((p) => p.id === s.selectedPageId);
		const canvases = [];
		for (const page of pages) canvases.push(await renderPage(page, s.panels, s.layers, s.assets, s.blobUrls, 2));
		if (!canvases.length || !canvases[0]) return;
		const width = Math.max(...canvases.map((c) => c.width));
		const gap = all ? 24 : 0;
		const height = canvases.reduce((sum, c) => sum + c.height, 0) + gap * (canvases.length - 1);
		const sheet = document.createElement("canvas");
		sheet.width = width;
		sheet.height = height;
		const ctx = sheet.getContext("2d");
		if (!ctx) return;
		ctx.fillStyle = "#efe6d6";
		ctx.fillRect(0, 0, width, height);
		let y = 0;
		for (const canvas of canvases) {
			ctx.drawImage(canvas, 0, y);
			y += canvas.height + gap;
		}
		const blob = await canvasToBlob(sheet, kind === "png" ? "image/png" : "image/jpeg");
		downloadBlob(`${slugify(s.meta.title)}${all ? "-planches" : ""}.${kind === "png" ? "png" : "jpg"}`, blob);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "topbar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand-mark",
					"aria-hidden": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand-name",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ATELIER" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "BD PRO" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vdiv" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "title-input",
				"aria-label": "Titre du projet",
				value: meta.title,
				onChange: (e) => updateMeta({ title: e.target.value })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hint",
				children: meta.subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vdiv" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "icon-btn",
				"aria-label": "Annuler",
				disabled: !canUndo,
				onClick: () => undo(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { size: 15 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "icon-btn",
				"aria-label": "Rétablir",
				disabled: !canRedo,
				onClick: () => redo(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { size: 15 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
				className: "btn btn-line",
				children: "Nouvelle page"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
				className: "menu-pop",
				align: "start",
				children: PRESET_FAMILIES.map((family) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
					className: "menu-label",
					children: family
				}), PAGE_PRESETS.filter((preset) => preset.family === family).map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
					className: "menu-item",
					onSelect: () => addPage(preset.id),
					children: preset.name
				}, preset.id))] }, family))
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-line",
				onClick: () => useProjectStore.getState().setLibraryOpen(!libraryOpen),
				children: "Bibliothèque"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "top-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "save-pill",
						"data-dirty": saveState === "dirty" ? "true" : "false",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: saveState === "dirty" ? "Modifications" : "Enregistré" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => useProjectStore.getState().setReader(true, "album"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 14 }), " Lecture"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => useProjectStore.getState().setOverview(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 14 }), " Ensemble"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root2, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger, {
						className: "btn btn-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageDown, { size: 14 }), " Exporter"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content2, {
						className: "menu-pop",
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
								className: "menu-item",
								onSelect: () => void exportPages("png", false),
								children: "PNG — page"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
								className: "menu-item",
								onSelect: () => void exportPages("jpeg", false),
								children: "JPEG — page"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
								className: "menu-item",
								onSelect: () => void exportPages("png", true),
								children: "PNG — toutes les pages"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
								className: "menu-item",
								onSelect: () => {
									(async () => {
										const s = useProjectStore.getState();
										const assets = await embedAssets(s.assets);
										const file = toProjectFile(s.meta, s.pages, s.panels, s.layers, assets, s.selectedPageId);
										downloadText(`${slugify(s.meta.title)}.json`, JSON.stringify(file, null, 2));
									})();
								},
								children: "JSON — projet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
								className: "menu-item",
								onSelect: () => fileRef.current?.click(),
								children: "Importer JSON"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
								className: "menu-item",
								onSelect: () => {
									if (confirm("Recharger le projet exemple ?")) useProjectStore.getState().resetDemo();
								},
								children: "Exemple — Le Secret de l'Île"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
								className: "menu-item",
								onSelect: () => {
									if (confirm("Créer un projet vide ?")) useProjectStore.getState().newBlank();
								},
								children: "Nouveau projet"
							})
						]
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						hidden: true,
						type: "file",
						accept: "application/json",
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							file.text().then(async (text) => {
								const parsed = parseProjectFile(JSON.parse(text));
								if (!parsed) {
									useProjectStore.getState().toast("Fichier projet illisible.");
									return;
								}
								const materialized = await materializeAssets(parsed.assets);
								useProjectStore.getState().loadFile({
									...parsed,
									assets: materialized.assets
								}, materialized.blobUrls);
							});
							e.target.value = "";
						}
					})
				]
			})
		]
	});
}
function Thumb({ asset, cover }) {
	const src = useAssetUrl(asset.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cover ? "checker-wide" : "checker",
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: asset.name,
			draggable: false
		}) : null
	});
}
function AssetCard({ asset }) {
	const updateAsset = useProjectStore((s) => s.updateAsset);
	const removeAsset = useProjectStore((s) => s.removeAsset);
	const place = useProjectStore((s) => s.placeAsset);
	const panelId = useProjectStore((s) => s.selectedPanelId);
	const cover = asset.category === "background" || asset.category === "photo" || asset.category === "modelsheet";
	const gesture = (0, import_react.useRef)({
		x: 0,
		y: 0,
		dragged: false,
		placed: false
	});
	const placeHere = () => {
		if (gesture.current.placed) return;
		gesture.current.placed = true;
		window.setTimeout(() => {
			gesture.current.placed = false;
		}, 50);
		if (!panelId) {
			useProjectStore.getState().toast("Sélectionnez une case.");
			return;
		}
		place(asset.id, panelId);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "asset-card",
		draggable: true,
		onPointerDown: (e) => {
			if (e.target.closest(".star")) return;
			gesture.current = {
				x: e.clientX,
				y: e.clientY,
				dragged: false,
				placed: false
			};
		},
		onDragStart: (e) => {
			gesture.current.dragged = true;
			e.dataTransfer.setData("application/x-atelier-asset", asset.id);
			e.dataTransfer.effectAllowed = "copy";
		},
		onDragEnd: (e) => {
			if (Math.hypot(e.clientX - gesture.current.x, e.clientY - gesture.current.y) < 8) placeHere();
		},
		onClick: (e) => {
			if (e.target.closest(".star")) return;
			if (gesture.current.dragged && Math.hypot(e.clientX - gesture.current.x, e.clientY - gesture.current.y) >= 8) return;
			placeHere();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, {
				asset,
				cover
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-meta",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						title: asset.description || asset.name,
						children: asset.viewLabel ? `${asset.viewLabel}` : asset.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "star",
						"data-on": asset.favorite ? "true" : "false",
						"aria-label": "Favori",
						onClick: () => updateAsset(asset.id, { favorite: !asset.favorite }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							size: 13,
							fill: asset.favorite ? "currentColor" : "none"
						})
					}),
					asset.source !== "demo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "star",
						"aria-label": "Supprimer",
						onClick: () => removeAsset(asset.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 })
					}) : null
				]
			}),
			asset.tags.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-tags",
				children: asset.tags.slice(0, 2).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tag }, tag))
			}) : null
		]
	});
}
function AssetBrowser({ category }) {
	const { assets, libraryCategory, libraryQuery, favoritesOnly, libraryTag } = useAssets();
	const raw = category ?? libraryCategory;
	const cat = raw === "layout" || raw === "bubble" || raw === "sfx" ? "all" : raw;
	const filtered = filterAssets(assets, cat, libraryQuery, favoritesOnly, libraryTag ?? "");
	if (!filtered.length) {
		if (cat === "all") return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "hint",
			children: "Aucun asset. Importez une image ou changez la recherche."
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "asset-grid",
		children: filtered.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetCard, { asset }, asset.id))
	});
}
function BackgroundLibrary() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetBrowser, { category: "background" });
}
function CharacterLibrary() {
	const { assets, libraryQuery, libraryTag } = useAssets();
	const q = libraryQuery.trim().toLowerCase();
	const groups = groupCharacters(assets).filter((group) => {
		if (libraryTag && !group.views.some((view) => view.tags.includes(libraryTag))) return false;
		if (!q) return true;
		return `${group.name} ${group.description} ${group.views.flatMap((view) => view.tags).join(" ")}`.toLowerCase().includes(q);
	});
	if (!groups.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "hint",
		children: "Aucun personnage dans le projet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "char-block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: group.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: group.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "char-views",
				children: group.views.map((view) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { width: 92 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetCard, { asset: view })
				}, view.id))
			}),
			group.sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-line",
				style: { marginTop: 8 },
				onClick: () => {
					const panel = useProjectStore.getState().selectedPanelId;
					if (!panel || !group.sheet) return;
					useProjectStore.getState().placeAsset(group.sheet.id, panel);
				},
				children: "Poser le model sheet"
			}) : null
		]
	}, group.key)) });
}
function EffectsLibrary() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "hint",
		children: "Les effets se posent en mode Screen pour laisser passer le décor."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetBrowser, { category: "effect" })] });
}
function ModelSheetLibrary() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "hint",
		children: "Feuilles de référence. Glissez une vue dans une case — l'original reste dans la bibliothèque."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetBrowser, { category: "modelsheet" })] });
}
function PhotoLibrary() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "hint",
		children: "Photos de décor, texture ou référence. Recadrage et masque non destructifs."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetBrowser, { category: "photo" })] });
}
var SPIKES = {
	shout: {
		fill: "#fff4e4",
		stroke: "#1c2128",
		points: "100,4 118,28 148,10 142,40 176,36 154,58 196,70 150,78 168,108 128,90 112,116 96,88 60,112 72,82 28,96 52,70 8,62 48,50 22,24 62,36 78,8"
	},
	scream: {
		fill: "#ffe4e1",
		stroke: "#7a1d1d",
		points: "100,2 122,26 154,6 146,38 186,28 158,52 198,68 152,74 176,112 124,86 108,118 90,86 48,116 64,80 18,98 46,66 4,58 42,46 16,20 58,32 74,4"
	},
	electric: {
		fill: "#e5fbff",
		stroke: "#0e4a5c",
		points: "100,2 114,34 146,14 132,46 178,40 150,62 196,78 148,82 168,116 118,88 104,118 88,86 46,114 70,78 22,92 48,64 6,54 44,44 24,18 64,30 80,4"
	},
	boom: {
		fill: "#fff1d6",
		stroke: "#1c2128",
		points: "100,8 112,36 140,22 128,48 164,48 136,64 168,84 132,84 140,112 108,90 100,116 88,90 56,112 66,84 30,86 58,66 28,48 64,50 52,24 84,38"
	},
	anger: {
		fill: "#ffd9d4",
		stroke: "#7a1d1d",
		points: "100,0 126,22 160,4 148,36 196,30 160,54 198,78 152,78 170,118 116,88 100,120 82,88 28,118 48,78 2,76 40,54 6,28 52,36 42,4 74,22"
	}
};
function BubbleShape({ style }) {
	const spike = SPIKES[style];
	if (spike) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "bubble-svg",
		viewBox: "0 0 200 120",
		preserveAspectRatio: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			fill: spike.fill,
			stroke: spike.stroke,
			strokeWidth: "3",
			vectorEffect: "non-scaling-stroke",
			points: spike.points
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `bubble-skin ${style}`,
		"aria-hidden": true
	});
}
function match(query, ...parts) {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	return parts.some((part) => part.toLowerCase().includes(q));
}
function placeBubble(preset) {
	const panel = useProjectStore.getState().selectedPanelId;
	if (!panel) {
		useProjectStore.getState().toast("Sélectionnez une case.");
		return;
	}
	useProjectStore.getState().addBubble(panel, preset.style, preset.sample);
}
function placeSfx(preset) {
	const panel = useProjectStore.getState().selectedPanelId;
	if (!panel) {
		useProjectStore.getState().toast("Sélectionnez une case.");
		return;
	}
	useProjectStore.getState().addSfx(panel, preset.id);
}
function BubbleCard({ preset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "preset-card",
		onClick: () => placeBubble(preset),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "preset-stage",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "preset-bubble",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "bubble-wrap",
						"data-style": preset.style,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BubbleShape, { style: preset.style }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bubble-text",
							style: {
								color: preset.ink,
								fontFamily: resolveFont(preset.fontFamily),
								fontStyle: preset.italic ? "italic" : "normal",
								fontWeight: preset.weight ?? 500,
								fontSize: 11
							},
							children: preset.sample
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: preset.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: preset.group })
		]
	});
}
function SfxCard({ preset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "preset-card",
		onClick: () => placeSfx(preset),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "preset-stage sfx-stage",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						color: preset.color,
						transform: `rotate(${preset.rotation}deg)`,
						fontSize: Math.min(26, preset.fontSize * .62)
					},
					children: preset.text
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: preset.text }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: preset.group })
		]
	});
}
function LayoutCard({ info }) {
	const boxes = layoutBoxes(info.id);
	const ratio = info.width / info.height;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "preset-card",
		onClick: () => {
			useProjectStore.getState().addPage(info.id);
			useProjectStore.getState().toast(`Planche « ${info.name} » ajoutée.`);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "preset-stage layout-stage",
				"data-night": isWebtoonPreset(info.id) ? "true" : "false",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "layout-thumb",
					style: { aspectRatio: `${Math.max(.35, Math.min(ratio, 2.4))}` },
					children: boxes.map((box, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: {
						left: `${box.x}%`,
						top: `${box.y}%`,
						width: `${box.w}%`,
						height: `${box.h}%`
					} }, `${info.id}-${index}`))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: info.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: info.blurb })
		]
	});
}
function Shelf({ title, action, onAction, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "shelf",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shelf-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }), action && onAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "shelf-more",
				onClick: onAction,
				children: action
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shelf-row",
			children
		})]
	});
}
function PresetShelves({ query }) {
	const setCategory = useProjectStore((s) => s.setLibraryCategory);
	const layouts = PAGE_PRESETS.filter((p) => match(query, p.name, p.blurb, p.family));
	const bubbles = BUBBLE_PRESETS.filter((p) => match(query, p.name, p.sample, p.group));
	const sfx = SFX_PRESETS.filter((p) => match(query, p.text, p.group));
	if (!layouts.length && !bubbles.length && !sfx.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "shelves",
		children: [
			layouts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shelf, {
				title: "Gabarits",
				action: "Tout voir",
				onAction: () => setCategory("layout"),
				children: layouts.slice(0, 12).map((info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutCard, { info }, info.id))
			}) : null,
			bubbles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shelf, {
				title: "Bulles",
				action: "Tout voir",
				onAction: () => setCategory("bubble"),
				children: bubbles.slice(0, 12).map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BubbleCard, { preset }, preset.style))
			}) : null,
			sfx.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shelf, {
				title: "Onomatopées",
				action: "Tout voir",
				onAction: () => setCategory("sfx"),
				children: sfx.slice(0, 8).map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SfxCard, { preset }, preset.id))
			}) : null
		]
	});
}
function LayoutPresets({ query }) {
	const items = PAGE_PRESETS.filter((p) => match(query, p.name, p.blurb, p.family));
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "hint",
		children: "Aucun gabarit pour cette recherche."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "preset-groups",
		children: PRESET_FAMILIES.map((family) => {
			const group = items.filter((p) => p.family === family);
			if (!group.length) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shelf-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: family })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "preset-grid",
				children: group.map((info) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutCard, { info }, info.id))
			})] }, family);
		})
	});
}
function BubblePresets({ query }) {
	const items = BUBBLE_PRESETS.filter((p) => match(query, p.name, p.sample, p.group));
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "hint",
		children: "Aucune bulle pour cette recherche."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "preset-groups",
		children: BUBBLE_GROUPS.map((group) => {
			const rows = items.filter((p) => p.group === group);
			if (!rows.length) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shelf-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: group })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "preset-grid",
				children: rows.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BubbleCard, { preset }, preset.style))
			})] }, group);
		})
	});
}
function SfxPresets({ query }) {
	const items = SFX_PRESETS.filter((p) => match(query, p.text, p.group));
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "hint",
		children: "Aucune onomatopée pour cette recherche."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "preset-groups",
		children: SFX_GROUPS.map((group) => {
			const rows = items.filter((p) => p.group === group);
			if (!rows.length) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shelf-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: group })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "preset-grid",
				children: rows.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SfxCard, { preset }, preset.id))
			})] }, group);
		})
	});
}
var CATS = [
	{
		id: "all",
		label: "Tous"
	},
	{
		id: "layout",
		label: "Gabarits"
	},
	{
		id: "bubble",
		label: "Bulles"
	},
	{
		id: "sfx",
		label: "Onomatopées"
	},
	{
		id: "character",
		label: CATEGORY_LABEL.character
	},
	{
		id: "modelsheet",
		label: CATEGORY_LABEL.modelsheet
	},
	{
		id: "background",
		label: CATEGORY_LABEL.background
	},
	{
		id: "photo",
		label: CATEGORY_LABEL.photo
	},
	{
		id: "object",
		label: CATEGORY_LABEL.object
	},
	{
		id: "vehicle",
		label: CATEGORY_LABEL.vehicle
	},
	{
		id: "effect",
		label: CATEGORY_LABEL.effect
	},
	{
		id: "texture",
		label: CATEGORY_LABEL.texture
	},
	{
		id: "custom",
		label: CATEGORY_LABEL.custom
	}
];
function AssetLibrary() {
	const { libraryCategory, libraryQuery, favoritesOnly, libraryTag, recentAssetIds, assets, setLibraryCategory, setLibraryQuery, setFavoritesOnly, setLibraryTag } = useAssets();
	const placeholder = libraryCategory === "character" ? "Rechercher un personnage..." : libraryCategory === "background" ? "Rechercher un décor..." : libraryCategory === "layout" ? "Rechercher un gabarit..." : libraryCategory === "bubble" ? "Rechercher une bulle..." : libraryCategory === "sfx" ? "Rechercher une onomatopée..." : "Rechercher un asset...";
	const imageCategory = libraryCategory === "all" || libraryCategory === "object" || libraryCategory === "vehicle" || libraryCategory === "texture" || libraryCategory === "custom";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "library",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pane-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pane-kicker",
					children: "Médiathèque"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pane-title",
					children: "Bibliothèque"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-accent",
					onClick: () => useProjectStore.getState().setImportOpen(true),
					children: "Importer"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: libraryQuery,
					placeholder,
					onChange: (e) => setLibraryQuery(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chips",
				children: [CATS.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "chip",
					"data-on": libraryCategory === cat.id ? "true" : "false",
					onClick: () => setLibraryCategory(cat.id),
					children: cat.label
				}, cat.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "chip",
					"data-on": favoritesOnly ? "true" : "false",
					onClick: () => setFavoritesOnly(!favoritesOnly),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { size: 11 }), " Favoris"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tag-row",
				children: [...new Set(assets.flatMap((asset) => asset.tags))].slice(0, 16).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "chip",
					"data-on": libraryTag === tag ? "true" : "false",
					onClick: () => setLibraryTag(libraryTag === tag ? null : tag),
					children: tag
				}, tag))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "asset-scroll",
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => {
					if (!e.dataTransfer.files.length) return;
					e.preventDefault();
					const cat = libraryCategory === "all" || libraryCategory === "bubble" || libraryCategory === "sfx" || libraryCategory === "layout" ? "custom" : libraryCategory;
					importImageFiles([...e.dataTransfer.files], cat);
				},
				children: [
					libraryCategory === "all" && !favoritesOnly && !libraryQuery && !libraryTag && recentAssetIds.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shelves",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shelf-head",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Récents" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "asset-grid",
							children: recentAssetIds.map((id) => assets.find((asset) => asset.id === id)).filter((asset) => asset != null).map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetCard, { asset }, asset.id))
						})]
					}) : null,
					libraryCategory === "all" && !favoritesOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetShelves, { query: libraryQuery }) : null,
					libraryCategory === "layout" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutPresets, { query: libraryQuery }) : null,
					libraryCategory === "bubble" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BubblePresets, { query: libraryQuery }) : null,
					libraryCategory === "sfx" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SfxPresets, { query: libraryQuery }) : null,
					libraryCategory === "character" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterLibrary, {}) : null,
					libraryCategory === "modelsheet" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSheetLibrary, {}) : null,
					libraryCategory === "background" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundLibrary, {}) : null,
					libraryCategory === "photo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoLibrary, {}) : null,
					libraryCategory === "effect" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EffectsLibrary, {}) : null,
					imageCategory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetBrowser, {}) : null
				]
			})
		]
	});
}
function CanvasToolbar() {
	const zoom = useProjectStore((s) => s.zoom);
	const setZoom = useProjectStore((s) => s.setZoom);
	const split = useProjectStore((s) => s.splitPanel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pane-head",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pane-kicker",
			children: "Planche"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row-actions",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => split("h"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rows2, { size: 14 }), " Scinder H"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => split("v"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns2, { size: 14 }), " Scinder V"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					style: { width: 110 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Zoom ",
						Math.round(zoom * 100),
						"%"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 20,
						max: 180,
						value: Math.round(zoom * 100),
						onChange: (e) => setZoom(Number(e.target.value) / 100)
					})]
				})
			]
		})]
	});
}
function CanvasWorkspace() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stage",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasToolbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComicCanvas, {})]
	});
}
function LayerRow({ layer, depth, open, selected, onToggleOpen, onSelect, onToggleVisible, onToggleLock, onDragStart, onDragOver, onDrop, onDragLeave }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "layer-row",
		"data-on": selected ? "true" : "false",
		"data-hidden": !layer.visible ? "true" : "false",
		style: { paddingLeft: depth * 12 },
		onClick: (e) => onSelect(e.shiftKey || e.metaKey || e.ctrlKey),
		onDragOver,
		onDrop,
		onDragLeave,
		role: "button",
		tabIndex: 0,
		onKeyDown: (e) => {
			if (e.key === "Enter") onSelect(false);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "layer-grip",
				draggable: true,
				title: "Glisser pour changer l'ordre",
				"aria-label": "Changer l'ordre",
				onDragStart,
				onClick: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { size: 12 })
			}),
			layer.type === "group" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tiny",
				onClick: (e) => {
					e.stopPropagation();
					onToggleOpen?.();
				},
				"aria-label": open ? "Replier" : "Déplier",
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 12 })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tiny",
				"aria-label": layer.visible ? "Masquer" : "Afficher",
				onClick: (e) => {
					e.stopPropagation();
					onToggleVisible();
				},
				children: layer.visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 13 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 13 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tiny",
				"aria-label": layer.locked ? "Déverrouiller" : "Verrouiller",
				onClick: (e) => {
					e.stopPropagation();
					onToggleLock();
				},
				children: layer.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { size: 12 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerMark, { layer }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "layer-name",
				children: layer.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pane-kicker",
				children: Math.round(layer.opacity * 100)
			})
		]
	});
}
function LayerMark({ layer }) {
	const src = useAssetUrl(layer.type === "image" ? layer.assetId : void 0);
	if (layer.type === "image" && src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		className: "layer-thumb",
		src,
		alt: ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "layer-kind",
		children: KIND[layer.type]
	});
}
var KIND = {
	image: "Img",
	text: "Txt",
	bubble: "Bul",
	sfx: "Sfx",
	group: "Grp"
};
function useLayers() {
	return useProjectStore(useShallow((s) => ({
		layers: s.layers,
		selectedLayerIds: s.selectedLayerIds,
		editingLayerId: s.editingLayerId,
		selectLayers: s.selectLayers,
		toggleLayer: s.toggleLayer,
		updateSelectedLayers: s.updateSelectedLayers,
		renameLayer: s.renameLayer,
		deleteSelected: s.deleteSelected,
		duplicateSelected: s.duplicateSelected,
		reorderSelected: s.reorderSelected,
		groupSelected: s.groupSelected,
		ungroupSelected: s.ungroupSelected,
		setEditing: s.setEditing
	})));
}
function LayersPanel() {
	const panelId = useProjectStore((s) => s.selectedPanelId);
	const { layers, selectedLayerIds, toggleLayer, duplicateSelected, deleteSelected, groupSelected, ungroupSelected, reorderSelected } = useLayers();
	const [closed, setClosed] = (0, import_react.useState)({});
	const [filter, setFilter] = (0, import_react.useState)("all");
	const panelLayers = layers.filter((l) => l.panelId === panelId);
	const imageCount = panelLayers.filter((l) => l.type === "image").length;
	const shown = (layer) => {
		if (filter === "all") return true;
		if (layer.type === "group") return childLayers(panelLayers, panelId ?? "", layer.id).some(shown);
		if (filter === "image") return layer.type === "image";
		if (filter === "bubble") return layer.type === "bubble" || layer.type === "sfx";
		return layer.type === "text";
	};
	const renderBranch = (parentId, depth) => {
		return childLayers(panelLayers, panelId ?? "", parentId).slice().reverse().filter(shown).map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerBranch, {
			layer,
			depth,
			closed,
			setClosed,
			selected: selectedLayerIds.includes(layer.id),
			onSelect: (additive) => toggleLayer(layer.id, additive),
			renderBranch
		}, layer.id));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "inspector-layers",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pane-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pane-kicker",
					children: [
						"Empilement · ",
						imageCount,
						" image",
						imageCount > 1 ? "s" : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pane-title",
					children: "Calques"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn",
							title: "Monter",
							onClick: () => reorderSelected("raise"),
							children: "↑"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn",
							title: "Descendre",
							onClick: () => reorderSelected("lower"),
							children: "↓"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn",
							title: "Grouper",
							onClick: () => groupSelected(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn",
							title: "Dissocier",
							onClick: () => ungroupSelected(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ungroup, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn",
							title: "Dupliquer",
							onClick: () => duplicateSelected(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn",
							title: "Supprimer",
							onClick: () => deleteSelected(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "layer-filters",
				children: [
					["all", "Tous"],
					["image", "Images"],
					["bubble", "Bulles"],
					["text", "Textes"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "chip",
					"data-on": filter === id ? "true" : "false",
					onClick: () => setFilter(id),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "layer-list",
				children: [panelId ? renderBranch(null, 0) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hint",
					children: "Sélectionnez une case."
				}), !panelLayers.length && panelId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hint",
					children: "Case vide. Glissez un asset depuis la bibliothèque."
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prop-block row-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => reorderSelected("front"),
						children: "Premier plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => reorderSelected("back"),
						children: "Arrière-plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => useProjectStore.getState().lockBackgrounds(),
						children: "Cadenas décors"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => {
							const id = uidGroup();
							if (!panelId) return;
							const z = nextZ(useProjectStore.getState().layers, panelId);
							useProjectStore.getState().patchLayers([...useProjectStore.getState().layers, { ...emptyGroup(id, panelId, z) }]);
							useProjectStore.getState().selectLayers([id]);
						},
						children: "+ Groupe"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryList, {})
		]
	});
}
function HistoryList() {
	const pastLabels = useProjectStore((s) => s.pastLabels);
	const futureLabels = useProjectStore((s) => s.futureLabels);
	const undo = useProjectStore((s) => s.undo);
	const redo = useProjectStore((s) => s.redo);
	const jump = useProjectStore((s) => s.jumpHistory);
	const recent = pastLabels.map((label, index) => ({
		label,
		index
	})).slice(-12).reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "prop-block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pane-kicker",
				children: "Historique"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					disabled: !pastLabels.length,
					onClick: () => undo(),
					children: "Annuler"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					disabled: !futureLabels.length,
					onClick: () => redo(),
					children: "Rétablir"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "history-list",
				children: [
					futureLabels.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hint",
						children: [futureLabels.length, " à rétablir"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hint",
						children: "Maintenant"
					}),
					recent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "history-step",
						onClick: () => jump(item.index),
						children: item.label
					}, item.index)),
					!pastLabels.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hint",
						children: "Aucune étape."
					}) : null
				]
			})
		]
	});
}
function LayerBranch({ layer, depth, closed, setClosed, selected, onSelect, renderBranch }) {
	const update = useProjectStore((s) => s.patchLayers);
	const open = !closed[layer.id];
	const place = (event) => event.clientY > event.currentTarget.getBoundingClientRect().top + event.currentTarget.getBoundingClientRect().height / 2 ? "below" : "above";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerRow, {
		layer,
		depth,
		open,
		selected,
		onToggleOpen: () => setClosed({
			...closed,
			[layer.id]: !closed[layer.id]
		}),
		onSelect,
		onToggleVisible: () => update(useProjectStore.getState().layers.map((l) => l.id === layer.id ? {
			...l,
			visible: !l.visible
		} : l)),
		onToggleLock: () => update(useProjectStore.getState().layers.map((l) => l.id === layer.id ? {
			...l,
			locked: !l.locked
		} : l)),
		onDragStart: (event) => {
			event.dataTransfer.setData("application/x-atelier-layer", layer.id);
			event.dataTransfer.effectAllowed = "move";
		},
		onDragOver: (event) => {
			event.preventDefault();
			event.dataTransfer.dropEffect = "move";
			event.currentTarget.dataset.drop = place(event);
		},
		onDragLeave: (event) => {
			delete event.currentTarget.dataset.drop;
		},
		onDrop: (event) => {
			event.preventDefault();
			const from = event.dataTransfer.getData("application/x-atelier-layer");
			const where = place(event);
			delete event.currentTarget.dataset.drop;
			if (from) useProjectStore.getState().moveLayer(from, layer.id, where);
		}
	}), layer.type === "group" && open ? renderBranch(layer.id, depth + 1) : null] });
}
function uidGroup() {
	return `group-${Math.random().toString(36).slice(2, 8)}`;
}
function emptyGroup(id, panelId, z) {
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
		crop: {
			x: 0,
			y: 0,
			w: 1,
			h: 1
		},
		mask: null,
		text: "",
		fontFamily: FONT_UI,
		fontSize: 16,
		fontWeight: 600,
		italic: false,
		color: "#1c2128",
		align: "center",
		bubbleStyle: "classic",
		sfxVariant: "boom"
	};
}
var TOOLS = [
	{
		id: "select",
		label: "Sélection",
		icon: MousePointer2
	},
	{
		id: "move",
		label: "Déplacement",
		icon: Move
	},
	{
		id: "transform",
		label: "Transformation",
		icon: Scaling
	},
	{
		id: "crop",
		label: "Recadrage",
		icon: Crop
	},
	{
		id: "image",
		label: "Image",
		icon: Image$1
	},
	{
		id: "character",
		label: "Personnage",
		icon: User
	},
	{
		id: "background",
		label: "Décor",
		icon: Mountain
	},
	{
		id: "photo",
		label: "Photo",
		icon: Camera
	},
	{
		id: "modelsheet",
		label: "Model sheet",
		icon: LayoutGrid
	},
	{
		id: "object",
		label: "Objet",
		icon: Box
	},
	{
		id: "effect",
		label: "Effet",
		icon: Sparkles
	},
	{
		id: "text",
		label: "Texte",
		icon: Type
	},
	{
		id: "bubble",
		label: "Bulle",
		icon: MessageCircle
	},
	{
		id: "sfx",
		label: "Onomatopée",
		icon: Zap
	},
	{
		id: "library",
		label: "Bibliothèque",
		icon: Library
	},
	{
		id: "ai",
		label: "IA",
		icon: WandSparkles,
		ai: true
	},
	{
		id: "cloud",
		label: "Cloud",
		icon: Cloud
	}
];
function LeftToolbar() {
	const tool = useProjectStore((s) => s.tool);
	const setTool = useProjectStore((s) => s.setTool);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "rail",
		"aria-label": "Outils de composition",
		children: TOOLS.map((item) => {
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: item.ai ? "tool-btn tool-ai" : "tool-btn",
				"data-on": tool === item.id ? "true" : "false",
				title: item.label,
				"aria-label": item.label,
				onClick: () => setTool(item.id),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
			}, item.id);
		})
	});
}
function BlendModePanel() {
	const layer = useProjectStore((s) => primaryLayer(s));
	const update = useProjectStore((s) => s.updateSelectedLayers);
	const begin = useProjectStore((s) => s.beginGesture);
	const end = useProjectStore((s) => s.endGesture);
	const patch = useProjectStore((s) => s.patchLayers);
	if (!layer) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "prop-block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "slider-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"Opacité ",
				Math.round(layer.opacity * 100),
				"%"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "range",
				min: 0,
				max: 100,
				value: Math.round(layer.opacity * 100),
				onPointerDown: () => begin(),
				onPointerUp: () => end(),
				onChange: (e) => {
					const opacity = Number(e.target.value) / 100;
					const state = useProjectStore.getState();
					const ids = new Set(state.selectedLayerIds);
					patch(state.layers.map((l) => ids.has(l.id) ? {
						...l,
						opacity
					} : l), state.gesture ? "live" : "commit");
				}
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "field",
			style: { marginTop: 8 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mode de fusion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: layer.blendMode,
				onChange: (e) => update({ blendMode: e.target.value }),
				children: BLEND_MODES.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: mode.id,
					children: mode.label
				}, mode.id))
			})]
		})]
	});
}
function ImageLayerPanel() {
	const layer = useProjectStore((s) => primaryLayer(s));
	const src = useAssetUrl(layer?.type === "image" ? layer.assetId : void 0);
	const input = (0, import_react.useRef)(null);
	if (!layer || layer.type !== "image") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "prop-block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pane-kicker",
				children: "Image"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "image-preview checker",
				children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: ""
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hint",
					children: "Source manquante"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row-actions",
				style: { marginTop: 8 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => fit("contain"),
						children: "Ajuster"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => fit("cover"),
						children: "Remplir"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => fit("fill"),
						children: "Étirer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => useProjectStore.getState().updateSelectedLayers({
							x: (100 - layer.w) / 2,
							y: (100 - layer.h) / 2
						}),
						children: "Centrer"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row-actions",
				style: { marginTop: 6 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-accent",
						onClick: () => input.current?.click(),
						children: "Remplacer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => useProjectStore.getState().setTool("crop"),
						children: "Recadrer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => useProjectStore.getState().updateSelectedLayers({ crop: FULL_CROP }),
						children: "Cadrage original"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						disabled: !layer.mask,
						onClick: () => useProjectStore.getState().updateSelectedLayers({ mask: null }),
						children: "Retirer le masque"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => solo(layer.id, layer.panelId, true),
						children: "Isoler"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => solo(layer.id, layer.panelId, false),
						children: "Tout afficher"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prop-grid",
				style: { marginTop: 8 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Lumière ", Math.round((layer.brightness ?? 1) * 100)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 40,
							max: 180,
							value: Math.round((layer.brightness ?? 1) * 100),
							onChange: (e) => useProjectStore.getState().updateSelectedLayers({ brightness: Number(e.target.value) / 100 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Contraste ", Math.round((layer.contrast ?? 1) * 100)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 40,
							max: 180,
							value: Math.round((layer.contrast ?? 1) * 100),
							onChange: (e) => useProjectStore.getState().updateSelectedLayers({ contrast: Number(e.target.value) / 100 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Teinte" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							value: layer.tint && /^#[0-9a-fA-F]{6}$/.test(layer.tint) ? layer.tint : "#ff9d2e",
							onChange: (e) => useProjectStore.getState().updateSelectedLayers({
								tint: e.target.value,
								tintAmount: layer.tintAmount || .35
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Force ", Math.round((layer.tintAmount ?? 0) * 100)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 100,
							value: Math.round((layer.tintAmount ?? 0) * 100),
							onChange: (e) => useProjectStore.getState().updateSelectedLayers({ tintAmount: Number(e.target.value) / 100 })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: input,
				type: "file",
				accept: "image/png,image/jpeg,image/webp,image/gif,image/svg+xml",
				hidden: true,
				onChange: (e) => {
					const file = e.target.files?.[0];
					e.target.value = "";
					if (file) replaceImage(file);
				}
			})
		]
	});
}
function fit(mode) {
	const state = useProjectStore.getState();
	const layer = primaryLayer(state);
	if (!layer || layer.type !== "image") return;
	if (mode === "fill") {
		state.updateSelectedLayers({
			x: 0,
			y: 0,
			w: 100,
			h: 100
		});
		return;
	}
	const panel = state.panels.find((p) => p.id === layer.panelId);
	const page = state.pages.find((p) => p.id === panel?.pageId);
	const src = resolveSrc(state.assets.find((a) => a.id === layer.assetId), state.blobUrls);
	if (!panel || !page || !src) return;
	const img = new Image();
	img.onload = () => {
		const pw = page.width * panel.w / 100;
		const ph = page.height * panel.h / 100;
		if (!pw || !ph || !img.naturalWidth || !img.naturalHeight) return;
		const ir = img.naturalWidth / img.naturalHeight;
		const pr = pw / ph;
		const wider = ir > pr;
		let w = 100;
		let h = 100;
		if (mode === "contain") {
			if (wider) h = pr / ir * 100;
			else w = ir / pr * 100;
		} else if (wider) w = ir / pr * 100;
		else h = pr / ir * 100;
		useProjectStore.getState().updateSelectedLayers({
			x: (100 - w) / 2,
			y: (100 - h) / 2,
			w,
			h
		});
	};
	img.src = src;
}
function solo(id, panelId, isolate) {
	const state = useProjectStore.getState();
	state.patchLayers(state.layers.map((layer) => {
		if (layer.panelId !== panelId || layer.type !== "image") return layer;
		return {
			...layer,
			visible: isolate ? layer.id === id : true
		};
	}));
}
async function replaceImage(file) {
	if (!file.type.startsWith("image/")) {
		useProjectStore.getState().toast("Formats acceptés : PNG, JPG, WEBP, SVG, GIF.");
		return;
	}
	const data = await readFileAsDataUrl(file);
	const id = uid("asset");
	await idbSet(id, data);
	const current = primaryLayer(useProjectStore.getState());
	const previous = useProjectStore.getState().assets.find((a) => a.id === current?.assetId);
	useProjectStore.getState().addAsset({
		id,
		name: file.name.replace(/\.[^.]+$/, "") || "Import",
		description: "",
		category: previous?.category ?? "photo",
		tags: ["import"],
		favorite: false,
		createdAt: Date.now(),
		source: "import",
		src: `idb:${id}`,
		mime: file.type || "image/png"
	}, data);
	useProjectStore.getState().updateSelectedLayers({ assetId: id });
	useProjectStore.getState().toast("Image du calque remplacée.");
}
var PRESETS = [
	{
		id: "vignette",
		label: "Vignette",
		mask: {
			type: "ellipse",
			x: .08,
			y: .08,
			w: .84,
			h: .84
		}
	},
	{
		id: "portrait",
		label: "Portrait",
		mask: {
			type: "ellipse",
			x: .2,
			y: .04,
			w: .6,
			h: .92
		}
	},
	{
		id: "bandeau",
		label: "Bandeau",
		mask: {
			type: "rect",
			x: 0,
			y: .34,
			w: 1,
			h: .32
		}
	},
	{
		id: "coin",
		label: "Coin",
		mask: {
			type: "rect",
			x: 0,
			y: 0,
			w: .55,
			h: .55
		}
	}
];
function MaskPanel() {
	const layer = useProjectStore((s) => primaryLayer(s));
	const update = useProjectStore((s) => s.updateSelectedLayers);
	if (!layer || layer.type === "group") return null;
	const mask = layer.mask;
	const setMask = (next) => update({ mask: next });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "prop-block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pane-kicker",
				children: "Masque vectoriel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: "Forme tracée sur le cadre du calque. L’intérieur reste visible, l’extérieur est caché. L’image n’est pas recadrée."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "seg",
				style: { marginTop: 8 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-on": !mask ? "true" : "false",
					onClick: () => setMask(null),
					children: "Aucun"
				}), [
					"rect",
					"ellipse",
					"free"
				].map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-on": mask?.type === type ? "true" : "false",
					onClick: () => setMask({
						type,
						x: mask?.x ?? .1,
						y: mask?.y ?? .1,
						w: mask?.w ?? .8,
						h: mask?.h ?? .8,
						points: type === "free" ? mask?.points ?? [] : void 0,
						feather: mask?.feather
					}),
					children: type === "rect" ? "Rectangle" : type === "ellipse" ? "Ellipse" : "Libre"
				}, type))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskStage, { layer }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mask-legend",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zone visible" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zone masquée" })
				]
			}),
			mask ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				style: { marginTop: 8 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Contour ", mask.feather ?? 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 24,
					value: mask.feather ?? 0,
					onChange: (e) => setMask({
						...mask,
						feather: Number(e.target.value)
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row-actions",
				children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => setMask(preset.mask),
					children: preset.label
				}, preset.id))
			}),
			mask && mask.type !== "free" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prop-grid",
				style: { marginTop: 8 },
				children: [
					["x", "Gauche"],
					["y", "Haut"],
					["w", "Largeur"],
					["h", "Hauteur"]
				].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						min: 0,
						max: 100,
						value: Math.round(mask[key] * 100),
						onChange: (e) => setMask({
							...mask,
							[key]: clamp01(Number(e.target.value) / 100)
						})
					})]
				}, key))
			}) : null,
			mask?.type === "free" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row-actions",
				style: { marginTop: 8 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => setMask({
						...mask,
						points: (mask.points ?? []).slice(0, -1)
					}),
					children: "Retirer le dernier point"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => setMask({
						...mask,
						points: []
					}),
					children: "Effacer"
				})]
			}) : null,
			mask ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: mask.type === "free" ? `${mask.points?.length ?? 0} points. Cliquez le cadre pour en ajouter, glissez un point pour le déplacer. Trois points ferment la forme.` : "Glissez la forme pour la déplacer, le coin pour la redimensionner. Valeurs en % du cadre."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hint",
				children: "Aucun masque : le calque est entièrement visible. Le recadrage, lui, choisit une portion de la photo."
			})
		]
	});
}
function MaskStage({ layer }) {
	const src = useAssetUrl(layer.type === "image" ? layer.assetId : void 0);
	const mask = layer.mask;
	const onPointerDown = (event) => {
		if (!mask || event.button !== 0) return;
		const bounds = event.currentTarget.getBoundingClientRect();
		const point = (ev) => ({
			x: clamp01((ev.clientX - bounds.left) / bounds.width),
			y: clamp01((ev.clientY - bounds.top) / bounds.height)
		});
		const start = point(event);
		const origin = mask;
		if (mask.type === "free") {
			const points = mask.points ?? [];
			const index = points.findIndex((p) => Math.hypot(p.x - start.x, p.y - start.y) < .045);
			if (index < 0) {
				writeMask(layer.id, {
					...mask,
					points: [...points, start]
				}, "commit");
				return;
			}
			drag((ev) => {
				const next = point(ev);
				const copy = points.map((p, i) => i === index ? next : p);
				writeMask(layer.id, {
					...origin,
					points: copy
				}, "live");
			});
			return;
		}
		const resizing = nearCorner(mask, start);
		if (!resizing && !inside(mask, start)) return;
		drag((ev) => {
			const now = point(ev);
			const dx = now.x - start.x;
			const dy = now.y - start.y;
			if (resizing) {
				writeMask(layer.id, {
					...origin,
					w: clamp(origin.w + dx, .05, 1 - origin.x),
					h: clamp(origin.h + dy, .05, 1 - origin.y)
				}, "live");
				return;
			}
			writeMask(layer.id, {
				...origin,
				x: clamp(origin.x + dx, 0, 1 - origin.w),
				y: clamp(origin.y + dy, 0, 1 - origin.h)
			}, "live");
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mask-stage checker",
		onPointerDown,
		children: [src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: ""
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mask-frame-label",
			children: layer.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			preserveAspectRatio: "none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "100",
				height: "100",
				fill: "rgba(9,13,18,0.55)"
			}), mask ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskShapeView, {
				mask,
				fill: "rgba(255,157,46,0.28)"
			}), mask.type !== "free" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: (mask.x + mask.w) * 100 - 1.6,
				y: (mask.y + mask.h) * 100 - 1.6,
				width: "3.2",
				height: "3.2",
				fill: "#ffb84d",
				stroke: "#1c2128",
				strokeWidth: "0.4"
			}) : (mask.points ?? []).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: p.x * 100,
				cy: p.y * 100,
				r: "1.8",
				fill: "#ffb84d"
			}, i))] }) : null]
		})]
	});
}
function MaskShapeView({ mask, fill = "none" }) {
	if (mask.type === "ellipse") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
		cx: (mask.x + mask.w / 2) * 100,
		cy: (mask.y + mask.h / 2) * 100,
		rx: Math.max(1, mask.w * 100 / 2),
		ry: Math.max(1, mask.h * 100 / 2),
		fill,
		stroke: "#ff9d2e",
		strokeWidth: "1.5",
		vectorEffect: "non-scaling-stroke"
	});
	if (mask.type === "free") {
		const points = mask.points ?? [];
		if (points.length < 2) return null;
		const d = points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ");
		return points.length >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: d,
			fill,
			stroke: "#ff9d2e",
			strokeWidth: "1.5",
			vectorEffect: "non-scaling-stroke"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			points: d,
			fill: "none",
			stroke: "#ff9d2e",
			strokeWidth: "1.5",
			vectorEffect: "non-scaling-stroke"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: mask.x * 100,
		y: mask.y * 100,
		width: mask.w * 100,
		height: mask.h * 100,
		fill,
		stroke: "#ff9d2e",
		strokeWidth: "1.5",
		vectorEffect: "non-scaling-stroke"
	});
}
function drag(move) {
	useProjectStore.getState().beginGesture();
	const onMove = (ev) => move(ev);
	const onUp = () => {
		window.removeEventListener("pointermove", onMove);
		window.removeEventListener("pointerup", onUp);
		useProjectStore.getState().endGesture();
	};
	window.addEventListener("pointermove", onMove);
	window.addEventListener("pointerup", onUp);
}
function writeMask(id, mask, mode) {
	const state = useProjectStore.getState();
	state.patchLayers(state.layers.map((layer) => layer.id === id ? {
		...layer,
		mask
	} : layer), mode);
}
function inside(mask, p) {
	if (mask.type === "ellipse") {
		const rx = Math.max(.02, mask.w / 2);
		const ry = Math.max(.02, mask.h / 2);
		const nx = (p.x - (mask.x + mask.w / 2)) / rx;
		const ny = (p.y - (mask.y + mask.h / 2)) / ry;
		return nx * nx + ny * ny <= 1;
	}
	return p.x >= mask.x && p.y >= mask.y && p.x <= mask.x + mask.w && p.y <= mask.y + mask.h;
}
function nearCorner(mask, p) {
	return Math.hypot(p.x - (mask.x + mask.w), p.y - (mask.y + mask.h)) < .06;
}
function clamp01(n) {
	return clamp(Number.isFinite(n) ? n : 0, 0, 1);
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function SoundEffectPanel() {
	const layer = useProjectStore((s) => primaryLayer(s));
	const update = useProjectStore((s) => s.updateSelectedLayers);
	if (!layer || layer.type !== "sfx") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "prop-block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pane-kicker",
				children: "Onomatopée"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: SFX_PRESETS.some((preset) => preset.id === layer.sfxVariant) ? layer.sfxVariant : "boom",
					onChange: (e) => {
						const preset = sfxPreset(e.target.value);
						update({
							sfxVariant: preset.id,
							text: preset.text,
							color: preset.color,
							name: preset.text,
							rotation: preset.rotation,
							fontSize: preset.fontSize
						});
					},
					children: SFX_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
						label: group,
						children: SFX_PRESETS.filter((preset) => preset.group === group).map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: preset.id,
							children: preset.text
						}, preset.id))
					}, group))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "seg",
				style: { marginTop: 8 },
				children: [
					-18,
					-8,
					0,
					8,
					18
				].map((rotation) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-on": layer.rotation === rotation ? "true" : "false",
					onClick: () => update({ rotation }),
					children: rotation > 0 ? `+${rotation}°` : `${rotation}°`
				}, rotation))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				style: { marginTop: 8 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Texte" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: layer.text,
					onChange: (e) => update({
						text: e.target.value,
						name: e.target.value
					})
				})]
			})
		]
	});
}
function SpeechBubblePanel() {
	const layer = useProjectStore((s) => primaryLayer(s));
	const update = useProjectStore((s) => s.updateSelectedLayers);
	if (!layer || layer.type !== "bubble") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "prop-block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pane-kicker",
				children: "Bulle"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Forme" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: layer.bubbleStyle,
					onChange: (e) => {
						const preset = bubblePreset(e.target.value);
						update({
							bubbleStyle: preset.style,
							color: preset.ink,
							fontFamily: preset.fontFamily ?? layer.fontFamily,
							fontWeight: preset.weight ?? layer.fontWeight,
							italic: preset.italic ?? false,
							fontSize: preset.fontSize ?? layer.fontSize
						});
					},
					children: BUBBLE_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
						label: group,
						children: BUBBLE_PRESETS.filter((preset) => preset.group === group).map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: preset.style,
							children: preset.name
						}, preset.style))
					}, group))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				style: { marginTop: 8 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Longueur de queue ", Math.round((layer.tailLen ?? 1) * 100)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 35,
					max: 280,
					value: Math.round((layer.tailLen ?? 1) * 100),
					onChange: (e) => update({ tailLen: Number(e.target.value) / 100 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field",
				style: { marginTop: 8 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Texte" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: layer.text,
					onChange: (e) => update({ text: e.target.value })
				})]
			})
		]
	});
}
function TransformPanel() {
	const layer = useProjectStore((s) => primaryLayer(s));
	const update = useProjectStore((s) => s.updateSelectedLayers);
	if (!layer) return null;
	const num = (key, label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "number",
			value: Math.round(layer[key] * 10) / 10,
			onChange: (e) => update({ [key]: Number(e.target.value) })
		})]
	}, key);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "prop-block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pane-kicker",
				children: "Transformation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prop-grid",
				children: [
					num("x", "X"),
					num("y", "Y"),
					num("w", "Largeur"),
					num("h", "Hauteur"),
					num("rotation", "Rotation")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row-actions",
				style: { marginTop: 8 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => update({ x: 0 }),
						children: "Gauche"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => update({ x: (100 - layer.w) / 2 }),
						children: "Centre"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => update({ x: 100 - layer.w }),
						children: "Droite"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => update({ y: 0 }),
						children: "Haut"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => update({ y: (100 - layer.h) / 2 }),
						children: "Milieu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line",
						onClick: () => update({ y: 100 - layer.h }),
						children: "Bas"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row-actions",
				style: { marginTop: 8 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => update({ flipH: !layer.flipH }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipHorizontal2, { size: 14 }), " Horizontal"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => update({ flipV: !layer.flipV }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipVertical2, { size: 14 }), " Vertical"]
				})]
			})
		]
	});
}
function PropertiesPanel() {
	const layer = useProjectStore((s) => primaryLayer(s));
	const panel = useProjectStore((s) => s.panels.find((p) => p.id === s.selectedPanelId));
	const page = useProjectStore((s) => s.pages.find((p) => p.id === s.selectedPageId));
	const updateLayer = useProjectStore((s) => s.updateSelectedLayers);
	const updatePanel = useProjectStore((s) => s.updatePanel);
	const updatePage = useProjectStore((s) => s.updatePage);
	const rename = useProjectStore((s) => s.renameLayer);
	let title = "Propriétés de la page";
	if (layer?.type === "image") title = "Propriétés de l'image";
	else if (layer?.type === "text") title = "Propriétés du texte";
	else if (layer?.type === "bubble") title = "Propriétés de la bulle";
	else if (layer?.type === "sfx") title = "Propriétés de l'onomatopée";
	else if (layer?.type === "group") title = "Propriétés du groupe";
	else if (panel && !layer) title = "Propriétés de la case";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "inspector-props",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pane-head",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pane-kicker",
					children: "Inspecteur"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pane-title",
					children: title
				})] })
			}),
			layer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "prop-block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nom" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: layer.name,
							onChange: (e) => rename(layer.id, e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hint",
						children: ["Type · ", layer.type]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransformPanel, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlendModePanel, {}),
				layer.type === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageLayerPanel, {}) : null,
				layer.type === "image" || layer.type === "text" || layer.type === "bubble" || layer.type === "sfx" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaskPanel, {}) : null,
				layer.type === "text" || layer.type === "bubble" || layer.type === "sfx" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "prop-block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pane-kicker",
							children: "Texte"
						}),
						layer.type === "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contenu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: layer.text,
								onChange: (e) => updateLayer({ text: e.target.value })
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "prop-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Police" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: resolveFont(layer.fontFamily),
										onChange: (e) => updateLayer({ fontFamily: e.target.value }),
										children: UI_FONTS.map((font) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: font.value,
											children: font.label
										}, font.value))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Taille" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: layer.fontSize,
										onChange: (e) => updateLayer({ fontSize: Number(e.target.value) })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Couleur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "color",
										value: toHex(layer.color),
										onChange: (e) => updateLayer({ color: e.target.value })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Graisse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: 100,
										min: 400,
										max: 800,
										value: layer.fontWeight,
										onChange: (e) => updateLayer({ fontWeight: Number(e.target.value) })
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "seg",
							style: { marginTop: 8 },
							children: [[
								"left",
								"center",
								"right"
							].map((align) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-on": layer.align === align ? "true" : "false",
								onClick: () => updateLayer({ align }),
								children: align === "left" ? "Gauche" : align === "right" ? "Droite" : "Centre"
							}, align)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-on": layer.italic ? "true" : "false",
								onClick: () => updateLayer({ italic: !layer.italic }),
								children: "Italique"
							})]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeechBubblePanel, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundEffectPanel, {})
			] }) : null,
			!layer && panel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prop-block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pane-kicker",
						children: "Case"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "prop-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fond" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "color",
									value: toHex(panel.fill),
									onChange: (e) => updatePanel(panel.id, { fill: e.target.value })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bordure" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "color",
									value: toHex(panel.border),
									onChange: (e) => updatePanel(panel.id, { border: e.target.value })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Épaisseur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 0,
									max: 12,
									value: panel.borderWidth,
									onChange: (e) => updatePanel(panel.id, { borderWidth: Number(e.target.value) })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rayon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: 0,
									max: 40,
									value: panel.radius,
									onChange: (e) => updatePanel(panel.id, { radius: Number(e.target.value) })
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						style: { marginTop: 8 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trame" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-line",
							onClick: () => updatePanel(panel.id, { halftone: !panel.halftone }),
							children: panel.halftone ? "Trame active" : "Sans trame"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row-actions",
						style: { marginTop: 8 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-line",
								onClick: () => useProjectStore.getState().splitPanel("h"),
								children: "Scinder H"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-line",
								onClick: () => useProjectStore.getState().splitPanel("v"),
								children: "Scinder V"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-line",
								onClick: () => useProjectStore.getState().duplicatePanel(),
								children: "Dupliquer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-line",
								onClick: () => useProjectStore.getState().deletePanel(),
								children: "Supprimer"
							})
						]
					})
				]
			}) : null,
			page ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prop-block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pane-kicker",
						children: ["Planche · ", PRESET_LABEL[page.preset]]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nom" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: page.name,
							onChange: (e) => updatePage(page.id, { name: e.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "prop-grid",
						style: { marginTop: 8 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fond" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "color",
									value: toHex(page.background),
									onChange: (e) => updatePage(page.id, { background: e.target.value })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Largeur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: page.width,
									onChange: (e) => updatePage(page.id, { width: Number(e.target.value) })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hauteur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: page.height,
									onChange: (e) => updatePage(page.id, { height: Number(e.target.value) })
								})]
							})
						]
					})
				]
			}) : null
		]
	});
}
function toHex(color) {
	if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
	return "#f7f4ee";
}
function Workspace() {
	const libraryOpen = useProjectStore((s) => s.libraryOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeftToolbar, {}),
		libraryOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetLibrary, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "none" } }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasWorkspace, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "inspector",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertiesPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayersPanel, {})]
		})
	] });
}
var REV_KEY = "atelier-bd-layout-rev";
/** Replace the stock collage when a newer planche ships. Keeps imported projects. */
function migrateDemoLayout() {
	if (typeof window === "undefined") return false;
	if (localStorage.getItem(REV_KEY) === String(3)) return false;
	let parsed = null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) parsed = parseProjectFile(JSON.parse(raw));
	} catch {
		parsed = null;
	}
	if (!(!parsed || parsed.project.id === "projet-ile" && parsed.assets.every((asset) => asset.source === "demo"))) {
		localStorage.setItem(REV_KEY, String(3));
		return false;
	}
	if (!parsed) {
		localStorage.setItem(REV_KEY, String(3));
		return false;
	}
	const demo = createDemoProject();
	const state = useProjectStore.getState();
	const pageId = demo.pages.some((p) => p.id === state.selectedPageId) ? state.selectedPageId : demo.pages[0].id;
	const meta = {
		...demo.meta,
		updatedAt: Date.now()
	};
	useProjectStore.setState({
		meta,
		pages: demo.pages,
		panels: demo.panels,
		layers: demo.layers,
		assets: DEMO_ASSETS,
		selectedPageId: pageId,
		selectedPanelId: demo.panels.find((p) => p.pageId === pageId)?.id ?? null,
		selectedLayerIds: [],
		past: [],
		future: [],
		saveState: "saved"
	});
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(toProjectFile(meta, demo.pages, demo.panels, demo.layers, DEMO_ASSETS, pageId)));
		localStorage.setItem(REV_KEY, String(3));
	} catch {}
	return true;
}
if (typeof window !== "undefined") migrateDemoLayout();
function usePersistence() {
	const hydrate = useProjectStore((s) => s.setBlobUrls);
	(0, import_react.useEffect)(() => {
		if (!migrateDemoLayout()) try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = parseProjectFile(JSON.parse(raw));
				if (parsed) useProjectStore.setState({
					meta: parsed.project,
					pages: parsed.pages,
					panels: parsed.panels,
					layers: parsed.layers,
					assets: parsed.assets,
					selectedPageId: parsed.selectedPageId || parsed.pages[0]?.id,
					selectedPanelId: parsed.panels.find((p) => p.pageId === (parsed.selectedPageId || parsed.pages[0]?.id))?.id ?? null,
					selectedLayerIds: [],
					past: [],
					future: [],
					saveState: "saved"
				});
			}
		} catch {}
		let cancel = false;
		const assets = useProjectStore.getState().assets;
		(async () => {
			const urls = {};
			for (const asset of assets) {
				if (!asset.src.startsWith("idb:")) continue;
				const data = await idbGet(asset.src.slice(4));
				if (data) urls[asset.src.slice(4)] = data;
			}
			if (!cancel && Object.keys(urls).length) hydrate(urls);
		})();
		return () => {
			cancel = true;
		};
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		let timer;
		const unsub = useProjectStore.subscribe((state, prev) => {
			if (!(state.pages !== prev.pages || state.panels !== prev.panels || state.layers !== prev.layers || state.assets !== prev.assets || state.meta !== prev.meta || state.selectedPageId !== prev.selectedPageId)) return;
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				const s = useProjectStore.getState();
				try {
					const file = toProjectFile(s.meta, s.pages, s.panels, s.layers, s.assets, s.selectedPageId);
					localStorage.setItem(STORAGE_KEY, JSON.stringify({
						...file,
						project: {
							...file.project,
							updatedAt: Date.now()
						}
					}));
					useProjectStore.setState({ saveState: "saved" });
				} catch {
					useProjectStore.getState().toast("Sauvegarde locale impossible.");
				}
			}, 450);
		});
		return () => {
			unsub();
			window.clearTimeout(timer);
		};
	}, []);
}
function AppShell() {
	usePersistence();
	const libraryOpen = useProjectStore((s) => s.libraryOpen);
	const pane = useProjectStore((s) => s.mobilePane);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const target = e.target;
			const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
			const s = useProjectStore.getState();
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
				e.preventDefault();
				if (e.shiftKey) s.redo();
				else s.undo();
				return;
			}
			if (typing) return;
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
				e.preventDefault();
				s.duplicateSelected();
			} else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "c") {
				e.preventDefault();
				s.copySelected();
			} else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "v") {
				e.preventDefault();
				s.pasteClipboard();
			} else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "g") {
				e.preventDefault();
				if (e.shiftKey) s.ungroupSelected();
				else s.groupSelected();
			} else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "a") {
				e.preventDefault();
				const ids = s.layers.filter((l) => l.panelId === s.selectedPanelId && !l.parentId).map((l) => l.id);
				s.selectLayers(ids);
			} else if (e.key === "Delete" || e.key === "Backspace") s.deleteSelected();
			else if (e.key === "v" || e.key === "V") s.setTool("select");
			else if (e.key === "t" || e.key === "T") s.setTool("text");
			else if (e.key === "[") s.reorderSelected("lower");
			else if (e.key === "]") s.reorderSelected("raise");
			else if (e.key.startsWith("Arrow") && s.selectedLayerIds.length && s.tool !== "crop") {
				e.preventDefault();
				const layer = s.layers.find((item) => item.id === s.selectedLayerIds.at(-1));
				const panel = s.panels.find((item) => item.id === layer?.panelId);
				const page = s.pages.find((item) => item.id === panel?.pageId);
				const pw = Math.max(40, (page?.width ?? 800) * ((panel?.w ?? 100) / 100));
				const ph = Math.max(40, (page?.height ?? 1100) * ((panel?.h ?? 100) / 100));
				const px = e.shiftKey ? 10 : 1;
				const dx = (e.key === "ArrowLeft" ? -px : e.key === "ArrowRight" ? px : 0) / pw * 100;
				const dy = (e.key === "ArrowUp" ? -px : e.key === "ArrowDown" ? px : 0) / ph * 100;
				if (!s.gesture) s.beginGesture();
				s.patchLayers(translateLayers(useProjectStore.getState().layers, s.selectedLayerIds, dx, dy), "live");
			}
		};
		const onUp = (e) => {
			if (!e.key.startsWith("Arrow")) return;
			useProjectStore.getState().endGesture();
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("keyup", onUp);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("keyup", onUp);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shell",
			"data-lib": libraryOpen ? "open" : "closed",
			"data-pane": pane,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workspace, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PagesFilmstrip, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mobile-nav",
					"aria-label": "Sections",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": pane === "canvas" ? "true" : "false",
							onClick: () => useProjectStore.getState().setMobilePane("canvas"),
							children: "Planche"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": pane === "assets" ? "true" : "false",
							onClick: () => useProjectStore.getState().setMobilePane("assets"),
							children: "Assets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": pane === "layers" ? "true" : "false",
							onClick: () => useProjectStore.getState().setMobilePane("layers"),
							children: "Calques"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCropModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiImageModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudImportModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReaderModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastSystem, {})
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component, routes_CzSDP5f__exports as n, importImageFiles as t };
