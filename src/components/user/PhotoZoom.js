import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlur } from "../../redux/blurSlice";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import noBackgroundPicture from "../../assets/noBackgroundPicture.png";
import closeIcon from "../albumPhotos/assets/closeIcon.svg";

const PhotoZoom = ({ url, type, close }) => {
  const blurState = useSelector((state) => state.blur.value);
  const dispatch = useDispatch();
  const ref = useRef(null);

  useEffect(() => {
    if (!blurState) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", touchHandler, true);
      dispatch(toggleBlur());
    }
    // eslint-disable-next-line
  }, [blurState, dispatch]);

  // outside click handler, stops propagation outside carousel
  function touchHandler(e) {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <Container ref={ref}>
      <CloseButton
        src={closeIcon}
        onClick={() => {
          document.removeEventListener("click", touchHandler, true);
          document.body.style.overflow = "";
          close(null);
          dispatch(toggleBlur());
        }}
      />
      <ImageContainer>
        {type === "profile" && (
          <Photo
            src={url !== undefined && url ? url : noProfilePictureIcon}
            alt="Profile picture"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noProfilePictureIcon;
            }}
          />
        )}
        {type === "background" && (
          <Photo
            src={url !== undefined && url ? url : noBackgroundPicture}
            alt="Background picture"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noBackgroundPicture;
            }}
          />
        )}
      </ImageContainer>
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

const ImageContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  max-width: 1500px;
`;

const Photo = styled.img`
  object-fit: contain;
  min-width: 700px;
  max-width: 1300px;
  min-height: 700px;
  max-height: 800px;
  background-color: #000;
  border: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 1440px) {
    min-width: 600px;
    max-width: 980px;
    min-height: 600px;
    max-height: 700px;
  }
  @media only screen and (max-width: 1080px) {
    min-width: 500px;
    max-width: 730px;
    min-height: 500px;
    max-height: 600px;
  }
  @media only screen and (max-width: 830px) {
    min-width: 450px;
    max-width: 635px;
    min-height: 450px;
    max-height: 550px;
  }
  @media only screen and (max-width: 735px) {
    min-width: 400px;
    max-width: 460px;
    min-height: 400px;
    max-height: 500px;
  }
  @media only screen and (max-width: 560px) {
    min-width: 350px;
    max-width: 310px;
    min-height: 350px;
    max-height: 450px;
  }
  @media only screen and (max-width: 410px) {
    min-width: 350px;
    max-width: 350px;
    min-height: 300px;
    max-height: 400px;
  }
`;

const CloseButton = styled.img`
  position: fixed;
  top: 15px;
  right: 15px;
  margin: 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
  opacity: 0.5;
  &:hover,
  &:focus {
    opacity: 1;
  }
`;

export default PhotoZoom;
