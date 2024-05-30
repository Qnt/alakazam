import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Hero from "./_components/hero";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <Hero />
      </SignedOut>
      <SignedIn>
        <nav>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/overview" className="btn btn-ghost text-base">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/collections" className="btn btn-ghost text-base">
                Collections
              </Link>
            </li>
          </ul>
        </nav>
      </SignedIn>
    </>
  );
}
