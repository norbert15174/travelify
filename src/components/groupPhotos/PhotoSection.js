import React from "react";
import styled from "styled-components";
import "./styles/photosScrollbar.css";
import { useSelector } from "react-redux";
import { selectAlbumPhotos } from "../../redux/groupAlbumSlice";

const PhotoSection = ({ setPreview }) => {
  const photos = useSelector(selectAlbumPhotos);

  return (
    <Container>
      <Header>Zdjęcia</Header>
      <Line />
      <PhotoGrid className="scroll">
        {photos.length !== 0 ? (
          photos.map((item) => (
            <PhotoContainer
              key={item.photo.photoId}
              onClick={() => setPreview({ visible: true, index: item.index })}
            >
              <Photo
                src={item.photo.photoUrl}
                alt={"album-photo-" + item.photo.photoId}
              />
            </PhotoContainer>
          ))
        ) : (
          <NoResults>Brak zdjęć w albumie...</NoResults>
        )}
      </PhotoGrid>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  margin-bottom: 15px;
  padding: 20px 30px 30px 30px;
  @media only screen and (max-width: 510px) {
    padding: 10px 20px;
  }
`;

const Header = styled.h1`
  font-size: 34px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1025px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const Line = styled.div`
  border-top: 2px solid ${({ theme }) => theme.color.dark};
`;

const NoResults = styled.h1`
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1140px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 12px;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  margin-top: 35px;
  align-content: start;
  grid-template-columns: repeat(3, 450px);
  grid-gap: 30px;
  max-height: 1000px;
  overflow-y: scroll;
  @media only screen and (max-width: 1635px) {
    grid-template-columns: repeat(3, 385px);
  }
  @media only screen and (max-width: 1435px) {
    grid-template-columns: repeat(3, 320px);
    grid-gap: 25px;
  }
  @media only screen and (max-width: 1225px) {
    grid-template-columns: repeat(3, 255px);
  }
  @media only screen and (max-width: 1025px) {
    grid-gap: 20px;
    margin-top: 25px;
    grid-template-columns: repeat(3, 195px);
  }
  @media only screen and (max-width: 825px) {
    margin-top: 20px;
    grid-template-columns: repeat(3, 130px);
    grid-gap: 15px;
  }
  @media only screen and (max-width: 510px) {
    margin-top: 15px;
    grid-template-columns: repeat(2, 120px);
    grid-gap: 10px;
    max-height: 350px;
  }
`;

const PhotoContainer = styled.div`
  width: 450px;
  height: 450px;
  cursor: pointer;
  border-radius: 5px;
  @media only screen and (max-width: 1635px) {
    width: 385px;
    height: 385px;
  }
  @media only screen and (max-width: 1435px) {
    width: 320px;
    height: 320px;
  }
  @media only screen and (max-width: 1225px) {
    width: 255px;
    height: 255px;
  }
  @media only screen and (max-width: 1025px) {
    width: 195px;
    height: 195px;
  }
  @media only screen and (max-width: 825px) {
    width: 130px;
    height: 130px;
  }
  @media only screen and (max-width: 510px) {
    width: 120px;
    height: 120px;
  }
`;

const Photo = styled.img`
  width: 450px;
  height: 450px;
  object-fit: cover;
  &:hover {
    opacity: 0.9;
  }
  border-radius: 5px;
  @media only screen and (max-width: 1635px) {
    width: 385px;
    height: 385px;
  }
  @media only screen and (max-width: 1435px) {
    width: 320px;
    height: 320px;
  }
  @media only screen and (max-width: 1225px) {
    width: 255px;
    height: 255px;
  }
  @media only screen and (max-width: 1025px) {
    width: 195px;
    height: 195px;
  }
  @media only screen and (max-width: 825px) {
    width: 130px;
    height: 130px;
  }
  @media only screen and (max-width: 510px) {
    width: 120px;
    height: 120px;
  }
`;

export default PhotoSection;
