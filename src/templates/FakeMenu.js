import React from "react";
import styled from "styled-components";
import notifs from "../components/menu/assets/notifs.svg";
import search from "../components/menu//assets/search.svg";
import news from "../components/menu//assets/news.svg";
import logout from "../components/menu//assets/logout.svg";
import groups from "../components/menu//assets/groups.svg";
import friends from "../components/menu//assets/friends.svg";
import albums from "../components/menu//assets/albums.svg";
import noProfilePictureIcon from "../assets/noProfilePictureIcon.svg";
import ButtonIcon from "../components/trinkets/ButtonIcon";

const FakeMenu = () => (
  <Container>
    <UserProfileContainer>
      <ProfilePicture src={noProfilePictureIcon} alt="Profile picture" />
    </UserProfileContainer>
    <StyledDiv icon={notifs} />
    <StyledDiv icon={news} />
    <StyledDiv icon={friends} />
    <StyledDiv icon={albums} />
    <StyledDiv icon={groups} />
    <StyledDiv icon={search} />
    <Logout icon={logout} />
  </Container>
);

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  background-color: ${({ theme }) => theme.color.dark};
  top: 0;
  right: 0;
  height: 100vh;
  min-height: 400px;
  width: 120px;
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
  @media only screen and (max-height: 720px) {
    width: 100px;
  }
  @media only screen and (max-height: 640px) {
    width: 90px;
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

const ProfilePicture = styled.img`
  width: 77px;
  height: 77px;
  margin-top: 5px;
  border-radius: 50%;
  cursor: pointer;
  border: 1.5px solid ${({ theme }) => theme.color.lightBackground};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
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

const StyledDiv = styled.div`
  cursor: pointer;
  border-radius: 50%;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.color.light};
  width: 80px;
  height: 80px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-image: url(${({ icon }) => icon});
  background-size: 60%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
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

const UserProfileContainer = styled.div`
  cursor: pointer;
`;

const Logout = styled(ButtonIcon)`
  cursor: pointer;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.light};
  width: 80px;
  height: 80px;
  background-image: url(${({ icon }) => icon});
  background-size: 60%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  margin: auto 0 5px 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
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
    margin: 10px 0 5px 0;
  }
`;

export default FakeMenu;
