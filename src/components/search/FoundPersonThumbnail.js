import React from "react";
import styled from "styled-components";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

const FoundPersonThumbnail = ({person}) => {
    return (
        <>
            <Container>
                <Photo 
                    src={person.url !== undefined && person.url ? person.url : noProfilePictureIcon} 
                    alt="Profile picture" 
                    onError={(e) => {e.target.onError = null; e.target.src=noProfilePictureIcon;}}
                />
                <Name>{person.name}</Name>
            </Container>
        </>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 25px;
    @media only screen and (max-width: 1400px) {
        width: 80px;
        height: 80px;
        margin-right: 20px;
    }
    @media only screen and (max-width: 1100px) {
        width: 60px;
        height: 60px;
        margin-right: 15px;
    }
    @media only screen and (max-width: 800px) {
        width: 50px;
        height: 50px;
    }
`;

const Name = styled.h2`
    font-size: 30px;
    display: inline-block;
    word-wrap: break-word;
    width: 100%;
    white-space: normal;
    @media only screen and (max-width: 1400px) {
        font-size: 25px;
    }
    @media only screen and (max-width: 1100px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 18px;
        margin-right: 15px;
    }
`;


export default FoundPersonThumbnail;