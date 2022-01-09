import React from "react";
import styled from "styled-components";
import Button from "../trinkets/Button";

const DeleteAccountForm = ({setDeleteBox}) => {


    return (
        <>
            <WarningMessage>
                <p>Zablokowanego konta nie da się odzyskać !</p>
                <p>Profil, albumy i zdjęcia zostaną trwale usunięte.</p>
            </WarningMessage>
            <DeleteButton onClick={() => setDeleteBox(true)}>Zablokuj</DeleteButton>
        </> 
    );

};

const DeleteButton = styled(Button)`
    font-size: 16px;
    text-transform: uppercase;
    background-color: ${({theme}) => theme.color.redAlert};
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
    &:hover, &:focus {
        background-color: ${({theme}) => theme.color.lightRedAlert};
    } 
`;

const WarningMessage = styled.div`
    margin: 20px auto 0px auto;;
    width: 50%;
    font-size: 24px;
    color: ${({theme}) => theme.color.redAlert};
    padding: 20px 25px;
    text-align:center;
    text-transform: uppercase;
    border: 5px dashed ${({theme}) => theme.color.redAlert};
    @media only screen and (max-width: 870px) {
        font-size: 18px;
        padding: 15px 20px;
    } 
    @media only screen and (max-width: 560px) {
        font-size: 12px;
        padding: 15px 15px;
    } 
`;

export default DeleteAccountForm;