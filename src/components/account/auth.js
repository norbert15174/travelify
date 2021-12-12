import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import styled from "styled-components";
import BackgroundImage from "./assets/BackgroundImage.jpg";
import { endpoints } from "../../url";

const Auth = () => {
  const location = useLocation();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(
    location.state === undefined
      ? "login"
      : location.state.toRegister
      ? "register"
      : "login"
  );



  return (
    <Container>
      <BlurContainer>
        {currentScreen === "login" ? (
          <Login
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            registerSuccess={registerSuccess}
            setRegisterSuccess={setRegisterSuccess}
          />
        ) : (
          <Register
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            registerSuccess={registerSuccess}
            setRegisterSuccess={setRegisterSuccess}
          />
        )}
      </BlurContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${() => BackgroundImage});
  background-size: cover;
  background-position: bottom left;
  position: fixed;
`;

const BlurContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  z-index: 1;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export default Auth;
