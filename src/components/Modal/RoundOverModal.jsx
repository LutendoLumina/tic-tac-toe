import React, { useContext } from "react";
import { Title, SubTitle } from "../../styles/General.styled";
import { ModalHeader, ModalBody, ModalFooter } from "./Modal.styled";
import Button from "../Button/Button";
import { GameContext } from "../../contexts/GameContext";
import { ModalContext } from "../../contexts/ModalContext";

const RoundOverModal = () => {
  const { resetBoard, game, roundComplete } = useContext(GameContext);
  const { handleModal } = useContext(ModalContext);

  const handleContinue = () => {
    roundComplete();
    resetBoard();
    handleModal();
  };

  return (
    <>
      <ModalHeader>
        <Title $primary>
          {game.roundWinner.name} Wins This Round
        </Title>
      </ModalHeader>
      <ModalBody>
        <SubTitle $primary>Choices will be switched now.</SubTitle>
        <SubTitle $primary>
          {game.player1.name}: {game.player1.score}
        </SubTitle>
        <SubTitle $primary>
          {game.player2.name}: {game.player2.score}
        </SubTitle>
      </ModalBody>
      <ModalFooter>
        <Button color="#f9c811" onClick={handleContinue}>
          Continue
        </Button>
        <Button color="#8437f9">Restart</Button>
      </ModalFooter>
    </>
  );
};

export default RoundOverModal;
