import React, { useState, useEffect } from "react";
import styled from "styled-components";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import addIcon from "./assets/addIcon.svg";
import SelectFriends from "../trinkets/Select";
import closeIcon from "./assets/closeIcon.svg";
import ButtonIcon from "../trinkets/ButtonIcon";
import StatusMessage from "../trinkets/StatusMessage";

const Members = ({ friendsList, setForm, form }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  const [friendsError, setFriendsError] = useState("");

  const [isDirty, setIsDirty] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setNewMembers([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formHandler = () => {
    setFriendsError("");
    setSubmitMessage("");
    setSubmitError("");
    setForm(newMembers);
    setSubmitMessage("Informacje zostały dodane do formularza.");
    setFormSubmitted(true);
    setIsDirty(false);
  };

  const clearForm = () => {
    setNewMembers(form);
    setForm(form);
    setFriendsError("");
    setSubmitError("");
    setSubmitMessage("");
    setFormSubmitted(false);
    setIsDirty(false);    
  };

  const addFriend = () => {
    selectedFriends.map((selectedFriend) => {
      setFriendsError("");
      if (
        Array.from(newMembers).find(
          (element) => element.id === selectedFriend.id
        )
      ) {
        setFriendsError("Jedna z osób została już przez ciebie wybrana!");
        return null;
      }
      setNewMembers((prevState) => [
        ...prevState,
        {
          name: selectedFriend.value,
          icon: selectedFriend.icon,
          id: selectedFriend.id,
        },
      ]);
      return "";
    });
    if (formSubmitted) {
      setSubmitMessage("");
      setFormSubmitted(false);
    }
    setIsDirty(true);
    setSelectedFriends([]);
  };

  const deleteFriend = (friendToDelete) => {
    setNewMembers(() =>
      newMembers.filter((item) => item.id !== friendToDelete)
    );
    if (formSubmitted) {
      setSubmitMessage("");
      setFormSubmitted(false);
    }
    if (friendsError) {
      setFriendsError("");
    }
    setIsDirty(true);
  };

  useEffect(() => {
    
  }, [newMembers])

  return (
    <>
      <Container>
        <Label>
          Wybierz znajomych, których chcesz zaprosić do grupy:
          <SelectContainer>
            <SelectFriends
              type="friends"
              isMulti={true}
              options={friendsList}
              value={selectedFriends}
              setState={setSelectedFriends}
            />
            <AddButton icon={addIcon} onClick={addFriend} />
            {friendsError !== "" && (
              <AddError type="error">{friendsError}</AddError>
            )}
          </SelectContainer>
        </Label>
        {newMembers.length > 0 && (
          <MembersSection>
            <p>Wybrane osoby:</p>
            <AddedMembers>
              {newMembers.map((friend) => {
                if (
                  friend.id.toString() !==
                  sessionStorage.getItem("loggedUserId")
                ) {
                  return (
                    <Friend key={friend.id}>
                      <ProfilePicture
                        src={
                          friend.icon !== undefined
                            ? friend.icon
                            : noProfilePictureIcon
                        }
                        alt="Profile picture"
                      />
                      {friend.name || friend.label}
                      <DeleteIcon
                        onClick={() => deleteFriend(friend.id)}
                        src={closeIcon}
                      />
                    </Friend>
                  );
                } else {
                  return null;
                }
              })}
            </AddedMembers>
          </MembersSection>
        )}
      </Container>
      <Buttons>
        {submitMessage !== "" && <SubmitMessage>{submitMessage}</SubmitMessage>}
        {submitError !== "" && (
          <SubmitMessage type="error">{submitError}</SubmitMessage>
        )}
        <Submit
          type="submit"
          onClick={formHandler}
          disabled={!isDirty || formSubmitted ? true : false}
        >
          Dodaj
        </Submit>
        <Cancel
          onClick={clearForm}
          disabled={!isDirty || formSubmitted ? true : false}
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
  min-height: 180px;
  @media only screen and (max-width: 1220px) {
    margin: 20px 0px 0px 65px;
  }
  @media only screen and (max-width: 870px) {
    margin: 20px 0px 0px 55px;
    min-height: 150px;
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

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 25px 25px 0px;
`;

const AddButton = styled(ButtonIcon)`
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  border-radius: 25%;
  margin: 0px 15px 0px 15px;
  background-position: 50% 50%;
  background-size: 20px;
`;

const MembersSection = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.greyFont};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 18px;
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 10px;
  }
`;

const AddedMembers = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const Friend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.color.darkBackground};
  border-radius: 15px;
  color: #000;
  font-size: 16px;
  padding: 5px 10px;
  margin-top: 5px;
  margin-right: 10px;
  flex-shrink: 1;
  @media only screen and (max-width: 870px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 560px) {
    padding: 5px;
    font-size: 10px;
  }
`;

const ProfilePicture = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
  @media only screen and (max-width: 870px) {
    width: 20px;
    height: 20px;
  }
  @media only screen and (max-width: 560px) {
    width: 15px;
    height: 15px;
  }
`;

const DeleteIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 10px;
  cursor: pointer;
  @media only screen and (max-width: 870px) {
    width: 7.5px;
    height: 7.5px;
  }
  @media only screen and (max-width: 560px) {
    width: 5px;
    height: 5px;
  }
`;

const AddError = styled(StatusMessage)`
  width: 250px;
  font-size: 12px;
  @media only screen and (max-width: 870px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 800px) {
    width: 150px;
  }
  @media only screen and (max-width: 600px) {
    width: 100px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 6px;
    padding: 5px;
  }
  @media only screen and (max-width: 450px) {
    width: 50px;
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

export default Members;
