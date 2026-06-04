import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Experiência. Redefinida. | Premium Product Showcase",
  description:
    "Showcase de produto ultra-premium com estética minimalista, fundo preto, tipografia ampla e experiência cinematográfica de scroll.",
  openGraph: {
    title: "Experiência. Redefinida.",
    description: "Design que você sente antes de entender.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
