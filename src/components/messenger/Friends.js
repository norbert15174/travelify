import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./styles/friends.css";
import Input from "../trinkets/Input";
import FriendItem from "./FriendItem";
import Message from "./Message";
import closeIcon from "./assets/closeIcon.svg";
import { endpoints } from "../../url";
import { theme } from "../../miscellanous/GlobalTheme";
import { selectFriendsList, setFriendsList } from "../../redux/userDataSlice";
import { Stomp } from "@stomp/stompjs";

const Friends = ({ friendDisplay }) => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessages, setNewMessages] = useState([]);
  const [chatBlock, setChatBlock] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);

  const dispatch = useDispatch();
  const blurState = useSelector((state) => state.blur.value);
  const friendsList = useSelector(selectFriendsList);

  useEffect(() => {
    getFriends();
    window.addEventListener("resize", chatBlockHandler);
    if (window.innerWidth < 720) {
      setChatBlock(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // when you remove friend when contacting him, this happens
    if (selectedFriend) {
      if (
        friendsList.find((item) => item.id === selectedFriend.id) === undefined
      ) {
        setSelectedFriend(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendsList]);

  useEffect(() => {}, [newMessages]);


  /*
    websocket connection
  */
  useEffect(() => {
    var client = Stomp.client("ws://localhost:8020/chat");
    let userId = sessionStorage.getItem("loggedUserId");
    client.connect({}, function () {
      client.subscribe("/topic/" + userId, function (message) {
        var friendId = JSON.parse(message.body).friendId;
        setNewMessages((prevState) => new Set([...prevState, friendId]));
      });
    });
  }, []);

  function chatBlockHandler(e) {
    if (!chatBlock && window.innerWidth < 720) {
      setSelectedFriend(null);
      setChatBlock(true);
    } else if (window.innerWidth >= 720) {
      setChatBlock(false);
    }
  }

  async function getFriends() {
    axios({
      url: endpoints.getLoggedUserFriends,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setFriendsList(data));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }

  const handleSearchBarChange = (e) => {
    setSearchContent(e.target.value);
    setFound(
      friendsList.filter(
        (item) =>
          item.name.toLowerCase().includes(searchContent.toLowerCase()) ||
          item.lastName.toLowerCase().includes(searchContent.toLowerCase()) ||
          (item.name + " " + item.lastName)
            .toLowerCase()
            .includes(searchContent.toLowerCase())
      )
    );
  };

  return (
    <Container blurState={blurState} className="font">
      <FriendsHeader>
        <FriendsHeaderText>Znajomi</FriendsHeaderText>
        <CloseContainer
          icon={closeIcon}
          onClick={(e) => {
            friendDisplay("");
          }}
        />
      </FriendsHeader>
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
      <FriendsList className="scroll">
        {loading === true ? null : <>
          {friendsList !== null && !error ? (
          (friendsList.length !== 0 && searchContent.length === 0
            ? friendsList.map((friend) => (
                <FriendItem
                  key={friend.id}
                  user={friend}
                  selectFriend={setSelectedFriend}
                  chatBlock={chatBlock}
                  newMessages={newMessages}
                  setNewMessages={setNewMessages}
                />
              ))
            : null) ||
          (searchContent.length !== 0 && found.length !== 0
            ? found.map((friend) => (
                <FriendItem
                  key={friend.id}
                  user={friend}
                  selectFriend={setSelectedFriend}
                  chatBlock={chatBlock}
                  newMessages={newMessages}
                  setNewMessages={setNewMessages}
                />
              ))
            : null) || (
            <h1 style={{ color: theme.color.greyFont }}>Brak znajomych...</h1>
          )
        ) : (
          <h1 style={{ color: theme.color.greyFont }}>Brak znajomych</h1>
        )}
        </>}

      </FriendsList>
      {selectedFriend && !chatBlock && (
        <Message
          user={selectedFriend}
          closeMessenger={setSelectedFriend}
          friendDisplay={friendDisplay}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  position: fixed;
  width: 425px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.lightBackground};
  right: 121px;
  top: 0;
  height: 100vh;
  z-index: 800;
  -webkit-box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
  box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
  @media only screen and (max-width: 1000px) {
    width: 300px;
  }
  @media only screen and (max-width: 720px) {
    width: calc(100vw - 120px);
  }
  @media only screen and (max-width: 720px) and (max-height: 720px) {
    width: calc(100vw - 100px);
  }
  @media only screen and (max-height: 720px) {
    right: 101px;
  }
  @media only screen and (max-width: 720px) and (max-height: 640px) {
    width: calc(100vw - 90px);
  }
  @media only screen and (max-height: 640px) {
    right: 91px;
  }
  @media only screen and (max-width: 720px) and (max-height: 560px) {
    width: calc(100vw - 80px);
  }
  @media only screen and (max-height: 560px) {
    right: 81px;
  }
  @media only screen and (max-width: 720px) and (max-height: 480px) {
    width: calc(100vw - 70px);
  }
  @media only screen and (max-height: 480px) {
    right: 71px;
  }
  @media only screen and (max-width: 720px) and (max-height: 400px) {
    width: calc(100vw - 60px);
  }
  @media only screen and (max-height: 400px) {
    right: 61px;
  }
`;

const FriendsHeader = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.color.darkTurquise};
  @media only screen and (max-width: 1000px) {
    height: 55px;
  }
`;

const FriendsHeaderText = styled.p`
  margin-left: 12px;
  font-size: 30px;
  color: ${({ theme }) => theme.color.lightBackground};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media only screen and (max-width: 1000px) {
    font-size: 20px;
  }
`;

const CloseContainer = styled.div`
  margin: 0 12px 0 auto;
  cursor: pointer;
  background-image: url(${({ icon }) => icon});
  width: 25px;
  height: 25px;
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  @media only screen and (max-width: 1000px) {
    width: 15px;
    height: 15px;
    background-size: 15px;
  }
  @media only screen and (max-width: 720px) {
    margin: 0 30px 0 auto;
  }
`;

const FriendsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  overflow-y: scroll; /* Add vertical scrollbar */
  height: 80%;
  max-height: 100vh;
  margin: 0px 20px 20px 20px;
  @media only screen and (max-width: 1000px) {
    margin: 0px 10px 10px 10px;
  }
`;

const Search = styled(Input)`
  width: 75%;
  margin: 20px auto;
  font-size: 16px;
  @media only screen and (max-width: 1000px) {
    margin: 10px auto;
    font-size: 12px;
  }
`;

export default Friends;
