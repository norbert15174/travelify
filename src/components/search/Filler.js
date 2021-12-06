import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import FoundAlbumThumbnail from "./FoundAlbumThumbnail";
import FoundPersonThumbnail from "./FoundPersonThumbnail";
import { endpoints } from "../../url";

const Filler = ({ searchType }) => {
  const [albumList, setAlbumList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [page, setPage] = useState(0); // page number

  const loaderAlbums = useRef(null);
  const loaderPeople = useRef(null);
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      if (searchType === "albums") {
        setPage((prevPage) => prevPage + 1);
      } else if (searchType === "people") {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };
  // when page changes
  useEffect(() => {
    setPage(0);
    setAlbumList([]);
    setPeopleList([]);
    const observerAlbums = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "5px",
      threshold: 0.25,
    });
    if (loaderAlbums.current) {
      observerAlbums.observe(loaderAlbums.current);
    }
    const observerPeople = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "5px",
      threshold: 0.25,
    });
    if (loaderPeople.current) {
      observerPeople.observe(loaderPeople.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType]);

  useEffect(() => {
    if (searchType === "albums") {
      getAlbums();
    } else if (searchType === "people") {
      getPeople();
    }
  }, [page]);

  const [redirectToAlbum, setRedirectToAlbum] = useState({
    active: false,
    albumId: "",
  });

  async function getAlbums() {
    await axios({
      url: endpoints.searchAlbums + page,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        if (page === 0) {
          setAlbumList(data);
        } else {
          setAlbumList((prevState) => [...prevState, ...data]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getPeople() {
    console.log(page);
    axios({
      url: endpoints.searchUsers + page,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        if (page === 0) {
          setPeopleList(data);
        } else {
          setPeopleList((prevState) => [...prevState, ...data]);
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
          <h1>Albumy użytkowników</h1>
        ) : (
          <h1>Użytkownicy</h1>
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
          <InnerContainer ref={loaderAlbums} />
        </AlbumGrid>
      )}
      {searchType === "people" && (
        <PeopleGrid className="scroll">
          {peopleList.length > 0 &&
            peopleList.map((person) => (
              <FoundPersonThumbnail key={person.id} person={person} />
            ))}
          <InnerContainer ref={loaderPeople} />
        </PeopleGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  @media only screen and (max-width: 500px) {
    padding: 15px 20px;
  }
  margin-bottom: 15px;
`;

const InnerContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 15px 0px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
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
