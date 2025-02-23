import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Odyssey",
  description: "Tagline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./icon.png" />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
