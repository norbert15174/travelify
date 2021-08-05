import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import leftArrowIcon from "./assets/leftArrowIcon.svg";
import rightArrowIcon from "./assets/rightArrowIcon.svg";
import closeIcon from "./assets/closeIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../redux/blurSlice";
import SideSection from "./SideSection";

const Carousel = ({photos, photoId, setClose}) => {

    // Carousel movement
    const [ current, setCurrent ] = useState(photoId - 1);
    const length = photos.length;

    const nextPhoto = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevPhoto = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    // Redux store
    const dispatch = useDispatch();
    const blurState = useSelector((state) => state.blur.value);

    const ref = useRef(null);

    useEffect(() => {
        console.log("Displayed photo id: " + photoId);
        if (!blurState) {
            document.body.style.overflow = "hidden";
            document.addEventListener("click", handler, true);
            dispatch(toggle()); 
        }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handler(e){
        if (!ref.current || ref.current.contains(e.target)) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container ref={ref}>
            <PreviewContainer>         
                <ImageContainer>
                    <LeftArrow
                        noDisplay={current === 0 ? true : false}
                        src={leftArrowIcon} 
                        onClick={prevPhoto}
                    />
                    <RightArrow 
                        noDisplay={current === length - 1 ? true : false}
                        src={rightArrowIcon} 
                        onClick={nextPhoto}
                    /> 
                    <Image src={photos[current].image}/>
                </ImageContainer>
                <SideSection/>
            </PreviewContainer>
            <CloseButton src={closeIcon} onClick={() => {
                setClose({visible: false, id: null});
                document.removeEventListener('click', handler, true);
                document.body.style.overflow = "";
                dispatch(toggle());
            }}/>  
        </Container>
    );  

};

const Container = styled.div`
    width: calc(100% - 120px); // 120px - menu bar
    z-index: 10000;
    @media only screen and (max-width: 720px) {
        width: 100%; // menu bar ignored
    }
`;

const LeftArrow = styled.img`
    display: ${({noDisplay}) => noDisplay ? "none" : "block"};
    position: absolute; 
    left: 0; 
    margin-left: auto; 
    top: 0;
    margin-top: auto;
    bottom: 0;
    margin-bottom: auto;
    width: 40px;
    height: 40px;
    cursor: pointer;
    opacity: 0.5;
    &:hover, &:focus {
        opacity: 1;
    }
`;

const RightArrow = styled.img`
    display: ${({noDisplay}) => noDisplay ? "none" : "block"};
    position: absolute; 
    right: 0; 
    margin-right: auto; 
    top: 0;
    margin-top: auto;
    bottom: 0;
    margin-bottom: auto;
    width: 40px;
    height: 40px;
    cursor: pointer;
    opacity: 0.5;
    &:hover, &:focus {
        opacity: 1;
    }
`;

const CloseButton = styled.img`
    position: fixed;
    top: 15px;
	right: 15px;
    margin: 0;
    width: 40px;
    height: 40px;
    visibility: ${({fake}) => fake ? "hidden" : ""};
    cursor: pointer;
    opacity: 1;
    &:hover, &:focus {
        opacity: 0.5;
    }
`;

const PreviewContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 46.8%;
    transform: translate(-50%, -50%);

    background-color: #000;

    display: grid;
    grid-template-columns: auto 500px; // 500px - comments section
    border: 2px solid ${({theme}) => theme.color.darkTurquise};
    width: 1500px;
    min-height: 500px;
    @media only screen and (max-width: 1635px) {
        width: 1300px;
        grid-template-columns: auto 450px;
    }
    @media only screen and (max-width: 1425px) {
        grid-template-columns: auto 400px;
        width: 1100px;
    }
    @media only screen and (max-width: 1225px) {
        grid-template-columns: auto 350px;
        width: 900px;
    }
    @media only screen and (max-width: 1025px) {
        grid-template-columns: auto 250px;
        width: 700px;
    }
    @media only screen and (max-width: 825px) {
        grid-template-columns: none;
        grid-template-rows: auto 250px;
        width: 500px;
    }
    @media only screen and (max-width: 510px) {
        grid-template-rows: 150px 150px;
        width: 300px;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Box = styled.div`
    background-color: ${({theme}) => theme.color.lightBackground};
    width: 100%;
    height: 100%;
`;

export default Carousel;