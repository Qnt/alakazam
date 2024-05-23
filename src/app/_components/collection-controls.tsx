"use client";

import type { Collection } from "@prisma/client";
import { useRef } from "react";
import ModalConfirm from "./modal-confirm";

export default function CollectionControls({
  collection,
}: {
  collection: Collection;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="card-actions justify-center">
        <button
          className="btn btn-accent"
          onClick={(e) => {
            ref.current?.showModal();
            e.stopPropagation();
          }}
        >
          Удалить
        </button>
      </div>
      <ModalConfirm ref={ref} collection={collection}>
        <p className="py-4">{`Удалить коллекцию "${collection.name}"?`}</p>
      </ModalConfirm>
    </>
  );
}
