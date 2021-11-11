import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { routes } from "../../miscellanous/Routes";

const GroupAlbumThumbnail = ({ album }) => {
  const [redirectToAlbumDetails, setRedirectToAlbumDetails] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState({
    active: false,
    userId: null,
  });

  if (redirectToAlbumDetails) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.groupAlbum.replace(/:id/i, album.id),
        }}
      />
    );
  }

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
              isHeFriend: true,
            },
          },
        }}
      />
    );
  }

  return (
    <Container>
      <MainPhoto
        src={album.mainPhoto !== undefined ? album.mainPhoto : noAlbumPhotoIcon}
        alt={"albumMainPhoto " + album.id}
        onClick={() => setRedirectToAlbumDetails(true)}
      />
      <SharingPerson
        onClick={() => {
          setRedirectToProfile({ active: true, userId: album.albumOwner.id });
        }}
      >
        <ProfilePhoto
          src={
            album.albumOwner.photo !== undefined
              ? album.albumOwner.photo
              : noProfilePictureIcon
          }
        />
        <h3>{album.albumOwner.name + " " + album.albumOwner.surName}</h3>
      </SharingPerson>
      <InfoContainer onClick={() => setRedirectToAlbumDetails(true)}>
        <Text>
          <Header>
            <Title>{album.name}</Title>
            <Localization>
              {album.coordinate.place + ", " + album.coordinate.country.country}
            </Localization>
          </Header>
          <Description>{album.description}</Description>
        </Text>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  position: relative;
`;

const MainPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SharingPerson = styled.div`
  cursor: pointer;
  padding: 5px 25px 5px 0px;
  border-radius: 50px;
  background: rgba(229, 229, 229, 0.8);
  position: absolute;
  max-width: 400px;
  top: 2.5%;
  left: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 34px;
  @media only screen and (max-width: 1635px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 1225px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 1025px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 10px;
    padding-right: 10px;
  }
`;

const ProfilePhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 10px;
  border: 2px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1635px) {
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 1225px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 1025px) {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 510px) {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 0%;
  background: rgba(229, 229, 229, 0.8);
  @media only screen and (max-width: 1200px) {
    height: 110px;
  }
  @media only screen and (max-width: 1010px) {
    height: 100px;
  }
  @media only screen and (max-width: 810px) {
    height: 80px;
  }
  @media only screen and (max-width: 450px) {
    height: 55px;
  }
`;

const Text = styled.div`
  padding: 10px 20px;
  @media only screen and (max-width: 1200px) {
    padding: 10px 15px;
  }
  @media only screen and (max-width: 810px) {
    padding: 10px;
  }
  @media only screen and (max-width: 450px) {
    padding: 5px 10px;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
`;

const Title = styled.h1`
  font-size: 34px;
  display: inline-block;
  margin-right: 10px;
  @media only screen and (max-width: 1200px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 1010px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 810px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 450px) {
    font-size: 14px;
  }
`;

const Localization = styled.h2`
  font-size: 18px;
  margin-right: 0;
  margin-left: auto;
  @media only screen and (max-width: 1200px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 810px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  @media only screen and (max-width: 810px) {
    font-size: 10px;
    margin-top: 5px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 11px;
  }
  @media only screen and (max-width: 450px) {
    -webkit-line-clamp: 2;
    font-size: 9px;
    margin-top: 2.5px;
  }
`;

export default GroupAlbumThumbnail;
