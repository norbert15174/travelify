import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../miscellanous/Routes";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import UserTemplate from "../templates/UserTemplate";
import UserPage from "../components/user/UserPage";
import { endpoints } from "../miscellanous/url";
import axios from "axios";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errors } from "../miscellanous/Utils";
import { userTypes } from "../miscellanous/Utils";
import {
  setFriendsList,
  setProfilePicture,
  setUserData,
} from "../redux/userDataSlice";

const User = () => {
  const [notLogged, setNotLogged] = useState(false);
  const [personalData, setPersonalData] = useState(null);
  const [individualAlbums, setInvidualAlbums] = useState(null);
  const [userType, setUserType] = useState(null);
  const [friends, setFriends] = useState(null);
  const [userDataFetchFinished, setUserDataFetchFinished] = useState(false);
  const [userFriendsFetchFinished, setUserFriendsFetchFinished] =
    useState(false);
  const [friendsRequestsFetchFinished, setFriendsRequestsFetchFinished] =
    useState(false);
  const [requestsStatusFetchFinished, setRequestsStatusFetchFinished] =
    useState(false);
  const [requestFromUser, setRequestFromUser] = useState(null);
  const [requestToUser, setRequestToUser] = useState(null);
  const [getUserDataFinished, setGetUserDataFinished] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const urlParams = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserDataFetchFinished(false);
    setUserFriendsFetchFinished(false);
    setFriendsRequestsFetchFinished(false);
    setRequestsStatusFetchFinished(false);
    setGetUserDataFinished(false);
    setError(null);
    if (!sessionStorage.getItem("Login")) {
      setNotLogged(true);
    } else {
      // first condition when user clicks at sidebar, second one when he/she types in the url
      if (
        (location.state !== undefined && location.state.loggedUserProfile) ||
        urlParams.id === sessionStorage.getItem("loggedUserId")
      ) {
        setUserType(userTypes.logged);
        getLoggedUserProfile();
        getLoggedUserFriendsList();
        setFriendsRequestsFetchFinished(true);
        setRequestsStatusFetchFinished(true);
      } else if (
        (location.state !== undefined &&
          location.state.selectedUser.selectIsTrue) ||
        urlParams.id
      ) {
        if (
          location.state !== undefined &&
          location.state.selectedUser.isHeFriend
        ) {
          setUserType(userTypes.friend);
        } else if (
          location.state !== undefined &&
          !location.state.selectedUser.isHeFriend
        ) {
          setUserType(userTypes.unknown);
        }
        getSelectedUserProfle(urlParams.id);
        // this function also checks if logged user is friend of selected user
        getSelectedUserFriendsList(urlParams.id);
        getFriendRequests(urlParams.id);
        getRequestsStatus(urlParams.id);
      } else {
        throw new Error(errors.notFound);
      }
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, urlParams.id]);

  async function getLoggedUserProfile() {
    await axios({
      method: "get",
      url: endpoints.getLoggedUserProfile,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setPersonalData(data.personalDataDTO);
        setInvidualAlbums(data.individualAlbumDTO);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setUserDataFetchFinished(true);
      });
  }

  async function getLoggedUserFriendsList() {
    await axios({
      method: "get",
      url: endpoints.getLoggedUserFriends,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setFriends(data);
        dispatch(setFriendsList(data));
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setUserFriendsFetchFinished(true);
      });
  }

  async function getSelectedUserProfle(id) {
    await axios({
      method: "get",
      url: endpoints.getSelectedUserProfile + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setPersonalData(data.personalDataDTO);
        setInvidualAlbums(data.individualAlbumDTO);
      })
      .catch((error) => {
        if (error.response !== undefined) {
          if (error.response.status === 400) {
            setError(error.response.status);
          } else {
            setError(error);
          }
        }
        console.error(error);
      })
      .finally(() => {
        setUserDataFetchFinished(true);
      });
  }

  async function getSelectedUserFriendsList(id) {
    await axios({
      method: "get",
      url: endpoints.getSelectedUserFriends + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        if (
          // eslint-disable-next-line eqeqeq
          data.find((item) => item.id == sessionStorage.getItem("loggedUserId"))
        ) {
          setUserType(userTypes.friend);
        } else {
          setUserType(userTypes.unknown);
        }
        setFriends(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setUserFriendsFetchFinished(true);
      });
  }

  async function getFriendRequests(id) {
    await axios({
      url: endpoints.getFriendsRequests,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].senderId.toString() === id) {
            setRequestFromUser(data[i]);
          } else {
            setRequestFromUser(null);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setFriendsRequestsFetchFinished(true);
      });
  }

  async function getRequestsStatus(id) {
    setRequestsStatusFetchFinished(false);
    await axios({
      method: "get",
      url: endpoints.getRequestsStatus,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].userId.toString() === id) {
            setRequestToUser(data[i]);
          } else {
            setRequestToUser(null);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setRequestsStatusFetchFinished(true);
      });
  }

  async function getUserData() {
    await axios({
      method: "get",
      url: endpoints.getLoggedUserProfileBasic,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        if (response.data.photo !== undefined) {
          dispatch(setProfilePicture(response.data.photo));
        }
        dispatch(
          setUserData({
            id: response.data.id,
            name: response.data.name,
            surName: response.data.surName,
          })
        );
        sessionStorage.setItem("loggedUserId", response.data.id);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setGetUserDataFinished(true);
      });
  }

  // when selected user profile is not found
  if (error === 400) {
    throw new Error(errors.notFound);
  }

  if (notLogged) {
    return <Redirect to={{ pathname: routes.auth }} />;
  }

  return (
    <UserTemplate>
      {userDataFetchFinished &&
      userFriendsFetchFinished &&
      requestsStatusFetchFinished &&
      friendsRequestsFetchFinished &&
      getUserDataFinished &&
      error === null ? (
        <UserPage
          personalData={personalData}
          individualAlbums={individualAlbums}
          friendsList={friends}
          setFriends={setFriends}
          setUserType={setUserType}
          requestFromUser={requestFromUser}
          setRequestFromUser={setRequestFromUser}
          requestToUser={requestToUser}
          userType={userType}
          userId={urlParams.id}
        />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default User;
