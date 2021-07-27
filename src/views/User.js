import React, { useState, useEffect } from "react";
import UserTemplate from "../templates/UserTemplate";
import UserPage from "../components/user/UserPage";
import url from "../url";

// UserTemplate adds Menu sidebar

const User = () => {

    const [ personalData, setPersonalData ] = useState();
    const [ individualAlbums, setInvidualAlbums ] = useState([]);

    useEffect(() => {
        const path = url + "/user/profile";
        fetch(path, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("Bearer"),
          },
        })
          .then((response) => response.json())
          .then((response) => {
            ///console.log(response);
            setPersonalData(response.personalDataDTO);
            console.log(personalData);
            setInvidualAlbums(response.individualAlbumDTO);
            console.log(individualAlbums);
          })
          .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <UserTemplate>
            <UserPage user={personalData} albums={individualAlbums}/>
        </UserTemplate>
    )
    
};

export default User;