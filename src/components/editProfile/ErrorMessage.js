import styled, { keyframes } from "styled-components";

const opacityUp = keyframes`
    0% { opacity: 0; }
    25% { opacity: 0.25; }
    50% { opacity: 0.5; }
    75% { opacity: 0.75; }
    100% { opacity: 1; }
`;

const ErrorMessage = styled.div`
    animation-name: ${opacityUp};
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
    font-size: 16px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    color: ${({theme}) => theme.color.redAlert};
    border: 2px solid ${({theme}) => theme.color.redAlert};
    padding: 15px 10px;
    text-transform: uppercase;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export default ErrorMessage;