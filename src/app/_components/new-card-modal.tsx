"use client";

import { BoxSchema, type Collection } from "prisma/generated/zod";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal, useFormState } from "react-dom";
import { createCard, type CardFormState } from "~/server/queries";
import ButtonSubmit from "./ui/button-submit";

export type CardModalProps = {
  collectionId: Collection["id"];
  resetKey: () => void;
};

const NewCardModal = forwardRef<HTMLDialogElement, CardModalProps>(
  function NewCardModal({ collectionId, resetKey }, dialogRef) {
    const [isMounted, setMounted] = useState(false);
    const initFormState: CardFormState = { success: false, message: "" };
    const [formState, formAction] = useFormState(
      createCard.bind(null, collectionId),
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

    console.log(formState);
    return (
      <>
        {isMounted &&
          createPortal(
            <dialog
              id="card_form_modal"
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
                <h2 className="text-lg font-semibold">New Card</h2>
                <form className="form-control gap-4" action={formAction}>
                  <div>
                    {!formState.success && <p>{formState.message}</p>}
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Question</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Question"
                        className="input input-bordered w-full"
                        name="question"
                        aria-describedby="user-error"
                        autoFocus
                      />
                    </label>
                    <div
                      id="customer-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {formState?.errors?.question?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                    </div>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Answer</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Answer"
                        className="input input-bordered w-full"
                        name="answer"
                        aria-describedby="user-error"
                      />
                    </label>
                    <div
                      id="customer-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {formState?.errors?.answer?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                    </div>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Box</span>
                      </div>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        name="box"
                        defaultValue={BoxSchema.Values.BEGINNER}
                      >
                        {Object.keys(BoxSchema.Values).map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
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
export default NewCardModal;
