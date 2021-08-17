import React, { useState } from "react";
import styled from "styled-components";
import Button from "../trinkets/Button";


const profilePhoto = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/af/af7aa0fd682203081a93ea7233b8832c7319f72d_full.jpg"
const link = "https://www.youtube.com/watch?v=ObJLIsNcOZ4";

const notificationsMaleVersion = {
    "tag": " oznaczył cię na zdjęciu",
    "invitation": " wysłał ci zaproszenie do znajomych",
    "friendshipEnd": " usunął cię z listy znajomych",
    "comment": " skomentował twoje zdjęcie",
    "share": " udostępnił Ci swój album",
    "unshare": " przestał udostępniać Ci jeden ze swoich albumów",
}

const notificationsFemaleVersion = {
    "tag": " oznaczyła cię na zdjęciu",
    "invitation": " wysłała ci zaproszenie do znajomych",
    "friendshipEnd": " usunęła cię z listy znajomych",
    "comment": " skomentowała twoje zdjęcie",
    "share": " udostępniła Ci swój album",
    "unshare": " przestała udostępniać Ci jeden ze swoich albumów",
}

const NotificationsItem = ({type, firstName, surName}) => {

    const [ accepted, setAccepted ] = useState(false);
    const [ notClicked, setNotClicked ] = useState(true);

    // my super detection of users gender. Unfortunately works only for polish names :/ .
    const notifier = firstName.replace(/ /g, "").substring(firstName.length - 1) === "a" ? notificationsFemaleVersion : notificationsMaleVersion;
    
    return (
        <Container>
            <InnerContainer>
                <UserPhoto src={profilePhoto}/>
                <span>
                    <a href={link}>{firstName} {surName}</a> 
                    {notifier[type]}            
                </span>
            </InnerContainer>
            { 
                (type === "invitation" && notClicked) &&
                <Buttons>
                    <AcceptButton id="accept-button" onClick={() => { setAccepted(true); setNotClicked(false); }}>Zaakceptuj</AcceptButton>
                    <DeclineButton id="decline-button" onClick={() => { setAccepted(false); setNotClicked(false); }}>Odrzuć</DeclineButton>
                </Buttons>
            }
            { 
                (type === "invitation" && !notClicked && accepted) ?
                <Status>Zaproszenie zostało zaakceptowane</Status> :
                null
            }
            { 
                (type === "invitation" && !notClicked && !accepted) ?
                <Status>Zaproszenie zostało odrzucone</Status> :
                null
            }
        </Container>
    );
};

const Container = styled.div`
    width: 365px;
    margin: 0px 0px 15px 0px;
    font-size: 20px;
    span {
        display: inline-block;
        word-wrap:break-word;
        width: 100%;
        white-space: normal;
    }
    a {
        font-weight: ${({theme}) => theme.fontWeight.bold};
        text-decoration: none;
        &:link, &:visited, &:hover, &:active {
            color: #000;
        }
    }

    @media only screen and (max-width: 1000px) {
        font-size: 15px;
        width: 245px;
    }
    @media only screen and (max-width: 720px) {
        width: 95%;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px 0px 5px 5px;
    &:hover{
        border-radius: 25px;
        background: rgba(18, 191, 206, 0.4);
        transition: background-color 0.2s;
    }
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    @media only screen and (max-width: 720px) {
        margin-top: 5px;
    }
`;

const AcceptButton = styled(Button)`
    border-radius: 5px;
    width: 100px;
    height: 32px; // 30px + 2px (Status border line)
    margin-right: 15px;
    @media only screen and (max-width: 1000px) {
        font-size: 10px;
        width: 70px;
        height: 27px;
        margin-right: 10px;
    }
`;

const DeclineButton = styled(Button)`
    border-radius: 5px;
    width: 100px;
    height: 32px;
    @media only screen and (max-width: 1000px) {
        font-size: 10px;
        width: 70px;
        height: 27px;
    }
`;

const Status = styled.p`
    margin-top: 10px;
    height: 30px;
    width: 250px;
    color: ${({theme}) => theme.color.lightTurquise};
    font-weight: ${({theme}) => theme.fontWeight.bold};
    text-align: center;
    margin: 10px auto 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    line-height: 30px;
    font-size: 15px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    @media only screen and (max-width: 1000px) {
        font-size: 10px;
        height: 25px;
        line-height: 25px;
        width: 150px;
    }
    @media only screen and (max-width: 720px) {
        margin-top: 5px;
    }
`;

const UserPhoto = styled.img`
    width: 64px;
    height: 64px;
    border-radius: 100%;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    margin-right: 10px;
    @media only screen and (max-width: 1000px) {
        width: 48px;
        height: 48px;
    }
`;

export default NotificationsItem;