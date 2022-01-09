import React, { useState, useEffect } from "react";
import UserTemplate from "../templates/UserTemplate";
import { useLocation, Redirect } from "react-router-dom";
import { routes } from "../miscellanous/Routes";
import axios from "axios";
import { endpoints } from "../miscellanous/url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import {
  groupCreator,
  mapFriendsToSelect,
} from "../miscellanous/Utils";
import GroupCreatorPage from "../components/groupCreator/GroupCreatorPage";
import { useDispatch } from "react-redux";
import {
  clearStore,
  setBasicInfo,
  setGroupPicture,
  setMembers,
} from "../redux/groupCreatorSlice";

const GroupCreator = () => {
  const [notLogged, setNotLogged] = useState(false);
  const [userFriendsFetchFinished, setUserFriendsFetchFinished] =
    useState(false);
  const [groupToEditFetchFinished, setGroupToEditFetchFinished] =
    useState(false);
  const [error, setError] = useState(null);
  const [creatorType, setCreatorType] = useState(null);
  const [editedGroupId, setEditedGroupId] = useState(null);
  const [friendsList, setFriendsList] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      setNotLogged(true);
    } else {
      dispatch(clearStore());
      setError(null);
      getFriends();
      if (location.state !== undefined && location.state.groupId) {
        setCreatorType(location.state.creatorType);
        setEditedGroupId(location.state.groupId);
        setCreatorType(groupCreator.edition);
        getGroupToEdit(location.state.groupId);
      } else {
        setGroupToEditFetchFinished(true);
        setCreatorType(groupCreator.creation);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGroupToEdit(id) {
    setGroupToEditFetchFinished(false);
    await axios({
      method: "get",
      url: endpoints.getGroupDetails + location.state.groupId,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(
          setBasicInfo({
            groupName: data.groupName,
            groupPicture:
              data.groupPicture !== undefined ? data.groupPicture : undefined,
            description: data.description,
            owner: data.owner,
          })
        );
        dispatch(setMembers(mapFriendsToSelect(data.members, "shared")));
        if (data.groupPicture !== undefined) {
          dispatch(setGroupPicture(data.groupPicture));
        }
      })
      .catch((error) => {
        if (error.response !== undefined) {
          setError(error.response.status);
        }
        console.error(error);
      })
      .finally(() => {
        setGroupToEditFetchFinished(true);
      });
  }

  async function getFriends() {
    setUserFriendsFetchFinished(false);
    await axios({
      method: "get",
      url: endpoints.getLoggedUserFriends,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setFriendsList(mapFriendsToSelect(data));
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setUserFriendsFetchFinished(true);
      });
  }

  if (notLogged) {
    return <Redirect to={{ pathname: routes.auth }} />;
  }

  return (
    <UserTemplate>
      {userFriendsFetchFinished &&
      groupToEditFetchFinished &&
      error === null ? (
        <GroupCreatorPage
          friendsList={friendsList}
          creatorType={creatorType}
          editedGroupId={editedGroupId}
        />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default GroupCreator;
