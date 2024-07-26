import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  toggleDialog: () => void;
  resetKey: () => void;
  children: React.ReactNode;
};

export default forwardRef<HTMLDialogElement, DialogProps>(function Dialog(
  { toggleDialog, resetKey, children },
  dialogRef,
) {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <dialog
      id="collection_form_modal"
      className="modal modal-bottom sm:modal-middle"
      ref={dialogRef}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          resetKey();
          toggleDialog();
        }
      }}
    >
      {children}
    </dialog>,
    document.body,
  );
});
