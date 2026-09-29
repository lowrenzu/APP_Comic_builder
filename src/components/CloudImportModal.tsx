import { useState } from "react";
import { ModalFrame } from "@/components/ModalFrame";
import { searchCloudImages } from "@/lib/ai.functions";
import { useProjectStore } from "@/store/projectStore";

export function CloudImportModal() {
  const open = useProjectStore((s) => s.cloudOpen);
  const setOpen = useProjectStore((s) => s.setCloudOpen);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState<{ id: string; name: string }[]>([]);

  return (
    <ModalFrame
      open={open}
      onOpenChange={setOpen}
      title="Import cloud"
      description="Google Drive est optionnel. Sans connexion, importez depuis vos fichiers : l'atelier continue de fonctionner."
    >
      <div className="row-actions">
        <button
          type="button"
          className="btn btn-line"
          onClick={() => {
            setOpen(false);
            useProjectStore.getState().setImportOpen(true);
          }}
        >
          Import local
        </button>
      </div>
      <label className="field" style={{ marginTop: 10 }}>
        <span>Recherche Drive</span>
        <input value={query} placeholder="nom de l'image" onChange={(e) => setQuery(e.target.value)} />
      </label>
      <button
        type="button"
        className="btn btn-accent"
        style={{ marginTop: 8 }}
        onClick={() => {
          setStatus("Recherche…");
          void searchCloudImages({ data: { query } }).then((result) => {
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
        }}
      >
        Chercher dans Drive
      </button>
      {status ? <p className="hint">{status}</p> : null}
      <ul>
        {files.map((file) => (
          <li key={file.id} className="hint">
            {file.name}
          </li>
        ))}
      </ul>
      <p className="hint">
        Google Photos n'est pas branché ici. Si un fichier Drive n'est pas téléchargeable, passez par Importer.
      </p>
    </ModalFrame>
  );
}
