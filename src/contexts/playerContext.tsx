"use client"

import { createContext, useState, useContext, ReactNode } from "react";

interface PlayerContextProviderProps {
  children: ReactNode;
}

interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface Album {
	id: string;
	title: string;
	slug: string;
	release_date: string;
	artist_id: string;
	image_url: string;
	created_at: string;
	updated_at: string;
}
interface Music {
  id: string,
	slug: string;
  title: string;
	album_id: string;
	artist_id: string;
	language: string;
	file_url: string;
  duration: number;
	lyrics: string;
	chords: string | null;
	play_count: number;
	created_at: string;
	updated_at: string;
	album: Album;
  artist: Artist;
}

interface UsePlayerProps {
  musicList: Music[];
  currentMusicIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  clearPlayerState: () => void;
  play: (music: Music) => void;
  setPlayList: (list: Music[], index: number) => void;
  setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext<UsePlayerProps | undefined>(undefined);

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
  const [musicList, setMusicList] = useState<Music[]>([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(music: Music) {
    setMusicList([music]);
    setCurrentMusicIndex(0);
    setIsPlaying(true);
  }

  function setPlayList(list: Music[], index: number) {
    setMusicList(list);
    setCurrentMusicIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setMusicList([]);
    setCurrentMusicIndex(0);
  }

  const hasPrevious = currentMusicIndex > 0;
  const hasNext = isShuffling || (currentMusicIndex + 1) < musicList.length;

  function playNext() {
    if(isShuffling) {

      const nextRandomEpisodeIndex = Math.floor(Math.random() * musicList.length);
      setCurrentMusicIndex(nextRandomEpisodeIndex);

    } else if(hasNext) {

      setCurrentMusicIndex(currentMusicIndex + 1);

    }
  }

  function playPrevious() {
    if(hasPrevious) {
      setCurrentMusicIndex(currentMusicIndex - 1);
    }
  }

  return(
    <PlayerContext.Provider value={{
      musicList,
      currentMusicIndex,
      isPlaying,
      isLooping,
      isShuffling,
      hasNext,
      hasPrevious,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      playNext,
      playPrevious,
      clearPlayerState,
      play,
      setPlayList,
      setPlayingState
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

  return playerContext;
}