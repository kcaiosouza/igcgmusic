"use client"

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

export default function Player() {
  const t = useTranslations("PlayerComponent");
  return(
    <section className="flex flex-col w-[324px] max-w-[324px] bg-[#2E2E20] justify-center">
      <section className="pt-3 flex flex-col gap-2">
        <h3 className="font-semibold text-xl pl-4">Fila de Músicas</h3>
        <div className="pl-4 w-full h-auto overflow-x-scroll gap-1 flex flex-row">
          <CardMusic/>
          <CardMusic/>
          <CardMusic/>
          <CardMusic/>
          <CardMusic/>
          <CardMusic/>
        </div>
      </section>
      <section className="w-full flex flex-[1] flex-col items-center justify-center">
        <div className="bg-[#5B6143] w-[80%] h-[346px] rounded-3xl flex flex-col items-center justify-between p-6 gap-2">
          <div className="flex flex-col items-center">
            <Image src="https://github.com/kcaiosouza.png" alt="Capa CD" width={164} height={164} className="rounded-2xl mb-2"/>
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