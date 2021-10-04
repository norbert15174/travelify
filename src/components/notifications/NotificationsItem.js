import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../trinkets/Button";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { endpoints } from "../../url";
import { setFriendsList } from "../../redux/userDataSlice";

const notificationsMaleVersion = {
    "tag": " oznaczył cię na zdjęciu",
    "invitation": " wysłał ci zaproszenie do znajomych",
    "comment": " skomentował twoje zdjęcie",
    "share": " udostępnił Ci swój album",
}

const notificationsFemaleVersion = {
    "tag": " oznaczyła cię na zdjęciu",
    "invitation": " wysłała ci zaproszenie do znajomych",
    "comment": " skomentowała twoje zdjęcie",
    "share": " udostępniła Ci swój album",
}

const NotificationsItem = ({type, senderId, firstName, surName, photo=undefined, invitationId=null}) => {

    const [ accepted, setAccepted ] = useState(false);
    const [ notClicked, setNotClicked ] = useState(true);
    const dispatch = useDispatch();

    // my super detection of users gender. Unfortunately works only for polish names :/ .
    const notifier = firstName.replace(/ /g, "").substring(firstName.length - 1) === "a" ? notificationsFemaleVersion : notificationsMaleVersion;
    
    async function invitationHandler(type) {
        await axios({
			method: type === "accept" ? "put" : "delete",
			url: endpoints.invitationHandler + invitationId,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then(({data}) => {
            dispatch(setFriendsList(data))
            if (type === "accept") {
                setAccepted(true);
                setNotClicked(false);
            } else if (type === "decline") {
                setAccepted(false);
                setNotClicked(false);
            }
		}).catch((error) => {
            console.log(error);
		});
    }

    return (
        <Container>
            <InnerContainer>
                <UserPhoto 
                    src={photo !== undefined ? photo : noProfilePictureIcon}
                    alt="Profile picture"
                    onError={(e) => {e.target.onError = null; e.target.src=noProfilePictureIcon;}}
                />
                <span>
                    <p>{firstName} {surName}</p> 
                    {notifier[type]}            
                </span>
            </InnerContainer>
            { 
                (type === "invitation" && notClicked) &&
                <Buttons>
                    <AcceptButton id="accept-button" onClick={() => invitationHandler("accept")}>Zaakceptuj</AcceptButton>
                    <DeclineButton id="decline-button" onClick={() => invitationHandler("decline")}>Odrzuć</DeclineButton>
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
        word-wrap: break-word;
        width: 300px;
        white-space: normal;
    }
    p {
        display: inline-block;
        font-weight: ${({theme}) => theme.fontWeight.bold};
    }
    @media only screen and (max-width: 1000px) {
        font-size: 15px;
        width: 245px;
        span { 
            width: 180px;
        }
    }
    @media only screen and (max-width: 720px) {
        width: 95%;
        span { 
            width: 100%;
        }
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
    margin: 10px 0 0 35px;
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
    flex-shrink: 1;
    @media only screen and (max-width: 1000px) {
        width: 48px;
        height: 48px;
    }
`;

export default NotificationsItem;