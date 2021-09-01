import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import closeIcon from "./assets/closeIcon.svg";
import NotificationsItem from "./NotificationsItem";
import "./notificationsScrollbar.css";

const Notifications = ({notificationsDisplay}) => {

    const blurState = useSelector((state) => state.blur.value); 

    return (
        <Container blurState={blurState}>
            <Header>
                <Heading>
                    Powiadomienia
                </Heading>
                <CloseButton icon={closeIcon} onClick={() => notificationsDisplay(false)}/>
            </Header>
            <NotificationsList className="scroll">
                <NotificationsItem firstName="Jaś" surName="Fasola" type="invitation"/>
                <NotificationsItem firstName="Jaś" surName="Fasola" type="comment"/>
                <NotificationsItem firstName="Jaś" surName="Fasola" type="share"/>
                <NotificationsItem firstName="Jaś" surName="Fasola" type="tag"/>
            </NotificationsList>
        </Container>
    );

}

const Container = styled.div`
    filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    position: fixed;
    width: 420px;
    background-color: ${({theme}) => theme.color.lightBackground};
    right: 121px;
    top: 0;
    height: 100vh;
    z-index: 800;
    -webkit-box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
    box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
    @media only screen and (max-width: 1000px) {
        width: 300px;
    }
    @media only screen and (max-width: 720px) {
        width: calc(100vw - 120px);
    }
`;

const Header = styled.div`
    width: 100%;
    height: 65px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.color.darkTurquise};
    @media only screen and (max-width: 1000px) {
        height: 55px;
    }
`;

const Heading = styled.h1`
    margin-left: 12px;
    font-size: 30px;
    color: ${({theme}) => theme.color.lightBackground};
    font-weight: ${({theme}) => theme.fontWeight.bold};
    @media only screen and (max-width: 1000px) {
        font-size: 20px;
    }
`;

const CloseButton = styled.div`
    margin: 0 12px 0 auto;
    cursor: pointer;
    background-image: url(${({icon}) => icon});
    width: 25px;
    height: 25px;
    background-size: 25px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    @media only screen and (max-width: 1000px) {
        width: 15px;
        height: 15px;
        background-size: 15px;
    }
    @media only screen and (max-width: 720px) {
        margin: 0 30px 0 auto;
    }
`;

const NotificationsList = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden; /* Hide horizontal scrollbar */
    overflow-y: scroll; /* Add vertical scrollbar */
    max-height: 100vh;
    margin: 20px 10px 20px 20px;
    @media only screen and (max-width: 1000px) {
        margin: 15px 10px 15px 15px;
    }
`;

export default Notifications;