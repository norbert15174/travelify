import React, { useState } from "react";
import styled from "styled-components";
import AlbumPost from "./AlbumPost";
import Input from "../trinkets/Input";
import friendsIcon from "./svg/friendsIcon.svg";
import communityIcon from "./svg/communityIcon.svg";

const types = {
    friends: "friends",
    community: "community"
}

const NewsPage = () => {

    const [newsType, setNewsType] = useState("");

    return (
        <Container>
            <StyledHeader>
                <StyledHeading>Aktualności</StyledHeading>
            </StyledHeader>
            <NewsNavigation>
                <Search type="text" search placeholder="Szukaj"/>
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
            <AlbumPost/>
        </Container>
    );
    
};

const Container = styled.div`
    width:  62.5vw;
    margin: 0 auto 0 auto; 
    display: grid;
    grid-auto-rows: auto;
    grid-row-gap: 15px;
`;

const StyledHeader = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
    height: 80px;
    border-radius: 0px 0px 15px 15px;
`;

const StyledHeading = styled.h1`
    font-size: 48px;
    margin: 10px auto 10px 25px;
    color: ${({theme}) => theme.color.greyFont};
`;

const NewsNavigation = styled.div`
    height: 210px;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Search = styled(Input)`
    width: 35vw;
    margin: 30px auto 0 auto;
`;

const Line = styled.div`
    border: 1px solid ${({theme}) => theme.color.darkTurquise};
    width: 42vw;
    margin: 25px auto 0 auto;
`;

const NewsSwitch = styled.div`
    margin: 25px auto 0 auto;
    font-size: 34px;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 5vw;
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
`;



export default NewsPage;