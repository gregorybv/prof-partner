"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/modal-provider";

export function LimitModal() {
  const { limitOpen, closeLimit } = useModals();

  return (
    <Dialog open={limitOpen} onClose={closeLimit} title="ВНИМАНИЕ!">
      <p className="text-sm text-(--text-secondary)">
        Лимит расчётов исчерпан.
      </p>
      <Button type="button" className="mt-4" onClick={closeLimit}>
        Ок
      </Button>
    </Dialog>
  );
}
