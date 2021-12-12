import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import searchAlbumIcon from "./assets/searchAlbumIcon.svg";
import searchPeopleIcon from "./assets/searchPeopleIcon.svg";
import "./searchScrollbar.css";
import AlbumSearch from "./AlbumSearch";
import PeopleSearch from "./PeopleSearch";

const types = {
  albums: "albums",
  people: "people",
};

const SearchPage = () => {
  const [searchType, setSearchType] = useState(types.albums);
  const blurState = useSelector((state) => state.blur.value);

  return (
    <Container blurState={blurState}>
      <Header>
        <Heading>Wyszukiwarka</Heading>
      </Header>
      <SearchNavigation>
        <SearchSwitch>
          <SearchOption
            icon={searchAlbumIcon}
            active={searchType === types.albums ? true : false}
            onClick={() => {
              setSearchType(types.albums);
            }}
          >
            Albumy
          </SearchOption>
          <SearchOption
            icon={searchPeopleIcon}
            active={searchType === types.people ? true : false}
            onClick={() => {
              setSearchType(types.people);
            }}
          >
            Osoby
          </SearchOption>
        </SearchSwitch>
        {searchType === types.albums && <AlbumSearch />}
        {searchType === types.people && <PeopleSearch />}
      </SearchNavigation>
    </Container>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1400px) {
    width: 900px;
  }
  @media only screen and (max-width: 1100px) {
    width: 600px;
  }
  @media only screen and (max-width: 800px) {
    width: 400px;
  }
  @media only screen and (max-width: 500px) {
    width: 300px;
  }
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  height: 80px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  margin-bottom: 15px;
  align-items: center;
  @media only screen and (max-width: 1100px) {
    height: 70px;
  }
  @media only screen and (max-width: 800px) {
    height: 60px;
  }
  @media only screen and (max-width: 500px) {
    height: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 54px;
  margin: auto auto auto 25px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1100px) {
    font-size: 46px;
  }
  @media only screen and (max-width: 800px) {
    font-size: 40px;
    margin: auto auto auto 15px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 24px;
    margin-left: 15px;
  }
`;

const SearchNavigation = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const SearchSwitch = styled.div`
  margin: 25px auto;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-column-gap: 5vw;
  @media only screen and (max-width: 800px) {
    margin: 20px auto;
  }
`;

const SearchOption = styled.div`
  background: ${({ active }) => (active ? "rgba(18, 191, 206, 0.4)" : "")};
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border-radius: 15px;
  text-align: center;
  font-size: 24px;
  padding: 10px 20px 10px 80px;
  background-image: url(${({ icon }) => icon});
  background-size: 34px;
  background-position: 10% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  @media only screen and (max-width: 800px) {
    font-size: 16px;
    background-size: 24px;
    padding: 10px 10px 10px 50px;
  }
`;

export default SearchPage;
