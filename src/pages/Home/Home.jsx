import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, SubTitle, Title } from "../../styles/General.styled";
import Button from "../../components/Button/Button";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext";
import { ModalContext } from "../../contexts/ModalContext";
import PlayerNamesModal from "../../components/Modal/PlayerNamesModal";
import PlaySessionModal from "../../components/Modal/PlaySessionModal";
import { useGame } from "../../hooks/useGame";
import { hasActiveSession } from "../../utils/GameUtils/hasActiveSession";

const Home = () => {
  const navigate = useNavigate();
  const { clickSfx } = useContext(SoundEffectsContext);
  const { handleModal } = useContext(ModalContext);
  const { board, player1, player2, gameMode, winner, draw } = useGame();

  const goToGame = () => navigate("/game-on");

  const handlePlayNow = () => {
    clickSfx.play();

    const sessionActive = hasActiveSession({
      board,
      player1,
      player2,
      gameMode,
      winner,
      draw,
    });

    if (sessionActive) {
      handleModal(<PlaySessionModal />);
    } else {
      handleModal(<PlayerNamesModal onFormSubmit={goToGame} />);
    }
  };

  return (
    <Container $columnBased>
      <Title $primary $isDarkMode>
        TicTacToe
      </Title>
      <SubTitle $primary>Challenge the computer — highest score wins</SubTitle>
      <Button onClick={handlePlayNow}>Play Now</Button>
    </Container>
  );
};

export default Home;
