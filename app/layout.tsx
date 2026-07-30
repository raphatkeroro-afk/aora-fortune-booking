import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aora Fortune Booking",
  description: "LINE OA fortune booking demo for Aora Fortune Booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
