import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import AlbumThumbnail from "./AlbumThumbnail";
import FriendThumbnail from "./FriendThumbnail";
import Input from "../trinkets/Input";
import "./userScrollbar.css";

const GridSection = ({ userType, data, sectionType }) => {
  // search field content
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);

  // albums are searched by title, friends by name of course
  const handleSearchBarChange = (e) => {
    setFound(
      data.filter((item) => {
        return sectionType === "albums"
          ? item.name.toLowerCase().includes(e.target.value.toLowerCase())
          : (item.name + " " + item.lastName)
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
      })
    );
    setSearchContent(e.target.value);
  };

  return (
    <Container>
      <Header>
        {sectionType === "albums" ? <h1>Albumy</h1> : <h1>Znajomi</h1>}
        <Line />
      </Header>
      <Search
        autoComplete="off"
        name="search"
        id="search"
        type="text"
        search
        placeholder="Szukaj"
        value={searchContent}
        onChange={handleSearchBarChange}
      />
      {sectionType === "albums" ? (
        <AlbumGrid
          squeeze={data.length === 0 ? true : false}
          className="scroll"
        >
          {data !== null ? (
            (searchContent.length !== 0 && found.length !== 0
              ? found.map((album) => {
                  return <AlbumThumbnail key={album.id} album={album} />;
                })
              : null) ||
            (data.length !== 0 && searchContent.length === 0
              ? data.map((album) => {
                  return <AlbumThumbnail key={album.id} album={album} />;
                })
              : null) || <h1 style={{ color: "#5B5B5B" }}>Brak albumów...</h1>
          ) : (
            <h1 style={{ color: "#5B5B5B" }}>Brak albumów...</h1>
          )}
        </AlbumGrid>
      ) : (
        <FriendsGrid className="scroll">
          {data !== null ? (
            (searchContent.length !== 0 && found.length !== 0
              ? found.map((friend) => (
                  <FriendThumbnail
                    key={friend.id}
                    friend={friend}
                    userType={userType}
                  />
                ))
              : null) ||
            (data.length !== 0 && searchContent.length === 0
              ? data.map((friend) => (
                  <FriendThumbnail
                    key={friend.id}
                    friend={friend}
                    userType={userType}
                  />
                ))
              : null) || <h1 style={{ color: "#5B5B5B" }}>Brak znajomych...</h1>
          ) : (
            <h1 style={{ color: "#5B5B5B" }}>Brak znajomych...</h1>
          )}
        </FriendsGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  @media only screen and (max-width: 560px) {
    padding: 15px 20px;
  }
  min-height: 100vh;
`;

const Header = styled.div`
  font-size: 17px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1080px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 8px;
  }
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
`;

const animation = keyframes`
    from {
      width: 25%;
    }
    to {
      width: 50%;
    }
`;

const Search = styled(Input)`
  width: 25%;
  margin: 20px 0 25px 30px;
  &:focus {
    animation: ${animation};
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }
  @media only screen and (max-width: 1080px) {
    margin: 20px 0;
    width: 8%;
  }
  @media only screen and (max-width: 830px) {
    margin: 15px 0;
    padding: 5px 5px 5px 35px;
    width: 10%;
  }
  @media only screen and (max-width: 720px) {
    width: 11%;
  }
  @media only screen and (max-width: 560px) {
    font-size: 8px;
    background-size: 14px;
  }
`;

const AlbumGrid = styled.div`
  display: grid;
  align-content: start;
  grid-template-columns: repeat(2, 550px);
  //grid-auto-rows: 370px;
  grid-auto-rows: ${({ squeeze }) => (!squeeze ? "370px" : "auto")};
  grid-gap: 30px;
  margin-left: 30px;
  max-height: 1000px;
  overflow-y: scroll;
  @media only screen and (max-width: 1440px) {
    grid-template-columns: repeat(2, 380px);
    grid-auto-rows: 256px;
  }
  @media only screen and (max-width: 1080px) {
    grid-template-columns: 520px;
    grid-auto-rows: 350px;
    grid-gap: 20px;
    margin-left: 0px;
    font-size: 16px;
  }
  @media only screen and (max-width: 830px) {
    grid-auto-rows: 317px;
    grid-template-columns: 470px;
  }
  @media only screen and (max-width: 735px) {
    grid-template-columns: 420px;
    grid-auto-rows: 282px;
  }
  @media only screen and (max-width: 560px) {
    grid-template-columns: 290px;
    grid-auto-rows: 196px;
    h1 {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 410px) {
    grid-template-columns: 240px;
    grid-auto-rows: 163px;
  }
`;

const FriendsGrid = styled.div`
  display: grid;
  align-content: start;
  grid-template-columns: repeat(2, 550px);
  grid-gap: 30px;
  margin-left: 30px;
  max-height: 750px;
  overflow-y: scroll;
  h1 {
    color: ${({ theme }) => theme.color.greyFont};
  }
  @media only screen and (max-width: 1440px) {
    grid-template-columns: repeat(2, 380px);
  }
  @media only screen and (max-width: 1080px) {
    margin-left: 0px;
    grid-template-columns: repeat(2, 250px);
    grid-gap: 20px;
    h1 {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 830px) {
    grid-template-columns: repeat(2, 230px);
  }
  @media only screen and (max-width: 735px) {
    grid-template-columns: repeat(2, 205px);
    grid-gap: 15px;
  }
  @media only screen and (max-width: 560px) {
    grid-template-columns: 97%;
    grid-auto-rows: auto;
    grid-gap: 10px;
    h1 {
      font-size: 12px;
    }
  }
`;

export default GridSection;
