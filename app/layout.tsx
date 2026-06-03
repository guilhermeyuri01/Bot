import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mikan Sushi | Sushi premium em Porto Ferreira, SP",
  description:
    "Mikan Sushi em Porto Ferreira: sushi premium, temaki artesanal, poke, combinados e delivery japonês na Av. Eng. Nicolau De V. Forjaz, 1351.",
  keywords: [
    "sushi Porto Ferreira",
    "temaki Porto Ferreira",
    "delivery japonês Porto Ferreira",
    "Mikan Sushi",
    "combinados Porto Ferreira",
    "poke Porto Ferreira",
  ],
  openGraph: {
    title: "Mikan Sushi | Porto Ferreira, SP",
    description:
      "Restaurante japonês premium em Porto Ferreira com sushi, temaki, poke, combinados e delivery.",
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
