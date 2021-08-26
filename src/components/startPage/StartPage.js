import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import appLogo from './svg/Logo.svg';
import Button from '../trinkets/Button';
import Map from '../googleMaps/Map';


const StartPage = () => {

    const [redirect, setRedirect] = useState('no');

    const options = {
        disableDefaultUI: true, // disables little yellow guy and satellite view
        zoomControl: true, // enables zoom in/out tool
        gestureHandling: "cooperative", // "none" < "cooperative" < "greedy"
        maxZoom: 3,
      };

    if (redirect === "yes") {
        return <Redirect to={{pathname: '/auth'}}/>
    }

    return (
        <Wrapper>
            <StyledHeader>
                <StyledLogo/>
                <StyledButton onClick={() => setRedirect('yes')}>Przejdź dalej</StyledButton>
            </StyledHeader>        
            <Map width={'100%'} height={'750px'} options={options} initialCoordinates={{lat: 0, lng: 0,}} type="StartPage"/>
            <StyledFooter>
                <AppInfo>
                    <Line/>
                    <StyledParagraph>
                        Travelify &copy; 2021<br/>
                        Aplikacja internetowa, umożliwiająca integrację osób o zainteresowaniach podróżniczych.<br/>
                        Twórcy: Norbert Faron, Mikołaj Telec 
                    </StyledParagraph>
                </AppInfo>
            </StyledFooter>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 140px 750px 1fr;
`;

const StyledParagraph = styled.p`
    font-weight: ${({theme}) => theme.fontWeight.light};
    color: ${({theme}) => theme.color.greyFont};
    font-size: 16px;
`;

const StyledHeader = styled.div`
    display: grid;
    grid-template-columns: 420px 1fr;
    align-items: center;
    width: 100%;
    height: 140px;
    background-color: ${({theme}) => theme.color.lightBackground};
    border-bottom: 1px solid #808080;
    @media only screen and (max-width: 763px) {
        grid-template-columns: 320px 1fr;
    }
    @media only screen and (max-width: 538px) {
        grid-template-columns: 220px 1fr;
    }
`;

const StyledLogo = styled.div`
    background-image: url(${() => appLogo});
    position: relative;
    left: 15px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    width: 400px;
    height: 124px;
    @media only screen and (max-width: 763px) {
        width: 300px;
    }
    @media only screen and (max-width: 538px) {
        width: 200px;
    }
`;

const StyledButton = styled(Button)`
    font-size: 48px;
    width: 326px;
    height: 77px;
    margin-left: auto;
    margin-right: 30px;
    @media only screen and (max-width: 763px) {
        margin: 0 auto;
        height: 55px;
        width: 200px;
        font-size: 32px;
    }
    @media only screen and (max-width: 538px) {
        width: 150px;
        font-size: 24px;
    }
`;

const StyledFooter = styled.div`
    width: 100%;
    border-top: 1px solid #808080;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding-bottom: 15px;
    height: 100%;
   
`;

const Line = styled.div`
    border: 1px solid #808080;
`;

const AppInfo = styled.div`
    width: 960px;
    padding-top: 45px;
    margin: 0 auto;
    @media only screen and (max-width: 1020px) {
        width: 80%
    }
    @media only screen and (max-width: 720px) {
        width: 50%
    }
`;


export default StartPage;
