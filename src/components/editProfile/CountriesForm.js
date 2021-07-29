import React, { useState } from "react";
import styled from "styled-components";
import closeIcon from "./assets/closeIcon.svg";
import CountrySelect from "../trinkets/Select";
import ButtonIcon from "../trinkets/ButtonIcon";
import addIcon from "./assets/addIcon.svg";
import StatusMessage from "../trinkets/StatusMessage";

const options = [
    { value: 'Poland', label: 'Poland', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Germany', label: 'Germany', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Russia', label: 'Russia', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Slovakia', label: 'Slovakia', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Czech', label: 'Czech', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Belarus', label: 'Belarus', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Ukraine', label: 'Ukraine', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Lithuania', label: 'Lithuania', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Sweden', label: 'Sweden', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Norway', label: 'Norway', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
]

const CountriesForm = () => {

    const [ selectedCountries, setSelectedCountries ] = useState([]);
    const [ country , setCountry ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState("");

    const addCountry = () => {
        console.log(selectedCountries);
        selectedCountries.map((selectedCountry) => {
            setErrorMessage("");
            // SUPER AWESOME METHOD OF FINDING IF COUNTRY ISN'T ALREADY ADDED
            if (Array.from(country).find((element) => element.name === selectedCountry.value)) { 
                setErrorMessage("Kraj, który próbowałeś dodać jest już dodany.");
                return null;
            }
            setCountry((prevState) => [...prevState,{name: selectedCountry.value, icon: selectedCountry.icon}]);
            return "";
        })
        console.log(country);
        setSelectedCountries([]);
    };

    const deleteCountry = (countryToDelete) => {
        setCountry(() => country.filter(item => item.name !== countryToDelete));
        console.log(country);
    };

    return (
        <Container>
            <AddSection>
                <CountrySelect type="country" isMulti={true} options={options} value={selectedCountries} setState={setSelectedCountries}/>
                <AddButton icon={addIcon} onClick={addCountry}/>
            </AddSection>
            {errorMessage.length !== 0 && selectedCountries && <ErrorMessage type="error">{errorMessage}</ErrorMessage>}
            <h3>Aktualnie dodane:</h3>
            <VisitedCountries>
                {
                    country.length !== 0 ?
                    (
                        country.map((country) => (
                            <Country icon={country.icon} key={country.name}>
                                {country.name}
                                <DeleteIcon onClick={() => deleteCountry(country.name)} src={closeIcon}/>
                            </Country>
                        ))
                    ) : <Placeholder>Wybierz kraj, który odwiedziłeś...</Placeholder>
                }                
            </VisitedCountries>
        </Container>
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

export default CountriesForm;