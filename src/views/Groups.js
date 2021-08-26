import React, { useState, useEffect }  from "react";
import UserTemplate from "../templates/UserTemplate";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlur } from "../redux/blurSlice";
import { setFriendToDeleteId } from "../redux/deleteFriendSlice";
import Input from "../components/trinkets/Input";
import Picker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';
//import { endpoints } from "../url";
import { errorTypes } from "../miscellanous/Errors";

// UserTemplate adds Menu sidebar

let emoji = new JSEMOJI();
emoji.replace_mode = 'unified';
emoji.allow_native = true;

const Groups = () => {
    
    const blurState = useSelector((state) => state.blur.value);
    const friendId = useSelector((state) => state.deleteFriend.value);
    const dispatch = useDispatch();

    const [ text, setText ] = useState("");

    const [chosenEmoji, setChosenEmoji] = useState(null);

    useEffect(() => {
    	if (!sessionStorage.getItem("Login")) {
      		throw new Error(errorTypes.noAccess);
    	} else {
			console.log("fetchingData");
		}
  	}, []);

    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject)
        setText(text + emojiObject.emoji);
        setChosenEmoji(null);
    };

    const handler = (event) => {
        let text = emoji.replace_colons(event.target.value);
        setText(text);
    }

    return (
        <UserTemplate>
            <div>
                <div>
                    <button
                        aria-label="Blur toggle"
                        onClick={() => {
                            dispatch(toggleBlur());
                            dispatch(setFriendToDeleteId(25));
                        }}
                    >
                        Blur
                    </button>
                    <span>{blurState ? "True" : "False"}</span>
                    <h1>{friendId}</h1>
                </div>
                <div>
                    <Text>{text}</Text>
                    <Input value={text} onChange={(e) => handler(e)}/>
                    <Picker onEmojiClick={onEmojiClick} native={true}/>
                    {chosenEmoji ? (
                        <span>You chose: {chosenEmoji.emoji}</span>
                    ) : (
                        <span>No emoji Chosen</span>
                    )}
                 </div>   
            </div>
        </UserTemplate>
    )
};

const Text = styled.p`
    background-color: #fff;
    font-size: 32px;
`;

export default Groups;