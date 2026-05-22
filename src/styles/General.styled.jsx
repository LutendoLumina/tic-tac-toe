import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) =>
    props.$columnBased || props.$game ? "column" : "row"};
  height: 100%;
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.background.primary};
  padding: 1rem;
  padding-bottom: 5.5rem;
  text-align: center;
  gap: ${(props) => (props.$columnBased ? "1.25rem" : "0")};
  position: relative;

  ${(props) => props.theme.media.tablet`
    flex-direction: column;
    gap: 1rem;
    padding: 0.75rem;
    padding-bottom: 5rem;
  `}

  ${(props) => props.theme.media.mobile`
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.5rem;
    padding-bottom: 4.5rem;
  `}
`;

export const Title = styled.h1`
  color: ${(props) =>
    props.primary ? props.theme.colors.text : props.theme.colors.text};
  font-size: 3rem;
  font-family: "Pacifico", cursive;
  background-color: transparent;
  flex-shrink: 0;

  ${(props) => props.theme.media.mobile`
    font-size: 1.5rem;
    margin: 0;
  `}
`;

export const SubTitle = styled.h2`
  color: ${(props) =>
    props.primary ? props.theme.colors.text : props.theme.colors.text};
  font-size: 1.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  background-color: transparent;
  flex-shrink: 0;

  ${(props) => props.theme.media.mobile`
    font-size: 0.75rem;
    margin: 0.1rem 0;
  `}
`;

export const Text = styled.p`
  color: ${(props) =>
    props.primary ? props.theme.colors.secondary : props.theme.colors.text};
  font-size: 1.2rem;
  font-family: "Poppins", sans-serif;
  background-color: transparent;
  flex-shrink: 0;

  ${(props) => props.theme.media.mobile`
    font-size: 0.7rem;
    margin: 0.1rem 0;
  `}
`;
