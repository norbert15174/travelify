import React from "react";
import styled from "styled-components";
import AlbumThumbnail from "../albums/AlbumThumbnail";


const AlbumPost = ({url}) => (
    <Container>
        <Header>
            <ProfilePhoto src={"https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x"} alt="profilePhoto"/>
            <h1>Mikołaj Telec</h1>
        </Header>
        <AlbumThumbnail url={url}/> 
    </Container>
);



const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 30px 0;
    display: grid;
    
`;

const Header = styled.div`
    margin-left: 4%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
`;

const ProfilePhoto = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    margin-right: 15px;
`;


export default AlbumPost;