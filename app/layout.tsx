import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Borogodó Bar & Restaurante | Gastronomia Brasileira em Porto Ferreira",
  description:
    "Restaurante em Porto Ferreira com música ao vivo, gastronomia brasileira, drinks especiais, arte, murais e experiências autênticas.",
  keywords: [
    "Restaurante em Porto Ferreira",
    "Melhor bar Porto Ferreira",
    "Música ao vivo Porto Ferreira",
    "Gastronomia brasileira Porto Ferreira",
    "Borogodó Bar e Restaurante",
  ],
  openGraph: {
    title: "Borogodó Bar & Restaurante",
    description: "Arte, sabor e tradição brasileira em um só lugar, no coração de Porto Ferreira.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
