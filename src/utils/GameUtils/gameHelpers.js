export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { winner: board[a], winningCombo: [a, b, c] };
    }
  }
  return null;
}

/** @returns {number[] | "draw" | false} */
export function checkForWinner(board) {
  const winResult = checkWinner(board);
  if (winResult) return winResult.winningCombo;
  if (!board.includes(null)) return "draw";
  return false;
}

export const toggleChoice = (choice) => (choice === "x" ? "o" : "x");

export function applyScoreUpdate(player1, player2, winnerChoice) {
  const p1 = { ...player1 };
  const p2 = { ...player2 };

  if (winnerChoice === "draw") {
    p1.score += 0.5;
    p2.score += 0.5;
  } else if (winnerChoice === "x") {
    p1.choice === "x" ? (p1.score += 1) : (p2.score += 1);
  } else if (winnerChoice === "o") {
    p1.choice === "o" ? (p1.score += 1) : (p2.score += 1);
  }

  return { player1: p1, player2: p2 };
}
