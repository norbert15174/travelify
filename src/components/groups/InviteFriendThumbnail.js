import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import Button from "../trinkets/Button";
import { endpoints } from "../../url";

/*
  POBIERZ REQUESTY I SPRAWDZ CZY JUZ NIE JEST ZAPROSZONA DANA OSOBA
*/

const InviteFriendThumbnail = ({ friend, groupId }) => {
  const [updating, setUpdating] = useState(false);
  // sprawdzam requesty tutaj
  const [alreadyChosen, setAlreadyChosen] = useState(
    [].find((item) => item.userId === friend.id) ? true : false
  );
  const [buttonText, setButtonText] = useState(
    !alreadyChosen ? "Wybierz" : "Zaproszony"
  );
  const dispatch = useDispatch();

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
        setAlreadyChosen(true);
        setButtonText("Zaproszony");
        console.log(response);
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
      <ChooseButton onClick={inviteToGroup}>
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
