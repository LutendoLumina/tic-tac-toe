import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Title, SubTitle } from "../../styles/General.styled";
import { ModalHeader, ModalBody, ModalFooter } from "./Modal.styled";
import Button from "../Button/Button";
import { useGame } from "../../hooks/useGame";
import { ModalContext } from "../../contexts/ModalContext";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext";
import PlayerNamesModal from "./PlayerNamesModal";

const PlaySessionModal = () => {
  const { player1, player2, resetScores } = useGame();
  const { handleModal } = useContext(ModalContext);
  const { clickSfx } = useContext(SoundEffectsContext);
  const navigate = useNavigate();

  const handleContinue = () => {
    clickSfx.play();
    handleModal();
    navigate("/game-on");
  };

  const handleNewGame = () => {
    clickSfx.play();
    resetScores();
    handleModal(
      <PlayerNamesModal onFormSubmit={() => navigate("/game-on")} />,
    );
  };

  return (
    <>
      <ModalHeader>
        <Title $primary>Resume your match?</Title>
      </ModalHeader>
      <ModalBody>
        <SubTitle $primary style={{ marginBottom: "1rem" }}>
          You have a game in progress with saved scores.
        </SubTitle>
        <SubTitle $primary>
          {player1.name}: {player1.score}
        </SubTitle>
        <SubTitle $primary>
          {player2.name}: {player2.score}
        </SubTitle>
      </ModalBody>
      <ModalFooter style={{ gap: "0.75rem", flexWrap: "wrap" }}>
        <Button color="#f9c811" onClick={handleContinue}>
          Continue
        </Button>
        <Button color="#8437f9" onClick={handleNewGame}>
          New game
        </Button>
      </ModalFooter>
    </>
  );
};

export default PlaySessionModal;
