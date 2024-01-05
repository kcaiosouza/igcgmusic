import '@/styles/globals.css'

import { Nav } from '@/components/Nav'

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className="appContainer">
        <Nav page={Component}/>
        <Component {...pageProps} />
      </main>
    </>
  )
}
