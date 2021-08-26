import React, { useEffect, useState } from 'react';
import { useLocation, useParams,  } from "react-router-dom";
import UserTemplate from '../templates/UserTemplate';
import AlbumInside from "../components/albums/AlbumInside";
import NotFound from "./NotFound";
//import { endpoints } from "../url";
import { errorTypes } from "../miscellanous/Errors";

const AlbumDetails = () => {

    const [ albumId, setAlbumId ] = useState(null);
    const location = useLocation(); // params passed at Redirect
    const params = useParams(); // params straight from url 

    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            if (location.state !== undefined) {
                setAlbumId(location.state.albumId);
            }
        }
        
    }, [albumId, location.state, params.id]);

    // we need to check if album with following ID exists (this kind of check will only happen when someone types id in the url)
    if ( params.id === "20" ) {
        console.error("404 - Page not found");
        return <NotFound/>;
    } 

    // I'm passing albumId
    return (
        <UserTemplate>
            <AlbumInside albumId={albumId}/>
        </UserTemplate>
    );

}

export default AlbumDetails;