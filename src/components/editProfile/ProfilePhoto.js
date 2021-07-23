import React, { useState } from "react";
import styled from "styled-components";
import profilePhoto from "./assets/profilePhoto.png";
import Submit from "./Submit";
import Cancel from "./Cancel";
import "./fileUpload.css"
import ErrorMessage from "./ErrorMessage";

const ProfilePhoto = () => {

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
            document.getElementById("fileInput").value = null;
            return;
        } 
        if ( file.size >= 2000000) {
            setSizeError(true);
            setErrorMessage("Maksymalny rozmiar to 5MB!");
            document.getElementById("fileInput").value = null;
            return;
        }
        console.log(file.type);
        if ( !file.type.includes("image/jpeg") && !file.type.includes("image/png"))
        {
            setTypeError(true);
            setErrorMessage("Dozwolone formaty zdjęć to JPEG, JPG i PNG!");
            document.getElementById("fileInput").value = null;
            return;
        }
        setData(file);
        console.log("OK");
    };

    const onCancel = () => {
        setTypeError(false);
        setSizeError(false);
        setErrorMessage("");
        document.getElementById("fileInput").value = null;
        setData(undefined);
    }

    return (
        <Container>
            <Header>Zdjęcie profilowe</Header>
            <Photo src={profilePhoto} alt="Profile photo"/> 
            <Input>
                <input className="file__upload" id="fileInput" type="file" name="Profile" onChange={(e) => onChangeHandler(e)}/>
                { errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage> }
            </Input>
            <Buttons>
                <Submit disabled={sizeError !== true && typeError !== true && data === undefined} onClick={() => null}>Zapisz</Submit> 
                <Cancel disabled={sizeError !== true && typeError !== true && data === undefined} onClick={() => onCancel()}>Anuluj</Cancel>
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
    width: 215px;
    height: 215px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
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

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(3, auto) 1fr;
`;

const Input = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: baseline;
`;

const StyledErrorMessage = styled(ErrorMessage)`
    font-size: 12px;
    text-align: center;
    padding: 5px 10px;
    margin-top: -0.8%;
`;

const Buttons = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

export default ProfilePhoto;