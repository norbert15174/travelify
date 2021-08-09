import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import leftArrowIcon from "./assets/leftArrowIcon.svg";
import rightArrowIcon from "./assets/rightArrowIcon.svg";
import closeIcon from "./assets/closeIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlur } from "../../redux/blurSlice";
import SideSection from "./SideSection";
import SharePinBox from "../albums/SharePinBox";

const Carousel = ({photos, photoId, setClose}) => {

    // Carousel movement
    const [ current, setCurrent ] = useState(photoId - 1); // current displayed image id
    const [ sharePinBox, setSharePinBox ] = useState(false); // controls  
    const [ imageHeight, setImageHeight ] = useState(null);
    const length = photos.length;
    
    const nextPhoto = () => { setCurrent(current === length - 1 ? 0 : current + 1); };
    const prevPhoto = () => { setCurrent(current === 0 ? length - 1 : current - 1); }

    // Redux store
    const dispatch = useDispatch();
    const blurState = useSelector((state) => state.blur.value);

    const ref = useRef(null);

    useEffect(() => {
        if (!blurState) {
            document.body.style.overflow = "hidden";
            document.addEventListener("click", handler, true);
            dispatch(toggleBlur()); 
        };
        setImageHeight(document.querySelector("#dispImg").clientHeight);
    ;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photoId, current, imageHeight]);

    function handler(e){
        if (!ref.current || ref.current.contains(e.target)) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
    }

    
    /*
        JAKBY SIĘ POJAWIŁ JAKIŚ PROBLEM Z WYŚWIETLANIEM OKIENKA DO OZNACZANIA I KARUZELI ZE ZDJĘCIAMI TO TU MOŻE BYĆ PROBLEM,
        NA SZCZĘŚCIE NIC SIĘ NIE ROBIŁO DZIWNEGO JESZCZE XD
    */

    return (
        <>
            <Container ref={ref}>
            { sharePinBox && <SharePinBox type="pin" setClose={setSharePinBox}/> }
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
                <PreviewContainer>         
                    <Image id="dispImg" src={photos[current].image}/>
                    <SideSection photoId={photoId} setPinBox={setSharePinBox} heightDelimiter={imageHeight}/>
                </PreviewContainer>
                <CloseButton src={closeIcon} onClick={() => {
                    setClose({visible: false, id: null});
                    document.removeEventListener('click', handler, true);
                    document.body.style.overflow = "";
                    dispatch(toggleBlur());
                }}/>  
            </Container>
        </>
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
    position: fixed; 
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
    @media only screen and (max-width: 1450px) {
        opacity: 1;
        z-index: 10001;
    }
    @media only screen and (max-width: 1425px) {
        opacity: 0.5;
        z-index: 0;
    }
    @media only screen and (max-width: 1260px) {
        opacity: 1;
        z-index: 10001;
    }
    @media only screen and (max-width: 1225px) {
        opacity: 0.5;
        z-index: 0;
    }
    @media only screen and (max-width: 1060px) {
        opacity: 1;
        z-index: 10001;
    }
    @media only screen and (max-width: 1025px) {
        opacity: 0.5;
        z-index: 0;
    }
    @media only screen and (max-width: 860px) {
        opacity: 1;
        z-index: 10001;
    }
    @media only screen and (max-width: 825px) {
        opacity: 0.5;
        z-index: 0;
    }
    @media only screen and (max-width: 720px) {
        margin-left: 25px;
    }
    @media only screen and (max-width: 625px) {
        margin-left: -5px;
    }
    @media only screen and (max-width: 545px) {
        opacity: 1;
        z-index: 10001;
    }
    @media only screen and (max-width: 510px) {
        opacity: 0.5;
        z-index: 0;
    }
    @media only screen and (max-width: 420px) {
        margin-left: -5px;
    }
`;

const RightArrow = styled.img`
    display: ${({noDisplay}) => noDisplay ? "none" : "block"};
    position: fixed; 
    right: 0; 
    margin-right: 120px; 
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
    @media only screen and (max-width: 1705px) {
        margin-right: 85px;
    }
    @media only screen and (max-width: 1635px) {
        margin-right: 120px;
    }
    @media only screen and (max-width: 1505px) {
        margin-right: 85px;
    }
    @media only screen and (max-width: 1425px) {
        margin-right: 120px;
    }
    @media only screen and (max-width: 1305px) {
        margin-right: 85px;
    }
    @media only screen and (max-width: 1225px) {
        margin-right: 120px;
    }
    @media only screen and (max-width: 1105px) {
        margin-right: 85px;
    }
    @media only screen and (max-width: 1025px) {
        margin-right: 120px;
    }
    @media only screen and (max-width: 905px) {
        margin-right: 85px;
    }
    @media only screen and (max-width: 825px) {
        margin-right: 120px;
    }
    @media only screen and (max-width: 720px) {
        margin-right: 25px;
    }
    @media only screen and (max-width: 625px) {
        margin-right: -5px;
    }
    @media only screen and (max-width: 545px) {
        opacity: 1;
        z-index: 10001;
    }
    @media only screen and (max-width: 510px) {
        opacity: 0.5;
        z-index: 0;
    }
    @media only screen and (max-width: 420px) {
        margin-right: -5px;
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
    opacity: 0.5;
    &:hover, &:focus {
        opacity: 1;
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
    align-items: center;
    border: 2px solid ${({theme}) => theme.color.darkTurquise};;
    width: fit-content;
    min-width: 750px;
    max-width: 1500px;
    @media only screen and (max-width: 1635px) {
        left: 46.5%;
        width: 1300px;
        grid-template-columns: auto 450px;
    }
    @media only screen and (max-width: 1425px) {
        left: 45.5%;
        grid-template-columns: auto 400px;
        width: 1100px;
    }
    @media only screen and (max-width: 1225px) {
        grid-template-columns: auto 350px;
        width: 900px;
    }
    @media only screen and (max-width: 1025px) {
        left: 44%;
        grid-template-columns: auto 250px;
        width: 700px;
        max-width: 700px;
        min-width: 350px;
    }
    @media only screen and (max-width: 825px) {
        grid-template-columns: 500px;
        grid-template-rows: auto auto;
        min-width: 300px;
        max-width: 500px;
        left: 42.5%;
    }
    @media only screen and (max-width: 720px) {
        left: 50%;
    }
    @media only screen and (max-width: 510px) {
        grid-template-columns: 300px;
        grid-template-rows: auto auto;
        min-width: 200px;
        max-width: 300px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain;
    min-width: 750px;
    //min-width: 500px; // min-width takie jak side section
    @media only screen and (max-width: 1425px) {
        min-width: 600px;
    }
    @media only screen and (max-width: 1225px) {
        min-width: 500px;
    }
    @media only screen and (max-width: 1025px) {
        min-width: 450px;
    }
    @media only screen and (max-width: 825px) {
       min-width: 500px;
       max-height: 400px;
    }
    @media only screen and (max-width: 510px) {
       min-width: 300px;
       max-height: 250px;
    }
`;

export default Carousel;