"use client"

import { ThemeService } from "@/services/theme"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { IoMoon, IoMoonOutline } from "react-icons/io5"

export default function Header() {
  const t = useTranslations('HomePage')
  const [theme, setTheme] = useState<'light' | 'dark' | null>();

  useEffect(() => {
    ThemeService.initializeTheme();
    
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, [])

  return(
    <header className="flex flex-row justify-between w-full items-center">
        <h1 className="text-2xl font-bold">{t('pageTitle')}</h1>
      <div className="flex flex-row gap-4 items-center">
        { theme == 'light' ? <IoMoonOutline size={25} className="cursor-pointer" onClick={() => {ThemeService.toggleTheme(); setTheme((theme == 'light' ? 'dark' : 'light'))}}/> : <IoMoon size={25} className="cursor-pointer" onClick={() => {ThemeService.toggleTheme(); setTheme((theme == 'dark' ? 'light' : 'dark'))}}/> }
        <input type="text" placeholder={t('searchPlaceholder')} className="outline-none focus:outline-none text-black px-2 py-1 rounded-lg"/>
      </div>
    </header>
  )
}