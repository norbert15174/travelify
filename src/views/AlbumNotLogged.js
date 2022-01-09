import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserTemplate from "../templates/UserTemplate";
import AlbumInside from "../components/albums/AlbumInside";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { endpoints } from "../miscellanous/url";
import { albumTypes, albumRights } from "../miscellanous/Utils";
import { useDispatch } from "react-redux";
import {
  setOwner,
  setAlbumPhotos,
  setInfo,
  setPhotoTags,
  clearStore,
  setRights,
  setAlbumType,
} from "../redux/albumDetailsSlice";
import { clearStore as clearUserStore } from "../redux/userDataSlice";
import { errors } from "../miscellanous/Utils";

const AlbumNotLogged = () => {
  const [albumId, setAlbumId] = useState(null);
  const [albumDetailsFetchFinished, setAlbumDetailsFetchFinished] =
    useState(false);
  const [error, setError] = useState(null);

  const urlParams = useParams(); // params straight from url
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStore());
    dispatch(clearUserStore());
    setAlbumId(urlParams.id);
    getPreviewAlbum(urlParams.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams.id]);

  async function getPreviewAlbum(id) {
    await axios({
      method: "get",
      url: endpoints.getPreviewAlbum + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        let tempPhotos = [];
        let tempTags = [];
        //let tempComments = [];
        for (let i = 0; i < data.photosDTOS.length; i++) {
          tempPhotos.push({
            index: i + 1,
            photo: data.photosDTOS[i],
          });
          tempTags.push({
            photoId: data.photosDTOS[i].photoId,
            tags: data.photosDTOS[i].taggedList,
          });
        }
        dispatch(setPhotoTags(tempTags));
        dispatch(setOwner(data.owner));
        dispatch(setInfo(data.album));
        dispatch(setAlbumPhotos(tempPhotos));
        dispatch(setRights(albumRights.notLogged));
        dispatch(setAlbumType(albumTypes.public));
      })
      .catch((error) => {
        if (error.response !== undefined) {
          if (error.response.status === 404) {
            setError(error.response.status);
          } else {
            setError(error);
          }
        }
      })
      .finally(() => {
        setAlbumDetailsFetchFinished(true);
      });
  }

  if (error === 404) {
    throw new Error(errors.notFound);
  }

  return (
    <UserTemplate notLogged={true}>
      {albumDetailsFetchFinished && error === null ? (
        <AlbumInside albumId={albumId} />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default AlbumNotLogged;
