import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Lilita_One } from "next/font/google";
import Drawer from "./_components/drawer";
import Footer from "./_components/footer";

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
      <html
        lang="en"
        className={`${GeistSans.variable} ${lilitaOne.variable}`}
        suppressHydrationWarning
      >
        <body className="flex min-h-screen flex-col">
          <ThemeProvider enableSystem={false}>
            <Drawer>{children}</Drawer>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
