import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./styles/friends.css";
import Input from "../trinkets/Input";
import GroupItem from "./GroupItem";
import GroupMessenger from "./GroupMessenger";
import { endpoints } from "../../miscellanous/url";
import { selectGroupsList, setGroupsList } from "../../redux/userDataSlice";
import { Stomp } from "@stomp/stompjs";

const GroupChat = ({ chatsDisplay }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatUpdate, setChatUpdate] = useState([]);
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [chatBlock, setChatBlock] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);

  const dispatch = useDispatch();
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
    getGroups();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function getGroups() {
    setLoading(true);
    await axios({
      method: "get",
      url: endpoints.getGroups,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setGroupsList(data));
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleSearchBarChange = (e) => {
    setFound(
      groupsList &&
        groupsList.filter((item) =>
          item.groupName.toLowerCase().includes(e.target.value.toLowerCase())
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
            {groupsList !== null ? (
              (groupsList.length !== 0 && searchContent.length === 0
                ? groupsList.map((group) => (
                    <GroupItem
                      key={group.id}
                      group={group}
                      selectedChat={selectedChat}
                      setSelectedChat={setSelectedChat}
                      chatBlock={chatBlock}
                      messageNotifications={messageNotifications}
                      setMessageNotifications={setMessageNotifications}
                    />
                  ))
                : null) ||
              (searchContent.length !== 0 && found.length !== 0
                ? found.map((group) => (
                    <GroupItem
                      key={group.id}
                      group={group}
                      selectedChat={selectedChat}
                      setSelectedChat={setSelectedChat}
                      chatBlock={chatBlock}
                      messageNotifications={messageNotifications}
                      setMessageNotifications={setMessageNotifications}
                    />
                  ))
                : null) || (
                <NoItems style={{ color: "#5b5b5b" }}>Brak grup...</NoItems>
              )
            ) : (
              <NoItems style={{ color: "#5b5b5b" }}>Brak grup...</NoItems>
            )}
          </>
        )}
      </ChatList>
      {selectedChat && !chatBlock && (
        <GroupMessenger
          group={selectedChat}
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
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1000px) {
    font-size: 16px;
  }
`;

export default GroupChat;
