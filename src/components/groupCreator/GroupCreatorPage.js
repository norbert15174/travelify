import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { groupCreator } from "../../miscellanous/Utils";
import ConfirmationBox from "../trinkets/ConfirmationBox";
import Button from "../trinkets/Button";
import ButtonIcon from "../trinkets/ButtonIcon";
import infoIcon from "./assets/infoIcon.svg";
import deleteGroupIcon from "./assets/deleteGroupIcon.svg";
import photoIcon from "./assets/photoIcon.svg";
import membersIcon from "./assets/membersIcon.svg";
import scrollBackIcon from "../../assets/scrollBackIcon.svg";
import Tooltip from "../trinkets/Tooltip";
import axios from "axios";
import { endpoints } from "../../url";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import { useSelector } from "react-redux";
import BasicGroupInfo from "./BasicGroupInfo";
import Members from "./Members";
import GroupPhoto from "./GroupPhoto";

const GroupCreatorPage = ({ editedGroupId, friendsList, creatorType }) => {
  const [confirmDeletingGroup, setConfirmDeletingGroup] = useState(false);
  const [refuseDeletingGroup, setRefuseDeletingGroup] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
  });

  const [members, setMembers] = useState([]);

  const [creatingGroup, setCreatingGroup] = useState(false);
  const [errorAtPosting, setErrorAtPosting] = useState(null);

  const [redirectBackToGroups, setRedirectBackToGroups] = useState(null);
  const [redirectBackToGroup, setRedirectBackToGroup] = useState(null);

  const scrollBack = useRef(null);
  const blurState = useSelector((state) => state.blur.value);

  useEffect(() => {
    // checking if album will be edited or created, setting albumId we are editing
    if (deleteBox && groupCreator.edition === creatorType) {
      if (confirmDeletingGroup) {
        console.log("Group deleted!");
        setDeleteBox(false);
      }
      if (refuseDeletingGroup) {
        console.log("Group not deleted!");
        setDeleteBox(false);
        setRefuseDeletingGroup(false);
        setConfirmDeletingGroup(false);
      }
    }
    // eslint-disable-next-line
  }, [confirmDeletingGroup, refuseDeletingGroup]);

  useEffect(() => {
    console.log(basicInfo);
    console.log(members);
  }, [basicInfo, members]);

  async function createGroup() {
    setErrorAtPosting(null);
    setCreatingGroup(true);
    await axios({
      method: "post",
      url: endpoints.createGroup,
      data: {
        groupName: basicInfo.name,
        description: basicInfo.description,
        members: members.map((item) => item.id)
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        console.log(response);
        // setRedirect when group has been created
      })
      .catch((error) => {
        setErrorAtPosting(error);
        console.error(error);
      })
      .finally(() => {
        setCreatingGroup(false);
      });
  }

  // CREATION or after group delete
  if (redirectBackToGroups) {
    return <Redirect to={{ pathname: routes.groups }} />;
  }

  // when EDITION we are passing groupId to don't lose it
  if (redirectBackToGroup) {
    /* return (
      <Redirect
        to={{
          pathname: `groupId/${editedGroupId}`,
          state: { groupId: editedGroupId },
        }}
      />
    ); */
  }

  return (
    <>
      {deleteBox && creatorType === groupCreator.edition && (
        <ConfirmationBox
          children={"Czy na pewno chcesz usunąć grupę?"}
          confirm={setConfirmDeletingGroup}
          refuse={setRefuseDeletingGroup}
        />
      )}
      <Container blurState={blurState} ref={scrollBack}>
        <PageHeader>
          <Heading>
            {creatorType === groupCreator.creation
              ? "Stwórz grupę"
              : "Edytuj grupę"}
          </Heading>
          <GoBackButton
            onClick={() => {
              if (creatorType === groupCreator.creation) {
                setRedirectBackToGroups(true);
              } else if (creatorType === groupCreator.edition) {
                setRedirectBackToGroup(true);
              }
            }}
          >
            Wróć
          </GoBackButton>
        </PageHeader>
        <SectionContainer>
          <Header>
            <Icon src={infoIcon} />
            <h1>Podstawowe informacje</h1>
          </Header>
          <BasicGroupInfo
            editedGroupId={editedGroupId}
            creatorType={creatorType}
            setForm={setBasicInfo}
          />
        </SectionContainer>
        <SectionContainer>
          <Header>
            <Icon src={membersIcon} />
            <h1>Członkowie</h1>
          </Header>
          <Members
            creatorType={creatorType}
            editedGroupId={editedGroupId}
            friendsList={friendsList}
            setForm={setMembers}
          />
        </SectionContainer>
        {creatorType === groupCreator.edition && (
          <SectionContainer>
            <Header>
              <Icon src={photoIcon} />
              <h1>Zdjęcie grupowe</h1>
            </Header>
            <GroupPhoto editedGroupId={editedGroupId} />
          </SectionContainer>
        )}
        {creatorType === groupCreator.creation &&
          basicInfo.name !== "" &&
          basicInfo.description !== "" && (
            <SectionContainer>
              <End>
                <Line errorAtPosting={errorAtPosting} />
                <StyledButton
                  type="submit"
                  onClick={() => createGroup()}
                  disabled={creatingGroup}
                  errorAtPosting={errorAtPosting}
                >
                  {creatingGroup && "Tworzenie grupy..."}
                  {!creatingGroup && !errorAtPosting && "Stwórz grupę"}
                  {errorAtPosting && (
                    <p>
                      Coś poszło nie tak...
                      <br />
                      Spróbuj ponownie
                    </p>
                  )}
                </StyledButton>
                <Line errorAtPosting={errorAtPosting} />
              </End>
            </SectionContainer>
          )}
        {creatorType === groupCreator.edition && (
          <SectionContainer>
            <Header>
              <Icon src={deleteGroupIcon} />
              <h1>Usuń grupę</h1>
            </Header>
            <WarningMessage>
              <p>Usunięcie grupy jest nieodwracalne!</p>
              <p>Stworzone albumy zostaną usunięte.</p>
            </WarningMessage>
            <DeleteButton onClick={() => setDeleteBox(true)}>Usuń</DeleteButton>
          </SectionContainer>
        )}
      </Container>
      <ScrollBack
        data-tip
        data-for="scrollBack"
        icon={scrollBackIcon}
        onClick={() =>
          scrollBack.current.scrollIntoView({ behavior: "smooth" })
        }
      />
      <Tooltip id="scrollBack" place="top" text="Wróć do góry" />
    </>
  );
};

const ScrollBack = styled(ButtonIcon)`
  position: fixed;
  transform: rotate(180deg);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  bottom: 0;
  margin-bottom: 15px;
  right: 0;
  margin-right: 110px;
  @media only screen and (max-width: 720px) {
    margin-right: 26px;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 15px;
  min-width: 390px;
  margin-bottom: 15px;
  filter: ${({ blurState }) => (blurState === true ? "blur(8px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(8px)" : "none"};
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
  @media only screen and (max-width: 480px) {
    height: 50px;
  }
  @media only screen and (max-width: 360px) {
    height: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 54px;
  margin: 10px auto 10px 25px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 870px) {
    font-size: 46px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 40px;
    margin: 5px auto 5px 25px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 34px;
  }
`;

const GoBackButton = styled(Button)`
  justify-self: end;
  margin-right: 25px;
  border-radius: 5px;
  text-align: center;
  width: auto;
  font-size: 28px;
  height: 42px;
  padding: 0 20px;
  @media only screen and (max-width: 870px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 12px;
    height: 30px;
  }
  @media only screen and (max-width: 720px) {
    margin-right: 65px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 10px;
    padding: 0 10px;
    height: 25px;
  }
  @media only screen and (max-width: 360px) {
    font-size: 8px;
    padding: 0 5px;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 1220px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 9px;
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  @media only screen and (max-width: 1220px) {
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 870px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 560px) {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const SectionContainer = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  border-radius: 15px;
  padding: 20px 40px;
  grid-template-rows: repeat(2, auto);
  @media only screen and (max-width: 1440px) {
    padding: 20px;
  }
  @media only screen and (max-width: 870px) {
    padding: 15px;
  }
  @media only screen and (max-width: 560px) {
    padding: 10px;
  }
`;

const End = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 200px;
  padding: 5px 15px;
  margin: 0px 15px 0px 15px;
  background-color: ${({ theme, errorAtPosting }) =>
    !errorAtPosting ? theme.color.dark : "#B90E0A"};
  &:hover,
  &:focus {
    background-color: ${({ theme, errorAtPosting }) =>
      !errorAtPosting ? theme.color.light : theme.color.redAlert};
  }
`;

const Line = styled.div`
  width: 40%;
  border-top: 2px solid
    ${({ theme, errorAtPosting }) =>
      !errorAtPosting ? theme.color.dark : "#B90E0A"};
`;

const DeleteButton = styled(Button)`
  font-size: 16px;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.color.redAlert};
  display: block;
  width: 150px;
  margin: 50px 0px 0px auto;
  @media only screen and (max-width: 870px) {
    font-size: 14px;
    width: 125px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
    width: 100px;
    height: 30px;
    margin: 35px 0px 0px auto;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.lightRedAlert};
  }
`;

const WarningMessage = styled.div`
  margin: 20px auto 0px auto;
  width: 50%;
  font-size: 24px;
  color: ${({ theme }) => theme.color.redAlert};
  padding: 20px 25px;
  text-align: center;
  text-transform: uppercase;
  border: 5px dashed ${({ theme }) => theme.color.redAlert};
  @media only screen and (max-width: 870px) {
    font-size: 18px;
    padding: 15px 20px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 12px;
    padding: 15px 15px;
  }
`;

export default GroupCreatorPage;
