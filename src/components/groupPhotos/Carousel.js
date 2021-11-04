import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import leftArrowIcon from "./assets/leftArrowIcon.svg";
import rightArrowIcon from "./assets/rightArrowIcon.svg";
import closeIcon from "./assets/closeIcon.svg";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlur } from "../../redux/blurSlice";
import SideSection from "./SideSection";
import PinBox from "./PinBox";
import { selectAlbumPhotos } from "../../redux/groupAlbumSlice";

const Carousel = ({ selectedPhotoIndex, setClose }) => {

    // Carousel movement
    const [ current, setCurrent ] = useState(selectedPhotoIndex - 1); // current displayed image id
    const [ pinBox, setPinBox ] = useState(false); // controls PinBox
    const [ heightDelimiter, setHeightDelimiter ] = useState(null); // displayed photo clientHeight delimits carousel window dimensions
    const [ widthDelimiter, setWidthDelimiter ] = useState(null);
    const [ windowHeightDelimiter, setWindowHeightDelimiter ] = useState(800); // if your browser will blow up blame lines of code containing this state
    const photos = useSelector(selectAlbumPhotos);
    
    const length = photos.length;
    var prevSrc = "";

    const nextPhoto = () => { setCurrent(current === length - 1 ? 0 : current + 1); };
    const prevPhoto = () => { setCurrent(current === 0 ? length - 1 : current - 1); }

    // Redux store
    const dispatch = useDispatch();
    const blurState = useSelector((state) => state.blur.value);

    const ref = useRef(null);

    window.addEventListener('resize', onWindowResizeHandler);
    
    useEffect(() => {
        if (!blurState) {
            document.body.style.overflow = "hidden";
            document.addEventListener("click", touchHandler, true);
            document.querySelector("#dispImg").addEventListener('load', onImageChangeHandler, true);  
            dispatch(toggleBlur()); 
            if (window.innerWidth >= 825) {
                setWindowHeightDelimiter(window.innerHeight - 100);
            }
        };
    // eslint-disable-next-line    
    }, [blurState, dispatch, current]);
    
    // adjusts carousel size when window is resized
    function onWindowResizeHandler (e) {
        if (document.querySelector("#dispImg") !== null) {
            if (window.innerWidth >= 825) {
                setWindowHeightDelimiter(window.innerHeight - 100);
            }
            setHeightDelimiter(document.querySelector("#dispImg").clientHeight);
            setWidthDelimiter(document.querySelector("#dispImg").clientWidth);
        }
    }

    // updates heightDelimiter when image is changed
    function onImageChangeHandler (e) {
        // width/height
        if ( prevSrc !== e.path[0].src) {
            prevSrc = e.path[0].src;
            setHeightDelimiter(e.path[0].height); // może to będzie lepsze
            setWidthDelimiter(e.path[0].width);
            if (window.innerWidth >= 825) {
                setWindowHeightDelimiter(window.innerHeight - 100);
            }
        }
    };

    // outside click handler, stops propagation outside carousel 
    function touchHandler(e){
        if (!ref.current || ref.current.contains(e.target)) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <>
            <Container ref={ref}>
            { 
                pinBox && 
                <PinBox 
                    setClose={setPinBox} 
                    heightDelimiter={heightDelimiter}
                    photoId={photos[current].photo.photoId}
                /> 
            }
                <LeftArrow
                    noDisplay={current === 0 || pinBox ? true : false}
                    src={leftArrowIcon} 
                    onClick={prevPhoto}
                />
                <RightArrow 
                    noDisplay={current === length - 1 || pinBox ? true : false}
                    src={rightArrowIcon} 
                    onClick={nextPhoto}
                />
                <PreviewContainer>
                    <Image 
                        id="dispImg" 
                        src={photos[current].photo.photoUrl}
                        heightDelimiter={heightDelimiter}
                        widthDelimiter={widthDelimiter}
                        windowHeightDelimiter={windowHeightDelimiter}
                    />
                    <SideSection 
                        currentPhotoIndex={current}
                        setPinBox={setPinBox}
                        pinBox={pinBox}
                        heightDelimiter={heightDelimiter}
                        widthDelimiter={widthDelimiter}
                        windowHeightDelimiter={windowHeightDelimiter}
                    />
                </PreviewContainer>
                <CloseButton
                    noDisplay={pinBox ? true : false} 
                    src={closeIcon} 
                    onClick={() => {
                        setClose({visible: false, index: null});
                        // it's better to remove those event listeners
                        document.removeEventListener('click', touchHandler, true);
                        window.removeEventListener('resize', onWindowResizeHandler);
                        document.querySelector("#dispImg").removeEventListener('load', onImageChangeHandler, false);
                        document.body.style.overflow = "";
                        dispatch(toggleBlur());
                    }}
                />  
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
    opacity: 1;
    &:hover, &:focus {
        opacity: 0.5;
    }
    @media only screen and (max-width: 1450px) {
        z-index: 10001;
    }
    @media only screen and (max-width: 1425px) {
        z-index: 0;
    }
    @media only screen and (max-width: 1260px) {
        z-index: 10001;
    }
    @media only screen and (max-width: 1225px) {
        z-index: 0;
    }
    @media only screen and (max-width: 1060px) {
        z-index: 10001;
    }
    @media only screen and (max-width: 1025px) {
        z-index: 0;
    }
    @media only screen and (max-width: 860px) {
        z-index: 10001;
    }
    @media only screen and (max-width: 825px) {
        z-index: 0;
    }
    @media only screen and (max-width: 720px) {
        margin-left: 25px;
    }
    @media only screen and (max-width: 625px) {
        margin-left: -5px;
    }
    @media only screen and (max-width: 545px) {

        z-index: 10001;
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
    opacity: 1;
    &:hover, &:focus {
        opacity: 0.5;
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
        z-index: 10001;
    }
    @media only screen and (max-width: 510px) {
        z-index: 0;
    }
    @media only screen and (max-width: 420px) {
        margin-right: -5px;
    }
`;

const CloseButton = styled.img`
    display: ${({noDisplay}) => noDisplay ? "none" : "block"};
    position: fixed;
    top: 15px;
	right: 15px;
    margin: 0;
    width: 40px;
    height: 40px;
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
    //background-color: ${({theme}) => theme.color.darkTurquise};
    background-color: #000;
    display: grid;
    grid-template-columns: auto 500px; // 500px - comments section
    align-items: center;
    border: 2px solid ${({theme}) => theme.color.darkTurquise};
    
    width: fit-content;
    max-width: 1500px;

    @media only screen and (max-width: 1635px) {
        left: 46.5%;
        max-width: 1300px;
        grid-template-columns: auto 450px;
    }
    @media only screen and (max-width: 1425px) {
        left: 45.5%;
        grid-template-columns: auto 400px;
        max-width: 1100px;
    }
    @media only screen and (max-width: 1225px) {
        grid-template-columns: auto 350px;
        max-width: 900px;
    }
    @media only screen and (max-width: 1025px) {
        left: 44%;
        grid-template-columns: auto 250px;
        max-width: 700px;
    }
    @media only screen and (max-width: 825px) {
        grid-template-columns: none; // container width
        grid-template-rows: auto auto;
        max-height: 800px;
        left: 42%;
    }
    @media only screen and (max-width: 720px) {
        left: 50%;
    }
    @media only screen and (max-width: 510px) {
        max-width: 300px;
    }
`;

const Image = styled.img`

    object-fit: contain;

    max-height: ${({windowHeightDelimiter}) => windowHeightDelimiter + "px"};
    min-height: 500px;

    max-width: 1000px;
    width: ${({widthDelimiter}) => widthDelimiter};
    height: ${({heightDelimiter}) => heightDelimiter};
    min-width: 500px;

    @media only screen and (max-width: 1635px) {
        min-width: 450px;
        max-width: 850px;
        min-height: 450px;
        //max-height: 750px;
    }
    @media only screen and (max-width: 1425px) {
        min-width: 350px;
        max-width: 700px; 
        min-height: 350px;
        //max-height: 700px;
    }
    @media only screen and (max-width: 1225px) {
        min-width: 300px;
        max-width: 550px; 
        min-height: 300px;
        //max-height: 650px;
    }
    @media only screen and (max-width: 1025px) {
        min-width: 250px;   
        max-width: 450px; 
        min-height: 250px;  
        //max-height: 550px;
    }

    @media only screen and (max-width: 825px) {
        min-width: 250px;   
        max-width: 500px; 
        min-height: 250px; 
        max-height: 500px;
        // from this point there is no need for windowHeightDelimiter
    }

    @media only screen and (max-width: 510px) {
        width: 300px;
        min-width: 300px;
        max-width: 300px;
        min-height: 150px;
        max-height: 350px;
    }

`;

export default Carousel;