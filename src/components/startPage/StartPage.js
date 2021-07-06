import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import fakeMap from '../../assets/fakeMap.jpg';
import appLogo from './svg/Logo.svg';
import Button from '../trinkets/Button';

const StartPage = () => {

    const [redirect, setRedirect] = useState('no');

    if (redirect === "yes") {
        return <Redirect to={{pathname: '/auth'}}/>
    }

    return (
        <>
            <StyledHeader>
                <StyledLogo/>
                <StyledButton onClick={() => setRedirect('yes')}>Przejdź dalej</StyledButton>
            </StyledHeader>
            <MapWrapper src={fakeMap}/>
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
        </>
    )
}

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
`;

const StyledButton = styled(Button)`
    font-size: 48px;
    width: 326px;
    height: 77px;
    margin-left: auto;
    margin-right: 30px;
`;

const MapWrapper = styled.img`
    width: 100%;
    height: 750px
`;

const StyledFooter = styled.div`
    width: 100%;
    border-top: 1px solid #808080;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding-bottom: 15px;
`;

const Line = styled.div`
    border: 1px solid #808080;
`;

const AppInfo = styled.div`
    width: 960px;
    padding-top: 45px;
    margin: 0 auto;
`;


export default StartPage;
