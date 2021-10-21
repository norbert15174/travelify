import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import FoundAlbumThumbnail from "./FoundAlbumThumbnail";
import FoundPersonThumbnail from "./FoundPersonThumbnail";
import japonia1 from "./assets/Japonia.jpg";
import japonia2 from "./assets/japonia2.jpg";
import { endpoints } from "../../url";

const fake = [
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
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG",
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
];

const Filler = ({ searchType }) => {
  const [albumList, setAlbumList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [peopleList, setPeopleList] = useState(fake);
  const [page, setPage] = useState(0); // page number
  const loader = useRef(null);

  const [redirectToAlbum, setRedirectToAlbum] = useState({
    active: false,
    albumId: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "5px",
      threshold: 0.25,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [searchType]);

  // when page changes
  useEffect(() => {
    if (searchType === "albums") {
      getAlbums();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => page + 1);
    }
  };

  async function getAlbums() {
    axios({
      url: endpoints.getNews + page,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].public) {
            setAlbumList((prevState) => [...prevState, data[i]]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // redirection to chosen album
  if (redirectToAlbum.active) {
    return (
      <Redirect
        push
        to={{
          pathname: `album/${redirectToAlbum.albumId}`,
        }}
      />
    );
  }

  return (
    <Container>
      <Header>
        {searchType === "albums" ? (
          <h1>Znalezione albumy</h1>
        ) : (
          <h1>Znalezione osoby</h1>
        )}
      </Header>
      <Line />
      {searchType === "albums" && (
        <AlbumGrid className="scroll">
          {albumList.length > 0 &&
            albumList.map((album) => (
              <FoundAlbumThumbnail
                key={album.id}
                album={album}
                redirectToAlbum={() =>
                  setRedirectToAlbum({
                    active: true,
                    albumId: album.id,
                  })
                }
              />
            ))}
          <InnerContainer ref={loader} />
        </AlbumGrid>
      )}
      {searchType === "people" && (
        <PeopleGrid className="scroll">
          {peopleList.length > 0 &&
            peopleList.map((person) => (
              <FoundPersonThumbnail person={person} />
            ))}
          <InnerContainer ref={loader} />
        </PeopleGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  @media only screen and (max-width: 500px) {
    padding: 15px 20px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.lightBackground};
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
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1100px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 8px;
  }
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
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
  overflow-x: hidden;
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
    margin-top: 20px;
    grid-template-columns: none;
  }
  @media only screen and (max-width: 550px) {
    max-height: 575px;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 15px;
  }
`;

export default Filler;
