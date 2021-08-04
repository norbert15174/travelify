import React, { useState } from "react";
import styled from "styled-components";
import Button from "../trinkets/Button";

// FriendThumbnail for SharePinBox

const FriendThumbnail = ({name, url}) => {

    const [ chosen, setChosen ] = useState(false);

    return (
        <Friend>
            <Photo src={url}/>
            <h1>{name}</h1>
            <ChooseButton className="choose"
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
    font-size: 14px;
    @media only screen and (max-width: 1140px) {
        font-size: 10px;
    }
    @media only screen and (max-width: 720px) {
        font-size: 6px;
    };
    @media only screen and (max-width: 510px) {
        font-size: 4px;
    }
`;

const Photo = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 15px;
    border: 2px solid ${({theme}) => theme.color.lightTurquise};
    @media only screen and (max-width: 1140px) {
        width: 25px;
        height: 25px;
    }
    @media only screen and (max-width: 720px) {
        width: 15px;
        height: 15px;
    };
    @media only screen and (max-width: 510px) {
        margin-right: 10px;
    }
`;

const ChooseButton = styled(Button)`
    font-size: 24px;
    border-radius: 5px;
    width: fit-content;
    padding: 0px 5px 0px 5px;
    height: 45px;
    margin: 0 15px 0 auto;
    @media only screen and (max-width: 1140px) {
        font-size: 14px;
        height: 25px;
    }
    @media only screen and (max-width: 720px) {
        font-size: 10px;
        height: 15px;
    };
    @media only screen and (max-width: 510px) {
        font-size: 6px;
        height: 15px;
        margin: 0 5px 0 auto;
    }
`;

export default FriendThumbnail;