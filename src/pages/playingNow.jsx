import styles from '@/styles/Index.module.css'
import { Rubik } from 'next/font/google'
import { TbFileMusic } from "react-icons/tb";
import { FaRegHeart, FaHeart, FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import Image from 'next/image';
import { usePlayer } from '@/contexts/playerContext';
import { useTheme } from '@/contexts/themeContext';
import { useAuth } from '@/contexts/authContext';

const rubik = Rubik({ subsets: ['latin'] })

export default function PlayingNow({musics, authors}) {
  const { musicList, currentMusicIndex, isPlaying, togglePlay } = usePlayer();
  const { isDark } = useTheme();
  const { user } = useAuth();

  return (
    <main className={`${styles.indexContainer} ${musicList.length > 0 ? "h-[calc(100vh-6px)] rounded-tl-[30px] rounded-bl-[30px]" : "h-screen"} ${rubik.className} ${isDark ? "bg-[#151515]" : "bg-[#FCFCFF]"}`}>
      <div className='w-full h-[230px] relative'>
        <div className={`absolute bg-gradient-to-t ${isDark ? "from-[#151515] to-[#15151501]" : "from-[#FCFCFF] to-[#FCFCFF01]"} w-full h-[230px] backdrop-blur-[5px]`}></div>
        <Image
          width={700}
          height={700}
          src={musicList[currentMusicIndex]?.album_image}
          alt={musicList[currentMusicIndex]?.name}
          className='object-cover w-full h-[230px]'
        />
      </div>
      <div className='flex w-full justify-between px-12 items-center pt-3'>
        <div>
          <div className='flex flex-row items-center gap-4'>
            <p className={`font-bold text-[32px] ${isDark ? "text-[#FCFCFF]" : "text-[#151515]"} leading-8`}>{musicList[currentMusicIndex]?.name}</p>
            <FaRegHeart size={25} color='#FCFCFF'/>
          </div>
          <span className={`font-semibold ${isDark ? "text-[rgba(255,255,255,0.6)]" : "text-[rgba(0,0,0,0.6)]"}`}>{musicList[currentMusicIndex]?.author_name} • {musicList[currentMusicIndex]?.album_name}</span>
        </div>

        <div className='flex items-center justify-center gap-2'>
          <div className='cursor-pointer rounded-full bg-[#5B6143] h-[35px] w-[35px] flex items-center justify-center'>
            <TbFileMusic color={isDark ? "#151515" : "#FCFCFF"} size={25} className='cursor-pointer'/>
          </div>
          {isPlaying ? <FaCirclePause color='#5B6143' size={50} onClick={togglePlay} className='cursor-pointer'/> : <FaCirclePlay color='#5B6143' size={50} onClick={togglePlay} className='cursor-pointer'/>}
        </div>
      </div>

      <div className={`text-center pt-14 pb-4 px-12 font-bold ${isDark ? "text-[#FCFCFF]" : "text-[#151515]"} text-[32px]`} dangerouslySetInnerHTML={{__html: musicList[currentMusicIndex]?.lyrics}}></div>
    </main>
  )
}