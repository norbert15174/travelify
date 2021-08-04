import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect, useLocation } from "react-router-dom";
import Button from "../trinkets/Button";
import UserTemplate from "../../templates/UserTemplate";
import { routes } from "../../miscellanous/Routes";
import infoIcon from "./assets/infoIcon.svg";
import localizationIcon from "./assets/localizationIcon.svg";
import photoIcon from "./assets/photoIcon.svg";
import deleteAlbumIcon from "./assets/deleteAlbumIcon.svg";
import BasicInfo from "./BasicInfo";
import Localization from "./Localization";
import Photos from "./Photos";
import DeleteAlbum from "./DeleteAlbum";
import { useSelector } from "react-redux";
import ConfirmationBox from "../trinkets/ConfirmationBox";

const creatorType = {
    creation: "creation",
    edition: "edition",
}

const AlbumCreator = () => {

    const [ type, setType ] = useState("");
    const [ albumId, setAlbumId ] = useState(null);
    
    const [ confirmDeletingAlbum, setConfirmDeletingAlbum ] = useState(false);
    const [ refuseDeletingAlbum, setRefuseDeletingAlbum ] = useState(false);
    const [ deleteBox, setDeleteBox ] = useState(false);
    
    const blurState = useSelector((state) => state.blur.value);

    // BasicInfo submitted data, used at album creation, at editing it won't be used
    const [ basicInfo, setBasicInfo ] = useState({
        name: "",
        description: "",
        visibility: "",
        shared: [],
    });

    // Localization submitted data, used at album creation, at editing it won't be used
    const [ localization, setLocalization ] = useState({
        lat: "",
        lng: "",
        country: "",
        place: "",
    });
    
    // there is no need for a state with photos

    // hook for retrieving passed props at Redirect
    const location = useLocation();

    useEffect(() => {

        // checking if album will be edited or created, setting albumId we are editing
        if (type === "") {
            setType(location.state.creatorType);
        }
        if (creatorType.edition === type) {
            setAlbumId(location.state.albumId);
            if (confirmDeletingAlbum) {
                console.log("Album has been deleted!");
                setDeleteBox(false);
                setConfirmDeletingAlbum(false);
            }
            if (refuseDeletingAlbum) {
                console.log("Album hasn't been deleted!");
                setDeleteBox(false);
                setRefuseDeletingAlbum(false);
            }
        }
        //console.log("creatorType: " + type + " albumId: " + albumId);


        


    }, [albumId, type, location.state.creatorType, location.state.albumId, confirmDeletingAlbum, refuseDeletingAlbum]);
    
    const [ redirectToAlbums, setRedirectToAlbums ] = useState(false);
    const [ redirectBackToAlbum, setRedirectBackToAlbum ] = useState(false);

    if (redirectToAlbums) {
        return <Redirect to={{pathname: routes.albums}}/>
    }

    if (redirectBackToAlbum) {
        return <Redirect to={{pathname: `album/${albumId}`}}/>
    }

    // formHandler będzie wykorzystywany tylko przy tworzeniu albumu
    const formHandler = () => { 
        console.log(basicInfo); 
        console.log(localization);
    }

    return (
        <UserTemplate>
            {deleteBox && type === creatorType.edition && <ConfirmationBox children={"Czy na pewno chcesz usunąć album?"} confirm={setConfirmDeletingAlbum} refuse={setRefuseDeletingAlbum}/>}
            <Container blurState={blurState}>
                <PageHeader>
                    <Heading>
                        { type === creatorType.creation ? "Stwórz album" : "Edytuj album" }
                    </Heading>
                    <GoBackButton onClick={() => {
                        if ( type === "creation") {
                            setRedirectToAlbums(true);
                        } else if ( type === "edition" ) {
                            setRedirectBackToAlbum(true);
                        }
                    }}>
                        Wróć
                    </GoBackButton>
                </PageHeader>
                <SectionContainer>
                    <Header>
                        <Icon src={infoIcon}/>
                        <h1>Podstawowe informacje</h1>
                    </Header>
                    <BasicInfo creatorType={type} setForm={setBasicInfo}/>
                </SectionContainer>
                <SectionContainer>
                    <Header>
                        <Icon src={localizationIcon}/>
                        <h1>Lokalizacja</h1>
                    </Header>
                    <Localization creatorType={type} setForm={setLocalization}/>
                </SectionContainer>
                {
                    type === creatorType.edition
                    &&
                    <SectionContainer>
                        <Header>
                            <Icon src={photoIcon}/>
                            <h1>Zdjęcia</h1>
                        </Header>
                        <Photos/>
                    </SectionContainer>
                }
                {
                    type === creatorType.creation
                    &&
                    (basicInfo.name !== "" &&
                    localization.lat !== "" &&
                    localization.place !== "")
                    && 
                    <SectionContainer>
                        <End>
                            <Line/>
                            <StyledButton
                                type="submit" 
                                onClick={formHandler}
                            >
                                Stwórz album
                            </StyledButton>
                            <Line/>
                        </End>
                    </SectionContainer>
                }
                {
                    type === creatorType.edition &&
                    <SectionContainer>
                        <Header>
                            <Icon src={deleteAlbumIcon}/>
                            <h1>Usuń album</h1>
                        </Header>
                        <DeleteAlbum setDeleteBox={setDeleteBox}/>
                    </SectionContainer>
                }
            </Container>
        </UserTemplate>
    );

}

const Container = styled.div`
    width:  90%;
    margin: 0 auto; 
    display: grid;
    grid-auto-rows: auto;
    grid-row-gap: 15px;
    min-width: 390px;
    margin-bottom: 15px;
    filter: ${({blurState}) => blurState === true ? "blur(8px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(8px)" : "none" };
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
    @media only screen and (max-width: 480px) {
        height: 50px;
    }
    @media only screen and (max-width: 360px) {
        height: 40px;
    }
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
`;

const GoBackButton = styled(Button)`
    justify-self: end;
    margin-right: 25px;
    border-radius: 5px;
    text-align: center;
    width: auto;
    font-size: 28px;
    height: 42px;
    padding: 0 20px;
    @media only screen and (max-width: 870px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 735px) {
        font-size: 12px;
        height: 30px;
    }
    @media only screen and (max-width: 720px) {
        margin-right: 65px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 10px;
        padding: 0 10px;
        height: 25px;
    }
    @media only screen and (max-width: 360px) {
        font-size: 8px;
        padding: 0 5px;
    }
`;

const Header = styled.div`
    color: ${({theme}) => theme.color.greyFont};
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    @media only screen and (max-width: 1220px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 870px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 9px;
    }
`;

const Icon = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 15px;
    @media only screen and (max-width: 1220px) {
        width: 50px;
        height: 50px;
    } 
    @media only screen and (max-width: 870px) {
        width: 40px;
        height: 40px;
    }
    @media only screen and (max-width: 560px) {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
`;

const SectionContainer = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground};
    border-radius: 15px;
    padding: 20px 40px;
    grid-template-rows: repeat(2, auto);
    @media only screen and (max-width: 1440px) {
        padding: 20px;
    }
    @media only screen and (max-width: 870px) {
        padding: 15px;
    }
    @media only screen and (max-width: 560px) {
        padding: 10px;
    }
`;

const End = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const StyledButton = styled(Button)`
    width: 150px;
    padding: 5px 15px;
    margin: 0px 15px 0px 15px;
`;

const Line = styled.div`
    width: 40%;
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
`;

export default AlbumCreator;