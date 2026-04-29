import React, { createContext, useState } from "react";
import useSound from "../hooks/useSound";
import hoverSound from "../assets/sounds/hover.wav";
import clickSound from "../assets/sounds/click.wav";
import winSound from "../assets/sounds/win.wav";
import drawSound from "../assets/sounds/draw.wav";
import bgMusic from "../assets/sounds/background-music.wav";

export const SoundEffectsContext = createContext({});

export const SoundEffectsContextProvider = ({ children }) => {
  const options = {
    volume: 0.05,
  };

  const hoverSfx = useSound(hoverSound, { volume: 0.03 });
  const clickSfx = useSound(clickSound, options);
  const winSfx = useSound(winSound, options);
  const drawSfx = useSound(drawSound, options);
  const bgMusicSfx = useSound(bgMusic, { volume: 0.2 });

  return (
    <SoundEffectsContext.Provider value={{ hoverSfx, clickSfx, winSfx, drawSfx }}>
      {children}
    </SoundEffectsContext.Provider>
  );
};
