import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import closeIcon from "./assets/closeIcon.svg";
import groupsIcon from "./assets/groupsIcon.svg";
import userIcon from "./assets/userIcon.svg";
import NotificationsItem from "./NotificationsItem";
import "./notificationsScrollbar.css";
import Toggle from "../trinkets/Toggle";
import { endpoints } from "../../url";
import { setFriendsList } from "../../redux/userDataSlice";
import Tooltip from "../trinkets/Tooltip";
import moment from "moment";
import "moment/locale/pl";

const notificationsType = {
  user: "user", // true
  group: "group", // false
};

const Notifications = ({ notificationsDisplay }) => {
  const blurState = useSelector((state) => state.blur.value);
  const [userNotifications, setUserNotifications] = useState([]);
  const [groupNotifications, setGroupNotifications] = useState([]);
  const [type, setType] = useState(notificationsType.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getFriends();
    getNotifications();
    /* getGroupRequests(); */
    moment.locale("pl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(type);
  }, [type]);

  async function getFriends() {
    axios({
      url: endpoints.getLoggedUserFriends,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setFriendsList(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getNotifications() {
    axios({
      url: endpoints.getNotifications,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        setUserNotifications(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getGroupRequests() {
    axios({
      url: endpoints.getUserGroupRequests,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        /* setGroupNotifications(data); */
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Container blurState={blurState}>
      <Header>
        <Heading>Powiadomienia</Heading>
        <CloseButton
          icon={closeIcon}
          onClick={() => notificationsDisplay(false)}
        />
      </Header>
      <ToggleContainer>
        <OptionContainer
          data-tip
          data-for="userNotification"
          active={type === notificationsType.user ? true : false}
          icon={userIcon}
        />
        <Tooltip
          id="userNotification"
          place="bottom"
          text="Powiadomienia użytkowników"
        />
        <Toggle
          value={type}
          setValue={setType}
          first={notificationsType.user}
          second={notificationsType.group}
        />
        <OptionContainer
          data-tip
          data-for="groupNotification"
          active={type === notificationsType.group ? true : false}
          icon={groupsIcon}
        />
        <Tooltip
          id="groupNotification"
          place="bottom"
          text="Powiadomienia grup"
        />
      </ToggleContainer>
      <NotificationsList className="scroll">
        {type === notificationsType.user && userNotifications.length !== 0
          ? userNotifications.map((item) => (
              <NotificationsItem
                key={item.id + item.date}
                notificationsDisplay={notificationsDisplay}
                senderId={item.user.id}
                name={item.user.name}
                surName={item.user.surName}
                profilePicture={item.user.photo}
                photoId={item.photoId}
                albumId={item.albumId}
                status={item.status}
                invitationId={item.id}
                date={moment(item.date).calendar()}
              />
            ))
          : null}
        {type === notificationsType.user && userNotifications.length === 0 && (
          <NoItems>Brak powiadomień...</NoItems>
        )}
        {type === notificationsType.group && groupNotifications.length !== 0
          ? userNotifications.map((item) => (
              <NotificationsItem
                key={item.id + item.date}
                notificationsDisplay={notificationsDisplay}
                senderId={item.user.id}
                name={item.user.name}
                surName={item.user.surName}
                profilePicture={item.user.photo}
                photoId={item.photoId}
                albumId={item.albumId}
                status={item.status}
                invitationId={item.id}
                date={moment(item.date).calendar()}
              />
            ))
          : null}
        {type === notificationsType.group &&
          groupNotifications.length === 0 && (
            <NoItems>Brak powiadomień...</NoItems>
          )}
      </NotificationsList>
    </Container>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  position: fixed;
  width: 425px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  right: 91px;
  top: 0;
  height: 100vh;
  z-index: 800;
  -webkit-box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
  box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
  @media only screen and (max-width: 1000px) {
    width: 300px;
  }
  @media only screen and (max-width: 720px) {
    width: calc(100vw - 90px);
  }
  @media only screen and (max-width: 720px) and (max-height: 560px) {
    width: calc(100vw - 80px);
  }
  @media only screen and (max-height: 560px) {
    right: 81px;
  }
  @media only screen and (max-width: 720px) and (max-height: 480px) {
    width: calc(100vw - 70px);
  }
  @media only screen and (max-height: 480px) {
    right: 71px;
  }
  @media only screen and (max-width: 720px) and (max-height: 400px) {
    width: calc(100vw - 60px);
  }
  @media only screen and (max-height: 400px) {
    right: 61px;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 1000px) {
    height: 55px;
  }
`;

const Heading = styled.h1`
  margin-left: 12px;
  font-size: 30px;
  color: ${({ theme }) => theme.color.lightBackground};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media only screen and (max-width: 1000px) {
    font-size: 20px;
  }
`;

const CloseButton = styled.div`
  margin: 0 12px 0 auto;
  cursor: pointer;
  background-image: url(${({ icon }) => icon});
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

const ToggleContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 80px max-content;
  justify-content: center;
  align-content: center;
  margin: 25px 15px 0px 0px;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: max-content 60px max-content;
  }
`;

const OptionContainer = styled.div`
  background: ${({ active }) => (active ? "rgba(18, 191, 206, 0.4)" : "")};
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  text-align: center;
  border-radius: 15px;
  width: 30px;
  height: 30px;
  padding: 5px 25px 5px 25px;
  margin: auto 25px auto 25px;
  background-image: url(${({ icon }) => icon});
  background-size: 40%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  @media only screen and (max-width: 1000px) {
    width: 20px;
    height: 20px;
    padding: 5px 20px;
    margin: auto 25px;
  }
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  overflow-y: scroll; /* Add vertical scrollbar */
  max-height: 100vh;
  margin: 20px 10px 20px 10px;
  @media only screen and (max-width: 1000px) {
    margin: 15px 5px 15px 5px;
  }
`;

const NoItems = styled.h1`
  display: inline-block;
  margin: 10px auto;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;

export default Notifications;
