import React, { useState } from "react";
import Login from "./login";
import Register from "./register";
import styled from "styled-components";

const Auth = () => {
  const [value, setValue] = useState("no");

  return (
    <Container>
      <BlurContainer>
        {value === "no" ? <Login pos={value} val={setValue}></Login> : <Register pos={value} val={setValue}></Register>}
      </BlurContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("http://www.myamazingtrip.com/images/sd1.jpg");
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
