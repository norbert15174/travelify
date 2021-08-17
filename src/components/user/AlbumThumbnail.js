import React from "react";
import styled from "styled-components";

const AlbumThumbnail = ({album}) => (
    <>  
        <Container>
            <MainPhoto src={album.image} alt="albumMainPhoto"/>
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
    object-fit: cover;
`;

const InfoContainer = styled.div`
    width: 100%;
    height: 158px;
    position: absolute;
    bottom: 0%;
    background: rgba(229, 229, 229, 0.8);
    @media only screen and (max-width: 1440px) {
        height: 112px;
    }
    @media only screen and (max-width: 1080px) {
        height: 150px;
    }
    @media only screen and (max-width: 830px) {
        height: 138px;
    }
    @media only screen and (max-width: 735px) {
        height: 120px;
    }
    @media only screen and (max-width: 560px) {
        height: 85px;
    }
    @media only screen and (max-width: 410px) {
        height: 68px;
    }
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
        -webkit-line-clamp: 4;
    }
    @media only screen and (max-width: 1080px) {
        -webkit-line-clamp: 6;
    }
    @media only screen and (max-width: 830px) {
        -webkit-line-clamp: 5;
    }
    @media only screen and (max-width: 735px) {
        font-size: 10px;
        margin-top: 5px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 8px;
        margin-top: 3px;
    }
    @media only screen and (max-width: 410px) {
        
        -webkit-line-clamp: 4;
    }
`;

export default AlbumThumbnail;