import React, { useState } from "react";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const MarkerInfo = ({ details, type }) => {
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
          pathname:
            type === "StartPage"
              ? `/albumPreview/${redirectToAlbum.albumId}`
              : type === "UserPage"
              ? `/album/${redirectToAlbum.albumId}`
              : `/groupAlbum/${redirectToAlbum.albumId}`,
        }}
      />
    );
  }

  return (
    <Container>
      <Picture
        src={
          type === "StartPage"
            ? details.personalInformationDTO.photo !== undefined
              ? details.personalInformationDTO.photo
              : noProfilePictureIcon
            : details.mainPhoto !== undefined
            ? details.mainPhoto
            : noProfilePictureIcon
        }
        alt="Picture"
        onError={(e) => {
          e.target.onError = null;
          e.target.src = noProfilePictureIcon;
        }}
      />
      <InnerContainer>
        {type === "StartPage" && (
          <Header>
            {details.personalInformationDTO.name +
              " " +
              details.personalInformationDTO.surName}
          </Header>
        )}
        <Name>{details.name}</Name>
        <Country>
          {details.coordinate.country.country + ", " + details.coordinate.place}
        </Country>
        <Link
          onClick={() =>
            setRedirectToAlbum({ active: true, albumId: details.id })
          }
        >
          Wyświetl album
        </Link>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 153px 1fr;
  padding: 25px 15px;
  @media only screen and (max-width: 1020px) {
    padding: 0px;
    grid-template-columns: 107px 1fr;
  }
  button {
    width: 100px;
    height: 100px;
  }
`;

const Picture = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1020px) {
    width: 105px;
    height: 105px;
    margin: auto;
  }
`;

const InnerContainer = styled.div`
  height: 138px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 28px;
  color: ${({ theme }) => theme.color.dark};
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media only screen and (max-width: 1020px) {
    min-height: 90px;
    font-size: 16px;
    margin-top: 18px;
    margin-left: 15px;
  }
`;

const Header = styled.h2`
  font-size: 36px;
  color: ${({ theme }) => theme.color.dark};
  margin-bottom: 5px;
  @media only screen and (max-width: 1020px) {
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const Name = styled.p`
  font-size: 28px;
  @media only screen and (max-width: 1020px) {
    font-size: 16px;
  }
`;

const Country = styled.p`
  font-size: 16px;
  @media only screen and (max-width: 1020px) {
    font-size: 12px;
  }
`;

const Link = styled.a`
  display: block;
  margin-top: 18px;
  color: ${({ theme }) => theme.color.light};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  @media only screen and (max-width: 1020px) {
    font-size: 16px;
    margin-top: 25px;
    margin-bottom: auto;
  }
`;

export default MarkerInfo;
