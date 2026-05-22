/**
 * True when a PvC match is in progress or has scored rounds to resume.
 */
export function hasActiveSession({ board, player1, player2, gameMode, winner, draw }) {
  if (gameMode !== "pvc") return false;

  const hasScores = player1.score > 0 || player2.score > 0;
  const hasMoves = board.some((cell) => cell !== null);

  return hasScores || hasMoves || Boolean(winner) || draw;
}
