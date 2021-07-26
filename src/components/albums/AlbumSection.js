import React from "react";
import styled from "styled-components";
import Button from "../trinkets/Button";
import addAlbumIcon from "./assets/addAlbumIcon.svg";
import AlbumThumbnail from "./AlbumThumbnail";
import "./scrollbar.css";

const AlbumSection = ({sectionType, data}) => {

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
                    sectionType !== "shared" && <AddButton>Stwórz album</AddButton> 
                }
            </Header>
            <Line/>
            <AlbumGrid className="scroll">    
            {
                data 
                && sectionType === "public" 
                && data.list.map((album) => 
                    <AlbumThumbnail album={album}/>
                ) 
            }
            {
                data 
                && sectionType === "private" 
                && data.list.map((album) => 
                    <AlbumThumbnail album={album}/>
                ) 
            }
            {
                data 
                && sectionType === "shared" 
                && data.list.map((album) => 
                    <AlbumThumbnail shared={true} album={album}/>
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
`;

const Header = styled.div`
    width: 100%;
    color: ${({theme}) => theme.color.greyFont};
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 45px;
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
`;

const Line = styled.div`
    margin-top: 10px;
    border: 1px solid ${({theme}) => theme.color.darkTurquise};
`;

const AlbumGrid = styled.div`
    display: grid;
    margin: 35px 0px 15px 0px;
    align-content: start;
    grid-template-columns: repeat(2, 690px);
    grid-gap: 30px;
    max-height: 1000px;
    overflow-y: scroll;
`;

export default AlbumSection;