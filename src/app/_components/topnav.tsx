import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Alakazam
        </Link>
      </div>

      <div className="flex-none">
        <div>
          <SignedOut>
            <SignInButton>
              <button>Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
