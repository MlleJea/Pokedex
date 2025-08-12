import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Un Pokédex pour tous vos Pokémon préférés !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
