import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import GroupAlbumCreatorPage from "../components/groupAlbumCreator/GroupAlbumCreatorPage";
import UserTemplate from "../templates/UserTemplate";
import { endpoints } from "../url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { albumCreator, groupMember, errorTypes } from "../miscellanous/Utils";
import {
  clearStore,
  setAlbumPhotosRedux,
  setMainPhotoRedux,
  setBasicInfo,
  setCoordinate,
  setRights,
} from "../redux/groupAlbumCreatorSlice";
import { useDispatch } from "react-redux";

const GroupAlbumCreator = () => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [albumDetailsFetchFinished, setAlbumDetailsFetchFinished] =
    useState(false); 

  const dispatch = useDispatch();

  const [creatorType, setCreatorType] = useState(null);
  const [editedAlbumId, setEditedAlbumId] = useState(null);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      throw new Error(errorTypes.noAccess);
    } else {
      dispatch(clearStore());
      console.log(location.state.albumId);
      if (location.state !== undefined && location.state.groupId) {
        setGroupId(location.state.groupId);
      }
      if (location.state !== undefined && location.state.albumId) {
        setCreatorType(location.state.creatorType);
        setEditedAlbumId(location.state.albumId);
        getAlbumToEdit(location.state.albumId);
        // check if user is owner and set rights
      } else {
        dispatch(setRights(groupMember.owner)); // person who creates is the owner of the album
        setCreatorType(albumCreator.creation);
        setAlbumDetailsFetchFinished(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAlbumToEdit(id) {
    await axios({
      method: "get",
      url: endpoints.getAlbumDetails + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setMainPhotoRedux(data.album.mainPhoto));
        dispatch(setAlbumPhotosRedux(data.photosDTOS));
        dispatch(
          setBasicInfo({
            name: data.album.name,
            description: data.album.description,
          })
        );
        dispatch(setCoordinate(data.album.coordinate));
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setAlbumDetailsFetchFinished(true);
      });
  }

  return (
    <UserTemplate>
      {albumDetailsFetchFinished && !error ? (
        <GroupAlbumCreatorPage
          creatorType={creatorType}
          editedAlbumId={editedAlbumId}
          groupId={groupId}
        />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default GroupAlbumCreator;
