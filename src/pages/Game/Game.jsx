import React, { useEffect, useContext } from "react";
import { Container } from "../../styles/General.styled";
import { GameBoardStyle, MainGameLayout } from "./Game.styled";
import GameCell from "../../components/GameCell/GameCell";
import { useGame } from "../../hooks/useGame";
import Player from "../../components/Player/Player";
import { checkForWinner } from "../../utils/GameUtils/gameHelpers.js";
import { ModalContext } from "../../contexts/ModalContext";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext";
import RoundOverModal from "../../components/Modal/RoundOverModal";

const Game = () => {
  const {
    board,
    currentPlayer,
    winningCombo,
    player1,
    player2,
    gameMode,
    winner,
    draw,
    makeMove,
    updateScores,
  } = useGame();

  const { handleModal } = useContext(ModalContext);
  const { drawSfx, winSfx } = useContext(SoundEffectsContext);

  const computerChoice = player2.choice;

  useEffect(() => {
    if (gameMode !== "pvc" || currentPlayer !== computerChoice || winner || draw)
      return;

    const emptyIndices = board
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    const aiTimeout = setTimeout(() => {
      const tempBoard = [...board];
      tempBoard[randomIndex] = computerChoice;

      const result = checkForWinner(tempBoard);

      let detectedWinner = null;
      let combo = null;

      if (result === "draw") {
        // draw handled via reducer after makeMove
      } else if (result) {
        combo = result;
        detectedWinner = computerChoice;
      }

      makeMove(randomIndex, detectedWinner, combo);

      if (result) {
        const winnerChoice = result === "draw" ? "draw" : detectedWinner;
        updateScores(winnerChoice);

        if (result === "draw") {
          drawSfx.play();
          setTimeout(() => {
            handleModal(<RoundOverModal />);
          }, 800);
        } else {
          winSfx.play();
          setTimeout(() => {
            handleModal(<RoundOverModal />);
          }, 800);
        }
      }
    }, 700);

    return () => clearTimeout(aiTimeout);
  }, [
    currentPlayer,
    computerChoice,
    gameMode,
    board,
    winner,
    draw,
    makeMove,
    updateScores,
    handleModal,
    winSfx,
    drawSfx,
  ]);

  return (
    <Container $game>
      <MainGameLayout>
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
      </MainGameLayout>
    </Container>
  );
};

export default Game;
