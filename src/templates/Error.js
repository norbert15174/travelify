import React from "react";
import styled from "styled-components";
//import { Redirect } from "react-router-dom";
//import { errorTypes } from "../miscellanous/Errors";

const Error = ({errorType}) => {

    //if (errorType === errorTypes.notFound) {
    //    return <Redirect to={{pathname: "/VT37B2GUBHN9PZ3AT4CHEFE8HWBCMCTJECMTZPXCPM4MTLBTLVUPQE532ZNNWQ89"}}/>
    //}

    return (
        <>
            <Container>
                    
            </Container>
        </>
    );

};

const Container = styled.div`
    position: fixed;
    width: 1200px;
    height: auto;
    border-radius: 50px;
    background-color: ${({theme}) => theme.color.darkBackground};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 60px;
    @media only screen and (max-width: 1350px) {
        width: 900px;
    }
    @media only screen and (max-width: 1080px) {
        width: 600px;
    }
    @media only screen and (max-width: 800px) {
        width: 400px;
        padding: 60px 0px;
        width: 520px;
    }
    @media only screen and (max-width: 540px) {
        width: 300px;
        height: 600px;
        padding: 30px;
    }
    @media only screen and (max-width: 400px) {
        width: 250px;
        min-width: 280px;
        padding: 20px;
    }
`;

export default Error;