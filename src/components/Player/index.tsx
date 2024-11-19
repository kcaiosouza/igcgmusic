"use client"

import { useRef } from "react";
import { useTranslations } from "next-intl"
import Image from "next/image";
import Slider from 'rc-slider';
import {
  IoHeartOutline,
  IoHeart,
  IoPlayCircle,
  IoPauseCircle,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoShuffle,
  IoRepeat,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
  IoVolumeMute
} from "react-icons/io5";

import 'rc-slider/assets/index.css';
import CardMusic from "./cardMusic";
import styles from "./styles.module.css";
import { usePlayer } from "@/contexts/playerContext";

export default function Player() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    const div = scrollRef.current;
    if (div) {
      startX = e.pageX - div.offsetLeft;
      scrollLeft = div.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const div = scrollRef.current;
    if (div) {
      const x = e.pageX - div.offsetLeft;
      const walk = (x - startX) * 1;
      div.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const { 
    musicList, 
    currentMusicIndex, 
    isPlaying, 
    isLooping,
    isShuffling,
  } = usePlayer();

  const music = musicList[currentMusicIndex];

  const t = useTranslations("PlayerComponent");
  return(
    <section className="flex flex-col w-[324px] max-w-[324px] bg-[#2E2E20] justify-center scrollHidden">
      <section className="pt-3 flex flex-col gap-2">
        <h3 className="font-semibold text-xl pl-4">Fila de Músicas</h3>
        <div
         ref={scrollRef} 
         className={`pl-4 select-none w-full h-auto overflow-x-scroll gap-1 flex flex-row ${styles.hiddenScroll}`}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseUp}
         onMouseUp={handleMouseUp}
        >
          <CardMusic title="O Amor Jamais Acabará" time={400} author="Públio Alves" imageUrl="https://github.com/kcaiosouza.png"/>
          <CardMusic title="O Amor Jamais Acabará" time={400} author="Públio Alves" imageUrl="https://github.com/kcaiosouza.png"/>
          <CardMusic title="O Amor Jamais Acabará" time={400} author="Públio Alves" imageUrl="https://github.com/kcaiosouza.png"/>
          <CardMusic title="O Amor Jamais Acabará" time={400} author="Públio Alves" imageUrl="https://github.com/kcaiosouza.png"/>
          <CardMusic title="O Amor Jamais Acabará" time={400} author="Públio Alves" imageUrl="https://github.com/kcaiosouza.png"/>
          <CardMusic title="O Amor Jamais Acabará" time={400} author="Públio Alves" imageUrl="https://github.com/kcaiosouza.png"/>
          <CardMusic title="O Amor Jamais Acabará" time={400} author="Públio Alves" imageUrl="https://github.com/kcaiosouza.png"/>
        </div>
      </section>
      <section className="w-full flex flex-[1] flex-col items-center justify-center">
        <div className="bg-[#5B6143] w-[80%] h-[346px] rounded-3xl flex flex-col items-center justify-between p-6 gap-2">
          <div className="flex flex-col items-center relative">
            <Image src="https://github.com/kcaiosouza.png" alt="Capa CD" width={164} height={164} className="rounded-2xl mb-2"/>
            {/* <IoHeartOutline className="absolute top-[126px] right-2 cursor-pointer" size={32}/> */}
            <span>Nome da Música</span>
            <span>Nome do Artista</span>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row items-center justify-center gap-1">
              <IoRepeat size={23}/>
              <IoPlaySkipBack size={23}/>
              <IoPlayCircle size={54} className="translate-x-[1px]"/>
              <IoPlaySkipForward size={23}/>
              <IoShuffle size={23}/>
            </div>
            <div className="flex flex-row w-full px-12 items-center justify-center gap-2">
              <IoVolumeHigh size={23}/>
              <Slider className="volume-slider"/>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 px-2 bg-[#5B6143] w-[64%] h-11 rounded-b-2xl">
          <span className="text-[12px]">01:15</span>
          <Slider className="music-slider"/>
          <span className="text-[12px]">15:15</span>
        </div>
      </section>
    </section>
  )
}