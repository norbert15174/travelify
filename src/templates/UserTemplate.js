import React from "react";
import Menu from "../components/menu/Menu";
import styled from "styled-components";

// <Menu/> adds Menu sidebar
// <Container/> adds div for app sections like UserPage, News etc

const UserTemplate = ({children}) => (
    <>
        <Menu/>
        <Container>
            {children}
        </Container>
    </>
);

const Container = styled.div`
    width: calc(100% - 120px); // 120px => Menu sidebar width;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
`;

export default UserTemplate;