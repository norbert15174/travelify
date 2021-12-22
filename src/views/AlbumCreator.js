import React, { useState, useEffect } from "react";
import { useLocation, Redirect  } from "react-router-dom";
import axios from "axios";
import { routes } from "../miscellanous/Routes";
import AlbumCreatorPage from "../components/albumCreator/AlbumCreatorPage";
import UserTemplate from "../templates/UserTemplate";
import { endpoints } from "../miscellanous/url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { mapFriendsToSelect, albumCreator } from "../miscellanous/Utils";
import {
  clearStore,
  setAlbumPhotosRedux,
  setMainPhotoRedux,
  setBasicInfo,
  setCoordinate,
  setSharedPersonList,
} from "../redux/albumCreatorSlice";
import { setFriendsList } from "../redux/userDataSlice";
import { useDispatch } from "react-redux";

const AlbumCreator = () => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [userFriendsFetchFinished, setUserFriendsFetchFinished] =
    useState(false);
  const [albumDetailsFetchFinished, setAlbumDetailsFetchFinished] =
    useState(false);

  const dispatch = useDispatch();

  const [creatorType, setCreatorType] = useState(null);
  const [editedAlbumId, setEditedAlbumId] = useState(null);
  const [notLogged, setNotLogged] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      setNotLogged(true);
    } else {
      dispatch(clearStore());
      if (location.state !== undefined && location.state.albumId) {
        setCreatorType(location.state.creatorType);
        setEditedAlbumId(location.state.albumId);
        getAlbumToEdit(location.state.albumId);
        getFriends();
      } else {
        setCreatorType(albumCreator.creation);
        getFriends();
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
            public: data.album.public,
            name: data.album.name,
            description: data.album.description,
          })
        );
        dispatch(
          setSharedPersonList(mapFriendsToSelect(data.shared, "shared"))
        );
        dispatch(setCoordinate(data.album.coordinate));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setAlbumDetailsFetchFinished(true);
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
        dispatch(setFriendsList(data));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setUserFriendsFetchFinished(true);
      });
  }

  if (notLogged) {
    return <Redirect to={{ pathname: routes.auth }} />;
  }

  return (
    <UserTemplate>
      {creatorType === albumCreator.edition ? (
        userFriendsFetchFinished && albumDetailsFetchFinished && !error ? (
          <AlbumCreatorPage
            creatorType={creatorType}
            editedAlbumId={editedAlbumId}
          />
        ) : !error ? (
          <Loading />
        ) : (
          <ErrorAtLoading />
        )
      ) : userFriendsFetchFinished && !error ? (
        <AlbumCreatorPage creatorType={creatorType} />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default AlbumCreator;
