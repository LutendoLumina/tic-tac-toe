const checkForSuquence = (option1, option2, option3) => {
  return option1 === option2 && option2 === option3;
};

export const checkForWinner = (board) => {
  // console.log("In here");

  // rows
  for (let i = 0; i < 9; i += 3) {
    if (checkForSuquence(board[i], board[i + 1], board[i + 2])) {
      console.log("Row winner");
      return true;
    }
  }

  // columns
  for (let i = 0; i < 3; i+=1) {
    if (checkForSuquence(board[i], board[i + 3], board[i + 6])) {
      console.log("Column winner");
      return true;
    }
  }

  // diagonal 1
  if (board[0] === board[4] && board[4] === board[8]) {
    console.log("Diagonal winner");
    return true;
  }

  // diagonal 2
  if (board[2] === board[4] && board[4] === board[6]) {
    console.log("Diagonal winner");
    return true;
  }
};
