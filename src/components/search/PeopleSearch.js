import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Input from "../trinkets/Input";
import axios from "axios";
import { endpoints } from "../../miscellanous/url";
import ButtonIcon from "../trinkets/ButtonIcon";
import magnifierIcon from "./assets/magnifierIcon.svg";
import CountrySelect from "../trinkets/Select";
import "./searchScrollbar.css";
import ReactLoading from "react-loading";
import { useFormik } from "formik";
import FoundPersonThumbnail from "./FoundPersonThumbnail";
import cleanIcon from "./assets/cleanIcon.svg";

const PeopleSearch = () => {
  const [searching, setSearching] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");

  const scrollBack = useRef(null);
  const searchPeopleLoader = useRef(null);
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
    if (searchPeopleLoader.current) {
      observerAlbums.observe(searchPeopleLoader.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPeople("", name, nationality);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const formik = useFormik({
    initialValues: {
      name: "",
      nationality: "",
    },
    onSubmit: async (values, actions) => {
      setFoundItems([]);
      setSearching(true);
      getPeople(
        "firstSearch",
        values.name,
        values.nationality && values.nationality.country
      );
      setSearching(false);
      //actions.setSubmitting(false); // not needed when onSubmit is async
      // actions.resetForm();
    },
  });

  async function getPeople(type = "", name, nationality) {
    await axios({
      url:
        endpoints.searchUsers +
        (type === "firstSearch" ? 0 : page) +
        (name ? `&name=${name}` : "") +
        (nationality ? `&from=${nationality}` : ""),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setName(name);
        setNationality(nationality);
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
              <Label>Imię i nazwisko</Label>
              <SearchInput
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label>Pochodzenie</Label>
              <CountrySelect
                formik
                type="country"
                name="nationality"
                id="nationality"
                options={JSON.parse(sessionStorage.getItem("countryList"))}
                onChange={formik.setFieldValue}
                value={formik.values.nationality}
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
                  setName("");
                  setNationality("");
                  getPeople("", name, nationality);
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
        <PeopleGrid className="scroll">
          {foundItems.length > 0 ? (
            foundItems.map((person) => (
              <FoundPersonThumbnail key={person.id} person={person} />
            ))
          ) : (
            <NoResults>Brak wyników</NoResults>
          )}
          <InnerContainer ref={searchPeopleLoader} />
        </PeopleGrid>
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

export default PeopleSearch;
