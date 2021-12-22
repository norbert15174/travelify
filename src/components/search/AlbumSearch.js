import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Input from "../trinkets/Input";
import axios from "axios";
import { endpoints } from "../../miscellanous/url";
import FoundAlbumThumbnail from "./FoundAlbumThumbnail";
import ButtonIcon from "../trinkets/ButtonIcon";
import magnifierIcon from "./assets/magnifierIcon.svg";
import CountrySelect from "../trinkets/Select";
import "./searchScrollbar.css";
import ReactLoading from "react-loading";
import { useFormik } from "formik";
import cleanIcon from "./assets/cleanIcon.svg";

const AlbumSearch = () => {
  const [searching, setSearching] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [page, setPage] = useState(0);
  const [albumOwner, setAlbumOwner] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [albumCountry, setAlbumCountry] = useState("");
  const [albumPlace, setAlbumPlace] = useState("");

  const scrollBack = useRef(null);

  const searchLoaderAlbums = useRef(null);
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  // when page changes
  useEffect(() => {
    setPage(0);
    const observerAlbums = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "5px",
      threshold: 0.25,
    });
    if (searchLoaderAlbums.current) {
      observerAlbums.observe(searchLoaderAlbums.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAlbums("", albumOwner, albumName, albumCountry, albumPlace);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const formik = useFormik({
    initialValues: {
      albumName: "",
      albumOwner: "",
      albumCountry: "",
      albumPlace: "",
    },
    onSubmit: async (values, actions) => {
      setFoundItems([]);
      setSearching(true);
      getAlbums(
        "firstSearch",
        values.albumOwner,
        values.albumName,
        values.albumCountry && values.albumCountry.country,
        values.albumPlace
      );
      setSearching(false);
      //actions.setSubmitting(false); // not needed when onSubmit is async
      //actions.resetForm();
    },
  });

  async function getAlbums(
    type = "",
    albumOwner,
    albumName,
    albumCountry,
    albumPlace
  ) {
    await axios({
      url:
        endpoints.searchAlbums +
        (type === "firstSearch" ? 0 : page) +
        (albumName ? `&name=${albumName}` : "") +
        (albumCountry ? `&country=${albumCountry}` : "") +
        (albumOwner ? `&ownerName=${albumOwner}` : "") +
        (albumPlace ? `&place=${albumPlace}` : ""),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setAlbumOwner(albumOwner);
        setAlbumName(albumName);
        setAlbumCountry(albumCountry);
        setAlbumPlace(albumPlace);
        if (page === 0) {
          setFoundItems(data);
        } else {
          setFoundItems((prevState) => [...prevState, ...data]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <SearchNavigation>
        <Line />
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <SearchForm>
            <>
              <Label>Nazwa albumu</Label>
              <SearchInput
                id="albumName"
                name="albumName"
                value={formik.values.albumName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label>Imię i nazwisko właściciela</Label>
              <SearchInput
                id="albumOwner"
                name="albumOwner"
                value={formik.values.albumOwner}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label>Miejscowość</Label>
              <SearchInput
                id="albumPlace"
                name="albumPlace"
                value={formik.values.albumPlace}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label>Kraj</Label>
              <CountrySelect
                formik
                type="searchAlbumCountry"
                id="albumCountry"
                name="albumCountry"
                options={JSON.parse(sessionStorage.getItem("countryList"))}
                onChange={formik.setFieldValue}
                value={formik.values.albumCountry}
                onBlur={formik.setFieldTouched}
              />
            </>
            <Buttons>
              <Button
                icon={magnifierIcon}
                type="submit"
                active={formik.dirty || formik.isSubmitting}
              >
                Szukaj
              </Button>
              <Button
                icon={cleanIcon}
                type="reset"
                onClick={() => {
                  formik.resetForm();
                  setPage(0);
                  setAlbumOwner("");
                  setAlbumName("");
                  setAlbumCountry("");
                  setAlbumPlace("");
                  getAlbums(
                    "",
                    albumOwner,
                    albumName,
                    albumCountry,
                    albumPlace
                  );
                }}
                active={formik.dirty || formik.isSubmitting}
              >
                Wyczyść
              </Button>{" "}
            </Buttons>
          </SearchForm>
        </form>
      </SearchNavigation>
      <div ref={scrollBack} />
      <ResultContainer>
        <ResultLine />
        <AlbumGrid className="scroll">
          {foundItems.length > 0 ? (
            foundItems.map((album) => (
              <FoundAlbumThumbnail key={album.id} album={album} />
            ))
          ) : (
            <NoResults>Brak wyników</NoResults>
          )}
          <InnerContainer ref={searchLoaderAlbums} />
        </AlbumGrid>
        {searching && (
          <Loading height={"4%"} width={"4%"} type={"spin"} color={"#064045"} />
        )}
      </ResultContainer>
    </>
  );
};

const InnerContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 15px 0px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoResults = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.color.greyFont};
  margin-left: 15px;
`;

const Loading = styled(ReactLoading)`
  margin: 15px auto;
`;

const SearchNavigation = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const SearchForm = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 15px;
  margin: 25px auto;
  width: 70%;
  @media only screen and (max-width: 800px) {
    margin: 20px auto;
    grid-gap: 10px;
  }
  @media only screen and (max-width: 500px) {
    margin: 15px auto;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${({ theme }) => theme.color.darkBackground};
  border-radius: 50px;
  border: none;
  padding: 0 15px;
  height: 40px;
  outline-style: none;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  ::placeholder {
    letter-spacing: 1px;
    color: ${({ theme }) => theme.greyFont};
  }
  @media only screen and (max-width: 800px) {
    font-size: 12px;
    height: 25px;
    padding: 0px 10px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 800px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto 0 auto;
`;

const Button = styled(ButtonIcon)`
  opacity: ${({ active }) => (active ? "1" : "0.5")};
  cursor: ${({ active }) => (active ? "pointer" : "default")};
  width: 130px;
  height: 35px;
  border-radius: 15px;
  font-size: 18px;
  margin-right: 20px;
  padding-left: 20px;
  color: ${({ theme }) => theme.color.lightBackground};
  background-image: url(${({ icon }) => icon});
  background-position: 12% 50%;
  background-size: 18%;
  @media only screen and (max-width: 800px) {
    font-size: 12px;
    width: 90px;
    height: 25px;
    background-size: 13%;
    padding-left: 10px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 10px;
    height: 20px;
    width: 70px;
    margin-top: 10px;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
`;

const Line = styled.div`
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  width: 75%;
  margin: 0 auto;
`;

const ResultContainer = styled.div`
  height: 100%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 0px 25px 20px 25px;
  @media only screen and (max-width: 500px) {
    padding: 0px 20px 15px 20px;
  }
`;

const ResultLine = styled.div`
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

export default AlbumSearch;
