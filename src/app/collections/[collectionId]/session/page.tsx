"use client";

import { type Card } from "prisma/generated/zod";
import { useState } from "react";
import SessionList from "~/app/_components/session-list";
import { getCardsForSession, getCurrentSession } from "~/server/queries";

export default function SessionPage({
  params,
}: {
  params: { collectionId: string };
}) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>();

  return (
    <div className="flex h-full flex-col items-center">
      {cards.length > 0 && isStarted && <SessionList cards={cards} />}
      {!isStarted && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={async () => {
            const session = await getCurrentSession(params.collectionId);
            const cards = await getCardsForSession(
              params.collectionId,
              session,
            );
            setCards(cards);
            setIsStarted(true);
          }}
        >
          Start session
        </button>
      )}
    </div>
  );
}
