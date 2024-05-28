import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="p-4">
      <SignedOut>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Alakazam</h1>
              <p className="py-6">
                Flash card based application for effective memorization and
                repetition
              </p>
              <SignInButton>
                <button className="btn btn-primary">Sign In</button>
              </SignInButton>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <nav>
          <ul>
            <li>
              <Link href="/collections">Collections</Link>
            </li>
          </ul>
        </nav>
      </SignedIn>
    </main>
  );
}
