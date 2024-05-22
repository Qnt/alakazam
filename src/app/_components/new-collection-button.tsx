"use client";

import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import NewCollectionModal from "./new-collection-modal";

export default function NewCollectionButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [modalKey, setModalKey] = useState(() => nanoid());

  const resetKey = () => {
    setModalKey(nanoid());
  };

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
      <NewCollectionModal ref={dialogRef} key={modalKey} resetKey={resetKey} />
    </>
  );
}
