import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import UserTemplate from '../templates/UserTemplate';
import AlbumInside from "../components/albums/AlbumInside";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { endpoints } from "../url";
import { albumTypes, albumRights } from "../miscellanous/Utils";
import { errorTypes } from "../miscellanous/Errors";

const AlbumDetails = () => {

    const [ albumId, setAlbumId ] = useState(null);
    const [ ownerInfo, setOwnerInfo ] = useState(null);
    const [ albumDetails, setAlbumDetails ] = useState(null);
    const [ shared, setShared ] = useState(null);
    const [ photos, setPhotos ] = useState(null);
    const [ albumType, setAlbumType ] = useState(null);
    const [ rights, setRights ] = useState(null);
    const [ albumDetailsFetchFinished, setAlbumDetailsFetchFinished ] = useState(false);
    const [ error, setError ] = useState(null);
    
    const urlParams = useParams(); // params straight from url 

    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            setAlbumId(urlParams.id);
            getUserAlbum(urlParams.id);
        }
    }, [urlParams.id]);

    async function getUserAlbum(id) {
        await axios({
			method: "get",
			url: endpoints.getLoggedUserAlbumDetails + id,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then(({data}) => {
            console.log(data);
            setOwnerInfo(data.owner);
            setAlbumDetails(data.album);
            setPhotos(data.photos);
            if (data.owner.id.toString() === sessionStorage.getItem("loggedUserId")) {
                setRights(albumRights.owner);
            } else {
                setRights(albumRights.visitor);
            }
            if (data.album.public) {
                setAlbumType(albumTypes.public);
            } else {
                setAlbumType(albumTypes.private);
                if (data.shared.find((item) => item.id.toString() === sessionStorage.getItem("loggedUserId"))) {
                    setRights(albumRights.sharedPerson);
                }
            }
		}).catch((error) => {
            if (error.response !== undefined) {
                setError(error.response.status);
            }
		}).finally(() => {
			setAlbumDetailsFetchFinished(true);
		});
    };

    if (error === 403) {
        throw new Error(errorTypes.noAccess);
    }
    
    if (error === 404) {
        throw new Error(errorTypes.notFound);
    }

    return (
        <UserTemplate>
            {
                (albumDetailsFetchFinished && error === null) 
                ?
                    <AlbumInside 
                        rights={rights} 
                        albumType={albumType} 
                        albumId={albumId}
                        owner={ownerInfo}
                        details={albumDetails}
                        photoss={photos}
                    />
                :
                    !error
                    ?
                    <Loading/>
                    :
                    <ErrorAtLoading/>
            }
        </UserTemplate>
    );

}

export default AlbumDetails;