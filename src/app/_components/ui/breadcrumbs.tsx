import clsx from "clsx";
import Link from "next/link";
import { type ReactNode } from "react";

type Breadcrumb = {
  label: string | ReactNode;
  href: string;
  active: boolean;
};

type BreadcrumbsProps = Breadcrumb[];

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbsProps;
}) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {breadcrumbs.map((b, i) => {
          if (i === breadcrumbs.length - 1) {
            return (
              <li key={b.href} className="font-bold">
                <span>{b.label}</span>
              </li>
            );
          }
          return (
            <li key={b.href}>
              <Link
                href={b.href}
                className={clsx("link-hover", "link", b.active && "font-bold")}
              >
                {b.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
