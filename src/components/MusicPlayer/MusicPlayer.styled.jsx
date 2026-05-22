import styled from "styled-components";
import { MdPlayArrow, MdPause, MdSkipNext } from "react-icons/md";

export const MusicPlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: auto;
  max-width: calc(100vw - 2rem);
  padding: 0.25rem 0.75rem;
  pointer-events: auto;
`;

export const PlayIcon = styled(MdPlayArrow)`
  color: ${(props) => props.theme.colors.secondry};
  font-size: 3rem;
  cursor: pointer;
  flex-shrink: 0;

  ${(props) => props.theme.media.mobile`
    font-size: 2rem;
  `}
`;

export const PauseIcon = styled(MdPause)`
  color: ${(props) => props.theme.colors.secondry};
  font-size: 3rem;
  cursor: pointer;
  flex-shrink: 0;

  ${(props) => props.theme.media.mobile`
    font-size: 2rem;
  `}
`;

export const NextIcon = styled(MdSkipNext)`
  color: ${(props) => props.theme.colors.secondry};
  font-size: 3rem;
  cursor: pointer;
  flex-shrink: 0;

  ${(props) => props.theme.media.mobile`
    font-size: 2rem;
  `}
`;
