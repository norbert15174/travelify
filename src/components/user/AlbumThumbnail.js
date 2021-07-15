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
`;

const InfoContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0%;
    background: rgba(229, 229, 229, 0.8);
`;

const Text = styled.div`
    padding: 10px 20px 10px 20px;
    
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
`;

const Title = styled.h1`
    font-size: 34px;    
    display: inline-block;
`;

const Localization = styled.h2`
    font-size: 18px;
    justify-self: end;
`;

const Description = styled.p`
    margin-top: 15px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
`;

export default AlbumThumbnail;