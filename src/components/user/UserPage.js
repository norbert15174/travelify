import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router-dom";
import InfoSection from "./InfoSection";
import GridSection from "./GridSection";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import noBackgroundPicture from "../../assets/noBackgroundPicture.png";
import ButtonIcon from "../trinkets/ButtonIcon";
import editIcon from "./assets/editIcon.svg";
import friendsIcon from "./assets/friendsIcon.svg";
import addFriendIcon from "./assets/addFriendIcon.svg";
import { routes } from "../../miscellanous/Routes";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationBox from "../trinkets/ConfirmationBox";
import {
  setFriendToDeleteId,
  selectFriendToDeleteId,
} from "../../redux/deleteFriendSlice";
import { userTypes } from "../../miscellanous/Utils";
import { endpoints } from "../../miscellanous/url";
import { toggleBlur } from "../../redux/blurSlice";
import {
  selectFriendsList,
  setFriendsList,
  selectUserData,
} from "../../redux/userDataSlice";
import PhotoZoom from "./PhotoZoom";
import Tooltip from "../trinkets/Tooltip";
import MapSection from "./MapSection";

const sections = {
  info: "info",
  albums: "albums",
  friends: "friends",
  map: "map",
};

const UserPage = ({
  personalData,
  individualAlbums,
  friendsList,
  setFriends,
  userType,
  setUserType,
  userId,
  requestFromUser,
  setRequestFromUser,
  requestToUser,
}) => {
  const [infoActive, setInfoActive] = useState(true);
  const [albumsActive, setAlbumsActive] = useState(true);
  const [friendsActive, setFriendsActive] = useState(false);
  const [mapActive, setMapActive] = useState(false);

  const blurState = useSelector((state) => state.blur.value);
  // id of friend we want to delete
  const friendId = useSelector(selectFriendToDeleteId);
  const loggedUserFriends = useSelector(selectFriendsList);
  const loggedUserData = useSelector(selectUserData);
  const dispatch = useDispatch();

  // box for deleting friend
  const [deleteFriendBox, setDeleteFriendBox] = useState(false);

  // box for inviting user
  const [inviteBox, setInviteBox] = useState(false);
  const [invitationSend, setInvitationSend] = useState(false);
  const [errorAtInvitation, setErrorAtInvitation] = useState(null);

  const [requestBox, setRequestBox] = useState(null);

  const [confirm, setConfirm] = useState(false);
  const [refuse, setRefuse] = useState(false);

  const [photoZoom, setPhotoZoom] = useState(null);

  const [redirectToEditProfile, setRedirectToEditProfile] = useState(false);

  useEffect(() => {
    if (blurState) {
      dispatch(toggleBlur());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteFriendBox, inviteBox, requestBox, confirm, refuse]);

  useEffect(() => {
    if (inviteBox && userType === userTypes.unknown) {
      if (confirm) {
        sendInvitation(userId);
      }
      if (refuse) {
        setInvitationSend(false);
        setInviteBox(false);
        setRefuse(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteBox, confirm, refuse]);

  useEffect(() => {
    if ((friendId && userType === userTypes.logged) || deleteFriendBox) {
      setDeleteFriendBox(true);
      // when deleting friend was confirmed
      if (confirm) {
        // friendId when logged user panel is watched
        // userId when friend user panel is watched
        deleteFriend(friendId || userId);
      }
      // when deleting friend was canceled
      if (refuse) {
        dispatch(setFriendToDeleteId(null));
        setDeleteFriendBox(false);
        setRefuse(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendId, deleteFriendBox, confirm, refuse]);

  useEffect(() => {
    if (userType === userTypes.unknown && requestBox) {
      if (confirm) {
        requestHandler("accept");
      }
      if (refuse) {
        requestHandler("decline");
        setRequestBox(false);
        setRefuse(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestBox, confirm, refuse]);

  async function sendInvitation(id) {
    setInvitationSend(false);
    setErrorAtInvitation(null);
    await axios({
      method: "post",
      url: endpoints.sendInvitation + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        setInvitationSend(true);
      })
      .catch((error) => {
        console.error(error);
        setErrorAtInvitation(error);
      })
      .finally(() => {
        setInviteBox(false);
        setConfirm(false);
      });
  }

  async function deleteFriend(id) {
    await axios
      .delete("http://localhost:8020/friends/delete/" + id, {
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        },
      })
      .then((response) => {
        let temp = [];
        if (userType === userTypes.friend) {
          // friend panel
          setUserType(userTypes.unknown);
          temp = friendsList.filter(
            (item) =>
              item.id.toString() !== sessionStorage.getItem("loggedUserId")
          );
        } else {
          // logged user panel
          temp = loggedUserFriends.filter((item) => item.id !== id);
          dispatch(setFriendsList(temp));
        }
        setFriends(temp);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setFriendToDeleteId(null));
        setDeleteFriendBox(false);
        setConfirm(false);
      });
  }

  async function requestHandler(type) {
    await axios({
      method: type === "accept" ? "put" : "delete",
      url: endpoints.invitationHandler + requestFromUser.id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        if (type === "accept") {
          setUserType(userTypes.friend);
          // adding loggedUser to displayed user friends list
          setFriends((prevState) => [
            ...prevState,
            {
              id: loggedUserData.id,
              name: loggedUserData.name,
              lastName: loggedUserData.surName,
              profilePicture: loggedUserData.profilePicture,
            },
          ]);
          dispatch(setFriendsList(data));
        } else if (type === "decline") {
          setUserType(userTypes.unknown);
        }
        setRequestFromUser(null);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setRequestBox(false);
        setConfirm(false);
      });
  }

  const sectionsToggle = (sectionName) => {
    if (sectionName === sections.albums) {
      setAlbumsActive(true);
      setFriendsActive(false);
      setMapActive(false);
    } else if (sectionName === sections.friends) {
      setAlbumsActive(false);
      setFriendsActive(true);
      setMapActive(false);
    } else if (sectionName === sections.info) {
      setInfoActive(!infoActive);
      setMapActive(false);
    } else if (sectionName === sections.map) {
      setInfoActive(false);
      setAlbumsActive(false);
      setFriendsActive(false);
      setMapActive(true);
    }
  };

  if (redirectToEditProfile) {
    return <Redirect push to={{ pathname: routes.editProfile }} />;
  }

  return (
    <>
      {deleteFriendBox &&
        (userType === userTypes.logged || userType === userTypes.friend) && (
          <ConfirmationBox
            children={"Czy na pewno chcesz usunąć daną osobę ze znajomych?"}
            confirm={setConfirm}
            refuse={setRefuse}
          />
        )}
      {inviteBox && userType === userTypes.unknown && (
        <ConfirmationBox
          children={"Czy na pewno chcesz zaprosić daną osobę do znajomych?"}
          confirm={setConfirm}
          refuse={setRefuse}
        />
      )}
      {requestBox && userType === userTypes.unknown && (
        <ConfirmationBox
          children={"Czy chcesz zaakceptować zaproszenie?"}
          confirm={setConfirm}
          refuse={setRefuse}
        />
      )}
      {photoZoom === "profile" && (
        <PhotoZoom
          url={personalData.profilePicture}
          type="profile"
          close={setPhotoZoom}
        />
      )}
      {photoZoom === "background" && (
        <PhotoZoom
          url={personalData.backgroundPicture}
          type="background"
          close={setPhotoZoom}
        />
      )}
      <Container blurState={blurState}>
        <Header>
          <Images>
            <ProfileBackground
              src={
                personalData.backgroundPicture !== undefined
                  ? personalData.backgroundPicture
                  : noBackgroundPicture
              }
              alt="Profile background"
              onError={(e) => {
                e.target.onError = null;
                e.target.src = noBackgroundPicture;
              }}
              onClick={() => setPhotoZoom("background")}
            />
            <ProfilePhoto
              src={
                personalData.profilePicture !== undefined
                  ? personalData.profilePicture
                  : noProfilePictureIcon
              }
              alt="Profile photo"
              onError={(e) => {
                e.target.onError = null;
                e.target.src = noProfilePictureIcon;
              }}
              onClick={() => setPhotoZoom("profile")}
            />
          </Images>
          <Name>{personalData.firstName + " " + personalData.surName}</Name>
          <Line />
          <Options>
            <Button
              active={infoActive ? true : false}
              onClick={() => sectionsToggle(sections.info)}
            >
              Informacje o użytkowniku
            </Button>
            <Button
              active={albumsActive ? true : false}
              onClick={() => sectionsToggle(sections.albums)}
            >
              Albumy
            </Button>
            <Button
              active={friendsActive ? true : false}
              onClick={() => sectionsToggle(sections.friends)}
            >
              Znajomi
            </Button>
            <Button
              active={mapActive ? true : false}
              onClick={() => sectionsToggle(sections.map)}
            >
              Odwiedzone miejsca
            </Button>
            {userType === userTypes.logged && (
              <>
                <EditButton
                  data-tip
                  data-for="edit"
                  icon={editIcon}
                  onClick={() => setRedirectToEditProfile(true)}
                />
                <Tooltip
                  id="edit"
                  place="top"
                  text="Kliknij, by edytować profil"
                />
              </>
            )}
            {userType === userTypes.friend && (
              <UserButton
                icon={friendsIcon}
                onClick={() => setDeleteFriendBox(true)}
              >
                Znajomi
              </UserButton>
            )}
            {userType === userTypes.unknown &&
              !requestFromUser &&
              !invitationSend &&
              !requestToUser && (
                <UserButton
                  icon={addFriendIcon}
                  onClick={() => setInviteBox(true)}
                >
                  Dodaj
                </UserButton>
              )}
            {userType === userTypes.unknown && requestFromUser && (
              <UserButton
                icon={addFriendIcon}
                onClick={() => setRequestBox(true)}
              >
                Masz zaproszenie
              </UserButton>
            )}
            {userType === userTypes.unknown &&
              ((invitationSend && errorAtInvitation === null) ||
                requestToUser) &&
              !requestFromUser && <StyledDiv>Zaproszenie wysłane!</StyledDiv>}
          </Options>
        </Header>
        <InnerContainer>
          {infoActive && (
            <InfoSection
              nationality={personalData.nationality}
              about={personalData.personalDescription.about}
              interest={personalData.personalDescription.interest}
              visitedCountries={
                personalData.personalDescription.visitedCountries
              }
              birthday={personalData.birthday}
              phoneNumber={personalData.phoneNumber}
            />
          )}
          {albumsActive && (
            <GridSection
              userType={userType}
              sectionType={sections.albums}
              data={individualAlbums}
            />
          )}
          {friendsActive && (
            <GridSection
              userType={userType}
              sectionType={sections.friends}
              data={
                userType === userTypes.logged ? loggedUserFriends : friendsList
              }
            />
          )}
          {mapActive && <MapSection data={individualAlbums} type="UserPage" />}
        </InnerContainer>
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
  height: 410px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  margin-bottom: 15px;
  @media only screen and (max-width: 1080px) {
    height: 340px;
  }
  @media only screen and (max-width: 830px) {
    height: 270px;
  }
  @media only screen and (max-width: 735px) {
    height: 250px;
  }
  min-width: 360px;
`;

const Images = styled.div`
  position: relative;
`;

const ProfileBackground = styled.img`
  height: 250px;
  width: 1300px;
  object-fit: cover;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  border-left: 2px solid ${({ theme }) => theme.color.dark};
  border-right: 2px solid ${({ theme }) => theme.color.dark};
  border-bottom: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 1440px) {
    width: 950px;
  }
  @media only screen and (max-width: 1080px) {
    width: 700px;
    height: 200px;
  }
  @media only screen and (max-width: 830px) {
    width: 600px;
    height: 150px;
  }
  @media only screen and (max-width: 735px) {
    width: 550px;
  }
  @media only screen and (max-width: 560px) {
    width: 400px;
  }
  @media only screen and (max-width: 410px) {
    width: 350px;
  }
  min-width: 350px;
`;

const ProfilePhoto = styled.img`
  position: absolute;
  height: 208px;
  width: 208px;
  top: 62%;
  cursor: pointer;
  left: 50%;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.color.light};
  transform: translate(-50%, -50%); // (X, Y)
  @media only screen and (max-width: 1080px) {
    width: 150px;
    height: 150px;
    top: 67%;
  }
  @media only screen and (max-width: 830px) {
    width: 120px;
    height: 120px;
    top: 65%;
  }
  @media only screen and (max-width: 735px) {
    width: 90px;
    height: 90px;
    top: 73%;
  }
`;

const Name = styled.h1`
  margin-top: 20px;
  text-align: center;
  font-size: 40px;
  @media only screen and (max-width: 1080px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 25px;
    margin-top: 10px;
  }
`;

const Line = styled.div`
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  width: 1250px;
  margin: 0 auto;
  @media only screen and (max-width: 1440px) {
    width: 900px;
  }
  @media only screen and (max-width: 1080px) {
    width: 600px;
  }
  @media only screen and (max-width: 830px) {
    width: 550px;
  }
  @media only screen and (max-width: 735px) {
    width: 500px;
  }
  @media only screen and (max-width: 560px) {
    width: 350px;
  }
  @media only screen and (max-width: 410px) {
    width: 300px;
  }
  min-width: 300px;
`;

const Options = styled.div`
  width: 1250px;
  margin: 0 auto;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  color: ${({ theme }) => theme.color.greyFont};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  @media only screen and (max-width: 1440px) {
    width: 900px;
  }
  @media only screen and (max-width: 1080px) {
    grid-template-columns: 180px repeat(2, 100px) 1fr;
    width: 600px;
    font-size: 14px;
  }
  @media only screen and (max-width: 830px) {
    width: 550px;
    grid-template-columns: 130px repeat(2, 80px) 1fr;
    font-size: 10px;
    margin-top: 2px;
  }
  @media only screen and (max-width: 735px) {
    width: 500px;
  }
  @media only screen and (max-width: 560px) {
    width: 350px;
    grid-template-columns: repeat(3, 50px) 1fr;
    font-size: 8px;
  }
  @media only screen and (max-width: 410px) {
    width: 300px;
  }
  min-width: 300px;
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
`;

const UserButton = styled(ButtonIcon)`
  width: 200px;
  height: 39px;
  border-radius: 5px;
  margin: 0 0 0 auto;
  color: ${({ theme }) => theme.color.lightBackground};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding-left: 25px;
  background-image: url(${({ icon }) => icon});
  background-position: 8% 50%;
  background-size: 15%;
  @media only screen and (max-width: 1080px) {
    width: 170px;
    height: 30px;
    font-size: 14px;
  }
  @media only screen and (max-width: 830px) {
    width: 150px;
    height: 20px;
    padding-left: 15px;
    font-size: 10px;
  }
  @media only screen and (max-width: 560px) {
    width: 110px;
    font-size: 8px;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
`;

const EditButton = styled(ButtonIcon)`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin: 0 0 0 auto;
  background-image: url(${({ icon }) => icon});
  background-position: 50% 50%;
  background-size: 70%;
  @media only screen and (max-width: 1080px) {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 830px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 560px) {
    width: 20px;
    height: 20px;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
`;

const StyledDiv = styled.div`
  width: 170px;
  height: 39px;
  border-radius: 5px;
  margin: 0 0 0 auto;
  color: ${({ theme }) => theme.color.lightBackground};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: ${({ theme }) => theme.color.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1080px) {
    width: 130px;
    height: 30px;
    font-size: 14px;
  }
  @media only screen and (max-width: 830px) {
    width: 110px;
    height: 20px;
    font-size: 10px;
  }
  @media only screen and (max-width: 560px) {
    width: 80px;
    font-size: 8px;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  width: 1250px;
  @media only screen and (max-width: 1440px) {
    width: 900px;
  }
  @media only screen and (max-width: 1080px) {
    width: 600px;
  }
  @media only screen and (max-width: 830px) {
    width: 550px;
  }
  @media only screen and (max-width: 735px) {
    width: 500px;
  }
  @media only screen and (max-width: 560px) {
    width: 350px;
  }
  @media only screen and (max-width: 410px) {
    width: 300px;
    margin: 0 auto;
  }
  min-width: 300px;
  margin-bottom: 15px;
`;

export default UserPage;
