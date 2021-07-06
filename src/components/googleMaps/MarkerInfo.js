import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const MarkerInfo = ({name, url, title}) => {

    const [redirect, setRedirect] = useState('no');

    if (redirect === "yes") {
        return <Redirect to={{pathname: '/auth'}}/>
    }
    return (
        <Wrapper>
            <StyledPhoto src={url} alt="profilePhoto"/>
            <InnerWrapper>
                <StyledHeader>{name}</StyledHeader>
                <p>{title}</p>
                {/* TODO add localization */}
                <StyledLink onClick={() => setRedirect('yes')}>Wyświetl album</StyledLink>
            </InnerWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 153px 1fr;
    padding: 35px 25px;

    @media only screen and (max-width: 1020px) {
        padding: 0px; 
        grid-template-columns: 107px 1fr;
    }
`; 

const StyledPhoto = styled.img`
    width: 138px;
    height: 153px;
    border-radius: 30%;
  
    @media only screen and (max-width: 1020px) {
        width: 90%;
        height: 70%;
        margin: auto;
    }

`;

const InnerWrapper = styled.div`
    height: 138px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    font-size: 28px;
    color: ${({theme}) => theme.color.darkTurquise};
    margin-left: 25px;

    @media only screen and (max-width: 1020px) {
        min-height: 90px;
        font-size: 16px;
        margin-top: 18px;
        margin-left: 15px;
    }
`;

const StyledHeader = styled.h2`
    font-size: 36px;
    color: ${({theme}) => theme.color.darkTurquise};
    margin-top: 0px;
    margin-bottom: 13px;

    @media only screen and (max-width: 1020px) {
        font-size: 20px;
        margin-top: 5px;
        margin-bottom: 5px; 
    } 

`;

const StyledLink = styled.a`
    display: block;
    margin-top: 18px;
    color: ${({theme}) => theme.color.lightTurquise};
    font-weight: ${({theme}) => theme.fontWeight.light};
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
   
    @media only screen and (max-width: 1020px) {
        font-size: 16px; 
        margin-top: 25px;
        margin-bottom: auto;
    }

`;

export default MarkerInfo;