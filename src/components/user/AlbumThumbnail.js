import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";
import { routes } from "../../miscellanous/Routes";

const AlbumThumbnail = ({ album }) => {
  const [redirectToAlbumDetails, setRedirectToAlbumDetails] = useState(false);

  if (redirectToAlbumDetails) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.album.replace(/:id/i, album.id),
        }}
      />
    );
  }

  return (
    <Container onClick={() => setRedirectToAlbumDetails(true)}>
      <MainPhoto
        src={album.mainPhoto !== undefined ? album.mainPhoto : noAlbumPhotoIcon}
        alt="albumMainPhoto"
      />
      <InfoContainer>
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

const InfoContainer = styled.div`
  width: 100%;
  height: 140px;
  position: absolute;
  bottom: 0%;
  background: rgba(229, 229, 229, 0.8);
  @media only screen and (max-width: 1440px) {
    height: 120px;
  }
  @media only screen and (max-width: 1080px) {
    height: 100px;
  }
  @media only screen and (max-width: 830px) {
    height: 80px;
  }
  @media only screen and (max-width: 560px) {
    height: 50px;
  }
`;

const Text = styled.div`
  padding: 10px 20px;
  @media only screen and (max-width: 1440px) {
    padding: 10px 15px;
  }
  @media only screen and (max-width: 560px) {
    padding: 5px 10px;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  display: inline-block;
  margin-right: 10px;
  @media only screen and (max-width: 1440px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 1080px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 830px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 410px) {
    font-size: 12px;
  }
`;

const Localization = styled.h2`
  font-size: 18px;
  margin-right: 0;
  margin-left: auto;
  @media only screen and (max-width: 1440px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 830px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
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
  @media only screen and (max-width: 830px) {
    font-size: 10px;
    margin-top: 5px;
  }
  @media only screen and (max-width: 560px) {
    -webkit-line-clamp: 2;
    font-size: 8px;
    margin-top: 2.5px;
  }
`;

export default AlbumThumbnail;
