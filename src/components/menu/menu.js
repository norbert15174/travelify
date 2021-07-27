import React, { useState } from "react";
import { routes } from "../../miscellanous/Routes";
import { Link } from "react-router-dom";
import styled from "styled-components";
import User from "./UserPhoto";
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

const Menu = () => {
	
	const [menuToExpand, setMenuToExpand] = useState("");
	const [isVisible, toggleVisibility] = useState(true);

	const toggleMenuBar = () => {
		setMenuToExpand("");
		toggleVisibility(!isVisible);
	}


  	return (
    	<>
      		<Container isVisible={isVisible}>
        		<ButtonList>
          			<li>
						<Link to={routes.user}>
							<UserProfileContainer>
								<User/>
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
				<Link to={routes.news}>
					<Logout icon={logoutIcon}/>
				</Link>
      		</Container>

			<VisibilityButton icon={expandIcon} isVisible={isVisible} onClick={() => toggleMenuBar()}/>
			
			{
				menuToExpand === "friends" ? (<Friends friendDisplay={setMenuToExpand}/>) : null
			}

			{
				menuToExpand === "notifications"  ? (<h1>Powiadomienia wysuwają się z panelu bocznego</h1>) : null
			}
	
    	</>
  	);
};

const Container = styled.div`
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

export default Menu;

