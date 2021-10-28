import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ButtonIcon from "../trinkets/ButtonIcon";
import noBackgroundPicture from "../../assets/noBackgroundPicture.png";
import { useSelector, useDispatch } from "react-redux";
import threeDotsIcon from "./assets/threeDotsIcon.svg";
import editIcon from "./assets/editIcon.svg";
import addGroupIcon from "./assets/addGroupIcon.svg";
import PhotoZoom from "../user/PhotoZoom";
import groupMemberIconWhite from "./assets/groupMemberIconWhite.svg";
import crownIconWhite from "./assets/crownIconWhite.svg";
import closeIconWhite from "./assets/closeIconWhite.svg";
import closeIconBlack from "./assets/closeIconBlack.svg";
import DescriptionSection from "./DescriptionSection";
import MembersSection from "./MembersSection";
import GroupAlbumSection from "./GroupAlbumSection";
import HistorySection from "./HistorySection";
import InvitationBox from "./InvitationBox";
import Tooltip from "../trinkets/Tooltip";
import ConfirmationBox from "../trinkets/ConfirmationBox";
import { toggleBlur } from "../../redux/blurSlice";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import { groupCreator } from "../../miscellanous/Utils";

/* import axios from "axios";
import { endpoints } from "../../url";
import { toggleBlur } from "../../redux/blurSlice"; */

const section = {
  info: "info",
  members: "members",
  albums: "albums",
  history: "history",
};

const tempAlbums = [
  {
    id: 1,
    name: "Album numer 1",
    coordinate: {
      place: "Poland",
      country: { country: "Cracow" },
    },
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    mainPhoto:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    owner: {
      id: "owner1",
      name: "Imię",
      surname: "Nazwisko",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 2,
    name: "Album numer 2",
    coordinate: {
      place: "Poland",
      country: { country: "Cracow" },
    },
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    mainPhoto:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    owner: {
      id: "owner2",
      name: "Imię",
      surname: "Nazwisko",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 3,
    name: "Album numer 3",
    coordinate: {
      place: "Poland",
      country: { country: "Cracow" },
    },
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    mainPhoto:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    owner: {
      id: "owner3",
      name: "Imię",
      surname: "Nazwisko",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 4,
    name: "Album numer 4",
    coordinate: {
      place: "Poland",
      country: { country: "Cracow" },
    },
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    mainPhoto:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    owner: {
      id: "owner4",
      name: "Imię",
      surname: "Nazwisko",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 5,
    name: "Album numer 5",
    coordinate: {
      place: "Poland",
      country: { country: "Cracow" },
    },
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    mainPhoto:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    owner: {
      id: "owner5",
      name: "Imię",
      surname: "Nazwisko",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 6,
    name: "Album numer 6",
    coordinate: {
      place: "Poland",
      country: { country: "Cracow" },
    },
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    mainPhoto:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    owner: {
      id: "owner6",
      name: "Imię",
      surname: "Nazwisko",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 7,
    name: "Album numer 7",
    coordinate: {
      place: "Poland",
      country: { country: "Cracow" },
    },
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    mainPhoto:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    owner: {
      id: "owner7",
      name: "Imię",
      surname: "Nazwisko",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 8,
    name: "Album numer 8",
    coordinate: {
      place: "Poland",
      country: { country: "Cracow" },
    },
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    mainPhoto:
      "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg",
    owner: {
      id: "owner8",
      name: "Imię",
      surname: "Nazwisko",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
];

const GroupInside = ({ group, groupId }) => {
  const blurState = useSelector((state) => state.blur.value);
  const [photoZoom, setPhotoZoom] = useState(false);
  const [memberButtonText, setMemberButtonText] = useState("Dołączono");
  const [memberButtonIcon, setMemberButtonIcon] =
    useState(groupMemberIconWhite);
  const [currentSection, setCurrentSection] = useState(section.info);
  const [redirectToProfile, setRedirectToProfile] = useState({
    active: false,
    id: null,
  });
  const [redirectToGroupEdit, setRedirectToGroupEdit] = useState({
    active: false,
    id: null,
  });
  const [inviteFriendBox, setInviteFriendBox] = useState(false);
  const [removeMemberBox, setRemoveMemberBox] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [refuse, setRefuse] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blurState) {
      dispatch(toggleBlur());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeMemberBox, memberToRemove, confirm, refuse]);

  /*
    when user wants to leave group
  */
  useEffect(() => {
    if (removeMemberBox) {
      if (confirm) {
        setConfirm(false);
        setRemoveMemberBox(false);
      }
      if (refuse) {
        setRemoveMemberBox(false);
        setRefuse(false);
      }
    }
  }, [removeMemberBox, confirm, refuse]);

  /*
    when owner removes someone from the group
  */
  useEffect(() => {
    if (memberToRemove) {
      if (!removeMemberBox) setRemoveMemberBox(true);
      if (confirm) {
        setConfirm(false);
        setRemoveMemberBox(false);
        setMemberToRemove(null);
      }
      if (refuse) {
        setRemoveMemberBox(false);
        setRefuse(false);
        setMemberToRemove(null);
      }
    }
  }, [removeMemberBox, memberToRemove, confirm, refuse]);

  if (redirectToProfile.active) {
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

  // redirection to album edition (EDITION)
  if (redirectToGroupEdit.active) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.groupCreator,
          state: {
            creatorType: groupCreator.edition,
            groupId: redirectToGroupEdit.id,
          },
        }}
      />
    );
  }

  return (
    <>
      {photoZoom && (
        <PhotoZoom
          url={group.groupPicture}
          type="background"
          close={setPhotoZoom}
        />
      )}
      {removeMemberBox && memberToRemove && (
        <ConfirmationBox
          children={
            "Czy na pewno chcesz usunąć daną osobę z grupy?"
          }
          confirm={setConfirm}
          refuse={setRefuse}
        />
      )}
      {removeMemberBox && !memberToRemove && (
        <ConfirmationBox
          children={"Czy na pewno chcesz opuścić grupę?"}
          confirm={setConfirm}
          refuse={setRefuse}
        />
      )}
      {inviteFriendBox && (
        <InvitationBox setClose={setInviteFriendBox} groupId={groupId} />
      )}
      <Container blurState={blurState}>
        <Header>
          <GroupPicture
            src={
              group.groupPicture !== undefined
                ? group.groupPicture
                : noBackgroundPicture
            }
            alt={"Group picture " + group.id}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noBackgroundPicture;
            }}
            onClick={() => setPhotoZoom("background")}
          />
          <InnerContainer>
            <GroupName>{group.groupName}</GroupName>
            <MembersAmount>
              {group.members.length > 1
                ? group.members.length + " członków grupy"
                : "1 członek grupy"}
            </MembersAmount>
            <RowSection>
              {group.members.slice(0, 12).map((item) => (
                <MemberPicture
                  key={item.id}
                  title={item.name + " " + item.surname}
                  icon={item.profilePicture}
                  onClick={() =>
                    setRedirectToProfile({ active: true, id: item.id })
                  }
                />
              ))}
              {group.members.length > 12 ? (
                <Limit
                  title={group.members
                    .slice(13)
                    .map((item) => item.name + " " + item.surname)}
                  icon={threeDotsIcon}
                />
              ) : null}
              <Buttons>
                <MemberButton icon={crownIconWhite} buttonType="owner">
                  Właściciel
                </MemberButton>
                {/* <MemberButton
                  icon={memberButtonIcon}
                  onClick={() => setRemoveMemberBox(true)}
                  onMouseEnter={() => {
                    setMemberButtonText("Opuścić?");
                    setMemberButtonIcon(closeIconWhite);
                  }}
                  onMouseLeave={() => {
                    setMemberButtonText("Dołączono");
                    setMemberButtonIcon(groupMemberIconWhite);
                  }}
                  buttonType="member"
                >
                  {memberButtonText}
                </MemberButton> */}
                <MemberButton
                  icon={addGroupIcon}
                  buttonType="invite"
                  onClick={() => setInviteFriendBox(true)}
                >
                  Zaproś
                </MemberButton>
                <EditButton
                  data-tip
                  data-for="edit"
                  icon={editIcon}
                  onClick={() =>
                    setRedirectToGroupEdit({ active: true, id: groupId })
                  }
                />
                <Tooltip
                  id="edit"
                  place="bottom"
                  text="Edytuj grupę"
                />
              </Buttons>
            </RowSection>
            <Line />
            <SectionButtons>
              <Button
                active={currentSection === section.info ? true : false}
                onClick={() => setCurrentSection(section.info)}
              >
                <p>Opis</p>
              </Button>
              <Button
                active={currentSection === section.members ? true : false}
                onClick={() => setCurrentSection(section.members)}
              >
                <p>Członkowie grupy</p>
              </Button>
              <Button
                active={currentSection === section.albums ? true : false}
                onClick={() => setCurrentSection(section.albums)}
              >
                <p>Albumy grupowe</p>
              </Button>
              <Button
                active={currentSection === section.history ? true : false}
                onClick={() => setCurrentSection(section.history)}
              >
                <p>Historia</p>
              </Button>
            </SectionButtons>
          </InnerContainer>
        </Header>
        <SectionContainer>
          {currentSection === section.info && (
            <DescriptionSection description={group.description} />
          )}
          {currentSection === section.members && (
            <MembersSection
              members={group.members}
              setMemberToRemove={setMemberToRemove}
            />
          )}
          {currentSection === section.albums && (
            <GroupAlbumSection albums={tempAlbums} />
          )}
          {currentSection === section.history && (
            <HistorySection history={[]} />
          )}
        </SectionContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
`;

const Header = styled.div`
  width: 100%;
  height: 480px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 810px) {
    height: 450px;
  }
  @media only screen and (max-width: 550px) {
    height: 350px;
  }
  @media only screen and (max-width: 400px) {
    height: 280px;
  }
`;

const GroupPicture = styled.img`
  height: 250px;
  width: 82%;
  object-fit: cover;
  cursor: pointer;
  border-left: 2px solid ${({ theme }) => theme.color.dark};
  border-right: 2px solid ${({ theme }) => theme.color.dark};
  border-bottom: 2px solid ${({ theme }) => theme.color.dark};
  min-width: 350px;
  background-color: #000;
  @media only screen and (max-width: 550px) {
    height: 200px;
  }
  @media only screen and (max-width: 400px) {
    height: 150px;
  }
`;

const InnerContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
  @media only screen and (max-width: 550px) {
    padding: 10px 15px;
  }
  @media only screen and (max-width: 400px) {
    padding: 10px 20px;
  }
`;

const GroupName = styled.h1`
  font-size: 48px;
  margin-bottom: 5px;
  @media only screen and (max-width: 810px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 550px) {
    font-size: 32px;
  }
  @media only screen and (max-width: 400px) {
    font-size: 28px;
  }
`;

const MembersAmount = styled.h1`
  color: ${({ theme }) => theme.color.greyFont};
  margin-bottom: 10px;
  @media only screen and (max-width: 810px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 550px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 550px) {
    margin-bottom: 7.5px;
  }
`;

const RowSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MemberPicture = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  cursor: pointer;
  margin-right: -10px;
  border: 2px solid ${({ theme }) => theme.color.dark};
  background-color: ${({ theme }) => theme.color.darkBackground};
  background: url(${({ icon }) => icon}) 0 0 no-repeat;
  background-size: cover;
  @media only screen and (max-width: 1010px) {
    height: 30px;
    width: 30px;
  }
  @media only screen and (max-width: 810px) {
    height: 25px;
    width: 25px;
  }
  @media only screen and (max-width: 550px) {
    height: 20px;
    width: 20px;
  }
  @media only screen and (max-width: 400px) {
    display: none;
  }
`;

const Limit = styled.div`
  border-radius: 50%;
  height: 44px;
  width: 44px;
  margin-right: -10px;
  background-color: ${({ theme }) => theme.color.dark};
  background: url(${({ icon }) => icon}) 50% 50% no-repeat;
  background-size: 100%;
  @media only screen and (max-width: 1010px) {
    height: 34px;
    width: 34px;
  }
  @media only screen and (max-width: 810px) {
    height: 29px;
    width: 29px;
  }
  @media only screen and (max-width: 550px) {
    height: 24px;
    width: 24px;
  }
  @media only screen and (max-width: 400px) {
    display: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 auto;
`;

const MemberButton = styled(ButtonIcon)`
  width: 110px;
  height: 40px;
  border-radius: 5px;
  margin: 0 0 0 10px;
  color: ${({ theme }) => theme.color.lightBackground};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding-left: 20px;
  background-image: url(${({ icon }) => icon});
  background-position: 8% 50%;
  background-size: 15%;
  &:hover,
  &:focus {
    background-color: ${({ theme, buttonType }) =>
      buttonType !== "owner" ? theme.color.light : ""};
  }
  cursor: ${({ buttonType }) =>
    buttonType !== "owner" ? "pointer" : "default"};
  @media only screen and (max-width: 1010px) {
    font-size: 14px;
    height: 35px;
    width: 100px;
    padding-left: 15px;
  }
  @media only screen and (max-width: 810px) {
    font-size: 12px;
    height: 25px;
    width: 70px;
    margin: 0 0 0 8px;
  }
  @media only screen and (max-width: 550px) {
    font-size: 8px;
    height: 20px;
    width: 50px;
    margin: 0 0 0 6px;
  }
`;

const EditButton = styled(ButtonIcon)`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin: 0 0 0 10px;
  background-image: url(${({ icon }) => icon});
  background-position: 50% 50%;
  background-size: 70%;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
  @media only screen and (max-width: 1010px) {
    height: 35px;
    width: 35px;
  }
  @media only screen and (max-width: 810px) {
    height: 25px;
    width: 25px;
    margin: 0 0 0 8px;
  }
  @media only screen and (max-width: 550px) {
    height: 20px;
    width: 20px;
    margin: 0 0 0 6px;
  }
`;

const Line = styled.div`
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  margin-top: 15px;
  width: 100%;
  @media only screen and (max-width: 400px) {
    margin-top: 5px;
  }
`;

const SectionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  @media only screen and (max-width: 550px) {
    margin-top: 5px;
  }
  @media only screen and (max-width: 400px) {
    margin-top: 2.5px;
  }
`;

const Button = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
  color: ${({ active, theme }) => (active ? "#000" : theme.color.greyFont)};

  &:hover {
    background-color: rgba(18, 191, 206, 0.4);
    -webkit-transition: all 0.15s ease-in-out;
    -o-transition: all 0.15s ease-in-out;
    -moz-transition: all 0.15s ease-in-out;
    transition: all 0.15s ease-in-out;
  }
  p {
    font-size: 18px;
  }
  @media only screen and (max-width: 810px) {
    p {
      font-size: 14px;
    }
    margin-right: 8px;
  }
  @media only screen and (max-width: 550px) {
    p {
      font-size: 10px;
    }
    margin-right: 6px;
  }
`;

const SectionContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  border-radius: 15px;
`;

export default GroupInside;
