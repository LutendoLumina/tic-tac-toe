import React from "react";
import { ThemeContextProvider } from "./ThemeContext";
import { GameContextProvider } from "./GameContext";
import { ModalContextProvider } from "./ModalContext";
import { SoundEffectsContextProvider } from "./SoundEffectsContext";

const Provider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <GameContextProvider>
        <SoundEffectsContextProvider>{children}</SoundEffectsContextProvider>
      </GameContextProvider>
    </ThemeContextProvider>
  );
};

export default Provider;
