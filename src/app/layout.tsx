import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Arcadians - Google Cloud Arcade Participants",
  description: "A website for Google Cloud Arcade Participants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="stars"></div>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="py-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} The Arcadians - Google Cloud Arcade Participants</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
