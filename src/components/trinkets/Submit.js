import styled from "styled-components";
import Button from "../trinkets/Button";

const Submit = styled(Button)`
    border-radius: 5px;
    width: 100px;
    font-size: 18px;
    height: 32px;
    padding: 0 20px;
    margin-left: 15px;
    &:disabled {
        opacity: 0.5;
    }
    @media only screen and (max-width: 1080px) {
        height: 25px;
        font-size: 14px;
        width: 60px;
        padding: 0px;
    }
    @media only screen and (max-width: 560px) {
        height: 20px;
        font-size: 12px;
        width: 50px;
    }  
    @media only screen and (max-width: 410px) {
        font-size: 10px;
        height: 15px;
        width: 40px;
    }
`;

export default Submit;