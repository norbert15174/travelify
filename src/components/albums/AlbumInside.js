import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from 'react-router-dom';
import PhotoSection from "../photos/PhotoSection";
import Button from "../trinkets/Button";
import ButtonIcon from "../trinkets/ButtonIcon";
import localizationIcon from "./assets/localizationIcon.svg";
import descriptionIcon from "./assets/descriptionIcon.svg";
import editIcon from "./assets/editIcon.svg";
import shareIcon from "./assets/shareIcon.svg";
import publicAlbumBlueIcon from "./assets/publicAlbumBlueIcon.svg";
import privateAlbumBlueIcon from "./assets/privateAlbumBlueIcon.svg";
import Map from '../googleMaps/Map';
import SharePinBox from "./SharePinBox";
import Carousel from "../photos/Carousel";
import profilePhoto from "./assets/profilePhoto.png";
import { FriendsListArray as album } from "./data";
import { SliderData as photos } from "./data";
import { routes } from "../../miscellanous/Routes";
import { useSelector } from "react-redux";

const types = {
    albumType: "private", // public, private
    visibility: "owner", // owner, shared, unknown
}

const AlbumInside = ({albumId}) => {

    // map options
    const options = {
        disableDefaultUI: true, // disables little yellow guy and satellite view
        zoomControl: true, // enables zoom in/out tool
        gestureHandling: "greedy", // "none" < "cooperative" < "greedy"
        minZoom: 2, 
    };

    const [ sharePinBox, setSharePinBox ] = useState(false);
    const [ photoPreview, setPhotoPreview ] = useState({visible: false, id: null});

    const [ redirectToAlbums, setRedirectToAlbums ] = useState(false);
    const [ redirectToAlbumsCreator, setRedirectToAlbumsCreator ] = useState({
       active: false,
       albumId: null,
    })

    const blurState = useSelector((state) => state.blur.value)

    // goes back to albums screen
    if (redirectToAlbums) {
        return <Redirect to={{pathname: routes.albums}}/>
    }

    // goes to album edit screen
    if (redirectToAlbumsCreator.active) {
        return <Redirect to={{pathname: routes.albumCreator, state: {creatorType: "edition", albumId: redirectToAlbumsCreator.albumId}}}/>
    }

    return (
        <>
            { photoPreview.visible && <Carousel photoId={photoPreview.id} photos={photos} setClose={setPhotoPreview}/> }
            { sharePinBox && <SharePinBox setClose={setSharePinBox}/> }
            { /* tutaj będzie wyświetlane zdjęcie :D */ }
            <Container blurState={blurState}>
                <Details>
                    <Header>
                        <h1>Wycieczka do Japonii, Sierpień 2018</h1>
                        <GoBackButton onClick={() => setRedirectToAlbums(true)}>Wróć</GoBackButton>
                        <Localization>
                            <Icon src={localizationIcon}/>
                            <h3>
                                Japonia, Osaka
                            </h3>
                        </Localization>
                    </Header>
                    <MapContainer>
                        <Map 
                            width={"100%"} 
                            height={"100%"} 
                            options={options} 
                            initialCoordinates={{
                                lat: album.list[0].position.lat, 
                                lng: album.list[0].position.lng,
                            }}
                            type="AlbumInside"
                        />
                    </MapContainer>
                    <Description>
                        <Icon src={descriptionIcon}/>
                        <Text>
                            Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        </Text>
                    </Description>
                    <div>
                        <Line/>
                        <Footer>
                            <AlbumInfo>
                                <ProfilePhoto src={profilePhoto}/>
                                <p>Jan Nowak</p>   
                            </AlbumInfo>
                            <AlbumInfo>
                                <Icon src={ types.albumType === "public" ? publicAlbumBlueIcon : privateAlbumBlueIcon }/>
                                { types.albumType === "public" ? <p>Publiczny</p> : <p>Prywatny</p> }
                            </AlbumInfo>
                            <Buttons>
                                { types.visibility === "owner" && types.albumType === "private" && <TypeSpecifiedButton icon={shareIcon} onClick={() => setSharePinBox(true)}>Udostępnij</TypeSpecifiedButton> }
                                { types.visibility === "owner" && <TypeSpecifiedButton icon={editIcon} onClick={() => setRedirectToAlbumsCreator({active: true, albumId: albumId})}>Edytuj album</TypeSpecifiedButton> }
                            </Buttons>
                        </Footer>
                    </div>
                </Details>
                <PhotoSection photos={photos} setPreview={setPhotoPreview}/>
            </Container>
        </>
    );
}

const Container = styled.div`
    filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    display: grid;
    grid-template-rows: repeat(2, auto);
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
        grid-row-gap: 10px;
        width: 300px;
    }
`;

const MapContainer = styled.div`
    width: 1436px; // 4px zabrane na border 
    border: 2px solid ${({theme}) => theme.color.lightTurquise};
    display: inline-block;
    border-radius: 15px;
    overflow: hidden;
    @media only screen and (max-width: 1635px) {
        width: 1236px;
    }
    @media only screen and (max-width: 1425px) {
        width: 1036px;
    }
    @media only screen and (max-width: 1225px) {
        width: 836px;
    }
    @media only screen and (max-width: 1025px) {
        width: 636px;
    }
    @media only screen and (max-width: 825px) {
        width: 436px;
    }
    @media only screen and (max-width: 510px) {
        width: 256px;
    }
`;

const Details = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
    padding: 20px 30px 30px 30px;
    border-radius: 0px 0px 15px 15px;
    display: grid;
    grid-template-rows: auto 580px auto 1fr;
    grid-row-gap: 15px;
    @media only screen and (max-width: 1635px) {
        grid-template-rows: auto 580px auto 1fr;    
    }
    @media only screen and (max-width: 1425px) {
        grid-template-rows: auto 580px auto 1fr;    
    }
    @media only screen and (max-width: 1225px) {
        grid-template-rows: auto 580px auto 1fr;    
    }
    @media only screen and (max-width: 1025px) {
        grid-template-rows: auto 480px auto 1fr;       
    }
    @media only screen and (max-width: 825px) {
        padding-bottom: 20px;
        grid-template-rows: auto 380px auto 1fr;    
    }
    @media only screen and (max-width: 510px) {
        padding: 10px 20px;
        grid-template-rows: auto 200px auto 1fr;    
    }
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 60% 1fr;
    grid-template-rows: repeat(2, min-content);
    align-items: flex-start;
    font-size: 27px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1025px) {
        font-size: 18px;       
    }
    @media only screen and (max-width: 510px) {
        font-size: 12px;
    }  
`;

const GoBackButton = styled(Button)`
    border-radius: 5px;
    justify-self: flex-end;
    width: 125px;
    padding: 0px;
    font-size: 27px;
    @media only screen and (max-width: 1025px) {
        font-size: 18px;
        width: 80px;
        height: 30px;       
    }
    @media only screen and (max-width: 570px) {
        margin-right: 35px;
    }
    @media only screen and (max-width: 510px) {
        margin-right: 0px;
        font-size: 12px;
        width: 60px;
    }
`;

const Localization = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 30px;
    margin-top: 5px;
    @media only screen and (max-width: 1025px) {
        font-size: 24px;     
    }
    @media only screen and (max-width: 510px) {
        font-size: 12px;
    }  
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 15px;
    @media only screen and (max-width: 1025px) {
        width: 30px;
        height: 30px;
        margin-right: 10px;    
    }
    @media only screen and (max-width: 825px) {
        width: 20px;
        height: 20px;
    }
    @media only screen and (max-width: 510px) {
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }  
`;

const Description = styled.div`
    display: flex;
    flex-direction: row;
`;

const Text = styled.p`
    font-size: 24px;
    margin-top: 4px;
    @media only screen and (max-width: 1025px) {
        font-size: 18px; 
    }
    @media only screen and (max-width: 825px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 510px) {
        font-size: 8px;
        margin-top: 2px;
    }
`;

const Footer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AlbumInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24px;
    margin-top: 5px;
    margin-right: 25px;
    @media only screen and (max-width: 1025px) {
        font-size: 18px; 
    }
    @media only screen and (max-width: 825px) {
        font-size: 12px;
        margin-right: 15px;
    }
    @media only screen and (max-width: 510px) {
        font-size: 8px;
        margin-right: 10px;
    }
`;

const ProfilePhoto = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    @media only screen and (max-width: 1025px) {
        width: 30px;
        height: 30px;
    }
    @media only screen and (max-width: 825px) {
        width: 20px;
        height: 20px;
    }
    @media only screen and (max-width: 510px) {
        width: 15px;
        height: 15px;
        margin-right: 5px;
    }
`;

const Line = styled.div`
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
`;

const Buttons = styled.div`
    margin: 0 0 0 auto;
    display: grid;
    grid-template-columns: repeat(2, auto);
`;

const TypeSpecifiedButton = styled(ButtonIcon)`
    margin: 0px 0px 0px 25px;
    width: 160px;
    height: 40px;
    border-radius: 5px;
    color: ${({theme}) => theme.color.lightBackground};
    font-size: 18px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    padding-left: 25px;
    background-image: url(${({icon}) => icon});
    background-position: 8% 50%;
    background-size: 15%;
    @media only screen and (max-width: 1025px) {
        font-size: 12px;
        width: 100px;
        height: 30px;
        margin-left: 15px;
    }
    @media only screen and (max-width: 825px) {
        font-size: 10px;
        background-size: 12%;
        padding-left: 15px;
        width: 80px;
        height: 25px;
        margin-left: 10px;
    }
    @media only screen and (max-width: 510px) {
        background-size: 10px;
        margin-left: 5px;
        font-size: 0px;
        height: 20px;
        width: 20px;
        background-position: 50% 50%;
    }
    &:hover, &:focus {
        background-color: ${({theme}) => theme.color.lightTurquise};
    }
`;

export default AlbumInside;