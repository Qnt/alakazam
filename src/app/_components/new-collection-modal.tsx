"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useFormState } from "react-dom";
import { createCollection, type FormState } from "../actions";

const NewCollectionModal = forwardRef<HTMLDialogElement>((props, dialogRef) => {
  const initFormState: FormState = { success: false, message: "" };
  const [formState, formAction] = useFormState(createCollection, initFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const innerDialogRef = useRef<HTMLDialogElement>(null);
  useImperativeHandle(dialogRef, () => innerDialogRef.current!, []);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      innerDialogRef.current?.close();
    }
  }, [formState]);

  return (
    <dialog
      id="form_modal"
      className="modal modal-bottom sm:modal-middle"
      ref={innerDialogRef}
    >
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form className="form-control gap-4" action={formAction} ref={formRef}>
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
          <button type="submit" className="btn btn-primary">
            Создать
          </button>
        </form>
      </div>
    </dialog>
  );
});

export default NewCollectionModal;
