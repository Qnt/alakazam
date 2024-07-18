"use client";

import { Home, Library } from "lucide-react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import TopNav from "./topnav";

export default function Drawer({ children }: { children: ReactNode }) {
  const drawerInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    drawerInputRef.current?.click();
  };

  return (
    <div className="drawer grow">
      <input
        id="drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerInputRef}
      />
      <div className="drawer-content flex flex-col">
        <TopNav />
        <main className="grow p-4">{children}</main>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu min-h-full w-80 bg-base-200 p-4">
          <ul onClick={handleClick}>
            <li>
              <Link href="/dashboard">
                <Home />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/collections">
                <Library />
                <span>Collections</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
