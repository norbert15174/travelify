import React from "react";
import styled from "styled-components";
import FoundAlbumThumbnail from "./FoundAlbumThumbnail";
import FoundPersonThumbnail from "./FoundPersonThumbnail";
import { FriendsListArray as data } from "./data";
import "./searchScrollbar.css";

const FoundItems = ({searchType, foundItems}) => {

    return (
        <Container>
            <Header>
                { searchType === "albums" ? <h1>Znalezione albumy</h1> : <h1>Znalezione osoby</h1> }
            </Header>
            <Line/>
            {
                searchType === "albums" ?
                <AlbumGrid className="scroll">
                {
                    data.list.map((album) => 
                        <FoundAlbumThumbnail
                            key={album.id}
                            album={album}
                            redirectTo={() => null}
                        />
                    )  
                }
                </AlbumGrid> 
                :
                <PeopleGrid className="scroll">
                {
                    data.list.map((person) => 
                        <FoundPersonThumbnail person={person}/>
                    )  
                }    
                </PeopleGrid>
            }
        </Container>
    );

}

const Container = styled.div`
    height: 100%;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 25px;
    @media only screen and (max-width: 500px) {
        padding: 15px 20px;
    }
`;

const Header = styled.div`
    font-size: 17px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1100px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 8px;
    }
`;

const Line = styled.div`
    margin-top: 10px;
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
`;

const AlbumGrid = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: repeat(2, 550px);
    grid-gap: 25px;
    margin-top: 30px;
    max-height: 500px;
    overflow-y: scroll;
    @media only screen and (max-width: 1400px) {
        grid-template-columns: repeat(2, 400px);
    }
    @media only screen and (max-width: 1100px) {
        grid-template-columns: repeat(2, 255px);
        grid-gap: 20px;
        margin-top: 25px;
    }
    @media only screen and (max-width: 800px) {
        max-height: 550px;
        grid-auto-rows: 203px;
        grid-gap: 0px;
        grid-row-gap: 25px;
        margin-top: 20px;
        grid-template-columns: 330px;
    }
    @media only screen and (max-width: 500px) {
        max-height: 575px;
        grid-auto-rows: 153px;
        grid-gap: 0px;
        grid-row-gap: 25px;
        margin-top: 15px;
        grid-template-columns: 245px;
    }
`;

const PeopleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 535px);
    grid-template-rows: 100px;
    grid-gap: 25px;
    margin-top: 30px;
    max-height: 500px;
    overflow-y: scroll;
    @media only screen and (max-width: 1400px) {
        grid-template-columns: repeat(2, 385px);
        grid-template-rows: 80px;
    }
    @media only screen and (max-width: 1100px) {
        grid-template-columns: repeat(2, 235px);
        grid-template-rows: 60px;
        grid-gap: 20px;
        margin-top: 25px;
    }
    @media only screen and (max-width: 800px) {
        max-height: 550px;
        grid-template-rows: 50px;
        grid-gap: 0px;
        grid-row-gap: 15px;
        margin-top: 20px;;
        grid-template-columns: none;
    }
    @media only screen and (max-width: 550px) {
        max-height: 575px;
    }
    @media only screen and (max-width: 500px) {
       margin-top: 15px;
    }
`

export default FoundItems;