import React, { useState, useEffect } from "react";
import AlbumCreatorPage from "../components/albumCreator/AlbumCreatorPage";
import UserTemplate from "../templates/UserTemplate";
import { errorTypes } from "../miscellanous/Errors";

const AlbumCreator = () => {

	const [ ok, setOk ] = useState(false);

	useEffect(() => {
    	if (!sessionStorage.getItem("Login")) {
      		throw new Error(errorTypes.noAccess);
    	} else {
			console.log("fetchingData");
			setOk(true);
		}
  	}, []);

    return (
    	<UserTemplate>
      		{ok && <AlbumCreatorPage/>}
    	</UserTemplate>
  	);

};

export default AlbumCreator;