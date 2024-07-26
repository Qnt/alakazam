import { BoxSchema, type Collection } from "prisma/generated/zod";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { createCard, type CardFormState } from "~/server/queries";
import ButtonSubmit from "./ui/button-submit";

export type CardModalProps = {
  collectionId: Collection["id"];
  resetKey: () => void;
  toggleDialog: () => void;
};

export default function CardForm({
  collectionId,
  resetKey,
  toggleDialog,
}: CardModalProps) {
  const initFormState: CardFormState = { success: false, message: "" };
  const [formState, formAction] = useFormState(
    createCard.bind(null, collectionId),
    initFormState,
  );
  useEffect(() => {
    if (formState.success) {
      resetKey();
      toggleDialog();
    }
  }, [formState, resetKey, toggleDialog]);

  return (
    <div className="modal-box">
      <h2 className="text-lg font-semibold">New Card</h2>
      <form className="form-control gap-4" action={formAction}>
        <div>
          {!formState.success && (
            <p className="text-sm text-error">{formState.message}</p>
          )}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Question</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Question"
              name="question"
              aria-describedby="user-error"
            ></textarea>
          </label>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
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
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Answer"
              name="answer"
              aria-describedby="user-error"
            ></textarea>
          </label>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
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
              className="select select-bordered w-full lowercase"
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
          <ButtonSubmit className="btn btn-primary">Create</ButtonSubmit>
          <button
            className="btn btn-ghost"
            onClick={() => {
              resetKey();
              toggleDialog();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
