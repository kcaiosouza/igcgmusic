import '@/styles/globals.css'
import { Rubik } from 'next/font/google'

import { Nav } from '@/components/Nav'
import { Player } from '@/components/Player'
import { PlayerContextProvider, usePlayer } from '@/contexts/playerContext'

const rubik = Rubik({ subsets: ['latin'] })
export default function App({ Component, pageProps }) {
  const {isPlaying} = usePlayer();
  return (
    <>
      <PlayerContextProvider>
        <main className={`appContainer ${isPlaying ? "bg-[#2E2E20]" : "bg-[#5B6143]"} ${rubik.className}`}>
          <Nav page={Component}/>
          <Player/>
          <Component {...pageProps} isDark={true}/>
        </main>
      </PlayerContextProvider>
    </>
  )
}
