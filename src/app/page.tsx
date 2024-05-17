import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import CollectionList from "./_components/collection-list";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="p-4">
      <SignedOut>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Алаказам</h1>
              <p className="py-6">
                Приложение для эффективного запоминания и повторения на основе
                флэш-карточек
              </p>
              <SignInButton>
                <button className="btn btn-primary">Войти</button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <CollectionList />
      </SignedIn>
    </main>
  );
}
