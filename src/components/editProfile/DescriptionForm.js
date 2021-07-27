import React, { useState } from "react";
import styled from "styled-components";
import Submit from "./Submit";
import Cancel from "./Cancel";

const initialDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. Donec vestibulum, lorem vitae condimentum tristique, neque sem gravida risus, in vulputate sapien est ut sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. Donec vestibulum, lorem vitae condimentum tristique, neque sem gravida risus, in vulputate sapien est ut sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. Donec vestibulum, lorem vitae condimentum tristique, neque sem gravida risus, in vulputate sapien est ut sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. Donec vestibulum, lorem vitae condimentum tristique, neque sem gravida risus, in vulputate sapien est ut sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae.`;

const DescriptionForm = () => {
    
    const [ description, setDescription ] = useState(initialDescription);
    
    return (
        <>
            <Container>
                <Description 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={initialDescription}
                />
            </Container>
            <Buttons>
                <Submit disabled={description === initialDescription} type="submit" onClick={() => { console.log(description) }}>Zapisz</Submit>
                <Cancel disabled={description === initialDescription} onClick={() => setDescription(initialDescription)}>Anuluj</Cancel>
            </Buttons>
        </>
    );
    
};

const Container = styled.div`
    margin: 20px 75px 0 75px;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-row-gap: 35px;
    @media only screen and (max-width: 560px) {
        margin: 15px 0px 0 15px;
        grid-row-gap: 15px;
    }
`;

const Description = styled.textarea`
    height: 180px;
    width: 96%;
    border-radius: 15px;
    padding: 10px;
    border: none;
    outline: none;
    resize: none;
    background-color:  ${({theme}) => theme.color.darkBackground};
    box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.3);
    text-decoration: none;
    &::placeholder {
        color: #5c5b5b;
    }
    @media only screen and (max-width: 1365px) {
        height: 300px;
    } 
    @media only screen and (max-width: 1365px) {
        height: 350px;
    }
    @media only screen and (max-width: 560px) {
        width: 80%;
        font-size: 10px;
        height: 280px;
    }
`;

const Buttons = styled.div`
    display: flex;   
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 0px;
`;

export default DescriptionForm;
