import React, { useState } from "react";
import UserTemplate from "../../templates/UserTemplate";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Button from "../trinkets/Button";
import personalInfoIcon from "./assets/personalInfoIcon.svg";
import changePasswordIcon from "./assets/changePasswordIcon.svg";
import descriptionIcon from "./assets/descriptionIcon.svg";
import interestsIcon from "./assets/interestsIcon.svg";
import countriesIcon from "./assets/countriesIcon.svg";
import ProfilePhoto from "./ProfilePhoto";
import ProfileBackground from "./ProfileBackground";
import PersonalInfoForm from "./PersonalInfoForm";
import PasswordForm from "./PasswordForm";
import DescriptionForm from "./DescriptionForm";
import CountriesForm from "./CountriesForm";

const EditProfile = () => {

    const [ redirect, setRedirect ] = useState(false);

    if (redirect) {
        return <Redirect to={{pathname: "/user"}}/>
    }

    return (
        <UserTemplate>
            <Container>
                <PageHeader>
                    <Heading>
                        Edytuj profil
                    </Heading>
                    <GoBackButton onClick={() => setRedirect(true)}>
                        Wróć do profilu
                    </GoBackButton>
                </PageHeader>
                <Images>
                    <ProfilePhoto/>
                    <ProfileBackground/>
                </Images>
                <PersonalInfo>
                    <Header>
                        <Icon src={personalInfoIcon}/>
                        <h1>Dane użytkownika</h1>
                    </Header>
                    <PersonalInfoForm/>
                </PersonalInfo>
                <Password>
                    <Header>
                        <Icon src={changePasswordIcon}/>
                        <h1>Zmiana hasła</h1>
                    </Header>
                    <PasswordForm/>
                </Password>
                <Description>
                    <Header>
                        <Icon src={descriptionIcon}/>
                        <h1>Opis użytkownika</h1>
                    </Header>
                    <DescriptionForm type="description"/>
                </Description>
                <Interests>
                    <Header>
                        <Icon src={interestsIcon}/>
                        <h1>Opis użytkownika</h1>
                    </Header>
                    <DescriptionForm type="about"/>
                </Interests>
                <Countries>
                    <Header>
                        <Icon src={countriesIcon}/>
                        <h1>Odwiedzone kraje</h1>
                    </Header>
                    <CountriesForm/>
                </Countries>
            </Container>
        </UserTemplate>   
    );
}

const Container = styled.div`
    width:  95%;
    margin: 0 auto; 
    display: grid;
    grid-template-rows: repeat(7, auto);
    grid-row-gap: 15px;
    min-width: 388px;
`;

const PageHeader = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
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
    color: ${({theme}) => theme.color.greyFont};
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
    @media only screen and (max-width: 360px) {
        font-size: 24px;
        margin: 5px auto 5px 15px;
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
    background-color: ${({theme}) => theme.color.lightBackground};
    border-radius: 15px;
    display: grid;
    grid-template-columns: 40% 1fr;
    grid-template-rows: auto;
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
    color: ${({theme}) => theme.color.greyFont};
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

const PersonalInfo = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground};
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

const Password = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 40px;
    border-radius: 15px;
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

const Description = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 40px;
    border-radius: 15px;
    @media only screen and (max-width: 1440px) {
        padding: 20px 20px;
    }
    @media only screen and (max-width: 870px) {
        padding: 15px;
    }
    @media only screen and (max-width: 560px) {
        padding: 10px;
    }
`;

const Interests = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 40px;
    border-radius: 15px;
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

const Countries = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 40px;
    border-radius: 15px;
    margin-bottom: 15px;
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

export default EditProfile;