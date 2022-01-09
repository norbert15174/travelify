import React from "react";
import styled from "styled-components";
import noAccessIcon from "../assets/noAccessIcon.svg";
import pageNotFoundIcon from "../assets/pageNotFoundIcon.svg";
import jsError from "../assets/jsError.svg";
import { errors } from "../miscellanous/Utils";

const icons = {
  notFound: pageNotFoundIcon,
  noAccess: noAccessIcon,
};

const errorMessages = {
  notFound: {
    h1: "Okrążyliśmy cały świat, ale niestety nie znaleźliśmy miejsca, którego szukasz...",
    h2: "Szukana strona nie istnieje.",
    h3: "Wpisany adres jest niepoprawny, strona została usunięta lub przeniesiona.",
  },
  noAccess: {
    h1: "Dotarłeś zbyt daleko i niestety musieliśmy cię zatrzymać...",
    h2: "Nie masz dostępu do danej strony.",
    h3: "Nie jesteś zalogowany lub nie masz dostępu do danego zasobu.",
  },
};

const Error = ({ errorType = errors.notFound }) => {
  return (
    <Container>
      <InnerContainer>
        <Icon
          icon={
            errorMessages[errorType] !== undefined ? icons[errorType] : jsError
          }
        />
        <InnerInnerContainer>
          <h1>
            {errorMessages[errorType] !== undefined
              ? errorMessages[errorType].h1
              : "Wystąpił błąd!"}
          </h1>
          <div>
            <h2>
              {errorMessages[errorType] !== undefined
                ? errorMessages[errorType].h2
                : "Wina kodu JavaScript odpowiadającego za interfejs użytkownika"}
            </h2>
            <h3>
              {errorMessages[errorType] !== undefined
                ? errorMessages[errorType].h3
                : "Przepraszamy! Wypełnij formularz, to postaramy się go naprawić ;)"}
            </h3>
          </div>
          <a
            href="https://forms.gle/wJbqTVawXYZLwdNW7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Formularz zgłaszania błędu
          </a>
        </InnerInnerContainer>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 1200px;
  height: auto;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.darkBackground};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 60px;
  @media only screen and (max-width: 1350px) {
    width: 900px;
  }
  @media only screen and (max-width: 1080px) {
    width: 600px;
  }
  @media only screen and (max-width: 800px) {
    width: 400px;
    padding: 60px 0px;
    width: 520px;
  }
  @media only screen and (max-width: 540px) {
    width: 300px;
    height: 600px;
    padding: 30px;
  }
  @media only screen and (max-width: 400px) {
    width: 250px;
    min-width: 280px;
    padding: 20px;
  }
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 540px) {
    grid-template-columns: none;
    grid-template-rows: repeat(2, auto);
    justify-content: center;
  }
  @media only screen and (max-width: 800px) {
    margin: 0 30px;
  }
`;

const Icon = styled.div`
  background-image: url(${({ icon }) => icon});
  width: 450px;
  height: 520px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 50% 50%;
  @media only screen and (max-width: 1350px) {
    width: 350px;
    height: 420px;
  }
  @media only screen and (max-width: 1080px) {
    width: 250px;
    height: 320px;
  }
  @media only screen and (max-width: 800px) {
    width: 170px;
    height: 240px;
  }
  @media only screen and (max-width: 540px) {
    width: 250px;
    height: 320px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 400px) {
    width: 200px;
    height: 270px;
  }
`;

const InnerInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media only screen and (max-width: 540px) {
    margin-top: 25px;
  }
  h1 {
    font-size: 48px;
    width: 675px;
    @media only screen and (max-width: 1350px) {
      font-size: 36px;
      width: 500px;
    }
    @media only screen and (max-width: 1080px) {
      font-size: 24px;
      width: 325px;
    }
    @media only screen and (max-width: 800px) {
      font-size: 16px;
      width: 250px;
    }
    @media only screen and (max-width: 540px) {
      font-size: 24px;
      width: 280px;
    }
    @media only screen and (max-width: 400px) {
      width: 245px;
    }
  }
  div {
    margin-top: 25px;
    color: ${({ theme }) => theme.color.greyFont};
    @media only screen and (max-width: 540px) {
      width: 220px;
    }
    h2 {
      font-size: 32px;
      @media only screen and (max-width: 1350px) {
        font-size: 24px;
      }
      @media only screen and (max-width: 1080px) {
        font-size: 16px;
      }
      @media only screen and (max-width: 800px) {
        font-size: 12px;
      }
      @media only screen and (max-width: 540px) {
        font-size: 16px;
      }
    }
    h3 {
      font-size: 16px;
      @media only screen and (max-width: 1350px) {
        font-size: 12px;
      }
      @media only screen and (max-width: 1080px) {
        font-size: 10px;
      }
      @media only screen and (max-width: 800px) {
        font-size: 8px;
      }
      @media only screen and (max-width: 540px) {
        font-size: 10px;
      }
    }
  }
  a {
    font-size: 16px;
    margin-top: 25px;
    &:link,
    &:visited {
      color: ${({ theme }) => theme.color.dark};
    }
    &:hover,
    &:active {
      color: ${({ theme }) => theme.color.light};
    }
    @media only screen and (max-width: 1350px) {
      font-size: 14px;
      margin-top: 20px;
    }
    @media only screen and (max-width: 1080px) {
      font-size: 12px;
      margin-top: 15px;
    }
    @media only screen and (max-width: 800px) {
      font-size: 10px;
      margin-top: 10px;
    }
  }
`;

/* const GoBackButton = styled(Button)`
  width: auto;
  height: auto;
  margin-top: 35px;
  font-size: 24px;
  padding: 10px 25px 10px 25px;
  @media only screen and (max-width: 1350px) {
    font-size: 16px;
    margin-top: 30px;
  }
  @media only screen and (max-width: 1080px) {
    font-size: 10px;
    margin-top: 20px;
  }
  @media only screen and (max-width: 800px) {
    padding: 5px 15px 5px 15px;
    margin-top: 15px;
  }
  @media only screen and (max-width: 540px) {
    padding: 10px 25px 10px 25px;
    margin-top: 20px;
  }
`; */

export default Error;
