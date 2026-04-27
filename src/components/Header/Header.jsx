import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { HeaderWrapper, LightModeIcon, DarkModeIcon } from "./Header.styled";
import Logo from "../../assets/tic-tac-toe.svg";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <img src={Logo} className="logo" onClick={() => navigate("/")}  alt="Tic Tac Toe Logo" />

      <span
        onClick={() => {
          toggleTheme();
        }}
      >
        {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </span>

      {/* <button
        onClick={() => {
          toggleTheme();
        }}
      >
        Toggle Theme
      </button> */}
    </HeaderWrapper>
  );
};

export default Header;
