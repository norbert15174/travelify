import React from "react";
import styled from "styled-components";
import searchingIcon from "./assets/searchingIcon.svg";

const Searching = ({searchType}) => {

    return (
        <Container>
            <Header>
                { searchType === "albums" ? <h1>Znalezione albumy</h1> : <h1>Znalezione osoby</h1> }
            </Header>
            <Line/>
            <Status>
                <Icon src={searchingIcon}/>
                <Message>Szukam...</Message>
            </Status>
        </Container>
    );

};

const Container = styled.div`
    height: 100%;
    //height: calc(100vh - 369px); // 369px - sum of height of the Header, SearchNavigation and all margins between containers
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

const Status = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    @media only screen and (max-width: 1205px) {
       margin-top: 120px;
    }
    @media only screen and (max-width: 800px) {
       flex-direction: column;
       margin-top: 75px;
    }
    @media only screen and (max-width: 500px) {
       margin-top: 40%;
    }
`;

const Icon = styled.img`
    height: 350px;
    width: 350px;
    margin-right: 25px;
    border-radius: 0px 0px 0px 235px;
    @media only screen and (max-width: 1205px) {
        height: 200px;
        width: 200px;
        border-radius: 0px 0px 0px 135px;
    }
    @media only screen and (max-width: 500px) {
       height: 100px;
       width: 100px;
       border-radius: 0px 0px 0px 70px;
    }
`;

const Message = styled.h1`
    color: ${({theme}) => theme.color.greyFont};
    font-size: 80px;
    @media only screen and (max-width: 1205px) {
        font-size: 60px;
    }
    @media only screen and (max-width: 800px) {
        margin-top: 25px;
    }
    @media only screen and (max-width: 500px) {
        margin-top: 15px;
        font-size: 40px;
    }
`;

export default Searching;