import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Game from "./pages/Game/Game";
import Header from "./components/Header/Header";
import { ModalContextProvider } from "./contexts/ModalContext";
import { AppLayout, MainContent, RouteContainer } from "./Router.styled";

const Router = () => {
  return (
    <BrowserRouter>
      <ModalContextProvider>
        <AppLayout>
          <Header />
          <MainContent>
            <RouteContainer>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="details/" element={<Details />} />
                <Route path="/game-on" element={<Game />} />
              </Routes>
            </RouteContainer>
          </MainContent>
        </AppLayout>
      </ModalContextProvider>
    </BrowserRouter>
  );
};

export default Router;
