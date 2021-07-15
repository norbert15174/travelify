import React, { useState } from "react";
import styled from "styled-components";
import closeIcon from "./assets/closeIcon.svg";
import ConfirmationBox from "../trinkets/ConfirmationBox";

const FriendThumbnail = ({friend}) => {
    
    // TODO - RemoveFriend shouldn't be available when watching other people profile

    const [ confirmationBox, setConfirmationBox ] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [ deleteFriend, setDeleteFriend ] = useState(false);

    return (
        <Container>
            <Photo src={friend.url} alt="Profile photo"/>
            <Name>{friend.name}</Name>
            <RemoveFriend src={closeIcon} onClick={() => setConfirmationBox(true)}/>
            { 
                confirmationBox && 
                <ConfirmationBox confirm={setDeleteFriend} display={confirmationBox} refuse={setConfirmationBox}>
                    Czy na pewno chcesz usunąć daną osobę z listy znajomych?
                </ConfirmationBox>
            }
        </Container>
    )
    
};

const Container = styled.div`
    width: 550px;
    display: grid;
    grid-template-columns: 125px repeat(2, auto);
    align-items: center;
`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100%;
`;

const Name = styled.h2`
    margin-left: 15px;
    font-size: 30px;
`;

const RemoveFriend = styled.img`
    width: 30px;
    height: 30px;
    justify-self: end;
    cursor: pointer;
`;


export default FriendThumbnail;