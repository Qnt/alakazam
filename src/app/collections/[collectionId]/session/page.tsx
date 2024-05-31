import SessionCard from "~/app/_components/session-card";
import { getCardsForSession, getCurrentSession } from "~/server/queries";

export default async function SessionPage({
  params,
}: {
  params: { collectionId: string };
}) {
  const currentSession = await getCurrentSession(params.collectionId);
  const cards = await getCardsForSession(params.collectionId, currentSession);

  return (
    <div className="flex h-full flex-col">
      <SessionCard card={cards[0]!} />
    </div>
  );
}
