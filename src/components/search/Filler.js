import React from "react";
import styled from "styled-components";
import travelifyTextIcon from "./assets/travelifyTextIcon.svg";
import travelifyCameraIcon from "./assets/travelifyCameraIcon.svg";

const Filler = ({searchType}) => {

    return (
        <Container>
            <Header>
                { searchType === "albums" ? <h1>Znalezione albumy</h1> : <h1>Znalezione osoby</h1> }
            </Header>
            <Line/>
            <Status>
                <Icon src={travelifyCameraIcon}/>
                <Text src={travelifyTextIcon}/>
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
    margin-top: 100px;
    @media only screen and (max-width: 1205px) {
       margin-top: 120px;
    }
    @media only screen and (max-width: 950px) {
       margin-top: 150px;
    }
    @media only screen and (max-width: 800px) {
       flex-direction: column-reverse;
       margin-top: 20px;
    }
    @media only screen and (max-width: 500px) {
       margin-top: 40%;
    }
`;

const Icon = styled.img`
    height: 250px;
    width: 250px;
    margin-right: 25px;
    @media only screen and (max-width: 1205px) {
        height: 200px;
        width: 200px;
    }
    @media only screen and (max-width: 950px) {
        height: 150px;
        width: 150px;
    }
    @media only screen and (max-width: 800px) {
        height: 200px;
        width: 200px;
        margin-right: 0px;
    }
    @media only screen and (max-width: 500px) {
        height: 100px;
        width: 100px;
    }
`;

const Text = styled.img`
    height: 250px;
    width: 350px;
    margin-right: 25px;
    @media only screen and (max-width: 1205px) {
        height: 200px;
        width: 300px;
    }
    @media only screen and (max-width: 950px) {
       height: 150px;
       width: 250px;
    }
    @media only screen and (max-width: 800px) {
        height: 200px;
        width: 300px;
        margin-right: 0px;
    }
    @media only screen and (max-width: 510px) {
       height: 100px;
       width: 200px;
    }
`;

export default Filler;