import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import UserTemplate from '../templates/UserTemplate';
import AlbumInside from "../components/albums/AlbumInside";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { endpoints } from "../url";
import { albumTypes, albumRights } from "../miscellanous/Utils";
import { errorTypes } from "../miscellanous/Errors";
import { useDispatch } from "react-redux";
import { setOwner, setAlbumPhotos, setSharedPersonList, setInfo, setTags, clearStore, setRights, setAlbumType } from "../redux/albumDetailsSlice";

const AlbumDetails = () => {

    const [ albumId, setAlbumId ] = useState(null);
    const [ albumDetailsFetchFinished, setAlbumDetailsFetchFinished ] = useState(false);
    const [ error, setError ] = useState(null);
    
    const urlParams = useParams(); // params straight from url 
    const dispatch = useDispatch();

    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            dispatch(clearStore());
            setAlbumId(urlParams.id);
            getUserAlbum(urlParams.id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams.id]);

    async function getUserAlbum(id) {
        await axios({
			method: "get",
			url: endpoints.getAlbumDetails + id,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then(({data}) => {
            console.log(data);
            let tempPhotos = [];
            let tempTags = [];
            for (let i=0; i < data.photosDTOS.length; i++) {
                tempPhotos.push({
                    index: i + 1,
                    photo: data.photosDTOS[i],
                })
                tempTags.push({
                    photoId: data.photosDTOS[i].photoId,
                    tags: data.photosDTOS[i].taggedList,
                });
            };
            dispatch(setTags(tempTags));
            dispatch(setOwner(data.owner));
            dispatch(setInfo(data.album));
            dispatch(setSharedPersonList(data.shared));
            dispatch(setAlbumPhotos(tempPhotos));
            if (data.owner.id.toString() === sessionStorage.getItem("loggedUserId")) {
                dispatch(setRights(albumRights.owner));
            } else {
                dispatch(setRights(albumRights.visitor));
            }
            if (data.album.public) {
                dispatch(setAlbumType(albumTypes.public));
            } else {
                dispatch(setAlbumType(albumTypes.private));
                if (data.shared.find((item) => item.userId.toString() === sessionStorage.getItem("loggedUserId"))) {
                    dispatch(setRights(albumRights.sharedPerson));
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
                    albumId={albumId}
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