import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import Button from "../trinkets/Button";
import { routes } from "../../miscellanous/Routes";
import infoIcon from "./assets/infoIcon.svg";
import localizationIcon from "./assets/localizationIcon.svg";
import photoIcon from "./assets/photoIcon.svg";
import ButtonIcon from "../trinkets/ButtonIcon";
import deleteAlbumIcon from "./assets/deleteAlbumIcon.svg";
import BasicInfo from "./BasicInfo";
import Localization from "./Localization";
import Photos from "./Photos";
import axios from "axios";
import { albumCreator, albumTypes } from "../../miscellanous/Utils";
import { useSelector } from "react-redux";
import { endpoints } from "../../miscellanous/url";
import ConfirmationBox from "../trinkets/ConfirmationBox";
import scrollBackIcon from "../../assets/scrollBackIcon.svg";
import Tooltip from "../trinkets/Tooltip";

const AlbumCreatorPage = ({
  creatorType,
  editedAlbumId = null,
}) => {
  const [confirmDeletingAlbum, setConfirmDeletingAlbum] = useState(false);
  const [refuseDeletingAlbum, setRefuseDeletingAlbum] = useState(false);
  const [deleteBox, setDeleteBox] = useState(false);

  const [creatingAlbum, setCreatingAlbum] = useState(false);
  const [errorAtPosting, setErrorAtPosting] = useState(null);
  const [redirectToCreatedAlbum, setRedirectToCreatedAlbum] = useState({
    active: false,
    createdAlbumId: null,
  });

  const createAlbumRef = useRef(null);
  const scrollBack = useRef(null);

  const blurState = useSelector((state) => state.blur.value);

  // BasicInfo submitted data, used at album creation, at editing it won't be used
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
    visibility: "",
    shared: null,
  });

  // Localization submitted data, used at album creation, at editing it won't be used
  const [localization, setLocalization] = useState({
    lat: "",
    lng: "",
    countryName: "",
    countryId: null,
    place: "",
  });

  useEffect(() => {
    // checking if album will be edited or created, setting albumId we are editing
    if (deleteBox && albumCreator.edition === creatorType) {
      if (confirmDeletingAlbum) {
        deleteAlbum();
      }
      if (refuseDeletingAlbum) {
        setDeleteBox(false);
        setRefuseDeletingAlbum(false);
      }
    }
    // eslint-disable-next-line
  }, [confirmDeletingAlbum, refuseDeletingAlbum]);

  useEffect(() => {
    if (
      creatorType === albumCreator.creation &&
      basicInfo.name !== "" &&
      localization.lat !== "" &&
      localization.place !== ""
    ) {
      createAlbumRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicInfo.name, localization.lat, localization.place]);

  const [redirectToAlbums, setRedirectToAlbums] = useState(false);
  const [redirectBackToAlbum, setRedirectBackToAlbum] = useState(false);

  // CREATION
  if (redirectToAlbums) {
    return <Redirect to={{ pathname: routes.albums }} />;
  }

  // EDITION
  if (redirectBackToAlbum) {
    return (
      <Redirect
        push to={{
          pathname: `album/${editedAlbumId}`,
        }}
      />
    );
  }

  if (redirectToCreatedAlbum.active) {
    return (
      <Redirect
        to={{ pathname: `album/${redirectToCreatedAlbum.createdAlbumId}` }}
      />
    );
  }

  // formHandler będzie wykorzystywany tylko przy tworzeniu albumu
  const formHandler = () => {
    createAlbum();
  };

  async function createAlbum() {
    setErrorAtPosting(null);
    setCreatingAlbum(true);
    let sharedFriendList = [];
    if (basicInfo.visibility === albumTypes.private) {
      for (let i = 0; i < basicInfo.shared.length; i++) {
        sharedFriendList.push({ userId: basicInfo.shared[i].id });
      }
    }
    await axios({
      method: "post",
      url: endpoints.addAlbum,
      data: {
        coordinate: {
          country: {
            id: localization.countryId,
          },
          lang: localization.lng,
          lat: localization.lat,
          place: localization.place,
        },
        name: basicInfo.name,
        description: basicInfo.description,
        sharedAlbumList: sharedFriendList,
        public: basicInfo.visibility === albumTypes.public ? true : false,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        setRedirectToCreatedAlbum({
          active: true,
          createdAlbumId: response.data.id,
        });
      })
      .catch((error) => {
        setErrorAtPosting(error);
        console.error(error);
      })
      .finally(() => {
        setCreatingAlbum(false);
      });
  }

  function deleteAlbum() {
    axios({
      method: "delete",
      url: endpoints.deleteAlbum + editedAlbumId,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        setRedirectToAlbums(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally((error) => {
        setDeleteBox(false);
        setConfirmDeletingAlbum(false);
      });
  }

  return (
    <>
      {deleteBox && creatorType === albumCreator.edition && (
        <ConfirmationBox
          children={"Czy na pewno chcesz usunąć album?"}
          confirm={setConfirmDeletingAlbum}
          refuse={setRefuseDeletingAlbum}
        />
      )}
      <Container blurState={blurState} ref={scrollBack}>
        <PageHeader>
          <Heading>
            {creatorType === albumCreator.creation
              ? "Stwórz album"
              : "Edytuj album"}
          </Heading>
          <GoBackButton
            onClick={() => {
              if (creatorType === "creation") {
                setRedirectToAlbums(true);
              } else if (creatorType === "edition") {
                setRedirectBackToAlbum(true);
              }
            }}
          >
            Wróć
          </GoBackButton>
        </PageHeader>
        <SectionContainer>
          <Header>
            <Icon src={infoIcon} />
            <h1>Podstawowe informacje</h1>
          </Header>
          <BasicInfo
            editedAlbumId={editedAlbumId}
            creatorType={creatorType}
            setForm={setBasicInfo}
          />
        </SectionContainer>
        <SectionContainer>
          <Header>
            <Icon src={localizationIcon} />
            <h1>Lokalizacja</h1>
          </Header>
          <Localization
            editedAlbumId={editedAlbumId}
            creatorType={creatorType}
            setForm={setLocalization}
          />
        </SectionContainer>
        {creatorType === albumCreator.edition && (
          <SectionContainer>
            <Header>
              <Icon src={photoIcon} />
              <h1>Zdjęcia</h1>
            </Header>
            <Photos editedAlbumId={editedAlbumId} />
          </SectionContainer>
        )}
        {creatorType === albumCreator.creation &&
          basicInfo.name !== "" &&
          localization.lat !== "" &&
          localization.place !== "" && (
            <SectionContainer ref={createAlbumRef}>
              <End>
                <Line errorAtPosting={errorAtPosting} />
                <StyledButton
                  type="submit"
                  onClick={formHandler}
                  disabled={creatingAlbum}
                  errorAtPosting={errorAtPosting}
                >
                  {creatingAlbum && "Dodawanie albumu..."}
                  {!creatingAlbum && !errorAtPosting && "Stwórz album"}
                  {errorAtPosting && (
                    <p>
                      Coś poszło nie tak...
                      <br />
                      Spróbuj ponownie
                    </p>
                  )}
                </StyledButton>
                <Line errorAtPosting={errorAtPosting} />
              </End>
            </SectionContainer>
          )}
        {creatorType === albumCreator.edition && (
          <SectionContainer>
            <Header>
              <Icon src={deleteAlbumIcon} />
              <h1>Usuń album</h1>
            </Header>
            <WarningMessage>
              <p>Usuniętego albumu nie da się odzyskać!</p>
              <p>Dodane zdjęcia zostaną trwale usunięte.</p>
            </WarningMessage>
            <DeleteButton onClick={() => setDeleteBox(true)}>Usuń</DeleteButton>
          </SectionContainer>
        )}
      </Container>
      <ScrollBack
        data-tip
        data-for="scrollBack"
        icon={scrollBackIcon}
        onClick={() =>
          scrollBack.current.scrollIntoView({ behavior: "smooth" })
        }
      />
      <Tooltip id="scrollBack" place="top" text="Wróć do góry" />
    </>
  );
};

const ScrollBack = styled(ButtonIcon)`
  position: fixed;
  transform: rotate(180deg);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  bottom: 0;
  margin-bottom: 15px;
  right: 0;
  margin-right: 120px;
  @media only screen and (max-width: 720px) {
    margin-right: 26px;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 15px;
  min-width: 390px;
  margin-bottom: 15px;
  filter: ${({ blurState }) => (blurState === true ? "blur(8px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(8px)" : "none"};
`;

const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  height: 80px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  @media only screen and (max-width: 870px) {
    height: 70px;
  }
  @media only screen and (max-width: 735px) {
    height: 60px;
  }
  @media only screen and (max-width: 480px) {
    height: 50px;
  }
  @media only screen and (max-width: 360px) {
    height: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 54px;
  margin: 10px auto 10px 25px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 870px) {
    font-size: 46px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 40px;
    margin: 5px auto 5px 25px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 34px;
  }
`;

const GoBackButton = styled(Button)`
  justify-self: end;
  margin-right: 25px;
  border-radius: 5px;
  text-align: center;
  width: auto;
  font-size: 28px;
  height: 42px;
  padding: 0 20px;
  @media only screen and (max-width: 870px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 12px;
    height: 30px;
  }
  @media only screen and (max-width: 720px) {
    margin-right: 65px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 10px;
    padding: 0 10px;
    height: 25px;
  }
  @media only screen and (max-width: 360px) {
    font-size: 8px;
    padding: 0 5px;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 1220px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 9px;
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  @media only screen and (max-width: 1220px) {
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 870px) {
    width: 40px;
    height: 40px;
  }
  @media only screen and (max-width: 560px) {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const SectionContainer = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  border-radius: 15px;
  padding: 20px 40px;
  grid-template-rows: repeat(2, auto);
  @media only screen and (max-width: 1440px) {
    padding: 20px;
  }
  @media only screen and (max-width: 870px) {
    padding: 15px;
  }
  @media only screen and (max-width: 560px) {
    padding: 10px;
  }
`;

const End = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 200px;
  padding: 5px 15px;
  margin: 0px 15px 0px 15px;
  background-color: ${({ theme, errorAtPosting }) =>
    !errorAtPosting ? theme.color.dark : "#B90E0A"};
  &:hover,
  &:focus {
    background-color: ${({ theme, errorAtPosting }) =>
      !errorAtPosting ? theme.color.light : theme.color.redAlert};
  }
`;

const Line = styled.div`
  width: 40%;
  border-top: 2px solid
    ${({ theme, errorAtPosting }) =>
      !errorAtPosting ? theme.color.dark : "#B90E0A"};
`;

const DeleteButton = styled(Button)`
  font-size: 16px;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.color.redAlert};
  display: block;
  width: 150px;
  margin: 50px 0px 0px auto;
  @media only screen and (max-width: 870px) {
    font-size: 14px;
    width: 125px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
    width: 100px;
    height: 30px;
    margin: 35px 0px 0px auto;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.lightRedAlert};
  }
`;

const WarningMessage = styled.div`
  margin: 20px auto 0px auto;
  width: 50%;
  font-size: 24px;
  color: ${({ theme }) => theme.color.redAlert};
  padding: 20px 25px;
  text-align: center;
  text-transform: uppercase;
  border: 5px dashed ${({ theme }) => theme.color.redAlert};
  @media only screen and (max-width: 870px) {
    font-size: 18px;
    padding: 15px 20px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 12px;
    padding: 15px 15px;
  }
`;

export default AlbumCreatorPage;
