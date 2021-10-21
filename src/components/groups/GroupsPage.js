import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { groupTypes } from "../../miscellanous/Utils";
import GroupSearch from "../trinkets/DropdownSearch";
import memberGroupIcon from "./assets/memberGroupIcon.svg";
import notMemberGroupIcon from "./assets/notMemberGroupIcon.svg";
import Button from "../trinkets/Button";
import "./groupsScrollbar.css";
import addGroupIcon from "./assets/addGroupIcon.svg";

const fakeGroups = ["1", "2", "3", "4", "5", "6", "7", "8"];

const GroupsPage = () => {
  const blurState = useSelector((state) => state.blur.value);
  const [groupType, setGroupType] = useState(groupTypes.member);

  return (
    <Container blurState={blurState}>
      <PageHeader>
        <Heading>Grupy</Heading>
      </PageHeader>
      <GroupsNavigation>
        <GroupSearch />
        <Line />
        <GroupsSwitch>
          <GroupOption
            icon={memberGroupIcon}
            active={groupType === groupTypes.member ? true : false}
            onClick={() => setGroupType(groupTypes.member)}
          >
            Twoje grupy
          </GroupOption>
          <GroupOption
            icon={notMemberGroupIcon}
            active={groupType === groupTypes.notMember ? true : false}
            onClick={() => setGroupType(groupTypes.notMember)}
          >
            Inne grupy
          </GroupOption>
        </GroupsSwitch>
      </GroupsNavigation>
      <Groups>
        <Header>
          {groupType === groupTypes.member && <h1>Twoje grupy</h1>}
          {groupType === groupTypes.notMember && <h1>Inne grupy</h1>}
          {groupType !== groupTypes.notMember && (
            <AddButton onClick={() => console.log(true)}>
              Stwórz grupę
            </AddButton>
          )}
        </Header>
        <GridLine />
        <Grid className="scroll">
          {groupType === groupTypes.member &&
            (fakeGroups.length !== 0 ? (
              fakeGroups.map((item) => (
                <img src={item} alt={"grupa nr " + item} />
              ))
            ) : (
              <h1 style={{ color: "#5B5B5B" }}>Brak grup...</h1>
            ))}
          {groupType === groupTypes.notMember &&
            (fakeGroups.length === 0 ? (
              fakeGroups.map((item) => (
                <img src={item} alt={"grupa nr " + item} />
              ))
            ) : (
              <h1 style={{ color: "#5B5B5B" }}>Brak grup...</h1>
            ))}
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
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Line = styled.div`
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  width: 60%;
  margin: 25px auto 0 auto;
  @media only screen and (max-width: 1430px) {
    width: 70%;
  }
  @media only screen and (max-width: 1220px) {
    width: 85%;
  }
  @media only screen and (max-width: 825px) {
    width: 80%;
  }
  @media only screen and (max-width: 510px) {
    width: 85%;
  }
`;

const GridLine = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 510px) {
    margin-top: 5px;
  }
`;

const GroupsSwitch = styled.div`
  margin: 25px auto 30px auto;
  font-size: 24px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 5vw;
  @media only screen and (max-width: 1025px) {
    font-size: 18px;
    grid-column-gap: 2.5vw;
  }
  @media only screen and (max-width: 825px) {
    font-size: 14px;
    grid-column-gap: 1vw;
  }
  @media only screen and (max-width: 510px) {
    margin: 20px auto;
    grid-column-gap: 0.75vw;
    font-size: 10px;
  }
`;

const GroupOption = styled.div`
  background: ${({ active }) => (active ? "rgba(18, 191, 206, 0.4)" : "")};
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border-radius: 15px;
  text-align: center;
  padding: 10px 20px 10px 80px;
  background-image: url(${({ icon }) => icon});
  background-size: 34px;
  background-position: 10% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  @media only screen and (max-width: 825px) {
    background-size: 28px;
    padding: 10px 10px 10px 45px;
  }
  @media only screen and (max-width: 510px) {
    background-size: 22px;
    padding: 10px 10px 10px 35px;
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
  grid-template-columns: repeat(2, 690px);
  grid-auto-rows: 370px;
  grid-gap: 30px;
  max-height: 1000px;
  overflow-y: scroll;
  min-height: 100vh;
  @media only screen and (max-width: 1635px) {
    grid-template-columns: repeat(2, 590px);
  }
  @media only screen and (max-width: 1425px) {
    grid-template-columns: repeat(2, 490px);
  }
  @media only screen and (max-width: 1225px) {
    grid-template-columns: repeat(2, 390px);
    grid-auto-rows: 300px;
  }
  @media only screen and (max-width: 1025px) {
    grid-template-columns: repeat(2, 290px);
    grid-auto-rows: 230px;
    h1 {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 825px) {
    margin-top: 20px;
    grid-template-columns: 420px;
    grid-auto-rows: 282px;
  }
  @media only screen and (max-width: 510px) {
    grid-template-columns: 240px;
    grid-auto-rows: 162px;
    grid-gap: 20px;
    margin-top: 10px;
    h1 {
      font-size: 12px;
    }
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
