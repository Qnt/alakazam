"use client";

import NewCollectionModal from "./new-collection-modal";

export default function NewCollectionButton() {
  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => {
          const dialog = document.getElementById(
            "form_modal",
          ) as HTMLDialogElement;
          return dialog.showModal();
        }}
      >
        Создать коллекцию
      </button>
      <NewCollectionModal />
    </>
  );
}
