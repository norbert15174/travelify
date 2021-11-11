import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./styles/friends.css";
import noMessageIcon from "./assets/noMessageIcon.svg";
import messageAvailableIcon from "./assets/messageAvailableIcon.svg";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

const GroupItem = ({
  group,
  selectedChat,
  setSelectedChat,
  chatBlock,
  messageNotifications,
  setMessageNotifications,
}) => {
  const [messageNew, setMessageNew] = useState(group.messagesNew);
  useEffect(() => {
    if (
      messageNotifications.size > 0 &&
      messageNotifications.has(group.id)
    ) {
      if (selectedChat && messageNotifications.has(selectedChat.id)) {
        setMessageNew(false);
      } else {
        setMessageNew(true);
      }
      messageNotifications.delete(group.id);
      setMessageNotifications(messageNotifications);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageNotifications]);
  return (
    <Container
      chatBlock={chatBlock}
      className="font"
      onClick={(e) => {
        if (!chatBlock) {
          setMessageNew(false);
          setSelectedChat(null);
          setSelectedChat(group);
        }
      }}
    >
      <Photo
        src={
          group.groupPicture !== undefined && group.groupPicture
            ? group.groupPicture
            : noProfilePictureIcon
        }
        alt="Profile picture"
        onError={(e) => {
          e.target.onError = null;
          e.target.src = noProfilePictureIcon;
        }}
      />
      <Name>{group.groupName}</Name>
      {!chatBlock ? (
        <Icon src={messageNew ? messageAvailableIcon : noMessageIcon} />
      ) : (
        <Communicate>
          Czat nie jest zooptymalizowany dla ekranów o takich wymiarach.
        </Communicate>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-top: 5px;
  padding: 5px;
  &:hover {
    border-radius: ${({ chatBlock }) => (!chatBlock ? "30px" : "")};
    background: ${({ chatBlock }) =>
      !chatBlock ? "rgba(18, 191, 206, 0.4)" : ""};
    transition: ${({ chatBlock }) =>
      !chatBlock ? "background-color 0.2s" : ""};
  }
`;

const Photo = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  margin-right: 10px;
  border: 2px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1000px) {
    width: 42px;
    height: 42px;
  }
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
  margin: 0 10px 0 auto;
  @media only screen and (max-width: 1000px) {
    width: 36px;
    height: 36px;
  }
`;

const Communicate = styled.p`
  display: inline-block;
  width: 35%;
  text-align: center;
  margin-left: auto;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.redAlert};
  @media only screen and (max-width: 400px) {
    font-size: 8px;
  }
`;

export default GroupItem;
