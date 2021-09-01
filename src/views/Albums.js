import React, { useEffect, useState } from 'react';
import UserTemplate from '../templates/UserTemplate';
import AlbumsPage from "../components/albums/AlbumsPage";
import axios from "axios";
import { endpoints } from "../url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errorTypes } from "../miscellanous/Errors";

// UserTemplate adds Menu sidebar

const Albums = () => {

    const [ publicAlbums, setPublicAlbums ] = useState(null);
    const [ privateAlbums, setPrivateAlbums ] = useState(null);
    const [ sharedAlbums, setSharedAlbums ] = useState(null);
    const [ userAlbumsFetchFinished, setUserAlbumsFetchFinished ] = useState(false);
    const [ sharedAlbumsFetchFinished, setSharedAlbumsFetchFinished ] = useState(false);
	const [ error, setError ] = useState(null);

    // when all requests will be processed redirection to NewsPage will happen
    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
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
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then(({data}) => {
			console.log(data);
            data.map((album) => {   
                if (album.public) {
                    publAlbums.push(album);
                } else {
                    privAlbums.push(album);
                }
                return "";
            });
            setPublicAlbums(publAlbums);
            setPrivateAlbums(privAlbums);
		}).catch((error) => {
			setError(error);
		}).finally(() => {
			setUserAlbumsFetchFinished(true);
		});
    };

    async function getSharedAlbums() {
        await axios({
			method: "get",
			url: endpoints.getLoggedUserSharedAlbums,
			headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
				"Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then(({data}) => {
			console.log(data);
            setSharedAlbums(data);
		}).catch((error) => {
			setError(error);
		}).finally(() => {
			setSharedAlbumsFetchFinished(true);
		});
    }

    return (
        <UserTemplate>
            {
                (userAlbumsFetchFinished && sharedAlbumsFetchFinished && error === null) 
                ?
                    <AlbumsPage publicAlbums={publicAlbums} privateAlbums={privateAlbums} sharedAlbums={sharedAlbums}/>
                :
                    !error
                    ?
                    <Loading/>
                    :
                    <ErrorAtLoading/>
            }
        </UserTemplate>
    );
    
};

export default Albums;