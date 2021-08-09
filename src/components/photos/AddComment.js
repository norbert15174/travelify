import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import sendIcon from "./assets/sendIcon.svg";
import emojiIcon from "./assets/emojiIcon.svg";
import Picker from 'emoji-picker-react';
import "./scrollbar.css";
import "./commentEmojiPicker.css"; 
import JSEMOJI from 'emoji-js';

let emoji = new JSEMOJI();
emoji.replace_mode = 'unified';
emoji.allow_native = true;

const AddComment = ({ add }) => {

    const [ comment, setComment ] = useState("");
    const [ showEmoji, setShowEmoji ] = useState(false);

    // when emoji is added manually
    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject)
        setComment(comment + emojiObject.emoji);
    };

    // when emoji is typed in the comment ... :smile:
    const onChangeHandler = (event) => {
        let text = emoji.replace_colons(event.target.value);
        setComment(text);
    }

    return (
        <Container>
            <InnerContainer>
                <EmojiButton src={emojiIcon} readyToSend={comment !== "" || showEmoji ? true : false} onClick={() => {
                    setShowEmoji(!showEmoji)
                }}/>
                <CommentInput
                    className="scroll_two" 
                    id="comment"
                    name="comment"
                    placeholder="Dodaj komentarz..."
                    wrap="soft"
                    readyToSend={comment !== "" || showEmoji ? true : false}
                    value={comment}
                    onChange={(e) => onChangeHandler(e)}
                />
                { showEmoji && <Picker onEmojiClick={onEmojiClick} native={true}/> }
            </InnerContainer>
            <SendButton 
                src={sendIcon}
                readyToSend={comment !== "" || showEmoji ? true : false} 
                onClick={() => {
                    if (comment !== "" ) {
                        add({
                            id: Math.random(),
                            name: "Mikołaj Telec",
                            text: comment,
                        })
                        setComment("");
                        setShowEmoji(false);
                    }
                }}
            />
        </Container>
    );

}

const Container = styled.div`
    display: grid;
    grid-template-columns: 90% 1fr;
    grid-column-gap: 10px;
    margin-top: 35px;
    align-items: center;
    @media only screen and (max-width: 1225px) {
        margin-top: 15px;
        grid-column-gap: 0px;
    }
    @media only screen and (max-width: 1025px) {
        margin-top: 10px;
    }
`;

const InnerContainer = styled.div`
    position: relative;
`;

const CommentInput = styled.textarea`
    /*
    animation: ${({readyToSend}) => !readyToSend ? expand : narrow};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    width: 100%;
     */
    width: 85%;
    height: 30px;
    resize: none;
    vertical-align: auto;
    border: none;
    border-radius: 40px;
    outline-style: none;
    padding: 8px 40px 0px 20px;
    background-color: ${({theme}) => theme.color.darkBackground};
    color: ${({theme}) => theme.color.greyFont};
    font-size: 18px;
    ::placeholder {
        font-size: 18px;
        overflow: hidden;
        text-transform: none;
        letter-spacing: 1px;
        color: ${({theme}) => theme.greyFont};
        @media only screen and (max-width: 1225px) {
            font-size: 14px;
        }
        @media only screen and (max-width: 1025px) {
            font-size: 10px;
        }
    }
    @media only screen and (max-width: 1225px) {
        font-size: 14px;
        height: 20px;
        width: 95%;
        padding: 5px 0px 5px 10px;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 10px;
        height: 15px;
        padding: 5px 0px 0px 10px;
    }
    @media only screen and (max-width: 825px) {
        width: 100%;
    }
`;



const SendButton = styled.img`
    /*
    display: ${({readyToSend}) => readyToSend ? "block" : "none"};
    animation-name: ${
        keyframes`
            0% { opacity: 0; }
            25% { opacity: 0.25; }
            50% { opacity: 0.5; }
            75% { opacity: 0.75; }
            100% { opacity: 1; }
        `
    };
    animation-duration: 0.5s;
    animation-fill-mode: none;
    */
    width: 37px;
    height: 34px;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
    @media only screen and (max-width: 1225px) {
        width: 25px;
        height: 25px;
    }
    @media only screen and (max-width: 1025px) {
        width: 20px;
        height: 20px;
        margin-left: 5px;
    }
    @media only screen and (max-width: 825px) {
        margin-left: 15px;
    }
`;



const EmojiButton = styled.img`
    //animation-name: ${({readyToSend}) => !readyToSend ? emojiMoveRight : emojiMoveLeft};
    //animation-duration: 0.5s;
    //animation-fill-mode: none;
    //margin-right: ${({readyToSend}) => !readyToSend ? "-50px" : "10px"};
    width: 25px;
    height: 25px;
    position: absolute;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
    margin-left: auto;
    left: 0;
    margin-right: 10px;
    right: 0;
    margin-top: 7px;
    top: 0;
    @media only screen and (max-width: 1225px) {
        width: 20px;
        height: 20px;
        margin-top: 5px;
    }
    @media only screen and (max-width: 1025px) {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        margin-top: 3px;
    }
    @media only screen and (max-width: 825px) {
        margin-right: -5px;
    }
`;

const emojiMoveRight = keyframes`
    0% { opacity: 1; margin-right: 10px; }
    15% { opacity: 0.66; margin-right: 10px; }
    30% { opacity: 0.33;  margin-right: 10px; }
    50% { opacity: 0; margin-right: 10px; }
    70% { opacity: 0.33; margin-right: -50px }
    85% { opacity: 0.66; margin-right: -50px }
    100% { opacity: 1; margin-right: -50px }
`;

const emojiMoveLeft = keyframes`
    0% { opacity: 1; margin-right: -50px; }
    15% { opacity: 0.66; margin-right: -50px; }
    30% { opacity: 0.33;  margin-right: -50px; }
    50% { opacity: 0; margin-right: -50px; }
    70% { opacity: 0.33; margin-right: 10px }
    85% { opacity: 0.66; margin-right: 10px }
    100% { opacity: 1; margin-right: 10px }
`;

const expand = keyframes`
    from {
        width: 85%;
    }
    to {
        width: 100%;
    }
`;

const narrow = keyframes`
    from {
      width: 100%;
    }
    to {
      width: 85%;
    }
`;

export default AddComment;