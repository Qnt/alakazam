import Link from "next/link";
import { type Card } from "prisma/generated/zod";

export default function CardCard({ card }: { card: Card }) {
  return (
    <div className="card card-compact h-full w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <Link href={`/cards/${card.id}`} className="link-hover link">
          <h2 className="card-title">{card.question}</h2>
        </Link>
        <p className="pb-4">{card.answer}</p>
        <div className="badge badge-outline lowercase">{card.box}</div>
      </div>
    </div>
  );
}
