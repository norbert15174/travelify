import React from "react";
import styled from "styled-components";
import kompas from "../../photos/kompas.png";
import "./auth.css";

const Register = ({ pos, val }) => {
  return (
    <LoginContainer className="font" pos={pos}>
      <LeftSide></LeftSide>
      <RightSide>
        <Form>
          <h3 id="head_register">Rejestracja</h3>

          <InputContainerHalf>
            <InputContainer>
              <Label htmlFor="imie">Imię</Label>
              <InputHalf type="text" name="imie" id="imie"></InputHalf>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="nazwisko">Nazwisko</Label>
              <InputHalf type="text" name="nazwisko" id="nazwisko"></InputHalf>
            </InputContainer>
          </InputContainerHalf>
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input type="text" name="email" id="email"></Input>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="login">Login</Label>
            <Input type="login" name="login" id="login"></Input>
          </InputContainer>
          <InputContainerHalf>
            <InputContainer>
              <Label htmlFor="password">Hasło</Label>
              <InputHalf
                type="password"
                name="password"
                id="password"
              ></InputHalf>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="password">Powtórz haslo</Label>
              <InputHalf
                type="password"
                name="passwordRep"
                id="papasswordRepssword"
              ></InputHalf>
            </InputContainer>
          </InputContainerHalf>
          <InputContainerHalf>
            <InputContainer>
              <Label htmlFor="date">Data urodzenia</Label>
              <InputHalf type="date" name="date" id="date"></InputHalf>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="pochodzenie">Pochodzenie</Label>
              <InputHalf
                type="text"
                name="pochodzenie"
                id="pochodzenie"
              ></InputHalf>
            </InputContainer>
          </InputContainerHalf>

          <Apply>Dołącz</Apply>
          <OrDiv>lub</OrDiv>
          <CreateAccount onClick={(e) => val(pos === "yes" ? "no" : "yes")}>
            Zaloguj się
          </CreateAccount>
        </Form>
      </RightSide>
    </LoginContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
`;
const InputContainerHalf = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const CreateAccount = styled.div`
  margin-top: 30px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;

const OrDiv = styled.div`
  font-size: 24px;
  text-align: center;
  margin-top: 32px;
  &:before {
    height: 1px;
    display: block;
    background-color: #0fa3b1;
    width: 80px;
    content: " ";
    position: relative;
    top: 19px;
    left: calc(50% - 100px);
  }
  &:after {
    text-align: center;
    height: 1px;
    display: block;
    background-color: #0fa3b1;
    width: 80px;
    content: " ";
    position: relative;
    left: calc(50% + 21px);
    top: -14px;
  }
`;

const Apply = styled.div`
  width: 200px;
  text-align: center;
  background-color: #0fa3b1;
  color: #f2f7f2;
  font-size: 24px;
  border-radius: 30px;
  padding-top: 11px;
  padding-bottom: 11px;
  position: relative;
  margin-top: 15px;
  left: calc(50% - 100px);
  cursor: pointer;
  margin-top: 50px;
`;

const Label = styled.label`
  font-size: 18px;
`;

const LoginContainer = styled.div`
  transition: left 1s;
  top: 5vh;
  left: ${({ pos }) => (pos === "yes" ? "5vw" : "105vw")};
  position: fixed;
  width: 90vw;
  height: 90vh;
  display: grid;
  grid-template-columns: 54.66% 43.34%;
  grid-template-rows: 100%;
  background-color: #f2f7f2;
  min-height: 700px;
  @media only screen and (max-width: 1020px) {
    grid-template-columns: 100%;
  }
`;
const LeftSide = styled.div`
  height: 100%;
  position: relative;
  background: url(${kompas});
  background-size: 100% 100%;
  overflow: hidden;

  @media only screen and (max-width: 1020px) {
    display: none;
  }
`;
const RightSide = styled.div`
  width: 100%;
  background-color: #f2f7f2;
  position: relative;
  @media only screen and (max-height: 800px) {
    transform: scale(0.9);
  }
  @media only screen and (max-width: 1220px) {
    transform: scale(0.8);
  }
  @media only screen and (max-width: 1020px) {
    transform: scale(1);
  }
`;

const Form = styled.div`
  width: 70%;
  position: relative;
  left: 15%;
  padding-bottom: 40px;
`;

const Input = styled.input`
  width: 95%;
  font-size: 24px;
  outline: none;
  border: none;
  border-bottom: 2px solid #0fa3b1;
  margin-bottom: 20px;
  background-color: #f2f7f2;
  margin-top: 10px;
`;

const InputHalf = styled.input`
  width: 90%;
  font-size: 24px;
  outline: none;
  border: none;
  border-bottom: 2px solid #0fa3b1;
  margin-bottom: 20px;
  margin-top: 10px;
  background-color: #f2f7f2;
`;

export default Register;
