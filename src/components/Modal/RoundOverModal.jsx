import React, { useContext } from "react";
import { Title, SubTitle } from "../../styles/General.styled";
import { ModalHeader, ModalBody, ModalFooter } from "./Modal.styled";
import Button from "../Button/Button";
import { useGame } from "../../hooks/useGame";
import { ModalContext } from "../../contexts/ModalContext";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext";
import { useNavigate } from "react-router-dom";

const RoundOverModal = () => {
  const { winner, draw, player1, player2, startNextRound, resetScores } =
    useGame();
  const { handleModal } = useContext(ModalContext);
  const { clickSfx } = useContext(SoundEffectsContext);

  const navigate = useNavigate();

  const getWinnerName = () => {
    if (draw) return null;
    if (winner === player1.choice) return player1.name;
    if (winner === player2.choice) return player2.name;
    return null;
  };

  const winnerName = getWinnerName();

  const handleContinue = () => {
    clickSfx.play();
    startNextRound();
    handleModal();
  };

  return (
    <>
      <ModalHeader>
        <Title $primary>
          {winnerName
            ? `${winnerName} Wins This Round`
            : "Round drawn"}
        </Title>
      </ModalHeader>
      <ModalBody>
        <SubTitle $primary>Choices will be switched now.</SubTitle>
        <SubTitle $primary>
          {player1.name}: {player1.score}
        </SubTitle>
        <SubTitle $primary>
          {player2.name}: {player2.score}
        </SubTitle>
      </ModalBody>
      <ModalFooter>
        <Button color="#f9c811" onClick={handleContinue}>
          Continue
        </Button>
        <Button
          color="#8437f9"
          onClick={() => {
            clickSfx.play();
            resetScores();
            handleModal();
            navigate("/");
          }}
        >
          Restart
        </Button>
      </ModalFooter>
    </>
  );
};

export default RoundOverModal;
