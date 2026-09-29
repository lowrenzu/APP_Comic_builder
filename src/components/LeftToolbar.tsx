import {
  Box,
  Camera,
  Cloud,
  Crop,
  Image,
  LayoutGrid,
  Library,
  MessageCircle,
  Mountain,
  MousePointer2,
  Move,
  Scaling,
  Sparkles,
  Type,
  User,
  Wand2,
  Zap,
} from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import type { ToolId } from "@/types";

const TOOLS: { id: ToolId; label: string; icon: typeof MousePointer2; ai?: boolean }[] = [
  { id: "select", label: "Sélection", icon: MousePointer2 },
  { id: "move", label: "Déplacement", icon: Move },
  { id: "transform", label: "Transformation", icon: Scaling },
  { id: "crop", label: "Recadrage", icon: Crop },
  { id: "image", label: "Image", icon: Image },
  { id: "character", label: "Personnage", icon: User },
  { id: "background", label: "Décor", icon: Mountain },
  { id: "photo", label: "Photo", icon: Camera },
  { id: "modelsheet", label: "Model sheet", icon: LayoutGrid },
  { id: "object", label: "Objet", icon: Box },
  { id: "effect", label: "Effet", icon: Sparkles },
  { id: "text", label: "Texte", icon: Type },
  { id: "bubble", label: "Bulle", icon: MessageCircle },
  { id: "sfx", label: "Onomatopée", icon: Zap },
  { id: "library", label: "Bibliothèque", icon: Library },
  { id: "ai", label: "IA", icon: Wand2, ai: true },
  { id: "cloud", label: "Cloud", icon: Cloud },
];

export function LeftToolbar() {
  const tool = useProjectStore((s) => s.tool);
  const setTool = useProjectStore((s) => s.setTool);
  return (
    <nav className="rail" aria-label="Outils de composition">
      {TOOLS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            className={item.ai ? "tool-btn tool-ai" : "tool-btn"}
            data-on={tool === item.id ? "true" : "false"}
            title={item.label}
            aria-label={item.label}
            onClick={() => setTool(item.id)}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </nav>
  );
}
