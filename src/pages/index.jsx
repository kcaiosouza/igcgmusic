import styles from '@/styles/Index.module.css'
import { Rubik } from 'next/font/google'
import { IoSearch } from "react-icons/io5";
import { FaRegMoon, FaMoon } from "react-icons/fa";
import Link from 'next/link';

const rubik = Rubik({ subsets: ['latin'] })

export default function Home({isDark}) {
  return (
    <main className={`${styles.indexContainer} ${rubik.className}`}>
      <header className={styles.mainHeader}>
        <h1 className='text-[#2D2E37]'>Início</h1>
        <div className='flex items-center'>
          {isDark ? <FaMoon/> : <FaRegMoon/>}
          <input/>
          <IoSearch/>
        </div>
      </header>

      <div className={styles.mainGrid}>
        <div>
          <img src='/banner.gif'/>
        </div>

        <div>
          <span>TOP ARTISTAS</span>
        </div>

        <div>
          <span>TOP 10 DE HOJE</span>
          <Link href="/playlist">TESTE PRA PROXIMA PAGINA</Link>
        </div>

        <div>
          <span>PLAYLISTS</span>
        </div>
      </div>
    </main>
  )
}
