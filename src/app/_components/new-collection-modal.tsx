"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createCollection, type FormState } from "../actions";

export type CollectionModalProps = {
  resetKey: () => void;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary" disabled={pending}>
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <span>Создать</span>
      )}
    </button>
  );
};

const NewCollectionModal = forwardRef<HTMLDialogElement, CollectionModalProps>(
  ({ resetKey }, dialogRef) => {
    const initFormState: FormState = { success: false, message: "" };
    const [formState, formAction] = useFormState(
      createCollection,
      initFormState,
    );
    const innerDialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(dialogRef, () => innerDialogRef.current!, []);

    useEffect(() => {
      if (formState.success) {
        innerDialogRef.current?.close();
        resetKey();
      }
    }, [formState]);

    return (
      <dialog
        id="form_modal"
        className="modal modal-bottom sm:modal-middle"
        ref={innerDialogRef}
      >
        <div className="modal-box">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={() => {
              innerDialogRef.current?.close();
              resetKey();
            }}
          >
            ✕
          </button>
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
            <SubmitButton />
          </form>
        </div>
      </dialog>
    );
  },
);

export default NewCollectionModal;
