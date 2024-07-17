"use client";

import Link from "next/link";
import { BoxSchema, type Card } from "prisma/generated/zod";
import { useFormState } from "react-dom";
import { updateCard, type CardFormState } from "~/server/queries";
import ButtonSubmit from "./ui/button-submit";

export default function CardEditForm({ card }: { card: Card }) {
  const initFormState: CardFormState = { success: false, message: "" };
  const [formState, formAction] = useFormState(
    updateCard.bind(null, card.id, card.collectionId),
    initFormState,
  );

  return (
    <form className="form-control mx-auto max-w-lg gap-4" action={formAction}>
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
            <span className="label-text">Question</span>
          </div>
          <input
            type="text"
            placeholder="Question"
            className="input input-bordered w-full"
            name="question"
            aria-describedby="user-error"
            defaultValue={card.question}
          />
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
            placeholder="Answer"
            className="textarea textarea-bordered w-full"
            name="answer"
            defaultValue={card.answer ?? ""}
          />
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
            className="select select-bordered w-full"
            defaultValue={card.box}
            name="box"
          >
            {Object.keys(BoxSchema.Values).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {formState?.errors?.box?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </label>
      </div>

      <ButtonSubmit className="btn btn-primary">Save</ButtonSubmit>
      <Link className="btn btn-ghost" href={`/cards/${card.id}`}>
        Cancel
      </Link>
    </form>
  );
}
