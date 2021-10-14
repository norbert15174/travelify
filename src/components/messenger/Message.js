import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import ScrollableFeed from "react-scrollable-feed";
import "./styles/friends.css";
import Emoji from "../menu/assets/emoji";
import closeIcon from "./assets/closeIcon.svg";
import sendIcon from "./assets/sendIcon.svg";
import SingleMessage from "./SingleMessage";
import Picker from "emoji-picker-react";
import "./styles/messageEmojiPicker.css";
import JSEMOJI from "emoji-js";
import { useSelector } from "react-redux";
import { routes } from "../../miscellanous/Routes";
import { endpoints } from "../../url";
import axios from "axios";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

let emoji = new JSEMOJI();
emoji.replace_mode = "unified";
emoji.allow_native = true;

const Message = ({ user, closeMessenger, friendDisplay }) => {
  const messageInputRef = useRef(null);
  const emojiWindowRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPos, setCursorPos] = useState(null);
  const [givenMessages, setGivenMessages] = useState(null);

  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const blurState = useSelector((state) => state.blur.value);

  // when emoji is added manually
  const onEmojiClick = (event, emojiObject) => {
    const ref = messageInputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    //console.log(emojiObject)
    setMessage(start + emojiObject.emoji + end);
    setCursorPos(start.length + emojiObject.emoji.length); // cursor pos after emoji
  };

  // when emoji is typed in the comment ... :smile:
  const onChangeHandler = (event) => {
    let text = emoji.replace_colons(event.target.value);
    setMessage(text);
  };

  // emoji window will be closed on outside click
  function onEmojiWindowOutsideClick(e) {
    if (!emojiWindowRef.current || emojiWindowRef.current.contains(e.target)) {
      return;
    }
    document.removeEventListener("mousedown", onEmojiWindowOutsideClick, true);
    if (!emojiButtonRef.current.contains(e.target)) {
      // EmojiButton onClick event toggles showEmoji
      setShowEmoji(false);
    }
  }

  useEffect(() => {
    // emoji window display
    if (showEmoji) {
      document.addEventListener("mousedown", onEmojiWindowOutsideClick, true);
    }
    // cursor position when typing comment, enables putting emoji in every place
    //commentInputRef.current.selectionEnd = cursorPos; //
    // eslint-disable-next-line
  }, [showEmoji]);

  useEffect(() => {
    getMessages();
  }, [user]);

  async function sendMessage() {
    await axios
      .post(
        endpoints.sendMessage + user.friendId,
        {
          text: message,
          friendsId: user.friendId,
          date: givenMessages.length > 0 ? givenMessages[0].date : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
          },
        }
      )
      .then((response) => {
        let lastId = new Set(givenMessages.map((e) => e.id));
        console.log(response.data);
        let responseToSave = [];
        for (let i = 0; i < response.data.length; i++) {
          if (!lastId.has(response.data[i].id)) {
            responseToSave.push(response.data[i]);
          }
        }
        setGivenMessages((prevState) => [...responseToSave, ...prevState]);
      })
      .catch((error) => {})
      .finally(() => {
        setMessage("");
      });
  }

  async function getMessages() {
    await axios({
      url: endpoints.getMessage + user.friendId + "?page=0",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setGivenMessages(data);
      })
      .catch((error) => {});
  }

  if (redirectToProfile) {
    friendDisplay("");
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, user.id),
          state: {
            selectedUser: { selectIsTrue: true, id: user.id, isHeFriend: true },
          },
        }}
      />
    );
  }

  return (
    <Container blurState={blurState}>
      <TopMessageHeader>
        <Icon
          src={
            user.profilePicture !== undefined && user.profilePicture
              ? user.profilePicture
              : noProfilePictureIcon
          }
          alt="Profile picture"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noProfilePictureIcon;
          }}
          onClick={() => {
            setRedirectToProfile(true);
          }}
        />
        <NameContainer
          onClick={() => {
            setRedirectToProfile(true);
          }}
        >
          <Name>{user.name + " " + user.lastName}</Name>
        </NameContainer>
        <CloseContainer
          icon={closeIcon}
          onClick={(e) => {
            closeMessenger(null);
          }}
        />
      </TopMessageHeader>
      <SendContainer className="scroll_two">
        <ScrollableFeed className="scroll_two">
          {givenMessages &&
            givenMessages
              .slice(0)
              .reverse()
              .map((item) =>
                item.senderId === user.id ? (
                  <SingleMessage
                    key={item.date}
                    message={item.text}
					messageDate={item.date}
                    url={user.profilePicture}
                    friendId={user.id}
                    friendDisplay={friendDisplay}
                  />
                ) : (
                  <SingleMessage
                    key={item.date}
                    message={item.text}
					messageDate={item.date}
                    url={user.profilePicture}
                    side="right"
                  />
                )
              )}
        </ScrollableFeed>
      </SendContainer>
      <BottomPanel>
        <MessageInputContainer>
          <MessageInput
            ref={messageInputRef}
            placeholder="Aa :smile:"
            id="message"
            className="scroll_two"
            name="message"
            wrap="soft"
            value={message}
            onChange={(e) => onChangeHandler(e)}
          />
          <EmojiIcon
            ref={emojiButtonRef}
            onClick={() => {
              messageInputRef.current.focus();
              setShowEmoji(!showEmoji);
            }}
          >
            <Emoji />
          </EmojiIcon>
          {showEmoji && (
            <div
              ref={emojiWindowRef}
              id="emojiWindow"
              className="emoji-window-message"
            >
              <Picker
                onEmojiClick={onEmojiClick}
                native={true}
                disableSkinTonePicker={true}
              />
            </div>
          )}
        </MessageInputContainer>
        <SendIcon
          icon={sendIcon}
          onClick={() => {
            if (message !== "") {
              // SEND MESSAGE
              setShowEmoji(false);
              sendMessage();
            }
          }}
        />
      </BottomPanel>
    </Container>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  position: fixed;
  width: 350px;
  height: 460px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  right: 547px;
  bottom: 0;
  z-index: 10;
  -webkit-box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.74);
  box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.74);
  border-top-left-radius: 10px;
  @media only screen and (max-width: 1000px) {
    right: 422px;
    width: 300px;
    height: 410px;
  }
  @media only screen and (max-height: 720px) {
    right: 527px;
  }
  @media only screen and (max-height: 640px) {
    right: 517px;
  }
  @media only screen and (max-height: 560px) {
    right: 507px;
  }
  @media only screen and (max-height: 480px) {
    right: 497px;
  }
  @media only screen and (max-height: 400px) {
    right: 487px;
  }
  @media only screen and (max-width: 1000px) and (max-height: 720px) {
    right: 402px;
  }
  @media only screen and (max-width: 1000px) and (max-height: 640px) {
    right: 392px;
  }
  @media only screen and (max-width: 1000px) and (max-height: 560px) {
    right: 382px;
  }
  @media only screen and (max-width: 1000px) and (max-height: 480px) {
    right: 372px;
  }
  @media only screen and (max-width: 1000px) and (max-height: 400px) {
    right: 362px;
  }
`;

const TopMessageHeader = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.color.darkTurquise};
  border-top-left-radius: 10px;
  color: ${({ theme }) => theme.color.lightBackground};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 7.5px 10px;
  @media only screen and (max-width: 1000px) {
    padding: 5px 7.5px;
    font-size: 14px;
  }
`;

const Name = styled.p`
  display: inline-block;
  text-align: center;
  align-self: center;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.color.lightBackground};
  cursor: pointer;
  @media only screen and (max-width: 1000px) {
    width: 30px;
    height: 30px;
  }
`;

const NameContainer = styled.div`
  cursor: pointer;
  width: max-content;
`;

const CloseContainer = styled.div`
  cursor: pointer;
  margin-left: auto;
  background-image: url(${({ icon }) => icon});
  width: 20px;
  height: 20px;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  @media only screen and (max-width: 1000px) {
    width: 15px;
    height: 15px;
    background-size: 15px;
  }
`;

const SendContainer = styled.div`
  width: 330px;
  padding: 3px 10px;
  height: 86.5%;
  overflow-x: hidden;
  overflow-y: visible;
  @media only screen and (max-width: 1000px) {
    width: 280px;
  }
`;

const EmojiIcon = styled.div`
  position: absolute;
  z-index: 1200;
  bottom: 9px;
  left: 250px;
  &:hover {
    opacity: 0.5;
  }
  @media only screen and (max-width: 1000px) {
    left: 200px;
  }
`;

const BottomPanel = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 53px;
`;

const MessageInputContainer = styled.div`
  position: relative;
  width: 251px;
  font-size: 16px;
  height: 22px;
  padding-top: 10px;
  padding-bottom: 12px;
  resize: none;
  padding-right: 30px;
  vertical-align: auto;
  background-color: ${({ theme }) => theme.color.darkBackground};
  border: none;
  border-radius: 40px;
  color: #5b5c5c;
  font-weight: 600;
  outline-style: none;
  margin-bottom: 5px;
  margin-left: 10px;
  @media only screen and (max-width: 1000px) {
    width: 201px;
  }
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
  font-weight: 600;
  outline-style: none;
  position: relative;
  &::placeholder {
    overflow: hidden;
    vertical-align: auto;
  }
`;

const SendIcon = styled.div`
  position: absolute;
  z-index: 1300;
  bottom: 10px;
  left: 298px;
  background-image: url(${({ icon }) => icon});
  width: 36px;
  height: 36px;
  background-size: 36px;
  background-repeat: 50% 50%;
  background-repeat: no-repeat;
  &:hover {
    opacity: 0.5;
  }
  @media only screen and (max-width: 1000px) {
    left: 248px;
  }
`;

export default Message;
