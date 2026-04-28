import { useState, createContext } from "react";

export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const [game, setGame] = useState({
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    player1: {
      choice: "x",
      name: "Akhil",
      score: 0,
    },
    player2: {
      choice: "o",
      name: "Lumina",
      score: 0,
    },
    turn: "x",
    roundWinner: "",
  });

  const updateBoard = (index) => {
    let updateBoard = game.board;
    updateBoard[index] = game.turn;
    setGame({
      ...game,
      board: updateBoard,
      turn: game.turn === "x" ? "o" : "x",
    });
  };

  const resetBoard = () => {
    setGame({
      ...game,
      board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    });
  };

  const toggleChoice = (choice) => (choice === "x" ? "o" : "x");

  const switchTurn = () => {
    setGame((prevGame) => ({
      ...prevGame,
      player1: {
        ...prevGame.player1,
        choice: toggleChoice(game.player1.choice),
      },
      player2: {
        ...prevGame.player2,
        choice: toggleChoice(game.player2.choice),
      },
      turn: "x",
    }));
  };

  const updateScore = (winner) => {
    // winner player1, player2, draw
    setGame((prevGame) => ({
      ...prevGame,
      [winner]: { ...prevGame[winner], score: prevGame[winner].score + 1 },
      roundWinner: prevGame[winner],
    }));
  };

  const roundComplete = () => {
    if (game.turn === game.player1.choice) {
      updateScore("player1");
    } else if (game.turn === game.player2.choice) {
      updateScore("player2");
    } else {
      console.log("DRAW");
    }
    switchTurn();
  };

  return (
    <GameContext.Provider
      value={{ game, updateBoard, resetBoard, roundComplete }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
