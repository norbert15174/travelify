import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import styled from "styled-components";
import Button from "../trinkets/Button";
import addAlbumIcon from "./assets/addAlbumIcon.svg";
import AlbumThumbnail from "./AlbumThumbnail";
import { routes } from "../../miscellanous/Routes";
import "./scrollbar.css";

const AlbumSection = ({ sectionType, data }) => {

    // data for album thumbnails should be passed from above

    const [ redirectToAlbum, setRedirectToAlbum ] = useState({
        active: false, 
        albumId: "",
    });
    const [ redirectToCreator, setRedirectToCreator ] = useState(false);

    if (redirectToAlbum.active) {
        return <Redirect to={{pathname: `album/${redirectToAlbum.albumId}`, state: {albumId: redirectToAlbum.albumId}}}/>
    }

    // tworzenie albumu
    if (redirectToCreator) {
        return <Redirect to={{pathname: routes.albumCreator, state: {creatorType: "creation"}}}/>
    }

    return ( 
        <Container>
            <Header>
                {
                    sectionType === "public" && <h1>Publiczne</h1>
                }
                {
                    sectionType === "private" && <h1>Prywatne</h1>
                }
                {
                    sectionType === "shared" && <h1>Udostępnione dla ciebie</h1>
                }
                { 
                    sectionType !== "shared" && <AddButton onClick={() => setRedirectToCreator(true)}>Stwórz album</AddButton> 
                }
            </Header>
            <Line/>
            <AlbumGrid className="scroll">    
            {
                data 
                && sectionType === "public" 
                && data.list.map((album) => 
                    <AlbumThumbnail
                        key={album.id} 
                        album={album} 
                        redirectTo={() => setRedirectToAlbum({
                            active: true, 
                            albumId: album.id
                        })}
                    />
                ) 
            }
            {
                data 
                && sectionType === "private" 
                && data.list.map((album) => 
                    <AlbumThumbnail
                        key={album.id} 
                        album={album} 
                        redirectTo={() => setRedirectToAlbum({
                            active: true, 
                            albumId: album.id
                         })}
                    />
                ) 
            }
            {
                data 
                && sectionType === "shared" 
                && data.list.map((album) => 
                    <AlbumThumbnail
                        shared={true}
                        key={album.id} 
                        album={album} 
                        redirectTo={() => setRedirectToAlbum({
                            active: true, 
                            albumId: album.id
                        })}
                    />
                ) 
            }
            </AlbumGrid>
        </Container>
    );

}

const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    font-size: 17px;
    margin-bottom: 15px;
    padding: 20px 25px;
    @media only screen and (max-width: 825px) {
        font-size: 12px;
        padding: 15px 20px;
    }
    @media only screen and (max-width: 510px) {
        font-size: 8px;
        padding: 10px 20px;
    }
`;

const Header = styled.div`
    color: ${({theme}) => theme.color.greyFont};
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 45px;
    @media only screen and (max-width: 825px) {
        height: 30px;
    }
`;

const AddButton = styled(Button)`
    margin: 0 0 0 auto;
    border-radius: 5px;
    width: 200px;
    font-size: 24px;
    background-image: url(${addAlbumIcon});
    background-repeat: no-repeat;
    background-position: 90% 50%;
    background-size: 20px;
    padding-right: 30px;
    @media only screen and (max-width: 1225px) {
        font-size: 18px;
        background-size: 15px;
        padding-right: 15px;
        width: 150px;
    }
    @media only screen and (max-width: 825px) {
        font-size: 12px;
        background-size: 10px;
        width: 100px;
        height: 30px;
    }
    @media only screen and (max-width: 510px) {
        height: 20px;
        width: 80px;
        font-size: 8px;
    }
`;

const Line = styled.div`
    margin-top: 10px;
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
    @media only screen and (max-width: 510px) {
        margin-top: 5px;
    }
`;

const AlbumGrid = styled.div`
    display: grid;
    margin: 35px 0px 15px 0px;
    align-content: start;
    grid-template-columns: repeat(2, 690px);
    grid-gap: 30px;
    max-height: 1000px;
    overflow-y: scroll;
    @media only screen and (max-width: 1635px) {
        grid-template-columns: repeat(2, 590px);
    }
    @media only screen and (max-width: 1425px) {
        grid-template-columns: repeat(2, 490px);
    }
    @media only screen and (max-width: 1225px) {
        grid-template-columns: repeat(2, 390px);
    }
    @media only screen and (max-width: 1025px) {
        grid-template-columns: repeat(2, 290px);
    }
    @media only screen and (max-width: 825px) {
        margin-top: 20px;
        grid-template-columns: 420px;
        grid-auto-rows: 282px;
    }
    @media only screen and (max-width: 510px) {
        grid-template-columns: 240px;
        grid-auto-rows: 162px;
        grid-gap: 10px;
        margin-top: 10px;
    }
`;

export default AlbumSection;