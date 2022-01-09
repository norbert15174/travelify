import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Button from "../trinkets/Button";
import personalInfoIcon from "./assets/personalInfoIcon.svg";
import changePasswordIcon from "./assets/changePasswordIcon.svg";
import descriptionIcon from "./assets/descriptionIcon.svg";
import interestsIcon from "./assets/interestsIcon.svg";
import countriesIcon from "./assets/countriesIcon.svg";
import scrollBackIcon from "../../assets/scrollBackIcon.svg";
import deleteAccountIcon from "./assets/deleteAccountIcon.svg";
import PhotoChange from "./PhotoChange";
import PersonalInfoForm from "./PersonalInfoForm";
import PasswordForm from "./PasswordForm";
import DescriptionForm from "./DescriptionForm";
import CountriesForm from "./CountriesForm";
import DeleteAccountForm from "./DeleteAcountForm";
import ConfirmationBox from "../trinkets/ConfirmationBox";
import { routes } from "../../miscellanous/Routes";
import { useSelector } from "react-redux";
import ButtonIcon from "../trinkets/ButtonIcon";
import Tooltip from "../trinkets/Tooltip";

const EditProfilePage = ({ personalData }) => {
  const [redirect, setRedirect] = useState(false);

  const [confirmDeletingAccount, setConfirmDeletingAccount] = useState(false);
  const [refuseDeletingAccount, setRefuseDeletingAccount] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);
  const scrollBack = useRef(null);

  const blurState = useSelector((state) => state.blur.value);

  useEffect(() => {
    if (deleteBox) {
      if (confirmDeletingAccount) {
        setConfirmDeletingAccount(false);
        setDeleteBox(false);
      } else if (refuseDeletingAccount) {
        setRefuseDeletingAccount(false);
        setDeleteBox(false);
      }
    }
  }, [deleteBox, confirmDeletingAccount, refuseDeletingAccount]);

  if (redirect) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(
            /:id/i,
            sessionStorage.getItem("loggedUserId")
          ),
        }}
      />
    );
  }

  return (
    <>
      {deleteBox && (
        <ConfirmationBox
          children={"Czy na pewno chcesz usunąć swoje konto?"}
          confirm={setConfirmDeletingAccount}
          refuse={setRefuseDeletingAccount}
        />
      )}
      <Container blurState={blurState} ref={scrollBack}>
        <PageHeader>
          <Heading>Edytuj profil</Heading>
          <GoBackButton onClick={() => setRedirect(true)}>Wróć</GoBackButton>
        </PageHeader>
        <Images>
          <PhotoChange type="profile" photo={personalData.profilePicture} />
          <PhotoChange
            type="background"
            photo={personalData.backgroundPicture}
          />
        </Images>
        <SectionContainer>
          <Header>
            <Icon src={personalInfoIcon} />
            <h1>Dane użytkownika</h1>
          </Header>
          <PersonalInfoForm personalData={personalData} />
        </SectionContainer>
        <SectionContainer>
          <Header>
            <Icon src={changePasswordIcon} />
            <h1>Zmiana hasła</h1>
          </Header>
          <PasswordForm />
        </SectionContainer>
        <SectionContainer>
          <Header>
            <Icon src={descriptionIcon} />
            <h1>Opis użytkownika</h1>
          </Header>
          <DescriptionForm
            type="about"
            data={personalData.personalDescription.about}
          />
        </SectionContainer>
        <SectionContainer>
          <Header>
            <Icon src={interestsIcon} />
            <h1>Zainteresowania</h1>
          </Header>
          <DescriptionForm
            type="interest"
            data={personalData.personalDescription.interest}
          />
        </SectionContainer>
        <SectionContainer>
          <Header>
            <Icon src={countriesIcon} />
            <h1>Odwiedzone kraje</h1>
          </Header>
          <CountriesForm
            visitedCountries={personalData.personalDescription.visitedCountries}
          />
        </SectionContainer>
        <SectionContainer>
          <Header>
            <Icon src={deleteAccountIcon} />
            <h1>Zablokuj konto</h1>
          </Header>
          <DeleteAccountForm setDeleteBox={setDeleteBox} />
        </SectionContainer>
      </Container>
      <ScrollBack
        data-tip
        data-for="scrollBack"
        icon={scrollBackIcon}
        onClick={() =>
          scrollBack.current.scrollIntoView({ behavior: "smooth" })
        }
      />
      <Tooltip
        id="scrollBack"
        place="top"
        text="Wróć do góry"
      />
    </>
  );
};

const ScrollBack = styled(ButtonIcon)`
  background-color: ${({ theme }) => theme.color.lightBackground};
  position: fixed;
  transform: rotate(180deg);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  bottom: 0;
  margin-bottom: 15px;
  right: 0;
  margin-right: 95px;
  @media only screen and (max-width: 720px) {
    margin-right: 26px;
  }
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(7, auto);
  grid-row-gap: 15px;
  min-width: 388px;
  margin-bottom: 15px;
  filter: ${({ blurState }) => (blurState === true ? "blur(8px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(8px)" : "none"};
`;

const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  height: 80px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  @media only screen and (max-width: 870px) {
    height: 70px;
  }
  @media only screen and (max-width: 735px) {
    height: 60px;
  }
  @media only screen and (max-width: 480px) {
    height: 50px;
  }
  @media only screen and (max-width: 360px) {
    height: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 54px;
  margin: 10px auto 10px 25px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 870px) {
    font-size: 46px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 40px;
    margin: 5px auto 5px 25px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 34px;
  }
`;

const GoBackButton = styled(Button)`
  justify-self: end;
  margin-right: 25px;
  border-radius: 5px;
  text-align: center;
  width: auto;
  font-size: 28px;
  height: 42px;
  padding: 0 20px;
  @media only screen and (max-width: 870px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 12px;
    height: 30px;
  }
  @media only screen and (max-width: 720px) {
    margin-right: 65px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 10px;
    padding: 0 10px;
    height: 25px;
  }
  @media only screen and (max-width: 360px) {
    font-size: 8px;
    padding: 0 5px;
  }
`;

const Images = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  border-radius: 15px;
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-column-gap: 70px;
  padding: 20px 40px;
  @media only screen and (max-width: 1080px) {
    grid-column-gap: 60px;
  }
  @media only screen and (max-width: 870px) {
    grid-column-gap: 50px;
    padding: 15px;
  }
  @media only screen and (max-width: 735px) {
    grid-column-gap: 40px;
  }
  @media only screen and (max-width: 560px) {
    padding: 10px;
    grid-column-gap: 30px;
  }
  @media only screen and (max-width: 410px) {
    grid-column-gap: 15px;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 1220px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 9px;
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  @media only screen and (max-width: 1220px) {
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 870px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 560px) {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const SectionContainer = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  border-radius: 15px;
  padding: 20px 40px;
  grid-template-rows: repeat(2, auto);
  @media only screen and (max-width: 1440px) {
    padding: 20px;
  }
  @media only screen and (max-width: 870px) {
    padding: 15px;
  }
  @media only screen and (max-width: 560px) {
    padding: 10px;
  }
`;

export default EditProfilePage;
