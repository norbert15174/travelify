import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Button from "../trinkets/Button";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { endpoints } from "../../miscellanous/url";
import { setNotification } from "../../redux/notificationSlice";

const notificationsMaleVersion = {
  GROUP_REQUEST: " zaprosił cię do grupy: ",
  PHOTO_COMMENT: " skomentował zdjęcie z grupy: ",
  PHOTO_MARKED: " oznaczył cię na zdjęciu z grupy: ",
  NEW_ALBUM: " dodał nowy album w grupie: ",
  DELETE_ALBUM: " usunął album z grupy: ",
  REMOVE_USER: " usunął cię z grupy: ",
  CHANGE_GROUP_OWNER: " mianował cię właścicielem grupy: ",
  CHANGE_ALBUM_OWNER: " mianował cię właścicielem albumu grupy: ",
};

const notificationsFemaleVersion = {
  GROUP_REQUEST: " zaprosiła cię do grupy: ",
  PHOTO_COMMENT: " skomentowała zdjęcie z grupy: ",
  PHOTO_MARKED: " oznaczyła cię na zdjęciu z grupy: ",
  NEW_ALBUM: " dodała nowy album w grupie: ",
  DELETE_ALBUM: " usunęła album z grupy: ",
  REMOVE_USER: " usunęła cię z grupy: ",
  CHANGE_GROUP_OWNER: " mianowała cię właścicielką grupy: ",
  CHANGE_ALBUM_OWNER: " mianowała cię właścicielką albumu grupy: ",
};

const GroupItem = ({ notification, date, notificationsDisplay }) => {
  const [accepted, setAccepted] = useState(false);
  const [notClicked, setNotClicked] = useState(true);
  const [redirectToAlbum, setRedirectToAlbum] = useState(false);
  const [redirectToGroup, setRedirectToGroup] = useState(false);
  const dispatch = useDispatch();

  // my super detection of users gender. Unfortunately works only for polish names :/ .
  const notifier =
    notification.actionUser.name
      .replace(/ /g, "")
      .substring(notification.actionUser.name.length - 1) === "a"
      ? notificationsFemaleVersion
      : notificationsMaleVersion;

  async function groupInvitationHandler(action) {
    await axios({
      method: action === "accept" ? "put" : "delete",
      url: endpoints.groupInvitationHandler + notification.groupRequestId,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        if (action === "accept") {
          setAccepted(true);
          setNotClicked(false);
        } else if (action === "decline") {
          setAccepted(false);
          setNotClicked(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (redirectToAlbum) {
    notificationsDisplay("");
    return (
      <Redirect
        push
        to={{ pathname: `/groupAlbum/${notification.groupAlbumId}` }}
      />
    );
  }

  if (redirectToGroup) {
    notificationsDisplay("");
    return (
      <Redirect push to={{ pathname: `/group/${notification.groupId}` }} />
    );
  }

  return (
    <Container>
      <InnerContainer
        onClick={() => {
          if (
            (notification.type === "GROUP_REQUEST" &&
              notification.status === "ACCEPTED") ||
            (notification.type === "GROUP_REQUEST" && accepted) ||
            notification.type === "CHANGE_GROUP_OWNER"
          ) {
            setRedirectToGroup(true);
          }
          if (
            notification.type === "PHOTO_COMMENT" ||
            notification.type === "PHOTO_MARKED" ||
            notification.type === "NEW_ALBUM" ||
            notification.type === "CHANGE_ALBUM_OWNER"
          ) {
            dispatch(
              setNotification({
                albumId: notification.groupAlbumId,
                photoId:
                  notification.type !== "NEW_ALBUM"
                    ? notification.pictureId
                    : "",
              })
            );
            setRedirectToAlbum(true);
          }
        }}
      >
        <UserPhoto
          src={
            notification.actionUser.photo !== undefined
              ? notification.actionUser.photo
              : noProfilePictureIcon
          }
          alt="Picture"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noProfilePictureIcon;
          }}
        />
        <TextContainer notSeen={notification.status === "NEW" ? true : false}>
          <span>
            <p>
              {notification.actionUser.name} {notification.actionUser.surName}
            </p>
            {notifier[notification.type]}
            <p>{notification.groupName}</p>
          </span>
          <Date>{date}</Date>
        </TextContainer>
      </InnerContainer>
      {notification.type === "GROUP_REQUEST" &&
        notClicked &&
        (notification.status === "NEW" || notification.status === "SEEN") && (
          <Buttons>
            <AcceptButton
              id="accept-button"
              onClick={() => groupInvitationHandler("accept")}
            >
              Zaakceptuj
            </AcceptButton>
            <DeclineButton
              id="decline-button"
              onClick={() => groupInvitationHandler("decline")}
            >
              Odrzuć
            </DeclineButton>
          </Buttons>
        )}
      {(notification.type === "GROUP_REQUEST" && !notClicked && accepted) ||
      notification.status === "ACCEPTED" ? (
        <Status>Zaproszenie zostało zaakceptowane</Status>
      ) : null}
      {notification.type === "GROUP_REQUEST" && !notClicked && !accepted ? (
        <Status>Zaproszenie zostało odrzucone</Status>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  margin: 0px 5px 15px 0px;
  font-size: 20px;
  cursor: pointer;
  span {
    display: inline-block;
    word-wrap: break-word;
    width: 300px;
    white-space: normal;
  }
  p {
    display: inline-block;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${({ notSeen, theme }) =>
    notSeen ? theme.fontWeight.bold : ""};
`;

const Date = styled.p`
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 14px;
  margin: auto auto 0 0;
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: 79px 1fr;
  padding: 5px 0px 5px 5px;
  &:hover {
    border-radius: 25px;
    background: rgba(18, 191, 206, 0.4);
    transition: background-color 0.2s;
  }
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 63px 1fr;
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
  color: ${({ theme }) => theme.color.light};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  margin: 10px 0 0 35px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  line-height: 30px;
  font-size: 15px;
  border: 1px solid ${({ theme }) => theme.color.light};
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
  border: 1px solid ${({ theme }) => theme.color.light};
  margin-right: 15px;
  flex-shrink: 1;
  @media only screen and (max-width: 1000px) {
    width: 48px;
    height: 48px;
  }
`;

export default GroupItem;
