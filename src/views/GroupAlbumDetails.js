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
  setGroupOwner,
  setAlbumOwner,
  setAlbumPhotos,
  setInfo,
  setPhotoTags,
  setRights,
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
      getGroupAlbum();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams.id]);

  async function getGroupAlbum() {
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
      .then(({ data }) => {
        console.log(data);
        dispatch(setAlbumOwner(data.albumOwner));
        dispatch(setGroupOwner(data.groupOwner));
        dispatch(setInfo({
          coordinate: data.coordinate,
          description: data.description,
          name: data.name,
          albumId: data.id,
          creationTime: data.time,
        }));
        let tempPhotos = [];
        let tempTags = [];
        for (let i = 0; i < data.photos.length; i++) {
          tempPhotos.push({
            index: i + 1,
            photo: data.photos[i],
          });
          if (
            history.location.state !== undefined &&
            history.location.state.photoId &&
            data.photos[i].photoId === history.location.state.photoId
          ) {
            setNotifPhoto(tempPhotos[i].index);
          }
          tempTags.push({
            photoId: data.photos[i].photoId,
            tags: data.photos[i].taggedList,
          });
        }
        dispatch(setPhotoTags(tempTags));
        dispatch(setAlbumPhotos(tempPhotos));
        if (
          data.groupOwner.id.toString() ===
            sessionStorage.getItem("loggedUserId") ||
          data.albumOwner.id.toString() ===
            sessionStorage.getItem("loggedUserId")
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
