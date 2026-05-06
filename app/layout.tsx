import type { Metadata } from "next";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Showroom Interativo",
  description: "Landing page com showroom interativo para decoração residencial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-[family-name:var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
