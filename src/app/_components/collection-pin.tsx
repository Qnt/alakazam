"use client";

import { Pin } from "lucide-react";
import { type Collection } from "prisma/generated/zod";
import { useFormState } from "react-dom";
import { toggleCollectionPin } from "~/server/queries";
import ButtonSubmit from "./ui/button-submit";

export default function CollectionPin({
  collection,
  isPinnable,
}: {
  collection: Collection;
  isPinnable: boolean;
}) {
  const initFormState = {
    success: false,
    message: "",
    // isPinned: collection.pinned,
  };

  const [formState, formAction] = useFormState(
    toggleCollectionPin.bind(null, collection.id),
    initFormState,
  );

  return (
    <form className="btn btn-ghost" action={formAction}>
      <ButtonSubmit
        className="flex justify-between"
        name="pin"
        value="pin"
        disabled={isPinnable}
      >
        <span>{formState?.isPinned ? "Unpin" : "Pin"}</span>
        <Pin />
      </ButtonSubmit>
    </form>
  );
}
