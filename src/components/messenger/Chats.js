import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./styles/friends.css";
import Input from "../trinkets/Input";
import ChatItem from "./ChatItem";
import Messenger from "./Messenger";
import closeIcon from "./assets/closeIcon.svg";
import groupsIcon from "./assets/groupsIcon.svg";
import userIcon from "./assets/userIcon.svg";
import Toggle from "../trinkets/Toggle";
import Tooltip from "../trinkets/Tooltip";
import { endpoints } from "../../url";
import { theme } from "../../miscellanous/GlobalTheme";
import {
  selectFriendsList,
  selectGroupsList,
  setFriendsList,
  setGroupsList,
} from "../../redux/userDataSlice";
import { Stomp } from "@stomp/stompjs";

const chatTypes = {
  friend: "friend",
  group: "group",
};

const Chats = ({ chatsDisplay }) => {
  const [type, setType] = useState(chatTypes.friend);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatUpdate, setChatUpdate] = useState([]);
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [chatBlock, setChatBlock] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);

  const dispatch = useDispatch();
  const blurState = useSelector((state) => state.blur.value);
  const friendsList = useSelector(selectFriendsList);
  const groupsList = useSelector(selectGroupsList);

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
    if (type === chatTypes.friend) {
      getFriends();
    } else if (type === chatTypes.group) {
      getGroups();
    }
  }, [type]);

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
        setError(error);
      });
  }

  async function getGroups() {
    setLoading(true);
    console.log("Groups fetched");
    dispatch(setGroupsList(null));
    setLoading(false);
  }

  const handleSearchBarChange = (e) => {
    setSearchContent(e.target.value);
    if (type === chatTypes.friend) {
      setFound(
        friendsList &&
          friendsList.filter(
            (item) =>
              item.name.toLowerCase().includes(searchContent.toLowerCase()) ||
              item.lastName
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
              (item.name + " " + item.lastName)
                .toLowerCase()
                .includes(searchContent.toLowerCase())
          )
      );
    } else if (type === chatTypes.group) {
      setFound(
        groupsList &&
          groupsList.filter(
            (item) =>
              item.name.toLowerCase().includes(searchContent.toLowerCase()) ||
              item.lastName
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
              (item.name + " " + item.lastName)
                .toLowerCase()
                .includes(searchContent.toLowerCase())
          )
      );
    }
  };

  return (
    <Container blurState={blurState} className="font">
      <Header>
        <Heading>Komunikator</Heading>
        <CloseButton
          icon={closeIcon}
          onClick={(e) => {
            chatsDisplay("");
          }}
        />
      </Header>
      <ToggleContainer>
        <OptionContainer
          data-tip
          data-for="friendChats"
          active={type === chatTypes.friend ? true : false}
          icon={userIcon}
        />
        <Tooltip id="friendChats" place="bottom" text="Czaty ze znajomymi" />
        <Toggle
          value={type}
          setValue={setType}
          first={chatTypes.friend}
          second={chatTypes.group}
        />
        <OptionContainer
          data-tip
          data-for="groupChats"
          active={type === chatTypes.group ? true : false}
          icon={groupsIcon}
        />
        <Tooltip id="groupChats" place="bottom" text="Czaty grupowe" />
      </ToggleContainer>
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
        {loading === true && error ? null : type === chatTypes.friend ? (
          <>
            {friendsList !== null ? (
              (friendsList.length !== 0 && searchContent.length === 0
                ? friendsList.map((friend) => (
                    <ChatItem
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
                    <ChatItem
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
                <NoItems style={{ color: theme.color.greyFont }}>
                  Brak znajomych...
                </NoItems>
              )
            ) : (
              <NoItems style={{ color: theme.color.greyFont }}>Brak znajomych...</NoItems>
            )}
          </>
        ) : (
          <>
            {groupsList !== null ? (
              (groupsList.length !== 0 && searchContent.length === 0
                ? groupsList.map((friend) => (
                    <ChatItem
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
                    <ChatItem
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
                <NoItems style={{ color: theme.color.greyFont }}>Brak grup...</NoItems>
              )
            ) : (
              <NoItems style={{ color: theme.color.greyFont }}>Brak grup...</NoItems>
            )}
          </>
        )}
      </ChatList>
      {selectedChat && !chatBlock && (
        <Messenger
          user={selectedChat}
          chatUpdate={chatUpdate}
          setChatUpdate={setChatUpdate}
          closeMessenger={setSelectedChat}
          chatsDisplay={chatsDisplay}
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
  background-color: ${({ theme }) => theme.color.lightBackground};
  right: 91px;
  top: 0;
  height: 100vh;
  z-index: 800;
  -webkit-box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
  box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
  @media only screen and (max-width: 1000px) {
    width: 300px;
  }
  @media only screen and (max-width: 720px) {
    width: calc(100vw - 90px);
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

const Header = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 1000px) {
    height: 55px;
  }
`;

const Heading = styled.p`
  margin-left: 12px;
  font-size: 30px;
  color: ${({ theme }) => theme.color.lightBackground};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media only screen and (max-width: 1000px) {
    font-size: 20px;
  }
`;

const CloseButton = styled.div`
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

const ToggleContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 80px max-content;
  justify-content: center;
  align-content: center;
  margin: 25px 15px 0px 0px;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: max-content 60px max-content;
  }
`;

const OptionContainer = styled.div`
  background: ${({ active }) => (active ? "rgba(18, 191, 206, 0.4)" : "")};
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  text-align: center;
  border-radius: 15px;
  width: 30px;
  height: 30px;
  padding: 5px 25px;
  margin: auto 25px;
  background-image: url(${({ icon }) => icon});
  background-size: 40%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  @media only screen and (max-width: 1000px) {
    width: 20px;
    height: 20px;
    padding: 5px 20px;
    margin: auto 25px;
  }
`;

const ChatList = styled.div`
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
  color: ${({theme}) => theme.color.greyFont};
  @media only screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;

export default Chats;
