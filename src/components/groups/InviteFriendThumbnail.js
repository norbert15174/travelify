import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectRequests, setRequests } from "../../redux/groupDetailsSlice";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import Button from "../trinkets/Button";
import { endpoints } from "../../miscellanous/url";

const InviteFriendThumbnail = ({ friend, groupId }) => {
  const requests = useSelector(selectRequests);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [alreadyChosen, setAlreadyChosen] = useState(
    requests.find((item) => item.user.id === friend.id) ? true : false
  );
  const [buttonText, setButtonText] = useState(
    !alreadyChosen ? "Wybierz" : "Zaproszony"
  );

  async function inviteToGroup() {
    setUpdating(true);
    await axios({
      method: "put",
      url: endpoints.inviteToGroup,
      data: {
        id: groupId,
        membersToAdd: [friend.id],
      },
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        withCredentials: true,
      },
    })
      .then((response) => {
        dispatch(
          setRequests([
            ...requests,
            {
              time: new Date().getTime(),
              user: {
                id: friend.id,
                name: friend.name,
                surName: friend.lastName,
                photo: friend.profilePicture,
              },
            },
          ])
        );
        setAlreadyChosen(true);
        setButtonText("Zaproszony");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setUpdating(false);
      });
  }

  return (
    <Friend>
      <Photo
        src={
          friend.profilePicture !== undefined
            ? friend.profilePicture
            : noProfilePictureIcon
        }
        alt="Profile picture"
        onError={(e) => {
          e.target.onError = null;
          e.target.src = noProfilePictureIcon;
        }}
      />
      <h1>{friend.name + " " + friend.lastName}</h1>
      <ChooseButton
        onClick={inviteToGroup}
        invited={alreadyChosen}
        disabled={alreadyChosen}
      >
        {updating ? "Zapisywanie..." : buttonText}
      </ChooseButton>
    </Friend>
  );
};

const Friend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  h1 {
    display: inline-block;
    word-wrap: break-word;
    width: max-content;
    white-space: normal;
  }
  @media only screen and (max-width: 1140px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 720px) {
    font-size: 8px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 6px;
  }
`;

const Photo = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1140px) {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 720px) {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border: 1px solid ${({ theme }) => theme.color.light};
  } ;
`;

const ChooseButton = styled(Button)`
  font-size: 16px;
  border-radius: 5px;
  width: 100px;
  padding: 0px 5px 0px 5px;
  height: 30px;
  margin: 0 15px 0 auto;
  &:hover,
  &:focus {
    background-color: ${({ theme, invited }) =>
      !invited ? theme.color.light : theme.color.dark};
  }
  cursor: ${({ invited }) => (!invited ? "pointer" : "default")};
  @media only screen and (max-width: 1140px) {
    font-size: 12px;
    height: 25px;
    width: 80px;
  }
  @media only screen and (max-width: 720px) {
    font-size: 8px;
    height: 20px;
    width: 60px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 6px;
    width: 50px;
    height: 15px;
    margin: 0 5px 0 auto;
  }
`;

export default InviteFriendThumbnail;
