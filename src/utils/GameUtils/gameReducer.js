import { genConfig } from "react-nice-avatar";
import { applyScoreUpdate, checkWinner, toggleChoice } from "./gameHelpers.js";
import { loadGameState } from "./gameStorage.js";

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

const getDefaultState = () => ({
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

export const createInitialState = () => loadGameState() ?? getDefaultState();

export const initialState = createInitialState();

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE: {
      const { index } = action.payload;

      if (state.board[index] !== null || state.winner || state.draw) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;

      const winResult = checkWinner(newBoard);
      const isDraw = !winResult && newBoard.every((cell) => cell !== null);

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
        winner: winResult ? winResult.winner : null,
        winningCombo: winResult ? winResult.winningCombo : null,
        draw: isDraw,
        moveHistory: [...state.moveHistory, snapshot],
      };
    }

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

    case ACTIONS.UPDATE_SCORES: {
      const { winnerChoice } = action.payload;
      const { player1, player2 } = applyScoreUpdate(
        state.player1,
        state.player2,
        winnerChoice,
      );
      return { ...state, player1, player2 };
    }

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

    case ACTIONS.RESET_SCORES: {
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: "x",
        winner: null,
        winningCombo: null,
        draw: false,
        moveHistory: [],
        player1: { ...state.player1, score: 0, choice: "x" },
        player2: { ...state.player2, score: 0, choice: "o" },
      };
    }

    case ACTIONS.SET_GAME_MODE: {
      const mode = action.payload;
      return {
        ...state,
        gameMode: mode,
        player2: {
          ...state.player2,
          name: mode === "pvc" ? "Pixel" : "Player2",
        },
      };
    }

    case ACTIONS.SET_PLAYER_NAMES: {
      const { p1, p2 } = action.payload;
      return {
        ...state,
        player1: { ...state.player1, name: p1 },
        player2: { ...state.player2, name: p2 },
      };
    }

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
