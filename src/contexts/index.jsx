import React from "react";
import { ThemeContextProvider } from "./ThemeContext";
import { GameProvider } from "./GameContext";
import { ModalContextProvider } from "./ModalContext";
import { SoundEffectsContextProvider } from "./SoundEffectsContext";

const Provider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <GameProvider>
        <SoundEffectsContextProvider>{children}</SoundEffectsContextProvider>
      </GameProvider>
    </ThemeContextProvider>
  );
};

export default Provider;
