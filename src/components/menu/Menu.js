import React, { useState, useEffect } from "react";
import { routes } from "../../miscellanous/Routes";
import { Link, Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import Tooltip from "../trinkets/Tooltip";
import UserProfilePicture from "./UserProfilePicture";
import Chats from "../messenger/ChatMenu";
import ButtonIcon from "../trinkets/ButtonIcon";
import expandIcon from "./assets/expandIcon.svg";
import notifs from "./assets/notifs.svg";
import search from "./assets/search.svg";
import news from "./assets/news.svg";
import logout from "./assets/logout.svg";
import groups from "./assets/groups.svg";
import chats from "./assets/chats.svg";
import albums from "./assets/albums.svg";
import { useSelector } from "react-redux";
import ConfirmationBox from "../trinkets/ConfirmationBox";
import Notifications from "../notifications/Notifications";

const Menu = () => {

  const [menuToExpand, setMenuToExpand] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isVisible, toggleVisibility] = useState(true);
  const [logoutBox, setLogoutBox] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [refuseLogout, setRefuseLogout] = useState(false);
  const [logoutRedirect, setLogoutRedirect] = useState(false);
  const location = useLocation();
  const blurState = useSelector((state) => state.blur.value);

  const toggleMenuBar = () => {
    setMenuToExpand("");
    toggleVisibility(!isVisible);
  };

  useEffect(() => {
    if (location.pathname === routes.news) {
      setCurrentUrl(routes.news);
    } else if (location.pathname === routes.search) {
      setCurrentUrl(routes.search);
    } else if (location.pathname.includes("userProfile") && location.pathname.slice(-1) === sessionStorage.getItem("loggedUserId")) {
      setCurrentUrl("loggedUserProfile");
    } else if (location.pathname.includes("group")) {
      setCurrentUrl("group");
    } else if (location.pathname.includes("album")) {
      setCurrentUrl("album");
    } else {
      setCurrentUrl("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (logoutBox) {
      if (confirmLogout) {
        setConfirmLogout(false);
        setLogoutBox(false);
        setLogoutRedirect(true);
      }
      if (refuseLogout) {
        setRefuseLogout(false);
        setLogoutBox(false);
      }
    }
  }, [confirmLogout, refuseLogout, logoutBox]);

  if (logoutRedirect) {
    sessionStorage.clear();
    return <Redirect to={{ pathname: routes.startPage }} />;
  }

  return (
    <>
      {logoutBox && (
        <ConfirmationBox
          children={"Czy na pewno chcesz się wylogować?"}
          confirm={setConfirmLogout}
          refuse={setRefuseLogout}
        />
      )}
      <Container isVisible={isVisible} blurState={blurState}>
        <Link
          to={{
            pathname: routes.user.replace(
              /:id/i,
              sessionStorage.getItem("loggedUserId")
            ),
            state: { loggedUserProfile: true },
          }}
        >
          <UserProfileContainer data-tip data-for="userTip">
            <UserProfilePicture active={currentUrl === "loggedUserProfile" ? true : false}/>
          </UserProfileContainer>
          <Tooltip id="userTip" place="bottom" text="Panel użytkownika" />
        </Link>
        <NavButton
          icon={notifs}
          active={menuToExpand === "notifications" ? true : false}
          onClick={() =>
            menuToExpand === "notifications"
              ? setMenuToExpand("")
              : setMenuToExpand("notifications")
          }
          data-tip
          data-for="notifTip"
        />
        <Tooltip id="notifTip" place="bottom" text="Powiadomienia" />
        <Link to={routes.news}>
          <NavButton icon={news} active={currentUrl === routes.news ? true : false} data-tip data-for="newsTip" />
          <Tooltip id="newsTip" place="bottom" text="Aktualności" />
        </Link>
        <NavButton
          icon={chats}
          active={menuToExpand === "chats" ? true : false}
          onClick={() =>
            menuToExpand === "chats"
              ? setMenuToExpand("")
              : setMenuToExpand("chats")
          }
          data-tip
          data-for="chatsTip"
        />
        <Tooltip id="chatsTip" place="bottom" text="Znajomi" />
        <Link to={routes.albums}>
          <NavButton icon={albums} active={currentUrl === "album" ? true : false} data-tip data-for="albumsTip" />
          <Tooltip id="albumsTip" place="bottom" text="Twoje albumy" />
        </Link>
        <Link to={routes.groups}>
          <NavButton icon={groups} active={currentUrl === "group" ? true : false} data-tip data-for="groupsTip" />
          <Tooltip id="groupsTip" place="bottom" text="Grupy" />
        </Link>
        <Link to={routes.search}>
          <NavButton icon={search} active={currentUrl === routes.search ? true : false} data-tip data-for="searchTip" />
          <Tooltip id="searchTip" place="bottom" text="Wyszukiwarka" />
        </Link>
        <Logout
          icon={logout}
          onClick={() => setLogoutBox(!logoutBox)}
          data-tip
          data-for="logoutTip"
        />
        <Tooltip id="logoutTip" place="bottom" text="Wyloguj się" />
      </Container>

      <VisibilityButton
        icon={expandIcon}
        isVisible={isVisible}
        onClick={() => toggleMenuBar()}
        blurState={blurState}
      />

      {menuToExpand === "chats" ? (
        <Chats chatsDisplay={setMenuToExpand} />
      ) : null}

      {menuToExpand === "notifications" ? (
        <Notifications notificationsDisplay={setMenuToExpand} />
      ) : null}
    </>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  background-color: ${({ theme }) => theme.color.dark};
  top: 0;
  right: 0;
  height: 100vh;
  min-height: 400px;
  width: 90px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  border-left: solid 1px ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 720px) {
    visibility: ${({ isVisible }) => (isVisible ? "" : "hidden")};
    z-index: 1;
  }
  @media only screen and (max-height: 560px) {
    width: 80px;
  }
  @media only screen and (max-height: 480px) {
    width: 70px;
  }
  @media only screen and (max-height: 400px) {
    width: 60px;
  }
`;

const VisibilityButton = styled(ButtonIcon)`
  display: none;
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  @media only screen and (max-width: 720px) {
    display: block;
    position: fixed;
    width: 40px;
    height: 40px;
    top: 0;
    right: ${({ isVisible }) => (isVisible ? "72px" : "25px")};
    transform: ${({ isVisible }) =>
      isVisible ? "rotate(180deg)" : "rotate(0deg)"};
    background-color: transparent;
    z-index: 10000;
  }
  @media only screen and (max-height: 560px) {
    width: 35px;
    height: 35px;
    right: ${({ isVisible }) => (isVisible ? "67px" : "15px")};
  }
  @media only screen and (max-height: 480px) {
    width: 30px;
    height: 30px;
    right: ${({ isVisible }) => (isVisible ? "57px" : "15px")};
  }
  @media only screen and (max-height: 400px) {
    width: 25px;
    height: 25px;
    right: ${({ isVisible }) => (isVisible ? "47px" : "15px")};
  }
`;

const NavButton = styled.div`
  cursor: pointer;
  border-radius: 15px;
  margin-top: 10px;
  width: 60px;
  height: 60px;
  background-image: url(${({ icon }) => icon});
  background-size: 60%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  transition: background-color 0.1s ease-in;
  background-color: ${({ active, theme }) =>
    active ? theme.color.light : null};
  &:hover {
    background-color: ${({ theme }) => theme.color.light};
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

const UserProfileContainer = styled.div`
  cursor: pointer;
`;

const Logout = styled(ButtonIcon)`
  cursor: pointer;
  border-radius: 15px;
  width: 60px;
  height: 60px;
  background-image: url(${({ icon }) => icon});
  background-size: 60%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  margin: auto 0 5px 0;
  transition: background-color 0.1s ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.color.light};
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
    margin: 10px 0 10px 0;
  }
`;

export default React.memo(Menu);
