import styles from '@/styles/Index.module.css'
import { Rubik } from 'next/font/google'
import { IoSearch } from "react-icons/io5";
import { FaRegMoon, FaMoon } from "react-icons/fa";
import { FaPlay, FaRegHeart, FaHeart } from "react-icons/fa6";
import Link from 'next/link';
import { api } from '@/services/api';
import { convertSecondsToString } from '@/utils/convertSecondsToString';
import Image from 'next/image';
import { usePlayer } from '@/contexts/playerContext';
import { useTheme } from '@/contexts/themeContext';
import { useAuth } from '@/contexts/authContext';
import { useEffect, useState } from 'react';

const rubik = Rubik({ subsets: ['latin'] })

export default function Home({musics, authors}) {
  const { playList, musicList, currentMusicIndex, isPlaying } = usePlayer();
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  const [authorsRandom, setAuthorsRandom] = useState([...authors])
  const [musicsRandom, setMusicsRandom] = useState([...musics])

  useEffect(() => {
    let tempAuthorsRandom = [...authors]
    for (let i = tempAuthorsRandom.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempAuthorsRandom[i], tempAuthorsRandom[j]] = [tempAuthorsRandom[j], tempAuthorsRandom[i]];
    }
    setAuthorsRandom(tempAuthorsRandom)

    let tempMusicsRandom = [...musics]
    for (let i = tempMusicsRandom.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempMusicsRandom[i], tempMusicsRandom[j]] = [tempMusicsRandom[j], tempMusicsRandom[i]];
    }
    setMusicsRandom(tempMusicsRandom)
  }, [])

  return (
    <main className={`${styles.indexContainer} ${musicList.length > 0 ? "h-[calc(100vh-6px)] rounded-tl-[30px] rounded-bl-[30px]" : "h-screen"} ${rubik.className} ${isDark ? "bg-[#151515]" : "bg-[#FCFCFF]"}`}>
      <header className={styles.mainHeader}>
        <h1 className={`${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"} `}>Início</h1>
        <div className='flex items-center'>
          {isDark ? <FaMoon onClick={toggleTheme} className='mr-3 cursor-pointer' color='#FCFCFF'/> : <FaRegMoon onClick={toggleTheme} className='mr-3 cursor-pointer'/>}
          <div className={styles.inputUser}>
            <input className={styles.input} placeholder='Pesquisar...'/>
            <IoSearch color='#2D2E375d'/>
          </div>
        </div>
      </header>

      <div className={styles.mainGrid}>
        <div className={`${styles.bannerIndex} bg-[url('/banner.gif')]`}/>

        <div className='pr-14 flex flex-col gap-2'>
          <span className={`text-[23px] font-semibold ${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"}`}>Artistas Recomendados</span>
          <table className='w-full'>
            <tbody>
              {(authorsRandom.slice(0,3)).map((author) =>{
                return (
                  <tr key={author.id} className={`${styles.lineTableMusics} h-[82px]`}>
                      <td style={{width: 72}}>
                        <Image 
                          width={120}
                          height={120}
                          src={author.image_url}
                          alt={author.name}
                          className='object-cover rounded-lg shadow-lg'
                          
                        />
                      </td>
                      <td>
                        <div className='flex flex-col pl-5'>
                          <Link href={`/author/${author.id}`} className={`text-[18px] ${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"} font-bold leading-[15px]`}>{author.name}</Link>
                        </div>
                        
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className='px-14 flex flex-col gap-2'>
          <div className='w-full flex flex-row items-center justify-between'>
            <span className={`text-[23px] font-semibold ${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"}`}>10 Recomendações</span>
            <span className={`text-[16px] font-medium cursor-pointer no-underline ${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"} hover:underline transition-all`} onClick={() => playList(musicsRandom, 0)}>Tocar Todas</span>
          </div>
          <table className='w-full'>
            <tbody>
              {(musicsRandom.slice(0,10)).map((music, index) =>{
                return (
                  <tr key={music.id} className={`${styles.lineTableMusics} h-[82px]`}>
                      <td style={{width: 72, position: 'relative'}}>
                        <div className={styles.hoverThumb}>
                          {currentMusicIndex == index && isPlaying ? 
                            <div className={`${styles.topThumbButtons} shadow-lg`}>
                              <div className={styles.bar1}/>
                              <div className={styles.bar2}/>
                              <div className={styles.bar3} />
                            </div> :
                            <FaPlay
                            size={21}
                            color='#fff'
                            className='cursor-pointer drop-shadow-[0_5px_5px_rgba(255,255,255,0.3)]'
                            onClick={() => playList(musicsRandom, index)}
                            /> } 
                        </div>
                        <Image 
                          width={120}
                          height={120}
                          src={music.album.image_url}
                          alt={music.title}
                          className='object-cover rounded-lg shadow-lg'
                          
                        />
                      </td>
                      <td>
                        <div className='flex flex-col pl-5'>
                          <Link href={`/music/${music.slug}`} className={`text-[18px] ${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"} font-bold leading-[15px]`}>{music.title}</Link>
                          <span className={`font-medium text-[12px] ${isDark ? "text-[rgba(255,255,255,0.6)]" : "text-[rgba(0,0,0,0.6)]"}`}><Link href={`/author/${music.artist.slug}`}>{music.artist.name}</Link> • <Link href={`/album/${music.album.slug}`}>{music.album.title}</Link></span>
                        </div>
                        
                      </td>
                      <td className={`w-[50px] h-[72px] font-bold ${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"}`}>{music.time_as_string}</td>
                      <td className='w-[50px] h-[72px] text-end'>
                        <button type="button" onClick={() => {console.log("liked")}}>
                          {isDark ? <FaRegHeart color='#FCFCFF' size={20}/> : <FaRegHeart color='#2D2E37' size={20}/>}
                        </button>
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div>
          <span>PLAYLISTS</span>
        </div>
      </div>
    </main>
  )
}

export const getStaticProps = async () => {
  const { data : musicData } = await api.get('songs/all')
  const { data : authorData } = await api.get('artists')
  // const { data : musicPlaylist } = await api.get('')

  const musics = musicData.map(music => {
    return music
  })

  const authors = authorData.map(author => {
    return {
      id: author.id,
      name: author.name,
      image_url: author.image_url,
    }
  })


  return {
      props: {
        musics,
        authors
      },
      revalidate: 60 * 60 * 8,
  }
}