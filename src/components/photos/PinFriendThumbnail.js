import React, { useState } from "react";
import styled from "styled-components";
import Button from "../trinkets/Button";

// FriendThumbnail for SharePinBox

const PinFriendThumbnail = ({name, url}) => {

    const [ chosen, setChosen ] = useState(false);

    return (
        <Friend>
            <Photo src={url}/>
            <h1>{name}</h1>
            <ChooseButton
                onClick={() => {
                    setChosen(true); 
                    console.log("You have clicked at: " + name);
                }}
            >
                {chosen ? "Wybrany" : "Wybierz"}
            </ChooseButton>
        </Friend>
    );
    
};

const Friend = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 10px;
    h1 { 
        display: inline-block;
        word-wrap: break-word;
        width: 90%;
        white-space: normal
    }
    @media only screen and (max-width: 1425px) {
        font-size: 9px;
    };
    @media only screen and (max-width: 1060px) {
        font-size: 8px;
    }
    @media only screen and (max-width: 510px) {
        font-size: 7px;
    }
`;

const Photo = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 15px;
    border: 2px solid ${({theme}) => theme.color.lightTurquise};
    @media only screen and (max-width: 1425px) {
        width: 30px;
        height: 30px;
        margin-right: 5px;
    };
    @media only screen and (max-width: 1060px) {
        width: 25px;
        height: 25px;
    }
    @media only screen and (max-width: 510px) {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
`;

const ChooseButton = styled(Button)`
    font-size: 18px;
    border-radius: 5px;
    width: fit-content;
    padding: 0px 5px 0px 5px;
    height: 35px;
    margin: 0 15px 0 auto;
    @media only screen and (max-width: 1425px) {
        font-size: 12px;
        height: 25px;
    };
    @media only screen and (max-width: 1060px) {
        font-size: 10px;
        height: 20px;
        margin: 0 10px 0 auto;
    }
    @media only screen and (max-width: 510px) {
        font-size: 7px;
        height: 15px;
        margin: 0 5px 0 10px;
    }
`;

export default PinFriendThumbnail;