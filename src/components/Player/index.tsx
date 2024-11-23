"use client"

import { useEffect, useRef, useState } from "react";
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
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState<number>(0);

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
    setPlayList,
    play,
    hasNext,
    hasPrevious,
    playNext,
    playPrevious,
    setPlayingState,
    toggleLoop,
    togglePlay,
    toggleShuffle,
    clearPlayerState
  } = usePlayer();

  function setupProgressListener() {
    if(audioRef.current){
      audioRef.current.currentTime = 0;
      
      audioRef.current.addEventListener('timeupdate', () => {
        if(audioRef.current){
          setProgress(Math.floor(audioRef.current.currentTime));
        }
      })
    }
  }

  function handleSeek(amount: number) {
    if(audioRef.current){
      audioRef.current.currentTime = amount;
      setProgress(amount);
    }
  }


  function handleEpisodesEnded() {
    if(hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  // Função para cachear o áudio
  async function cacheAudio(url: string): Promise<string> {
    const cacheName = "music-cache";
    const cache = await caches.open(cacheName);

    // Verificar se o arquivo já está no cache
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      console.log(`Áudio encontrado no cache: ${url}`);
      return URL.createObjectURL(await cachedResponse.blob()); // Retorna o URL do cache
    }

    // Fazer o download do áudio e armazenar no cache
    console.log(`Baixando e armazenando áudio: ${url}`);
    const response = await fetch(`http://localhost:4444/proxy?url=${url}`, {
      method: "GET",
      headers: {
        "content-type": "audio/mp3",
      },
    });
    if (response.ok) {
      const audioBlob = await response.blob();
      const objectUrl = URL.createObjectURL(audioBlob);
      console.log("Esse é a URL temporária criado para o campo src da tag Audio:", objectUrl);
      return objectUrl;
    } else {
      console.error(`Falha ao baixar o áudio: ${response.statusText}`);
      throw new Error(`Falha ao baixar o áudio: ${response.statusText}`);
    }
  }

  // Função para pré-carregar as próximas músicas
  async function preCacheNextTracks(currentIndex: number) {
    const cacheName = "music-cache";
    const cache = await caches.open(cacheName);

    // Identifica as próximas músicas
    const tracksToCache = [currentIndex + 1, currentIndex + 2]
      .map((index) => musicList[index]) // Pega as próximas músicas da lista
      .filter((music) => music); // Remove músicas inexistentes

    for (const track of tracksToCache) {
      const cachedResponse = await cache.match(track.file_url);
      if (!cachedResponse) {
        console.log(`Pré-carregando: ${track.title}`);
        const response = await fetch(`http://localhost:4444/proxy?url=${track.file_url}`, {
          method: "GET",
          headers: {
            "content-type": "audio/mp3",
          },
        });
        if (response.ok) {
          await cache.put(track.file_url, response);
        } else {
          console.warn(`Falha ao pré-carregar: ${track.title}`);
        }
      } else {
        console.log(`Áudio já está no cache: ${track.title}`);
      }
    }
  }

  const music = musicList[currentMusicIndex];

  useEffect(() => {
    if (music) {
      // Cachear a música atual
      cacheAudio(music.file_url)
        .then((cachedUrl) => {
          console.log(cachedUrl)
          if (audioRef.current) {
            audioRef.current.src = cachedUrl;
            audioRef.current.play();
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar áudio:", error);
        });
  
      // Pré-carregar as próximas músicas
      preCacheNextTracks(currentMusicIndex);
    }
  }, [music]);

  const t = useTranslations("PlayerComponent");
  // if(music){
    return(
      <section className="flex flex-col w-[324px] max-w-[324px] bg-[#2E2E20] justify-center scrollHidden">
        <section className="pt-3 flex flex-col gap-2">
          <h3 className="font-semibold text-xl pl-4">Fila de Músicas</h3>
          <div
           ref={scrollRef} 
           className={`px-4 select-none w-full h-auto overflow-x-scroll gap-1 flex flex-row ${styles.hiddenScroll}`}
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseUp}
           onMouseUp={handleMouseUp}
          >
            {/* @ts-ignore */}
            {musicList.map((music: Music, index: number) => {
              return(
                <CardMusic key={index} title="O Amor Jamais Acabará" time={12.58} author="Editora Árvore da Vida" imageUrl="https://github.com/kcaiosouza.png"/>
              )
            })}
            <CardMusic title="O Amor Jamais Acabará" time={12.58} author="Editora Árvore da Vida" imageUrl="https://github.com/kcaiosouza.png"/>
            <CardMusic title="O Amor Jamais Acabará" time={12.58} author="Editora Árvore da Vida" imageUrl="https://github.com/kcaiosouza.png"/>
            <CardMusic title="O Amor Jamais Acabará" time={12.58} author="Editora Árvore da Vida" imageUrl="https://github.com/kcaiosouza.png"/>
            <CardMusic title="O Amor Jamais Acabará" time={12.58} author="Editora Árvore da Vida" imageUrl="https://github.com/kcaiosouza.png"/>
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
                <IoPlaySkipBack size={23} onClick={playPrevious}/>
                <IoPlayCircle size={54} className="translate-x-[1px]"/>
                <IoPlaySkipForward size={23} onClick={playNext}/>
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
            <Slider
             className="music-slider"
             max={music?.duration}
             value={progress}
             onChange={(time) => handleSeek(time as number)}
            />
            <span className="text-[12px]">15:15</span>
          </div>
        </section>
  
        <footer>
          {music && 
            <audio
             ref={audioRef}
             loop={isLooping}
             autoPlay
             onEnded={handleEpisodesEnded}
             onPlay={() => setPlayingState(true)}
             onPause={() => setPlayingState(false)}
             onLoadedMetadata={setupProgressListener}
            >
            </audio>
          }
        </footer>
      </section>
    )
  // }else{
  //   return;
  // }
}