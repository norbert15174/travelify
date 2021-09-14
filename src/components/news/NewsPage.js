import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Post from "./Post";
import friendsIcon from "./svg/friendsIcon.svg";
import communityIcon from "./svg/communityIcon.svg";
import noResultsIcon from "./svg/noResultsIcon.svg";
import { useSelector } from "react-redux";
import Spinner from "../trinkets/Spinner";
import japonia1 from "./photos/Japonia.jpg";
import japonia2 from "./photos/japonia2.jpg";


const types = {
    friends: "friends",
    community: "community"
}

const fakeNews = [
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
      {
        id: 11,
        url: "https://gravatar.com/avatar/9b4540ff93b1f62d9b7641956e2a1180?s=200&d=mp&r=x",
        name: "Wojewodzic Mariola",
        title: "Brązowy",
        localization: "Japonia, Osaka",
        description: `Wycieczka z rodziną. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Nam condimentum mattis erat ac feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;`,
        image: japonia1,
    },
]

const NewsPage = () => {

    const [newsType, setNewsType] = useState(types.friends);
    const blurState = useSelector((state) => state.blur.value);


    const [ newsList, setNewsList ] = useState(fakeNews);
    const [ page, setPage ] = useState(1) // page number
    const loader = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "20px",
            threshold: 0.5,
        })
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, []);

    // when page changes
    useEffect(() => {
        setTimeout(() => {
            const newNewsList = newsList.concat([newsList[2], newsList[3]]);
            setNewsList(newNewsList);
        }, 1000);
    }, [page]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1);
        }
    }

    return (
        <Container blurState={blurState}>
            <Header>
                <Heading>Aktualności</Heading>
            </Header>
            <NewsNavigation>
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
                    newsList
                    ? newsList.map((news) => 
                        <Post key={news.id} news={news}/>)
                    : <NoResults/>
                )
            }
            {
                newsType === types.community && ( 
                    newsList
                    ? newsList.map((news) => 
                        <Post news={news}/>)
                    : <NoResults/>
                )  
            }
            <InnerContainer ref={loader}>
                <Spinner width={"30px"} height={"30px"} border={"6px"} firstColor={({theme}) => theme.color.darkTurquise} secondColor={({theme}) => theme.color.lightTurquise }/>
            </InnerContainer>  
        </Container>
    );
    
};

const Container = styled.div`
	filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    width:  1200px;
    margin: 0 auto;
    margin-bottom: 15px; 
    display: flex;
    flex-direction: column;
    grid-row-gap: 15px;
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

const InnerContainer = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.color.lightBackground}; 
    padding: 15px 0px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground}; 
    height: 80px;
    border-radius: 0px 0px 15px 15px;
    display: grid;
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

const NewsNavigation = styled.div`
    height: auto;
    padding: 25px 0px;
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;


const NewsSwitch = styled.div`
    margin: 0px auto;
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