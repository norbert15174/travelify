import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import closeIcon from "./assets/closeIcon.svg";
import Input from "../trinkets/Input";
import FriendThumbnail from "./ShareFriendThumbnail";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlur } from "../../redux/blurSlice";
import { selectFriendsList } from "../../redux/albumDetailsSlice";
import "./albumsScrollbar.css";

// Box for sharing and pinning friends

const ShareBox = ({ setClose, albumId }) => {
  // search field content
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);

  const ref = useRef(null);

  const dispatch = useDispatch();
  const blurState = useSelector((state) => state.blur.value);
  const friendsList = useSelector(selectFriendsList);

  useEffect(() => {
    document.addEventListener("click", boxOutsideClick, true);
    document.body.style.overflow = "hidden";
    if (!blurState) {
      dispatch(toggleBlur());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function boxOutsideClick(e) {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
  }

  // albums are searched by title, friends by name of course
  const handleSearchBarChange = (e) => {
    setSearchContent(e.target.value);
    setFound(
      friendsList.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchContent.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchContent.toLowerCase()) ||
          (item.name + " " + item.lastName)
            .toLowerCase()
            .includes(searchContent.toLowerCase())
        );
      })
    );
  };

  return (
    <Container>
      <Box ref={ref}>
        <Header>
          <Heading>Udostępnij</Heading>
          <CloseButton
            src={closeIcon}
            onClick={() => {
              setClose(false);
              document.removeEventListener("click", boxOutsideClick, true);
              document.body.style.overflow = "";
              dispatch(toggleBlur());
            }}
          />
        </Header>
        <Search
          search
          autoComplete="off"
          name="search"
          id="search"
          type="text"
          placeholder="Szukaj"
          value={searchContent}
          onChange={handleSearchBarChange}
        />
        <List className="scroll">
          {(searchContent.length !== 0 && found.length !== 0
            ? found.map((friend) => (
                <FriendThumbnail
                  albumId={albumId}
                  key={friend.id}
                  friend={friend}
                />
              ))
            : null) ||
            (friendsList.length !== 0 && searchContent.length === 0
              ? friendsList.map((friend) => (
                  <FriendThumbnail
                    albumId={albumId}
                    key={friend.id}
                    friend={friend}
                  />
                ))
              : null) || <NoResults>Brak wyników...</NoResults>}
        </List>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 120px); // 120px - menu bar
  z-index: 10000;
  @media only screen and (max-width: 720px) {
    width: 100%; // menu bar ignored
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 46.8%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.color.lightBackground};
  width: 35%;
  height: 75%;
  border: 5px solid ${({ theme }) => theme.color.dark};
  box-shadow: 5px 5px 10px 0 ${({ theme }) => theme.color.greyFont};
  padding-bottom: 25px;
  @media only screen and (max-width: 1140px) {
    height: 60%;
    width: 45%;
    left: 45%;
    padding-bottom: 15px;
  }
  @media only screen and (max-width: 1025px) {
    left: 43%;
  }
  @media only screen and (max-width: 720px) {
    height: 40%;
    left: 50%;
  }
  @media only screen and (max-width: 540px) {
    padding-bottom: 10px;
    height: 300px;
    min-height: 300px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.color.dark};
  height: 60px;
  padding: 0px;
  min-height: 60px;
  @media only screen and (max-width: 720px) {
    height: 40px;
    min-height: 40px;
  }
  @media only screen and (max-width: 540px) {
    height: 25px;
    min-height: 25px;
  }
`;

const Heading = styled.h1`
  font-size: 40px;
  margin: 0 auto;
  color: ${({ theme }) => theme.color.lightBackground};
  @media only screen and (max-width: 1140px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 720px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 16px;
  } ;
`;

const CloseButton = styled.img`
  position: absolute;
  width: 32px;
  height: 32px;
  right: 0;
  margin-right: 15px;
  cursor: pointer;
  @media only screen and (max-width: 1140px) {
    width: 22px;
    height: 22px;
  }
  @media only screen and (max-width: 720px) {
    width: 12px;
    height: 12px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 540px) {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
`;

const Search = styled(Input)`
  margin: 10px 10px 0px 10px;
  @media only screen and (max-width: 1140px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 540px) {
    background-size: 8px;
    padding: 5px 10px 5px 25px;
    font-size: 8px;
  }
`;

const List = styled.div`
  display: grid;
  grid-auto-rows: auto;
  margin: 25px 5px 0px 15px;
  grid-row-gap: 20px;
  overflow-y: scroll;
  @media only screen and (max-width: 720px) {
    margin: 20px 5px 0px 10px;
  }
  @media only screen and (max-width: 540px) {
    margin: 15px 5px 0px 10px;
    grid-row-gap: 10px;
  }
`;

const NoResults = styled.h1`
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1140px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 12px;
  }
`;

export default ShareBox;
