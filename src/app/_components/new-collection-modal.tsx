"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal, useFormState } from "react-dom";
import { createCollection, type FormState } from "~/server/actions";
import ButtonSubmit from "./ui/button-submit";

export type CollectionModalProps = {
  resetKey: () => void;
};

const NewCollectionModal = forwardRef<HTMLDialogElement, CollectionModalProps>(
  function NewCollectionModal({ resetKey }, dialogRef) {
    const [mounted, setMounted] = useState(false);
    const initFormState: FormState = { success: false, message: "" };
    const [formState, formAction] = useFormState(
      createCollection,
      initFormState,
    );
    const innerDialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(dialogRef, () => innerDialogRef.current!, []);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (formState.success) {
        innerDialogRef.current?.close();
        resetKey();
      }
    }, [formState, resetKey]);

    return (
      <>
        {mounted &&
          createPortal(
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
                <h2 className="text-lg font-semibold">Новая коллекция</h2>
                <form className="form-control gap-4" action={formAction}>
                  {/* {!formState.success && <p>{formState.message}</p>} */}
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
                    <div
                      id="customer-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {formState?.errors?.name?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                    </div>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">
                          Описание (опционально)
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Описание"
                        className="input input-bordered w-full"
                        name="description"
                      />
                    </label>
                  </div>
                  <ButtonSubmit className="btn btn-primary">
                    Создать
                  </ButtonSubmit>
                </form>
              </div>
            </dialog>,
            document.body,
          )}
      </>
    );
  },
);
export default NewCollectionModal;
