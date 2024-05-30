import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className="navbar sticky top-0 z-30 bg-base-200">
      <SignedIn>
        <div className="flex-none lg:hidden">
          <label
            htmlFor="drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </SignedIn>
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost font-logo text-xl font-normal uppercase"
        >
          Alakazam
        </Link>
      </div>

      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/home/">Home</Link>
          </li>
          <li>
            <Link href="/collections">Collections</Link>
          </li>
        </ul>
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
    </div>
  );
}
