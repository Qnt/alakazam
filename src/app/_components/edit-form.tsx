"use client";

import Link from "next/link";
import { type Collection } from "prisma/generated/zod";
import { useFormState } from "react-dom";
import { updateCollection, type CollectionFormState } from "~/server/queries";
import ButtonSubmit from "./ui/button-submit";

export default function EditForm({ collection }: { collection: Collection }) {
  const initFormState: CollectionFormState = { success: false, message: "" };
  const [formState, formAction] = useFormState(
    updateCollection.bind(null, collection.id),
    initFormState,
  );

  return (
    <form className="form-control gap-4" action={formAction}>
      <div>
        {formState.message && (
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500" key={formState.message}>
              {formState.message}
            </p>
          </div>
        )}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Collection"
            className="input input-bordered w-full"
            name="name"
            aria-describedby="user-error"
            defaultValue={collection.name}
          />
        </label>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {formState?.errors?.name?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description (optional)</span>
          </div>
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered w-full"
            name="description"
            defaultValue={collection.description ?? ""}
          />
        </label>
      </div>
      <ButtonSubmit className="btn btn-primary">Save</ButtonSubmit>
      <Link className="btn btn-ghost" href={`/collections/${collection.id}`}>
        Cancel
      </Link>
    </form>
  );
}
