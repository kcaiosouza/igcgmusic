import styles from '@/styles/Index.module.css'
import { Rubik } from 'next/font/google'
import { IoSearch } from "react-icons/io5";
import { FaRegMoon, FaMoon } from "react-icons/fa";

const rubik = Rubik({ subsets: ['latin'] })

export default function Settings({isDark}) {
  return (
    <main className={`${styles.indexContainer} ${rubik.className}`}>
      <header className={styles.mainHeader}>
        <h1 className='text-[#2D2E37]'>Configurações</h1>
        <div className='flex items-center'>
          {isDark ? <FaMoon/> : <FaRegMoon/>}
          <input/>
          <IoSearch/>
        </div>
      </header>
    </main>
  )
}
