import React from "react";
import styled from "styled-components";
import noResultsIcon from "./assets/noResultsIcon.svg";

const NoResults = ({ searchType }) => {
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
      <Status>
        <Icon src={noResultsIcon} />
        <Message>Brak wyników...</Message>
      </Status>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  @media only screen and (max-width: 500px) {
    padding: 15px 20px;
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

const Status = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  @media only screen and (max-width: 1205px) {
    margin-top: 120px;
  }
  @media only screen and (max-width: 1100px) {
    margin-left: 35px;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    margin-top: 75px;
    margin-left: 0px;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 40%;
  }
`;

const Icon = styled.img`
  height: 350px;
  width: 350px;
  margin-right: 25px;
  @media only screen and (max-width: 1205px) {
    height: 200px;
    width: 200px;
  }
  @media only screen and (max-width: 500px) {
    height: 100px;
    width: 100px;
  }
`;

const Message = styled.h1`
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 80px;
  @media only screen and (max-width: 1205px) {
    font-size: 60px;
  }
  @media only screen and (max-width: 800px) {
    margin-top: 25px;
    font-size: 50px;
  }
  @media only screen and (max-width: 500px) {
    margin-top: 15px;
    font-size: 40px;
  }
`;

export default NoResults;
