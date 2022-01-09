import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles/friends.css";
import Emoji from "../menu/assets/emoji";
import closeIcon from "./assets/closeIcon.svg";
import sendIcon from "./assets/sendIcon.svg";
import SingleMessage from "./SingleMessage";
import Picker from "emoji-picker-react";
import "./styles/messageEmojiPicker.css";
import JSEMOJI from "emoji-js";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { routes } from "../../miscellanous/Routes";
import { endpoints } from "../../miscellanous/url";
import axios from "axios";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

let emoji = new JSEMOJI();
emoji.replace_mode = "unified";
emoji.allow_native = true;

const Messenger = ({
  user,
  closeMessenger,
  chatsDisplay,
  chatUpdate,
  setChatUpdate,
}) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPos, setCursorPos] = useState(null);
  const [givenMessages, setGivenMessages] = useState(null);
  const [sending, setSending] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const messageInputRef = useRef(null);
  const emojiWindowRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const newestMessageRef = useRef(null);

  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const blurState = useSelector((state) => state.blur.value);

  useEffect(() => {
    if (chatUpdate.size > 0 && chatUpdate.has(user.friendId)) {
      if (givenMessages) {
        chatUpdate.delete(user.friendId);
        setChatUpdate(chatUpdate);
        refreshMessages();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatUpdate]);

  useEffect(() => {
    setPageNumber(1);
    setMessage("");
    setSending(false);
    setGivenMessages(null);
    getMessages("firstRun");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    // emoji window display
    if (showEmoji) {
      document.addEventListener("mousedown", onEmojiWindowOutsideClick, true);
    }
    // cursor position when typing comment, enables putting emoji in every place
    //commentInputRef.current.selectionEnd = cursorPos; //
    // eslint-disable-next-line
  }, [showEmoji]);

  async function sendMessage() {
    setSending(true);
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
        let responseToSave = [];
        for (let i = 0; i < response.data.length; i++) {
          if (!lastId.has(response.data[i].id)) {
            responseToSave.push(response.data[i]);
          }
        }
        setGivenMessages((prevState) => [...responseToSave, ...prevState]);
        setSending(false);
        scrollToBottom();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setMessage("");
      });
  }

  async function getMessages(type) {
    setLoading(true);
    if (type === "scrollUpdate") {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
    await axios({
      url:
        endpoints.getMessage +
        user.friendId +
        "?page=" +
        (type === "firstRun" ? 0 : pageNumber),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        if (data.length > 0) setHasMore(true);
        else setHasMore(false);
        if (givenMessages && type === "scrollUpdate") {
          // prevState must be iterable!
          setGivenMessages((prevState) => [...prevState, ...data]);
        } else if (type === "firstRun") {
          setPageNumber(1);
          setGivenMessages(data);
          scrollToBottom();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function refreshMessages() {
    setLoading(true);
    await axios
      .post(
        endpoints.refreshMessages + user.friendId,
        {
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
        let responseToSave = [];
        for (let i = 0; i < response.data.length; i++) {
          if (!lastId.has(response.data[i].id)) {
            responseToSave.push(response.data[i]);
          }
        }
        setGivenMessages((prevState) => [...responseToSave, ...prevState]);
        setSending(false);
        scrollToBottom();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const scrollToBottom = () => {
    if (newestMessageRef.current) {
      newestMessageRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(scrollToBottom, []);

  if (redirectToProfile) {
    chatsDisplay("");
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

  const onEmojiClick = (event, emojiObject) => {
    const ref = messageInputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    setMessage(start + emojiObject.emoji + end);
    setCursorPos(start.length + emojiObject.emoji.length); // cursor pos after emoji
  };

  const onChangeHandler = (event) => {
    if (event.nativeEvent.inputType === "insertLineBreak") {
      // when enter is pressed without input
      return;
    }
    let text = emoji.replace_colons(event.target.value);
    setMessage(text);
  };

  function onEmojiWindowOutsideClick(e) {
    if (!emojiWindowRef.current || emojiWindowRef.current.contains(e.target)) {
      return;
    }
    document.removeEventListener("mousedown", onEmojiWindowOutsideClick, true);
    if (!emojiButtonRef.current.contains(e.target)) {
      setShowEmoji(false);
    }
  }

  const onEnter = (e) => {
    if (e.key === "Enter") {
      if (message !== "") {
        setShowEmoji(false);
        sendMessage();
      }
    }
  };

  return (
    <Container blurState={blurState}>
      <ChatHeader>
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
      </ChatHeader>
      <MessagesContainer
        id="messageContainer"
        className="scroll_two"
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <InfiniteScroll
          dataLength={givenMessages ? givenMessages.length : 20}
          next={() => getMessages("scrollUpdate")}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true}
          hasMore={hasMore}
          loader={
            <Loading
              height={"8%"}
              width={"8%"}
              type={"spin"}
              color={"#075459"}
            />
          }
          scrollableTarget="messageContainer"
        >
          {givenMessages &&
            givenMessages.map((item, index) =>
              item.senderId === user.id ? (
                <SingleMessage
                  key={index}
                  friendName={user.name + " " + user.lastName}
                  newestMessageRef={1 === index + 1 ? newestMessageRef : null}
                  message={item.text}
                  messageId={item.id}
                  messageDate={item.date}
                  url={user.profilePicture}
                  friendId={user.id}
                  chatsDisplay={chatsDisplay}
                />
              ) : (
                <SingleMessage
                  key={index}
                  newestMessageRef={1 === index + 1 ? newestMessageRef : null}
                  message={item.text}
                  messageId={item.id}
                  messageDate={item.date}
                  url={user.profilePicture}
                  side="right"
                />
              )
            )}
        </InfiniteScroll>
      </MessagesContainer>
      <ChatFooter key="chatFooter">
        <InputContainer key="inputContainer">
          <MessageInput
            key="messageInput"
            autoFocus
            ref={messageInputRef}
            disabled={sending}
            placeholder="Aa :smile:"
            id="message"
            className="scroll_two"
            name="message"
            wrap="soft"
            value={message}
            onChange={(e) => onChangeHandler(e)}
            minRows={1}
            maxRows={3}
            onKeyDown={onEnter}
            maxLength={255}
          />
          <EmojiIcon
            key="emojiIcon"
            ref={emojiButtonRef}
            onClick={() => {
              if (!loading) {
                messageInputRef.current.focus();
                setShowEmoji(!showEmoji);
              }
            }}
          >
            <Emoji key="emoji" />
          </EmojiIcon>
          {showEmoji && (
            <div
              key="emojiWindow"
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
        </InputContainer>
        {!sending ? (
          <SendIcon
            key="sendIcon"
            icon={sendIcon}
            onClick={() => {
              if (message !== "" && !sending) {
                setShowEmoji(false);
                sendMessage();
              }
            }}
          />
        ) : (
          <Sending
            key="sending"
            height={"9%"}
            width={"9%"}
            type={"spin"}
            color={"#075459"}
          />
        )}
      </ChatFooter>
    </Container>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 460px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  right: 517px;
  bottom: 0;
  z-index: 10;
  -webkit-box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.74);
  box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.74);
  border-top-left-radius: 10px;
  @media only screen and (max-width: 1000px) {
    right: 392px;
    width: 300px;
    height: 410px;
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

const ChatHeader = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.color.dark};
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

const MessagesContainer = styled.div`
  width: 330px;
  padding: 3px 10px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  @media only screen and (max-width: 1000px) {
    width: 280px;
  }
`;

const Loading = styled(ReactLoading)`
  margin: 0 auto;
`;

const Sending = styled(ReactLoading)`
  margin: 1.5px auto auto auto;
`;

const ChatFooter = styled.div`
  width: 100%;
  margin: auto 0 0 0;
  padding: 10px 0px 5px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 280px;
  padding: 5px 0px;
  resize: none;
  background-color: ${({ theme }) => theme.color.darkBackground};
  border: none;
  border-radius: 40px;
  color: #5b5c5c;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  outline-style: none;
  margin: 0px 0px 5px 10px;
  @media only screen and (max-width: 1000px) {
    width: 230px;
  }
`;

const MessageInput = styled(TextareaAutosize)`
  width: 93%;
  font-size: 14px;
  resize: none;
  margin-left: 15px;
  vertical-align: auto;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  outline-style: none;
  overflow-y: scroll;
`;

const EmojiIcon = styled.div`
  margin: 2px 8px 0px 0px;
  &:hover {
    opacity: 0.5;
  }
`;

const SendIcon = styled.div`
  margin: 0px auto 2px auto;
  background-image: url(${({ icon }) => icon});
  width: 34px;
  height: 34px;
  background-size: 34px;
  background-repeat: 50% 50%;
  background-repeat: no-repeat;
  &:hover {
    opacity: 0.5;
  }
`;

export default Messenger;
