import React, { useEffect, useState } from "react";
import axios from "axios";
import EditProfilePage from "../components/editProfile/EditProfilePage"
import UserTemplate from "../templates/UserTemplate";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errorTypes } from "../miscellanous/Utils";
import { endpoints } from "../url";

const EditProfile = () => {

	const [ personalData, setPersonalData ] = useState(null);
	const [ userDataFetchFinished, setUserDataFetchFinished ] = useState(false);
	const [ error, setError ] = useState(null);
	
	useEffect(() => {
    	if (!sessionStorage.getItem("Login")) {
      		throw new Error(errorTypes.noAccess);
    	} else {
			getLoggedUserProfile();
		}
  	}, []);

	async function getLoggedUserProfile() {
    	await axios({
			method: "get",
			url: endpoints.getLoggedUserProfile,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then(({data}) => {
			console.log(data)
			setPersonalData(data.personalDataDTO);
		}).catch((error) => {
			setError(error);
		}).finally(() => {
			setUserDataFetchFinished(true);
		});
    };

    return (
    	<UserTemplate>
      		{
				(userDataFetchFinished  && error === null) 
				?
					<EditProfilePage
						personalData={personalData} 
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

};

// <EditProfilePage/>

export default EditProfile;