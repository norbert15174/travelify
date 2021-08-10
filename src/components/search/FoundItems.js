import React from "react";
import styled from "styled-components";
import noResultsIcon from "./assets/noResultsIcon.svg";

const FoundItems = ({searchType, foundItems}) => {

    return (
        <Container>
            <Header>
                { searchType === "albums" ? <h1>Znalezione albumy</h1> : <h1>Znalezione osoby</h1> }
            </Header>
            <Line/>
            {
                foundItems.length !== 0 ?
                    (
                        searchType === "albums" ?
                        <AlbumGrid>
                        {
                            foundItems.map((album) => 
                                <p>Znalazłem album</p>
                            )  
                        }
                        </AlbumGrid>
                        :
                        <PeopleGrid>
                        {
                            foundItems.map((album) => 
                                <p>Znalazłem osobę</p>
                            )  
                        }    
                        </PeopleGrid>
                    )
                : <NoResults/>
            }
            
        </Container>
    );

}

const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 25px;
    @media only screen and (max-width: 560px) {
        padding: 15px 20px;
    }
`;

const Header = styled.div`
    font-size: 17px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1080px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 8px;
    }
`;

const Line = styled.div`
    margin-top: 10px;
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
`;

const AlbumGrid = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: repeat(2, 550px);
    grid-gap: 30px;
    margin-left: 30px;
    max-height: 1000px;
    overflow-y: scroll;
`;

const PeopleGrid = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: repeat(2, 550px);
    grid-gap: 30px;
    margin-left: 30px;
    max-height: 750px;
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

export default FoundItems;