import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectProfilePicture, setProfilePicture } from "../../redux/userDataSlice";
import { endpoints } from "../../url";

const UserProfilePicture = () => {

	const profilePicture = useSelector(selectProfilePicture);
	const dispatch = useDispatch();

	useEffect(() => {
		if (profilePicture === null) {
			getBasicUserData();
		}
 	// eslint-disable-next-line react-hooks/exhaustive-deps
 	}, []);

	async function getBasicUserData() {
		await axios({
            method: "get",
            url: endpoints.getLoggedUserProfileBasic,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
            },
        }).then(({data}) => {
            dispatch(setProfilePicture(data.photo));
        }).catch((error) => {
            console.error(error);
        })
	}

	return (
		<Container
			src={(profilePicture !== undefined && profilePicture) ? profilePicture : noProfilePictureIcon}
			alt="Profile picture"
			onError={(e) => {e.target.onError = null; e.target.src=noProfilePictureIcon;}}
  		/>
	)
};

const Container = styled.img`
    width: 77px;
    height: 77px;
    margin-top: 5px;
    border-radius: 50%;
    cursor: pointer;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	&:hover {
		border: 2px solid ${({theme}) => theme.color.lightBackground};
		box-sizing: border-box;
	}
    @media only screen and (max-height: 720px) {
		width: 70px;
		height: 70px;
	}
    @media only screen and (max-height: 640px) {
		width: 60px;
		height: 60px;
	}
    @media only screen and (max-height: 560px) {
		width: 50px;
		height: 50px;
	}
    @media only screen and (max-height: 480px) {
		width: 40px;
		height: 40px;
	}
    @media only screen and (max-height: 400px) {
		width: 30px;
		height: 30px;
	}
`;

export default UserProfilePicture;
