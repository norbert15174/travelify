import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import UserTemplate from "../templates/UserTemplate";
import UserPage from "../components/user/UserPage";
import { endpoints } from "../url";
import axios from "axios";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errorTypes } from "../miscellanous/Errors";
import { userTypes } from "../miscellanous/Utils";
import { setFriendsList } from "../redux/userDataSlice";

const User = () => {
	
	const [ personalData, setPersonalData ] = useState(null);
  	const [ individualAlbums, setInvidualAlbums ] = useState(null);
	const [ userType, setUserType ] = useState(null);
	const [ friends, setFriends ] = useState(null);
	const [ userDataFetchFinished, setUserDataFetchFinished ] = useState(false)
	const [ userFriendsFetchFinished, setUserFriendsFetchFinished ] = useState(false)
	const [ error, setError ] = useState(null);
	const location = useLocation();
	const urlParams = useParams();
	const dispatch = useDispatch();
	  
  	useEffect(() => {
		setUserDataFetchFinished(false);
		setUserFriendsFetchFinished(false);
		setError(null);
    	if (!sessionStorage.getItem("Login")) {
      		throw new Error(errorTypes.noAccess);
    	} else {
			// first condition when user clicks at sidebar, second one when he/she types in the url
			if ((location.state !== undefined && location.state.loggedUserProfile) || 
					urlParams.id === sessionStorage.getItem("loggedUserId"))
			{
				
				setUserType(userTypes.logged);
				getLoggedUserProfile();
				getLoggedUserFriendsList();

            } else if ((location.state !== undefined && location.state.selectedUser.selectIsTrue) || urlParams.id) {
				if (location.state !== undefined && location.state.selectedUser.isHeFriend) {
					setUserType(userTypes.friend);
				} else if (location.state !== undefined && !location.state.selectedUser.isHeFriend) {
					setUserType(userTypes.unknown);
				}
				getSelectedUserProfle(urlParams.id);
				// this function also checks if logged user is friend of selected user
				getSelectedUserFriendsList(urlParams.id);
			} else {
				throw new Error(errorTypes.notFound)
			}
		}
  	}, [location.state, urlParams.id]);

	async function getLoggedUserProfile() {
        await axios({
			method: "get",
			url: endpoints.getLoggedUserProfile,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then(({data}) => {
			setPersonalData(data.personalDataDTO);
			setInvidualAlbums(data.individualAlbumDTO);
		}).catch((error) => {
			setError(error);
		}).finally(() => {
			setUserDataFetchFinished(true);
		});
    };

	async function getLoggedUserFriendsList() {
		await axios({
            method: "get",
            url: endpoints.getLoggedUserFriends,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
            },
        }).then(({data}) => {
			setFriends(data);
			dispatch(setFriendsList(data));
        }).catch((error) => {
            setError(error);
        }).finally(() => {
			setUserFriendsFetchFinished(true);
        })	
	}

	async function getSelectedUserProfle(id) {
        await axios({
			method: "get",
			url: endpoints.getSelectedUserProfile + id,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then(({data}) => {
			console.log(data)
			setPersonalData(data.personalDataDTO);
			setInvidualAlbums(data.individualAlbumDTO);
		}).catch((error) => {
			setError(error);
		}).finally(() => {
			setUserDataFetchFinished(true);
		});
    };

	async function getSelectedUserFriendsList(id) {
		await axios({
            method: "get",
            url: endpoints.getSelectedUserFriends + id,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
            },
        }).then(({data}) => {
			console.log(data);
			// eslint-disable-next-line eqeqeq
			if (data.find((item) => item.id == sessionStorage.getItem("loggedUserId"))) {
				setUserType(userTypes.friend);
			} else {
				setUserType(userTypes.unknown);
			}
			setFriends(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
			setUserFriendsFetchFinished(true);
        })
	}

  	return (
    	<UserTemplate>
      	{
			(userDataFetchFinished && userFriendsFetchFinished && error === null) 
			?
				<UserPage 
					personalData={personalData} 
					individualAlbums={individualAlbums}
					friendsList={friends}
					setFriendsList={setFriends}
					setUserType={setUserType}
					userType={userType}
					userId={urlParams.id}
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

export default User;
