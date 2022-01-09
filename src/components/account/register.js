import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";
import axios from "axios";
import { useFormik } from "formik";
import StatusMessage from "../trinkets/StatusMessage";
import "./styles/pureSelect.css";
import { endpoints } from "../../miscellanous/url";
import Logo from "./assets/logo";
import "./styles/input.css";

const errors = {
  emptyForm: "Wszystkie pola są wymagane !!!",
  alreadyExists:
    "Użytkownik o danej nazwie lub adresie email niestety już istnieje !!!",
  apiError: "Coś poszło nie tak... Spróbuj ponownie",
};

const Register = ({
  currentScreen,
  setCurrentScreen,
  registerSuccess,
  setRegisterSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    let list = JSON.parse(sessionStorage.getItem("countryList"));
    if (list) {
      setCountryList(JSON.parse(sessionStorage.getItem("countryList")));
    } else {
      getCountries();
    }
  }, []);

  const validate = (values) => {
    if (error) setError(null);
    if (registerSuccess) setRegisterSuccess(false);

    const errors = {};

    if (values.login && values.login.length < 3) {
      errors.login =
        "Nazwa użytkownika powinna składać się z minimum 3 znaków !";
    }

    if (values.name && /\d/g.test(values.name)) {
      errors.name = "Imię nie powinno zawierać numerów/znaków specjalnych !";
    } else if (
      values.name &&
      /[^a-zA-ZAaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż\s\d]/.test(
        values.name
      )
    ) {
      errors.name = "Imię nie powinno zawierać numerów/znaków specjalnych !";
    } else if (values.name && values.name.length < 2) {
      errors.name = "Imię powinno składać się z minimum 2 znaków !";
    }

    if (values.surname && /\d/g.test(values.surname)) {
      errors.surname =
        "Naziwsko nie powinno zawierać cyfr/znaków specjalnych !";
    } else if (
      values.surname &&
      /[^a-zA-ZAaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż\s\d]/.test(
        values.surname
      )
    ) {
      errors.surname =
        "Naziwsko nie powinno zawierać cyfr/znaków specjalnych !";
    } else if (values.surname && values.surname.length < 2) {
      errors.surname = "Nazwisko powinno składać się z minimum 2 znaków !";
    }

    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Nieprawidłowy adres email !";
    }

    if (
      values.password &&
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,})$/.test(
        values.password
      )
    ) {
      errors.password =
        "Hasło powinno składać się z minimum 8 znaków (cyfra, duża litera oraz znak specjalny) !";
    }

    if (
      values.password &&
      values.repeatPassword &&
      values.password !== values.repeatPassword
    ) {
      errors.repeatPassword = "Podane hasło nie jest takie samo !";
    }

    if (values.date) {
      if (new Date(values.date) > new Date()) {
        errors.date = "Przybyłeś z przyszłości ?";
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      date: "",
      nationality: "",
      login: "",
      password: "",
      repeatPassword: "",
      email: "",
    },
    validate,
    onSubmit: async (values, actions) => {
      if (
        !values.name ||
        !values.surname ||
        !values.password ||
        !values.repeatPassword ||
        !values.login ||
        !values.email ||
        !values.nationality ||
        values.nationality === "noCountry" ||
        !values.date
      ) {
        setError(errors.emptyForm);
      } else {
        setError(null);
        setRegisterSuccess(false);
        setLoading(true);
        let countryName = "";
        for (let i = 0; i < countryList.length; i++) {
          // eslint-disable-next-line
          if (countryList[i].id == values.nationality) {
            countryName = countryList[i].country;
          }
        }
        await axios({
          method: "post",
          url: endpoints.register,
          data: {
            birthDay: values.date,
            email: values.email,
            firstName: values.name,
            // eslint-disable-next-line eqeqeq
            nationality: countryName,
            login: values.login,
            password: values.password,
            surName: values.surname,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            setRegisterSuccess(true);
            setCurrentScreen("login");
          })
          .catch((error) => {
            if (error.response !== undefined) {
              if (error.response.status === 409) {
                setError(errors.alreadyExists);
              } else {
                setError(errors.apiError);
              }
            } else {
              setError(errors.apiError);
            }
          })
          .finally(() => {
            setLoading(false);
          });
        //actions.setSubmitting(false); // not needed when onSubmit is async
        actions.resetForm();
      }
    },
  });

  async function getCountries() {
    await axios({
      method: "get",
      url: endpoints.getCountriesList,
      headers: {
        "Content-Type": "application/json",
        // there's no need for auth when we need countries :O
      },
    })
      .then(({ data }) => {
        data.shift();
        let countries = [];
        for (let i = 0; i < 206; i++) {
          countries.push(data[i]);
        }
        setCountryList(countries);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <Logo />
        <Form>
          <SideContainer>
            <FullContainer>
              <Label>
                Nazwa użytkownika:
                <Input
                  type="text"
                  id="login"
                  name="login"
                  value={formik.values.login}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  maxLength={16}
                  autoComplete="off"
                />
                {formik.touched.login && formik.errors.login ? (
                  <ErrorMessage type="error">
                    {formik.errors.login}
                  </ErrorMessage>
                ) : null}
              </Label>
              <Label>
                Hasło:
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.password && formik.errors.password ? (
                  <ErrorMessage type="error">
                    {formik.errors.password}
                  </ErrorMessage>
                ) : null}
              </Label>
              <Label>
                Powtórz hasło:
                <Input
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.repeatPassword &&
                formik.errors.repeatPassword ? (
                  <ErrorMessage type="error">
                    {formik.errors.repeatPassword}
                  </ErrorMessage>
                ) : null}
              </Label>
              <Label>
                Email:
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.email && formik.errors.email ? (
                  <ErrorMessage type="error">
                    {formik.errors.email}
                  </ErrorMessage>
                ) : null}
              </Label>
            </FullContainer>
            <FullContainer>
              <Label>
                Imię:
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.name && formik.errors.name ? (
                  <ErrorMessage type="error">{formik.errors.name}</ErrorMessage>
                ) : null}
              </Label>
              <Label>
                Nazwisko:
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.surname && formik.errors.surname ? (
                  <ErrorMessage type="error">
                    {formik.errors.surname}
                  </ErrorMessage>
                ) : null}
              </Label>
              <Label>
                Pochodzenie:
                <div className="custom__select">
                  <select
                    className="select"
                    name="nationality"
                    id="nationality"
                    value={formik.values.nationality}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <>
                      <CustomOption
                        style={{ color: "#5B5B5B" }}
                        value={"noCountry"}
                      >
                        -- Wybierz kraj --
                      </CustomOption>
                      {countryList.length !== 0 &&
                        countryList.map((country) => (
                          <CustomOption key={country.id} value={country.id}>
                            {country.country}
                          </CustomOption>
                        ))}
                    </>
                  </select>
                </div>
              </Label>
              <Label>
                Data urodzenia:
                <Input
                  type="date"
                  name="date"
                  id="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.date && formik.errors.date ? (
                  <ErrorMessage type="error">{formik.errors.date}</ErrorMessage>
                ) : null}
              </Label>
            </FullContainer>
          </SideContainer>
          <FullContainerCreate>
            {error === errors.emptyForm ? (
              <SubmitError type="error">{errors.emptyForm}</SubmitError>
            ) : null}
            {error === errors.apiError ? (
              <SubmitError type="error">{errors.apiError}</SubmitError>
            ) : null}
            {error === errors.alreadyExists ? (
              <SubmitError type="error">{errors.alreadyExists}</SubmitError>
            ) : null}
            <Apply
              disabled={!formik.dirty || formik.isSubmitting}
              type="submit"
            >
              {!loading ? (
                "Dołącz"
              ) : (
                <Loading
                  height={"20px"}
                  width={"20px"}
                  type={"spin"}
                  color={"#F2F7F2"}
                />
              )}
            </Apply>
            <OrDiv> lub </OrDiv>
            <CreateAccount>
              <Span
                onClick={(e) =>
                  setCurrentScreen(
                    currentScreen === "register" ? "login" : "register"
                  )
                }
              >
                Zaloguj się
              </Span>
            </CreateAccount>
          </FullContainerCreate>
        </Form>
      </Container>
    </form>
  );
};

const ErrorMessage = styled(StatusMessage)`
  font-size: 12px;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  //margin: 5px 0px 0px 15%;
  right: 0;
  margin: 5px 5% 0px 0px;
  width: auto;
  max-width: 300px;
  @media screen and (max-width: 1180px) {
    font-size: 10px;
    max-width: 200px;
    margin: 5px 2% 0px 0px;
  }
  @media screen and (max-width: 900px) {
    font-size: 12px;
    max-width: 300px;
    margin: 5px 5% 0px 0px;
  }
  @media screen and (max-width: 600px) {
    font-size: 10px;
    max-width: 220px;
    margin: 8px 2% 0px 0px;
  }
  @media screen and (max-width: 460px) {
    font-size: 8px;
    max-width: 125px;
    margin: 8px 0% 0px 0px;
  }
`;

const SubmitError = styled(StatusMessage)`
  font-size: 12px;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  bottom: 24%;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: auto;
  max-width: 300px;
  @media screen and (max-width: 900px) {
    font-size: 12px;
    bottom: 14.5%;
  }
  @media screen and (max-width: 600px) {
    font-size: 10px;
    max-width: 270px;
    bottom: 13.5%;
  }
`;

const CustomOption = styled.option`
  color: #000;
`;

const Container = styled.div`
  width: 80vw;
  position: absolute;
  left: 10vw;
  top: 5vh;
`;

const Form = styled.div`
  margin-top: 20px;
  width: 100%;
  position: relative;
  z-index: 5;
  @media screen and (max-width: 1400px) {
    margin-top: 80px;
  }
  @media screen and (max-width: 1000px) {
    margin-top: 60px;
  }
  @media screen and (max-width: 900px) {
    margin-top: 40px;
  }
`;

const SideContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-column-gap: 10px;
  margin-bottom: 50px;
  @media screen and (max-width: 900px) {
    grid-template-columns: 100%;
    grid-column-gap: 0px;
  }
`;

const FullContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-row-gap: 25px;
  @media screen and (max-width: 900px) {
    margin-top: 20px;
  }
`;

const Label = styled.label`
  font-size: 22px;
  color: ${({ theme }) => theme.color.lightBackground};
  position: relative;
`;

const Input = styled.input`
  width: 90%;
  height: 25px;
  padding: 15px 20px 15px 20px;
  border-radius: 40px;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.15);
  border: none;
  color: ${({ theme }) => theme.color.lightBackground};
  margin-top: 5px;
  &:focus {
    outline: none;
  }
  ::-webkit-calendar {
    font-size: 18px;
  }
  ::-webkit-calendar-picker-indicator {
    transition: 0.1 all ease;
    filter: invert(1);
    :hover {
      filter: invert(76%) sepia(48%) saturate(7295%) hue-rotate(146deg)
        brightness(105%) contrast(86%);
    }
  }
`;

const FullContainerCreate = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
`;

const Apply = styled.button`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 30px 20px 30px;
  border-radius: 40px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.color.dark};
  border: none;
  color: ${({ theme }) => theme.color.lightBackground};
  margin-top: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
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

const CreateAccount = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.color.lightBackground};
`;

const OrDiv = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.color.lightBackground};
  margin-bottom: 15px;
  display: inline-block;
  &::after {
    display: inline-block;
    content: " ";
    position: relative;
    width: 20px;
    height: 0.5px;
    background-color: ${({ theme }) => theme.color.lightBackground};
    z-index: 10;
    bottom: 5px;
  }
  &::before {
    display: inline-block;
    content: " ";
    position: relative;
    width: 20px;
    height: 0.5px;
    background-color: ${({ theme }) => theme.color.lightBackground};
    z-index: 10;
    bottom: 5px;
  }
`;

const Span = styled.span`
  cursor: pointer;
`;

const Loading = styled(ReactLoading)`
  margin: 0 auto;
`;

export default Register;
