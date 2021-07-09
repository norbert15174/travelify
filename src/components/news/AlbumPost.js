import React from "react";
import styled, { ThemeContext } from "styled-components";
import japonia1 from "./Japonia.jpg";
import japonia2 from "./japonia2.jpg";

const AlbumPost = () => (
    <Container>
        <Header>
            <ProfilePhoto src={"https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x"} alt="profilePhoto"/>
            <h1>Mikołaj Telec</h1>
        </Header>
        <img src={japonia1}></img>
    </Container>
);



const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    height: 780px;
    display: grid;
    grid-auto-rows: repeat(2, auto);
`;

const Header = styled.div`
    height: 10vh;
    margin: 33px 50px 0 50px;
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