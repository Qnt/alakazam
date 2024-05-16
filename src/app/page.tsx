import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cards = await db.card.findMany();
  return (
    <main>
      <SignedOut>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Алаказам</h1>
              <p className="py-6">
                Приложение для эффективного запоминания и повторения на основе
                флэш-карточек
              </p>
              <SignInButton className="btn btn-primary">Войти</SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        {cards.map((card) => {
          return <div key={card.id}>{card.question}</div>;
        })}
      </SignedIn>
    </main>
  );
}
