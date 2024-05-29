import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="navbar bg-base-200">
      <div className="flex-1">
        <Link
          href="/"
          className="font-logo btn btn-ghost text-xl font-normal uppercase"
        >
          Alakazam
        </Link>
      </div>

      <div className="flex-none">
        <div>
          <SignedOut>
            <SignInButton>
              <button className="btn btn-primary btn-sm">Sign In</button>
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
