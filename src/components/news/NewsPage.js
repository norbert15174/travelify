import React, { useState } from "react";
import styled from "styled-components";
import AlbumPost from "./AlbumPost";
import Input from "../trinkets/Input";
import friendsIcon from "./svg/friendsIcon.svg";
import communityIcon from "./svg/communityIcon.svg";
import { FriendsListArray as news } from "./data";
import noResultsIcon from "./svg/noResultsIcon.svg";

const types = {
    friends: "friends",
    community: "community"
}

const NewsPage = () => {

    // same data for both types (for now...)
    const [newsType, setNewsType] = useState(types.friends);
    
    // search field content
    const [searchContent, setSearchContent] = useState("");
    const [foundNews, setFoundNews] = useState([]);

    // search only by album title and author name
    const handleSearchBarChange = (e) => {
        setSearchContent(e.target.value);
        setFoundNews(news.list.filter((item) => {
            return item.title.toLowerCase().includes(searchContent.toLowerCase()) || 
                item.name.toLowerCase().includes(searchContent.toLowerCase());
        }));
    };

    
    return (
        <Container>
            <StyledHeader>
                <StyledHeading>Aktualności</StyledHeading>
            </StyledHeader>
            <NewsNavigation>
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
                <Line/>
                <NewsSwitch>
                    <NewsOption 
                        icon={friendsIcon} 
                        active={newsType === types.friends ? true : false } 
                        onClick={() => setNewsType(types.friends)}
                    >
                        Znajomi
                    </NewsOption>
                    <NewsOption 
                        icon={communityIcon} 
                        active={newsType === types.community ? true : false } 
                        onClick={() => setNewsType(types.community)}
                    >
                        Społeczność
                    </NewsOption>
                </NewsSwitch>
            </NewsNavigation>
            {
                newsType === types.friends && ( 
                    (
                        searchContent.length !== 0 && foundNews.length !== 0
                        ?
                        foundNews.map((news) => 
                            <AlbumPost news={news}/>
                        )
                        : null
                    ) || (
                        news.list.length !== 0 && searchContent.length === 0
                        ? 
                        news.list.map((news) => 
                            <AlbumPost news={news}/>
                        )
                        : null
                    ) || (
                        <NoResults></NoResults>
                    )
                )
            }
            {
                newsType === types.community && ( 
                    (
                        searchContent.length !== 0 && foundNews.length !== 0
                        ?
                        foundNews.map((news) => 
                            <AlbumPost news={news}/>
                        )
                        : null
                    ) || (
                        news.list.length !== 0 && searchContent.length === 0
                        ? 
                        news.list.map((news) => 
                            <AlbumPost news={news}/>
                        )
                        : null
                    ) || (
                        <NoResults></NoResults>
                    )   
                )
            }
        </Container>
    );
    
};

const Container = styled.div`
    width:  62.5vw;
    margin: 0 auto 0 auto; 
    display: grid;
    grid-auto-rows: auto;
    grid-row-gap: 15px;
    @media only screen and (max-width: 720px) {
        width: 80vw;
    }
`;

const StyledHeader = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
    height: 80px;
    border-radius: 0px 0px 15px 15px;
    @media only screen and (max-width: 720px) {
        height: 55px;
    }
`;

const StyledHeading = styled.h1`
    font-size: 48px;
    margin: 10px auto 10px 25px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 720px) {
        font-size: 32px;
    }
`;

const NewsNavigation = styled.div`
    height: 210px;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media only screen and (max-width: 720px) {
        height: 180px;
    }
`;

const Search = styled(Input)`
    width: 35vw;
    margin: 30px auto 0 auto;
    @media only screen and (max-width: 720px) {
        width: 50%;
    }
`;

const Line = styled.div`
    border: 1px solid ${({theme}) => theme.color.darkTurquise};
    width: 42vw;
    margin: 25px auto 0 auto;
    @media only screen and (max-width: 720px) {
        width: 80%;
    }
    
`;

const NewsSwitch = styled.div`
    margin: 25px auto 0 auto;
    font-size: 24px;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 5vw;
    @media only screen and (max-width: 720px) {
        font-size: 16px;
    }
`;

const NewsOption = styled.div`
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

const NoResults = styled.div`
    height: 50vh;
    background: url(${() => noResultsIcon});
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
`;


export default NewsPage;