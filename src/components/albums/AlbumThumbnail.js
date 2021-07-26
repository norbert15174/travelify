import React from "react";
import styled from "styled-components";
import ButtonIcon from "../trinkets/ButtonIcon";
import editIcon from "./assets/editIcon.svg";

const AlbumThumbnail = ({album, shared}) => (
    <>  
        <Container>
            <MainPhoto src={album.image} alt="albumMainPhoto"/>
            { !shared && <EditButton icon={editIcon}/> }
            { shared && 
                <SharingPerson>
                    <ProfilePhoto src={album.url}/>
                    <h3>{album.name}</h3>
                </SharingPerson> 
            }
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
    </>
);

const Container = styled.div`
    width: 100%;
    position: relative;
`;

const MainPhoto = styled.img`
    width: 100%;
    height: 100%;
`;

const InfoContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0%;
    background: rgba(229, 229, 229, 0.8);
`;

const EditButton = styled(ButtonIcon)`
    background-size: 80%;
    border-radius: 5px;
    width: 45px;
    height: 45px;
    position: absolute;
    left: 91%;
    top: 3%;
    margin: 0;
`;

const SharingPerson = styled.div`
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
    font-size: 34px;
`;

const ProfilePhoto = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 10px;
    border: 2px solid ${({theme}) => theme.color.lightTurquise };
`;

const Text = styled.div`
    padding: 10px 20px;
    @media only screen and (max-width: 1440px) {
        padding: 10px 15px;
    }
    @media only screen and (max-width: 560px) {
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
    @media only screen and (max-width: 1440px) {
        font-size: 28px;
    }
    @media only screen and (max-width: 735px) {
        font-size: 22px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 410px) {
        font-size: 12px;
    }
`;

const Localization = styled.h2`
    font-size: 18px;
    justify-self: end;
    @media only screen and (max-width: 1440px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 735px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 410px) {
        font-size: 8px;
    }
`;

const Description = styled.p`
    margin-top: 15px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    @media only screen and (max-width: 1440px) { 
        margin-top: 10px;
        -webkit-line-clamp: 5;
    }
    @media only screen and (max-width: 735px) {
        font-size: 10px;
        margin-top: 5px;
        -webkit-line-clamp: 4;
    }
    @media only screen and (max-width: 560px) {
        font-size: 8px;
        margin-top: 3px;
    }
    @media only screen and (max-width: 410px) {
        margin-top: 0px;
    }
`;

export default AlbumThumbnail;