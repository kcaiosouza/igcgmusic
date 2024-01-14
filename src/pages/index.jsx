import styles from '@/styles/Index.module.css'
import { Rubik } from 'next/font/google'
import { IoSearch } from "react-icons/io5";
import { FaRegMoon, FaMoon } from "react-icons/fa";
import Link from 'next/link';
import { api } from '@/services/api';
import { convertSecondsToString } from '@/utils/convertSecondsToString';
import Image from 'next/image';
import { usePlayer } from '@/contexts/playerContext';
import { useTheme } from '@/contexts/themeContext';

const rubik = Rubik({ subsets: ['latin'] })

export default function Home({musics}) {
  const { playList, musicList } = usePlayer();
  const { isDark, toggleTheme } = useTheme();
  return (
    <main className={`${styles.indexContainer} ${musicList.length > 0 ? "h-[calc(100vh-6px)] rounded-tl-[30px] rounded-bl-[30px]" : "h-screen"} ${rubik.className} ${isDark ? "bg-[#151515]" : "bg-[#FCFCFF]"}`}>
      <header className={styles.mainHeader}>
        <h1 className={`${isDark ? "text-[#FCFCFF]" : "text-[#2D2E37]"} `}>Início</h1>
        <div className='flex items-center'>
          {isDark ? <FaMoon onClick={toggleTheme}/> : <FaRegMoon onClick={toggleTheme}/>}
          <input/>
          <IoSearch/>
        </div>
      </header>

      <div className={styles.mainGrid}>
        <div className={`${styles.bannerIndex} bg-[url('/banner.gif')]`}/>

        <div>
          <span>TOP ARTISTAS</span>
        </div>

        <div className='px-14'>
          <span className='text-[21px] font-semibold text-[#2D2E37]'>10 Recomendações</span>
          <table className='w-full mt-[200px]'>
            <tbody>
              {musics.map((music, index) =>{
                return (
                  <tr key={music.id} className='items-center'>
                    <td style={{width: 72}}>
                      <Image 
                        width={120}
                        height={120}
                        src={music.album_image}
                        alt={music.name}
                        className='object-cover'
                        
                      />
                    </td>
                    <td>
                      <div className='flex flex-col'>
                        <Link href={`/music/${music.id}`} className='text-[20px]'>{music.name}</Link>
                        <span className='text-[12px]'><Link href={`/author/${music.author_id}`}>{music.author_name}</Link> • <Link href={`/album/${music.album_id}`}>{music.album_name}</Link></span>
                      </div>
                      
                    </td>
                    <td className='w-[50px]'>{music.time_as_string}</td>
                    <td className='w-[50px]'>
                      <button type="button" onClick={() => playList(musics, index)}>
                        like                        
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