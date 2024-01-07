import '@/styles/globals.css'
import { Rubik } from 'next/font/google'

import { Nav } from '@/components/Nav'
import { Player } from '@/components/Player'

const rubik = Rubik({ subsets: ['latin'] })
export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={`appContainer bg-[#2E2E20] ${rubik.className}`}>
        <Nav page={Component}/>
        <Player/>
        <Component {...pageProps} isDark={true}/>
      </main>
    </>
  )
}
