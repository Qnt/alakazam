import Link from "next/link";
import { type Card } from "prisma/generated/zod";

export default function CardCard({ card }: { card: Card }) {
  return (
    <Link
      href={`/cards/${card.id}`}
      className="cursor-pointer focus:rounded-2xl"
    >
      <div className="card card-compact h-full w-full bg-base-200 text-neutral-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{card.question}</h2>
          <p>{card.answer}</p>
        </div>
      </div>
    </Link>
  );
}
