"use client";

import { BadgePlus } from "lucide-react";
import { nanoid } from "nanoid";
import React, { useRef, useState } from "react";
import CardForm from "../card-form";
import CollectionForm from "../collection-form";
import Dialog from "./dialog";

type DialogVariant =
  | {
      name: "collection";
    }
  | {
      name: "card";
      collectionId: string;
    };

export default function DialogButton({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: DialogVariant;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modalKey, setModalKey] = useState(() => nanoid());

  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const resetKey = () => {
    setModalKey(nanoid());
  };

  const content =
    variant.name === "collection" ? (
      <CollectionForm
        key={modalKey}
        toggleDialog={toggleDialog}
        resetKey={resetKey}
      />
    ) : (
      <CardForm
        key={modalKey}
        toggleDialog={toggleDialog}
        resetKey={resetKey}
        collectionId={variant.collectionId}
      />
    );

  return (
    <>
      <button
        type="button"
        className="btn btn-ghost h-full"
        onClick={() => {
          toggleDialog();
        }}
      >
        <span>{children}</span>
        <BadgePlus />
      </button>
      <Dialog
        key={modalKey}
        resetKey={resetKey}
        toggleDialog={toggleDialog}
        ref={dialogRef}
      >
        {content}
      </Dialog>
    </>
  );
}
