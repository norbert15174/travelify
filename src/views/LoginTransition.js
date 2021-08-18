import React from "react";
import styled, { keyframes } from 'styled-components'

const LoginTransition = () => {

    // po zalogowaniu przechodzimy do tej strony

    return (
        <Container>
            <InnerContainer>
                <Spinner/>
                <h1>Ładowanie</h1>
            </InnerContainer>
        </Container>
    )

};

const Container = styled.div`
    position: fixed;
    width: 500px;
    height: auto;
    border-radius: 50px;
    background-color: ${({theme}) => theme.color.darkBackground};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 60px;
    @media only screen and (max-width: 720px) {
        width: auto;
    }
`;

const InnerContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-content: space-between;
    align-items: center;
    h1 {
        color: ${({theme}) => theme.color.greyFont};
        font-size: 64px;
        @media only screen and (max-width: 720px) {
            display: none;
        }
    }
    @media only screen and (max-width: 720px) {
        grid-template-columns: none;
    }
`;

const rotate = keyframes`
    from {
        transform :rotate(0deg);
    }
    to {
        transform :rotate(360deg);
    }
`
const Spinner = styled.div`
    max-width:120px;
    width:120px;
    height:120px;
    border: 36px solid ${({theme}) => theme.color.lightTurquise};
    border-top: 36px solid ${({theme}) => theme.color.darkTurquise};
    border-radius: 50%;
    animation-name: ${rotate};
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 1s;
    animation-play-state: running;
    animation-iteration-count: infinite;
    @media only screen and (max-width: 720px) {
        
    }
`

export default LoginTransition;