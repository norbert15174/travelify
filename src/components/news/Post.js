import React from "react";
import styled from "styled-components";
import NewsThumbnail from "./NewsThumbnail";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

const profilePhoto = "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x";

const Post = ({news}) => (
    <Container>
        <Header>
            <ProfilePhoto src={profilePhoto !== undefined ? profilePhoto : noProfilePictureIcon} alt="profilePhoto"/>
            <h1>{news.name}</h1>
        </Header>
        <NewsThumbnail news={news}/> 
    </Container>
);

const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    height: 831px;
    @media only screen and (max-width: 1400px) {
        height: 731px;
    }
    @media only screen and (max-width: 1100px) {
        height: 500px;
    }
    @media only screen and (max-width: 800px) {
        height: 335px;
        padding: 15px 0;
    }
    @media only screen and (max-width: 500px) {
        height: 250px;
    }
`;

const Header = styled.div`
    margin-left: 4%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    @media only screen and (max-width: 1100px) {
        font-size: 12px;
        margin-bottom: 12px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 10px;
        margin-bottom: 10px;
    }
`;

const ProfilePhoto = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    margin-right: 15px;
    @media only screen and (max-width: 1100px) {
        width: 60px;
        height: 60px;
    }
    @media only screen and (max-width: 800px) {
        width: 40px;
        height: 40px;
    }
`;


export default Post;