import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import closeIcon from "./assets/closeIcon.svg";
import CountrySelect from "../trinkets/Select";
import ButtonIcon from "../trinkets/ButtonIcon";
import addIcon from "./assets/addIcon.svg";
import StatusMessage from "../trinkets/StatusMessage";
import { getCountryData } from "../../miscellanous/Utils";
import { endpoints } from "../../miscellanous/url";

const CountriesForm = ({visitedCountries}) => {

    const [ selectedCountries, setSelectedCountries ] = useState([]);
    const [ initialCountries, setInitialCountries ] = useState([]);
    const [ country , setCountry ] = useState([]);
    const [ isDirty, setIsDirty ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ errorAtPutting, setErrorAtPutting ] = useState(null);
    const [ putting, setPutting ] = useState(false);

    useEffect(() => {
        if (visitedCountries !== undefined) {
            setInitialCountries(getCountryData(visitedCountries));
            setCountry(getCountryData(visitedCountries));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addCountry = () => {
        setIsDirty(true);
        selectedCountries.map((selectedCountry) => {
            setErrorMessage("");
            // SUPER AWESOME METHOD OF FINDING IF COUNTRY ISN'T ALREADY ADDED
            if (Array.from(country).find((element) => element.country === selectedCountry.country)) {
                setErrorMessage("Kraj, który próbowałeś dodać jest już dodany.");
                return null;
            }
            setCountry((prevState) => [...prevState, selectedCountry]);
            return "";
        })
        setSelectedCountries([]);
    };

    const deleteCountry = (countryToDelete) => {
        setIsDirty(true);
        setCountry(() => country.filter(item => item.country !== countryToDelete));
    };

    const onSubmit = () => {
        let array = [];
        country.forEach(element => {
            array.push(element.country);
        });
        let dataToSend = array.join(",");
        updateVisitedCountries(dataToSend);
    }

    async function updateVisitedCountries(data) {
        setErrorAtPutting(null);
        setPutting(true);
        await axios({
            method: "put",
                url: endpoints.updateUserProfile,
                data: {
                    personalDescription: {
                        visitedCountries: data,
                    }
                },
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
                },
        })
        .then(({data}) => {                
            let parsedData = getCountryData(data.personalDescription.visitedCountries);
            setInitialCountries(parsedData);
            setCountry(parsedData);
        })
        .catch((error) => {
            setErrorAtPutting(error);
        })
        .finally(() => {
            setPutting(false);
            setIsDirty(false);
        });
    }

    const clearForm = () => {
        setCountry(initialCountries);
        setIsDirty(false);
    };

    return (
        <>
            <Container>
                <AddSection>
                    <CountrySelect type="country" isMulti={true} options={JSON.parse(sessionStorage.getItem("countryList"))} value={selectedCountries} setState={setSelectedCountries}/>
                    <AddButton disabled={selectedCountries.length === 0 ? true : false} icon={addIcon} onClick={addCountry}/>
                </AddSection>
                {errorMessage.length !== 0 && selectedCountries && <ErrorMessage type="error">{errorMessage}</ErrorMessage>}
                <h3>Aktualnie dodane:</h3>
                <VisitedCountries>
                    {
                        country.length !== 0 ?
                        (
                            country.map((item) => (
                                <Country key={item.id}>
                                    <Flag src={item.url} alt="Flag"/>
                                    {item.country}
                                    <DeleteIcon onClick={() => deleteCountry(item.country)} src={closeIcon}/>
                                </Country>
                            ))
                        ) : <Placeholder>Wybierz kraj, który odwiedziłeś...</Placeholder>
                    }                
                </VisitedCountries>
                <Buttons>   
                    { errorAtPutting && <ApiErrorMessage type="error">Coś poszło nie tak...</ApiErrorMessage>}
                    { putting && <ApiInfoMessage>Wysyłanie...</ApiInfoMessage>}
                    <Submit disabled={!isDirty} onClick={onSubmit}>Zapisz</Submit>
                    <Cancel disabled={!isDirty} onClick={clearForm}>Anuluj</Cancel>
                </Buttons>
            </Container>
        </>
    );

}

const Container = styled.div`
    margin: 20px 0px 0px 75px;
    display: grid;
    grid-template-rows: repeat(4, auto);
    grid-row-gap: 20px;
    font-size: 20px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1220px) {
        margin: 20px 0px 0px 65px; 
    }
    @media only screen and (max-width: 870px) {
        font-size: 12px;
        grid-row-gap: 15px;
        margin: 20px 0px 0px 55px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 10px;
        margin: 15px 0px 0px 15px;
    }
`;

const VisitedCountries = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Country = styled.div`
/*
    display: inline-block;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    background-color: #E0E5E0;
    background-image: url(${({icon}) => icon});
    background-size: 20%;
    background-position: 10% 50%;
    background-repeat: no-repeat;
    border-radius: 15px;
    color: #000;
    font-size: 16px;
    padding: 5px 10px 5px 45px;
    margin-top: 5px;
    margin-right: 10px;
    flex-shrink: 1;
    @media only screen and (max-width: 870px) {
        background-size: 15%;
        font-size: 12px;
        padding: 5px 10px 5px 30px;
        margin: 0px 10px 5px 0px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 10px;
    }
*/  
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    color: #000;
    font-size: 16px;
    padding: 5px 10px 5px 0px;
    margin: 5px 10px 0px 0px;
    flex-shrink: 1;
    @media only screen and (max-width: 870px) {
        font-size: 12px;
        padding: 5px 10px 5px 0px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 10px;
    }
`;

const Flag = styled.img`
    width: auto;
    height: 15px;
    margin: 0px 10px;
`;

const DeleteIcon = styled.img`
    width: 10px;
    height: 10px;
    margin-left: 10px;
    cursor: pointer;
`;

const AddSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AddButton = styled(ButtonIcon)`
    width: 35px;
    height: 35px;
    border-radius: 25%;
    margin-left: 15px;
    margin-top: 5px;
    background-size: 50%;
`;

const ErrorMessage = styled(StatusMessage)`
    padding: 5px;
    text-align: center;
    min-width: 235px;
    max-width: 260px;
    @media only screen and (max-width: 870px) {
        font-size: 8px;
    }
`;

const Placeholder = styled.p`
    font-size: 12px;
    opacity: 0.8;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: flex-end;
    margin-right: 0px;
`;

const ApiErrorMessage = styled(StatusMessage)`
    font-size: 12px;
    text-align: center;
    padding: 5px;
    padding-top: 7px;
    margin-right: 15px;
    width: 150px;
    @media only screen and (max-width: 1080px) {
        font-size: 10px;
        padding-top: 6px;
        width: 120px;
    }
    @media only screen and (max-width: 745px) {
        width: 100px;
    }
    @media only screen and (max-width: 600px) {
        width: 110px;
    }
    @media only screen and (max-width: 560px) {
        width: 70px;
        font-size: 8px;
        padding: 2.5px 5px;
    }
`;

const ApiInfoMessage = styled(StatusMessage)`
    font-size: 12px;
    text-align: center;
    padding: 5px;
    padding-top: 7px;
    margin-right: 15px;
    width: 150px;
    @media only screen and (max-width: 1080px) {
        font-size: 10px;
        padding-top: 6px;
        width: 120px;
    }
    @media only screen and (max-width: 745px) {
        width: 100px;
    }
    @media only screen and (max-width: 600px) {
        width: 110px;
    }
    @media only screen and (max-width: 560px) {
        width: 70px;
        font-size: 8px;
        padding: 2.5px 5px;
    }
`;



export default CountriesForm;