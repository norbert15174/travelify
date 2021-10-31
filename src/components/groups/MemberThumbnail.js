import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import closeIconBlack from "./assets/closeIconBlack.svg";
import invitationSendIcon from "./assets/invitationSendIcon.svg";
import Tooltip from "../trinkets/Tooltip";

const MemberThumbnail = ({ member, type = null, setMemberToRemove = null }) => {
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  if (redirectToProfile) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, 1),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: 1,
              isHeFriend: false,
            },
          },
        }}
      />
    );
  }

  return (
    <Member key={member.id}>
      <MemberPicture
        alt={member.id + " picture"}
        src={member.profilePicture}
        onClick={() => setRedirectToProfile(true)}
      />
      <MemberName
        onClick={() => setRedirectToProfile(true)}
      >{`${member.name} ${member.surname}`}</MemberName>
      {type === "requests" ? (
        <InvitationDate>15 sekund temu</InvitationDate>
      ) : (
        <>
          <Icon
            data-tip
            data-for="remove"
            icon={closeIconBlack}
            onClick={() => setMemberToRemove(member.id)}
          />
          <Tooltip
            id="remove"
            place="left"
            text="Kliknij, by usunąć osobę z grupy"
          />
        </>
      )}
    </Member>
  );
};

const Member = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MemberPicture = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border: 2px solid ${({ theme }) => theme.color.dark};
  border-radius: 50%;
  cursor: pointer;
  @media only screen and (max-width: 1010px) {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 810px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 550px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 400px) {
    width: 20px;
    height: 20px;
    margin-right: 7.5px;
  }
`;

const MemberName = styled.h1`
  font-size: 28px;
  cursor: pointer;
  @media only screen and (max-width: 1010px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 810px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 550px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 400px) {
    font-size: 10px;
  }
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 20px 0 auto;
  background-image: url(${({ icon }) => icon});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  cursor: ${({ icon }) =>
    icon === invitationSendIcon ? "default" : "pointer"};
  @media only screen and (max-width: 1010px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 810px) {
    width: 20px;
    height: 20px;
  }
  @media only screen and (max-width: 550px) {
    width: 15px;
    height: 15px;
  }
  @media only screen and (max-width: 400px) {
    margin: 0 7.5px 0 auto;
    width: 10px;
    height: 10px;
  }
`;

const InvitationDate = styled.p`
  font-size: 16px;
  color: ${({theme}) => theme.color.greyFont};
  margin: 0 5px 0 auto;
  @media only screen and (max-width: 1010px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 810px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 550px) {
    font-size: 8px;
  }
`;

export default MemberThumbnail;
