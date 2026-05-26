import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Negrín Aljamón · Tradición que se siente",
  description:
    "Jamón ibérico de bellota con más de 70 años de tradición. Excelencia artesanal de la Sierra de Huelva.",
  metadataBase: new URL("https://negrinjamon.vercel.app"),
  openGraph: {
    title: "Negrín Aljamón · Tradición que se siente",
    description: "Jamón ibérico de bellota con más de 70 años de tradición.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F0A06",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${inter.variable} antialiased grain`}>
        {children}
      </body>
    </html>
  );
}
