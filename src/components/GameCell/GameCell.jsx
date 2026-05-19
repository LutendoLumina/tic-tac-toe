import React, { useContext } from "react";
import { CellStyle } from "./GameCell.styled";
import { checkForWinner } from "../../utils/GameUtils/index.jsx";
import { useGame } from "../../hooks/useGame";
import IconX from "../../assets/x-icon.svg";
import XIconOutlined from "../../assets/x-icon-outlined.svg";
import IconO from "../../assets/o-icon.svg";
import OIconOutlined from "../../assets/o-icon-outlined.svg";
import BlankIconOutlined from "../../assets/blank-outlined.svg";
import { ModalContext } from "../../contexts/ModalContext.jsx";
import RoundOverModal from "../Modal/RoundOverModal.jsx";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext.jsx";

const GameCell = ({ cellItem, index, isWinningCell }) => {
  const { board, currentPlayer, winner, draw, makeMove, updateScores } =
    useGame();
  const { clickSfx, drawSfx, winSfx } = useContext(SoundEffectsContext);
  const { handleModal } = useContext(ModalContext);

  const cellClickHandler = () => {
    if (cellItem !== null || winner || draw) return;

    clickSfx.play();

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;

    const result = checkForWinner(nextBoard);

    let detectedWinner = null;
    let winningCombo = null;

    if (result === "draw") {
      // draw flag is derived inside the reducer
    } else if (result) {
      winningCombo = result;
      detectedWinner = currentPlayer;
    }

    makeMove(index, detectedWinner, winningCombo);

    if (result) {
      const winnerChoice =
        result === "draw" ? "draw" : detectedWinner;
      updateScores(winnerChoice);

      if (result === "draw") {
        drawSfx.play();
      } else {
        winSfx.play();
      }

      setTimeout(() => {
        handleModal(<RoundOverModal />);
      }, 1500);
    }
  };

  if (cellItem === "x") {
    return (
      <CellStyle $isWinningCell={isWinningCell ?? false}>
        <img src={IconX} className="markedItem" alt="X Icon" />
      </CellStyle>
    );
  } else if (cellItem === "o") {
    return (
      <CellStyle $isWinningCell={isWinningCell ?? false}>
        <img src={IconO} className="markedItem" alt="Y Icon" />
      </CellStyle>
    );
  }

  return (
    <CellStyle onClick={cellClickHandler}>
      <img src={BlankIconOutlined} className="outlineIcon" alt="Empty Cell" />
    </CellStyle>
  );
};

export default GameCell;
