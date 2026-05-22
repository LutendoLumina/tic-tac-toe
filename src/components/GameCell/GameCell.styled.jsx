import styled from "styled-components";

export const CellStyle = styled.button`
  background-color: ${(props) =>
    props.$isWinningCell
      ? props.theme.colors.success
      : props.theme.cell.background};
  color: ${(props) => props.theme.colors.text};
  font-size: clamp(1rem, 4vw, 3rem);
  border: none;
  border-radius: 1.25rem;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  aspect-ratio: 1 / 1;
  box-shadow: 5px 10px ${(props) => props.theme.shadow.cream};
  cursor: pointer;
  padding: 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .markedItem,
  .outlineIcon {
    width: 70%;
    height: 70%;
    object-fit: contain;
    object-position: center;
  }

  ${(props) => props.theme.media.mobile`
    border-radius: 0.75rem;
    padding: 0.2rem;
  `}
`;
