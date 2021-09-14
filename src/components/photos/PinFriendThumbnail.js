import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectAlbumType } from "../../redux/albumDetailsSlice";
import Button from "../trinkets/Button";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { endpoints } from "../../url";
import axios from "axios";
import { albumTypes } from "../../miscellanous/Utils";

const PinFriendThumbnail = ({friend, photoId, tags}) => {

    const [ error, setError ] = useState(false);
    const [ pinFinished, setPinFinished ] = useState(false);
    const [ putting, setPutting ] = useState(false);
    const albumType = useSelector(selectAlbumType);
    const [alreadyChosen, setAlreadyChosen ] = useState(tags.find((item) => item.userId === (albumType === albumTypes.private ? friend.userId : friend.id)) ? true : false);

    async function tagPersonOnPhoto() {
        setError(null);
        setPinFinished(false);
        setPutting(true);
        await axios({
            method: "put",
                url: endpoints.tagPersonOnPhoto + photoId,
                data: [
                    friend.id
                ],
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
                    withCredentials: true,
                },
        })
        .then((response) => {           
            console.log(response); 
            setAlreadyChosen(true)
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setPinFinished(true);
            setPutting(false);
        });
    };
    return (
        <Friend>
            <Photo src={friend.profilePicture || friend.photo || noProfilePictureIcon}/>
            <h1>{friend.name + " " + (friend.lastName || friend.surName)}</h1>
            <ChooseButton disabled={alreadyChosen || (pinFinished && !error)} onClick={tagPersonOnPhoto}>
                {alreadyChosen || (pinFinished && !error) ? "Oznaczony" : putting ? "Oznaczanie..." : "Wybierz"}
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
        width: max-content;
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