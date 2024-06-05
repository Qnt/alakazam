"use client";

import { type Card } from "prisma/generated/zod";
import { useState } from "react";
import { demoteCard, promoteCard } from "~/server/queries";
import SessionCard from "./session-card";

export default function SessionList({ cards }: { cards: Card[] }) {
  const [card, setCard] = useState<Card>(cards[0]!);
  const [IsLastCard, setLastCard] = useState(false);
  const [isPending, setPending] = useState(false);

  const showNextCard = () => {
    const nextCard = cards[cards.indexOf(card) + 1];
    if (nextCard) {
      setCard(nextCard);
    } else {
      setLastCard(true);
    }
  };

  return (
    <div className="mt-[24vh] flex w-full flex-col items-center gap-10 lg:max-w-xl">
      {IsLastCard ? (
        <p className="text-center">You have reached the end!</p>
      ) : (
        <>
          <SessionCard card={card} />
          <div className="grid w-full grid-cols-2 gap-2">
            <button
              disabled={isPending}
              className="btn btn-error text-base text-error-content"
              onClick={async () => {
                setPending(true);
                await demoteCard(card);
                showNextCard();
                setPending(false);
              }}
            >
              <span>👎</span>
            </button>
            <button
              disabled={isPending}
              className="btn btn-success text-base text-success-content"
              onClick={async () => {
                setPending(true);
                await promoteCard(card);
                showNextCard();
                setPending(false);
              }}
            >
              <span>👍</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
