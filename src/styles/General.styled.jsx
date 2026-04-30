import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => props.$columnBased ? "column" : "row"};
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.background.primary};
  padding: 1rem;
  text-align: center;

  ${(props) => props.theme.media.mobile`
    flex-direction: column;
    justify-content: space-around;
    padding: 4.5rem;
  `}
`;


export const Title = styled.h1`
  color: ${(props) => props.primary ? props.theme.colors.text : props.theme.colors.text};
  font-size: 3rem;
  font-family: "Pacifico", cursive;
  background-color: transparent;

  ${(props) => props.theme.media.mobile`
    font-size: 1.5rem;
    margin: 0;
  `}
`;

export const SubTitle = styled.h2`
  color: ${(props) => props.primary ? props.theme.colors.text : props.theme.colors.text};
  font-size: 1.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  background-color: transparent;

  ${(props) => props.theme.media.mobile`
    font-size: 0.75rem;
    margin: 0.1rem 0;
  `}
`;

export const Text = styled.p`
  color: ${(props) => props.primary ? props.theme.colors.secondary : props.theme.colors.text};
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  background-color: transparent;

  ${(props) => props.theme.media.mobile`
    font-size: 0.7rem;
    margin: 0.1rem 0;
  `}
`;
