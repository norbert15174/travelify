import React, { useState } from "react";
import styled from "styled-components";
import Input from "../trinkets/Input";
import FoundItems from "./FoundItems";
import { useSelector } from "react-redux";
import ButtonIcon from "../trinkets/ButtonIcon";
import magnifierIcon from "./assets/magnifierIcon.svg";
import searchAlbumIcon from "./assets/searchAlbumIcon.svg";
import searchPeopleIcon from "./assets/searchPeopleIcon.svg";
import { FriendsListArray as data } from "./data";

const types = {
    albums: "albums",
    people: "people"
}

const SearchPage = () => {

    const [searchType, setSearchType] = useState(types.albums);
    const blurState = useSelector((state) => state.blur.value);  
    // search field content
    const [searchContent, setSearchContent] = useState("");
    const [foundItems, setFoundItems] = useState([]);
    
    // albums are searched by title, people by name of course
    const handleSearchBarChange = (e) => {
        if (e.target.value === "") {
            // when SearchInput is cleared
            setSearchContent("");
            setFoundItems([]);
            return;
        }
        setSearchContent(e.target.value);
    };

    const searchSubmit = (e) => {
        if (searchContent !== "") {
            setFoundItems(data.list.filter((item) => {
                return searchType === types.albums
                    ? item.title.toLowerCase().includes(searchContent.toLowerCase()) 
                    : item.name.toLowerCase().includes(searchContent.toLowerCase())
            }));
        }
    }

    return(
        <Container blurState={blurState}>
            <Header>
                <Heading>
                    Wyszukiwarka
                </Heading>
            </Header>
            <SearchNavigation>
                <SearchBar>
                    <SearchInput 
                        autoComplete="off"
                        name="search"
                        id="search"
                        type="text"  
                        placeholder={searchType === types.albums ? "Podaj nazwę albumu..." : "Podaj imię i nazwisko..."}
                        value={searchContent}
                        onChange={handleSearchBarChange}
                    />
                    <SearchButton 
                        icon={magnifierIcon}
                        onClick={searchSubmit}
                    />
                </SearchBar>
                <Line/>
                <SearchSwitch>
                    <SearchOption 
                        icon={searchAlbumIcon} 
                        active={searchType === types.albums ? true : false } 
                        onClick={() => setSearchType(types.albums)}
                    >
                        Albumy
                    </SearchOption>
                    <SearchOption 
                        icon={searchPeopleIcon} 
                        active={searchType === types.people ? true : false } 
                        onClick={() => setSearchType(types.people)}
                    >
                        Osoby
                    </SearchOption>
                </SearchSwitch>
            </SearchNavigation>
            <FoundItems searchType={searchType} foundItems={foundItems}/>
            <p>{searchType === types.albums && foundItems.length !== 0 ? foundItems[0].title : null}</p>
            <p>{searchType === types.people && foundItems.length !== 0 ? foundItems[0].name : null}</p>
            { /* ZROBIĆ COŚ NA SYTUACJĘ, GDY NIC NIE JEST WPISANE DO WYSZUKIWARKI */ }
        </Container>
    );

};

const Container = styled.div`
	filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    width:  62.5vw;
    margin: 0 auto;
    margin-bottom: 15px; 
    display: grid;
    grid-template-rows: repeat(2, auto) 1fr;
    grid-row-gap: 15px;
    @media only screen and (max-width: 720px) {
        width: 80vw;
    }
`;

const Header = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
    height: 80px;
    border-radius: 0px 0px 15px 15px;
    @media only screen and (max-width: 720px) {
        height: 55px;
    }
`;

const Heading = styled.h1`
    font-size: 48px;
    margin: 10px auto 10px 25px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 720px) {
        font-size: 32px;
    }
`;

const SearchNavigation = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media only screen and (max-width: 720px) {
        height: 180px;
    }
`;

const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
`;

const SearchInput = styled(Input)`
    min-width: 35%;
    max-width: 35%;
    padding: 0px 15px;
    height: 40px;
    margin-right: 15px;
    //margin: 35px auto 0 auto;
`;

const SearchButton = styled(ButtonIcon)`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0px;
    padding: 0px;
    background-image: url(${({icon}) => icon});
    background-position: 50% 50%;
    background-size: 50%;
    &:hover, &:focus {
        background-color: ${({theme}) => theme.color.lightTurquise};
    }
`;

const Line = styled.div`
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
    width: 42vw;
    margin: 25px auto 0 auto;
    @media only screen and (max-width: 720px) {
        width: 80%;
    }
`;

const SearchSwitch = styled.div`
    margin: 25px auto 30px auto;
    font-size: 24px;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 5vw;
    @media only screen and (max-width: 720px) {
        font-size: 16px;
    }
`;

const SearchOption = styled.div`
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

export default SearchPage;