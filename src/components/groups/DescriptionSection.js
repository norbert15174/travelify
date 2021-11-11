import React from "react";
import styled from "styled-components";
import descriptionIcon from "./assets/descriptionIcon.svg";
import { useSelector } from "react-redux";
import { selectDescription } from "../../redux/groupDetailsSlice";

const DescriptionSection = () => {
  const description = useSelector(selectDescription);
  return (
    <Container>
      <Header>
        <h1>Opis grupy</h1>
        <Line />
      </Header>
      <InnerContainer>
        <Icon src={descriptionIcon} />
        <Text>{description}</Text>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  margin-bottom: 15px;
  @media only screen and (max-width: 550px) {
    padding: 15px 20px;
  }
`;

const Header = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.color.greyFont};
  h1 {
    font-size: 34px;
  }
  @media only screen and (max-width: 810px) {
    h1 {
      font-size: 27px;
    }
  }
  @media only screen and (max-width: 550px) {
    h1 {
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 18px;
    }
  }
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 810px) {
    margin-top: 5px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 20px;
  @media only screen and (max-width: 1010px) {
    margin-top: 15px;
  }
  @media only screen and (max-width: 550px) {
    margin-top: 10px;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
  @media only screen and (max-width: 1010px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 550px) {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

const Text = styled.div`
  font-size: 20px;
  @media only screen and (max-width: 1010px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 550px) {
    font-size: 12px;
  }
`;

export default DescriptionSection;
