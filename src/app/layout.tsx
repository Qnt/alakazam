import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import TopNav from "./_components/topnav";

export const metadata: Metadata = {
  title: "Alakazam",
  description: "Magic learning cards",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TopNav />
          <main className="p-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
