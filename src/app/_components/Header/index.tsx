import { useTranslations } from "next-intl"
import { IoMoon, IoMoonOutline } from "react-icons/io5"

export default function Header() {
  const t = useTranslations('HomePage')
  return(
    <header className="flex flex-row justify-between w-full items-center">
        <h1 className="text-2xl font-bold">{t('pageTitle')}</h1>
      <div className="flex flex-row gap-4 items-center">
        <IoMoonOutline size={25}/>
        <input type="text" placeholder={t('searchPlaceholder')} className="outline-none focus:outline-none text-black px-2 py-1 rounded-lg"/>
      </div>
    </header>
  )
}