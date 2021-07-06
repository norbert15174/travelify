import React, { useState } from "react";
import styled from "styled-components";
import MessagePanel from "./svg/messagePanel";
import LogOut from "./svg/logOut";
import User from "./user";
import Friends from "../messenger/friends";

const Menu = () => {

  const [displayFriends,setDisplayFriends] = useState('no');


  return (
    <>
    <Container>
      <ProfileContainer>
        <User />
      </ProfileContainer>
      <MessageContainer onClick={e => setDisplayFriends(displayFriends === 'yes' ? "no" : "yes")}>
        <MessagePanel />
      </MessageContainer>
      <LogOutContainer>
        <LogOut />
      </LogOutContainer>
    </Container>
    {displayFriends === 'yes' ? <Friends friendDisplay={setDisplayFriends} ></Friends> : null}
    </>
  );
};

const MessageContainer = styled.div`
  transform: scale(0.8);
  width: 105px;
  height: 105px;
  margin-left: 9px;
  position: relative;
  cursor: pointer;
`;
const ProfileContainer = styled.div`
  transform: scale(0.8);
  width: 112px;
  height: 112px;
  position: relative;
  margin-left: 4px;
  margin-top: 20px;
`;

const LogOutContainer = styled.div`
  transform: scale(0.8);
  width: 105px;
  height: 105px;
  margin-left: 9px;
  top: calc(100% - 105px);
  position: absolute;
`;

const Container = styled.div`
  min-height: 600px;
  width: 30vw;
  height: 100vh;
  background-color: #0fa3b1;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(calc(30vw - 120px));
  border-left: solid 1px black;
  z-index: 500;
  box-shadow: -1px 2px 17px -1px rgba(0,0,0,1);
-webkit-box-shadow: -1px 2px 17px -1px rgba(0,0,0,1);
-moz-box-shadow: -1px 2px 17px -1px rgba(0,0,0,1);
`;

export default Menu;
