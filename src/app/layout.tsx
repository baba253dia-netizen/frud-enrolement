import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FRUD - Enrôlement",
  description: "Application d'enrôlement FRUD-Espoir Mauritanie",
  manifest: "/manifest.json",
  themeColor: "#0047AB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}
