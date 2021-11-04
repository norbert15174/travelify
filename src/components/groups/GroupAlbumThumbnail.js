import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";
import { routes } from "../../miscellanous/Routes";

const GroupAlbumThumbnail = ({ album }) => {
  const [redirectToAlbumDetails, setRedirectToAlbumDetails] = useState(false);

  if (redirectToAlbumDetails) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.groupAlbum.replace(/:id/i, 2),
        }}
      />
    );
  }

  return (
    <Container onClick={() => setRedirectToAlbumDetails(true)}>
      <MainPhoto
        src={album.mainPhoto !== undefined ? album.mainPhoto : noAlbumPhotoIcon}
        alt={"albumMainPhoto " + album.id}
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
