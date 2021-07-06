import React, {useState} from "react";
import Login from "./login";
import Register from "./register";
import styled from "styled-components";


const Auth = () => {

  const [value, setValue] = useState("no");

  return (
    <Container>
      <Login pos={value} val={setValue}></Login>
      <Register  pos={value} val={setValue}></Register>
    </Container>
  );
};


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 850px;
  background-color: #0fa3b1;
  position: absolute;
  left: 0;
  top: 0;
  overflow-x: hidden; //horizontal
  @media only screen and (max-width: 600px) {
    min-height: 600px;
  }
`;

export default Auth;
