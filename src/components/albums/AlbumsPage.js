/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck

import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { albumTypes } from "../../miscellanous/Utils";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";
import AlbumSearch from "../trinkets/DropdownSearch";
import publicAlbumIcon from "./assets/publicAlbumIcon.svg";
import privateAlbumIcon from "./assets/privateAlbumIcon.svg";
import sharedAlbumIcon from "./assets/sharedAlbumIcon.svg";
import AlbumsGrid from "./AlbumsGrid";

const AlbumsPage = ({ privateAlbums, publicAlbums, sharedAlbums }) => {
  const [selectedType, setSelectedType] = useState(albumTypes.public);
  const [searchList, setSearchList] = useState(null);
  const [albumIdSearch, setAlbumIdSearch] = useState(null);
  const blurState = useSelector((state) => state.blur.value);

  useEffect(() => {
    if (!searchList) {
      mapAlbumsToSearchCallback();
    }
  }, []);

  const mapAlbumsToSearchCallback = useCallback(() => {
    mapAlbumsToSearch();
  }, [privateAlbums, publicAlbums, sharedAlbums]);

  const mapAlbumsToSearch = () => {
    let searchList = {
      public: [],
      private: [],
      shared: [],
    };
    for (let i = 0; i < privateAlbums.length; i++) {
      searchList.private.push({
        value: privateAlbums[i].name,
        label: privateAlbums[i].name,
        mainPhoto:
          privateAlbums[i].mainPhoto !== undefined
            ? privateAlbums[i].mainPhoto
            : noAlbumPhotoIcon,
        place:
          privateAlbums[i].coordinate.place +
          ", " +
          privateAlbums[i].coordinate.country.country,
        id: privateAlbums[i].id,
      });
    }
    for (let i = 0; i < publicAlbums.length; i++) {
      searchList.public.push({
        value: publicAlbums[i].name,
        label: publicAlbums[i].name,
        mainPhoto:
          publicAlbums[i].mainPhoto !== undefined
            ? publicAlbums[i].mainPhoto
            : noAlbumPhotoIcon,
        place:
          publicAlbums[i].coordinate.place +
          ", " +
          publicAlbums[i].coordinate.country.country,
        id: publicAlbums[i].id,
      });
    }
    for (let i = 0; i < sharedAlbums.length; i++) {
      searchList.shared.push({
        value: sharedAlbums[i].album.name,
        label: sharedAlbums[i].album.name,
        owner: sharedAlbums[i].owner,
        mainPhoto:
          sharedAlbums[i].album.mainPhoto !== undefined
            ? sharedAlbums[i].album.mainPhoto
            : noAlbumPhotoIcon,
        place:
          sharedAlbums[i].album.coordinate.place +
          ", " +
          sharedAlbums[i].album.coordinate.country.country,
        id: sharedAlbums[i].album.id,
      });
    }
    setSearchList(searchList);
  };

  if (albumIdSearch) {
    return (
      <Redirect
        push
        to={{
          pathname: `album/${albumIdSearch}`,
        }}
      />
    );
  }

  return (
    <Container blurState={blurState}>
      <PageHeader>
        <Heading>Twoje albumy</Heading>
      </PageHeader>
      <AlbumsNavigation>
        <AlbumSearch
          searchType="albums"
          options={
            searchList !== null
              ? selectedType === "public"
                ? searchList["public"]
                : selectedType === "private"
                ? searchList["private"]
                : searchList["shared"]
              : null
          }
          setState={setAlbumIdSearch}
          value={albumIdSearch}
        />
        <Line />
        <AlbumsSwitch>
          <AlbumOption
            icon={publicAlbumIcon}
            active={selectedType === albumTypes.public ? true : false}
            onClick={() => setSelectedType(albumTypes.public)}
          >
            Publiczne
          </AlbumOption>
          <AlbumOption
            icon={privateAlbumIcon}
            active={selectedType === albumTypes.private ? true : false}
            onClick={() => setSelectedType(albumTypes.private)}
          >
            Prywatne
          </AlbumOption>
          <AlbumOption
            icon={sharedAlbumIcon}
            active={selectedType === albumTypes.shared ? true : false}
            onClick={() => setSelectedType(albumTypes.shared)}
          >
            Udostępnione
          </AlbumOption>
        </AlbumsSwitch>
      </AlbumsNavigation>
      <AlbumsGrid
        sectionType={selectedType}
        privateAlbums={privateAlbums}
        publicAlbums={publicAlbums}
        sharedAlbums={sharedAlbums}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-row-gap: 15px;
  width: 1500px;
  margin: 0 auto;
  @media only screen and (max-width: 1635px) {
    width: 1300px;
  }
  @media only screen and (max-width: 1425px) {
    width: 1100px;
  }
  @media only screen and (max-width: 1225px) {
    width: 900px;
  }
  @media only screen and (max-width: 1025px) {
    width: 700px;
  }
  @media only screen and (max-width: 825px) {
    width: 500px;
  }
  @media only screen and (max-width: 510px) {
    width: 300px;
  }
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
`;

const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  height: 80px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  @media only screen and (max-width: 870px) {
    height: 70px;
  }
  @media only screen and (max-width: 735px) {
    height: 60px;
  }
  @media only screen and (max-width: 510px) {
    height: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 54px;
  margin: auto auto auto 25px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 825px) {
    font-size: 46px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 24px;
    margin-left: 15px;
  }
`;

const AlbumsNavigation = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Line = styled.div`
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  width: 60%;
  margin: 25px auto 0 auto;
  @media only screen and (max-width: 1430px) {
    width: 70%;
  }
  @media only screen and (max-width: 1220px) {
    width: 85%;
  }
  @media only screen and (max-width: 825px) {
    width: 80%;
  }
  @media only screen and (max-width: 510px) {
    width: 85%;
  }
`;

const AlbumsSwitch = styled.div`
  margin: 25px auto 30px auto;
  font-size: 24px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 5vw;
  @media only screen and (max-width: 1025px) {
    font-size: 18px;
    grid-column-gap: 2.5vw;
  }
  @media only screen and (max-width: 825px) {
    font-size: 14px;
    grid-column-gap: 1vw;
  }
  @media only screen and (max-width: 510px) {
    margin: 20px auto;
    grid-column-gap: 0.75vw;
    font-size: 10px;
  }
`;

const AlbumOption = styled.div`
  background: ${({ active }) => (active ? "rgba(18, 191, 206, 0.4)" : "")};
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border-radius: 15px;
  text-align: center;
  padding: 10px 20px 10px 80px;
  background-image: url(${({ icon }) => icon});
  background-size: 34px;
  background-position: 10% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  @media only screen and (max-width: 825px) {
    background-size: 28px;
    padding: 10px 10px 10px 45px;
  }
  @media only screen and (max-width: 510px) {
    background-size: 22px;
    padding: 10px 10px 10px 35px;
  }
`;

export default AlbumsPage;
