"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { editCollection, type FormState } from "~/server/actions";
import ButtonSubmit from "./ui/button-submit";

export default function EditForm({ id }: { id: number }) {
  const initFormState: FormState = { success: false, message: "" };
  const [formState, formAction] = useFormState(
    editCollection.bind(null, id),
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
            <span className="label-text">Название</span>
          </div>
          <input
            type="text"
            placeholder="Коллекция"
            className="input input-bordered w-full"
            name="name"
            aria-describedby="user-error"
            autoFocus
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
            <span className="label-text">Описание (опционально)</span>
          </div>
          <input
            type="text"
            placeholder="Описание"
            className="input input-bordered w-full"
            name="description"
          />
        </label>
      </div>
      <ButtonSubmit className="btn btn-primary">Сохранить</ButtonSubmit>
      <Link className="btn btn-ghost" href={`/collections/${id}`}>
        Отмена
      </Link>
    </form>
  );
}
