import React, { useState } from "react";
import styled from "styled-components";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { routes } from "../../miscellanous/Routes";
import { Redirect } from "react-router-dom";

const FoundPersonThumbnail = ({ person }) => {
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
    <>
      <Container>
        <Photo
          src={
            person.photo !== undefined && person.photo
              ? person.photo
              : noProfilePictureIcon
          }
          alt="Profile picture"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noProfilePictureIcon;
          }}
          onClick={() =>
            setRedirectToProfile({ active: true, userId: person.id })
          }
        />
        <Name
          onClick={() =>
            setRedirectToProfile({ active: true, userId: person.id })
          }
        >
          {person.name + " " + person.surName}
        </Name>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Photo = styled.img`
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 25px;
  @media only screen and (max-width: 1400px) {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  @media only screen and (max-width: 1100px) {
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
  @media only screen and (max-width: 800px) {
    width: 50px;
    height: 50px;
  }
`;

const Name = styled.h2`
  font-size: 30px;
  cursor: pointer;
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  @media only screen and (max-width: 1400px) {
    font-size: 25px;
  }
  @media only screen and (max-width: 1100px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 800px) {
    font-size: 18px;
    margin-right: 15px;
  }
`;

export default FoundPersonThumbnail;
