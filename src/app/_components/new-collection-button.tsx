"use client";

import { useRef } from "react";
import NewCollectionModal from "./new-collection-modal";

export default function NewCollectionButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        Создать коллекцию
      </button>
      <NewCollectionModal ref={dialogRef} />
    </>
  );
}
