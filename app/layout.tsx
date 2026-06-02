import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Borogodó Bar & Restaurante | Porto Ferreira, SP",
  description:
    "Borogodó Bar & Restaurante em Porto Ferreira: gastronomia brasileira, bar com música ao vivo, drinks artesanais e ambiente artístico sofisticado.",
  keywords: [
    "restaurante Porto Ferreira",
    "bar Porto Ferreira",
    "música ao vivo Porto Ferreira",
    "gastronomia brasileira Porto Ferreira",
    "Borogodó Bar e Restaurante",
  ],
  openGraph: {
    title: "Borogodó Bar & Restaurante",
    description: "Restaurante brasileiro premium em Porto Ferreira com música ao vivo, murais artísticos e drinks artesanais.",
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
