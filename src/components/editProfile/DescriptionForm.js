import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { endpoints } from "../../miscellanous/url";
import StatusMessage from "../trinkets/StatusMessage";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";

const DescriptionForm = ({ type, data }) => {
  const [initialDescription, setInitialDescription] = useState(data);
  const [description, setDescription] = useState(data);
  const [errorAtPutting, setErrorAtPutting] = useState(null);
  const [putting, setPutting] = useState(false);

  const onSubmit = () => {
    setErrorAtPutting(false);
    setPutting(false);
    updateDescription();
  };

  async function updateDescription() {
    setPutting(true);
    const dataToPut =
      type === "interest"
        ? {
            personalDescription: { interest: description },
          }
        : {
            personalDescription: { about: description },
          };
    await axios({
      method: "put",
      url: endpoints.updateUserProfile,
      data: dataToPut,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        if (type === "interest") {
          setDescription(data.personalDescription.interest);
          setInitialDescription(data.personalDescription.interest);
        } else if (type === "about") {
          setDescription(data.personalDescription.about);
          setInitialDescription(data.personalDescription.about);
        }
      })
      .catch((error) => {
        setErrorAtPutting(error);
        console.error(error);
      })
      .finally(() => {
        setPutting(false);
      });
  }

  return (
    <>
      <Container>
        <Description
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            type === "about"
              ? "Brak opisu użytkownika..."
              : type === "interest"
              ? "Brak zainteresowań..."
              : null
          }
          maxLength={800}
        />
      </Container>
      <Buttons>
        {errorAtPutting && (
          <ApiErrorMessage type="error">Coś poszło nie tak...</ApiErrorMessage>
        )}
        {putting && <ApiInfoMessage>Wysyłanie...</ApiInfoMessage>}
        <Submit
          disabled={description === initialDescription || putting}
          type="submit"
          onClick={onSubmit}
        >
          Zapisz
        </Submit>
        <Cancel
          disabled={description === initialDescription || putting}
          onClick={() => setDescription(data)}
        >
          Anuluj
        </Cancel>
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
  background-color: ${({ theme }) => theme.color.darkBackground};
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

const ApiErrorMessage = styled(StatusMessage)`
  font-size: 12px;
  text-align: center;
  padding: 5px;
  padding-top: 7px;
  margin-right: 15px;
  width: 150px;
  @media only screen and (max-width: 1080px) {
    font-size: 10px;
    padding-top: 6px;
    width: 120px;
  }
  @media only screen and (max-width: 745px) {
    width: 100px;
  }
  @media only screen and (max-width: 600px) {
    width: 110px;
  }
  @media only screen and (max-width: 560px) {
    width: 70px;
    font-size: 8px;
    padding: 2.5px 5px;
  }
`;

const ApiInfoMessage = styled(StatusMessage)`
  font-size: 12px;
  text-align: center;
  padding: 5px;
  padding-top: 7px;
  margin-right: 15px;
  width: 150px;
  @media only screen and (max-width: 1080px) {
    font-size: 10px;
    padding-top: 6px;
    width: 120px;
  }
  @media only screen and (max-width: 745px) {
    width: 100px;
  }
  @media only screen and (max-width: 600px) {
    width: 110px;
  }
  @media only screen and (max-width: 560px) {
    width: 70px;
    font-size: 8px;
    padding: 2.5px 5px;
  }
`;

export default DescriptionForm;
