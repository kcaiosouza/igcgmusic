"use client"

import { createContext, useState, useContext, ReactNode } from "react";

interface PlayerContextProviderProps {
  children: ReactNode;
}

interface Music {
  title: string;
  artist: string;
  duration: number;
}

interface UsePlayerProps {
  musicList: Music[];
  currentMusicIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
}

export const PlayerContext = createContext<UsePlayerProps | undefined>(undefined);

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
  const [musicList, setMusicList] = useState([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  return(
    <PlayerContext.Provider value={{
      musicList,
      currentMusicIndex,
      isPlaying,
      isLooping,
      isShuffling
    }}>
      { children }
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const playerContext = useContext(PlayerContext);

  if(!playerContext) {
    throw new Error('usePlayer must be used within a PlayerContextProvider');
  }

  return playerContext
}