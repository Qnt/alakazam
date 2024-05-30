import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Lilita_One } from "next/font/google";
import Footer from "./_components/footer";
import TopNav from "./_components/topnav";

const lilitaOne = Lilita_One({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-lilita-one",
});

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
      <html lang="en" className={`${GeistSans.variable} ${lilitaOne.variable}`}>
        <body className="flex min-h-screen flex-col">
          <TopNav />
          <main className="px-4">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
