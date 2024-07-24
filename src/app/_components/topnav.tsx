import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeChanger from "./ui/theme-changer";

export default function TopNav() {
  return (
    <div className="navbar sticky top-0 z-30 bg-base-200">
      <SignedIn>
        <div className="flex-none md:hidden">
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
          href="/dashboard"
          className="btn btn-ghost font-logo text-xl font-normal uppercase"
        >
          Alakazam
        </Link>
      </div>
      <div className="hidden flex-none md:block">
        <ul className="menu menu-horizontal">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/collections">Collections</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <ThemeChanger />
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
  );
}
