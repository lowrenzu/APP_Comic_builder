import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export function ModalFrame({
  open,
  onOpenChange,
  title,
  description,
  wide,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className={wide ? "modal modal-wide" : "modal"}>
          <Dialog.Title className="pane-title">{title}</Dialog.Title>
          {description ? <Dialog.Description className="hint">{description}</Dialog.Description> : <Dialog.Description className="sr-only">{title}</Dialog.Description>}
          <div style={{ marginTop: 12 }}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
