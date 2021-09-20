import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";

const SingleMessage = ({ url, side=null, friendId=null, friendDisplay=null }) => {

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
      {side === "right" ? null : <ProfileIcon src={url} alt="User Photo" onClick={() => setRedirectToProfile(true)}/>}
      <TextContainer side={side}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
  
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
`;

const TextContainer = styled.div`
  padding: 10px;
  width: ${({side}) => side === "right" ? '180px' : "100%"};
  margin-left: ${({side}) => side === "right" ? 'calc(100% - 210px)' : "0px"};
  background-color: ${({side}) => side === "right" ? '#F2F7F2' : "#e0e5e0"};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
  overflow-wrap: break-word;
`;

const ProfileIcon = styled.img`
  width: 34px;
  height: 36px;
  border-radius: 100%;
  margin-top: 10px;
  position: relative;
  cursor: pointer;
`;

export default SingleMessage;
