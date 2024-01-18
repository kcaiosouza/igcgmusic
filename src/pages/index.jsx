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

const rubik = Rubik({ subsets: ['latin'] })

export default function Home({musics}) {
  const { playList, musicList, currentMusicIndex, isPlaying } = usePlayer();
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
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

        <div>
          <span>TOP ARTISTAS</span>
        </div>

        <div className='px-14 flex flex-col gap-2'>
          <span className={`text-[21px] font-semibold ${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"}`}>10 Recomendações</span>
          <table className='w-full'>
            <tbody>
              {musics.map((music, index) =>{
                return (
                  <tr key={music.id} className={`${styles.lineTableMusics} h-[83px]`}>
                      <td style={{width: 72}}>
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
                            onClick={() => playList(musics, index)}
                            /> } 
                        </div>
                        <Image 
                          width={120}
                          height={120}
                          src={music.album_image}
                          alt={music.name}
                          className='object-cover rounded-lg shadow-lg'
                          
                        />
                      </td>
                      <td>
                        <div className='flex flex-col pl-5'>
                          <Link href={`/music/${music.id}`} className={`text-[18px] ${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"} font-bold leading-[15px]`}>{music.name}</Link>
                          <span className={`font-medium text-[12px] ${isDark ? "text-[rgba(255,255,255,0.6)]" : "text-[rgba(0,0,0,0.6)]"}`}><Link href={`/author/${music.author_id}`}>{music.author_name}</Link> • <Link href={`/album/${music.album_id}`}>{music.album_name}</Link></span>
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
  const { data } = await api.get('music/all')

  const musics = data.map(music => {
    return {
      id: music.id,
      album_id: music.album_id,
      album_name: music.album_name,
      album_image: music.album_image,
      name: music.name,
      author_id: music.author_id,
      author_name: music.author_name,
      file_url: music.file_url,
      time: music.time,
      lyrics: music.lyrics,
      chords: music.chords,
      language: music.language,
      time_as_string: (convertSecondsToString(Number(music.time))).startsWith("00:") ? convertSecondsToString(Number(music.time)).slice(3) : convertSecondsToString(Number(music.time)),
    }
  })

  return {
      props: {
        musics,
      },
      revalidate: 60 * 60 * 8,
  }
}