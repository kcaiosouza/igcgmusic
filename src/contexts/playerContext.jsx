import { createContext, useState, useContext } from "react";

export const PlayerContext = createContext({});

export function PlayerContextProvider({ children }) {
  const [musicList, setMusicList] = useState([]);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode) {
    setMusicList([episode]);
    setCurrentMusicIndex(9999);
    setIsPlaying(true);
  }

  function playList(list, index) {
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

  function setPlayingState(state) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setMusicList([]);
    setCurrentMusicIndex(9999);
  }

  const hasPrevious = currentMusicIndex > 0;
  const hasNext = isShuffling || (currentMusicIndex + 1) < currentMusicIndex.length;

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

  return (
    <PlayerContext.Provider value={{
      musicList,
      currentMusicIndex,
      isPlaying, 
      isLooping,
      isShuffling,
      play, 
      playList,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious,
      togglePlay, 
      toggleLoop,
      toggleShuffle,
      setPlayingState,
      clearPlayerState,
    }}>
      { children }
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}