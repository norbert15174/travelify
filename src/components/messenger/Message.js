import React from "react";
import styled from "styled-components";
import "./friends.css";
import Emoji from "../menu/svg/emoji";
import Send from "../menu/svg/send";
import SingleMessage from "./SingleMessage";

const Message = () => {
  return (
    <Container>
      <TopMessageHeader>
        <Icon
          src="https://storage.googleapis.com/telephoners/20210216_225118.jpg"
          alt="User Photo"
        />
        <Name>Norbert Faron</Name>
      </TopMessageHeader>

      <SendContainer>

        <SingleMessage></SingleMessage>
        <SingleMessage></SingleMessage>


      </SendContainer>

      <BottomPanel>
        <MessageInputContainer>
          <MessageInput placeholder="Aa"></MessageInput>
          <EmojiIcon>
            <Emoji></Emoji>
          </EmojiIcon>
        </MessageInputContainer>
        <SendIcon>
          <Send></Send>
        </SendIcon>
      </BottomPanel>
    </Container>
  );
};

const SendContainer = styled.div`
  margin-top: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 330px;
  margin-left: 10px;
  height: calc(100% - 140px);
  overflow-x: hidden;
  overflow-y: visible;
`;

const EmojiIcon = styled.div`
  position: absolute;
  z-index: 1200;
  bottom: 16px;
  left: 261px;
`;

const SendIcon = styled.div`
  position: absolute;
  z-index: 1300;
  bottom: 8px;
  left: 298px;
`;

const Icon = styled.img`
  width: 40px;
  height: 42px;
  border-radius: 100%;
  margin-left: 16px;
  position: relative;
  top: 8px;
`;

const Name = styled.p`
  margin-top: auto;
  margin-bottom: auto;
`;

const Container = styled.div`
  position: fixed;
  width: 350px;
  height: 460px;
  background-color: #f2f7f2;
  right: 542px;
  bottom: 0;
  z-index: 10;
  -webkit-box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.74);
  box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.74);
  border-top-left-radius: 10px;
`;

const TopMessageHeader = styled.div`
  width: 100%;
  height: 55.68px;
  font-size: 22px;
  font-weight: 600;
  background-color: #0fa3b1;
  border-top-left-radius: 10px;
  color: #f2f7f2;
  display: grid;
  grid-template-columns: 65px 200px 50px;
`;

const BottomPanel = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 53px;
`;

const MessageInputContainer = styled.div`
  width: 251px;
  font-size: 16px;
  height: 22px;
  padding-top: 10px;
  padding-bottom: 12px;
  resize: none;
  padding-right: 30px;
  vertical-align: auto;
  background-color: #e0e5e0;
  border: none;
  border-radius: 40px;
  color: #5b5c5c;
  font-weight: 600;
  outline-style: none;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const MessageInput = styled.textarea`
  width: 190px;
  font-size: 16px;
  height: 22px;
  resize: none;
  padding-left: 15px;
  padding-right: 30px;
  vertical-align: auto;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 40px;
  color: #5b5c5c;
  font-weight: 600;
  outline-style: none;
  position: relative;

  &::placeholder {
    font-size: 18px;
    overflow: hidden;
    vertical-align: auto;
  }
`;

export default Message;
