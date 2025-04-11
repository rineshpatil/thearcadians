import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Arcadians - Google Cloud Arcade Participants",
  description: "A website for Google Cloud Arcade Participants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
