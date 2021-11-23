import React, { useState, useRef } from "react";
import styled from "styled-components";
import Input from "../trinkets/Input";
import FoundItems from "./FoundItems";
import { useSelector } from "react-redux";
import ButtonIcon from "../trinkets/ButtonIcon";
import magnifierIcon from "./assets/magnifierIcon.svg";
import CountrySelect from "../trinkets/Select";
import searchAlbumIcon from "./assets/searchAlbumIcon.svg";
import searchPeopleIcon from "./assets/searchPeopleIcon.svg";
import { FriendsListArray as data } from "./data";
import { useFormik } from "formik";
import NoResults from "./NoResults";
import Searching from "./Searching";
import Filler from "./Filler";

const types = {
  albums: "albums",
  people: "people",
};

const SearchPage = () => {
  const [searchType, setSearchType] = useState(types.people);
  const blurState = useSelector((state) => state.blur.value);
  // search field content
  const [searching, setSearching] = useState(false);
  const [searchFinished, setSearchFinished] = useState(false);
  const [foundItems, setFoundItems] = useState([]);

  const scrollBack = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      age: 0,
      nationality: "",
      visitedCountries: [],
      albumName: "",
      albumOwnerName: "",
      albumOwnerSurname: "",
      albumCountry: "",
      albumPlace: "",
      albumDate: "",
    },
    onSubmit: async (values, actions) => {
      // search
      console.log(values);
      setSearching(false);
      setSearchFinished(false);
      setFoundItems([]);
      if (true) {
        setSearching(true);
        setTimeout(function () {
          setSearching(false);
          setSearchFinished(true);
        }, 5000);
      }
      scrollBack.current.scrollIntoView({ behavior: "smooth" });
      //actions.setSubmitting(false); // not needed when onSubmit is async
      actions.resetForm();
    },
  });

  return (
    <Container blurState={blurState}>
      <Header>
        <Heading>Wyszukiwarka</Heading>
      </Header>
      <SearchNavigation>
        <SearchSwitch>
          <SearchOption
            icon={searchAlbumIcon}
            active={searchType === types.albums ? true : false}
            onClick={() => {
              setSearching(false);
              setSearchFinished(false);
              setFoundItems([]);
              setSearchType(types.albums);
            }}
          >
            Albumy
          </SearchOption>
          <SearchOption
            icon={searchPeopleIcon}
            active={searchType === types.people ? true : false}
            onClick={() => {
              setSearching(false);
              setSearchFinished(false);
              setFoundItems([]);
              setSearchType(types.people);
            }}
          >
            Osoby
          </SearchOption>
        </SearchSwitch>

        <Line />
        <form onSubmit={formik.handleSubmit}>
          <SearchForm>
            {types.albums === searchType && (
              <>
                <Label>Nazwa albumu</Label>
                <SearchInput
                  id="albumName"
                  name="albumName"
                  value={formik.values.albumName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Label>Imię właściciela</Label>
                <SearchInput
                  id="albumOwnerName"
                  name="albumOwnerName"
                  value={formik.values.albumOwnerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Label>Nazwisko właściciela</Label>
                <SearchInput
                  id="albumOwnerSurname"
                  name="albumOwnerSurname"
                  value={formik.values.albumOwnerSurname}
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
                {/* <Label>Data utworzenia</Label>
                <SearchInput
                  type="date"
                  id="albumDate"
                  name="albumDate"
                  value={formik.values.albumDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                /> */}
              </>
            )}
            {types.people === searchType && (
              <>
                <Label>Imię</Label>
                <SearchInput
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Label>Nazwisko</Label>
                <SearchInput
                  id="surname"
                  name="surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Label>Wiek</Label>
                <SearchInput
                  type="number"
                  id="age"
                  name="age"
                  value={formik.values.age}
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
                <Label>Odwiedzone kraje</Label>
                <CountrySelect
                  formik
                  isMulti={true}
                  isMultiSearch={true}
                  type="searchVisitedCountries"
                  name="visitedCountries"
                  id="visitedCountries"
                  options={JSON.parse(sessionStorage.getItem("countryList"))}
                  onChange={formik.setFieldValue}
                  value={formik.values.visitedCountries}
                  onBlur={formik.setFieldTouched}
                />
              </>
            )}
            {searchType && (
              <SearchButton
                icon={magnifierIcon}
                type="submit"
                disabled={formik.isSubmitting || !formik.dirty}
              >
                Szukaj
              </SearchButton>
            )}
          </SearchForm>
        </form>
      </SearchNavigation>
      <div ref={scrollBack} />
      {searching && <Searching searchType={searchType} />}
      {foundItems.length !== 0 && searchFinished && (
        <FoundItems searchType={searchType} foundItems={foundItems} />
      )}
      {foundItems.length === 0 && searchFinished && (
        <NoResults searchType={searchType} />
      )}
      {/* {!searching && !searchFinished && searchType && <Filler searchType={searchType} />} */}
    </Container>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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

const Header = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  height: 80px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  margin-bottom: 15px;
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
  color: ${({ theme }) => theme.color.greyFont};
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

const SearchButton = styled(ButtonIcon)`
  width: 130px;
  height: 35px;
  border-radius: 15px;
  font-size: 18px;
  margin: 20px auto 0 auto;
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

const SearchSwitch = styled.div`
  margin: 25px auto;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-column-gap: 5vw;
  @media only screen and (max-width: 800px) {
    margin: 20px auto;
  }
`;

const SearchOption = styled.div`
  background: ${({ active }) => (active ? "rgba(18, 191, 206, 0.4)" : "")};
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border-radius: 15px;
  text-align: center;
  font-size: 24px;
  padding: 10px 20px 10px 80px;
  background-image: url(${({ icon }) => icon});
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

export default SearchPage;
