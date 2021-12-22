import React, { useEffect, useState } from "react";
import UserTemplate from "../templates/UserTemplate";
import AlbumsPage from "../components/albums/AlbumsPage";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { routes } from "../miscellanous/Routes";
import { endpoints } from "../miscellanous/url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
// UserTemplate adds Menu sidebar

const Albums = () => {
  const [publicAlbums, setPublicAlbums] = useState(null);
  const [privateAlbums, setPrivateAlbums] = useState(null);
  const [sharedAlbums, setSharedAlbums] = useState(null);
  const [userAlbumsFetchFinished, setUserAlbumsFetchFinished] = useState(false);
  const [sharedAlbumsFetchFinished, setSharedAlbumsFetchFinished] =
    useState(false);
  const [error, setError] = useState(null);
  const [notLogged, setNotLogged] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      setNotLogged(true);
    } else {
      setUserAlbumsFetchFinished(false);
      setError(null);
      getAlbums();
      getSharedAlbums();
    }
    // eslint-disable-next-line
  }, []);

  async function getAlbums() {
    let privAlbums = [];
    let publAlbums = [];
    await axios({
      method: "get",
      url: endpoints.getLoggedUserAlbums,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        if (response.data !== "") {
          response.data.map((album) => {
            if (album.public) {
              publAlbums.push(album);
            } else {
              privAlbums.push(album);
            }
            return "";
          });
        }
        setPublicAlbums(publAlbums);
        setPrivateAlbums(privAlbums);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setUserAlbumsFetchFinished(true);
      });
  }

  async function getSharedAlbums() {
    setSharedAlbums([]);
    await axios({
      method: "get",
      url: endpoints.getLoggedUserSharedAlbums,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setSharedAlbums(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setSharedAlbumsFetchFinished(true);
      });
  }

  if (notLogged) {
    return <Redirect to={{ pathname: routes.auth }} />;
  }

  return (
    <UserTemplate>
      {userAlbumsFetchFinished &&
      sharedAlbumsFetchFinished &&
      error === null ? (
        <AlbumsPage
          publicAlbums={publicAlbums}
          privateAlbums={privateAlbums}
          sharedAlbums={sharedAlbums}
        />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default Albums;
