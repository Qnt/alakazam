import { type Collection } from "prisma/generated/zod";
import SessionList from "~/app/_components/session-list";
import { getCardsForSession, getCurrentSession } from "~/server/queries";

export default async function SessionPage({
  params,
}: {
  params: { collectionId: Collection["id"] };
}) {
  const session = await getCurrentSession(params.collectionId);
  const cards = await getCardsForSession(params.collectionId, session);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-semibold">{`Session #${session}`}</h2>
      {cards && (
        <SessionList cards={cards} collectionId={params.collectionId} />
      )}
    </div>
  );
}
