import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MusicPlayerWrapper,
  NextIcon,
  PlayIcon,
  PauseIcon,
} from "./MusicPlayer.styled";
import playList from "../../utils/MusicUtils/playlist";
import { randomizeIndex } from "../../utils/MusicUtils";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext.jsx";
import { Text } from "../../styles/General.styled.jsx";

const MusicPlayer = () => {
  const { hoverSfx, clickSfx } = useContext(SoundEffectsContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(() =>
    randomizeIndex(playList),
  );
  const [playPromise, setPlayPromise] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const promise = playerRef?.current.play();
      setPlayPromise(promise);
      if (playerRef.current?.volume) playerRef.current.volume = 0.1;
      return;
    }
    playerRef.current.pause();
  }, [isPlaying, currentSong]);

  const shuffleHandler = async () => {
    await playPromise.then(() => {
      playerRef.current.pause();
      setIsPlaying(false);
    });

    setCurrentSong(randomizeIndex(playList));
    setIsPlaying(true);
  };

  const displaySong = playList[currentSong].name;

  return (
    <MusicPlayerWrapper>
      {isPlaying ? (
        <PauseIcon
          onClick={() => {
            clickSfx.play();
            setIsPlaying(false);
          }}
        />
      ) : (
        <PlayIcon
          onClick={() => {
            clickSfx.play();
            setIsPlaying(true);
          }}
        />
      )}
      <NextIcon onClick={shuffleHandler} />
      <audio
        ref={playerRef}
        src={playList[currentSong].url}
        onEnded={shuffleHandler}
      />
      <Text>{displaySong}</Text>
    </MusicPlayerWrapper>
  );
};

export default MusicPlayer;
