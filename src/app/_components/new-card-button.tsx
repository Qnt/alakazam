"use client";

import { BadgePlus } from "lucide-react";
import { nanoid } from "nanoid";
import { type Collection } from "prisma/generated/zod";
import { useRef, useState } from "react";
import NewCardModal from "./new-card-modal";

export default function NewCardButton({
  collectionId,
}: {
  collectionId: Collection["id"];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modalKey, setModalKey] = useState(() => nanoid());

  const resetKey = () => {
    setModalKey(nanoid());
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-ghost h-full"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <span>Create a card</span>
        <BadgePlus />
      </button>
      <NewCardModal
        ref={dialogRef}
        key={modalKey}
        collectionId={collectionId}
        resetKey={resetKey}
      />
    </>
  );
}
