import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import styled from "styled-components";
import "./groupsScrollbar.css";

const type = {
  comment: "comment",
  newAlbum: "newAlbum",
  newPhoto: "newPhoto",
  newMember: "newMember",
  leftGroup: "leftGroup",
  newName: "newName",
  newDescription: "newDescription",
  newMainPicture: "newMainPicture",
};

const maleEventText = {
  comment: " dodał komentarz do zdjęcia z albumu: ",
  newAlbum: " dodał nowy album: ",
  newPhoto: " dodał nowe zdjęcie w albumie: ",
  newMember: " jest nowym członkiem grupy. Witamy!",
  leftGroup: " opuścił grupę",
  newName: " zmienił nazwę grupy",
  newDescription: " zmienił opis grupy",
  newMainPicture: " zmienił zdjęcie grupowe",
};

const femaleEventText = {
  comment: " dodała komentarz do zdjęcia z albumu: ",
  newAlbum: " dodała nowy album: ",
  newPhoto: " dodała nowe zdjęcie w albumie: ",
  newMember: " jest nowym członkiem grupy. Witamy!",
  leftGroup: " opuściła grupę",
  newName: " zmieniła nazwę grupy na ",
  newDescription: " zmieniła opis grupy",
  newMainPicture: " zmieniła zdjęcie grupowe",
};

const HistorySection = ({ history }) => {
  // my super detection of users gender. Unfortunately works only for polish names :/ .

  const name = "Mikołaj";

  const template =
    name.replace(/ /g, "").substring(name.length - 1) === "a"
      ? femaleEventText
      : maleEventText;

  const [redirectToProfile, setRedirectToProfile] = useState(false);

  if (redirectToProfile) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, 1),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: 1,
              isHeFriend: false,
            },
          },
        }}
      />
    );
  }

  return (
    <>
      <Container>
        <Header>
          <h1>Historia</h1>
          <Line />
        </Header>
        <HistoryGrid className="scroll">
          <EventContainer>
            <MemberPicture
              src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999"
              alt="Member picture"
              onClick={() => setRedirectToProfile(true)}
            />
            <EventText>
              {name} Telec
              {template[type.comment]}
            </EventText>
            <Date>5 sekund temu</Date>
          </EventContainer>
          <EventContainer>
            <MemberPicture
              src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999"
              alt="Member picture"
            />
            <EventText>
              {name} Telec
              {template[type.newMember]}
            </EventText>
            <Date>45 sekund temu</Date>
          </EventContainer>
          <EventContainer>
            <MemberPicture
              src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999"
              alt="Member picture"
            />
            <EventText>
              {name} Telec
              {template[type.newAlbum]}
            </EventText>
            <Date>25 sekund temu</Date>
          </EventContainer>
          <EventContainer>
            <MemberPicture
              src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999"
              alt="Member picture"
            />
            <EventText>
              {name} Telec
              {template[type.newPhoto]}
            </EventText>
            <Date>15 sekund temu</Date>
          </EventContainer>
          <EventContainer>
            <MemberPicture
              src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999"
              alt="Member picture"
            />
            <EventText>
              {name} Telec
              {template[type.leftGroup]}
            </EventText>
            <Date>15 sekund temu</Date>
          </EventContainer>
          <EventContainer>
            <MemberPicture
              src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999"
              alt="Member picture"
            />
            <EventText>
              {name} Telec
              {template[type.newDescription]}
            </EventText>
            <Date>15 sekund temu</Date>
          </EventContainer>
          <EventContainer>
            <MemberPicture
              src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999"
              alt="Member picture"
            />
            <EventText>
              {name} Telec
              {template[type.newName]}
            </EventText>
            <Date>15 sekund temu</Date>
          </EventContainer>
          <EventContainer>
            <MemberPicture
              src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999"
              alt="Member picture"
            />
            <EventText>
              {name} Telec
              {template[type.newMainPicture]}
            </EventText>
            <Date>15 sekund temu</Date>
          </EventContainer>
        </HistoryGrid>
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

const HistoryGrid = styled.div`
  width: 100%;
  display: grid;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-auto-rows: auto;
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

const EventContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MemberPicture = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border: 2px solid ${({ theme }) => theme.color.dark};
  border-radius: 50%;
  cursor: pointer;
  @media only screen and (max-width: 1010px) {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 810px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 550px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 400px) {
    width: 20px;
    height: 20px;
    margin-right: 7.5px;
  }
`;

const EventText = styled.p`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  @media only screen and (max-width: 1010px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 810px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 550px) {
    font-size: 12px;
  }
`;

const Date = styled.p`
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 20px;
  display: inline-block;
  margin: 0 10px 0 auto;
  @media only screen and (max-width: 1010px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 810px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 550px) {
    font-size: 8px;
  }
`;

export default HistorySection;
