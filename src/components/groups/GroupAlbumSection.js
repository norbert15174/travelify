import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Redirect } from "react-router-dom";
import Input from "../trinkets/Input";
import Button from "../trinkets/Button";
import { routes } from "../../miscellanous/Routes";
import { albumCreator } from "../../miscellanous/Utils";
import GroupAlbumThumbnail from "./GroupAlbumThumbnail";
import addGroupIcon from "./assets/addGroupIcon.svg";
import "./groupsScrollbar.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGroupAlbums,
  setGroupAlbums,
} from "../../redux/groupDetailsSlice";
import axios from "axios";
import { endpoints } from "../../miscellanous/url";

const GroupAlbumSection = ({ groupId }) => {
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);
  const [redirectToCreator, setRedirectToCreator] = useState(false);
  const groupAlbums = useSelector(selectGroupAlbums);
  const dispatch = useDispatch();

  useEffect(() => {
    getGroupAlbums();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGroupAlbums() {
    await axios({
      method: "get",
      url: endpoints.getGroupAlbums.replace(/:groupId/i, groupId),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setGroupAlbums(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSearchBarChange = (e) => {
    setFound(
      groupAlbums.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setSearchContent(e.target.value);
  };

  // redirection to album creator (CREATION)
  if (redirectToCreator) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.groupAlbumCreator,
          state: { creatorType: albumCreator.creation, groupId: groupId },
        }}
      />
    );
  }

  return (
    <Container>
      <Header>
        <InnerHeader>
          <h1>Albumy grupowe</h1>
          <AddButton onClick={() => setRedirectToCreator(true)}>
            Stwórz album
          </AddButton>
        </InnerHeader>
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
      <AlbumsGrid className="scroll">
        {groupAlbums.length > 0 ? (
          (searchContent.length !== 0 && found.length !== 0
            ? found.map((item) => <GroupAlbumThumbnail key={item.id} album={item} />)
            : null) ||
          (groupAlbums.length !== 0 && searchContent.length === 0
            ? groupAlbums.map((item) => <GroupAlbumThumbnail key={item.id} album={item} />)
            : null) || <h1 style={{ color: "#5B5B5B" }}>Brak albumów...</h1>
        ) : (
          <h1 style={{ color: "#5B5B5B" }}>Brak albumów...</h1>
        )}
      </AlbumsGrid>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  margin-bottom: 15px;
  @media only screen and (max-width: 550px) {
    padding: 15px 20px;
  }
`;

const InnerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.color.greyFont};
  h1 {
    font-size: 34px;
  }
  @media only screen and (max-width: 810px) {
    h1 {
      font-size: 27px;
    }
  }
  @media only screen and (max-width: 550px) {
    h1 {
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 18px;
    }
  }
`;

const AddButton = styled(Button)`
  margin: 0 0 0 auto;
  border-radius: 5px;
  width: 200px;
  font-size: 24px;
  background-image: url(${addGroupIcon});
  background-repeat: no-repeat;
  background-position: 90% 50%;
  background-size: 20px;
  padding-right: 30px;
  @media only screen and (max-width: 1225px) {
    font-size: 18px;
    background-size: 15px;
    padding-right: 15px;
    width: 150px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 12px;
    background-size: 10px;
    width: 100px;
    height: 30px;
  }
  @media only screen and (max-width: 510px) {
    height: 20px;
    width: 80px;
    font-size: 8px;
  }
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 810px) {
    margin-top: 5px;
  }
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
  margin: 20px 0 0 0;
  &:focus {
    animation: ${animation};
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }
  @media only screen and (max-width: 810px) {
    padding: 10px 20px 10px 30px;
    font-size: 12px;
    margin: 15px 0 0 0;
  }
  @media only screen and (max-width: 810px) {
    background-size: 12px;
    padding: 5px 20px 5px 30px;
    margin: 15px 0 0 0;
  }
  @media only screen and (max-width: 810px) {
    padding: 5px 10px 5px 30px;
    font-size: 10px;
    margin: 10px 0 0 0;
  }
`;

const AlbumsGrid = styled.div`
  width: 100%;
  display: grid;
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-template-columns: repeat(2, 48.5%);
  grid-auto-rows: 350px;
  grid-gap: 20px;
  margin-top: 20px;
  @media only screen and (max-width: 1200px) {
    grid-auto-rows: 300px;
  }
  @media only screen and (max-width: 1010px) {
    margin-top: 15px;
    grid-template-columns: repeat(2, 47%);
    grid-auto-rows: 250px;
  }
  @media only screen and (max-width: 810px) {
    grid-gap: 15px;
    grid-auto-rows: 200px;
  }
  @media only screen and (max-width: 600px) {
    grid-template-columns: 98%;
    grid-auto-rows: 250px;
  }
  @media only screen and (max-width: 450px) {
    margin-top: 10px;
    grid-auto-rows: 200px;
    grid-template-columns: 96%;
  }
`;

export default GroupAlbumSection;
