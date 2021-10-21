import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Logo from "./assets/logo";
import { routes } from "../../miscellanous/Routes";
import { endpoints } from "../../url";
import StatusMessage from "../trinkets/StatusMessage";
import "./styles/input.css";

const errors = {
	wrongCredentials: "Podana nazwa użytkownika lub hasło jest nieodpowiednia !!!",
	apiError: "Coś poszło nie tak... Spróbuj ponownie",
}

const Login = ({ pos, val }) => {

  	const [ password, setPassword ] = useState("");
	const [ login, setLogin ] = useState("");
	const [ logged, setLogged ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState("");

	const onLogin = () => {
		setErrorMessage("");
		if (login !== "" && password !== "") {
			Login();
		} else {
			setErrorMessage("Wypełnij wszystkie wymagane pola !!!");
		}
	};
	
	async function Login() {
		setErrorMessage("");
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
			sessionStorage.setItem("Bearer", response.data.token);
			sessionStorage.setItem("Login", response.data.login);
			setLogged(true);
		})
		.catch((error) => {
			if (error.response !== undefined) {
				if (error.response.status === 404) {
					setErrorMessage(errors.wrongCredentials);
				} else {
					setErrorMessage(errors.apiError);
				}
			}
			setLogged(false)
		})
		.finally(() => {
			setLogin("");
			setPassword("");
		});
	};

	if (logged) {
		return <Redirect to={{pathname: routes.loginTransition}}/>
	};

	return (
		<Container>
     		<Logo/>
      		<Form>
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
								setLogin(e.target.value)
							}}
							placeholder="Nazwa użytkownika"
						/>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Hasło"
							value={password}
							onChange={(e) => {
								if (errorMessage) {
									setErrorMessage("");
								}
								setPassword(e.target.value)
							}}
						/>
						{ errorMessage === errors.apiError && <ErrorMessage type="error">{errorMessage}</ErrorMessage> }
						{ errorMessage === errors.wrongCredentials && <ErrorMessage type="error">{errorMessage}</ErrorMessage>}
					</InputContainer>
				<Apply disabled={!login || !password ? true : false} onClick={onLogin}>Zaloguj się</Apply>
				<OrDiv> lub </OrDiv>
				<CreateAccount>
					<Span onClick={(e) => val(pos === "yes" ? "no" : "yes")}>
						Dołącz do nas
					</Span>
				</CreateAccount>
      		</Form>
    </Container>
  );
};

const ErrorMessage = styled(StatusMessage)`
    font-size: 14px;
    text-align: center;
    padding: 10px;
	border-radius: 5px;
	width: auto;
	margin: 15px auto 0px auto;
	height: max-content;
	
	@media screen and (max-width: 1000px) {
		font-size: 12px;
		max-width: 275px;

	}
	@media screen and (max-width: 600px) {
		font-size: 10px;
		max-width: 225px;
	}
	@media screen and (max-width: 460px) {
		padding: 10px 5px;
		max-width: 175px;
	}
`;

const Container = styled.div`
  width: 80vw;
  position: absolute;
  left: 10vw;
  top: 10vh;
  padding-bottom: 100px;
`;

const Form = styled.div`
  margin-top: 100px;
  width: 100%;
  position: relative;
  text-align: center;
  display: grid;
  grid-template-rows: auto;
  z-index: 5;
  @media screen and (max-width: 1400px) {
    margin-top: 80px;
  }

  @media screen and (max-width: 1000px) {
    margin-top: 60px;
  }

  @media screen and (max-width: 600px) {
    margin-top: 40px;
  }
`;

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 30px 20px 30px;
  border-radius: 40px;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.15);
  border: none;
  color: ${({theme}) => theme.color.lightBackground};
  margin-top: 20px;
  &:focus {
    outline: none;
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: yellow !important;
	}

  @media screen and (max-width: 1400px) {
    width: 400px;
  }

  @media screen and (max-width: 1000px) {
    width: 300px;
  }

  @media screen and (max-width: 600px) {
    padding: 15px 25px 15px 25px;
    width: 280px;
  }
`;

const Apply = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 30px 20px 30px;
  border-radius: 40px;
  font-size: 18px;
  background-color: ${({theme}) => theme.color.dark};
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
  border: none;
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    width: 400px;
  }

  @media screen and (max-width: 1000px) {
    width: 300px;
  }

  @media screen and (max-width: 600px) {
    padding: 15px 25px 15px 25px;
    width: 280px;
  }
`;

const CreateAccount = styled.div`
  font-size: 22px;
  color: white;
`;

const OrDiv = styled.div`
  font-size: 18px;
  color: white;
  margin-bottom: 20px;
  display: inline-block;
  &::after {
    display: inline-block;
    content: " ";
    position: relative;
    width: 20px;
    height: 0.5px;
    background-color: white;
    z-index: 10;
    bottom: 5px;
  }
  &::before {
    display: inline-block;
    content: " ";
    position: relative;
    width: 20px;
    height: 0.5px;
    background-color: white;
    z-index: 10;
    bottom: 5px;
  }
`;
const Span = styled.span`
  cursor: pointer;
`;
export default Login;
