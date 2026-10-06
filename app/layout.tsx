import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Wamambo Motors ZW | Premium Vehicle Sales",
  description: "A premium automotive showroom demo concept for Wamambo Motors ZW.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
