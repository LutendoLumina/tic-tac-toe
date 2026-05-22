import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

html,
body,
#root {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

body {
    background-color: ${(props) => props.theme.background.primary};
}
`;
