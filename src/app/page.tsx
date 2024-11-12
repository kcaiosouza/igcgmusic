import Image from "next/image";
import { useTranslations } from 'next-intl';
import { getLocale } from "next-intl/server";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className="overflow-auto flex flex-col items-center w-full gap-16 p-80">
      <main className="flex flex-col gap-8">
        <h1>{t('title')}</h1>
        <span>{getLocale()}</span>
      </main>
    </div>
  );
}
