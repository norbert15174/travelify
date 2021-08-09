import React, { useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import NewsSearch from "../trinkets/DropdownSearch";
import friendsIcon from "./svg/friendsIcon.svg";
import communityIcon from "./svg/communityIcon.svg";
import { FriendsListArray as news } from "./data";
import noResultsIcon from "./svg/noResultsIcon.svg";
import { useSelector } from "react-redux";

const types = {
    friends: "friends",
    community: "community"
}

const NewsPage = () => {

    const [newsType, setNewsType] = useState(types.friends);
    const blurState = useSelector((state) => state.blur.value);    

    const searchList = news.list.map((item) => {
        return {
            value: item.name,
            label: item.name,
            profilePhoto: item.url,
            mainPhoto: item.image,
            title: item.title,
            place: item.localization,
        }
    })

    return (
        <Container blurState={blurState}>
            <Header>
                <Heading>Aktualności</Heading>
            </Header>
            <NewsNavigation>
                <NewsSearch options={searchList}/>
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
                    news.list.length !== 0 
                    ? news.list.map((news) => 
                        <Post key={news.id} news={news}/>)
                    : <NoResults/>
                )
            }
            {
                newsType === types.community && ( 
                    news.list.length !== 0
                    ? news.list.map((news) => 
                        <Post news={news}/>)
                    : <NoResults/>
                )  
            }
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
    grid-auto-rows: auto;
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

const NewsNavigation = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    @media only screen and (max-width: 720px) {
        height: 180px;
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

const NewsSwitch = styled.div`
    margin: 25px auto 30px auto;
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
    background-size: 80%;
    background-position: center;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
`;


export default NewsPage;