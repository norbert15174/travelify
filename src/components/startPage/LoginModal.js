import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import { Redirect } from "react-router-dom";
import axios from "axios";
import StatusMessage from "../trinkets/StatusMessage";
import { routes } from "../../miscellanous/Routes";
import { endpoints } from "../../miscellanous/url";

const errors = {
  wrongCredentials:
    "Podana nazwa użytkownika lub hasło jest nieodpowiednia !!!",
  serverError: "Coś poszło nie tak... Spróbuj ponownie",
};

const LoginModal = ({ setShowLogin }) => {
  const loginRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [register, setRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.addEventListener("click", boxOutsideClick, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function boxOutsideClick(e) {
    if (!loginRef.current || loginRef.current.contains(e.target)) {
      return;
    }
    document.removeEventListener("click", boxOutsideClick, true);
    setShowLogin(false);
  }

  const onLogin = () => {
    setErrorMessage("");
    setLoading(false);
    if (login !== "" && password !== "") {
      Login();
    } else {
      setErrorMessage("Wypełnij wszystkie wymagane pola !!!");
    }
  };

  async function Login() {
    setLoading(true);
    await axios({
      method: "post",
      url: endpoints.login,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        login: login,
        password: password,
      },
    })
      .then((response) => {
        document.removeEventListener("click", boxOutsideClick, true);
        sessionStorage.setItem("Bearer", response.data.token);
        sessionStorage.setItem("Login", response.data.login);
        setLogged(true);
      })
      .catch((error) => {
        if (error.response !== undefined) {
          if (error.response.status === 404) {
            setErrorMessage(errors.wrongCredentials);
          } else {
            setErrorMessage(errors.serverError);
          }
        } else {
          setErrorMessage(errors.serverError);
        }
        setLogged(false);
      })
      .finally(() => {
        setLoading(false);
        setLogin("");
        setPassword("");
      });
  }

  if (logged) {
    return <Redirect push to={{ pathname: routes.loginTransition }} />;
  }

  if (register) {
    return (
      <Redirect
        push
        to={{ pathname: routes.auth, state: { toRegister: true } }}
      />
    );
  }

  return (
    <Container ref={loginRef}>
      <Triangle />
      <Header>ZALOGUJ SIĘ</Header>
      <InputContainer>
        <Input
          type="text"
          name="login"
          id="login"
          value={login}
          onChange={(e) => {
            if (errorMessage) {
              setErrorMessage("");
            }
            setLogin(e.target.value);
          }}
          placeholder="Nazwa użytkownika"
        />
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            if (errorMessage) {
              setErrorMessage("");
            }
            setPassword(e.target.value);
          }}
          placeholder="Hasło użytkownika"
        />
      </InputContainer>
      {errorMessage === errors.serverError && (
        <ErrorMessage type="error">{errorMessage}</ErrorMessage>
      )}
      {errorMessage === errors.wrongCredentials && (
        <ErrorMessage type="error">{errorMessage}</ErrorMessage>
      )}
      <Footer>
        <Accept disabled={!login || !password ? true : false} onClick={onLogin}>
          {!loading ? (
            "Zaloguj się"
          ) : (
            <Loading
              height={"20px"}
              width={"20px"}
              type={"spin"}
              color={"#F2F7F2"}
            />
          )}
        </Accept>
        <OrDiv> lub </OrDiv>
        <Register onClick={() => setRegister(true)}>
          <Span>Dołącz do nas</Span>
        </Register>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  right: 0;
  margin-right: 125px;
  top: 0;
  margin-top: 145px;
  height: 400px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.lightBackground};
  border: 2px solid ${({ theme }) => theme.color.dark};
  padding: 10px;
  @media only screen and (max-width: 763px) {
    margin-right: 100px;
    margin-top: 140px;
    width: 250px;
    height: 350px;
  }
  @media only screen and (max-width: 538px) {
    margin-right: 70px;
    margin-top: 135px;
    width: 200px;
    height: 300px;
  }
  @media only screen and (max-width: 350px) {
    margin-right: 40px;
    margin-top: 120px;
    height: 275px;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-bottom: 44px solid ${({ theme }) => theme.color.dark};
  border-left: 44px solid transparent;
  position: absolute;
  left: 278px;
  bottom: 420px;
  &:after {
    content: "";
    width: 0;
    height: 0;
    border-bottom: 40px solid ${({ theme }) => theme.color.lightBackground};
    border-left: 40px solid transparent;
    position: absolute;
    top: 4px;
    left: -42px;
  }
  @media only screen and (max-width: 763px) {
    left: 228px;
    bottom: 370px;
  }
  @media only screen and (max-width: 538px) {
    left: 187px;
    bottom: 320px;
    border-bottom: 35px solid ${({ theme }) => theme.color.dark};
    border-left: 35px solid transparent;
  }
  @media only screen and (max-width: 350px) {
    bottom: 295px;
  }
`;

const Header = styled.h1`
  display: inline-block;
  margin: 30px auto 0 auto;
  font-size: 28px;
  @media only screen and (max-width: 763px) {
    font-size: 24px;
    margin: 25px auto 0 auto;
  }
  @media only screen and (max-width: 538px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 350px) {
    font-size: 16px;
    margin: 20px auto 0 auto;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 30px auto 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  @media only screen and (max-width: 763px) {
    margin: 25px auto 0 auto;
  }
  @media only screen and (max-width: 350px) {
    margin: 20px auto 0 auto;
  }
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 15px 25px;
  border-radius: 40px;
  width: 155px;
  font-size: 18px;
  border: none;
  color: #000;
  background-color: ${({ theme }) => theme.color.darkBackground};
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 763px) {
    font-size: 16px;
    width: 135px;
  }
  @media only screen and (max-width: 538px) {
    font-size: 14px;
    width: 110px;
    padding: 10px 15px;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0px;
`;

const Accept = styled.div`
  width: 155px;
  text-align: center;
  margin: 0px auto 15px auto;
  padding: 15px 25px;
  border-radius: 40px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.color.dark};
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
  border: none;
  color: ${({ theme }) => theme.color.lightBackground};
  cursor: pointer;
  @media only screen and (max-width: 763px) {
    font-size: 16px;
    width: 135px;
  }
  @media only screen and (max-width: 538px) {
    font-size: 14px;
    width: 110px;
    padding: 10px 15px;
  }
  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
`;

const Register = styled.div`
  margin: 15px auto 0px auto;
  font-size: 18px;
  text-align: center;
  vertical-align: center;
  color: ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 763px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 538px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
`;

const OrDiv = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.color.light};
  display: inline-block;
  &::after {
    display: inline-block;
    content: " ";
    position: relative;
    width: 20px;
    height: 0.5px;
    background-color: ${({ theme }) => theme.color.light};
    z-index: 10;
    bottom: 5px;
  }
  &::before {
    display: inline-block;
    content: " ";
    position: relative;
    width: 20px;
    height: 0.5px;
    background-color: ${({ theme }) => theme.color.light};
    z-index: 10;
    bottom: 5px;
  }
  @media only screen and (max-width: 763px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 538px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 350px) {
    font-size: 12px;
  }
`;
const Span = styled.span`
  cursor: pointer;
`;

const Loading = styled(ReactLoading)`
  margin: 0 auto;
`;

const ErrorMessage = styled(StatusMessage)`
  font-size: 10px;
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  width: 230px;
  margin: 0 auto;
  @media only screen and (max-width: 763px) {
    width: 160px;
  }
  @media only screen and (max-width: 538px) {
    width: 130px;
    font-size: 8px;
  }
`;

export default LoginModal;
