import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, SubTitle, Title } from "../../styles/General.styled";
import Button from "../../components/Button/Button";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext";
import { ModalContext } from "../../contexts/ModalContext";
import PlayerNamesModal from "../../components/Modal/PlayerNamesModal";

const Home = () => {
  const navigate = useNavigate();
  const { hoverSfx, clickSfx } = useContext(SoundEffectsContext);
  const { handleModal } = useContext(ModalContext);

  const handlePlayNow = () => {
    clickSfx.play();
    handleModal(<PlayerNamesModal onFormSubmit={() => navigate("/game-on")} />);
  };

  return (
    <Container $columnBased>
      <Title $primary $isDarkMode>
        TicTacToe
      </Title>
      <SubTitle $primary>Play with your friends, higher score wins</SubTitle>
      <Button onClick={handlePlayNow}>Play Now</Button>
    </Container>
  );
};

export default Home;
