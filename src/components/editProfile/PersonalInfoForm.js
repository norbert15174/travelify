import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import FormInput from "../trinkets/FormInput";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import CountrySelect from "../trinkets/Select";
import StatusMessage from "../trinkets/StatusMessage"

const options = [
    { value: 'Poland', label: 'Poland', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Germany', label: 'Germany', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Russia', label: 'Russia', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Poland', label: 'Poland', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Germany', label: 'Germany', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Russia', label: 'Russia', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Poland', label: 'Poland', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Germany', label: 'Germany', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Russia', label: 'Russia', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Poland', label: 'Poland', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Germany', label: 'Germany', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Russia', label: 'Russia', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
    { value: 'Poland', label: 'Poland', icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png", },
    { value: 'Germany', label: 'Germany', icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png", },
    { value: 'Russia', label: 'Russia', icon: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
];

const PersonalInfoForm = () => {

    /*
    const [ firstname, setFirstname ] = useState("");
    const [ surname, setSurname ] = useState("");
    const [ birthdate, setBirthdate ] = useState("");
    const [ nationality, setNationality ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    */

    /*
        Można jeszcze sprawdzić czy nie chcemy ustawić tego samego co wcześniej
    */

    const validate = (values) => {

        const errors = {};

        // firstname - numbers and special signs
        if ( values.firstname && (/\d/g).test(values.firstname)) {
            errors.firstname = "Imię nie powinno zawierać numerów/znaków specjalnych!";
        } else if ( values.firstname && (/[^a-zA-Z\d]/).test(values.firstname)) {
            errors.firstname = "Imię nie powinno zawierać numerów/znaków specjalnych!";
        }

        // surname - numbers and special signs
        if ( values.surname && (/\d/g).test(values.surname)) {
            errors.surname = "Imię nie powinno zawierać cyfr/znaków specjalnych!";
        } else if ( values.surname && (/[^a-zA-Z\d]/).test(values.surname)) {
            errors.surname = "Imię nie powinno zawierać cyfr/znaków specjalnych!";
        }

        // birthdate - checking if someone isn't from the future
        if ( values.birthdate ) {
            if(new Date(values.birthdate) > new Date()){
                errors.birthdate = "Przybyłeś z przyszłości?";
            }
        } 

        // email - checking email address format
        if ( values.email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
            errors.email = "Nieprawidłowy adres email!";
        }

        // phoneNumber
        if ( values.phoneNumber && !(/^[0-9]*$/).test(values.phoneNumber)) {
            errors.phoneNumber = "Numer telefonu powinien zawierać jedynie cyfry!"
        } else if ( values.phoneNumber && values.phoneNumber.length !== 9) {
            errors.phoneNumber = "Numer telefonu powinien składać się z 9 cyfr!";
        }

        console.log(errors);

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            firstname: "",
            surname: "",
            birthdate: "",
            nationality: "",
            email: "",
            phoneNumber: "",
        },
        validate,
        onSubmit: (values, actions) => {
            //setNationality(values.nationality.value);
            //console.log(nationality);
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            actions.resetForm();
        },
    });

    

    return (
        <form onSubmit={formik.handleSubmit}>
            <Container>
                <LeftContainer>
                        <CurrentContainer>
                            Imię
                            <CurrentValue>Mikołaj</CurrentValue>
                        </CurrentContainer>
                        <Label htmlFor="firstname">
                            Nowe imię
                            <FormInput 
                                name="firstname" 
                                id="firstname" 
                                type="text" 
                                value={formik.values.firstname} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                maxLength={30} 
                                placeholder="Jan..." 
                                autoComplete="off"
                            />              
                            { formik.touched.firstname && formik.errors.firstname ? <ErrorMessage type="error">{formik.errors.firstname}</ErrorMessage> : null}
                        </Label>
                        <CurrentContainer>
                            Nazwisko
                            <CurrentValue>Telec</CurrentValue>
                        </CurrentContainer>
                        <Label htmlFor="surname">
                            Nowe nazwisko
                            <FormInput 
                                name="surname" 
                                id="surname" 
                                type="text" 
                                value={formik.values.surname} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                maxLength={30} 
                                placeholder="Nowak..."
                                autoComplete="off"
                            />
                            { formik.touched.surname && formik.errors.surname ? <ErrorMessage type="error">{formik.errors.surname}</ErrorMessage> : null}
                        </Label>
                        <CurrentContainer>
                            Data urodzenia
                            <CurrentValue>07-12-1999</CurrentValue>
                        </CurrentContainer>
                        <Label htmlFor="birthdate">
                            Nowa data urodzenia
                            <FormInput 
                                name="birthdate" 
                                id="birthdate" 
                                type="date" 
                                value={formik.values.birthdate} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                            />
                            { formik.touched.birthdate && formik.errors.birthdate ? <ErrorMessage type="error">{formik.errors.birthdate}</ErrorMessage> : null}
                        </Label>
                        <CurrentContainer>
                            Pochodzenie
                            <CurrentValue>Poland</CurrentValue>
                        </CurrentContainer>
                        <Label htmlFor="nationality">
                            Nowe pochodzenie
                            <CountrySelect 
                                formik 
                                type="country"
                                name="nationality" 
                                id="nationality" 
                                options={options} 
                                onChange={formik.setFieldValue} 
                                value={formik.values.nationality}  
                                onBlur={formik.setFieldTouched}
                            />
                        </Label>                          
                </LeftContainer>
                <RightContainer>
                        <CurrentContainer>
                            Email
                            <CurrentValue>mikolaj.telec@poczta.com</CurrentValue>
                        </CurrentContainer>
                        <Label htmlFor="email">
                            Nowy email
                            <FormInput 
                                name="email" 
                                id="email" 
                                value={formik.values.email} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                placeholder="nazwa@poczta.com"
                                autoComplete="off"
                                maxLength={30}
                            />
                            { formik.touched.email && formik.errors.email ? <ErrorMessage type="error"><p>{formik.errors.email}</p></ErrorMessage> : null}
                        </Label>
                        <CurrentContainer>
                            Telefon
                            <CurrentValue>123456789</CurrentValue>
                        </CurrentContainer>
                        <Label htmlFor="phoneNumber">
                            Nowy numer
                            <FormInput 
                                name="phoneNumber" 
                                id="phoneNumber" 
                                type="tel" 
                                value={formik.values.phoneNumber} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur} 
                                placeholder="123456789..." 
                                maxLength={9}
                                autoComplete="off"
                            />
                            { formik.touched.phoneNumber && formik.errors.phoneNumber ? <ErrorMessage type="error">{formik.errors.phoneNumber}</ErrorMessage> : null}
                        </Label>
                </RightContainer>
            </Container>
            <Buttons>   
                <Submit type="submit" disabled={formik.isSubmitting || !formik.dirty}>Zapisz</Submit>
                <Cancel disabled={formik.isSubmitting || !formik.dirty} onClick={formik.handleReset}>Anuluj</Cancel>
            </Buttons>
        </form>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 80px;
    margin-left: 77px;
    margin-top: 20px;
    @media only screen and (max-width: 1440px) {
        grid-column-gap: 40px;
    }
    @media only screen and (max-width: 1220px) {
        margin-left: 66px;
    }
    @media only screen and (max-width: 870px) {
        margin-left: 56px;
    }
    @media only screen and (max-width: 560px) {
        margin: 15px 0 0 15px;
    }
    @media only screen and (max-width: 480px) {
        grid-column-gap: 30px;
        grid-template-columns: 200px 1fr;
    }
    @media only screen and (max-width: 460px) {
        grid-column-gap: 0px;
        grid-template-columns: 250px;
        margin-bottom: 20px;
    }
`;

const LeftContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 80px);
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 10px;
    grid-row-gap: 20px;
    @media only screen and (max-width: 1360px) {
        grid-template-columns: none;
        grid-template-rows: repeat(8, 60px);
        grid-column-gap: 0px;
    }
    @media only screen and (max-width: 870px) {
        grid-template-rows: repeat(8, 50px);
        grid-row-gap: 15px;
    }
    @media only screen and (max-width: 560px) {
        grid-template-rows: repeat(8, 35px);
    }
    @media only screen and (max-width: 460px) {
        grid-template-rows: repeat(8, 35px);
        grid-column-gap: 0px;
    }
`;

const RightContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 80px);
    grid-template-columns: repeat(2, auto);
    grid-column-gap: 10px;
    grid-row-gap: 20px;
    @media only screen and (max-width: 1360px) {
        grid-template-columns: none;
        grid-template-rows: repeat(4, 60px);
        grid-column-gap: 0px;
        grid-row-gap: 15px;
    }
    @media only screen and (max-width: 870px) {
        grid-template-rows: repeat(4, 50px);
        grid-row-gap: 10px;
    }
    @media only screen and (max-width: 560px) {
        grid-template-rows: repeat(4, 35px);
    }
    @media only screen and (max-width: 460px) {
        margin-top: 40px;
    }
`;

const CurrentContainer = styled.div`
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

const CurrentValue = styled.p`
    color: #000;
    font-size: 24px;
    font-weight: ${({theme}) => theme.fontWeight.light};
    @media only screen and (max-width: 870px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 14px;
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

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: flex-end;
    margin-right: 0px;
`;



const ErrorMessage = styled(StatusMessage)`
    font-size: 12px;
    text-align: center;
    padding: 5px;
    position: absolute;
    margin-top: 5px;
    width: 270px;
    @media only screen and (max-width: 1360px) {
        margin-left: 8%;
        width: 250px;
    }
    @media only screen and (max-width: 1220px) {
        width: 230px;
        font-size: 10px;
        margin-left: 12%;
    }
    @media only screen and (max-width: 1080px) {
       width: 210px;
    }
    @media only screen and (max-width: 960px) {
       font-size: 8px;
       margin-left: 10%;
    }
    @media only screen and (max-width: 870px) {
       width: 120px;
    }
    @media only screen and (max-width: 735px) {
        margin-left: 12%;
        padding: 5px 0;
    }
    @media only screen and (max-width: 460px) {
        position: absolute;
        margin: -25px 0px 0 275px;
        font-size: 6px;
        width: 80px;
    }
`;


export default PersonalInfoForm;