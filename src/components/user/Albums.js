import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Input from "../trinkets/Input";
import "./scrollbar.css";

const Albums = ({albumData}) => {

    // search field content
    const [searchContent, setSearchContent] = useState("");
    const [foundNews, setFoundNews] = useState([]);

    // search only by album title and author name
    const handleSearchBarChange = (e) => {
        setSearchContent(e.target.value);
        setFoundNews(albumData.list.filter((item) => {
            return item.title.toLowerCase().includes(searchContent.toLowerCase()) || 
                item.name.toLowerCase().includes(searchContent.toLowerCase());
        }));
    };

    return (
        <Container>
            <Header>
                <h1>Albumy</h1>
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
            <AlbumGrid className="scroll">
                <FakeImg/>
                <FakeImg/>
                <FakeImg/>
                <FakeImg/>
                <FakeImg/>
                <FakeImg/>
                <FakeImg/>
                <FakeImg/>
            </AlbumGrid>
        </Container>
    );

};

const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 25px;
    font-size: 17px;
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
    width: 25vw;
    margin: 20px 0 20px 15px;
`;

const AlbumGrid = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: repeat(2, 550px);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    margin-left: 15px;
    max-height: 1000px;
    overflow-y: scroll;
`;

const FakeImg = styled.div`
    background-color: #000;
    width: 550px;
    height: 430px;

`;

export default Albums;