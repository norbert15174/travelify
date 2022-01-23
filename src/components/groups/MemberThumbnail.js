import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { routes } from "../../miscellanous/Routes";
import closeIconBlack from "./assets/closeIconBlack.svg";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import crownIcon from "./assets/crownIcon.svg";
import Tooltip from "../trinkets/Tooltip";
import { selectRights, selectOwner } from "../../redux/groupDetailsSlice";
import { groupMember } from "../../miscellanous/Utils";

const MemberThumbnail = ({
  member,
  type = null,
  setMemberToRemove = null,
  date = null,
}) => {
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const rights = useSelector(selectRights);
  const owner = useSelector(selectOwner);

  if (redirectToProfile) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, member.id),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: member.id,
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
        src={member.photo !== undefined ? member.photo : noProfilePictureIcon}
        onClick={() => setRedirectToProfile(true)}
      />
      <MemberName
        onClick={() => setRedirectToProfile(true)}
      >{`${member.name} ${member.surName}`}</MemberName>
      {type === "requests" ? (
        <InvitationDate>{date}</InvitationDate>
      ) : (
        <>
          {rights === groupMember.owner &&
          member.id.toString() !== sessionStorage.getItem("loggedUserId") ? (
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
          ) : null}
          {owner.id === member.id ? (
            <>
              <Icon data-tip data-for="owner" icon={crownIcon} />
              <Tooltip id="owner" place="left" text="Właściciel grupy" />
            </>
          ) : null}
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
  cursor: ${({ icon }) => (icon !== closeIconBlack ? "default" : "pointer")};
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
  color: ${({ theme }) => theme.color.greyFont};
  margin: 0 5px 0 10px;
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
