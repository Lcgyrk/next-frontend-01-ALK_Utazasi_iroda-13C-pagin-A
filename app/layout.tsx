"use client";

import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useGlobalStore } from "@/store/globalStore";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { gs } = useGlobalStore();
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
        <nav className="flex w-full space-x-6 bg-gray-300 p-4">
          <h1 className="font-bold">ÁLK Utazási Iroda</h1>
          <Link className="cursor-pointer transition-transform hover:scale-110" href="/journeys">
            Kínálatunk
          </Link>
          <Link
            className="cursor-pointer transition-transform hover:scale-110"
            href="/registration"
          >
            Regisztráció
          </Link>
          <Link className="cursor-pointer transition-transform hover:scale-110" href="/pagination">
            Lapozás
          </Link>
        </nav>
        <main className="flex-1 overflow-y-auto bg-gray-200">{children}</main>
        <footer className="flex shrink-0 items-center justify-around border-t-2 p-3 text-lg">
          <p>Rekordok száma: {gs.numberOfRecords}</p>
          <p>
            Oldal: {gs.actualPage}. / {gs.numberOfPages}
          </p>
        </footer>
      </body>
    </html>
  );
}
