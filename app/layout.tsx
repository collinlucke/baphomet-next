import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

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
      <body
        className="antialiased w-full overflow-x-hidden"
        suppressHydrationWarning
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
