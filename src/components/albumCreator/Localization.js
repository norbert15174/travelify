import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "../trinkets/FormInput";
import Map from '../googleMaps/Map';
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import StatusMessage from "../trinkets/StatusMessage";

const Localization = ({creatorType, setForm}) => {

    // data will be passed from above

    // map options
    const options = {
        disableDefaultUI: true, // disables little yellow guy and satellite view
        zoomControl: true, // enables zoom in/out tool
        gestureHandling: "greedy", // "none" < "cooperative" < "greedy"
        minZoom: 2, 
    };

    const [ place, setPlace ] = useState("");
    const [ localization, setLocalization ] = useState({
        lat: "",
        lng: "",
        country: "",
        place: place,
    });
    const [ error, setError ] = useState("");
    const [ submitMessage, setSubmitMessage ] = useState("");
   
    const clearForm = () => {
        if (creatorType === "creation") {
            setPlace("");
            setLocalization({
                lat: "",
                lng: "",
                country: "",
                place: place,
            });
            setForm({
                lat: "",
                lng: "",
                country: "",
                place: place,
            })
            setSubmitMessage("");
        } else if ( creatorType === "edition" ) {
            // return to initial values
        }
        console.log("Localization form cleared!");
        setError("");
    }

    const formHandler = () => {
        
        setError("");
        setSubmitMessage("");

        // there is no need to check if form has field filled

        if ( localization.country === "Brak informacji" && localization.place === "Brak informacji") {
            setError("Określenie wybranego przez ciebie miejsca okazało się niemożliwe.\nSpróbuj wybrać ponownie lub zmień nazwę miejsca.");
            return;
        }

        if (creatorType === "creation") {
            setForm(localization)
            setSubmitMessage("Informacje zostały dodane do formularza.");
        } else if (creatorType === "edition") {
            // gdy dokonujemy edycji to bierzemy tylko te pola które zmieniliśmy
            setSubmitMessage("Zmiany zostały zapisane.");
        }
        
        console.log("Localization form submitted!");

        // clearForm();

    }

    return (
        <>
        <Container>
            <InnerContainer>
                <ValueContainer>
                    Kraj
                    <FormInput
                        disabled
                        value={localization.country}
                    />
                </ValueContainer>
                <ValueContainer>
                    Miejsce
                    <FormInput 
                        value={localization.place}
                        onChange={(e) => setLocalization((prevState) => ({
                            ...prevState,
                            place: e.target.value,
                        }))}
                    />
                </ValueContainer>
                { 
                    error !== "" ? <ErrorMessage type="error">{error}</ErrorMessage> 
                    : <InfoMessage type="info">
                        Aby wybrać lokalizację albumu wystarczy kliknąć na mapie w miejsce, które odwiedziłeś. Jeśli nazwa miejsca będzie nieodpowiednia, możesz ustawić ją ręcznie.
                    </InfoMessage> 
                }
                <ValueContainer>
                    Długość geograficzna
                    <FormInput
                        disabled 
                        value={localization.lat}
                    />
                </ValueContainer>
                <ValueContainer>
                    Szerokość geograficzna
                    <FormInput 
                        disabled 
                        value={localization.lng}
                    />
                </ValueContainer>
            </InnerContainer>
            <MapContainer>
                <Map 
                    width={"100%"} 
                    height={"100%"} 
                    options={options} 
                    initialCoordinates={
                        localization.lat !== "" && localization.lng !== "" 
                        ? { lat: localization.lat, lng: localization.lng, } 
                        : { lat: 0, lng: 0, } 
                    }
                    type="AlbumCreator"
                    setLocalization={setLocalization}
                    deleteMarker={localization.lat === "" && localization.lng === "" ? true : false}
                />
            </MapContainer>
        </Container>
        <Buttons>
            { submitMessage !== "" && <SubmitMessage>{submitMessage} </SubmitMessage>}
            <Submit 
                disabled={
                    localization.lat === "" 
                    && localization.lng === "" 
                    && localization.place === "" 
                    && localization.country === "" 
                    ? true : false
                }
                type="submit"
                onClick={formHandler}
            >
                { creatorType === "creation" ? "Dodaj" : "Zapisz"}
            </Submit>
            <Cancel 
                disabled={
                    localization.lat === "" 
                    && localization.lng === "" 
                    && localization.place === "" 
                    && localization.country === "" 
                    ? true : false
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
    grid-template-rows: auto 604px;
    margin: 20px 0px 0px 77px;
    grid-row-gap: 25px;
`;

const InnerContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
    grid-gap: 25px;
    justify-content: flex-start;
`;

const ValueContainer = styled.div`
    font-size: 18px;
    color: ${({theme}) => theme.color.greyFont};
    font-weight: ${({theme}) => theme.fontWeight.bold };
    @media only screen and (max-width: 870px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 10px;
    }
`;

const MapContainer = styled.div`
    width: 1436px; // 4px zabrane na border 
    border: 2px solid ${({theme}) => theme.color.lightTurquise};
    display: inline-block;
    border-radius: 15px;
    overflow: hidden;
`;

const Buttons = styled.div`
    display: flex;   
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 25px;
    height: 40px;
`;

const ErrorMessage = styled(StatusMessage)`
    position: absolute; 
    width: 350px;
    font-size: 12px;
    align-self: center;
    left: 55%;
`;

const InfoMessage = styled(StatusMessage)`
    position: absolute;
    font-size: 12px;
    align-self: center;
    width: 400px;
    left: 55%;
`;

const SubmitMessage = styled(StatusMessage)`
    font-size: 12px;
    align-self: center;
    margin-right: 15px;

`;

export default Localization;