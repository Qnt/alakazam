"use client";

import { useFormState } from "react-dom";
import { FormState, createCollection } from "../actions";

export default function NewCollectionModal() {
  const initFormState: FormState = { message: null, errors: {} };
  const [formState, formAction] = useFormState(createCollection, initFormState);
  console.log(formState);
  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => {
          const dialog = document.getElementById(
            "my_modal",
          ) as HTMLDialogElement;
          return dialog.showModal();
        }}
      >
        Создать коллекцию
      </button>
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form className="form-control gap-4" action={formAction}>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Название</span>
                </div>
                <input
                  type="text"
                  placeholder="Коллекция"
                  className="input input-bordered w-full"
                  name="name"
                  // required
                  aria-describedby="user-error"
                />
              </label>
              <div id="customer-error" aria-live="polite" aria-atomic="true">
                {formState?.errors?.name &&
                  formState?.errors?.name.map((error: string) => (
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
            <button className="btn btn-primary" type="submit">
              Создать
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
