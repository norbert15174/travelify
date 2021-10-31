import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Input from "../trinkets/Input";
import "./groupsScrollbar.css";
import MemberThumbnail from "./MemberThumbnail";

const MembersSection = ({ members, setMemberToRemove }) => {
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);

  const handleSearchBarChange = (e) => {
    setFound(
      members.filter((item) =>
        (item.name + " " + item.surname)
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
    setSearchContent(e.target.value);
  };

  return (
    <>
      <Container>
        <Header>
          <h1>Wysłane zaproszenia</h1>
          <Line />
        </Header>
        <MembersGrid className="scroll">
          {members.map((item) => (
            <MemberThumbnail key={item.id} member={item} type="requests" />
          ))}
        </MembersGrid>
      </Container>
      <Container>
        <Header>
          <h1>Aktualni członkowie</h1>
          <Line />
        </Header>
        <Search
          autoComplete="off"
          name="search"
          id="search"
          type="text"
          search
          placeholder="Szukaj"
          value={searchContent}
          onChange={handleSearchBarChange}
        />
        <MembersGrid className="scroll">
          {members !== null ? (
            (searchContent.length !== 0 && found.length !== 0
              ? found.map((item) => (
                  <MemberThumbnail
                    member={item}
                    setMemberToRemove={setMemberToRemove}
                  />
                ))
              : null) ||
            (members.length !== 0 && searchContent.length === 0
              ? members.map((item) => (
                  <MemberThumbnail
                    member={item}
                    setMemberToRemove={setMemberToRemove}
                  />
                ))
              : null) || <h1 style={{ color: "#5B5B5B" }}>Brak członków...</h1>
          ) : (
            <h1 style={{ color: "#5B5B5B" }}>Brak członków...</h1>
          )}
        </MembersGrid>
      </Container>
    </>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  margin-bottom: 15px;
  @media only screen and (max-width: 550px) {
    padding: 15px 20px;
  }
`;

const Header = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.color.greyFont};
  h1 {
    font-size: 34px;
  }
  @media only screen and (max-width: 810px) {
    h1 {
      font-size: 27px;
    }
  }
  @media only screen and (max-width: 550px) {
    h1 {
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 18px;
    }
  }
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 810px) {
    margin-top: 5px;
  }
`;

const animation = keyframes`
    from {
      width: 25%;
    }
    to {
      width: 50%;
    }
`;

const Search = styled(Input)`
  margin: 20px 0 0 0;
  &:focus {
    animation: ${animation};
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }
  @media only screen and (max-width: 810px) {
    padding: 10px 20px 10px 30px;
    font-size: 12px;
    margin: 15px 0 0 0;
  }
  @media only screen and (max-width: 810px) {
    background-size: 12px;
    padding: 5px 20px 5px 30px;
    margin: 15px 0 0 0;
  }
  @media only screen and (max-width: 810px) {
    padding: 5px 10px 5px 30px;
    font-size: 10px;
    margin: 10px 0 0 0;
  }
`;

const MembersGrid = styled.div`
  width: 100%;
  display: grid;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-template-columns: repeat(2, 50%);
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  margin-top: 20px;
  @media only screen and (max-width: 1010px) {
    margin-top: 15px;
  }
  @media only screen and (max-width: 550px) {
    margin-top: 10px;
  }
`;

export default MembersSection;
