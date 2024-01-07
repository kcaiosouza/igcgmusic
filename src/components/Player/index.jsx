import { FaBackwardStep, FaCirclePlay, FaForwardStep } from "react-icons/fa6";
import { TiArrowRepeat, TiArrowShuffle } from "react-icons/ti";
import Link from "next/link";
import styles from "@/styles/player.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { convertSecondsToString } from "@/utils/convertSecondsToString";


export function Player({ page }) {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  function handleSeek(amount) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function setupProgressListener() {
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }
  return (
    <div className="h-screen bg-[#2E2E20] w-[530px] rounded-tl-3xl rounded-bl-3xl flex flex-col justify-between pb-[130px]">
      <div className="p-[30px]">
        <h1 className="font-bold text-[21px] text-[#FCFCFF] mb-[12px]">Próximas músicas</h1>

        {/* va sei os cards que scrolam para o lado */}
        <div className="flex gap-3">
          {/* cards */}
          <div className="relative flex flex-col justify-center items-center">
            <Image
              width={190}
              height={190}
              src={`https://igcgcloud.netlify.app/images/capacdeusoudomeuamado.png`}
              alt="Próximas músicas"
              className="object-cover rounded-xl"
            />
            <div className="w-[170px] h-[58px] py-[5px] px-[6px] absolute bottom-2 bg-[#0000006e] backdrop-blur-[6px] rounded-lg flex items-center justify-between">
              <div className="text-[#FFFFFF] flex flex-col">
                <span className="inline-block overflow-hidden whitespace-nowrap overflow-ellipsis w-[110px] font-bold text-[14px]">O Amor</span>
                <span className="inline-block overflow-hidden whitespace-nowrap overflow-ellipsis w-[110px] font-semibold text-[12px]">04:11 • Editora Árvore da Vida</span>
              </div>
              <FaCirclePlay size={28} color="#FFFFFF"/>
            </div>
          </div>
          <div className="relative flex flex-col justify-center items-center">
            <Image
              width={190}
              height={190}
              src={`https://igcgcloud.netlify.app/images/capacdeusoudomeuamado.png`}
              alt="Próximas músicas"
              className="object-cover rounded-xl"
            />
            <div className="w-[170px] h-[58px] py-[5px] px-[6px] absolute bottom-2 bg-[#0000006e] backdrop-blur-[6px] rounded-lg flex items-center justify-between">
              <div className="text-[#FFFFFF] flex flex-col">
                <span className="inline-block overflow-hidden whitespace-nowrap overflow-ellipsis w-[110px] font-bold text-[14px]">O Amor</span>
                <span className="inline-block overflow-hidden whitespace-nowrap overflow-ellipsis w-[110px] font-semibold text-[12px]">04:11 • Editora Árvore da Vida</span>
              </div>
              <FaCirclePlay size={28} color="#FFFFFF"/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* card */}
        <div className="bg-[#5B6143] w-[340px] rounded-[72px] min-h-[450px] flex flex-col items-center p-10">
          <Image
            width={225}
            height={225}
            src={`https://igcgcloud.netlify.app/images/capacdeusoudomeuamado.png`}
            alt="Próximas músicas"
            className="object-cover rounded-[40px]"
          />

          <div className="flex flex-col items-center pt-3">
            <span className="text-[#ffffff] font-bold text-[18px]">O Amor</span>
            <span className="text-[#ffffff70] leading-3">Editora Árvore da Vida</span>
          </div>

          <div className="flex justify-between items-center w-full pt-10">
            <TiArrowShuffle size={25} color="#FFFFFF" />
            <div className="flex items-center gap-2">
              <FaBackwardStep size={28} color="#ffffff70"/>
              <FaCirclePlay size={61} color="#FFFFFF"/>
              <FaForwardStep size={28} color="#ffffff70"/>
            </div>
            <TiArrowRepeat size={25} color="#FFFFFF" />
          </div>
        </div>
        <div className="bg-[#464B36] w-[200px] h-[50px] rounded-b-3xl flex items-center gap-1">
          <span className="w-[60px]">{convertSecondsToString(progress).slice(3)}</span>
          <Slider 
            max={231}
            value={progress}
            onChange={handleSeek}
            trackStyle={{ backgroundColor: '#04d361' }}
            railStyle={{ backgroundColor: '#B3CDBE'}}
            handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
          />
          <span className="w-[60px]">{convertSecondsToString(231).slice(3)}</span>
          <audio
            id="audio-player"
            ref={audioRef}
            autoPlay
            onEnded={() => console.log("acabou")}
            onPlay={() => console.log("play")}
            onPause={() => console.log("pause")}
            onSeeked={setupProgressListener}
          >
            <source src="https://igcgcloud.netlify.app/cd-eusoudomeuamado/oamor.mp3" type="audio/mp3"/>
          </audio>
        </div>
      </div>
    </div>
  );
}
