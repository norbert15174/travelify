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
                <StyledLink onClick={() => setRedirect('yes')}>Zaloguj się, by zobaczyć</StyledLink>
            </InnerWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 153px 1fr;
    padding: 35px 25px;
`; 

const StyledPhoto = styled.img`
    width: 138px;
    height: 153px;
    border-radius: 40%;
  
    @media only screen and (max-width: 1020px) {
        width: 80%
    }
    /*
    @media only screen and (max-width: 720px) {
        width: 50%
    }
   */
  //border: 2px solid ${({theme}) => theme.color.lightTurquise};
`;

const InnerWrapper = styled.div`
    height: 138px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    font-size: 28px;
    color: ${({theme}) => theme.color.darkTurquise};
    margin-left: 25px;
`;

const StyledHeader = styled.h2`
    font-size: 36px;
    color: ${({theme}) => theme.color.darkTurquise};
    margin-top: 10px;
    margin-bottom: 13px;
`;

const StyledLink = styled.a`
    display: block;
    margin-top: 18px;
    color: ${({theme}) => theme.color.lightTurquise};
    font-weight: ${({theme}) => theme.fontWeight.light};
    text-decoration: underline;
    cursor: pointer;
`;

export default MarkerInfo;