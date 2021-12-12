import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import styled from "styled-components";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

const AlbumThumbnail = ({ album }) => {
  /*   const [redirectToProfile, setRedirectToProfile] = useState({
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
  } */

  const [redirectToAlbum, setRedirectToAlbum] = useState({
    active: false,
    albumId: "",
  });

  // redirection to chosen album
  if (redirectToAlbum.active) {
    return (
      <Redirect
        push
        to={{
          pathname: `album/${redirectToAlbum.albumId}`,
        }}
      />
    );
  }

  return (
    <Container>
      <MainPhoto
        src={album.mainPhoto !== undefined ? album.mainPhoto : noAlbumPhotoIcon}
        onClick={() =>
          setRedirectToAlbum({
            active: true,
            albumId: album.id,
          })
        }
        alt="albumMainPhoto"
      />
      {/*       <Owner
        onClick={() => {
          setRedirectToProfile({
            active: true,
            userId: album.personalInformationDTO.id,
          });
        }}
      >
        <ProfilePhoto
          src={
            album.personalInformationDTO.photo !== undefined
              ? album.personalInformationDTO.photo
              : noProfilePictureIcon
          }
          alt="Profile picture"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noProfilePictureIcon;
          }}
        />
        <h3>
          {album.personalInformationDTO.name +
            " " +
            album.personalInformationDTO.surName}
        </h3>
      </Owner> */}
      <InfoContainer
        onClick={() =>
          setRedirectToAlbum({
            active: true,
            albumId: album.id,
          })
        }
      >
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
  position: relative;
  cursor: pointer;
`;

const MainPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0%;
  background: rgba(229, 229, 229, 0.8);
  height: 120px;
  @media only screen and (max-width: 1400px) {
    height: 100px;
  }
  @media only screen and (max-width: 1100px) {
    height: 75px;
  }
  @media only screen and (max-width: 800px) {
    height: 65px;
  }
  @media only screen and (max-width: 500px) {
    height: 50px;
  }
`;

/* const Owner = styled.div`
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
  font-size: 24px;
  @media only screen and (max-width: 1400px) {
    font-size: 20px;
    max-width: 350px;
  }
  @media only screen and (max-width: 1100px) {
    font-size: 10px;
    padding-right: 10px;
    max-width: 210px;
  }

  @media only screen and (max-width: 800px) {
    font-size: 14px;
    padding-right: 15px;
    max-width: 280px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 10px;
    padding-right: 10px;
    max-width: 200px;
  }
`;

const ProfilePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 5px;
  margin-right: 10px;
  border: 2px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1400px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 1100px) {
    width: 25px;
    height: 25px;
  }

  @media only screen and (max-width: 800px) {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 500px) {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`; */

const Text = styled.div`
  padding: 10px 20px;
  @media only screen and (max-width: 1100px) {
    padding: 5px 10px;
  }
  @media only screen and (max-width: 800px) {
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
  @media only screen and (max-width: 1400px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 1100px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 800px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const Localization = styled.h2`
  font-size: 18px;
  justify-self: end;
  @media only screen and (max-width: 1400px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 800px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const Description = styled.p`
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: 12px;
  @media only screen and (max-width: 1100px) {
    font-size: 10px;
    margin-top: 5px;
  }
  @media only screen and (max-width: 800px) {
  }
  @media only screen and (max-width: 500px) {
    -webkit-line-clamp: 2;
    font-size: 8px;
    margin-top: 2.5px;
  }
`;

export default AlbumThumbnail;
