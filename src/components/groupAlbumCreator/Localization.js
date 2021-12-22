import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCoordinate,
  setCoordinate,
} from "../../redux/groupAlbumCreatorSlice";
import FormInput from "../trinkets/FormInput";
import Map from "../googleMaps/Map";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import StatusMessage from "../trinkets/StatusMessage";
import { albumCreator } from "../../miscellanous/Utils";
import { endpoints } from "../../miscellanous/url";

const Localization = ({ editedAlbumId, creatorType, setForm }) => {
  const coordinate = useSelector(selectCoordinate);
  const dispatch = useDispatch();
  const [firstRun, setFirstRun] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // map options
  const options = {
    disableDefaultUI: true, // disables little yellow guy and satellite view
    zoomControl: true, // enables zoom in/out tool
    gestureHandling: "greedy", // "none" < "cooperative" < "greedy"
    minZoom: 2,
  };

  const [place, setPlace] = useState("");
  const [localization, setLocalization] = useState({
    lat: 0,
    lng: 0,
    countryName: "",
    countryId: null,
    place: place,
  });

  useEffect(() => {
    if (firstRun && creatorType === albumCreator.edition) {
      setPlace(coordinate.place);
      setLocalization({
        lat: coordinate.lat,
        lng: coordinate.lang,
        countryName: coordinate.country.country,
        countryId: coordinate.country.id,
        place: coordinate.place,
      });
      setFirstRun(false);
    }
    if (creatorType === albumCreator.creation) {
      setFormSubmitted(false);
      setSubmitError("");
      setSubmitMessage("");
    } else if (creatorType === albumCreator.edition) {
      if (
        coordinate.lat !== localization.lat ||
        coordinate.lang !== localization.lng ||
        localization.place !== coordinate.place
      ) {
        setIsDirty(true);
      } else {
        setIsDirty(false);
      }
      setSubmitMessage("");
      setSubmitError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localization.place, localization.countryName, localization.place]);

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formHandler = () => {
    setSubmitMessage("");
    setSubmitError("");

    if (
      localization.countryName === "Brak informacji" ||
      localization.place === "Brak informacji"
    ) {
      setSubmitError("Popraw występujące błędy!");
      return;
    }

    if (localization.place === "") {
      setSubmitError("Nazwa miejsca jest wymagana!");
      return;
    }

    if (creatorType === albumCreator.creation) {
      setForm(localization);
      setSubmitMessage("Informacje zostały dodane do formularza.");
      setFormSubmitted(true);
    } else if (creatorType === albumCreator.edition) {
      editLocalization();
    }
  };

  async function editLocalization() {
    setSubmitMessage("Zapisywanie zmian...");
    await axios({
      method: "put",
      url: endpoints.editGroupAlbum + editedAlbumId,
      data: {
        coordinates: {
          country: localization.countryName,
          lang: localization.lng,
          lat: localization.lat,
          place: localization.place,
        },
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
          setCoordinate({
            country: {
              id: localization.countryId,
              country: localization.countryName,
            },
            lang: localization.lng,
            lat: localization.lat,
            place: localization.place,
          })
        );
        setSubmitMessage("Zmiany zostały zapisane!");
        setIsDirty(false);
      })
      .catch((error) => {
        console.error(error);
        setSubmitMessage("");
        setSubmitError("Coś poszło nie tak... Spróbuj ponownie!");
      });
  }

  const clearForm = () => {
    if (creatorType === albumCreator.creation) {
      setPlace("");
      setLocalization({
        lat: 0,
        lng: 0,
        countryName: "",
        countryId: null,
        place: place,
      });
      setForm({
        lat: 0,
        lng: 0,
        countryName: "",
        countryId: null,
        place: place,
      });
      setFormSubmitted(false);
      setSubmitMessage("");
    } else if (creatorType === albumCreator.edition) {
      setPlace(coordinate.place);
      setLocalization({
        lat: coordinate.lat,
        lng: coordinate.lang,
        countryName: coordinate.country.country,
        countryId: coordinate.country.id,
        place: coordinate.place,
      });
      setSubmitMessage("");
      setSubmitError("");
      setIsDirty(false);
    }
  };

  return (
    <>
      <Container>
        <InnerContainer>
          <ValueContainer>
            Kraj
            <FormInput disabled value={localization.countryName} />
          </ValueContainer>
          <ValueContainer>
            Miejsce
            <FormInput
              value={localization.place}
              onChange={(e) =>
                setLocalization((prevState) => ({
                  ...prevState,
                  place: e.target.value,
                }))
              }
            />
          </ValueContainer>
          <ValueContainer>
            Długość geograficzna
            <FormInput disabled value={localization.lng} />
          </ValueContainer>
          <ValueContainer>
            Szerokość geograficzna
            <FormInput disabled value={localization.lat} />
          </ValueContainer>
        </InnerContainer>
        {localization.countryName === "Brak informacji" ||
        localization.place === "Brak informacji" ? (
          <ErrorMessage type="error">
            Określenie wybranego przez ciebie miejsca okazało się niemożliwe. W
            przypadku braku informacji o nazwie miejsca, możesz ustawić ją
            ręcznie.
          </ErrorMessage>
        ) : (
          <InfoMessage type="info">
            Wybierz miejsce, które odwiedziłeś. Jeśli uzyskana nazwa miejsca
            będzie nieodpowiednia, możesz ustawić ją ręcznie.
          </InfoMessage>
        )}
        {
          <MapContainer>
            <Map
              width={"100%"}
              height={"100%"}
              options={options}
              initialCoordinates={{
                lat: localization.lat,
                lng: localization.lng,
              }}
              type={
                creatorType === albumCreator.edition
                  ? albumCreator.edition
                  : albumCreator.creation
              }
              setLocalization={setLocalization}
              deleteMarker={
                creatorType === albumCreator.creation &&
                !localization.lat &&
                !localization.lng
                  ? true
                  : false
              }
            />
          </MapContainer>
        }
      </Container>
      <Buttons>
        {submitMessage !== "" && <SubmitMessage>{submitMessage}</SubmitMessage>}
        {submitError !== "" && (
          <SubmitError type="error">{submitError}</SubmitError>
        )}
        <Submit
          disabled={
            (creatorType === albumCreator.creation &&
              ((!localization.lat &&
                !localization.lng &&
                localization.place === "" &&
                localization.countryName === "") ||
              formSubmitted
                ? true
                : false)) ||
            (creatorType === albumCreator.edition && !isDirty)
          }
          type="submit"
          onClick={formHandler}
        >
          {creatorType === "creation" ? "Dodaj" : "Zapisz"}
        </Submit>
        <Cancel
          disabled={
            (creatorType === albumCreator.creation &&
              ((!localization.lat &&
                !localization.lng &&
                localization.place === "" &&
                localization.countryName === "") ||
              formSubmitted
                ? true
                : false)) ||
            (creatorType === albumCreator.edition && !isDirty)
          }
          onClick={clearForm}
        >
          Anuluj
        </Cancel>
      </Buttons>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto 604px;
  margin: 20px 0px 0px 77px;
  grid-row-gap: 25px;
  @media only screen and (max-width: 1220px) {
    margin: 20px 0px 0px 65px;
  }
  @media only screen and (max-width: 870px) {
    margin: 20px 0px 0px 55px;
  }
  @media only screen and (max-width: 960px) {
    grid-template-rows: auto auto 504px;
  }
  @media only screen and (max-width: 600px) {
    grid-template-rows: auto auto 404px;
    grid-gap: 15px;
  }
  @media only screen and (max-width: 560px) {
    margin: 15px 0px 0px 40px;
  }
  @media only screen and (max-width: 480px) {
    margin: 15px 0px 0px 15px;
  }
  @media only screen and (max-width: 430px) {
    grid-template-rows: auto auto 304px;
  }
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  grid-gap: 25px;
  justify-content: flex-start;
  margin-right: 25px;
  @media only screen and (max-width: 600px) {
    grid-gap: 10px;
  }
`;

const ValueContainer = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.color.greyFont};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
`;

const MapContainer = styled.div`
  width: 1336px; // 4px zabrane na border
  border: 2px solid ${({ theme }) => theme.color.light};
  display: inline-block;
  border-radius: 15px;
  overflow: hidden;
  @media only screen and (max-width: 1780px) {
    width: 1236px;
  }
  @media only screen and (max-width: 1680px) {
    width: 1136px;
  }
  @media only screen and (max-width: 1560px) {
    width: 1036px;
  }
  @media only screen and (max-width: 1400px) {
    width: 936px;
  }
  @media only screen and (max-width: 1300px) {
    width: 836px;
  }
  @media only screen and (max-width: 1180px) {
    width: 736px;
  }
  @media only screen and (max-width: 1070px) {
    width: 636px;
  }
  @media only screen and (max-width: 960px) {
    width: 536px;
  }
  @media only screen and (max-width: 840px) {
    width: 436px;
  }
  @media only screen and (max-width: 600px) {
    width: 336px;
  }
  @media only screen and (max-width: 430px) {
    width: 336px;
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
  font-size: 12px;
  align-self: center;
  width: 50%;
  @media only screen and (max-width: 1080px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 6px;
    padding: 5px;
  }
`;

const InfoMessage = styled(StatusMessage)`
  font-size: 12px;
  align-self: center;
  width: 50%;
  @media only screen and (max-width: 1080px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 6px;
    padding: 5px;
  }
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

const SubmitError = styled(StatusMessage)`
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

export default Localization;
