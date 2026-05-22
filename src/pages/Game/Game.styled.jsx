import styled from "styled-components";

export const MainGameLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 1.5rem;
  width: 100%;
  max-width: 1100px;
  flex: 1;
  min-height: 0;

  ${(props) => props.theme.media.tablet`
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
  `}

  ${(props) => props.theme.media.mobile`
    flex-direction: column;
    gap: 0.75rem;
  `}
`;

export const GameBoardStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;

  ${(props) => props.theme.media.tablet`
    gap: 0.5rem;
    max-width: 360px;
  `}

  ${(props) => props.theme.media.mobile`
    gap: 0.35rem;
    max-width: 300px;
  `}
`;
