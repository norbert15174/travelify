import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import "./styles/messageTooltip.css";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import moment from "moment";
import "moment/locale/pl";

const SingleMessage = ({
  url,
  newestMessageRef,
  side = null,
  friendName = null,
  friendId = null,
  message,
  messageId,
  messageDate,
  chatsDisplay = null,
}) => {
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  useEffect(() => {
    moment.locale("pl");
  }, []);

  if (redirectToProfile) {
    chatsDisplay("");
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, friendId),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: friendId,
              isHeFriend: true,
            },
          },
        }}
      />
    );
  }

  return (
    <Container side={side} ref={newestMessageRef}>
      {side === "right" ? null : (
        <>
          <ProfileIcon
            data-tip
            data-for={"friendTip" + messageDate}
            src={url !== undefined && url ? url : noProfilePictureIcon}
            alt="Profile picture"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noProfilePictureIcon;
            }}
            onClick={() => setRedirectToProfile(true)}
          />
          <ReactTooltip
            id={"friendTip" + messageDate}
            place={"left"}
            effect="solid"
            delayShow={250}
            className="message-tooltip"
          >
            {friendName}
          </ReactTooltip>
        </>
      )}
      <TextContainer
        data-tip
        data-for={"messageTip-" + messageDate + "-" + messageId}
        side={side}
      >
        {message}
      </TextContainer>
      <ReactTooltip
        id={"messageTip-" + messageDate + "-" + messageId}
        place={"left"}
        effect="solid"
        delayShow={250}
        className="message-tooltip"
      >
        {moment(messageDate).calendar()}
      </ReactTooltip>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${({ side }) =>
    side === "right" ? "flex-end" : "flex-start"};
  position: relative;
`;

const TextContainer = styled.div`
  padding: 10px;
  max-width: 60%;
  margin-left: ${({ side }) =>
    side === "right" ? "calc(100% - 210px)" : "0px"};
  margin-right: ${({ side }) => (side === "right" ? "11px" : "0px")};
  background-color: ${({ side, theme }) =>
    side === "right"
      ? theme.color.lightBackground
      : theme.color.darkBackground};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.light};
  overflow-wrap: break-word;
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 2.5px 11px 0px 0px;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1000px) {
    width: 34px;
    height: 34px;
  }
`;

export default SingleMessage;
