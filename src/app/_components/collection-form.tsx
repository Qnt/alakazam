import { useEffect } from "react";
import { useFormState } from "react-dom";
import { createCollection, type CollectionFormState } from "~/server/queries";
import ButtonSubmit from "./ui/button-submit";

type CollectionFormProps = {
  toggleDialog: () => void;
  resetKey: () => void;
};

export default function CollectionForm({
  toggleDialog,
  resetKey,
}: CollectionFormProps) {
  const initFormState: CollectionFormState = { success: false, message: "" };
  const [formState, formAction] = useFormState(createCollection, initFormState);

  useEffect(() => {
    if (formState.success) {
      toggleDialog();
      resetKey();
    }
  }, [formState, resetKey, toggleDialog]);

  return (
    <div className="modal-box">
      <h2 className="text-lg font-semibold">New Collection</h2>
      <form className="form-control gap-4" action={formAction}>
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
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Description"
              aria-describedby="user-error"
              name="description"
            ></textarea>
          </label>
        </div>
        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <ButtonSubmit className="btn btn-primary">Create</ButtonSubmit>
          <button
            type="button"
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
