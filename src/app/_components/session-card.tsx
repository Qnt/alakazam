import { type Card } from "prisma/generated/zod";
import ButtonSubmit from "./ui/button-submit";

export default function SessionCard({ card }: { card: Card }) {
  return (
    <div className="mt-[24vh] flex flex-col items-center gap-2">
      <div className="card card-compact h-full w-full bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{card.question}</h2>
        </div>
      </div>
      <form className="grid grid-cols-2 gap-2">
        <ButtonSubmit className="btn btn-error text-base text-error-content">
          <span>I don&apos;t know 😐</span>
        </ButtonSubmit>
        <ButtonSubmit className="btn btn-success text-base text-success-content">
          <span>I know 🤩</span>
        </ButtonSubmit>
      </form>
    </div>
  );
}
