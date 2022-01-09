import React, { useState, useEffect } from "react";
import UserTemplate from "../templates/UserTemplate";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { routes } from "../miscellanous/Routes";
import { endpoints } from "../miscellanous/url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errors } from "../miscellanous/Utils";
import GroupsPage from "../components/groups/GroupsPage";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [notLogged, setNotLogged] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      setNotLogged(true);
    } else {
      getUserGroups();
    }
  }, []);

  async function getUserGroups() {
    setLoadingFinished(false);
    await axios({
      method: "get",
      url: endpoints.getGroups,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setGroups(data);
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      })
      .finally(() => {
        setLoadingFinished(true);
      });
  }

  if (notLogged) {
    return <Redirect to={{ pathname: routes.auth }} />;
  }

  return (
    <UserTemplate>
      {loadingFinished && !error ? (
        <GroupsPage groups={groups} />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default Groups;
