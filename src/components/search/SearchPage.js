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
import NoResults from "./NoResults";
import Searching from "./Searching";
import Filler from "./Filler";

const types = {
    albums: "albums",
    people: "people"
}

const SearchPage = () => {

    const [ searchType, setSearchType ] = useState(types.albums);
    const blurState = useSelector((state) => state.blur.value);  
    // search field content
    const [ searchContent, setSearchContent ] = useState("");
    const [ searching, setSearching ] = useState(false);
    const [ searchFinished, setSearchFinished ] = useState(false);
    const [ foundItems, setFoundItems ] = useState([]);
    
    // albums are searched by title, people by name of course
    const handleSearchBarChange = (e) => {
        if (e.target.value === "") {
            // when SearchInput is cleared
            setSearching(false);
            setSearchFinished(false);
            setFoundItems([]);
            setSearchContent("");
            return;
        }
        setSearchContent(e.target.value);
    };

    const searchSubmit = (e) => {
        setSearching(false);
        setSearchFinished(false);
        setFoundItems([]);

        if (searchContent !== "") {
            setSearching(true);

            // backend magic
            setTimeout(function(){ 
                setFoundItems(data.list.filter((item) => {
                    return searchType === types.albums
                        ? item.title.toLowerCase().includes(searchContent.toLowerCase()) 
                        : item.name.toLowerCase().includes(searchContent.toLowerCase())
                }));
                setSearching(false);
                setSearchFinished(true);
            }, 5000);
        }
        //setSearching(false);
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
                        disabled={searchContent === "" ? true : false} 
                        icon={magnifierIcon}
                        onClick={searchSubmit}
                    />
                </SearchBar>
                <Line/>
                <SearchSwitch>
                    <SearchOption 
                        icon={searchAlbumIcon} 
                        active={searchType === types.albums ? true : false } 
                        onClick={() => {
                                setSearching(false);
                                setSearchFinished(false);
                                setFoundItems([]);
                                setSearchContent("");
                                setSearchType(types.albums);
                            }
                        }
                    >
                        Albumy
                    </SearchOption>
                    <SearchOption 
                        icon={searchPeopleIcon} 
                        active={searchType === types.people ? true : false } 
                        onClick={() => {
                            setSearching(false);
                            setSearchFinished(false);
                            setFoundItems([]);
                            setSearchContent("");
                            setSearchType(types.people);
                        }
                    }
                    >
                        Osoby
                    </SearchOption>
                </SearchSwitch>
            </SearchNavigation>
            {   
                searching && 
                <Searching searchType={searchType}/>
            }
            {   
                foundItems.length !== 0 && searchFinished &&
                <FoundItems 
                    searchType={searchType} 
                    foundItems={foundItems}
                />
            }
            {
                foundItems.length === 0 && searchFinished &&
                <NoResults searchType={searchType}/>
            }
            {
                !searching && !searchFinished &&
                <Filler searchType={searchType}/>
            }
        </Container>
    );

};

/// TODO - RESPONSYWNOŚĆ ALBUMY 

const Container = styled.div`
	filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    width:  1200px;
    height: calc(100vh - 15px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 1400px) {
       width: 900px;
    }
    @media only screen and (max-width: 1100px) {
        width: 600px;
    }
    @media only screen and (max-width: 800px) {
        width: 400px;
    }
    @media only screen and (max-width: 500px) {
        width: 300px;
    } 
`;

const Header = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
    height: 80px;
    border-radius: 0px 0px 15px 15px;
    display: grid;
    margin-bottom: 15px;
    align-items: center;
    @media only screen and (max-width: 1100px) {
        height: 70px;
    }
    @media only screen and (max-width: 800px) {
        height: 60px;
    }
    @media only screen and (max-width: 500px) {
        height: 40px;
    }
`;

const Heading = styled.h1`
    font-size: 54px;
    margin: auto auto auto 25px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1100px) {
        font-size: 46px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 40px;
        margin: auto auto auto 15px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 24px;
        margin-left: 15px;
    }
`;

const SearchNavigation = styled.div`
    height: 204px;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 15px;
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
    @media only screen and (max-width: 800px) {
        margin-top: 25px;
    }
`;

const SearchInput = styled(Input)`
    width: 35%;
    padding: 0px 15px;
    height: 40px;
    margin-right: 15px;
    @media only screen and (max-width: 800px) {
        font-size: 12px;
        height: 25px;
        padding: 0px 10px;
        width: 45%;
        margin-right: 10px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 10px;
    }
    
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
    @media only screen and (max-width: 800px) {
        width: 20px;
        height: 20px;
    }
`;

const Line = styled.div`
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
    width: 75%;
    margin: 25px auto 0 auto;
    @media only screen and (max-width: 800px) {
        margin: 20px auto 20px auto;
    }
`;

const SearchSwitch = styled.div`
    margin: 25px auto 30px auto;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 5vw;
    @media only screen and (max-width: 800px) {
        margin: 0px auto 25px auto;
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
    font-size: 24px;
    padding: 10px 20px 10px 80px;
    background-image: url(${({icon}) => icon}); 
    background-size: 34px;
    background-position: 10% 50%;
    background-repeat: no-repeat;
    cursor: pointer;
    @media only screen and (max-width: 800px) {
        font-size: 16px;
        background-size: 24px;
        padding: 10px 10px 10px 50px;
    }
`;

export default SearchPage;