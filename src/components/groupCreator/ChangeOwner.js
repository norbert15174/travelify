import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectMembers } from "../../redux/groupCreatorSlice";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import SelectFriends from "../trinkets/Select";

const ChangeOwner = ({
  setOwnerChangeBox,
}) => {
  const currentMembers = useSelector(selectMembers);
  const [options, setOptions] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setOptions(
      currentMembers.filter(
        (item) => item.id.toString() !== sessionStorage.getItem("loggedUserId")
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Text>
          Obecnie jesteś właścicielem grupy i masz pełne prawa do zarządzania
          grupą. Zmiana właściciela spowoduje utratę tych praw. Po dokonaniu
          zmiany uzyskasz możliwość opuszczenia grupy.
        </Text>
        <Label>
          Wybierz nowego właściciela grupy
          <SelectContainer>
            <SelectFriends
              type="friends"
              options={options}
              value={selectedMember}
              setState={setSelectedMember}
            />
          </SelectContainer>
        </Label>
      </Container>
      <Buttons>
        <Submit
          type="submit"
          onClick={() =>
            setOwnerChangeBox({ active: true, newOwner: selectedMember })
          }
          disabled={!selectedMember ? true : false}
        >
          Zapisz
        </Submit>
        <Cancel
          onClick={() => setSelectedMember(null)}
          disabled={!selectedMember ? true : false}
        >
          Anuluj
        </Cancel>
      </Buttons>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px 0px 77px;
  min-height: 230px;
  @media only screen and (max-width: 1220px) {
    margin: 20px 0px 0px 65px;
  }
  @media only screen and (max-width: 870px) {
    margin: 20px 0px 0px 55px;
    min-height: 180px;
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

const Text = styled.h3`
  width: 50%;
  margin-bottom: 15px;
  font-size: 18px;
  color: ${({ theme }) => theme.color.redAlert};
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 25px 25px 0px;
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

export default ChangeOwner;
