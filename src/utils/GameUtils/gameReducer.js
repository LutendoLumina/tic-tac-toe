/**
 * gameReducer.js
 *
 * Centralized, pure game state management for TicTacToe.
 * All state transitions go through gameReducer — no side effects here.
 */

import { genConfig } from "react-nice-avatar";

// ---------------------------------------------------------------------------
// Action type constants
// ---------------------------------------------------------------------------
export const ACTIONS = {
  MAKE_MOVE: "MAKE_MOVE",
  RESET_BOARD: "RESET_BOARD",
  UPDATE_SCORES: "UPDATE_SCORES",
  START_NEXT_ROUND: "START_NEXT_ROUND",
  RESET_SCORES: "RESET_SCORES",
  SET_GAME_MODE: "SET_GAME_MODE",
  SET_PLAYER_NAMES: "SET_PLAYER_NAMES",
  UNDO_MOVE: "UNDO_MOVE",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a fresh initial state (new avatars on full reset). */
export const createInitialState = () => ({
  board: Array(9).fill(null),
  currentPlayer: "x",
  winner: null,
  winningCombo: null,
  draw: false,
  gameMode: "pvp",
  player1: {
    name: "Player1",
    choice: "x",
    score: 0,
    color: "#8437f9",
    avatarConfig: genConfig(),
  },
  player2: {
    name: "Player2",
    choice: "o",
    score: 0,
    color: "#f9c811",
    avatarConfig: genConfig(),
  },
  moveHistory: [],
});

export const initialState = createInitialState();

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Returns the winning mark ('x' | 'o') and combo indices, or null if no winner.
 */
export function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { winner: board[a], winningCombo: [a, b, c] };
    }
  }
  return null;
}

/** True when the board is full and there is no winner. */
export function checkDraw(board) {
  return board.every((cell) => cell !== null) && !checkWinner(board);
}

/** Indices of empty cells (useful for AI / PvC later). */
export function getEmptyCells(board) {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
}

const toggleChoice = (choice) => (choice === "x" ? "o" : "x");

/** Apply round result to player scores (immutable). */
function applyScoreUpdate(player1, player2, winnerChoice) {
  const p1 = { ...player1 };
  const p2 = { ...player2 };

  if (winnerChoice === "draw") {
    p1.score += 0.5;
    p2.score += 0.5;
  } else if (winnerChoice === "x") {
    if (p1.choice === "x") p1.score += 1;
    else p2.score += 1;
  } else if (winnerChoice === "o") {
    if (p1.choice === "o") p1.score += 1;
    else p2.score += 1;
  }

  return { player1: p1, player2: p2 };
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

/**
 * Pure reducer — (state, action) => newState
 */
export function gameReducer(state, action) {
  switch (action.type) {
    /**
     * MAKE_MOVE — place currentPlayer on index; store win/draw from component.
     * payload: { index, winner, winningCombo }
     */
    case ACTIONS.MAKE_MOVE: {
      const { index, winner, winningCombo } = action.payload;

      if (state.board[index] !== null || state.winner || state.draw) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;

      const isDraw =
        !winner && newBoard.every((cell) => cell !== null);

      const snapshot = {
        board: state.board,
        currentPlayer: state.currentPlayer,
        winner: state.winner,
        winningCombo: state.winningCombo,
        draw: state.draw,
      };

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "x" ? "o" : "x",
        winner: winner ?? null,
        winningCombo: winningCombo ?? null,
        draw: isDraw,
        moveHistory: [...state.moveHistory, snapshot],
      };
    }

    /**
     * RESET_BOARD — clear the grid for a new round; keep scores and players.
     */
    case ACTIONS.RESET_BOARD: {
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: "x",
        winner: null,
        winningCombo: null,
        draw: false,
        moveHistory: [],
      };
    }

    /**
     * UPDATE_SCORES — increment scores when a round ends (board unchanged).
     * payload: { winnerChoice } — 'x', 'o', or 'draw'
     */
    case ACTIONS.UPDATE_SCORES: {
      const { winnerChoice } = action.payload;
      const { player1, player2 } = applyScoreUpdate(
        state.player1,
        state.player2,
        winnerChoice,
      );

      return { ...state, player1, player2 };
    }

    /**
     * START_NEXT_ROUND — clear board, swap X/O choices (scores already applied).
     */
    case ACTIONS.START_NEXT_ROUND: {
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: "x",
        winner: null,
        winningCombo: null,
        draw: false,
        moveHistory: [],
        player1: { ...state.player1, choice: toggleChoice(state.player1.choice) },
        player2: { ...state.player2, choice: toggleChoice(state.player2.choice) },
      };
    }

    /**
     * RESET_SCORES — full game reset (scores, board, fresh avatars).
     */
    case ACTIONS.RESET_SCORES: {
      return createInitialState();
    }

    /**
     * SET_GAME_MODE — 'pvp' | 'pvc'
     */
    case ACTIONS.SET_GAME_MODE: {
      const mode = action.payload;
      return {
        ...state,
        gameMode: mode,
        player2: {
          ...state.player2,
          name: mode === "pvc" ? "Computer" : "Player2",
        },
      };
    }

    /**
     * SET_PLAYER_NAMES — payload: { p1, p2 }
     */
    case ACTIONS.SET_PLAYER_NAMES: {
      const { p1, p2 } = action.payload;
      return {
        ...state,
        player1: { ...state.player1, name: p1 },
        player2: { ...state.player2, name: p2 },
      };
    }

    /**
     * UNDO_MOVE — revert to the previous snapshot (optional / future use).
     */
    case ACTIONS.UNDO_MOVE: {
      if (state.moveHistory.length === 0) return state;

      const history = [...state.moveHistory];
      const previous = history.pop();

      return {
        ...state,
        ...previous,
        moveHistory: history,
      };
    }

    default:
      return state;
  }
}
