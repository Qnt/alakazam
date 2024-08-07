"use client";

import Link from "next/link";
import { type Card, type Collection } from "prisma/generated/zod";
import { useEffect, useState } from "react";
import { demoteCard, nextSession, promoteCard } from "~/server/queries";
import SessionCard from "./session-card";

export default function SessionList({
  cards,
  collectionId,
}: {
  cards: Card[];
  collectionId: Collection["id"];
}) {
  const [card, setCard] = useState<Card | undefined>(cards[0]);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setCard(cards[0]);
  }, [cards]);

  const showNextCard = () => {
    if (card) {
      const nextCard = cards[cards.indexOf(card) + 1];
      if (nextCard) {
        setCard(nextCard);
      } else {
        setCard(undefined);
      }
    }
  };

  const sessionEndText =
    cards.length === 0
      ? "There are no cards for this session"
      : "Session complete";

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-10">
      {(cards.length === 0 || !card) && (
        <>
          <h2 className="text-center">{sessionEndText}</h2>
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/collections/${collectionId}`} className="btn">
              Back to collection
            </Link>
            <button
              className="btn btn-primary"
              disabled={isPending}
              onClick={async () => {
                setPending(true);
                await nextSession(collectionId);
                setPending(false);
              }}
            >
              Next session
            </button>
          </div>
        </>
      )}
      {cards.length > 0 && card && (
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
