import React, { useEffect } from 'react';
import UserTemplate from '../templates/UserTemplate';
import AlbumsPage from "../components/albums/AlbumsPage";
//import { endpoints } from "../url";
import { errorTypes } from "../miscellanous/Errors";

// UserTemplate adds Menu sidebar

const Albums = () => {

    // when all requests will be processed redirection to NewsPage will happen
    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            console.log("fetching")
        }
    // eslint-disable-next-line
    }, []);

    return (
        <UserTemplate>
            <AlbumsPage/>
        </UserTemplate>
    );
    
};

export default Albums;