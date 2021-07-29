import React from "react";
import styled from "styled-components";
import ButtonIcon from "../trinkets/ButtonIcon";
import editIcon from "./assets/editIcon.svg";

// redirectTo => set states redirect to album

const AlbumThumbnail = ({album, shared, redirectTo}) => (
    <Container onClick={redirectTo}>
        <MainPhoto src={album.image} alt="albumMainPhoto"/>
        { !shared && <EditButton icon={editIcon} onClick={() => {console.log("klikłem")}}/> }
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

const EditButton = styled(ButtonIcon)`
    background-size: 80%;
    border-radius: 5px;
    width: 45px;
    height: 45px;
    position: absolute;
    background-position: center;
    left: 91%;
    top: 3%;
    margin: 0;
    @media only screen and (max-width: 1425px) {
        left: 89%;
    }
    @media only screen and (max-width: 1225px) {
        left: 87%;
    }
    @media only screen and (max-width: 1025px) {
        width: 30px;
        height: 30px;
    }
    @media only screen and (max-width: 825px) {
        left: 91%;
    }
    @media only screen and (max-width: 510px) {
        left: 90%;
        width: 20px;
        height: 20px;
    }
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
    @media only screen and (max-width: 1625px) {
        font-size: 30px;
    }
    @media only screen and (max-width: 1225px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 1025px) {
       font-size: 16px;   
    }
    @media only screen and (max-width: 510px) {
        font-size: 10px;
        padding-right: 10px;
    }
`;

const ProfilePhoto = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 10px;
    border: 2px solid ${({theme}) => theme.color.lightTurquise };
    @media only screen and (max-width: 1625px) {
        width: 50px;
        height: 50px;    
    }
    @media only screen and (max-width: 1225px) {
        width: 40px;
        height: 40px;    
    }
    @media only screen and (max-width: 1025px) {
        width: 30px;
        height: 30px;   
    }
    @media only screen and (max-width: 510px) {
        width: 20px;
        height: 20px;
        margin-right: 5px;   
    }
`;

const Text = styled.div`
    padding: 10px 20px;
    @media only screen and (max-width: 1425px) {
        padding: 10px 15px;
    }
    @media only screen and (max-width: 510px) {
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
    @media only screen and (max-width: 1425px) {
        font-size: 28px;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 22px;
    }
    @media only screen and (max-width: 510px) {
        font-size: 12px;
    }
`;

const Localization = styled.h2`
    font-size: 18px;
    justify-self: end;
    @media only screen and (max-width: 1425px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 735px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 510px) {
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
    @media only screen and (max-width: 1425px) { 
        margin-top: 10px;
        -webkit-line-clamp: 5;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 10px;
        margin-top: 5px;
        -webkit-line-clamp: 4;
    }
    @media only screen and (max-width: 510px) {
        font-size: 8px;
        margin-top: 2.5px;
        -webkit-line-clamp: 3;
    }
`;

export default AlbumThumbnail;