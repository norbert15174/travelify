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
import { clearStore } from "../redux/groupCreatorSlice";

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
      if (location.state !== undefined && location.state.groupId) {
        console.log(location.state);
        /* setCreatorType(location.state.creatorType);
        setEditedGroupId(location.state.groupId);
        getGroupToEdit(location.state.groupId);
        getFriends();
        setCreatorType(groupCreator.edition); */
      } else {
        setGroupToEditFetchFinished(true);
        getFriends();
        setCreatorType(groupCreator.creation);
      }
    }
  }, []);

  async function getGroupToEdit(id) {
    setGroupToEditFetchFinished(true);
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
        let temp = [];
        temp = mapFriendsToSelect(data);
        setFriendsList(temp);
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
