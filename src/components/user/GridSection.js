import React, { useState } from "react";
import styled from "styled-components";
import AlbumThumbnail from "./AlbumThumbnail"
import FriendThumbnail from "./FriendThumbnail";
import Input from "../trinkets/Input";
import "./scrollbar.css";
import noResultsIcon from "./assets/noResultsIcon.svg";

const GridSection = ({data, sectionType}) => {

    // search field content
    const [searchContent, setSearchContent] = useState("");
    const [found, setFound] = useState([]);

    // albums are searched by title, friends by name of course
    const handleSearchBarChange = (e) => {
        setSearchContent(e.target.value);
        setFound(data.filter((item) => {
            return sectionType === "albums" 
                ? item.title.toLowerCase().includes(searchContent.toLowerCase()) 
                : item.name.toLowerCase().includes(searchContent.toLowerCase())
        }));
    };

    return (
        <Container>
            <Header>
                {
                    sectionType === "albums" ? <h1>Albumy</h1> : <h1>Znajomi</h1>
                }
                <Line/>
            </Header>
            <Search 
                autoComplete="off"
                name="search"
                id="search" 
                type="text" 
                search 
                placeholder="Szukaj"
                value={searchContent}
                onChange={handleSearchBarChange}
            />
            {
                sectionType === "albums" 
                ?
                <AlbumGrid className="scroll">
                {
                    ( 
                        searchContent.length !== 0 && found.length !== 0
                        ?
                        found.map((album) => 
                            <AlbumThumbnail album={album}/>)
                        :
                        null
                    ) || (
                        data.length !== 0 && searchContent.length === 0
                        ?
                        data.map((album) => 
                            <AlbumThumbnail album={album}/>)
                        :
                        null
                    ) || (
                        <NoResults/>
                    )
                } 
                </AlbumGrid>
                :
                <FriendsGrid className="scroll">
                {
                    ( 
                        searchContent.length !== 0 && found.length !== 0
                        ?
                        found.map((friend) => 
                            <FriendThumbnail friend={friend}/>)
                        :
                        null
                    ) || (
                        data.length !== 0 && searchContent.length === 0
                        ?
                        data.map((friend) => 
                            <FriendThumbnail friend={friend}/>)
                        :
                        null
                    ) || (
                        <NoResults/>
                    )
                }
                </FriendsGrid>
            }
            
        </Container>
    );

};

const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 25px;
    font-size: 17px;
    @media only screen and (max-width: 1080px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 8px;
        padding: 15px 20px;
    }
`;

const Header = styled.div`
    width: 100%;
    color: ${({theme}) => theme.color.greyFont};
`;

const Line = styled.div`
    margin-top: 10px;
    border: 1px solid ${({theme}) => theme.color.darkTurquise};
`;


const Search = styled(Input)`
    width: 490px;
    margin: 20px 0 25px 30px;
    @media only screen and (max-width: 1440px) {
        width: 320px;
    }
    @media only screen and (max-width: 1080px) {
        width: 480px;
        margin: 20px 0;
    }
    @media only screen and (max-width: 830px) {
        width: 430px;
        margin: 15px 0;
        padding: 5px 5px 5px 35px;
    }
    @media only screen and (max-width: 735px) {
        width: 400px;
    }
    @media only screen and (max-width: 560px) {
        width: 260px;
        font-size: 8px;
    }
    @media only screen and (max-width: 410px) {
        width: 210px;
    }
`;

const AlbumGrid = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: repeat(2, 550px);
    grid-gap: 30px;
    margin-left: 30px;
    max-height: 1000px;
    overflow-y: scroll;
    @media only screen and (max-width: 1440px) {
        grid-template-columns: repeat(2, 380px);
    }
    @media only screen and (max-width: 1080px) {
        grid-template-columns: none;
        grid-column-gap: 5px;
        grid-auto-rows: auto;
        grid-gap: 25px;
        margin-left: 0px;
    }
`;

const FriendsGrid = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: repeat(2, 550px);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    margin-left: 30px;
    max-height: 1000px;
    overflow-y: scroll;
`
const NoResults = styled.div`
    height: 50vh;
    background: url(${() => noResultsIcon});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
`;

export default GridSection;