import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { routes } from "../miscellanous/Routes";
import EditProfilePage from "../components/editProfile/EditProfilePage";
import UserTemplate from "../templates/UserTemplate";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { endpoints } from "../miscellanous/url";

const EditProfile = () => {
  const [personalData, setPersonalData] = useState(null);
  const [userDataFetchFinished, setUserDataFetchFinished] = useState(false);
  const [error, setError] = useState(null);
  const [notLogged, setNotLogged] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      setNotLogged(true);
    } else {
      getLoggedUserProfile();
    }
  }, []);

  async function getLoggedUserProfile() {
    await axios({
      method: "get",
      url: endpoints.getLoggedUserProfile,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setPersonalData(data.personalDataDTO);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setUserDataFetchFinished(true);
      });
  }

  if (notLogged) {
    return <Redirect to={{ pathname: routes.auth }} />;
  }

  return (
    <UserTemplate>
      {userDataFetchFinished && error === null ? (
        <EditProfilePage personalData={personalData} />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

// <EditProfilePage/>

export default EditProfile;
