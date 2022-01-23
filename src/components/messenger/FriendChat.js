import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./styles/friends.css";
import Input from "../trinkets/Input";
import FriendItem from "./FriendItem";
import FriendMessenger from "./FriendMessenger";
import { endpoints } from "../../miscellanous/url";
import { selectFriendsList, setFriendsList } from "../../redux/userDataSlice";
import { Stomp } from "@stomp/stompjs";

const FriendChat = ({ chatsDisplay }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatUpdate, setChatUpdate] = useState([]);
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [chatBlock, setChatBlock] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);

  const dispatch = useDispatch();
  const friendsList = useSelector(selectFriendsList);

  useEffect(() => {
    window.addEventListener("resize", chatBlockHandler);
    if (window.innerWidth < 720) {
      setChatBlock(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchContent("");
    setFound([]);
    setSelectedChat(null);
    getFriends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // when you remove friend when contacting him, this happens
    if (selectedChat) {
      if (
        friendsList.find((item) => item.id === selectedChat.id) === undefined
      ) {
        setSelectedChat(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendsList]);

  /*
    DON'T REMOVE IT
  */
  useEffect(() => {}, [messageNotifications, chatUpdate]);

  /*
    websocket connection
  */
  useEffect(() => {
    var client = Stomp.client("ws://localhost:8020/chat");
    let userId = sessionStorage.getItem("loggedUserId");
    client.connect({}, function () {
      client.subscribe("/topic/" + userId, function (message) {
        var friendId = JSON.parse(message.body).friendId;
        setMessageNotifications(
          (prevState) => new Set([...prevState, friendId])
        );
        setChatUpdate((prevState) => new Set([...prevState, friendId]));
      });
    });
    return function cleanup() {
      setMessageNotifications([]);
      setChatUpdate([]);
      client.deactivate();
    };
  }, []);

  function chatBlockHandler(e) {
    if (!chatBlock && window.innerWidth < 720) {
      setSelectedChat(null);
      setChatBlock(true);
    } else if (window.innerWidth >= 720) {
      setChatBlock(false);
    }
  }

  async function getFriends() {
    setLoading(true);
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
        console.error(error);
        setError(error);
      });
  }

  const handleSearchBarChange = (e) => {
    setFound(
      friendsList &&
        friendsList.filter(
          (item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.lastName
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            (item.name + " " + item.lastName)
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
        )
    );
    setSearchContent(e.target.value);
  };

  return (
    <>
      <SearchContainer>
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
      </SearchContainer>
      <ChatList className="scroll">
        {loading === true && error ? null : (
          <>
            {friendsList !== null ? (
              (friendsList.length !== 0 && searchContent.length === 0
                ? friendsList.map((friend) => (
                    <FriendItem
                      key={friend.id}
                      user={friend}
                      selectedChat={selectedChat}
                      setSelectedChat={setSelectedChat}
                      chatBlock={chatBlock}
                      messageNotifications={messageNotifications}
                      setMessageNotifications={setMessageNotifications}
                    />
                  ))
                : null) ||
              (searchContent.length !== 0 && found.length !== 0
                ? found.map((friend) => (
                    <FriendItem
                      key={friend.id}
                      user={friend}
                      selectedChat={selectedChat}
                      setSelectedChat={setSelectedChat}
                      chatBlock={chatBlock}
                      messageNotifications={messageNotifications}
                      setMessageNotifications={setMessageNotifications}
                    />
                  ))
                : null) || (
                <NoItems style={{ color: "#5b5b5b" }}>
                  Brak znajomych...
                </NoItems>
              )
            ) : (
              <NoItems style={{ color: "#5b5b5b" }}>Brak znajomych...</NoItems>
            )}
          </>
        )}
      </ChatList>
      {selectedChat && !chatBlock && (
        <FriendMessenger
          user={selectedChat}
          chatUpdate={chatUpdate}
          setChatUpdate={setChatUpdate}
          closeMessenger={setSelectedChat}
          chatsDisplay={chatsDisplay}
        />
      )}
    </>
  );
};

const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  overflow-y: scroll; /* Add vertical scrollbar */
  height: 75%;
  margin: 0px 20px 20px 20px;
  @media only screen and (max-width: 1000px) {
    margin: 0px 10px 10px 10px;
  }
`;

const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1000px) {
    margin: 10px auto;
  }
`;

const Search = styled(Input)`
  width: 75%;
  font-size: 16px;
  @media only screen and (max-width: 1000px) {
    font-size: 12px;
  }
`;

const NoItems = styled.h1`
  display: inline-block;
  margin: 10px auto;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;

export default FriendChat;
