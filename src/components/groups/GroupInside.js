import React, { useState } from "react";
import styled from "styled-components";
import ButtonIcon from "../trinkets/ButtonIcon";
import noBackgroundPicture from "../../assets/noBackgroundPicture.png";
import { useSelector, useDispatch } from "react-redux";
import PhotoZoom from "../user/PhotoZoom";
/* import axios from "axios";
import { Redirect } from "react-router-dom";
import { routes } from "../../miscellanous/Routes";
import { endpoints } from "../../url";
import { toggleBlur } from "../../redux/blurSlice"; */

const GroupInside = ({ group }) => {
  const blurState = useSelector((state) => state.blur.value);
  const [photoZoom, setPhotoZoom] = useState(false);

  return (
    <>
      {photoZoom && (
        <PhotoZoom
          url={group.groupPicture}
          type="background"
          close={setPhotoZoom}
        />
      )}
      <Container blurState={blurState}>
        <Header>
          <GroupPicture
            src={
              group.groupPicture !== undefined
                ? group.groupPicture
                : noBackgroundPicture
            }
            alt={"Group picture " + group.id}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noBackgroundPicture;
            }}
            onClick={() => setPhotoZoom("background")}
          />
          <InnerContainer>
            <GroupName>{group.groupName}</GroupName>
            <MembersAmount>
              {group.members.length > 1
                ? group.members.length + " członków grupy"
                : "1 członek grupy"}
            </MembersAmount>
            <Members>
              {group.members
                .slice(0)
                .reverse()
                .map((item, index) => {
                  if (index < 10) {
                    return (
                      <SingleMember key={item.id}>
                        <MemberPicture src={item.profilePicture} />
                      </SingleMember>
                    );
                  } else {
                      return null;
                  }
                })}
            </Members>
          </InnerContainer>
        </Header>
      </Container>
    </>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
`;

const Header = styled.div`
  width: 100%;
  height: 500px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GroupPicture = styled.img`
  height: 250px;
  width: 1200px;
  object-fit: cover;
  cursor: pointer;
  border-left: 2px solid ${({ theme }) => theme.color.dark};
  border-right: 2px solid ${({ theme }) => theme.color.dark};
  border-bottom: 2px solid ${({ theme }) => theme.color.dark};
  min-width: 350px;
`;

const InnerContainer = styled.div`
  width: 1150px;
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
`;

const GroupName = styled.h1`
  font-size: 48px;
  margin-bottom: 5px;
`;

const MembersAmount = styled.h1`
  color: ${({ theme }) => theme.color.greyFont};
  margin-bottom: 10px;
`;

const Members = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 0 auto 0 50px;
`;

const SingleMember = styled.span`
  position: relative;
  border: 2px solid ${({ theme }) => theme.color.dark};
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
  &:not(:last-child) {
    margin-left: -80px;
  }
`;

const MemberPicture = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.dark};
  display: block;
`;

/* SZEROKOŚĆ GRIDOW TAKA JAK INNER CONTAINER BEZ PADDING*/

export default GroupInside;
