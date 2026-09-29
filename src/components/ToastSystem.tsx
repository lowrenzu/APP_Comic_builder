import { useProjectStore } from "@/store/projectStore";

export function ToastSystem() {
  const toasts = useProjectStore((s) => s.toasts);
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.text}
        </div>
      ))}
    </div>
  );
}
