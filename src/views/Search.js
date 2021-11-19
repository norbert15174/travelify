import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { routes } from "../miscellanous/Routes";
import UserTemplate from "../templates/UserTemplate";
import SearchPage from "../components/search/SearchPage";

// UserTemplate adds Menu sidebar

const Search = () => {
  const [notLogged, setNotLogged] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("Login")) {
      setNotLogged(true);
    }
  }, []);

  if (notLogged) {
    return <Redirect to={{ pathname: routes.auth }} />;
  }

  return (
    <UserTemplate>
      <SearchPage />
    </UserTemplate>
  );
};

export default Search;
