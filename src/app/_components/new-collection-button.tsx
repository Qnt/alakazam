"use client";

import { BadgePlus } from "lucide-react";
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
        type="button"
        className="btn btn-outline"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <span className="hidden md:inline">Create a collection</span>
        <BadgePlus />
      </button>
      <NewCollectionModal ref={dialogRef} key={modalKey} resetKey={resetKey} />
    </>
  );
}
