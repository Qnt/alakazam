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
          <ul>
            <li>
              <Link href="/collections">Collections</Link>
            </li>
          </ul>
        </nav>
      </SignedIn>
    </>
  );
}
