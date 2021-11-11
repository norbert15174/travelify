import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import styled from "styled-components";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import openGroupIcon from "./assets/openGroupIcon.svg";

const GroupThumbnail = ({ group, redirectToGroup }) => {
  const [redirectToProfile, setRedirectToProfile] = useState({
    active: false,
    userId: null,
  });

  if (redirectToProfile.active) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, redirectToProfile.userId),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: redirectToProfile.userId,
              isHeFriend: false,
            },
          },
        }}
      />
    );
  }

  return (
    <Container>
      <GroupPicture
        alt={"Group " + group.id}
        src={
          group.groupPicture !== undefined
            ? group.groupPicture
            : noProfilePictureIcon
        }
        onClick={redirectToGroup}
      />
      <InnerContainer>
        <GroupName onClick={redirectToGroup}>{group.groupName}</GroupName>
        <GroupDescription>{group.description}</GroupDescription>
        <MembersContainer>
          <Owner
            onClick={() =>
              setRedirectToProfile({ active: true, userId: group.owner.id })
            }
          >
            <ProfilePicture
              alt={"Profile picture " + group.owner.id}
              src={
                group.owner.photo !== undefined
                  ? group.owner.photo
                  : noProfilePictureIcon
              }
            />
            <p>{group.owner.name + " " + group.owner.surName}</p>
          </Owner>
          <MembersAmount>
            {group.members.length > 1
              ? group.members.length + " członków grupy"
              : "1 członek grupy"}
          </MembersAmount>
        </MembersContainer>
      </InnerContainer>
      <Open icon={openGroupIcon} onClick={redirectToGroup} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.color.darkBackground};
  border-radius: 90px;
  height: 200px;
  position: relative;
  @media only screen and (max-width: 1425px) {
    height: 190px;
  }
  @media only screen and (max-width: 1225px) {
    height: 180px;
  }
  @media only screen and (max-width: 1025px) {
    height: 160px;
  }
  @media only screen and (max-width: 825px) {
    height: 140px;
  }
  @media only screen and (max-width: 510px) {
    height: 80px;
  }
`;

const GroupPicture = styled.img`
  cursor: pointer;
  width: 175px;
  height: 175px;
  border: 2px solid ${({ theme }) => theme.color.light};
  border-radius: 50%;
  margin: auto 0 auto 10px;
  @media only screen and (max-width: 1425px) {
    width: 160px;
    height: 160px;
  }
  @media only screen and (max-width: 1225px) {
    width: 145px;
    height: 145px;
  }
  @media only screen and (max-width: 1025px) {
    width: 130px;
    height: 130px;
  }
  @media only screen and (max-width: 825px) {
    width: 110px;
    height: 110px;
  }
  @media only screen and (max-width: 510px) {
    width: 60px;
    height: 60px;
  }
`;

const InnerContainer = styled.div`
  width: 76%;
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media only screen and (max-width: 1425px) {
    width: 70%;
  }
  @media only screen and (max-width: 1225px) {
    width: 65%;
  }
  @media only screen and (max-width: 1025px) {
    width: 60%;
    padding: 10px 20px;
  }
  @media only screen and (max-width: 825px) {
    width: 50%;
  }
  @media only screen and (max-width: 510px) {
  }
`;

const GroupName = styled.h1`
  font-size: 30px;
  cursor: pointer;
  margin-bottom: 5px;
  @media only screen and (max-width: 1425px) {
    font-size: 28px;
  }
  @media only screen and (max-width: 1225px) {
    font-size: 26px;
  }
  @media only screen and (max-width: 1025px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 22px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 14px;
  }
`;

const GroupDescription = styled.p`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  @media only screen and (max-width: 1425px) {
    font-size: 15px;
  }
  @media only screen and (max-width: 1225px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 1025px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 825px) {
    -webkit-line-clamp: 3;
  }
  @media only screen and (max-width: 510px) {
    font-size: 10px;
    -webkit-line-clamp: 2;
    display: none;
  }
`;

const MembersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto 0 0 0;
`;

const Owner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  p {
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  @media only screen and (max-width: 1425px) {
    p {
      font-size: 18px;
    }
  }
  @media only screen and (max-width: 1225px) {
    p {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 1025px) {
    p {
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 825px) {
    p {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 510px) {
    display: none;
  }
`;

const ProfilePicture = styled.img`
  width: 38px;
  height: 38px;
  border: 2px solid ${({ theme }) => theme.color.light};
  border-radius: 50%;
  margin-right: 10px;
  @media only screen and (max-width: 1425px) {
    width: 34px;
    height: 34px;
  }
  @media only screen and (max-width: 1225px) {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 1025px) {
    width: 26px;
    height: 26px;
  }
  @media only screen and (max-width: 825px) {
    width: 22px;
    height: 22px;
  }
  @media only screen and (max-width: 510px) {
    display: none;
  }
`;

const MembersAmount = styled.p`
  margin: 0 0 0 auto;
  font-size: 20px;
  color: ${({ theme }) => theme.color.greyFont};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media only screen and (max-width: 1425px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 1225px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 1025px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 510px) {
    margin: 0 auto 0 0;
  }
`;

const Open = styled.div`
  cursor: pointer;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 60px;
  height: 60px;
  position: absolute;
  margin-right: 20px;
  right: 0;
  margin-top: 65px;
  top: 0;
  opacity: 1;
  &:hover {
    opacity: 0.9;
  }
  @media only screen and (max-width: 1425px) {
    width: 55px;
    height: 55px;
    margin-top: 70px;
  }
  @media only screen and (max-width: 1225px) {
    width: 50px;
    height: 50px;
    margin-top: 65px;
  }
  @media only screen and (max-width: 1025px) {
    width: 45px;
    height: 45px;
    margin-top: 60px;
    margin-right: 15px;
  }
  @media only screen and (max-width: 825px) {
    width: 40px;
    height: 40px;
    margin-top: 50px;
    margin-right: 15px;
  }
  @media only screen and (max-width: 510px) {
    width: 30px;
    height: 30px;
    margin-top: 25px;
    margin-right: 10px;
  }
`;

export default GroupThumbnail;
