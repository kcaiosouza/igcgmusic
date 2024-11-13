import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Player from "@/components/Player";
import NavBar from "@/components/NavBar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IGCGMusic | Streaming de hinos",
  description: "IGCGMusic é a plataforma ideal para quem ama desfrutar dos hinos! Ouça suas faixas favoritas, crie playlists personalizadas, acesse letras e cifras dos hinos. Aproveite planos exclusivos para uma experiência única.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <main className="flex overflow-hidden bg-[#5B6143]">
            <NavBar/>
            <section className="flex w-full flex-col relative h-[99.15dvh] overflow-hidden my-1 rounded-l-[20px]">
              {children}
              <Player/>
            </section>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
