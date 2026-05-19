import { useCallback, useContext } from "react";
import { GameContext } from "../contexts/GameContext";

/**
 * Access game state and action dispatchers.
 * Must be used inside <GameProvider>.
 */
export function useGame() {
  const context = useContext(GameContext);

  if (context === null) {
    throw new Error(
      "useGame must be used within a GameProvider. Wrap your app with <GameProvider>.",
    );
  }

  const { gameState, dispatch, ACTIONS } = context;

  const makeMove = useCallback(
    (index, winner, winningCombo) =>
      dispatch({
        type: ACTIONS.MAKE_MOVE,
        payload: { index, winner, winningCombo },
      }),
    [dispatch, ACTIONS],
  );

  const resetBoard = useCallback(
    () => dispatch({ type: ACTIONS.RESET_BOARD }),
    [dispatch, ACTIONS],
  );

  const updateScores = useCallback(
    (winnerChoice) =>
      dispatch({
        type: ACTIONS.UPDATE_SCORES,
        payload: { winnerChoice },
      }),
    [dispatch, ACTIONS],
  );

  const startNextRound = useCallback(
    () => dispatch({ type: ACTIONS.START_NEXT_ROUND }),
    [dispatch, ACTIONS],
  );

  const resetScores = useCallback(
    () => dispatch({ type: ACTIONS.RESET_SCORES }),
    [dispatch, ACTIONS],
  );

  const setGameMode = useCallback(
    (mode) =>
      dispatch({ type: ACTIONS.SET_GAME_MODE, payload: mode }),
    [dispatch, ACTIONS],
  );

  const setPlayerNames = useCallback(
    (p1, p2) =>
      dispatch({
        type: ACTIONS.SET_PLAYER_NAMES,
        payload: { p1, p2 },
      }),
    [dispatch, ACTIONS],
  );

  const undoMove = useCallback(
    () => dispatch({ type: ACTIONS.UNDO_MOVE }),
    [dispatch, ACTIONS],
  );

  return {
    board: gameState.board,
    currentPlayer: gameState.currentPlayer,
    winner: gameState.winner,
    winningCombo: gameState.winningCombo,
    draw: gameState.draw,
    gameMode: gameState.gameMode,
    player1: gameState.player1,
    player2: gameState.player2,

    makeMove,
    resetBoard,
    updateScores,
    startNextRound,
    resetScores,
    setGameMode,
    setPlayerNames,
    undoMove,
  };
}
