import { type Card } from "prisma/generated/zod";

export default function SessionCard({ card }: { card: Card }) {
  return (
    <div className="card card-compact h-full w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{card.question}</h2>
        <details className="collapse">
          <summary className="collapse-title text-xl">Show answer</summary>
          <div className="collapse-content">
            <p>{card.answer}</p>
          </div>
        </details>
      </div>
    </div>
  );
}
