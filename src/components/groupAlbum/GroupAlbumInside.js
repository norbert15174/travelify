import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import PhotoSection from "../groupPhotos/PhotoSection";
import ButtonIcon from "../trinkets/ButtonIcon";
import localizationIcon from "./assets/localizationIcon.svg";
import descriptionIcon from "./assets/descriptionIcon.svg";
import historyIcon from "./assets/historyIcon.svg";
import editIcon from "./assets/editIcon.svg";
import Map from "../googleMaps/Map";
import Carousel from "../groupPhotos/Carousel";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { routes } from "../../miscellanous/Routes";
import { useSelector } from "react-redux";
import { albumCreator } from "../../miscellanous/Utils";
import {
  selectAlbumOwner,
  selectInfo,
} from "../../redux/groupAlbumSlice";
import HistoryBox from "./HistoryBox";
import moment from "moment";

import "moment/locale/pl";

const GroupAlbumInside = ({ albumId, notifPhoto }) => {
  moment.locale("pl");
  // map options
  const options = {
    disableDefaultUI: true, // disables little yellow guy and satellite view
    zoomControl: true, // enables zoom in/out tool
    gestureHandling: "greedy", // "none" < "cooperative" < "greedy"
    minZoom: 2,
  };

  const [photoPreview, setPhotoPreview] = useState({
    visible: false,
    index: null,
  });

  const [redirectToAlbumsCreator, setRedirectToAlbumsCreator] = useState({
    active: false,
    albumId: null,
  });

  const [redirectToProfile, setRedirectToProfile] = useState({
    active: false,
    userId: null,
  });

  const [history, setHistory] = useState(false);

  const blurState = useSelector((state) => state.blur.value);
  const owner = useSelector(selectAlbumOwner);
  const info = useSelector(selectInfo);

  useEffect(() => {
    if (!notifPhoto) {
      setPhotoPreview({ visible: false, index: null });
    } else if (notifPhoto) {
      setPhotoPreview({ visible: true, index: notifPhoto });
    }
  }, [notifPhoto]);

  if (redirectToAlbumsCreator.active) {
    return (
      <Redirect
        to={{
          pathname: routes.groupAlbumCreator,
          state: {
            creatorType: albumCreator.edition,
            albumId: redirectToAlbumsCreator.albumId,
            groupId: info.groupId,
          },
        }}
      />
    );
  }

  if (redirectToProfile.active) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, redirectToProfile.userId),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: redirectToProfile.userId,
              isHeFriend: false,
            },
          },
        }}
      />
    );
  }

  return (
    <>
      {photoPreview.visible && (
        <Carousel
          selectedPhotoIndex={photoPreview.index}
          setClose={setPhotoPreview}
        />
      )}
      {history && <HistoryBox setHistory={setHistory} albumId={albumId} />}
      <Container blurState={blurState}>
        <Details>
          <Header>
            <h1>{info.name}</h1>
            <Localization>
              <Icon src={localizationIcon} />
              <h3>
                {info.coordinate.place + ", " + info.coordinate.country.country}
              </h3>
            </Localization>
            <h4 style={{ marginTop: "10px" }}>
              Utworzono {moment(info.creationTime).format("LL")}
            </h4>
          </Header>
          <MapContainer>
            <Map
              width={"100%"}
              height={"100%"}
              options={options}
              initialCoordinates={{
                lat: info.coordinate.lat,
                lng: info.coordinate.lang,
              }}
              type="AlbumInside"
            />
          </MapContainer>
          <Description>
            <Icon src={descriptionIcon} />
            <Text>{info.description}</Text>
          </Description>
          <div>
            <Line />
            <Footer>
              <AlbumInfo>
                <ProfilePhoto
                  src={
                    owner.photo !== undefined
                      ? owner.photo
                      : noProfilePictureIcon
                  }
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noProfilePictureIcon;
                  }}
                  onClick={() => {
                    setRedirectToProfile({ active: true, userId: owner.id });
                  }}
                />
                <p
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => {
                    setRedirectToProfile({ active: true, userId: owner.id });
                  }}
                >
                  {owner.name + " " + owner.surName}
                </p>
              </AlbumInfo>
              <Buttons>
                <TypeSpecifiedButton
                  icon={historyIcon}
                  active={history}
                  onClick={() => setHistory(!history)}
                >
                  Historia
                </TypeSpecifiedButton>
                <TypeSpecifiedButton
                  icon={editIcon}
                  onClick={() =>
                    setRedirectToAlbumsCreator({
                      active: true,
                      albumId: albumId,
                    })
                  }
                >
                  Edytuj album
                </TypeSpecifiedButton>
              </Buttons>
            </Footer>
          </div>
        </Details>
        <PhotoSection setPreview={setPhotoPreview} />
      </Container>
    </>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-row-gap: 15px;
  width: 1500px;
  margin: 0 auto;
  @media only screen and (max-width: 1635px) {
    width: 1300px;
  }
  @media only screen and (max-width: 1425px) {
    width: 1100px;
  }
  @media only screen and (max-width: 1225px) {
    width: 900px;
  }
  @media only screen and (max-width: 1025px) {
    width: 700px;
  }
  @media only screen and (max-width: 825px) {
    width: 500px;
  }
  @media only screen and (max-width: 510px) {
    grid-row-gap: 10px;
    width: 300px;
  }
`;

const MapContainer = styled.div`
  width: 1436px; // 4px zabrane na border
  border: 2px solid ${({ theme }) => theme.color.light};
  display: inline-block;
  border-radius: 15px;
  overflow: hidden;
  @media only screen and (max-width: 1635px) {
    width: 1236px;
  }
  @media only screen and (max-width: 1425px) {
    width: 1036px;
  }
  @media only screen and (max-width: 1225px) {
    width: 836px;
  }
  @media only screen and (max-width: 1025px) {
    width: 636px;
  }
  @media only screen and (max-width: 825px) {
    width: 436px;
  }
  @media only screen and (max-width: 510px) {
    width: 256px;
  }
`;

const Details = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 30px 30px 30px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  grid-template-rows: auto 580px auto 1fr;
  grid-row-gap: 15px;
  @media only screen and (max-width: 1635px) {
    grid-template-rows: auto 580px auto 1fr;
  }
  @media only screen and (max-width: 1425px) {
    grid-template-rows: auto 580px auto 1fr;
  }
  @media only screen and (max-width: 1225px) {
    grid-template-rows: auto 580px auto 1fr;
  }
  @media only screen and (max-width: 1025px) {
    grid-template-rows: auto 480px auto 1fr;
  }
  @media only screen and (max-width: 825px) {
    padding-bottom: 20px;
    grid-template-rows: auto 380px auto 1fr;
  }
  @media only screen and (max-width: 510px) {
    padding: 10px 20px;
    grid-template-rows: auto 200px auto 1fr;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  align-items: flex-start;
  font-size: 27px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1025px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 12px;
  }
`;

const Localization = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 30px;
  margin-top: 5px;
  @media only screen and (max-width: 1025px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 12px;
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  @media only screen and (max-width: 1025px) {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 825px) {
    width: 20px;
    height: 20px;
  }
  @media only screen and (max-width: 510px) {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
`;

const Text = styled.p`
  font-size: 24px;
  margin-top: 4px;
  @media only screen and (max-width: 1025px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 8px;
    margin-top: 2px;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 24px;
  margin-top: 15px;
  margin-right: 25px;
  @media only screen and (max-width: 1025px) {
    font-size: 18px;
    margin-top: 10px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 12px;
    margin-right: 15px;
    margin-top: 8px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 8px;
    margin-right: 10px;
    margin-top: 5px;
  }
`;

const ProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.color.light};
  @media only screen and (max-width: 1025px) {
    width: 30px;
    height: 30px;
  }
  @media only screen and (max-width: 825px) {
    width: 20px;
    height: 20px;
  }
  @media only screen and (max-width: 510px) {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;

const Line = styled.div`
  border-top: 2px solid ${({ theme }) => theme.color.dark};
`;

const Buttons = styled.div`
  margin: 0 0 0 auto;
  display: grid;
  grid-template-columns: repeat(2, auto);
`;

const TypeSpecifiedButton = styled(ButtonIcon)`
  margin: 15px 0px 0px 25px;
  width: 160px;
  height: 40px;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.lightBackground};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  padding-left: 25px;
  background-image: url(${({ icon }) => icon});
  background-position: 8% 50%;
  background-size: 15%;
  @media only screen and (max-width: 1025px) {
    font-size: 12px;
    width: 100px;
    height: 30px;
    margin-top: 10px;
    margin-left: 15px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 10px;
    background-size: 12%;
    padding-left: 15px;
    width: 80px;
    height: 25px;
    margin-left: 10px;
  }
  @media only screen and (max-width: 510px) {
    background-size: 10px;
    margin-top: 5px;
    margin-left: 5px;
    font-size: 0px;
    height: 20px;
    width: 20px;
    background-position: 50% 50%;
  }
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.color.light};
  }
`;

export default GroupAlbumInside;
