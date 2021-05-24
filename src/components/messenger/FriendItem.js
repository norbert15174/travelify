import React from "react";
import styled from "styled-components";
import "./friends.css";
import MessageIcon from "../account/svg/messageIcon";
const FriendItem = () => {
  return (
    <Container className="font">
      <Icon
        src="https://storage.googleapis.com/telephoners/20210216_225118.jpg"
        alt="User Photo"
      />
      <Name>
          Norbert Faron
      </Name>
      <MessageIcon></MessageIcon>
    </Container>
  );
};

const Icon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  margin-left: 16px;
`;

const Container = styled.div`
  margin-bottom: 10px;
  padding-top: 5px;
  width: 377.5px;
  height: 55px;
  padding-bottom: 15px;
  display: grid;
  grid-template-columns: 90px 220px 70px;
  border-radius: 30px;
  margin-left: 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover{
    background-color: #98E1E4;
  }
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
  position: relative;
  top: 18px;

`;

export default FriendItem;
