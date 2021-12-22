import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAlbumType,
  selectPhotoTags,
  setPhotoTags,
} from "../../redux/albumDetailsSlice";
import Button from "../trinkets/Button";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { endpoints } from "../../miscellanous/url";
import axios from "axios";
import { albumTypes } from "../../miscellanous/Utils";

const PinFriendThumbnail = ({ friend, photoId }) => {
  const tags = useSelector(selectPhotoTags);
  const dispatch = useDispatch();

  const [updating, setUpdating] = useState(false);
  const albumType = useSelector(selectAlbumType);
  const friendId = albumType === albumTypes.private ? friend.userId : friend.id;
  const [alreadyChosen, setAlreadyChosen] = useState(
    tags.find((item) => (item.userId === friendId ? true : false))
  );
  const [buttonText, setButtonText] = useState(
    !alreadyChosen ? "Wybierz" : "Oznaczony"
  );

  async function tagPersonOnPhoto() {
    setUpdating(true);
    await axios({
      method: "put",
      url: endpoints.tagPersonOnPhoto + photoId,
      data: [friendId],
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        withCredentials: true,
      },
    })
      .then(({ data }) => {
        dispatch(setPhotoTags(data));
        setAlreadyChosen(true);
        setButtonText("Oznaczony");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setUpdating(false);
      });
  }

  async function deleteTag() {
    const tagToDelete = tags.find((item) => item.userId === friendId).taggedId;
    setUpdating(true);
    await axios({
      method: "delete",
      url: endpoints.deleteTag + photoId,
      data: [tagToDelete],
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
        dispatch(setPhotoTags(response.data));
        setAlreadyChosen(false);
        setButtonText("Wybierz");
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
        src={friend.profilePicture || friend.photo || noProfilePictureIcon}
        alt="Profile picture"
        onError={(e) => {
          e.target.onError = null;
          e.target.src = noProfilePictureIcon;
        }}
      />
      <h1>{friend.name + " " + (friend.lastName || friend.surName)}</h1>
      <ChooseButton
        onClick={() => {
          if (!alreadyChosen) {
            tagPersonOnPhoto();
          } else {
            deleteTag();
          }
        }}
        onMouseEnter={() => {
          if (alreadyChosen) {
            setButtonText("Usunąć?");
          }
        }}
        onMouseLeave={() => {
          if (alreadyChosen) {
            setButtonText("Oznaczony");
          }
        }}
      >
        {updating ? "Oznaczanie..." : buttonText}
      </ChooseButton>
    </Friend>
  );
};

const Friend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 10px;
  h1 {
    display: inline-block;
    word-wrap: break-word;
    width: max-content;
    white-space: normal;
  }
  @media only screen and (max-width: 1425px) {
    font-size: 9px;
  }
  @media only screen and (max-width: 1060px) {
    font-size: 8px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 6px;
  }
`;

const Photo = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1425px) {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 1060px) {
    width: 25px;
    height: 25px;
    border: 1px solid ${({ theme }) => theme.color.light};
    margin-right: 5px;
  }
  @media only screen and (max-width: 510px) {
    width: 20px;
    height: 20px;
  } ;
`;

const ChooseButton = styled(Button)`
  font-size: 14px;
  border-radius: 5px;
  width: 80px;
  padding: 0px 5px 0px 5px;
  height: 30px;
  margin: 0 15px 0 auto;
  @media only screen and (max-width: 1425px) {
    font-size: 10px;
    height: 25px;
    width: 60px;
  }
  @media only screen and (max-width: 1060px) {
    font-size: 8px;
    height: 20px;
    width: 50px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 6px;
    width: 40px;
    height: 15px;
    margin: 0 5px 0 auto;
  }
`;

export default PinFriendThumbnail;
