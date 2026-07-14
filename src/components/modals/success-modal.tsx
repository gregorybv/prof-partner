"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModals } from "@/components/modals/modal-provider";

export function SuccessModal() {
  const { successOpen, successTitle, successMessage, closeSuccess } = useModals();

  return (
    <Dialog open={successOpen} onClose={closeSuccess} title={successTitle}>
      <p className="text-center text-sm text-[var(--text-secondary)]">{successMessage}</p>
      <Button type="button" className="mt-6 w-full" onClick={closeSuccess}>
        ПОНЯТНО
      </Button>
    </Dialog>
  );
}
