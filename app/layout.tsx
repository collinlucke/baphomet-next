import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { Heading } from "@/components/Heading";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baphomet Next App",
  description: "Cuz I guess I'm supposed to learn Next.js or something",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased w-full`}>
        <Heading />
        {children}
      </body>
    </html>
  );
}
