import Link from "next/link";
import { type ReactNode } from "react";
import TopNav from "./topnav";

export default function Drawer({ children }: { children: ReactNode }) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <TopNav />
        <main className="px-4 py-2">{children}</main>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4">
          <li>
            <Link href="/home/">Home</Link>
          </li>
          <li>
            <Link href="/collections">Collections</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
