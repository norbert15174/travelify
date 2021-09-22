import React, { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import ScrollableFeed from 'react-scrollable-feed';
import "./friends.css";
import Emoji from "../menu/assets/emoji";
import Send from "../menu/assets/send";
import Close from "../menu/assets/close";
import SingleMessage from "./SingleMessage";
import Picker from 'emoji-picker-react';
import "./messageEmojiPicker.css"; 
import JSEMOJI from 'emoji-js';
import { useSelector } from "react-redux";
import { routes } from "../../miscellanous/Routes"; 

let emoji = new JSEMOJI();
emoji.replace_mode = 'unified';
emoji.allow_native = true;

const Message = ({ user, closeMessenger, friendDisplay}) => {

	const messageInputRef = useRef(null);
    const emojiWindowRef = useRef(null);
    const emojiButtonRef = useRef(null);
    const [ message, setMessage ] = useState("");
    const [ showEmoji, setShowEmoji ] = useState(false);
    const [ cursorPos, setCursorPos ] = useState(null);

	const [ redirectToProfile, setRedirectToProfile ] = useState(false);
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
    }

	// emoji window will be closed on outside click
    function onEmojiWindowOutsideClick(e) {
        if (!emojiWindowRef.current || emojiWindowRef.current.contains(e.target)) {
            return;
        }
        document.removeEventListener("mousedown", onEmojiWindowOutsideClick, true)
        if (!emojiButtonRef.current.contains(e.target)) { 
            // EmojiButton onClick event toggles showEmoji
            setShowEmoji(false) 
        };
    };

	useEffect(() => {
        // emoji window display
        if (showEmoji) {
            document.addEventListener("mousedown", onEmojiWindowOutsideClick, true)
        }
        // cursor position when typing comment, enables putting emoji in every place
        //commentInputRef.current.selectionEnd = cursorPos; // 
        // eslint-disable-next-line 
    }, [showEmoji])

	if (redirectToProfile) {
		friendDisplay("");
        return <Redirect 
					push to={{
                    	pathname: routes.user.replace(/:id/i, user.id), 
                    	state: { selectedUser: { selectIsTrue: true, id: user.id, isHeFriend: true} }
					}}
        		/>
	}

	return (
    	<Container blurState={blurState}>
      		<TopMessageHeader>
        		<Icon 
					src={user.profilePicture} 
					alt="User Photo"
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
				<CloseContainer onClick={e => {
					closeMessenger(null);
				}}>
					<Close width="20px" height="20px"></Close>
				</CloseContainer>
      		</TopMessageHeader>
      		<SendContainer className="scroll_two">
				<ScrollableFeed className="scroll_two">
					<SingleMessage url={user.profilePicture} friendId={user.id} friendDisplay={friendDisplay}/>
					<SingleMessage url={user.profilePicture} side="right"/>
					<SingleMessage url={user.profilePicture} friendId={user.id} friendDisplay={friendDisplay}/>
					<SingleMessage url={user.profilePicture} friendId={user.id} friendDisplay={friendDisplay}/>
					<SingleMessage url={user.profilePicture} side="right"/>
					<SingleMessage url={user.profilePicture} friendId={user.id} friendDisplay={friendDisplay}/>
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
					<EmojiIcon ref={emojiButtonRef} onClick={() => {
                        messageInputRef.current.focus(); 
                        setShowEmoji(!showEmoji);
                    }}>
						<Emoji/>
					</EmojiIcon>
					{ 
						showEmoji && 
						<div ref={emojiWindowRef} id="emojiWindow" className="emoji-window-message">
							<Picker onEmojiClick={onEmojiClick} native={true} disableSkinTonePicker={true}/> 
						</div>
                	}
				</MessageInputContainer>
				<SendIcon onClick={() => {
					if (message !== "") {
						// SEND MESSAGE
						setMessage("");
						setShowEmoji(false);
					}
				}}>
					<Send/>
				</SendIcon>
      		</BottomPanel>
    	</Container>
  	);
};

const CloseContainer = styled.div`
  	cursor: pointer;
	margin-left: auto;
`;

const SendContainer = styled.div`
	width: 330px;
	margin-left: 10px;
	height: 86.5%;
	overflow-x: hidden;
	overflow-y: visible;
`;

const EmojiIcon = styled.div`
  position: absolute;
  z-index: 1200;
  bottom: 9px;
  left: 250px;
  &:hover {
        opacity: 0.5;
    }
`;

const SendIcon = styled.div`
  position: absolute;
  z-index: 1300;
  bottom: 8px;
  left: 298px;
  &:hover {
        opacity: 0.5;
    }
`;

const Icon = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-right: 10px;
	border: 1px solid ${({theme}) => theme.color.lightBackground};
	cursor: pointer;
`;

const Container = styled.div`
	filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
	-webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
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
	font-size: 16px;
	font-weight: ${({theme}) => theme.fontWeight.bold};
	background-color: ${({theme}) => theme.color.darkTurquise};
	border-top-left-radius: 10px;
	color: ${({theme}) => theme.color.lightBackground};
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 7.5px 10px;
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

const NameContainer = styled.div`
    cursor: pointer;
    width: max-content;
`;

const Name = styled.p`
	display: inline-block;
	text-align: center;
  	align-self: center;
	
`;


export default Message;
