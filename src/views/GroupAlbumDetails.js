import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import UserTemplate from "../templates/UserTemplate";
import GroupAlbumInside from "../components/groupAlbum/GroupAlbumInside";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { endpoints } from "../url";
import { groupMember } from "../miscellanous/Utils";
import { errorTypes } from "../miscellanous/Utils";
import { useDispatch } from "react-redux";
import {
  setOwner,
  setAlbumPhotos,
  setInfo,
  setPhotoTags,
  setRights,
  setMembers,
} from "../redux/groupAlbumSlice";

const GroupAlbumDetails = () => {
  const [albumId, setAlbumId] = useState(null);
  const [notifPhoto, setNotifPhoto] = useState(null);
  const [albumDetailsFetchFinished, setAlbumDetailsFetchFinished] =
    useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const urlParams = useParams(); // params straight from url
  const dispatch = useDispatch();

  useEffect(() => {
    setAlbumDetailsFetchFinished(false);
    setError(null);
    if (!sessionStorage.getItem("Login")) {
      throw new Error(errorTypes.noAccess);
    } else {
      setAlbumId(urlParams.id);
      if (
        history.location.state !== undefined &&
        history.location.state.photoId
      ) {
        console.log("photoId: " + history.location.state.photoId);
      } else {
        history.replace({ state: {} });
        setNotifPhoto(null);
      }
      getAlbum();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams.id]);

  async function getAlbum(id) {
    await axios({
      method: "get",
      url: endpoints.getAlbumDetails + 2,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        let tempPhotos = [];
        let tempTags = [];
        for (let i = 0; i < data.photosDTOS.length; i++) {
          tempPhotos.push({
            index: i + 1,
            photo: data.photosDTOS[i],
          });
          if (
            history.location.state !== undefined &&
            history.location.state.photoId &&
            data.photosDTOS[i].photoId === history.location.state.photoId
          ) {
            setNotifPhoto(tempPhotos[i].index);
          }
          tempTags.push({
            photoId: data.photosDTOS[i].photoId,
            tags: data.photosDTOS[i].taggedList,
          });
        }
        dispatch(setPhotoTags(tempTags));
        dispatch(setOwner(data.owner));
        dispatch(setInfo(data.album));
        dispatch(setAlbumPhotos(tempPhotos));
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
        history.replace({ state: {} });
        setAlbumDetailsFetchFinished(true);
      });
  }

  async function getGroupAlbum() {
    console.log(urlParams.id)
    await axios({
      method: "get",
      url: endpoints.getGroupAlbumDetails.replace(
        /:groupAlbumId/i,
        urlParams.id
      ),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        console.log(response);
        /* let tempPhotos = [];
        let tempTags = [];
        for (let i = 0; i < data.photosDTOS.length; i++) {
          tempPhotos.push({
            index: i + 1,
            photo: data.photosDTOS[i],
          });
          if (
            history.location.state !== undefined &&
            history.location.state.photoId &&
            data.photosDTOS[i].photoId === history.location.state.photoId
          ) {
            setNotifPhoto(tempPhotos[i].index);
          }
          tempTags.push({
            photoId: data.photosDTOS[i].photoId,
            tags: data.photosDTOS[i].taggedList,
          });
        }
        dispatch(setPhotoTags(tempTags));
        dispatch(setOwner(data.albumOwner));
        dispatch(setInfo(data.album));
        dispatch(setAlbumPhotos(tempPhotos)); */
        /* if (
          data.groupOwner.id.toString() ===
            sessionStorage.getItem("loggedUserId") ||
          data.albumOwner.id.toString() ===
            sessionStorage.getItem("loggedUserId")
        ) {
          dispatch(setRights(groupMember.owner));
        } else {
          dispatch(setRights(groupMember.member));
        } */
      })
      .catch((error) => {
        if (error.response !== undefined) {
          setError(error.response.status);
        }
        console.error(error);
      })
      .finally(() => {
        history.replace({ state: {} });
        setAlbumDetailsFetchFinished(true);
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
      {albumDetailsFetchFinished && error === null ? (
        <GroupAlbumInside
          key={"album" + new Date().getTime()}
          albumId={albumId}
          notifPhoto={notifPhoto}
        />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default GroupAlbumDetails;
