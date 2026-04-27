import styled from "styled-components";

export const GameBoardStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  ${(props) => props.theme.media.tablet`
    gap: 0.5rem;
    padding: 1rem;
  `}

  ${(props) => props.theme.media.mobile`
    gap: 0.3rem;
    padding: 0.5rem;
  `}
`;
