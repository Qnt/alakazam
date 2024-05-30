"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs({
  customLabel,
  capitalizeLabel = true,
}: {
  customLabel?: string;
  capitalizeLabel?: boolean;
}) {
  const pathname = usePathname();
  const pathnameWithoutQuery = pathname.split("?")[0]!;
  const segments = pathnameWithoutQuery.split("/").filter((s) => s !== "");
  if (capitalizeLabel) {
    segments.map((s) => `${s[0]?.toUpperCase()}${s.slice(1)}`);
  }

  return (
    <nav className="breadcrumbs text-sm">
      <ol>
        <li>
          <Link href="/">
            <Home />
          </Link>
        </li>
        {segments.map((s, i) => {
          const href = `/${segments.slice(0, i + 1).join("/")}`;
          let label = capitalizeLabel
            ? `${segments[i]?.at(0)?.toUpperCase()}${segments[i]?.slice(1)}`
            : segments[i];
          if (customLabel && i === segments.length - 1) {
            label = customLabel;
          }
          // capitalizeLabel ?
          return (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
