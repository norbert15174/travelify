import React, { useState } from "react";
import styled from "styled-components";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import "./fileUpload.css"
import profileBackground from "./assets/profileBackground.png";
import StatusMessage from "../trinkets/StatusMessage";

const ProfileBackground = () => {

    const [ sizeError, setSizeError ] = useState(false);
    const [ typeError, setTypeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ data, setData ] = useState(undefined);

    const onChangeHandler = (e) => {
        let file = e.target.files[0];
        console.log(file);
        setTypeError(false);
        setSizeError(false);
        setErrorMessage("");
        if ( file === undefined ) {
            setData(undefined);
            document.getElementById("background").value = null;
            return;
        } 
        if ( file.size >= 5000000) {
            setSizeError(true);
            setErrorMessage("Maksymalny rozmiar to 5MB!");
            document.getElementById("background").value = null;
            return;
        }
        console.log(file.type);
        if ( !file.type.includes("image/jpeg") && !file.type.includes("image/png"))
        {
            setTypeError(true);
            setErrorMessage("Dozwolone formaty zdjęć to JPEG, JPG i PNG!");
            document.getElementById("background").value = null;
            return;
        }
        setData(file);
        console.log("OK");
    };

    const onCancel = () => {
        setTypeError(false);
        setSizeError(false);
        setErrorMessage("");
        document.getElementById("background").value = null;
        setData(undefined);
    }

    return (
        <Container>
            <Header>Zdjęcie w tle</Header>
            <Photo src={profileBackground} alt="Profile photo"/> 
            <Input>
                <input className="file__upload" id="fileInput" type="file" name="Profile" onChange={(e) => onChangeHandler(e)}/>
                { errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage> }
            </Input>
            <Buttons>
                <Submit disabled={sizeError === false && typeError === false && data === undefined} onClick={() => null}>Zapisz</Submit> 
                <Cancel disabled={sizeError === false && typeError === false && data === undefined} onClick={() => onCancel()}>Anuluj</Cancel>
            </Buttons>
        </Container>
    );
};

const Header = styled.h1`
    font-size: 48px;
    color: ${({theme}) => theme.color.greyFont};
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

const Photo = styled.img`
    width: 81.5%;
    height: 215px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};   
    display: block;
    margin: 20px auto;
    @media only screen and (max-width: 1120px) {
        height: 170px;
    }
    @media only screen and (max-width: 870px) {
        height: 150px;
    }
    @media only screen and (max-width: 660px) {
        height: 130px
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

const Buttons = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 20px;
`;

const StyledErrorMessage = styled(StatusMessage)`
    font-size: 12px;
    text-align: center;
    padding: 5px 10px;
    margin-top: -0.8%;
`;

export default ProfileBackground;