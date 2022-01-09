import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useFormik } from "formik";
import StatusMessage from "../trinkets/StatusMessage";
import FormInput from "../trinkets/FormInput";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import { endpoints } from "../../miscellanous/url";


const PasswordForm = () => {

    const [ errorAtPutting, setErrorAtPutting ] = useState(null);
    const [ success, setSuccess ] = useState(false);
    const [ wrongOldPassword, setWrongOldPassword ] = useState(false);

    const validate = (values) => {

        const errors = {};
        
        if (errorAtPutting !== null) setErrorAtPutting(null);
        if (success) setSuccess(false);

        if (!values.actualPassword) {
            errors.actualPassword = "Wymagane!";
        }

        if (!values.newPassword) {
            errors.newPassword = "Wymagane!";
        } else if ( values.newPassword === values.actualPassword ) {
            errors.newPassword = "Nowe hasło nie może być takie samo jak stare!"
        } else if ( !(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,})$/).test(values.newPassword) ) {
            errors.newPassword = "Hasło powinno składać się z minimum 8 znaków (1 cyfra, 1 duża litera oraz 1 znak specjalny)!"
        }

        if (!values.repeatPassword) {
            errors.repeatPassword = "Wymagane!"
        }

        if ( values.newPassword !== values.repeatPassword ) {
            errors.repeatPassword = "Podane hasło nie jest takie samo!";
        } 

        return errors;

    }

    const formik = useFormik({
        initialValues: {
            actualPassword: "",
            newPassword: "",
            repeatPassword: "",
        },
        validate,
        onSubmit: async (values, actions) => {
            setErrorAtPutting(null);
            setWrongOldPassword(false);
            setSuccess(false);
            await axios({
                method: "put",
                url: endpoints.changePassword,
                data: {
                    oldPassword: values.actualPassword,
                    newPassword: values.newPassword,
                },
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    //"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
                    withCredentials: true,
                    //credentials: 'same-origin',
                    
                },
            })
            .then((response) => {                
                setSuccess(true);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    setWrongOldPassword(true);
                } else {
                    setErrorAtPutting(error);
                }
            })
            //actions.setSubmitting(false); // not needed when onSubmit is async
            actions.resetForm();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Container>
                <Label htmlFor="actualPassword">
                    Bieżące hasło
                    <FormInput 
                        name="actualPassword" 
                        id="actualPassword" 
                        type="password" 
                        value={formik.values.actualPassword} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        minLength={8}
                        maxLength={30}
                    />
                </Label>
                { formik.touched.actualPassword && formik.errors.actualPassword ? <ErrorMessage type="error">{formik.errors.actualPassword}</ErrorMessage> : <div/>}
                <Label>
                    Wprowadź nowe hasło
                    <FormInput
                        disabled={formik.errors.actualPassword} 
                        name="newPassword" 
                        id="newPassword" 
                        type="password" 
                        value={formik.values.newPassword} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        minLength={8}
                        maxLength={30}
                    />
                </Label>
                { formik.touched.newPassword && formik.errors.newPassword ? <ErrorMessage type="error">{formik.errors.newPassword}</ErrorMessage> : <div/>}
                <Label>
                    Wprowadź ponownie nowe hasło
                    <FormInput
                        disabled={formik.errors.actualPassword || formik.errors.newPassword}  
                        name="repeatPassword" 
                        id="repeatPassword" 
                        type="password" 
                        value={formik.values.repeatPassword} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        maxLength={30}
                    />
                </Label> 
                { formik.touched.repeatPassword && formik.errors.repeatPassword ? <ErrorMessage type="error">{formik.errors.repeatPassword}</ErrorMessage> : <div/>}
            </Container>
            <Buttons>
                { errorAtPutting && <ApiErrorMessage type="error">Coś poszło nie tak...</ApiErrorMessage>}
                { wrongOldPassword && <ApiErrorMessage type="error">Bieżące hasło, które podałeś jest złe. Spróbuj ponownie!</ApiErrorMessage>}
                { formik.isSubmitting && <ApiInfoMessage>Wysyłanie...</ApiInfoMessage>}
                { success && <ApiInfoMessage>Hasło zostało zmienione!</ApiInfoMessage>}
                <Submit type="submit" disabled={formik.isSubmitting || !formik.dirty || formik.errors.actualPassword || formik.errors.newPassword || formik.errors.repeatPassword } >Zapisz</Submit>
                <Cancel disabled={formik.isSubmitting || !formik.dirty} onClick={formik.handleReset}>Anuluj</Cancel>
            </Buttons>
        </form>
    );

}

const Container = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: repeat(3, auto);
    grid-column-gap: 30px;
    grid-row-gap: 15px;
    margin: 20px 75px 0 75px;
    @media only screen and (max-width: 1220px) {
        margin: 20px 0 0 65px;
    }
    @media only screen and (max-width: 870px) {
        grid-column-gap: 20px;
        margin: 20px 0 0 55px;
        grid-template-columns: 250px 1fr;
    }
    @media only screen and (max-width: 560px) {
        margin: 15px 0 0 15px;
    }
    @media only screen and (max-width: 480px) {
        grid-template-columns: 200px 1fr;
    }
`;

const Label = styled.label`
    font-size: 18px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 870px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 10px;
    }
`;

const ErrorMessage = styled(StatusMessage)`
    justify-self: flex-start;
    align-self: center;
    font-size: 12px;
    height: 15px;
    text-align: center;
    padding: 5px 10px;
    @media only screen and (max-width: 1220px) {
        font-size: 10px;
        height: 10px;
        padding: 5px;
        margin-bottom: 0px;
    }
    @media only screen and (max-width: 870px) {
        font-size: 8px;
        height: 8px;

    }
    @media only screen and (max-width: 560px) {
        font-size: 6px;
    }
`;

const Buttons = styled.div`
    display: flex;   
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 0px;
    @media only screen and (max-width: 670px) {
        margin-top: 10px;
    }
`;


const ApiErrorMessage = styled(StatusMessage)`
    font-size: 12px;
    text-align: center;
    padding: 5px 10px;
    margin-right: 15px;
    width: auto;
    @media only screen and (max-width: 1080px) {
        font-size: 10px;
    }
    @media only screen and (max-width: 1080px) {
        width: 150px;
    }
    @media only screen and (max-width: 810px) {
        width: 120px;
    }
    @media only screen and (max-width: 660px) {
        width: auto;
    }
    @media only screen and (max-width: 560px) {
        padding: 2.5px 5px;
        font-size: 8px;
        
    }
`;

const ApiInfoMessage = styled(StatusMessage)`
    font-size: 12px;
    text-align: center;
    padding: 5px 10px;
    margin-right: 15px;
    width: auto;
    @media only screen and (max-width: 1080px) {
        font-size: 10px;
    }
    @media only screen and (max-width: 560px) {
        padding: 2.5px 5px;
        font-size: 8px;
        
    }
`;

export default PasswordForm;