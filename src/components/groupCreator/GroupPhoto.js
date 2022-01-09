import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import "../trinkets/fileUpload.css";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import imageNotFoundIcon from "./assets/imageNotFoundIcon.svg";
import StatusMessage from "../trinkets/StatusMessage";
import { endpoints } from "../../miscellanous/url";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";
import axios from "axios";
import { PHOTO_SIZE_LIMIT } from "../../miscellanous/Utils";
import {
  setGroupPicture,
  selectGroupPicture,
} from "../../redux/groupCreatorSlice";

const GroupPhoto = ({ editedGroupId }) => {
  const mainPhoto = useSelector(selectGroupPicture);
  const dispatch = useDispatch();
  const [mainImage, setMainImage] = useState(mainPhoto);
  const [imagePreview, setImagePreview] = useState([{ url: "", name: "" }]);
  const [isDirty, setIsDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const singleFileHandler = (e) => {
    setIsDirty(true);

    let file = e.target.files[0];

    setErrorMessage("");
    setImagePreview([{ url: "", name: "" }]);

    if (file === undefined) {
      setMainImage(mainPhoto);
      setIsDirty(false);
      return;
    }

    if (file.size >= PHOTO_SIZE_LIMIT.SINGLE) {
      setErrorMessage("Maksymalny rozmiar zdjęcia to 10MB!");
      setIsDirty(false);
      document.getElementById("__input").value = null;
      return;
    }

    if (
      !file.type.includes("image/jpeg") &&
      !file.type.includes("image/png") &&
      !file.type.includes("image/gif")
    ) {
      setIsDirty(false);
      setErrorMessage("Dozwolone formaty to JPEG, PNG i GIF!");
      document.getElementById("__input").value = null;
      return;
    }
    setMainImage(file);

    // name not needed!
    setImagePreview([{ url: URL.createObjectURL(file), name: "" }]);
  };

  const formHandler = () => {
    addAlbumMainPhoto();
    setIsDirty(false);
  };

  const clearForm = () => {
    if (document.getElementById("__input") !== null) {
      document.getElementById("__input").value = null;
    }
    setMainImage(mainPhoto);
    setImagePreview([{ url: "", name: "" }]);
    setErrorMessage("");
    setSubmitMessage("");
    setIsDirty(false);
  };

  async function addAlbumMainPhoto() {
    const data = new FormData();
    data.append("file", mainImage);
    setSubmitMessage("Dodawanie zdjęcia...");
    await axios
      .post(endpoints.setGroupPicture + editedGroupId, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        },
      })
      .then(({ data }) => {
        setSubmitMessage("Zmiany zostały zapisane!");
        setMainImage(data.mainPhoto);
        dispatch(setGroupPicture(data.mainPhoto));
      })
      .catch((error) => {
        console.error(error);
        setSubmitMessage("");
        setSubmitError("Coś poszło nie tak... Spróbuj ponownie!");
      })
      .finally(() => {
        document.getElementById("__input").value = null;
        setIsDirty(false);
      });
  }

  return (
    <>
      <Container>
        <FileInput>
          <input
            className="file__upload"
            type="file"
            id={"__input"}
            onChange={(e) => {
              singleFileHandler(e);
            }}
          />
          {errorMessage && (
            <ErrorMessage type="error">{errorMessage}</ErrorMessage>
          )}
        </FileInput>
        <Line />
        <InnerContainer>
          {imagePreview[0].url !== "" || mainImage !== "" ? (
            <SingleImageContainer>
              <SingleImage
                src={
                  imagePreview[0].url ||
                  (mainImage !== undefined ? mainImage : noAlbumPhotoIcon)
                }
              />
            </SingleImageContainer>
          ) : (
            <ImageNotFound />
          )}
        </InnerContainer>
      </Container>
      <Buttons>
        {submitError !== "" && (
          <SubmitMessage type="error">{submitError}</SubmitMessage>
        )}
        {submitMessage !== "" && <SubmitMessage>{submitMessage}</SubmitMessage>}
        <Submit disabled={!isDirty} type="submit" onClick={formHandler}>
          Zapisz
        </Submit>
        <Cancel disabled={!isDirty} onClick={() => clearForm()}>
          Anuluj
        </Cancel>
      </Buttons>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 15px;
  margin: 20px 0px 0px 75px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 18px;
  @media only screen and (max-width: 1220px) {
    margin: 20px 0px 0px 65px;
  }
  @media only screen and (max-width: 870px) {
    margin: 20px 0px 0px 55px;
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    margin: 15px 0px 0px 40px;
    font-size: 10px;
  }
  @media only screen and (max-width: 480px) {
    margin: 15px 0px 0px 15px;
  }
`;

const FileInput = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Line = styled.div`
  border-top: 2px solid ${({ theme }) => theme.color.dark};
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SingleImageContainer = styled.div`
  position: relative;
  margin: 10px 0px 20px 25%;
  width: 250px;
  height: 250px;
  @media only screen and (max-width: 870px) {
    width: 175px;
    height: 175px;
  }
  @media only screen and (max-width: 615px) {
    width: 150px;
    height: 150px;
  }
`;

const SingleImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 870px) {
    width: 175px;
    height: 175px;
  }
  @media only screen and (max-width: 615px) {
    width: 150px;
    height: 150px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 25px;
  height: 40px;
  @media only screen and (max-width: 1080px) {
    height: 25px;
  }
  @media only screen and (max-width: 560px) {
    margin-top: 15px;
    height: 20px;
  }
`;

const ErrorMessage = styled(StatusMessage)`
  position: absolute;
  width: 300px;
  font-size: 12px;
  align-self: center;
  left: 20%;
`;

const SubmitMessage = styled(StatusMessage)`
  font-size: 12px;
  align-self: center;
  margin-right: 15px;
  @media only screen and (max-width: 1080px) {
    font-size: 8px;
    padding: 5px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 6px;
  }
`;

const ImageNotFound = styled.div`
  width: 250px;
  height: 250px;
  margin: 10px 0px 20px 25%;
  background-image: url(${imageNotFoundIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75%;
  @media only screen and (max-width: 870px) {
    width: 175px;
    height: 175px;
  }
  @media only screen and (max-width: 615px) {
    width: 150px;
    height: 150px;
  }
`;

export default GroupPhoto;
