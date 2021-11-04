import React, { useState, useEffect } from "react";
import UserTemplate from "../templates/UserTemplate";
import axios from "axios";
import { useParams } from "react-router";
import { endpoints } from "../url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errorTypes } from "../miscellanous/Utils";
import GroupInside from "../components/groups/GroupInside";
import { setFriendsList } from "../redux/userDataSlice";
import { useDispatch } from "react-redux";
import {
  setBasicInfo,
  setRights,
  setMembers,
  setGroupAlbums,
  setRequests,
} from "../redux/groupDetailsSlice";
import { groupMember } from "../miscellanous/Utils";

const GroupDetails = () => {
  const urlParams = useParams();
  const [groupId, setGroupId] = useState(null);
  const [friendsFetchFinished, setFriendsFetchFinished] = useState(false);
  const [groupDetailsFetchFinished, setGroupDetailsFetchFinished] =
    useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      throw new Error(errorTypes.noAccess);
    } else {
      setGroupId(urlParams.id);
      getLoggedUserFriendsList();
      getGroupDetails();
    }
  }, []);

  async function getGroupDetails() {
    setGroupDetailsFetchFinished(false);
    await axios({
      method: "get",
      url: endpoints.getGroupDetails + urlParams.id,
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
        dispatch(setMembers(data.members));
        if (
          data.owner.id.toString() === sessionStorage.getItem("loggedUserId")
        ) {
          dispatch(setRights(groupMember.owner));
        } else {
          dispatch(setRights(groupMember.member));
        }
      })
      .catch((error) => {
        if (error.response !== undefined) {
          setError(error.response.status);
        }
        console.error(error);
      })
      .finally(() => {
        setGroupDetailsFetchFinished(true);
      });
  }

  async function getLoggedUserFriendsList() {
    setFriendsFetchFinished(false);
    await axios({
      method: "get",
      url: endpoints.getLoggedUserFriends,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setFriendsList(data));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setFriendsFetchFinished(true);
      });
  }

  if (error === 403) {
    throw new Error(errorTypes.noAccess);
  }

  if (error === 404) {
    throw new Error(errorTypes.notFound);
  }

  return (
    <UserTemplate>
      {friendsFetchFinished && groupDetailsFetchFinished && !error ? (
        <GroupInside groupId={groupId} />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default GroupDetails;
