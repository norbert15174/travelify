import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import RadioButton from "../trinkets/RadioButton";
import "../trinkets/fileUpload.css";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import deleteWhiteIcon from "./assets/deleteWhiteIcon.svg";
import imageNotFoundIcon from "./assets/imageNotFoundIcon.svg";
import StatusMessage from "../trinkets/StatusMessage";
import { endpoints } from "../../miscellanous/url";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";
import axios from "axios";
import {
  selectAlbumPhotosRedux,
  setAlbumPhotosRedux,
  selectMainPhotoRedux,
  setMainPhotoRedux,
} from "../../redux/albumCreatorSlice";
import { PHOTO_SIZE_LIMIT } from "../../miscellanous/Utils";

const Photos = ({ editedAlbumId }) => {
  const photos = useSelector(selectAlbumPhotosRedux);
  const mainPhoto = useSelector(selectMainPhotoRedux);
  const dispatch = useDispatch();

  const [operationType, setOperationType] = useState("");
  const [description, setDescription] = useState("");
  const [singleImage, setSingleImage] = useState(undefined);
  const [multipleImages, setMultipleImages] = useState([]);
  const [mainImage, setMainImage] = useState(mainPhoto);
  const [albumImages, setAlbumImages] = useState(photos);

  const [imagePreview, setImagePreview] = useState([{ url: "", name: "" }]);
  const [isDirty, setIsDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [photosToDelete, setPhotosToDelete] = useState([]);

  const multipleFilesHandler = (e) => {
    setIsDirty(true);

    let files = e.target.files;

    setErrorMessage("");
    setImagePreview([]);
    setMultipleImages([]);

    let totalSize = 0;

    Array.from(files).every((file) => {
      if (file === undefined) {
        setMultipleImages([]);
        setIsDirty(false);
        document.getElementById(operationType + "__input").value = null;
        return false;
      }

      if (file.size >= PHOTO_SIZE_LIMIT.SINGLE) {
        setErrorMessage("Maksymalny rozmiar pojedynczego zdjęcia to 10MB!");
        setMultipleImages([]);
        setImagePreview([{ url: "", name: "" }]);
        setIsDirty(false);
        document.getElementById(operationType + "__input").value = null;
        return false;
      }

      if (
        !file.type.includes("image/jpeg") &&
        !file.type.includes("image/png") &&
        !file.type.includes("image/gif")
      ) {
        setErrorMessage("Dozwolone formaty to JPEG, PNG i GIF!");
        setMultipleImages([]);
        setImagePreview([{ url: "", name: "" }]);
        setIsDirty(false);
        document.getElementById(operationType + "__input").value = null;
        return false;
      }

      totalSize += file.size;

      if (totalSize >= PHOTO_SIZE_LIMIT.TOTAL) {
        setErrorMessage("Za jednym razem możesz maksymalnie wysłać 50MB!");
        setMultipleImages([]);
        setImagePreview([{ url: "", name: "" }]);
        setIsDirty(false);
        document.getElementById(operationType + "__input").value = null;
        return false;
      }

      setMultipleImages((prevState) => [...prevState, file]);
      // name is needed!
      setImagePreview((prevState) => [
        ...prevState,
        { url: URL.createObjectURL(file), name: file.name },
      ]);

      return true;
    });
  };

  const singleFileHandler = (e) => {
    setIsDirty(true);

    let file = e.target.files[0];

    setErrorMessage("");
    setImagePreview([{ url: "", name: "" }]);

    if (file === undefined) {
      setSingleImage(undefined);
      setMainImage(mainPhoto);
      setIsDirty(false);
      document.getElementById(operationType + "__input").value = null;
      return;
    }

    if (file.size >= PHOTO_SIZE_LIMIT.SINGLE) {
      setErrorMessage("Maksymalny rozmiar pojedynczego zdjęcia to 10MB!");
      setIsDirty(false);
      document.getElementById(operationType + "__input").value = null;
      return;
    }

    if (
      !file.type.includes("image/jpeg") &&
      !file.type.includes("image/png") &&
      !file.type.includes("image/gif")
    ) {
      setIsDirty(false);
      setErrorMessage("Dozwolone formaty to JPEG, PNG i GIF!");
      document.getElementById(operationType + "__input").value = null;
      return;
    }

    if (operationType === "single") {
      setSingleImage(file);
    } else if (operationType === "main") {
      setMainImage(file);
    }

    // name not needed!
    setImagePreview([{ url: URL.createObjectURL(file), name: "" }]);
  };

  const formHandler = () => {
    if (operationType === "single") {
      addSinglePhoto();
    } else if (operationType === "multi") {
      addMultiPhotos();
    } else if (operationType === "main") {
      addAlbumMainPhoto();
    } else if (operationType === "delete") {
      deletePhotos();
    }
  };

  const deleteImageFromAlbum = (imageToDelete, type) => {
    setIsDirty(true);
    setErrorMessage("");
    setSubmitMessage("");
    document.getElementById("single").checked = false;
    document.getElementById("multi").checked = false;
    document.getElementById("main").checked = false;
    if (type === "multiPreview") {
      // deleting image with specific url from imagePreview state
      let images = imagePreview.filter(
        (image) => image.url !== imageToDelete.url
      );
      setImagePreview(images);

      // deleting images with specific name from multipleImages
      images = multipleImages.filter(
        (image) => image.name !== imageToDelete.name
      );
      setMultipleImages(images);

      if (imagePreview.length === 1) {
        // when everything from preview will be deleted
        setImagePreview([{ url: "", name: "" }]);
        setIsDirty(false);
        setMultipleImages([]);
        document.getElementById(operationType + "__input").value = null;
      }
    } else if (type === "album") {
      // deleting images with specific id from album
      let images = albumImages.filter(
        (photo) => photo.photoId !== imageToDelete
      );
      setOperationType("delete");
      setAlbumImages(images);
      setPhotosToDelete((prevState) => [...prevState, imageToDelete]);
    }
  };

  const clearForm = () => {
    if (document.getElementById(operationType + "__input") !== null) {
      document.getElementById(operationType + "__input").value = null;
    }
    setSingleImage(undefined);
    setMultipleImages([]);
    setDescription("");
    setMainImage(mainPhoto);
    setAlbumImages(photos);
    setImagePreview([{ url: "", name: "" }]);
    setErrorMessage("");
    setSubmitMessage("");
    setIsDirty(false);
    setPhotosToDelete([]);
  };

  async function addAlbumMainPhoto() {
    const data = new FormData();
    data.append("file", mainImage);
    setSubmitMessage("Dodawanie zdjęcia...");
    await axios
      .post(endpoints.setAlbumMainPhoto + editedAlbumId, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        },
      })
      .then((response) => {
        setSubmitMessage("Zmiany zostały zapisane!");
        setMainImage(response.data.mainPhoto);
        dispatch(setMainPhotoRedux(response.data.mainPhoto));
      })
      .catch((error) => {
        console.error(error);
        setSubmitMessage("");
        setSubmitError("Coś poszło nie tak... Spróbuj ponownie!");
      })
      .finally(() => {
        document.getElementById(operationType + "__input").value = null;
        setIsDirty(false);
      });
  }

  async function addSinglePhoto() {
    const data = new FormData();
    data.append("file", singleImage);
    data.append("description", description);
    setSubmitMessage("Dodawanie zdjęcia...");
    await axios
      .post(endpoints.addSingleImageToAlbum + editedAlbumId, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        },
      })
      .then((response) => {
        setSubmitMessage("Zmiany zostały zapisane!");
        setAlbumImages(response.data.photosDTOS);
        dispatch(setAlbumPhotosRedux(response.data.photosDTOS));
      })
      .catch((error) => {
        setSubmitMessage("");
        setSubmitError("Coś poszło nie tak... Spróbuj ponownie!");
      })
      .finally(() => {
        document.getElementById(operationType + "__input").value = null;
        setImagePreview([{ url: "", name: "" }]);
        setDescription("");
        setIsDirty(false);
      });
  }

  async function deletePhotos() {
    setSubmitMessage("Usuwanie....");
    await axios({
      method: "delete",
      url: endpoints.deletePhotosFromAlbum,
      data: photosToDelete,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        setSubmitMessage("Zmiany zostały zapisane!");
        dispatch(setAlbumPhotosRedux(albumImages));
      })
      .catch((error) => {
        console.error(error);
        setSubmitMessage("");
        setAlbumImages(photos);
        setSubmitError("Coś poszło nie tak... Spróbuj ponownie!");
      })
      .finally(() => {
        setIsDirty(false);
      });
  }

  async function addMultiPhotos() {
    const data = new FormData();
    for (let i = 0; i < multipleImages.length; i++) {
      data.append("files", multipleImages[i]);
    }
    setSubmitMessage("Dodawanie zdjęć...");
    await axios
      .post(endpoints.addMultiPhotos + editedAlbumId, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        },
      })
      .then((response) => {
        setSubmitMessage("Zmiany zostały zapisane!");
        setAlbumImages(response.data.photosDTOS);
        dispatch(setAlbumPhotosRedux(response.data.photosDTOS));
      })
      .catch((error) => {
        setSubmitMessage("");
        setSubmitError("Coś poszło nie tak... Spróbuj ponownie!");
      })
      .finally(() => {
        document.getElementById(operationType + "__input").value = null;
        setImagePreview([{ url: "", name: "" }]);
        setIsDirty(false);
      });
  }

  return (
    <>
      <Container>
        <h3>Co chcesz dodać?</h3>
        <RadioContainer
          onChange={(e) => {
            setOperationType(e.target.value);
            clearForm();
          }}
        >
          <RadioButton
            name="radio"
            id="main"
            value="main"
            label="Zdjęcie główne"
          />
          <RadioButton
            name="radio"
            id="single"
            value="single"
            label="Pojedyncze zdjęcie"
          />
          <RadioButton
            name="radio"
            id="multi"
            value="multi"
            label="Wiele zdjęć"
          />
        </RadioContainer>
        {operationType === "single" && (
          <>
            <h3>Opis zdjęcia (opcjonalny)</h3>
            <Description
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opis zdjęcia zawierający maksymalnie 250 znaków..."
              maxLength={250}
            />
          </>
        )}
        {(operationType === "single" ||
          operationType === "multi" ||
          operationType === "main") && (
          <>
            <FileInput>
              <input
                className="file__upload"
                type="file"
                id={operationType + "__input"}
                multiple={operationType === "multi" ? true : false}
                onChange={(e) => {
                  if (operationType === "single" || operationType === "main") {
                    singleFileHandler(e);
                  } else if (operationType === "multi") {
                    multipleFilesHandler(e);
                  }
                }}
              />
              {errorMessage && (
                <ErrorMessage type="error">{errorMessage}</ErrorMessage>
              )}
            </FileInput>
          </>
        )}
        <Line />
        <InnerContainer>
          {operationType === "single" || operationType === "main" ? (
            <>
              <h3>
                {operationType === "main"
                  ? "Zdjęcie główne:"
                  : "Wybrane zdjęcie:"}
              </h3>
              {(imagePreview[0] !== undefined && imagePreview[0].url !== "") ||
              (mainImage !== "" && operationType === "main") ? (
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
            </>
          ) : operationType === "multi" ? (
            <>
              <h3>Wybrane zdjęcia:</h3>
              <PhotoContainer>
                {imagePreview[0] !== undefined && imagePreview[0].url !== "" ? (
                  imagePreview.map((preview) => (
                    <MultiImageContainer
                      key={new Date().getTime() + preview.url.substr()}
                    >
                      <MultiImage src={preview.url} />
                      <DeleteButton
                        src={deleteWhiteIcon}
                        onClick={() =>
                          deleteImageFromAlbum(preview, "multiPreview")
                        }
                      />
                    </MultiImageContainer>
                  ))
                ) : (
                  <p>Brak zdjęć w albumie...</p>
                )}
              </PhotoContainer>
            </>
          ) : null}
          <h3>Zdjęcia w albumie:</h3>
          <PhotoContainer>
            {albumImages !== undefined && albumImages.length !== 0 ? (
              albumImages.map((photo) => (
                <MultiImageContainer key={photo.photoId}>
                  <MultiImage src={photo.photoUrl} />
                  <DeleteButton
                    src={deleteWhiteIcon}
                    onClick={() => deleteImageFromAlbum(photo.photoId, "album")}
                  />
                </MultiImageContainer>
              ))
            ) : (
              <p>Brak zdjęć w albumie...</p>
            )}
          </PhotoContainer>
        </InnerContainer>
        <Line />
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

const RadioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  @media only screen and (max-width: 910px) {
    grid-template-columns: repeat(3, 150px);
    grid-column-gap: 10px;
  }
  @media only screen and (max-width: 870px) {
    grid-template-columns: repeat(3, 100px);
  }
`;

const Description = styled.textarea`
  display: block;
  min-height: 50px;
  width: 40%;
  border-radius: 15px;
  padding: 10px;
  border: none;
  outline: none;
  resize: none;
  background-color: ${({ theme }) => theme.color.darkBackground};
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  margin-bottom: 12px;
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 8px;
  }
  &::placeholder {
    color: #5c5b5b;
    @media only screen and (max-width: 870px) {
      font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
      font-size: 10px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 8px;
    }
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
  border: 2px solid #12bfce;
  @media only screen and (max-width: 870px) {
    width: 175px;
    height: 175px;
  }
  @media only screen and (max-width: 615px) {
    width: 150px;
    height: 150px;
  }
`;

const MultiImageContainer = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  @media only screen and (max-width: 910px) {
    width: 70px;
    height: 70px;
  }
`;

const MultiImage = styled.img`
  width: 100px;
  height: 100px;
  border: 2px solid ${({ theme }) => theme.color.light};
  object-fit: cover;
  @media only screen and (max-width: 910px) {
    width: 70px;
    height: 70px;
  }
`;

const DeleteButton = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 5%;
  left: 80%;
  cursor: pointer;
  @media only screen and (max-width: 900px) {
    width: 15px;
    height: 15px;
  }
`;

const PhotoContainer = styled.div`
  margin: 20px 0px 10px 0px;
  padding: 15px 0px 15px 15px;
  color: #888;
  background: rgba(229, 229, 229, 0.8);
  box-shadow: inset 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  min-height: 100px;
  display: grid;
  grid-template-columns: repeat(13, 100px);
  grid-auto-rows: 100px;
  grid-gap: 10px;
  @media only screen and (max-width: 1880px) {
    grid-template-columns: repeat(12, 100px);
  }
  @media only screen and (max-width: 1750px) {
    grid-template-columns: repeat(11, 100px);
  }
  @media only screen and (max-width: 1625px) {
    grid-template-columns: repeat(10, 100px);
  }
  @media only screen and (max-width: 1525px) {
    grid-template-columns: repeat(9, 100px);
  }
  @media only screen and (max-width: 1360px) {
    grid-template-columns: repeat(8, 100px);
  }
  @media only screen and (max-width: 1240px) {
    grid-template-columns: repeat(7, 100px);
  }
  @media only screen and (max-width: 1115px) {
    grid-template-columns: repeat(6, 100px);
  }
  @media only screen and (max-width: 995px) {
    grid-template-columns: repeat(5, 100px);
  }
  @media only screen and (max-width: 910px) {
    grid-template-columns: repeat(7, 70px);
    grid-auto-rows: 70px;
  }
  @media only screen and (max-width: 860px) {
    grid-template-columns: repeat(6, 70px);
  }
  @media only screen and (max-width: 785px) {
    grid-template-columns: repeat(5, 70px);
  }
  @media only screen and (max-width: 720px) {
    grid-template-columns: repeat(6, 70px);
  }
  @media only screen and (max-width: 660px) {
    grid-template-columns: repeat(5, 70px);
  }
  @media only screen and (max-width: 570px) {
    grid-template-columns: repeat(4, 70px);
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

export default Photos;
