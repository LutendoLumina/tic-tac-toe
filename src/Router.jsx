import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Game from "./pages/Game/Game";
import Header from "./components/Header/Header";
import { ModalContextProvider } from "./contexts/ModalContext";

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  width: 100%;
`;

const RouteContainer = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`;

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
