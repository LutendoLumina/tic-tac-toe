import Router from "./Router";
import { GlobalStyle } from "./styles/Global.styled";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

function App() {
  const { theme } = useContext(ThemeContext);

  const mode = theme === "dark" ? lightTheme : darkTheme;

  return (
    <div>
      <ThemeProvider theme={mode}>
        <GlobalStyle />
        <Router />
        <MusicPlayer />
      </ThemeProvider>
    </div>
  );
}

export default App;
