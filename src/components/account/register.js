import React, { useState } from "react";
import styled from "styled-components";
import kompas from "../../assets/kompas.png";
import "./auth.css";
import url from "../../url";

const Register = ({ pos, val }) => {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [nationality, setNationality] = useState("");

  async function AccountRegister() {
    const path = url + "/auth/register";
    await fetch(path, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
        email: email,
        firstName: name,
        surName: surname,
        birthDay: date,
        nationality: nationality,
      }),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  return (
    <LoginContainer className="font" pos={pos}>
      <LeftSide></LeftSide>
      <RightSide>
        <Form>
          <h3 id="head_register">Rejestracja</h3>

          <InputContainerHalf>
            <InputContainer>
              <Label htmlFor="imie">Imię</Label>
              <InputHalf
                type="text"
                name="imie"
                id="imie"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></InputHalf>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="nazwisko">Nazwisko</Label>
              <InputHalf
                type="text"
                name="nazwisko"
                id="nazwisko"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></InputHalf>
            </InputContainer>
          </InputContainerHalf>
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="login">Login</Label>
            <Input
              type="login"
              name="login"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            ></Input>
          </InputContainer>
          <InputContainerHalf>
            <InputContainer>
              <Label htmlFor="password">Hasło</Label>
              <InputHalf
                type="password"
                name="passwordFirst"
                id="passwordFirst"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></InputHalf>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="password">Powtórz haslo</Label>
              <InputHalf
                type="password"
                name="passwordRep"
                id="papasswordRepssword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              ></InputHalf>
            </InputContainer>
          </InputContainerHalf>
          <InputContainerHalf>
            <InputContainer>
              <Label htmlFor="date">Data urodzenia</Label>
              <InputHalf
                type="date"
                name="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
              ></InputHalf>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="pochodzenie">Pochodzenie</Label>
              <InputHalf
                type="text"
                name="pochodzenie"
                id="pochodzenie"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              ></InputHalf>
            </InputContainer>
          </InputContainerHalf>

          <Apply onClick={(e) => AccountRegister()}>Dołącz</Apply>
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
  @media only screen and (max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

const CreateAccount = styled.div`
  margin-top: 30px;
  font-size: 16px;
  color: ${({theme}) => theme.color.greyFont};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  text-align: center;
  cursor: pointer;
`;

const OrDiv = styled.div`
  font-size: 24px;
  text-align: center;
  color: ${({theme}) => theme.color.greyFont};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  margin-top: 32px;
  &:before {
    height: 1px;
    display: block;
    background-color: ${({theme}) => theme.color.darkTurquise};
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
    background-color: ${({theme}) => theme.color.darkTurquise};
    width: 80px;
    content: " ";
    position: relative;
    left: calc(50% + 21px);
    top: -14px;
  }
  @media only screen and (max-width: 800px) {
    margin-top: 15px;
  }
`;

const Apply = styled.div`
  width: 200px;
  text-align: center;
  background-color: ${({theme}) => theme.color.darkTurquise};
  color: ${({theme}) => theme.color.lightBackground};
  font-size: 24px;
  border-radius: 30px;
  padding-top: 11px;
  padding-bottom: 11px;
  position: relative;
  margin-top: 15px;
  left: calc(50% - 100px);
  cursor: pointer;
  margin-top: 50px;
  @media only screen and (max-width: 800px) {
    margin-top: 20px;
    transform: scale(0.7);
  }
`;

const Label = styled.label`
  color: ${({theme}) => theme.color.greyFont};
  font-weight: ${({theme}) => theme.fontWeight.bold};
  font-size: 18px;
  @media only screen and (max-width: 800px) {
    font-size: 15px;
  }
`;

const LoginContainer = styled.div`
  transition: transform 1.5s;
  left: 5vw;
  transform: ${({ pos }) =>
    pos === "yes" ? "translateX(0vw)" : "translateX(150vw)"};
  top: 5vh;
  position: absolute;

  width: 90vw;
  height: 90vh;
  min-height: 800px;
  display: grid;
  grid-template-columns: 54.66% 43.34%;
  grid-template-rows: 100%;
  background-color: ${({theme}) => theme.color.lightBackground};

  @media only screen and (max-width: 1020px) {
    grid-template-columns: 100%;
  }
  @media only screen and (max-width: 600px) {
    min-height: 750px;
    margin-bottom: 50px;
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
  background-color: ${({theme}) => theme.color.lightBackground};
  position: relative;

  @media only screen and (max-width: 1220px) {
    transform: scale(0.8);
  }
  @media only screen and (max-width: 1020px) {
    transform: scale(1);
  }
  @media only screen and (max-width: 1020px) {
    transform: scale(0.7);
  }
  @media only screen and (max-width: 800px) {
    top: 20px;
    transform: scale(1);
  }
`;

const Form = styled.div`
  width: 70%;
  position: relative;
  left: 15%;
  padding-bottom: 40px;
  @media only screen and (max-width: 800px) {
    left: 10%;
    width: 80%;
  }
`;

const Input = styled.input`
  width: 95%;
  font-size: 24px;
  outline: none;
  border: none;
  border-bottom: 2px solid ${({theme}) => theme.color.darkTurquise};
  margin-bottom: 20px;
  background-color: ${({theme}) => theme.color.lightBackground};
  margin-top: 10px;
  @media only screen and (max-width: 800px) {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 16px;
  }
`;

const InputHalf = styled.input`
  width: 90%;
  font-size: 24px;
  outline: none;
  border: none;
  border-bottom: 2px solid ${({theme}) => theme.color.darkTurquise};
  margin-bottom: 20px;
  margin-top: 10px;
  background-color: ${({theme}) => theme.color.lightBackground};
  @media only screen and (max-width: 800px) {
    width: 95%;
    font-size: 16px;
    outline: none;
    border: none;
    border-bottom: 2px solid ${({theme}) => theme.color.darkTurquise};
    margin-bottom: 5px;
    background-color: ${({theme}) => theme.color.lightBackground};
    margin-top: 10px;
  }
`;

export default Register;
