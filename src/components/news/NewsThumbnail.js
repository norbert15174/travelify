import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import styled from "styled-components";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";

const NewsThumbnail = ({news}) => {
    
    const [ redirectToAlbumDetails, setRedirectToAlbumDetails ] = useState();

    if (redirectToAlbumDetails) {
        return <Redirect push to={{
                            pathname: routes.album.replace(/:id/i, news.id), 
                        }}
                />
    }

    return (
        <Container onClick={() => setRedirectToAlbumDetails(true)}>
            <MainPhoto src={news.mainPhoto !== undefined ? news.mainPhoto : noAlbumPhotoIcon} alt="albumMainPhoto"/>
            <Info>
                <Text>
                    <InfoHeader>
                        <Title>{news.name}</Title>
                        <Localization>{news.coordinate.place + ", " + news.coordinate.country.country}</Localization>
                    </InfoHeader>
                    <Description>
                        {news.description}
                    </Description>
                </Text>
            </Info>
        </Container>
    )
    
};

const Container = styled.div`
    width: 100%;
    height: 500px;
    position: relative;
    @media only screen and (max-width: 1100px) {
        height: 400px;
    }
    @media only screen and (max-width: 800px) {
        height: 240px;
    }
    @media only screen and (max-width: 500px) {
        height: 200px;
    }
`;

const MainPhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
`;

const Info = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0%;
    background: rgba(229, 229, 229, 0.8);
    border-radius: 0px 0px 5px 5px;
    height: 120px;
    @media only screen and (max-width: 1100px) {
        height: 90px;
    }
    @media only screen and (max-width: 800px) {
        height: 70px;
    }
    @media only screen and (max-width: 500px) {
        height: 65px;
    }    
`;

const Text = styled.div`
    padding: 10px 20px;
    @media only screen and (max-width: 800px) {
        padding: 5px 10px;
    }
`;

const InfoHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
`;

const Title = styled.h1`
    font-size: 40px;    
    display: inline-block;
    @media only screen and (max-width: 1100px) {
        font-size: 30px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 20px;
    }
`;

const Localization = styled.h2`
    font-size: 30px;
    justify-self: end;
    @media only screen and (max-width: 1100px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 10px;
    }
`;

const Description = styled.p`
    margin-top: 5px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    @media only screen and (max-width: 1100px) {
        font-size: 12px;
        -webkit-line-clamp: 2;
    }
    @media only screen and (max-width: 800px) {
        -webkit-line-clamp: 3;
        margin-top: 2.5px;
        font-size: 9px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 8px;
    }
`;

export default NewsThumbnail;