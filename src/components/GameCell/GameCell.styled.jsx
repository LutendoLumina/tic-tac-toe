import styled from "styled-components";

export const CellStyle = styled.button`
  background-color: ${(props) => props.theme.background.secondary};
  color: ${(props) => props.theme.colors.text};
  font-size: 3rem;
  border: none;
  border-radius: 10px;
  width: 10rem;
  height: 10rem;
  box-shadow: 5px 10px ${(props) => props.theme.colors.cream};
  cursor: pointer;

  ${(props) => props.theme.media.tablet`
    width: 7rem;
    height: 7rem;
    font-size: 1.5rem;
  `}

  ${(props) => props.theme.media.mobile`
    width: 5rem;
    height: 5rem;
    font-size: 1rem;
  `}
`;
