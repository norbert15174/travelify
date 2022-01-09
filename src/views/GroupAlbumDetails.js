import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserTemplate from "../templates/UserTemplate";
import GroupAlbumInside from "../components/groupAlbum/GroupAlbumInside";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { endpoints } from "../miscellanous/url";
import { groupMember } from "../miscellanous/Utils";
import { errors } from "../miscellanous/Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroupOwner,
  setAlbumOwner,
  setAlbumPhotos,
  setInfo,
  setPhotoTags,
  setRights,
} from "../redux/groupAlbumSlice";
import {
  selectNotification,
  setNotification,
} from "../redux/notificationSlice";

const GroupAlbumDetails = () => {
  const [albumId, setAlbumId] = useState(null);
  const [notifPhoto, setNotifPhoto] = useState(null);
  const [firstRun, setFirstRun] = useState(true);
  const [albumDetailsFetchFinished, setAlbumDetailsFetchFinished] =
    useState(false);
  const [error, setError] = useState(null);
  const urlParams = useParams(); // params straight from url
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  useEffect(() => {
    setAlbumDetailsFetchFinished(false);
    setError(null);
    if (!sessionStorage.getItem("Login")) {
      throw new Error(errors.noAccess);
    } else {
      setAlbumId(urlParams.id);
      setFirstRun(false);
      getGroupAlbum(urlParams.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (notification.albumId && !firstRun) {
      getGroupAlbum(notification.albumId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification.photoId, notification.albumId]);

  async function getGroupAlbum(id) {
    setAlbumDetailsFetchFinished(false);
    setError(null);
    setNotifPhoto(null);
    await axios({
      method: "get",
      url: endpoints.getGroupAlbumDetails.replace(/:groupAlbumId/i, id),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setAlbumOwner(data.albumOwner));
        dispatch(setGroupOwner(data.groupOwner));
        dispatch(
          setInfo({
            coordinate: data.coordinate,
            description: data.description,
            name: data.name,
            albumId: data.id,
            groupId: data.groupId,
            creationTime: data.time,
          })
        );
        let tempPhotos = [];
        let tempTags = [];
        for (let i = 0; i < data.photos.length; i++) {
          tempPhotos.push({
            index: i + 1,
            photo: data.photos[i],
          });
          if (data.photos[i].photoId === notification.photoId) {
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
          if (error.response.status === 404 || 
            error.response.status === 403) 
          {
            setError(error.response.status);
          } else {
            setError(error);
          }
        }
        console.error(error);
      })
      .finally(() => {
        dispatch(setNotification({ albumId: null, photoId: null }));
        setAlbumDetailsFetchFinished(true);
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
