import React, { useState } from "react";
import { routes } from "../../miscellanous/Routes";
import { Link } from "react-router-dom";
import styled from "styled-components";
import User from "./User";
import Friends from "../messenger/Friends";
import ButtonIcon from "../trinkets/ButtonIcon";
import newsIcon from "./svg/newsIcon.svg";
import notificationIcon from "./svg/notificationIcon.svg";
import albumsIcon from "./svg/albumsIcon.svg";
import searchIcon from "./svg/searchIcon.svg";
import logoutIcon from "./svg/logoutIcon.svg";
import groupsIcon from "./svg/groupsIcon.svg";
import messageIcon from "./svg/messageIcon.svg";

const Menu = () => {
	
	const [menuToExpand, setMenuToExpand] = useState("");
	
  	return (
    	<>
      		<Container>
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

			{
				menuToExpand === "friends" ? (<Friends friendDisplay={setMenuToExpand}/>) : null
			}

			{
				menuToExpand === "notifications" ? (<h1>Powiadomienia wysuwają się z panelu bocznego</h1>) : null
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
`;

const ButtonList = styled.ul`
  	list-style: none;
	margin-bottom: auto;
`;

const UserProfileContainer = styled.div`
  	cursor: pointer;
`;

const Logout = styled(ButtonIcon)`
	margin-top: auto;
`;

export default Menu;

/*

const Menu = () => {
	
	const [menuToExpand, setMenuToExpand] = useState("");
	const [pageToDisplay, setPageToDisplay] = useState(routes.news); // news page is a default value

  	return (
    	<>
      		<Container>
        		<ButtonList>
          			<li>
						<UserProfileContainer onClick={() => setPageToDisplay(routes.user)}>
							<User/>
						</UserProfileContainer>	
          			</li>
          			<li>
            			<ButtonIcon icon={notificationIcon} onClick={() => menuToExpand === "notifications" ? setMenuToExpand("") : setMenuToExpand("notifications")}/>
          			</li>
          			<li>
						<ButtonIcon icon={newsIcon} onClick={() => setPageToDisplay(routes.news)}/>
					</li>
					<li>
						<ButtonIcon icon={messageIcon} onClick={() => menuToExpand === "friends" ? setMenuToExpand("") : setMenuToExpand("friends")}/>
					</li>
					<li>
						<ButtonIcon icon={albumsIcon} onClick={() => setPageToDisplay(routes.albums)}/>
					</li>
					<li>
						<ButtonIcon icon={groupsIcon} onClick={() => setPageToDisplay(routes.groups)}/>
					</li>
					<li>
						<ButtonIcon icon={searchIcon} onClick={() => setPageToDisplay(routes.search)}/>
					</li>
					<li>
						<ButtonIcon icon={logoutIcon} onClick={() => setPageToDisplay(routes.news)}/>
					</li>
        		</ButtonList>
      		</Container>

			{(() => {
				switch (pageToDisplay) {
					case routes.user:
						return <h1>Panel użytkownika</h1>;
					case routes.news:
						return <h1>Aktualności</h1>;
					case routes.albums:
						return <h1>Albumy</h1>;
					case routes.groups:
						return <h1>Grupy</h1>
					case routes.search:
						return <h1>Wyszukiwarka</h1>
					default:
						return <h1>Aktualności</h1>;
				}
			})()}

			{
				menuToExpand === "friends" ? (<Friends friendDisplay={setMenuToExpand}/>) : null
			}
			
			{
				menuToExpand === "notifications" ? (<h1>Powiadomienia wysuwają się z panelu bocznego</h1>) : null
			}

			
    	</>
  	);
};
*/