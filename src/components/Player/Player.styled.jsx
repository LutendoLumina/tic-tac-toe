import styled from "styled-components";

export const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-width: 0;
  flex-shrink: 0;

  ${(props) => props.theme.media.tablet`
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
  `}

  ${(props) => props.theme.media.mobile`
    flex-direction: row;
    gap: 0.35rem;
    align-items: center;
  `}
`;

export const AvatarWrapper = styled.div`
  filter: ${(props) =>
    props.$isPlayerActive ? "grayscale(0%)" : "grayscale(100%)"};
  transition: filter 0.3s ease-in-out;
  flex-shrink: 0;
  align-self: center;
`;

export const AvatarImage = styled.div`
  --avatar-size: 100px;
  width: var(--avatar-size);
  height: var(--avatar-size);
  min-width: var(--avatar-size);
  min-height: var(--avatar-size);
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  line-height: 0;

  /* react-nice-avatar outer wrapper only */
  & > div {
    width: var(--avatar-size) !important;
    height: var(--avatar-size) !important;
    min-width: var(--avatar-size) !important;
    min-height: var(--avatar-size) !important;
    border-radius: 50%;
    overflow: hidden;
  }

  ${(props) => props.theme.media.tablet`
    --avatar-size: 80px;
  `}

  ${(props) => props.theme.media.mobile`
    --avatar-size: 64px;
  `}
`;
