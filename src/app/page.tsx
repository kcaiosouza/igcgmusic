import Image from "next/image";
import { useTranslations } from 'next-intl';
import { getLocale } from "next-intl/server";
import Header from "./_components/Header";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className="overflow-auto flex flex-col items-center w-full gap-16 bg-[var(--background)] h-full">
      <main className="flex flex-col gap-8 w-full px-12 py-3">
        <Header/>
        <span>{getLocale()}</span>
      </main>
    </div>
  );
}
