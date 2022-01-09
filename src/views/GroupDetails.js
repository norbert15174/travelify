import React, { useState, useEffect } from "react";
import UserTemplate from "../templates/UserTemplate";
import axios from "axios";
import { useParams } from "react-router";
import { endpoints } from "../miscellanous/url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errors } from "../miscellanous/Utils";
import GroupInside from "../components/groups/GroupInside";
import { setFriendsList } from "../redux/userDataSlice";
import { useDispatch } from "react-redux";
import {
  setBasicInfo,
  setRights,
  setMembers,
  setGroupAlbums,
} from "../redux/groupDetailsSlice";
import { groupMember } from "../miscellanous/Utils";

const GroupDetails = () => {
  const urlParams = useParams();
  const [groupId, setGroupId] = useState(null);
  const [friendsFetchFinished, setFriendsFetchFinished] = useState(false);
  const [groupDetailsFetchFinished, setGroupDetailsFetchFinished] =
    useState(false);
  const [groupAlbumsFetchFinished, setGroupAlbumsFetchFinished] =
    useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      throw new Error(errors.noAccess);
    } else {
      setGroupId(urlParams.id);
      getLoggedUserFriendsList();
      getGroupDetails();
      getGroupAlbums();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams.id]);

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
          if (error.response.status === 404) {
            setError(error.response.status);
          } else {
            setError(error);
          }
        }
        console.error(error);
      })
      .finally(() => {
        setGroupDetailsFetchFinished(true);
      });
  }

  async function getGroupAlbums() {
    setGroupAlbumsFetchFinished(false);
    await axios({
      method: "get",
      url: endpoints.getGroupAlbums.replace(/:groupId/i, urlParams.id),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setGroupAlbums(data));
      })
      .catch((error) => {
        if (error.response !== undefined) {
          if (error.response.status === 404 || error.response.status === 403) {
            setError(error.response.status);
          } else {
            setError(error);
          }
        }
        console.error(error);
      })
      .finally(() => {
        setGroupAlbumsFetchFinished(true);
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
    throw new Error(errors.noAccess);
  }

  if (error === 404) {
    throw new Error(errors.notFound);
  }

  return (
    <UserTemplate>
      {friendsFetchFinished &&
      groupDetailsFetchFinished &&
      groupAlbumsFetchFinished &&
      !error ? (
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
