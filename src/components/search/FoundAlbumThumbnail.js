import React from "react";
import styled from "styled-components";

// redirectTo => set states redirect to album

const AlbumThumbnail = ({album, redirectTo}) => (
    <Container onClick={redirectTo}>
        <MainPhoto src={album.image} alt="albumMainPhoto"/>
        <Owner>
            <ProfilePhoto src={album.url}/>
            <h3>{album.name}</h3>
        </Owner> 
        <InfoContainer>
            <Text>
                <Header>
                    <Title>{album.title}</Title>
                    <Localization>{album.localization}</Localization>
                </Header>
                <Description>
                    {album.description}
                </Description>
            </Text>
        </InfoContainer>
    </Container>

);

const Container = styled.div`
    width: 100%;
    position: relative;
`;

const MainPhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const InfoContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0%;
    background: rgba(229, 229, 229, 0.8);
`;

const Owner = styled.div`
    padding: 5px 25px 5px 0px;
    border-radius: 50px;
    background: rgba(229, 229, 229, 0.8);
    position: absolute;
    max-width: 400px;
    top: 2.5%;
    left: 2%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24px;
    h3 {
        display: inline-block;
        word-wrap: break-word;
        width: 100%;
        white-space: normal;
    }
    @media only screen and (max-width: 1400px) {
        font-size: 20px;
        max-width: 350px;
    }
    @media only screen and (max-width: 1100px) {
        font-size: 10px;
        padding-right: 10px;
        max-width: 210px;
    }
    
    @media only screen and (max-width: 800px) {
        font-size: 14px;
        padding-right: 15px;
        max-width: 280px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 10px;
        padding-right: 10px;
        max-width: 200px;
    }
`;

const ProfilePhoto = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 10px;
    border: 2px solid ${({theme}) => theme.color.lightTurquise };
    @media only screen and (max-width: 1400px) {
        width: 40px;
        height: 40px;    
    }
    @media only screen and (max-width: 1100px) {
        width: 25px;
        height: 25px;    
    }
   
    @media only screen and (max-width: 800px) {
        width: 30px;
        height: 30px;      
    }
    @media only screen and (max-width: 500px) {
        width: 20px;
        height: 20px;
        margin-right: 5px;   
    }
`;

const Text = styled.div`
    padding: 10px 20px;
    @media only screen and (max-width: 1100px) {
        padding: 5px 5px;
    }
    @media only screen and (max-width: 800px) {
        padding: 5px 10px;
    }
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
`;

const Title = styled.h1`
    font-size: 34px;    
    display: inline-block;
    @media only screen and (max-width: 1400px) {
        font-size: 28px;
    }
    @media only screen and (max-width: 1100px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 22px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 12px;
    }
`;

const Localization = styled.h2`
    font-size: 18px;
    justify-self: end;
    @media only screen and (max-width: 1400px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 1100px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 8px;
    }
`;

const Description = styled.p`
    margin-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    font-size: 12px;
    @media only screen and (max-width: 1400px) { 
        margin-top: 10px;
        -webkit-line-clamp: 5;
    }
    @media only screen and (max-width: 1100px) {
        font-size: 8px;
        margin-top: 2.5px;
        -webkit-line-clamp: 3;
    }
    @media only screen and (max-width: 800px) {
        font-size: 10px;
        margin-top: 5;
    }
    @media only screen and (max-width: 500px) {
        font-size: 8px;
        margin-top: 2.5px;
    }
`;

export default AlbumThumbnail;