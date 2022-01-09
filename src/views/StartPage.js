import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import appLogo from "../assets/Logo.svg";
import Button from "../components/trinkets/Button";
import Map from "../components/googleMaps/Map";
import { endpoints } from "../miscellanous/url";
import { routes } from "../miscellanous/Routes";
import LoginModal from "../components/startPage/LoginModal";
import doubleArrowRightIcon from "../assets/doubleArrowRightIcon.svg";
import Tooltip from "../components/trinkets/Tooltip";

const StartPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [redirectToAuth, setRedirectToAuth] = useState(false);
  const [markers, setMarkers] = useState(null);
  const [logged, setLogged] = useState(false);

  const options = {
    disableDefaultUI: true, // disables little yellow guy and satellite view
    zoomControl: true, // enables zoom in/out tool
    gestureHandling: "greedy", // "none" < "cooperative" < "greedy"
    maxZoom: 3,
  };

  useEffect(() => {
    if (sessionStorage.getItem("Bearer")) {
      checkIfLogged();
    }
    getMarkers();
  }, []);

  async function getMarkers() {
    await axios({
      method: "get",
      url: endpoints.getMarkersWithAlbums,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(({ data }) => {
        setMarkers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function checkIfLogged() {
    axios({
      url: endpoints.checkIfLogged,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        setLogged(true);
      })
      .catch((error) => {
        sessionStorage.clear();
      });
  }

  if (logged) {
    return <Redirect to={{ pathname: routes.loginTransition }} />;
  }

  if (redirectToAuth) {
    return <Redirect push to={{ pathname: "/auth" }} />;
  }

  return (
    <Wrapper>
      <StyledHeader>
        <StyledLogo />
        <ButtonsContainer>
          <ForwardButton
            data-tip
            data-for="forwardBtn"
            icon={doubleArrowRightIcon}
            onClick={() => setRedirectToAuth(true)}
          />
          <Tooltip id="forwardBtn" place="left" text="Przejdź dalej" />
          <LoginButton onClick={() => setShowLogin(true)}>
            Zaloguj się
          </LoginButton>
        </ButtonsContainer>
        {showLogin && <LoginModal setShowLogin={setShowLogin} />}
      </StyledHeader>
      <Map
        width={"100%"}
        height={"750px"}
        options={options}
        initialCoordinates={{ lat: 0, lng: 0 }}
        markers={markers}
        type="StartPage"
      />
      <StyledFooter>
        <AppInfo>
          <Line />
          <StyledParagraph>
            Travelify &copy;2021
            <br />
            <br />
            Praca inżynierska
            <br />
            Celem pracy było stworzenie aplikacji internetowej pozwalającej na
            integrację osób zainteresowanych podróżami.
            <br />
            Twórcy: Norbert Faron, Mikołaj Telec - studenci Elektroniki i
            Telekomunikacji na wydziale Informatyki, Elektroniki i
            Telekomunikacji Akademii Górniczo-Hutniczej im. Stanisława Staszica
            w Krakowie
            <br />
            Promotor: dr hab. inż. Mikołaj Leszczuk
            <br />
            Wykorzystane technologie: Spring Boot, Hibernate, MySQL, Google
            Cloud Platform, React, Redux, JavaScript, CSS, Styled Components,
            Google Maps Platform, Figma
            <br />
            <br />
            <a
              href="https://forms.gle/wJbqTVawXYZLwdNW7"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zgłaszanie błędów
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href="https://forms.gle/jKofK3JwQNFousM59"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ankieta
            </a>
          </StyledParagraph>
        </AppInfo>
      </StyledFooter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 140px 750px 1fr;
`;

const StyledParagraph = styled.p`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 16px;
  @media only screen and (max-width: 800px) {
    font-size: 12px;
  }
  a {
    &:link,
    &:visited {
      color: ${({ theme }) => theme.color.dark};
    }
    &:hover,
    &:active {
      color: ${({ theme }) => theme.color.light};
    }
  }
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  position: relative;
  align-items: center;
  width: 100%;
  height: 140px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  border-bottom: 1px solid ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 763px) {
    grid-template-columns: 320px 1fr;
  }
  @media only screen and (max-width: 538px) {
    grid-template-columns: 220px 1fr;
  }
`;

const StyledLogo = styled.div`
  background-image: url(${() => appLogo});
  position: relative;
  left: 15px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 400px;
  height: 124px;
  @media only screen and (max-width: 763px) {
    width: 300px;
  }
  @media only screen and (max-width: 538px) {
    width: 200px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const LoginButton = styled(Button)`
  font-size: 20px;
  height: 53px;
  width: 146px;
  margin-right: 20px;
  @media only screen and (max-width: 763px) {
    font-size: 16px;
    margin-right: 15px;
    height: 43px;
    width: 126px;
  }
  @media only screen and (max-width: 538px) {
    font-size: 12px;
    margin-right: 10px;
    height: 33px;
    width: 100px;
  }
  @media only screen and (max-width: 350px) {
    font-size: 10px;
    margin-right: 5px;
    height: 23px;
    width: 80px;
  }
`;

const ForwardButton = styled(Button)`
  background-image: url(${({ icon }) => icon});
  background-size: 70%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  margin-right: 20px;
  height: 53px;
  width: 53px;
  @media only screen and (max-width: 763px) {
    margin-right: 15px;
    height: 43px;
    width: 43px;
  }
  @media only screen and (max-width: 538px) {
    margin-right: 10px;
    height: 33px;
    width: 33px;
  }
  @media only screen and (max-width: 350px) {
    margin-right: 5px;
    height: 23px;
    width: 23px;
  }
`;

const StyledFooter = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color.greyFont};
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding-bottom: 15px;
  height: 100%;
`;

const Line = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.greyFont}; ;
`;

const AppInfo = styled.div`
    width: 80%;
    padding-top: 45px;
    margin: 0 auto;
    @media only screen and (max-width: 1030px) {
        font-size;
    }

`;

export default StartPage;
