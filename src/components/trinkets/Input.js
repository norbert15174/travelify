import styled, { css } from "styled-components";
import searchIcon from "./svg/searchIcon.svg";

const Input = styled.input`
    
    background-color: ${({theme}) => theme.color.darkBackground};
    border-radius: 50px;
    border: none;
    padding: 15px 30px;
    outline-style: none;
    font-size: 16px;
    font-weight: ${({theme}) => theme.fontWeight.medium};
    
    ::placeholder {
        letter-spacing: 1px;
        color: ${({theme}) => theme.greyFont};
    }

    // when props "search" is given, searchIcon shows up
    ${({search}) => 
        search && css`
            font-size: 16px;
            padding: 10px 20px 10px 40px;
            background-image: url(${searchIcon}); 
            background-size: 16px;
            background-position: 10px 50%;
            background-repeat: no-repeat;
            
        `
    }

    
`;

export default Input;