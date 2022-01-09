import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasicInfo,
  setBasicInfo,
} from "../../redux/groupAlbumCreatorSlice";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import FormInput from "../trinkets/FormInput";
import StatusMessage from "../trinkets/StatusMessage";
import { endpoints } from "../../miscellanous/url";
import axios from "axios";
import { groupCreator } from "../../miscellanous/Utils";

const BasicGroupInfo = ({ creatorType, editedAlbumId, setForm }) => {
  const dispatch = useDispatch();
  const basicInfo = useSelector(selectBasicInfo);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [firstRun, setFirstRun] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [infoError, setInfoError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [error, setError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [infoEditFinished, setInfoEditFinished] = useState(false);

  useEffect(() => {
    if (firstRun) {
      if (creatorType === groupCreator.creation) {
        setName("");
        setDescription("");
      } else if (creatorType === groupCreator.edition) {
        setName(basicInfo.name);
        setDescription(basicInfo.description);
      }
      setFirstRun(false);
    }
    if (creatorType === groupCreator.edition && infoEditFinished) {
      if (error) {
        setSubmitMessage("");
        setSubmitError("Coś poszło nie tak... spróbuj ponownie");
        setError(false);
      } else {
        setSubmitMessage("Zmiany zostały zapisane");
        setInfoEditFinished(false);
        setIsDirty(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoEditFinished]);

  const formHandler = () => {
    setInfoError("");
    setSubmitMessage("");
    if (name.length < 5 || !name.trim()) {
      setInfoError("Nazwa albumu powinna składać się z minimum 5 znaków!");
      return;
    }
    if (description.length === 0 || !description.trim()) {
      setInfoError("Opis albumu jest wymagany!");
      return;
    }
    if (creatorType === groupCreator.creation) {
      setForm({
        name: name.trim(),
        description: description.trim(),
      });
      setSubmitMessage("Informacje zostały dodane do formularza.");
      setFormSubmitted(true);
    } else if (creatorType === groupCreator.edition) {
      setSubmitMessage("Zapisywanie...");
      if (name !== basicInfo.name || description !== basicInfo.description) {
        editBasicInfo();
      } else {
        setInfoEditFinished(true);
      }
    }
  };

  const clearForm = () => {
    if (creatorType === groupCreator.creation) {
      setName("");
      setDescription("");
    } else if (creatorType === groupCreator.edition) {
      setName(basicInfo.name);
      setDescription(basicInfo.description);
    }
    setInfoError("");
    setSubmitError("");
    setSubmitMessage("");
    setFormSubmitted(false);
    setError(false);
    setInfoError("");
    setIsDirty(false);
  };

  async function editBasicInfo() {
    await axios({
      method: "put",
      url: endpoints.editGroupAlbum + editedAlbumId,
      data: {
        name: name.trim(),
        description: description.trim(),
      },
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
        withCredentials: true,
      },
    })
      .then((response) => {
        dispatch(
          setBasicInfo({
            name: name,
            description: description,
          })
        );
      })
      .catch((error) => {
        console.error(error);
        setName(basicInfo.name);
        setDescription(basicInfo.description);
        setError(true);
      })
      .finally(() => {
        setInfoEditFinished(true);
      });
  }

  return (
    <>
      <Container>
        <Label>
          Nazwa
          {infoError !== "" ? (
            <NameError type="error">{infoError}</NameError>
          ) : (
            <NameInfo type="info">
              Nazwa albumu oraz opis jest wymagany.
            </NameInfo>
          )}
          <FormInput
            maxLength={30}
            value={name}
            onChange={(e) => {
              if (formSubmitted) {
                setFormSubmitted(false);
              }
              setSubmitMessage("");
              setName(e.target.value);
              if (!isDirty) setIsDirty(true);
            }}
          />
        </Label>
        <Label>
          Opis
          <Description
            value={description}
            onChange={(e) => {
              if (formSubmitted) {
                setFormSubmitted(false);
              }
              setSubmitMessage("");
              setDescription(e.target.value);
              if (!isDirty) setIsDirty(true);
            }}
            placeholder="Dodaj opis albumu..."
            maxLength={800}
          />
        </Label>
      </Container>
      <Buttons>
        {submitMessage !== "" && <SubmitMessage>{submitMessage}</SubmitMessage>}
        {submitError !== "" && (
          <SubmitMessage type="error">{submitError}</SubmitMessage>
        )}
        <Submit
          disabled={!isDirty || formSubmitted ? true : false}
          type="submit"
          onClick={formHandler}
        >
          {creatorType === groupCreator.creation ? "Dodaj" : "Zapisz"}
        </Submit>
        <Cancel
          disabled={!isDirty || formSubmitted ? true : false}
          onClick={clearForm}
        >
          Anuluj
        </Cancel>
      </Buttons>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 55%;
  grid-column-gap: 15px;
  margin: 20px 0px 0px 77px;
  grid-row-gap: 25px;
  @media only screen and (max-width: 1220px) {
    margin: 20px 0px 0px 65px;
  }
  @media only screen and (max-width: 870px) {
    margin: 20px 0px 0px 55px;
    grid-gap: 15px;
  }
  @media only screen and (max-width: 560px) {
    margin: 15px 0px 0px 40px;
  }
  @media only screen and (max-width: 480px) {
    margin: 15px 0px 0px 15px;
  }
`;

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.greyFont};
  font-size: 18px;
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
`;

const Description = styled.textarea`
  display: block;
  min-height: 150px;
  width: 98%;
  margin-top: 10px;
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
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
`;

const NameError = styled(StatusMessage)`
  position: absolute;
  font-size: 12px;
  margin-left: 44%;
  @media only screen and (max-width: 1070px) {
    width: 150px;
    padding: 5px 10px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 770px) {
    width: 100px;
    margin-top: -2%;
  }
  @media only screen and (max-width: 720px) {
    margin-left: 45%;
  }
  @media only screen and (max-width: 620px) {
    width: 100px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 8px;
    margin-left: 50%;
  }
  @media only screen and (max-width: 400px) {
    margin-left: 55%;
    position: fixed;
  }
`;

const NameInfo = styled(StatusMessage)`
  position: absolute;
  font-size: 12px;
  margin-left: 44%;
  @media only screen and (max-width: 1070px) {
    width: 150px;
    padding: 5px 10px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 770px) {
    width: 100px;
    margin-top: -2%;
  }
  @media only screen and (max-width: 720px) {
    width: auto;
    margin-top: -2%;
    margin-left: 45%;
  }
  @media only screen and (max-width: 620px) {
    width: 100px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 8px;
    margin-left: 50%;
  }
  @media only screen and (max-width: 400px) {
    margin-left: 55%;
    position: fixed;
  }
`;

const SubmitMessage = styled(StatusMessage)`
  font-size: 12px;
  align-self: center;
  margin-right: 15px;
  @media only screen and (max-width: 1080px) {
    font-size: 8px;
    padding: 5px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 6px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 25px;
  height: 40px;
  @media only screen and (max-width: 1080px) {
    height: 25px;
  }
  @media only screen and (max-width: 560px) {
    margin-top: 15px;
    height: 20px;
  }
`;

export default BasicGroupInfo;
