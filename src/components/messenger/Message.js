import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import "./friends.css";
import Emoji from "../menu/svg/emoji";
import Send from "../menu/svg/send";
import Close from "../menu/svg/close";
import SingleMessage from "./SingleMessage";
import { useSelector } from "react-redux";
import { routes } from "../../miscellanous/Routes"; 

const Message = ({ user, click, friendDisplay}) => {

	const [ redirectToProfile, setRedirectToProfile ] = useState(false);
	const blurState = useSelector((state) => state.blur.value);

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
					click(-1);
				}}>
					<Close width="20px" height="20px"></Close>
				</CloseContainer>
      		</TopMessageHeader>
      		<SendContainer>
				<SingleMessage url={user.profilePicture}></SingleMessage>
				<SingleMessage url={user.profilePicture} side="right"></SingleMessage>
				<SingleMessage url={user.profilePicture}></SingleMessage>
      		</SendContainer>
      		<BottomPanel>
				<MessageInputContainer>
					<MessageInput placeholder="Aa"/>
					<EmojiIcon>
						<Emoji/>
					</EmojiIcon>
				</MessageInputContainer>
				<SendIcon>
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
