import '@/styles/globals.css'
import { Rubik } from 'next/font/google'

import { Nav } from '@/components/Nav'
import { Player } from '@/components/Player'
import { PlayerContextProvider } from '@/contexts/playerContext'
import { ThemeContextProvider } from '@/contexts/themeContext'
import { AuthContextProvider } from '@/contexts/authContext'

const rubik = Rubik({ subsets: ['latin'] })
export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <PlayerContextProvider>
          <ThemeContextProvider>
            <main className={`appContainer bg-greenPlaying ${rubik.className}`}>
              <Nav page={Component}/>
              <Player/>
              <Component {...pageProps} />
            </main>
          </ThemeContextProvider>
        </PlayerContextProvider>
      </AuthContextProvider>
    </>
  )
}
