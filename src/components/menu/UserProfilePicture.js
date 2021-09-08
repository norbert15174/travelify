import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectProfilePicture, setProfilePicture } from "../../redux/userDataSlice";
import { endpoints } from "../../url";

// user profile picture is saved in Redux Store during LoginTransition.
// When store accidently will be reseted, profile picture will be fetched once again

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
			src={(profilePicture !== undefined && profilePicture !== "") ? profilePicture : noProfilePictureIcon}
			alt="User Photo"
  		/>
	)
};

const Container = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 7px;
  border-radius: 100%;
  cursor: pointer;
  border: 1.5px solid ${({theme}) => theme.color.lightBackground};
`;

export default UserProfilePicture;
