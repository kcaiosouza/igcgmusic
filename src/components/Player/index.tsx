"use client"

import { useTranslations } from "next-intl"
import Image from "next/image";
import Slider from 'rc-slider';
import {
  IoHeartOutline,
  IoHeart,
  IoPlay,
  IoPause,
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

export default function Player() {
  const t = useTranslations("PlayerComponent");
  return(
    <section className="flex flex-col w-full h-20 backdrop-blur-md bg-white/5 absolute left-0 bottom-0">
      <Slider 
        className="music-slider"
        max={100}
        value={50}
        // onChange={(e) => {console.log(e)}}
      />
      <div className="flex flex-row flex-[1] items-center justify-between -translate-y-[5px]">
        <div className="flex-[1] flex items-center pl-3 gap-2">
          <Image src="https://github.com/kcaiosouza.png" width={56} height={56} alt="Capa do CD" className="aspect-square w-14 h-14 rounded-md"/>
          <div className="">
            <h3>Titulo da música</h3>
            <span className="font-sans text-sm font-extralight">CD Tal • Fulano</span>
          </div>
          <div className="p-2">
            <IoHeartOutline size={20} className="hover:scale-110 duration-300 cursor-pointer"/>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 flex-[1]">
          <IoRepeat size={20}/>
          <IoPlaySkipBack size={20}/>
          <div className="rounded-full w-9 h-9 border-2 border-white flex items-center justify-center">
            <IoPlay size={25} className="translate-x-[1.5px]"/>
          </div>
          <IoPlaySkipForward size={20}/>
          <IoShuffle size={20}/>
        </div>
        <div className="flex-[1] flex justify-end items-center gap-3 pr-3">
          <IoVolumeHigh size={20}/>
          <Slider 
            className="volume-slider w-24"
            max={1}
            value={1}
            step={0.01}
            // onChange={(e) => {console.log(e)}}
          />
        </div>
      </div>
    </section>
  )
}