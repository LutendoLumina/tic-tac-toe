import { createContext, useReducer } from "react";
import {
  ACTIONS,
  createInitialState,
  gameReducer,
} from "../utils/GameUtils/gameReducer.js";

export const GameContext = createContext(null);

/**
 * Provides game state (useReducer) and dispatch to the tree.
 */
export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState,
  );

  const value = { gameState, dispatch, ACTIONS };

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
};

/** @deprecated Use GameProvider — kept for existing imports */
export const GameContextProvider = GameProvider;

export { useGame } from "../hooks/useGame";
