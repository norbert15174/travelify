import React, { useState, useEffect } from "react";
import { routes } from "../../miscellanous/Routes";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import UserProfilePicture from "./UserProfilePicture";
import Friends from "../messenger/Friends";
import ButtonIcon from "../trinkets/ButtonIcon";
import newsIcon from "./svg/newsIcon.svg";
import notificationIcon from "./svg/notificationIcon.svg";
import albumsIcon from "./svg/albumsIcon.svg";
import searchIcon from "./svg/searchIcon.svg";
import logoutIcon from "./svg/logoutIcon.svg";
import groupsIcon from "./svg/groupsIcon.svg";
import messageIcon from "./svg/messageIcon.svg";
import expandIcon from "./svg/expandIcon.svg";
import { useSelector } from "react-redux";
import ConfirmationBox from "../trinkets/ConfirmationBox";
import Notifications from "../notifications/Notifications";


const Menu = () => {
	
	const [ menuToExpand, setMenuToExpand ] = useState("");
	const [ isVisible, toggleVisibility ] = useState(true);
	const [ logoutBox, setLogoutBox ] = useState(false);
	const [ confirmLogout, setConfirmLogout ] = useState(false);
	const [ refuseLogout, setRefuseLogout ] = useState(false);
	const [ logoutRedirect, setLogoutRedirect ] = useState(false);

	const blurState = useSelector((state) => state.blur.value);

	const toggleMenuBar = () => {
		setMenuToExpand("");
		toggleVisibility(!isVisible);
	}

	useEffect(() => {
		if (logoutBox) {
			if (confirmLogout) {
				console.log("confirmLogout: true");
				setConfirmLogout(false);
				setLogoutBox(false);
				setLogoutRedirect(true);
			}
			if (refuseLogout) {
				console.log("confirmLogout: false");
				setRefuseLogout(false);
				setLogoutBox(false);
			}
		}
 	}, [confirmLogout, refuseLogout, logoutBox]);

	if ( logoutRedirect ) {
		sessionStorage.clear();
		return <Redirect to={{pathname: routes.startPage}}/>
	}
// <Link to={{pathname: routes.user.replace(/:id/i, sessionStorage.getItem("loggedUserId")), state: { loggedUserProfile: true }}}>
  	return (
    	<>
			{logoutBox && <ConfirmationBox children={"Czy na pewno chcesz się wylogować?"} confirm={setConfirmLogout} refuse={setRefuseLogout}/>}
      		<Container isVisible={isVisible} blurState={blurState}>
        		<ButtonList>
          			<li>
						<Link to={{pathname: routes.user.replace(/:id/i, sessionStorage.getItem("loggedUserId")), state: { loggedUserProfile: true }}}>
							<UserProfileContainer>
								<UserProfilePicture/>
							</UserProfileContainer>	
						</Link>
          			</li>
          			<li>
            			<ButtonIcon icon={notificationIcon} onClick={() => menuToExpand === "notifications" ? setMenuToExpand("") : setMenuToExpand("notifications")}/>
          			</li>
          			<li>
						<Link to={routes.news}>
							<ButtonIcon icon={newsIcon}/>
						</Link>	
					</li>
					<li>
						<ButtonIcon icon={messageIcon} onClick={() => menuToExpand === "friends" ? setMenuToExpand("") : setMenuToExpand("friends")}/>
					</li>
					<li>
						<Link to={routes.albums}>
							<ButtonIcon icon={albumsIcon}/>
						</Link>
					</li>
					<li>
						<Link to={routes.groups}>
							<ButtonIcon icon={groupsIcon}/>
						</Link>	
					</li>
					<li>
						<Link to={routes.search}>
							<ButtonIcon icon={searchIcon}/>
						</Link>
					</li>
        		</ButtonList>
				<Logout icon={logoutIcon} onClick={() => {
					setLogoutBox(!logoutBox);
				}}/>
      		</Container>

			<VisibilityButton icon={expandIcon} isVisible={isVisible} onClick={() => toggleMenuBar()} blurState={blurState}/>
			
			{
				menuToExpand === "friends" ? (<Friends friendDisplay={setMenuToExpand}/>) : null
			}

			{
				menuToExpand === "notifications" ? (<Notifications notificationsDisplay={setMenuToExpand}/>) : null
			}
	
    	</>
  	);
};

const Container = styled.div`
	filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
	background-color: ${({ theme }) => theme.color.darkTurquise};
	top: 0;
	right: 0;
	height: 100vh;
	width: 120px;
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: fixed;
	border-left: solid 1px ${({ theme }) => theme.color.greyFont};
	@media only screen and (max-width: 720px) {
        visibility: ${({isVisible}) => isVisible ? "" : "hidden"};
		z-index: 1;
		overflow-y: scroll;
    }
`;

const VisibilityButton = styled(ButtonIcon)`
	display: none;
	filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
	@media only screen and (max-width: 720px) {
        display: block;
		position: fixed;
		width: 40px;
		height: 40px;
		top: 0;
		right: ${({isVisible}) => isVisible ? "102px" : "25px"};
		transform: ${({isVisible}) => isVisible ? "rotate(180deg)" : "rotate(0deg)"};
		background-color: transparent;
		z-index: 10000;
    }
`;

const ButtonList = styled.ul`
  	list-style: none;
	margin-bottom: auto;
	@media only screen and (max-width: 720px) {
        margin-bottom: 0;
    }
`;

const UserProfileContainer = styled.div`
  	cursor: pointer;
`;


const Logout = styled(ButtonIcon)`
	margin-top: auto;
	@media only screen and (max-width: 720px) {
		margin-top: 0;
	}
`;

export default React.memo(Menu);

