import React, { useContext } from "react";
import { Title, SubTitle } from "../../styles/General.styled";
import { ModalHeader, ModalBody, ModalFooter } from "./Modal.styled";
import Button from "../Button/Button";
import { GameContext } from "../../contexts/GameContext";
import { ModalContext } from "../../contexts/ModalContext";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext";
import { useNavigate } from "react-router-dom";

const RoundOverModal = () => {
  const { resetBoard, game, roundComplete, restartGame } =
    useContext(GameContext);
  const { handleModal } = useContext(ModalContext);
  const { clickSfx } = useContext(SoundEffectsContext);

  const navigate = useNavigate();

  const handleContinue = () => {
    clickSfx.play();
    roundComplete();
    resetBoard();
    handleModal();
  };

  return (
    <>
      <ModalHeader>
        <Title $primary>
          {game.roundWinner
            ? `${game.roundWinner.name} Wins This Round`
            : "Round drawn"}
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
        <Button
          color="#8437f9"
          onClick={() => {
            clickSfx.play();
            restartGame();
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
