import React from "react";
import styled from "styled-components";
import openGroupIcon from "./assets/openGroupIcon.svg";

const GroupThumbnail = ({ group }) => {
  return (
    <Container>
      <GroupPicture
        alt={"Group picture " + group.id}
        src={group.groupPicture}
      />
      <InnerContainer>
        <GroupName>{group.groupName}</GroupName>
        <GroupDescription>{group.description}</GroupDescription>
        <MembersContainer>
          <Member>
            <ProfilePicture
              alt={"Profile picture " + group.owner.id}
              src={group.owner.profilePicture}
            />
            <p>{group.owner.name + " " + group.owner.surname}</p>
          </Member>
          <MembersAmount>
            {group.members.length > 1
              ? group.members.length + " członków"
              : "1 członek"}
          </MembersAmount>
        </MembersContainer>
      </InnerContainer>
      <Open icon={openGroupIcon} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.color.darkBackground};
  border-radius: 90px;
  height: 200px;
  position: relative;
`;

const GroupPicture = styled.img`
  cursor: pointer;
  width: 175px;
  height: 175px;
  border: 2px solid ${({ theme }) => theme.color.light};
  border-radius: 50%;
  margin: auto 0 auto 10px;
`;

const InnerContainer = styled.div`
  width: 76%;
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const GroupName = styled.h1`
  font-size: 30px;
  cursor: pointer;
  margin-bottom: 5px;
`;

const GroupDescription = styled.p`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;

const MembersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto 0 0 0;
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  p {
    font-size: 20px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const ProfilePicture = styled.img`
  width: 38px;
  height: 38px;
  border: 2px solid ${({ theme }) => theme.color.light};
  border-radius: 50%;
  margin-right: 10px;
`;

const MembersAmount = styled.p`
  margin: 0 0 0 auto;
  font-size: 20px;
  color: ${({ theme }) => theme.color.greyFont};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Open = styled.div`
  cursor: pointer;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: 100%;
  width: 60px;
  height: 60px;
  position: absolute;
  margin-right: 20px;
  right: 0;
  margin-top: 65px;
  top: 0;
  opacity: 1;
  &:hover {
    opacity: 0.9;
  }
`;

export default GroupThumbnail;
