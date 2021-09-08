import React from "react";
import styled, { keyframes } from "styled-components";


const Spinner = ({height, width, border, firstColor, secondColor}) => (
    <Loading width={width} height={height} border={border} firstColor={firstColor} secondColor={secondColor}/>
);

const rotate = keyframes`
    from {
        transform :rotate(0deg);
    }
    to {
        transform :rotate(360deg);
    }
`;

const Loading = styled.div`
  max-width: ${({width}) => width};
  width: ${({width}) => width};
  height: ${({height}) => height};
  border: ${({border}) => border} solid ${({firstColor}) => firstColor};
  border-top: ${({border}) => border} solid ${({secondColor}) => secondColor};
  border-radius: 50%;
  animation-name: ${() => rotate};
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0.5s;
  animation-play-state: running;
  animation-iteration-count: infinite;
  @media only screen and (max-width: 720px) {
    max-width: ${({width}) => width};
    width: ${({width}) => width};
    height: ${({height}) => height};
    border: ${({border}) => border} solid ${({firstColor}) => firstColor};
    border-top: ${({border}) => border} solid ${({secondColor}) => secondColor};
  }
`;

export default Spinner;