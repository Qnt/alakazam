import { type Card } from "@prisma/client";
import Link from "next/link";

export default function CardCard({ card }: { card: Card }) {
  return (
    <Link
      href={`/collections/${card.id}`}
      className="cursor-pointer focus:rounded-2xl"
    >
      <div className="card card-compact h-full w-full bg-neutral text-neutral-content shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{card.question}</h2>
          <p>{card.answer}</p>
        </div>
      </div>
    </Link>
  );
}
