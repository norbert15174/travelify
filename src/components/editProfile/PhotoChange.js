import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profilePhoto from "./assets/profilePhoto.png";
import profileBackground from "./assets/profileBackground.png";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import "./fileUpload.css"
import StatusMessage from "../trinkets/StatusMessage";

const PhotoChange = ({type}) => {

    const [ sizeError, setSizeError ] = useState(false);
    const [ typeError, setTypeError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ image, setImage ] = useState(undefined);
    const [ preview, setPreview ] = useState("");

    useEffect(() => {
        if (image) {
            // new image selected
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(image);
        } else {
            // no new image selected
            if ( type === "profile" ) {
                setPreview(profilePhoto);
            } else if ( type === "background" ) {
                setPreview(profileBackground);
            }
        }
    }, [image, type]);

    const onChangeHandler = (e) => {
        let file = e.target.files[0];
        console.log(file);
        setTypeError(false);
        setSizeError(false);
        setErrorMessage("");
        if ( file === undefined ) {
            setImage(undefined);
            document.getElementById(type).value = null;
            return;
        } 
        if ( file.size >= 5000000) {
            setSizeError(true);
            setErrorMessage("Maksymalny rozmiar zdjęcia to 5MB!");
            document.getElementById(type).value = null;
            return;
        }
        if ( !file.type.includes("image/jpeg") && !file.type.includes("image/png"))
        {
            setTypeError(true);
            setErrorMessage("Dozwolone formaty zdjęć to JPEG/JPG i PNG!");
            document.getElementById(type).value = null;
            return;
        }
        setImage(file);
    };

    const onCancel = () => {
        setTypeError(false);
        setSizeError(false);
        setErrorMessage("");
        document.getElementById(type).value = null;
        setImage(undefined);
    }

    return (
        <Container>
            <Header>{type === "profile" ? "Zdjęcie profilowe" : "Zdjęcie w tle"}</Header>
            {type === "profile" && <Profile src={preview} alt="Profile photo"/>}
            {type === "background" && <Background src={preview} alt="Profile background"/>  }
            <Input>
                <input 
                    className="file__upload" 
                    id={type}
                    type="file" 
                    onChange={(e) => onChangeHandler(e)}/>
                { errorMessage && <ErrorMessage type="error">{errorMessage}</ErrorMessage> }
            </Input>
            <Buttons>
                <Submit disabled={sizeError !== true && typeError !== true && image === undefined} onClick={() => null}>Zapisz</Submit> 
                <Cancel disabled={sizeError !== true && typeError !== true && image === undefined} onClick={() => onCancel()}>Anuluj</Cancel>
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

const Profile = styled.img`
    object-fit: cover;
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

const Background = styled.img`
    object-fit: cover;
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

const ErrorMessage  = styled(StatusMessage)`
    font-size: 12px;
    text-align: center;
    padding: 5px 10px;
    margin-top: -0.8%;
`;

const Buttons = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

export default PhotoChange;