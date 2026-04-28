import styled from "styled-components";

export const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6rem;

  ${(props) => props.theme.media.mobile`
    display: flex;
    flex-direction: row;
    margin: 0.25rem;
    gap: 0.5rem;
    align-items: center;
  `}
`;

export const AvatarWrapper = styled.div`
  filter: ${(props) =>
    props.$isPlayerActive ? "grayscale(0%)" : "grayscale(90%)"};
  transition: filter 0.3s ease-in-out;

  & > div { 
    display: flex;
    width: 8rem; 
    height: 8rem;
  }

  ${(props) => props.theme.media.mobile`
    & > div {
      width: 4rem !important;
      height: 4rem !important;
    }
  `}
`;
