import type { Metadata } from "next";
import { Raleway, Oswald } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KinetiKx Venture Studios",
  description:
    "A Dubai-based venture studio building the next generation of GCC tech leaders. Founder + Studio = Dragon.",
  metadataBase: new URL("https://kinetikx.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
