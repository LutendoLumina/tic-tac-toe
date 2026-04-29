import Router from "./Router";
import "./App.css";
import { GlobalStyle } from "./styles/Global.styled";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  const mode = theme === "dark" ? lightTheme : darkTheme;

  return (
    <div>
      <ThemeProvider theme={mode}>
          <GlobalStyle />
          <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
