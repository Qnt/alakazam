import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cards = await db.card.findMany();
  return (
    <main>
      {cards.map((card) => {
        return <div key={card.id}>{card.question}</div>;
      })}
    </main>
  );
}
