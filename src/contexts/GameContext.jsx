import { createContext, useEffect, useReducer } from "react";
import {
  ACTIONS,
  createInitialState,
  gameReducer,
} from "../utils/GameUtils/gameReducer.js";
import { saveGameState } from "../utils/GameUtils/gameStorage.js";

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const value = { gameState, dispatch, ACTIONS };

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
};

export const GameContextProvider = GameProvider;

export { useGame } from "../hooks/useGame";
