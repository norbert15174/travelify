import React from "react";
import styled from "styled-components";
import NewsThumbnail from "./NewsThumbnail";


const Post = ({news}) => (
    <Container>
        <Header>
            <ProfilePhoto src={"https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x"} alt="profilePhoto"/>
            <h1>{news.name}</h1>
        </Header>
        <NewsThumbnail news={news}/> 
    </Container>
);

const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 30px 0;
    display: grid;
    @media only screen and (max-width: 890px) {
        padding: 15px 0;
    }
`;

const Header = styled.div`
    margin-left: 4%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    @media only screen and (max-width: 1020px) {
        font-size: 12px;
        margin-bottom: 12px;
    }
    @media only screen and (max-width: 890px) {
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
    @media only screen and (max-width: 1020px) {
        width: 60px;
        height: 60px;
    }
    @media only screen and (max-width: 890px) {
        width: 40px;
        height: 40px;
    }
`;


export default Post;