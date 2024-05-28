"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal, useFormState } from "react-dom";
import { createCollection, type CollectionFormState } from "~/server/queries";
import ButtonSubmit from "./ui/button-submit";

export type CollectionModalProps = {
  resetKey: () => void;
};

const NewCollectionModal = forwardRef<HTMLDialogElement, CollectionModalProps>(
  function NewCollectionModal({ resetKey }, dialogRef) {
    const [isMounted, setMounted] = useState(false);
    const initFormState: CollectionFormState = { success: false, message: "" };
    const [formState, formAction] = useFormState(
      createCollection,
      initFormState,
    );
    const innerDialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(dialogRef, () => innerDialogRef.current!, []);

    useEffect(() => {
      setMounted(true);
      if (formState.success) {
        innerDialogRef.current?.close();
        resetKey();
      }
    }, [formState, resetKey]);

    return (
      <>
        {isMounted &&
          createPortal(
            <dialog
              id="form_modal"
              className="modal modal-bottom sm:modal-middle"
              ref={dialogRef}
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
                <h2 className="text-lg font-semibold">New Collection</h2>
                <form className="form-control gap-4" action={formAction}>
                  {/* {!formState.success && <p>{formState.message}</p>} */}
                  <div>
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
                          Description (optional)
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Description"
                        className="input input-bordered w-full"
                        name="description"
                      />
                    </label>
                  </div>
                  <div className="flex-re flex flex-col gap-4 md:flex-row-reverse">
                    <ButtonSubmit className="btn btn-primary">
                      Create
                    </ButtonSubmit>
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        innerDialogRef.current?.close();
                        resetKey();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>,
            document.body,
          )}
      </>
    );
  },
);
export default NewCollectionModal;
