import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";

const SingleMessage = ({ url, side=null, friendId=null, friendDisplay=null, message }) => {

  const [ redirectToProfile, setRedirectToProfile ] = useState(false);

  if (redirectToProfile) {
    friendDisplay(""); 
    return <Redirect
			push to={{
        pathname: routes.user.replace(/:id/i, friendId), 
        state: { selectedUser: { selectIsTrue: true, id: friendId, isHeFriend: true} }
			}}
    />
	}

  return (
    <Container side={side}>
      {
        side === "right" ? null : 
        <ProfileIcon 
          src={url !== undefined && url ? url : noProfilePictureIcon} 
          alt="Profile picture"
          onError={(e) => {e.target.onError = null; e.target.src=noProfilePictureIcon;}} 
          onClick={() => setRedirectToProfile(true)}
        />
      }
      <TextContainer side={side}>
        {message}
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: ${({side}) => side === "right" ? '100%' : "60px 180px"};
  position: relative;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: ${({side}) => side === "right" ? '100%' : "50px 180px"};
  }
`;

const TextContainer = styled.div`
  padding: 10px;
  width: ${({side}) => side === "right" ? '180px' : "100%"};
  margin-left: ${({side}) => side === "right" ? 'calc(100% - 210px)' : "0px"};
  background-color: ${({side}) => side === "right" ? '#F2F7F2' : "#e0e5e0"};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-size: 12px;
  font-weight: ${({theme}) => theme.fontWeight.light};
  overflow-wrap: break-word;
`;

const ProfileIcon = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50px;
  margin-top: 10px;
  position: relative;
  cursor: pointer;
  @media only screen and (max-width: 1000px) {
    width: 30px;
    height: 30px;
  }
`;

export default SingleMessage;
