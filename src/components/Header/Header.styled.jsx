import styled from "styled-components";
import { MdLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  height: auto;
  min-height: 4rem;
  padding: 0.75rem 1.5rem;

  .logo {
    height: 3rem;
    cursor: pointer;
  }

  ${(props) => props.theme.media.mobile`
    padding: 0.5rem 1rem;
    min-height: 3rem;

    .logo {
      height: 2.25rem;
    }
  `}
`;

export const LightModeIcon = styled(MdLightMode)`
  color: ${(props) => props.theme.colors.text};
  font-size: 2rem;
  cursor: pointer;
`;

export const DarkModeIcon = styled(MdOutlineDarkMode)`
  color: ${(props) => props.theme.colors.text};
  font-size: 2rem;
  cursor: pointer;
`;
