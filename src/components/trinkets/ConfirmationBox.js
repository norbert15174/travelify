import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../redux/blurSlice";
import { useDetectOutsideClick } from "./outsideModalClick";

const ConfirmationBox = ({children, confirmation="Tak", refusal="Nie", confirm, refuse}) => {
    
    const ref = useRef(null);
    
    // passing reference to the pop=up confirmation and hook for setting it visible
    useDetectOutsideClick(ref)

    const dispatch = useDispatch();
    const blurState = useSelector((state) => state.blur.value);

    useEffect(() => {
        document.addEventListener("click", handler, true);
        document.body.style.overflow = "hidden";
        if (!blurState) {
            dispatch(toggle()); 
        }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handler(e){
        if (e.target.className.includes("modal")) {
            document.removeEventListener('click', handler, true);
            document.body.style.overflow = "";
            return;
        }
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container ref={ref}>
            <Text>
                <p>{children}</p>
            </Text>
            <Buttons>
                <ConfirmButton className="modal" onClick={() => {
                    confirm(true); 
                    document.removeEventListener('click', handler, true);
                    dispatch(toggle());
                }}>
                    {confirmation}
                </ConfirmButton>
                <DeclineButton className="modal" onClick={() => {
                    refuse(true);
                    document.removeEventListener('click', handler, true);
                    dispatch(toggle());
                }}>
                    {refusal}
                </DeclineButton>
            </Buttons>
        </Container>
    )
    
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    background-color: ${({theme}) => theme.color.lightBackground};
    width: 25%;
    height: 25%;
    top: 35%;
    left: 35%;
    border: 2px solid ${({theme}) => theme.color.lightTurquise};
    padding: 50px;
    border-radius: 10px;
    z-index: 10000;
    box-shadow: 5px 5px 10px 0 ${({theme}) => theme.color.greyFont} ;
    @media only screen and (max-width: 1000px) {
       left: 30%;
    }
    @media only screen and (max-width: 720px) {
       width: 35%;
       height: 20%;
       left: 25%;
    }
    @media only screen and (max-width: 560px) {
       width: 50%;
       height: 25%;
       left: 20%;
       padding: 20px;
    }
    @media only screen and (max-width: 400px) {
       padding: 10px;
       width: 60%;
       height: 15%;
       left: 18%;
       top: 40%;
    }
`;

const Text = styled.div`
    color: #000;
    font-size: 24px;
    text-align: center;
    @media only screen and (max-width: 400px) {
       font-size: 16px;
    }
`;

const Buttons = styled.div`
    margin-top: 75px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media only screen and (max-width: 560px) {
       margin-top: 35px;
    }
`;

const ConfirmButton = styled.button`
    width: 100px;
    height: 50px;
    margin-right: 15px;
    background-color: ${({theme}) => theme.color.lightTurquise};
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: ${({theme}) => theme.color.lightBackground};
    border-radius: 50px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    @media only screen and (max-width: 400px) {
       width: 75px;
       height: 40px; 
       font-size: 16px;
    }
`;

const DeclineButton = styled.button`
    width: 100px;
    height: 50px;
    margin-left: 15px;
    background-color: ${({theme}) => theme.color.lightTurquise};
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: ${({theme}) => theme.color.lightBackground};
    border-radius: 50px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    @media only screen and (max-width: 400px) {
       width: 75px;
       height: 40px; 
       font-size: 16px;
    }
`;

export default ConfirmationBox;