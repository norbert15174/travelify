import React, { useState, useEffect } from "react";
import UserTemplate from "../templates/UserTemplate";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import {
  errorTypes,
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
      throw new Error(errorTypes.noAccess);
    } else {
      dispatch(clearStore());
      setError(null);
      getFriends();
      if (location.state !== undefined && location.state.groupId) {
        console.log(location.state);
        setCreatorType(location.state.creatorType);
        setEditedGroupId(location.state.groupId);
        setCreatorType(groupCreator.edition);
        getGroupToEdit(location.state.groupId);
      } else {
        setGroupToEditFetchFinished(true);
        setCreatorType(groupCreator.creation);
      }
    }
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
        console.log(data);
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
