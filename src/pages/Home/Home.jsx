import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, SubTitle, Title } from "../../styles/General.styled";
import Button from "../../components/Button/Button";
import { SoundEffectsContext } from "../../contexts/SoundEffectsContext";

const Home = () => {
  const navigate = useNavigate();
  const { hoverSfx, clickSfx } = useContext(SoundEffectsContext);

  return (
    <Container $columnBased>
      <Title $isDarkMode>TicTacToe</Title>
      <SubTitle>Play with your friends, higher score wins</SubTitle>
      <Button
        onClick={() => {
          clickSfx.play();
          navigate("/game-on");
        }}
      >
        Play Now
      </Button>
    </Container>
  );
};

export default Home;
