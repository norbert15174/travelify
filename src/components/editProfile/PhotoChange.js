import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProfilePicture } from "../../redux/userDataSlice";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import noBackgroundPicture from "../../assets/noBackgroundPicture.png";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import "../trinkets/fileUpload.css";
import StatusMessage from "../trinkets/StatusMessage";
import { endpoints } from "../../miscellanous/url";
import { PHOTO_SIZE_LIMIT } from "../../miscellanous/Utils";

const PhotoChange = ({ type, photo }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(undefined);
  const [preview, setPreview] = useState(null);

  const [posting, setPosting] = useState(false);
  const [postFinished, setPostFinished] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      // when image is selected it shows up as preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      // done only when image isn't selected
      if (photo !== undefined) {
        // when user has a profile photo
        if (!postFinished) setPreview(photo);
      } else {
        // when user doesn't have a photo
        if (type === "profile") {
          setPreview(noProfilePictureIcon);
        } else if (type === "background") {
          setPreview(noBackgroundPicture);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const onChangeHandler = (e) => {
    let file = e.target.files[0];
    setPostFinished(false);
    setErrorMessage("");
    if (file === undefined) {
      setImage(undefined);
      document.getElementById(type).value = null;
      return;
    }
    if (
      !file.type.includes("image/jpeg") &&
      !file.type.includes("image/png") &&
      !file.type.includes("image/gif")
    ) {
      setErrorMessage("Dozwolone formaty to JPEG, PNG i GIF!");
      document.getElementById(type).value = null;
      return;
    }
    if (file.size >= PHOTO_SIZE_LIMIT.SINGLE) {
      setErrorMessage("Maksymalny rozmiar zdjęcia to 10MB!");
      document.getElementById(type).value = null;
      return;
    }
    setImage(file);
  };

  const onSubmit = () => {
    uploadPhoto();
  };

  async function uploadPhoto() {
    const url =
      type === "profile"
        ? endpoints.setUserProfilePicture
        : endpoints.setUserBackgroundPicture;
    const data = new FormData();
    data.append("file", image);
    setPosting(true);
    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        },
      })
      .then(({ data }) => {
        if (type === "profile") {
          dispatch(setProfilePicture(data.profilePicture));
          setPreview(data.profilePicture);
        } else if (type === "background") {
          setPreview(data.backgroundPicture);
        }
      })
      .catch((error) => {
        onCancel();
        setErrorMessage("Coś poszło nie tak...");
      })
      .finally(() => {
        document.getElementById(type).value = null;
        setPosting(false);
        setPostFinished(true);
      });
  }

  const onCancel = () => {
    setPostFinished(false);
    setErrorMessage("");
    document.getElementById(type).value = null;
    setImage(undefined);
  };

  return (
    <Container>
      <Header>
        {type === "profile" ? "Zdjęcie profilowe" : "Zdjęcie w tle"}
      </Header>
      {type === "profile" && (
        <Profile
          src={preview}
          alt="Profile photo"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noProfilePictureIcon;
          }}
        />
      )}
      {type === "background" && (
        <Background
          src={preview}
          alt="Profile background"
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noBackgroundPicture;
          }}
        />
      )}
      <Input>
        <input
          className="file__upload"
          id={type}
          type="file"
          onChange={(e) => onChangeHandler(e)}
        />
        {errorMessage && (
          <ErrorMessage type="error">{errorMessage}</ErrorMessage>
        )}
        {posting && <InfoMessage>Wysyłanie...</InfoMessage>}
      </Input>
      <Buttons>
        <Submit
          disabled={image === undefined || postFinished}
          onClick={onSubmit}
        >
          Zapisz
        </Submit>
        <Cancel
          disabled={image === undefined || postFinished}
          onClick={onCancel}
        >
          Anuluj
        </Cancel>
      </Buttons>
    </Container>
  );
};

const Header = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1120px) {
    font-size: 38px;
  }
  @media only screen and (max-width: 925px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 18px;
  }
`;

const Profile = styled.img`
  object-fit: cover;
  width: 215px;
  height: 215px;
  border: 1px solid ${({ theme }) => theme.color.light};
  border-radius: 50%;
  display: block;
  margin: 20px auto;
  @media only screen and (max-width: 1120px) {
    width: 170px;
    height: 170px;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 870px) {
    width: 150px;
    height: 150px;
  }
  @media only screen and (max-width: 660px) {
    width: 130px;
    height: 130px;
  }
  @media only screen and (max-width: 560px) {
    width: 120px;
    height: 120px;
  }
  @media only screen and (max-width: 410px) {
    width: 110px;
    height: 110px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const Background = styled.img`
  object-fit: contain;
  width: 81.5%;
  height: 215px;
  border: 1px solid ${({ theme }) => theme.color.light};
  display: block;
  margin: 20px auto;
  background-color: ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1120px) {
    height: 170px;
  }
  @media only screen and (max-width: 870px) {
    height: 150px;
  }
  @media only screen and (max-width: 660px) {
    height: 130px;
  }
  @media only screen and (max-width: 560px) {
    height: 120px;
  }
  @media only screen and (max-width: 410px) {
    height: 110px;
    margin: 10px auto;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto) 1fr;
`;

const Input = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: baseline;
`;

const ErrorMessage = styled(StatusMessage)`
  font-size: 12px;
  text-align: center;
  padding: 5px 10px;
  margin-top: -0.8%;
  @media only screen and (max-width: 1120px) {
    font-size: 10px;
    width: 120px;
  }
  @media only screen and (max-width: 870px) {
    padding: 5px;
    width: 100px;
  }
  @media only screen and (max-width: 720px) {
    font-size: 8px;
  }
  @media only screen and (max-width: 560px) {
    width: 80px;
  }
  @media only screen and (max-width: 410px) {
    width: 50px;
    font-size: 6px;
  }
`;

const InfoMessage = styled(StatusMessage)`
  font-size: 12px;
  text-align: center;
  padding: 5px 10px;
  margin-top: -0.8%;
`;

const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export default PhotoChange;
