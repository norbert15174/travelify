import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { selectSharedPersonList, setSharedPersonList } from "../../redux/albumDetailsSlice";
import Button from "../trinkets/Button";
import {endpoints} from "../../url";

// FriendThumbnail for SharePinBox

const ShareFriendThumbnail = ({friend, albumId}) => {

    const [ error, setError ] = useState(null);
    const [ shareFinished, setShareFinished ] = useState(false);
    const [ posting, setPosting ] = useState(false);
    const sharedPersonList = useSelector(selectSharedPersonList);
    const alreadyChosen = sharedPersonList.find((item) => item.userId === friend.id) ? true : false;
    const dispatch = useDispatch();

    async function updateSharedPersonList() {
        setError(null);
        setShareFinished(false);
        setPosting(true);
        await axios({
            method: "post",
                url: endpoints.shareAlbumWithUser + albumId,
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
            // response should return shareId                
            console.log(response); 
            dispatch(setSharedPersonList([
                ...sharedPersonList, 
                {
                    userId: friend.id, 
                    name: friend.name, 
                    surName: friend.lastName, 
                    photo: friend.profilePicture
                }
            ]));
        })
        .catch((error) => {
            console.log(error);
            setError(error);
        })
        .finally(() => {
            console.log(sharedPersonList);
            setShareFinished(true);
            setPosting(false);
        });
    };

    return (
        <Friend>
            <Photo src={friend.profilePicture}/>
            <h1>{friend.name + " " + friend.lastName}</h1>
            <ChooseButton
                onClick={updateSharedPersonList}
                disabled={alreadyChosen || (shareFinished && !error)}
            >
                {alreadyChosen || (shareFinished && !error) ? "Udostępniony" : posting ? "Udostępnianie..." : "Wybierz"}
            </ChooseButton>
        </Friend>
    );
    
};

const Friend = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    h1 { 
        display: inline-block;
        word-wrap: break-word;
        width: 90%;
        white-space: normal
    }
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

export default ShareFriendThumbnail;