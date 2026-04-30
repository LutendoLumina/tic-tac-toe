const checkForSuquence = (option1, option2, option3) => {
  if (option1 === null || option2 === null || option3 === null) {
    return false;
  }
  return option1 === option2 && option2 === option3;
};

export const checkForWinner = (board) => {
  // rows
  for (let i = 0; i < 9; i += 3) {
    if (checkForSuquence(board[i], board[i + 1], board[i + 2])) {
      console.log("Row winner");
      return [i, i + 1, i + 2];
    }
  }

  // columns
  for (let i = 0; i < 3; i += 1) {
    if (checkForSuquence(board[i], board[i + 3], board[i + 6])) {
      console.log("Column winner");
      return [i, i + 3, i + 6];
    }
  }

  // diagonal 1
  if (checkForSuquence(board[0], board[4], board[8])) {
    console.log("Diagonal winner");
    return [0, 4, 8];
  }

  // diagonal 2
  if (checkForSuquence(board[2], board[4], board[6])) {
    console.log("Diagonal winner");
    return [2, 4, 6];
  }

  // check if the game has drawn
  // the game is over or there is no winner
  console.log(board);
  if(!board.includes(null)) {
    return "draw"
  }

   return false;
};
