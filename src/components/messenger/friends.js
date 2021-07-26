import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./friends.css";
import { AiOutlineSearch } from "react-icons/ai";
import FriendItem from "./FriendItem";
import Message from "./Message";
import Close from "../menu/svg/close";
import url from "../../url";

const Friends = ({ friendDisplay }) => {
  
  const [display, setDisplay] = useState(-1);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const path = url + "/friends";
    fetch(path, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("Bearer"),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setFriends(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container className="font">
        <FriendsHeader>
          <FriendsHeaderText>Znajomi</FriendsHeaderText>
          <CloseContainer onClick={(e) => friendDisplay("")}>
            <Close width="25px" height="25px"></Close>
          </CloseContainer>
        </FriendsHeader>
        <SearchContainer>
          <SearchIcon></SearchIcon>
          <SearchInput type="text" placeholder="Szukaj"></SearchInput>
        </SearchContainer>
        <FriendsList className="scroll">
          {friends
            ? friends.map((data) => (
                <div key={data.id}>
                  <FriendItem user={data} click={setDisplay}></FriendItem>
                  {display === data.id ? (
                    <Message user={data} click={setDisplay}></Message>
                  ) : null}
                </div>
              ))
            : null}
        </FriendsList>
      </Container>
    </>
  );
};

const CloseContainer = styled.div`
  left: calc(100% - 50px);
  top: calc(20px);
  position: absolute;
  cursor: pointer;
`;

const FriendsList = styled.div`
  margin-top: 50px;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  overflow-y: scroll; /* Add vertical scrollbar */
  height: calc(100% - 155px);
  width: 98%;
  position: absolute;
`;

const SearchIcon = styled(AiOutlineSearch)`
  color: #8c939c;
  position: relative;
  top: 30.46px;
  left: 41.56px;
  z-index: 1000;
  font-size: 24px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 400px;
  height: 36px;
`;

const Container = styled.div`
  position: fixed;
  width: 420px;
  background-color: #f2f7f2;
  right: 121px;
  top: 0;
  height: 100vh;
  z-index: 800;
  -webkit-box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
  box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
`;

const FriendsHeader = styled.div`
  width: 100%;
  height: 65px;
  background-color: #0fa3b1;
  color: #f2f7f2;
  font-size: 20px;
  font-weight: 700;
`;

const FriendsHeaderText = styled.p`
  width: 100px;
  height: 100%;
  margin: 0;
  position: relative;
  font-size: 30px;
  top: 15px;
  left: 12px;
`;

const SearchInput = styled.input`
  position: relative;
  width: 300px;
  height: 36px;
  top: 21px;
  left: 5px;
  padding-left: 44px;
  background-color: #e0e5e0;
  border: none;
  color: #8c939c;
  border-radius: 30px;
  outline-style: none;
`;

export default Friends;
