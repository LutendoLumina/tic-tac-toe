import React from "react";
import { Container } from "../../styles/General.styled";
import { GameBoardStyle } from "./Game.styled";
import GameCell from "../../components/GameCell/GameCell";
import { useGame } from "../../hooks/useGame";
import Player from "../../components/Player/Player";

const Game = () => {
  const { board, currentPlayer, winningCombo, player1, player2 } = useGame();

  return (
    <Container>
      <Player
        player={player1}
        isPlayerActive={player1.choice === currentPlayer}
      />
      <GameBoardStyle>
        {board.map((item, index) => (
          <GameCell
            key={index}
            cellItem={item}
            index={index}
            isWinningCell={winningCombo?.includes(index)}
          />
        ))}
      </GameBoardStyle>
      <Player
        player={player2}
        isPlayerActive={player2.choice === currentPlayer}
      />
    </Container>
  );
};

export default Game;
