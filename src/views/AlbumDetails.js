import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserTemplate from "../templates/UserTemplate";
import AlbumInside from "../components/albums/AlbumInside";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { endpoints } from "../miscellanous/url";
import { albumTypes, albumRights } from "../miscellanous/Utils";
import { errors } from "../miscellanous/Utils";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { routes } from "../miscellanous/Routes";
import {
  setOwner,
  setAlbumPhotos,
  setSharedPersonList,
  setInfo,
  setPhotoTags,
  setRights,
  setAlbumType,
} from "../redux/albumDetailsSlice";
import {
  selectNotification,
  setNotification,
} from "../redux/notificationSlice";

const AlbumDetails = () => {
  const [albumId, setAlbumId] = useState(null);
  const [notifPhoto, setNotifPhoto] = useState(null);
  const [albumDetailsFetchFinished, setAlbumDetailsFetchFinished] =
    useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [error, setError] = useState(null);
  const urlParams = useParams(); // params straight from url
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);
  const [notLogged, setNotLogged] = useState(false);

  useEffect(() => {
    setAlbumDetailsFetchFinished(false);
    setError(null);
    if (!sessionStorage.getItem("Login")) {
      setNotLogged(true);
    } else {
      setAlbumId(urlParams.id);
      setFirstRun(false);
      getUserAlbum(urlParams.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams.id]);

  useEffect(() => {
    if (notification.albumId && !firstRun) {
      getUserAlbum(notification.albumId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification.photoId, notification.albumId]);

  if (notLogged) {
    return <Redirect to={{ pathname: routes.auth }} />;
  }

  async function getUserAlbum(id) {
    setAlbumDetailsFetchFinished(false);
    setError(null);
    setNotifPhoto(null);
    await axios({
      method: "get",
      url: endpoints.getAlbumDetails + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        let tempPhotos = [];
        let tempTags = [];
        for (let i = 0; i < data.photosDTOS.length; i++) {
          tempPhotos.push({
            index: i + 1,
            photo: data.photosDTOS[i],
          });
          if (data.photosDTOS[i].photoId === notification.photoId) {
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
        dispatch(setSharedPersonList(data.shared));
        dispatch(setAlbumPhotos(tempPhotos));
        if (
          data.owner.id.toString() === sessionStorage.getItem("loggedUserId")
        ) {
          dispatch(setRights(albumRights.owner));
        } else {
          dispatch(setRights(albumRights.visitor));
        }
        if (data.album.public) {
          dispatch(setAlbumType(albumTypes.public));
        } else {
          dispatch(setAlbumType(albumTypes.private));
          if (
            data.shared.find(
              (item) =>
                item.userId.toString() ===
                sessionStorage.getItem("loggedUserId")
            )
          ) {
            dispatch(setRights(albumRights.sharedPerson));
          }
        }
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
        <AlbumInside
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

export default AlbumDetails;
