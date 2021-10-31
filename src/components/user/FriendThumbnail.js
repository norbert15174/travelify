import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import closeIcon from "./assets/closeIcon.svg";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { setFriendToDeleteId } from "../../redux/deleteFriendSlice";
import { useDispatch } from "react-redux";
import { routes } from "../../miscellanous/Routes";
import { userTypes } from "../../miscellanous/Utils";
import Tooltip from "../trinkets/Tooltip";

const FriendThumbnail = ({ userType, friend }) => {
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const dispatch = useDispatch();

  if (redirectToProfile) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, friend.id),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: friend.id,
              isHeFriend: true,
            },
          },
        }}
      />
    );
  }

  return (
    <>
      <Container>
        <PhotoContainer onClick={() => setRedirectToProfile(true)}>
          <Photo
            src={
              friend.profilePicture !== undefined && friend.profilePicture
                ? friend.profilePicture
                : noProfilePictureIcon
            }
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noProfilePictureIcon;
            }}
            alt="Profile picture"
          />
        </PhotoContainer>
        <NameContainer onClick={() => setRedirectToProfile(true)}>
          <Name>{friend.name + " " + friend.lastName}</Name>
        </NameContainer>
        <RemoveFriend
          data-tip
          data-for="remove"
          userType={userType}
          src={closeIcon}
          onClick={() => dispatch(setFriendToDeleteId(friend.id))}
        />
        <Tooltip
          id="remove"
          place="left"
          text="Kliknij, by usunąć osobę ze znajomych"
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 100px auto 30px;
  align-items: center;
  @media only screen and (max-width: 1440px) {
    grid-template-columns: 80px auto 30px;
  }
  @media only screen and (max-width: 1080px) {
    grid-template-columns: 70px auto 20px;
  }
  @media only screen and (max-width: 830px) {
    grid-template-columns: 60px auto 20px;
  }
  @media only screen and (max-width: 735px) {
    grid-template-columns: 50px auto 20px;
  }
  @media only screen and (max-width: 560px) {
    grid-template-columns: 40px auto 12px;
  }
`;

const PhotoContainer = styled.div`
  cursor: pointer;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  @media only screen and (max-width: 1440px) {
    width: 80px;
    height: 80px;
  }
  @media only screen and (max-width: 1080px) {
    width: 70px;
    height: 70px;
  }
  @media only screen and (max-width: 830px) {
    width: 60px;
    height: 60px;
  }
  @media only screen and (max-width: 735px) {
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 560px) {
    width: 40px;
    height: 40px;
  }
`;

const NameContainer = styled.div`
  cursor: pointer;
  width: max-content;
  height: auto;
`;

const Name = styled.h2`
  margin-left: 15px;
  font-size: 30px;
  color: #000;

  @media only screen and (max-width: 1440px) {
    font-size: 25px;
  }
  @media only screen and (max-width: 1080px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 830px) {
    font-size: 15px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 12px;
  }
`;

const RemoveFriend = styled.img`
  display: ${({ userType }) =>
    userType !== userTypes.logged ? "none" : "block"};
  width: 30px;
  height: 30px;
  justify-self: end;
  cursor: pointer;
  @media only screen and (max-width: 1440px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 1080px) {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
  @media only screen and (max-width: 830px) {
    width: 15px;
    height: 15px;
  }
  @media only screen and (max-width: 735px) {
    width: 12px;
    height: 12px;
  }
  @media only screen and (max-width: 560px) {
    margin: 0;
  }
`;

export default FriendThumbnail;
