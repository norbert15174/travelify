import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FoundAlbumThumbnail from "./FoundAlbumThumbnail";
import FoundPersonThumbnail from "./FoundPersonThumbnail";
import Spinner from "../trinkets/Spinner";
import japonia1 from "./assets/Japonia.jpg";
import japonia2 from "./assets/japonia2.jpg";

const data = [
    {
        id: 1,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Robert Żaak",
        title: "Czarny",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        bilia curae; 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG',
      },
      {
        id: 2,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Mikołaj Telec",
        title: "Czerwony",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia2,
      },
      {
        id: 3,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Justyna Socała",
        title: "Biały",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Lorem; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia1,
      },
      {
        id: 4,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Weronika Kubińska",
        title: "Kolor",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Lor amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia2,
      },
      {
        id: 5,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Natalia Fabia",
        title: "Zielony",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum um primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia1,
    },
      {
        id: 6,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Michał Czarnik",
        title: "Czarny",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        orem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia2,
    },
      
      {
        id: 7,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Radosław Sajdak",
        title: "Różowy",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia1,
    },
      {
        id: 8,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Kamil Faron",
        title: "Żółty",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia2,
    },
      {
        id: 9,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Łukasz Faron",
        title: "Turkusowy",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia1,
    },
      {
        id: 10,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Rokowska Maria",
        title: "Szary",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia2,
    },
]

const Filler = ({searchType}) => {

    const [ albumList, setAlbumList ] = useState(data);
    const [ peopleList, setPeopleList ] = useState(data);
    const [ page, setPage ] = useState(1); // page number
    const [ noMore, setNoMore ] = useState(false);
    const loader = useRef(null);

    useEffect(() => {
        // fetch 
        setAlbumList(data);
        setPeopleList(data);
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 0.25,
        });
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, [searchType]);

    // when page changes
    useEffect(() => {
        setTimeout(() => {
            if (searchType === "albums") {
                const newItemList = albumList.concat([data[2], data[3]]);
                setAlbumList(newItemList);
            } else if (searchType === "people") {
                const newItemList = peopleList.concat([data[2], data[3]]);
                setPeopleList(newItemList);
            } else {
                // when end has been reached
                setNoMore(true);
            }
        }, 1000);  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1);
        }
    }

    return (
        <Container>
            <Header>
                { searchType === "albums" ? <h1>Znalezione albumy</h1> : <h1>Znalezione osoby</h1> }
            </Header>
            <Line/>
            {
               searchType === "albums" &&  
               (albumList.length > 0 ?
                <AlbumGrid className="scroll">
                {
                    albumList.map((album) => 
                        <FoundAlbumThumbnail
                            key={album.id}
                            album={album}
                            redirectTo={() => null}
                        />
                    )  
                }
                    <InnerContainer ref={loader}>
                    {
                        !noMore &&
                        (<Spinner 
                            width={"30px"} 
                            height={"30px"} 
                            border={"6px"} 
                            firstColor={({theme}) => theme.color.darkTurquise} 
                            secondColor={({theme}) => theme.color.lightTurquise}
                        />)
                    }
                    </InnerContainer> 
                </AlbumGrid>
                : <h1 style={{color: "#5B5B5B", marginTop: "15px"}}>Brak albumów...</h1>) 
            } 
            {
                searchType === "people" && 
                (peopleList.length > 0 ?
                <PeopleGrid className="scroll">
                {
                    peopleList.map((person) => 
                        <FoundPersonThumbnail person={person}/>
                    )  
                }
                    <InnerContainer ref={loader}>
                    {
                        !noMore &&
                        (<Spinner 
                            width={"30px"} 
                            height={"30px"} 
                            border={"6px"} 
                            firstColor={({theme}) => theme.color.darkTurquise} 
                            secondColor={({theme}) => theme.color.lightTurquise}
                        />)
                    }
                    </InnerContainer>    
                </PeopleGrid>
                : <h1 style={{color: "#5B5B5B", marginTop: "15px"}}>Brak użytkowników...</h1>)
            }
        </Container>
    );

};

const Container = styled.div`
    height: 100%;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 20px 25px;
    @media only screen and (max-width: 500px) {
        padding: 15px 20px;
    }
`;

const InnerContainer = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.color.lightBackground}; 
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 52%;
    @media only screen and (max-width: 800px) {
        margin-left: 0%;
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

const AlbumGrid = styled.div`
    display: grid;
    align-content: start;
    grid-template-columns: repeat(2, 550px);
    grid-gap: 25px;
    margin-top: 30px;
    grid-auto-rows: 350px;
    max-height: 500px;
    overflow-y: scroll;
    @media only screen and (max-width: 1400px) {
        grid-template-columns: repeat(2, 400px);
        grid-auto-rows: 300px;
    }
    @media only screen and (max-width: 1100px) {
        grid-template-columns: repeat(2, 255px);
        grid-auto-rows: 200px;
        grid-gap: 20px;
        margin-top: 25px;
    }
    @media only screen and (max-width: 800px) {
        max-height: 550px;
        grid-gap: 0px;
        grid-row-gap: 25px;
        margin-top: 20px;
        grid-template-columns: 330px;
    }
    @media only screen and (max-width: 500px) {
        max-height: 575px;
        grid-auto-rows: 153px;
        grid-gap: 0px;
        grid-row-gap: 25px;
        margin-top: 15px;
        grid-template-columns: 245px;
    }
`;

const PeopleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 535px);
    grid-template-rows: 100px;
    grid-gap: 25px;
    margin-top: 30px;
    max-height: 500px;
    overflow-y: scroll;
    @media only screen and (max-width: 1400px) {
        grid-template-columns: repeat(2, 385px);
        grid-template-rows: 80px;
    }
    @media only screen and (max-width: 1100px) {
        grid-template-columns: repeat(2, 235px);
        grid-template-rows: 60px;
        grid-gap: 20px;
        margin-top: 25px;
    }
    @media only screen and (max-width: 800px) {
        max-height: 550px;
        grid-template-rows: 50px;
        grid-gap: 0px;
        grid-row-gap: 15px;
        margin-top: 20px;;
        grid-template-columns: none;
    }
    @media only screen and (max-width: 550px) {
        max-height: 575px;
    }
    @media only screen and (max-width: 500px) {
       margin-top: 15px;
    }
`

export default Filler;