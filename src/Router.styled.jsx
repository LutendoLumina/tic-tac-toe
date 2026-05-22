import styled from "styled-components";

export const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const MainContent = styled.main`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  width: 100%;
`;

export const RouteContainer = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`;
