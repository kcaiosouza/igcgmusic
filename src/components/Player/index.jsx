import { FaBackwardStep, FaCirclePause, FaCirclePlay, FaForwardStep } from "react-icons/fa6";
import { TiArrowRepeat, TiArrowShuffle } from "react-icons/ti";
import Link from "next/link";
import styles from "@/styles/player.module.css";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { convertSecondsToString } from "@/utils/convertSecondsToString";
import { usePlayer } from "@/contexts/playerContext";


export function Player() {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const { 
    musicList, 
    currentMusicIndex, 
    isPlaying, 
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    setPlayingState,
    clearPlayerState,
  } = usePlayer();

  useEffect(() => {
    if(!audioRef.current) {
      return;
    }

    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])

  function handleSeek(amount) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function setupProgressListener() {
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  function handleEpisodesEnded() {
    if(hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  const music = musicList[currentMusicIndex];

  return (
    <div className={`h-screen bg-[#2E2E20] w-[530px] rounded-tl-3xl rounded-bl-3xl ${music ? "flex" : "hidden"} flex-col justify-between pb-[130px]`}>
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
        {music && (
          <>
            <div className="bg-[#5B6143] w-[340px] rounded-[72px] min-h-[450px] flex flex-col items-center p-10">
              <Image
                width={225}
                height={225}
                src={music.album_image}
                alt="Próximas músicas"
                className="object-cover rounded-[40px]"
              />

              <div className="flex flex-col items-center pt-3">
                <span className="text-[#ffffff] font-bold text-[18px]">{music.name}</span>
                <span className="text-[#ffffff70] leading-3">{music.author_name}</span>
              </div>

              <div className="flex justify-between items-center w-full pt-10">
                <TiArrowShuffle size={25} color={isShuffling ? "#04d361" : "#ffffff"} onClick={music || musicList.length > 1 ? toggleShuffle : ""}/>
                <div className="flex items-center gap-2">
                  <FaBackwardStep size={28} color="#ffffff" onClick={music || hasPrevious ? playPrevious : ""}/>
                  {isPlaying ? <FaCirclePause className="cursor-pointer" size={61} color="#FFFFFF" onClick={music ? togglePlay : ""}/> : <FaCirclePlay className="cursor-pointer" size={61} color="#FFFFFF" onClick={music ? togglePlay : ""}/>}
                  <FaForwardStep size={28} color="#ffffff" onClick={music || hasNext ? playNext : ""}/>
                </div>
                <TiArrowRepeat size={25} color={isLooping ? "#04d361" : "#ffffff"} onClick={music ? toggleLoop : ""}/>
              </div>
            </div>
            <div className="bg-[#464B36] w-[200px] h-[50px] rounded-b-3xl flex items-center gap-1">
              <span className="w-[45px] text-[12px] font-medium text-center text-[#FCFCFF]">{convertSecondsToString(progress).slice(3)}</span>
              <div className="flex flex-row w-[110px]">
                <Slider 
                  max={music.time}
                  value={progress}
                  onChange={handleSeek}
                  // trackStyle={{ backgroundColor: '#04d361' }}
                  // railStyle={{ backgroundColor: '#B3CDBE'}}
                  // handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
                />
              </div>
              <span className="w-[45px] text-[12px] font-medium text-center text-[#FCFCFF]">{convertSecondsToString(music.time).slice(3)}</span>

              <audio
                id="audio-player"
                ref={audioRef}
                src={music.file_url}
                loop={isLooping}
                autoPlay
                onEnded={handleEpisodesEnded}
                onPlay={() => setPlayingState(true)}
                onPause={() => setPlayingState(false)}
                // onSeeked={setupProgressListener}
                onLoadedMetadata={setupProgressListener}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
