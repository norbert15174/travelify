import React from "react";
import Menu from "../components/menu/Menu";
import styled from "styled-components";
import ErrorBoundary from "./ErrorBoundary";

const UserTemplate = ({ children, notLogged = false }) => {
  return (
    <ErrorBoundary>
      {!notLogged && <Menu />}
      <Container notLogged={notLogged}>{children}</Container>
    </ErrorBoundary>
  );
};

const Container = styled.div`
  width: ${({ notLogged }) =>
    !notLogged ? "calc(100% - 90px)" : "100%"}; // 120px => Menu sidebar width;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  @media only screen and (max-height: 560px) {
    width: ${({ notLogged }) => (!notLogged ? "calc(100% - 80px)" : "100%")};
  }
  @media only screen and (max-height: 480px) {
    width: ${({ notLogged }) => (!notLogged ? "calc(100% - 70px)" : "100%")};
  }
  @media only screen and (max-height: 400px) {
    width: ${({ notLogged }) => (!notLogged ? "calc(100% - 60px)" : "100%")};
  }
  @media only screen and (max-width: 720px) {
    width: 100%;
  }
  min-width: 360px;
`;

export default UserTemplate;
