import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import UserTemplate from '../templates/UserTemplate';
import AlbumInside from "../components/albums/AlbumInside";

const AlbumDetails = () => {

    const [ albumId, setAlbumId ] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // checking if album will be edited or created
        if (location.state !== undefined) {
            setAlbumId(location.state.albumId);
        }
        

    }, [albumId, location.state]);

    // I'm passing albumId
    return (
        <UserTemplate>
            <AlbumInside albumId={albumId}/>
        </UserTemplate>
    );

}

export default AlbumDetails;