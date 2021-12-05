import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import sendIcon from "./assets/sendIcon.svg";
import emojiIcon from "./assets/emojiIcon.svg";
import Picker from 'emoji-picker-react';
import "./styles/photosScrollbar.css";
import "./styles/commentEmojiPicker.css"; 
import JSEMOJI from 'emoji-js';

let emoji = new JSEMOJI();
emoji.replace_mode = 'unified';
emoji.allow_native = true;

const AddComment = ({ add, currentPhotoIndex }) => {

    const commentInputRef = useRef(null);
    const emojiWindowRef = useRef(null);
    const emojiButtonRef = useRef(null);
    const [ comment, setComment ] = useState("");
    const [ showEmoji, setShowEmoji ] = useState(false);
    const [ cursorPos, setCursorPos ] = useState(null);

    // when emoji is added manually
    const onEmojiClick = (event, emojiObject) => {
        const ref = commentInputRef.current;
        ref.focus();
        const start = comment.substring(0, ref.selectionStart);
        const end = comment.substring(ref.selectionStart);
        setComment(start + emojiObject.emoji + end);
        setCursorPos(start.length + emojiObject.emoji.length); // cursor pos after emoji
    };

    // when emoji is typed in the comment ... :smile:
    const onChangeHandler = (event) => {
        let text = emoji.replace_colons(event.target.value);
        setComment(text);
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

    return (
        <Container>
            <InnerContainer>
                <EmojiButton
                    ref={emojiButtonRef}
                    src={emojiIcon} 
                    readyToSend={comment !== "" || showEmoji ? true : false} 
                    onClick={() => {
                        commentInputRef.current.focus(); 
                        setShowEmoji(!showEmoji);
                    }}
                />
                <CommentInput
                    ref={commentInputRef}
                    className="scroll_two" 
                    id="comment"
                    name="comment"
                    placeholder="Dodaj komentarz... :smile:"
                    wrap="soft"
                    readyToSend={comment !== "" || showEmoji ? true : false}
                    value={comment}
                    onChange={(e) => onChangeHandler(e)}
                />
                { 
                    showEmoji && 
                    <div ref={emojiWindowRef} id="emojiWindow" className="emoji-window-comment">
                        <Picker onEmojiClick={onEmojiClick} native={true} disableSkinTonePicker={true}/> 
                    </div>
                }
            </InnerContainer>
            <SendButton 
                src={sendIcon}
                readyToSend={comment !== "" || showEmoji ? true : false} 
                onClick={() => {
                    if (comment !== "" ) {
                        add(comment);
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
    margin: 15px 0 0 0;
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
    @media only screen and (max-width: 1425px) {
        width: 83%;
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
    @media only screen and (max-width: 1635px) {
        margin-right: 0px;
    }
    @media only screen and (max-width: 1225px) {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        margin-top: 5px;
    }
    @media only screen and (max-width: 1025px) {
        width: 15px;
        height: 15px;
        margin-right: 3px;
        margin-top: 2.5px;
    }
    @media only screen and (max-width: 825px) {
        margin-right: -6px;
    }
`;

export default AddComment;