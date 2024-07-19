"use client";

import { type Card } from "prisma/generated/zod";

export default function SessionCard({ card }: { card: Card }) {
  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.firstElementChild?.classList.toggle("rotate-y-180");
  };

  return (
    <div
      className="perspective-750 relative h-80 w-full"
      onClick={(event) => handleCardClick(event)}
    >
      <div className="transform-style-3d relative transition-transform duration-700">
        <div className="backface-hidden card absolute h-80 w-full bg-base-200 shadow-md">
          <div className="card-body items-center">
            <h2 className="card-title h-full flex-grow text-balance text-center">
              {card.question}
            </h2>
            <p className="text-center text-sm opacity-50">
              Tap to show the answer
            </p>
          </div>
        </div>
        <div className="backface-hidden rotate-y-180 card absolute h-80 w-full bg-base-200 shadow-md">
          <div className="card-body">
            <p className="text-pretty">{card.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
