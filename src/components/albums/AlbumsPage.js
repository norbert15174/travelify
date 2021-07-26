import React, { useState } from "react";
import styled from "styled-components";
import { FriendsListArray as albums } from "./data";
import AlbumSearch from "../trinkets/DropdownSearch";
import publicAlbumIcon from "./assets/publicAlbumIcon.svg";
import privateAlbumIcon from "./assets/privateAlbumIcon.svg";
import sharedAlbumIcon from "./assets/sharedAlbumIcon.svg";
import AlbumSection from "./AlbumSection";

const types = {
    public: "public",
    private: "private",
    shared: "shared",
}

const AlbumsPage = () => {

     const [albumsType, setAlbumsType] = useState(types.public);

    const searchList = albums.list.map((item) => {
        return {
            value: item.title,
            label: item.title,
            title: item.title,
            mainPhoto: item.image,
            place: item.localization,
        }
    })

    return (
        <Container>
            <PageHeader>
                <Heading>Twoje albumy</Heading>
            </PageHeader>
            <AlbumsNavigation>
                <AlbumSearch options={searchList}/>
                <Line/>
                <AlbumsSwitch>
                    <AlbumOption 
                        icon={publicAlbumIcon}
                        active={albumsType === types.public ? true : false } 
                        onClick={() => setAlbumsType(types.public)}
                    >
                        Publiczne
                    </AlbumOption>
                    <AlbumOption 
                        icon={privateAlbumIcon}
                        active={albumsType === types.private ? true : false } 
                        onClick={() => setAlbumsType(types.private)}
                    >
                        Prywatne
                    </AlbumOption>
                    <AlbumOption 
                        icon={sharedAlbumIcon}
                        active={albumsType === types.shared ? true : false } 
                        onClick={() => setAlbumsType(types.shared)}
                    >
                        Udostępnione
                    </AlbumOption>
                </AlbumsSwitch>
            </AlbumsNavigation>
            <AlbumSection sectionType={albumsType} data={albums}/>
        </Container>
    );

}

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-row-gap: 15px;
    width: 1500px;
    margin: 0 auto; 
    min-width: 410px;
`;

const PageHeader = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
    height: 80px;
    border-radius: 0px 0px 15px 15px;
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
`;

const Heading = styled.h1`
    font-size: 54px;
    margin: 10px auto 10px 25px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 870px) {
        font-size: 46px;
    } 
    @media only screen and (max-width: 735px) {
        font-size: 40px;
        margin: 5px auto 5px 25px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 34px;
    }
    @media only screen and (max-width: 360px) {
        font-size: 24px;
        margin: 5px auto 5px 15px;
    }
`;

const AlbumsNavigation = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Line = styled.div`
    border: 1px solid ${({theme}) => theme.color.darkTurquise};
    width: 60%;
    margin: 25px auto 0 auto;
`;

const AlbumsSwitch = styled.div`
    margin: 25px auto 30px auto;
    font-size: 24px;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 5vw;
`;

const AlbumOption = styled.div`
    background: ${({active}) => active ? "rgba(18, 191, 206, 0.4)" : ""};
    -webkit-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
    border-radius: 15px;
    text-align: center;
    padding: 10px 20px 10px 80px;
    background-image: url(${({icon}) => icon}); 
    background-size: 34px;
    background-position: 10% 50%;
    background-repeat: no-repeat;
    cursor: pointer;
    @media only screen and (max-width: 720px) {
        background-size: 24px;
        padding: 5px 5px 5px 50px;
    }
`;

export default AlbumsPage;