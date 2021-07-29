import React, { useState } from "react";
import styled from "styled-components";
import { FriendsListArray as albums } from "./data";
import AlbumSearch from "../trinkets/DropdownSearch";
import publicAlbumIcon from "./assets/publicAlbumIcon.svg";
import privateAlbumIcon from "./assets/privateAlbumIcon.svg";
import sharedAlbumIcon from "./assets/sharedAlbumIcon.svg";
import AlbumGrid from "./AlbumGrid";

const types = {
    public: "public",
    private: "private",
    shared: "shared",
}

const AlbumsPage = () => {

    const [albumsType, setAlbumsType] = useState(types.public);

    // album title, mainPhoto, place, ID WILL ALSO BE NEEDED 
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
            <AlbumGrid sectionType={albumsType} data={albums}/>
        </Container>
    );

}

//  <AlbumSection sectionType={albumsType} data={albums}/>

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-row-gap: 15px;
    width: 1500px;
    margin: 0 auto; 
    @media only screen and (max-width: 1635px) {
        width: 1300px;
    }
    @media only screen and (max-width: 1425px) {
        width: 1100px;
    }
    @media only screen and (max-width: 1225px) {
        width: 900px;
    }
    @media only screen and (max-width: 1025px) {
        width: 700px;
    }
    @media only screen and (max-width: 825px) {
        width: 500px;
    }
    @media only screen and (max-width: 510px) {
        width: 300px;
    }
`;

const PageHeader = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
    height: 80px;
    border-radius: 0px 0px 15px 15px;
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
    @media only screen and (max-width: 870px) {
        height: 70px;
    }
    @media only screen and (max-width: 735px) {
        height: 60px;
    }
    @media only screen and (max-width: 510px) {
        height: 40px;
    }
`;

const Heading = styled.h1`
    font-size: 54px;
    margin: auto auto auto 25px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 825px) {
        font-size: 46px;
    }
    @media only screen and (max-width: 735px) {
        font-size: 40px;
    }
    @media only screen and (max-width: 510px) {
        font-size: 24px;
        margin-left: 15px;
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
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
    width: 60%;
    margin: 25px auto 0 auto;
    @media only screen and (max-width: 1430px) {
        width: 70%
    }
    @media only screen and (max-width: 1220px) {
        width: 85%;
    }
    @media only screen and (max-width: 825px) {
        width: 80%;
    }
    @media only screen and (max-width: 510px) {
        width: 85%;
    }
`;

const AlbumsSwitch = styled.div`
    margin: 25px auto 30px auto;
    font-size: 24px;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 5vw;
    @media only screen and (max-width: 1025px) {
        font-size: 18px;
        grid-column-gap: 2.5vw;
    }
    @media only screen and (max-width: 825px) {
        font-size: 14px;
        grid-column-gap: 1vw;
    }
    @media only screen and (max-width: 510px) {
        margin: 20px auto;
        grid-column-gap: 0.75vw;
        font-size: 10px;
    }
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
    @media only screen and (max-width: 825px) {
        background-size: 28px;
        padding: 10px 10px 10px 45px;
    }
    @media only screen and (max-width: 510px) {
        background-size: 22px;
        padding: 10px 10px 10px 35px;
    }
`;

export default AlbumsPage;