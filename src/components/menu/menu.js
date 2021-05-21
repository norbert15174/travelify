import React, { useState } from "react";
import styled from "styled-components";
import Message from "./svg/message";
import MessagePanel from "./svg/messagePanel";
import LogOut from "./svg/logOut";
import User from "./user";
const Menu = () => {
  return (
    <Container>
      <ProfileContainer>
        <User />
      </ProfileContainer>
      <MessageContainer>
        <MessagePanel />
      </MessageContainer>

      <LogOutContainer>
        <LogOut />
      </LogOutContainer>
    </Container>
  );
};

const MessageContainer = styled.div`
  transform: scale(0.8);
  width: 105px;
  height: 105px;
  margin-left: 9px;
  position: relative;
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
  transition: transform 1s;
  top: 0;
  right: 0;
  transform: translateX(calc(30vw - 120px));
  &:hover {
    transform: translateX(0);
  }
`;

export default Menu;
