import React,{useState} from "react";
import Login from "./Login";
import Register from "./Register";
import styled from "styled-components";

const Auth = () => {

  const [value,setValue] = useState("no");

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
  background-color: #0fa3b1;
  position: fixed;
  left: 0;
  top: 0;
`;

export default Auth;
