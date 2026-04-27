import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, SubTitle, Title } from "../../styles/General.styled";
import Button from "../../components/Button/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title isDarkMode>TicTacToe</Title>
      <SubTitle>Play with your friends, higher score wins</SubTitle>
      <Button onClick={() => navigate("/game-on")}>Play Now</Button>
    </Container>
  );
};

export default Home;
