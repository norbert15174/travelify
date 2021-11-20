import React, { useEffect, useState } from "react";
import styled from "styled-components";
import birthdayIcon from "./assets/birthdayIcon.svg";
import homeIcon from "./assets/homeIcon.svg";
import aboutIcon from "./assets/aboutIcon.svg";
import interestsIcon from "./assets/interestsIcon.svg";
import visitedIcon from "./assets/visitedIcon.svg";
import phoneIcon from "./assets/phoneIcon.svg";
import { getCountryData } from "../../miscellanous/Utils";
import moment from "moment";
import "moment/locale/pl";

const InfoSection = ({
  nationality,
  about,
  interest,
  visitedCountries,
  birthday,
  phoneNumber,
}) => {
  const [mappedVisitedCountries, setMappedVisitedCountries] = useState(null);

  useEffect(() => {
    moment.locale("pl");
    if (visitedCountries !== undefined) {
      setMappedVisitedCountries(getCountryData(visitedCountries));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header>
        <h1>Informacje o użytkowniku</h1>
        <Line />
      </Header>
      <Title>
        <Icon src={birthdayIcon} />
        <h3>Data urodzenia</h3>
      </Title>
      <Text>{moment().diff(birthday, 'years')} lat, {moment(birthday).format("LL")}</Text>
      <Title>
        <Icon src={homeIcon} />
        <h3>Pochodzenie</h3>
      </Title>
      <Text>
        <Country key={nationality.id}>
          <Flag src={nationality.url} />
          {nationality.country}
        </Country>
      </Text>
      <Title>
        <Icon src={phoneIcon} />
        <h3>Telefon</h3>
      </Title>
      <Text>{phoneNumber !== 0 ? phoneNumber : <p>Brak numeru</p>}</Text>
      <Title>
        <Icon src={aboutIcon} />
        <h3>O mnie</h3>
      </Title>
      <Text>
        {about !== undefined ? (
          about !== "" ? (
            about
          ) : (
            <p>Brak zawartości</p>
          )
        ) : (
          <p>Brak zawartości</p>
        )}
      </Text>
      <Title>
        <Icon src={interestsIcon} />
        <h3>Zainteresowania</h3>
      </Title>
      <Text>
        {interest !== undefined ? (
          interest !== "" ? (
            interest
          ) : (
            <p>Brak zawartości</p>
          )
        ) : (
          <p>Brak zawartości</p>
        )}
      </Text>
      <Title>
        <Icon src={visitedIcon} />
        <h3>Odwiedzone kraje</h3>
      </Title>
      <VisitedCountries>
        {visitedCountries !== undefined &&
        mappedVisitedCountries !== null &&
        mappedVisitedCountries.length !== 0 ? (
          mappedVisitedCountries.map((country) => (
            <Country key={country.id}>
              <Flag src={country.url} />
              {country.country}
            </Country>
          ))
        ) : (
          <p>Brak zawartości</p>
        )}
      </VisitedCountries>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  font-size: 17px;
  margin-bottom: 15px;
  @media only screen and (max-width: 1080px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 8px;
    padding: 15px 20px;
  }
`;

const Header = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.color.greyFont};
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1080px) {
    margin-top: 15px;
  }
  @media only screen and (max-width: 560px) {
    margin-top: 10px;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
  @media only screen and (max-width: 1080px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 560px) {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const Text = styled.div`
  font-size: 16px;
  margin-left: 48px;
  margin-top: 10px;
  color: #000;
  @media only screen and (max-width: 1080px) {
    font-size: 12px;
    margin-left: 40px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 8px;
    margin-top: 5px;
    margin-left: 30px;
  }
`;

const VisitedCountries = styled.div`
  margin-left: 48px;
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media only screen and (max-width: 1080px) {
    margin-left: 40px;
  }
  @media only screen and (max-width: 560px) {
    margin-left: 30px;
  }
`;

const Country = styled.div`
  display: flex;
  flex-direction: row;
  max-width: max-content;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  background-color: #e0e5e0;
  border-radius: 15px;
  color: #000;
  font-size: 16px;
  margin-top: 5px;
  margin-right: 10px;
  padding: 5px 10px;
  flex-shrink: 1;
  @media only screen and (max-width: 1080px) {
    font-size: 10px;
  }
`;

const Flag = styled.img`
  width: 30px;
  height: 20px;
  margin-right: 5px;
  @media only screen and (max-width: 1080px) {
    width: 20px;
    height: 10px;
  }
  @media only screen and (max-width: 410px) {
    margin-right: 2.5px;
  }
`;

export default InfoSection;
