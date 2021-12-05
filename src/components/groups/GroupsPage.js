import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import { groupCreator } from "../../miscellanous/Utils";
import { useSelector } from "react-redux";
import GroupSearch from "../trinkets/DropdownSearch";
import Button from "../trinkets/Button";
import GroupThumbnail from "./GroupThumbnail";
import "./groupsScrollbar.css";
import addGroupIcon from "./assets/addGroupIcon.svg";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";

const GroupsPage = ({ groups }) => {
  const blurState = useSelector((state) => state.blur.value);
  const [searchList, setSearchList] = useState(null);
  const [groupIdSearch, setGroupIdSearch] = useState(null);
  const [redirectToCreator, setRedirectToCreator] = useState(false);
  const [redirectToGroup, setRedirectToGroup] = useState({
    active: false,
    groupId: "",
  });

  useEffect(() => {
    setGroupIdSearch(null);
    if (!searchList) {
      mapGroupsToSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapGroupsToSearch = () => {
    let searchList = [];
    for (let i = 0; i < groups.length; i++) {
      searchList.push({
        value: groups[i].groupName,
        label: groups[i].groupName,
        groupPicture:
          groups[i].groupPicture !== undefined
            ? groups[i].groupPicture
            : noAlbumPhotoIcon,
        membersAmount: groups[i].members.length,
        id: groups[i].id,
      });
    }
    setSearchList(searchList);
  };

  if (redirectToGroup.active) {
    return (
      <Redirect
        push
        to={{
          pathname: `group/${redirectToGroup.groupId}`,
        }}
      />
    );
  }

  if (groupIdSearch) {
    return (
      <Redirect
        push
        to={{
          pathname: `group/${groupIdSearch}`,
        }}
      />
    );
  }

  // redirection to album creator (CREATION)
  if (redirectToCreator) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.groupCreator,
          state: { creatorType: groupCreator.creation },
        }}
      />
    );
  }

  return (
    <Container blurState={blurState}>
      <PageHeader>
        <Heading>Grupy</Heading>
      </PageHeader>
      <GroupsNavigation>
        <GroupSearch
          searchType="groups"
          options={searchList !== null ? searchList : null}
          setState={setGroupIdSearch}
          value={groupIdSearch}
        />
      </GroupsNavigation>
      <Groups>
        <Header>
          <GridHeader>Twoje grupy</GridHeader>
          <AddButton onClick={() => setRedirectToCreator(true)}>
            Stwórz grupę
          </AddButton>
        </Header>
        <GridLine />
        <Grid className="scroll">
          {groups.length > 0 ? (
            groups.map((item) => (
              <GroupThumbnail
                key={item.id}
                group={item}
                redirectToGroup={() =>
                  setRedirectToGroup({ active: true, groupId: item.id })
                }
              />
            ))
          ) : (
            <NoGroups>Brak grup...</NoGroups>
          )}
        </Grid>
      </Groups>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-row-gap: 15px;
  width: 1500px;
  margin: 0 auto;
  @media only screen and (max-width: 1635px) {
    width: 1300px;
  }
  @media only screen and (max-width: 1425px) {
    width: 1100px;
  }
  @media only screen and (max-width: 1225px) {
    width: 900px;
  }
  @media only screen and (max-width: 1025px) {
    width: 700px;
  }
  @media only screen and (max-width: 825px) {
    width: 500px;
  }
  @media only screen and (max-width: 510px) {
    width: 300px;
  }
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
`;

const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  height: 80px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  @media only screen and (max-width: 870px) {
    height: 70px;
  }
  @media only screen and (max-width: 735px) {
    height: 60px;
  }
  @media only screen and (max-width: 510px) {
    height: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 54px;
  margin: auto auto auto 25px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 825px) {
    font-size: 46px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 24px;
    margin-left: 15px;
  }
`;

const GroupsNavigation = styled.div`
  height: 110px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
`;

const GridLine = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 510px) {
    margin-top: 5px;
  }
`;

const Groups = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  font-size: 17px;
  margin-bottom: 15px;
  padding: 20px 25px;
  @media only screen and (max-width: 825px) {
    font-size: 12px;
    padding: 15px 20px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 8px;
    padding: 10px 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  margin: 35px 0px 15px 0px;
  align-content: start;
  grid-auto-rows: auto;
  grid-gap: 30px;
  max-height: 1000px;
  overflow-y: scroll;
  min-height: 100vh;
  padding-right: 25px;
  @media only screen and (max-width: 825px) {
    margin-top: 20px;
  }
  @media only screen and (max-width: 510px) {
    grid-gap: 15px;
    margin-top: 10px;
  }
`;

const NoGroups = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 825px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 12px;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.color.greyFont};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
  @media only screen and (max-width: 825px) {
    height: 30px;
  }
`;

const GridHeader = styled.h1`
  font-size: 34px;
  @media only screen and (max-width: 1225px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 1025px) {
    font-size: 26px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 22px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 18px;
  }
`;

const AddButton = styled(Button)`
  margin: 0 0 0 auto;
  border-radius: 5px;
  width: 200px;
  font-size: 24px;
  background-image: url(${addGroupIcon});
  background-repeat: no-repeat;
  background-position: 90% 50%;
  background-size: 20px;
  padding-right: 30px;
  @media only screen and (max-width: 1225px) {
    font-size: 18px;
    background-size: 15px;
    padding-right: 15px;
    width: 150px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 12px;
    background-size: 10px;
    width: 100px;
    height: 30px;
  }
  @media only screen and (max-width: 510px) {
    height: 20px;
    width: 80px;
    font-size: 8px;
  }
`;

export default GroupsPage;
