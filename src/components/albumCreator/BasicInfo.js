import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasicInfo,
  setSharedPersonList,
  setBasicInfo,
} from "../../redux/albumCreatorSlice";
import { selectFriendsList } from "../../redux/userDataSlice";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import FormInput from "../trinkets/FormInput";
import SelectFriends from "../trinkets/Select";
import StatusMessage from "../trinkets/StatusMessage";
import ButtonIcon from "../trinkets/ButtonIcon";
import privateAlbumIcon from "./assets/privateAlbumIcon.svg";
import publicAlbumIcon from "./assets/publicAlbumIcon.svg";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import addIcon from "./assets/addIcon.svg";
import closeIcon from "./assets/closeIcon.svg";
import { albumTypes, mapFriendsToSelect } from "../../miscellanous/Utils";
import { albumCreator } from "../../miscellanous/Utils";
import { endpoints } from "../../miscellanous/url";
import axios from "axios";

const BasicInfo = ({ editedAlbumId, creatorType, setForm }) => {
  
  const dispatch = useDispatch();
  const basicInfo = useSelector(selectBasicInfo);
  const loggedUserFriendsList = useSelector(selectFriendsList);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(albumTypes.public);
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [sharedFriends, setSharedFriends] = useState([]);

  const [firstRun, setFirstRun] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [friendsError, setFriendsError] = useState("");
  const [infoError, setInfoError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [error, setError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [shareDeleteFinished, setShareDeleteFinished] = useState(false);
  const [sharesToDelete, setSharesToDelete] = useState([]); // share id's
  const [shareAddFinished, setShareAddFinished] = useState(false);
  const [sharesToAdd, setSharesToAdd] = useState([]); // user id's
  const [infoEditFinished, setInfoEditFinished] = useState(false);

  useEffect(() => {
    if (firstRun) {
      setFriendsList(mapFriendsToSelect(loggedUserFriendsList));
      if (creatorType === albumCreator.creation) {
        setName("");
        setDescription("");
        setVisibility(albumTypes.public);
        setSharedFriends([]);
      } else if (creatorType === albumCreator.edition) {
        setName(basicInfo.name);
        setDescription(basicInfo.description);
        if (basicInfo.public) {
          setVisibility(albumTypes.public);
        } else {
          setVisibility(albumTypes.private);
        }
        setSharedFriends(basicInfo.sharedPersonList);
      }
      setFirstRun(false);
    }
    if (
      creatorType === albumCreator.edition &&
      shareAddFinished &&
      shareDeleteFinished &&
      infoEditFinished
    ) {
      if (error) {
        setSubmitMessage("");
        setSubmitError("Coś poszło nie tak... spróbuj ponownie");
        setError(false);
      } else {
        setSubmitMessage("Zmiany zostały zapisane");
        dispatch(setSharedPersonList(sharedFriends));
        setShareAddFinished(false);
        setShareDeleteFinished(false);
        setInfoEditFinished(false);
        setIsDirty(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareAddFinished, shareDeleteFinished, infoEditFinished]);

  const addFriend = () => {
    selectedFriends.map((selectedFriend) => {
      setFriendsError("");
      if (
        Array.from(sharedFriends).find(
          (element) => element.userId === selectedFriend.id
        )
      ) {
        setFriendsError("Jedna z osób została już przez ciebie dodana!");
        return null;
      }
      setSharedFriends((prevState) => [
        ...prevState,
        {
          name: selectedFriend.value,
          icon: selectedFriend.icon,
          id: selectedFriend.id,
        },
      ]);
      setSharesToAdd((prevState) => [...prevState, selectedFriend.id]);
      return "";
    });
    if (creatorType === albumCreator.creation && formSubmitted) {
      setSubmitMessage("");
      setFormSubmitted(false);
    }
    if (creatorType === albumCreator.edition) {
      setSubmitError("");
      setSubmitMessage("");
      setIsDirty(true);
    }
    setSelectedFriends([]);
  };

  const deleteFriend = (friendToDelete) => {
    setSharedFriends(() =>
      sharedFriends.filter((item) => item.id !== friendToDelete)
    );
    if (creatorType === albumCreator.creation && formSubmitted) {
      setSubmitMessage("");
      setFormSubmitted(false);
    }
    if (friendsError) {
      setFriendsError("");
    }
    if (creatorType === albumCreator.edition) {
      setSharesToDelete((prevState) => [...prevState, friendToDelete]);
      setSubmitError("");
      setSubmitMessage("");
      setIsDirty(true);
    }
  };

  const formHandler = () => {
    setFriendsError("");
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
    if (creatorType === albumCreator.creation) {
      setForm({
        name: name.trim(),
        description: description.trim(),
        visibility: visibility,
        shared: sharedFriends,
      });
      setSubmitMessage("Informacje zostały dodane do formularza.");
      setFormSubmitted(true);
    } else if (creatorType === albumCreator.edition) {
      setSubmitMessage("Zapisywanie...");
      let isPublic = visibility === albumTypes.public ? true : false;
      if (
        sharesToDelete.length !== 0 ||
        (isPublic && sharedFriends.length !== 0)
      ) {
        // we post if there was a change
        deleteAlbumShare(isPublic);
      } else {
        // no change
        setShareDeleteFinished(true);
      }
      if (sharesToAdd.length !== 0) {
        shareAlbum();
      } else {
        setShareAddFinished(true);
      }
      if (
        name !== basicInfo.name ||
        description !== basicInfo.description ||
        isPublic !== basicInfo.public
      ) {
        editBasicInfo(isPublic);
      } else {
        setInfoEditFinished(true);
      }
    }
  };

  async function shareAlbum() {
    await axios({
      method: "post",
      url: endpoints.shareAlbumWithUser + editedAlbumId,
      data: sharesToAdd,
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
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setShareAddFinished(true);
      });
  }

  async function deleteAlbumShare(isPublic) {
    let temp = sharesToDelete;
    if (isPublic) {
      temp = basicInfo.sharedPersonList.map((item) => item.id);
    }
    await axios({
      method: "delete",
      url: endpoints.deleteShare,
      data: temp,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "delete",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {
        setShareAddFinished(true);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setShareDeleteFinished(true);
      });
  }

  async function editBasicInfo(isPublic) {
    await axios({
      method: "put",
      url: endpoints.editAlbum + editedAlbumId,
      data: {
        name: name.trim(),
        description: description.trim(),
        public: isPublic,
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
            public: isPublic,
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

  const clearForm = () => {
    if (creatorType === albumCreator.creation) {
      setName("");
      setDescription("");
      setVisibility(albumTypes.public);
      setSharedFriends([]);
      setForm({
        name: "",
        description: "",
        visibility: "",
        friends: "",
      });
    } else if (creatorType === albumCreator.edition) {
      setName(basicInfo.name);
      setDescription(basicInfo.description);
      if (basicInfo.public) {
        setVisibility(albumTypes.public);
      } else {
        setVisibility(albumTypes.private);
      }
      setSharedFriends(basicInfo.sharedPersonList);
    }
    setFriendsError("");
    setInfoError("");
    setSubmitError("");
    setSubmitMessage("");
    setFormSubmitted(false);
    setError(false);
    setInfoError("");
    setSharesToDelete([]);
    setSharesToAdd([]);
    setIsDirty(false);
  };

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
              if (
                creatorType === albumCreator.edition &&
                e.target.value !== basicInfo.name
              ) {
                setIsDirty(true);
              }
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
              if (
                creatorType === albumCreator.edition &&
                e.target.value !== basicInfo.description
              ) {
                setIsDirty(true);
              }
            }}
            placeholder="Dodaj opis albumu..."
            maxLength={800}
          />
        </Label>
        <Label>
          Widoczność
          <VisibilitySwitch>
            <VisibilityOption
              icon={publicAlbumIcon}
              active={visibility === albumTypes.public ? true : false}
              onClick={() => {
                if (formSubmitted) {
                  setFormSubmitted(false);
                }
                setFriendsError("");
                setSubmitMessage("");
                setSharedFriends([]);
                setVisibility(albumTypes.public);
                if (albumCreator.edition) {
                  setSharedFriends(basicInfo.sharedPersonList);
                  if (!basicInfo.public) {
                    setIsDirty(true);
                  }
                }
              }}
            >
              Publiczny
            </VisibilityOption>
            <VisibilityOption
              icon={privateAlbumIcon}
              active={visibility === albumTypes.private ? true : false}
              onClick={() => {
                if (albumCreator.edition) {
                  setSharedFriends(basicInfo.sharedPersonList);
                  if (basicInfo.public) {
                    setIsDirty(true);
                  }
                }
                if (formSubmitted) {
                  setFormSubmitted(false);
                }
                setSubmitMessage("");
                setVisibility(albumTypes.private);
              }}
            >
              Prywatny
            </VisibilityOption>
          </VisibilitySwitch>
        </Label>
      </Container>
      {visibility === albumTypes.private && (
        <SharingSection>
          <Label>
            Udostępnianie (opcjonalne)
            <AddSection>
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
            </AddSection>
          </Label>
          <FriendsSection>
            <p>Wybrani znajomi:</p>
            <AddedFriends>
              {sharedFriends.length !== 0 ? (
                sharedFriends.map((friend) => (
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
                ))
              ) : (
                <Placeholder>
                  Wybierz znajomego, by udostępnić mu album...
                </Placeholder>
              )}
            </AddedFriends>
          </FriendsSection>
        </SharingSection>
      )}
      <Buttons>
        {submitMessage !== "" && <SubmitMessage>{submitMessage}</SubmitMessage>}
        {submitError !== "" && (
          <SubmitMessage type="error">{submitError}</SubmitMessage>
        )}
        <Submit
          disabled={
            creatorType === albumCreator.creation
              ? !name || !description || formSubmitted
                ? true
                : false
              : !isDirty
          }
          type="submit"
          onClick={formHandler}
        >
          {creatorType === albumCreator.creation ? "Dodaj" : "Zapisz"}
        </Submit>
        <Cancel
          disabled={
            creatorType === albumCreator.creation
              ? (!name && !description) || formSubmitted
                ? true
                : false
              : !isDirty
          }
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
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 50%;
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

const VisibilitySwitch = styled.div`
  position: relative;
  display: flex;
  margin-top: 5px;
  flex-direction: row;
  justify-content: center;
`;

const VisibilityOption = styled.div`
  background: ${({ active }) => (active ? "rgba(18, 191, 206, 0.4)" : "")};
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border-radius: 15px;
  text-align: center;
  margin-left: 30px;
  padding: 10px 20px 10px 60px;
  background-image: url(${({ icon }) => icon});
  background-size: 34px;
  background-position: 10% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  @media only screen and (max-width: 980px) {
    background-size: 27px;
    padding: 10px 20px 10px 40px;
    margin-left: 15px;
  }
  @media only screen and (max-width: 900px) {
    background-size: 20px;
    padding: 10px 20px 10px 35px;
    margin-left: 10px;
  }
`;

const SharingSection = styled.div`
  display: grid;
  min-height: 100px;
  grid-template-columns: repeat(2, 50%);
  grid-column-gap: 15px;
  margin: 20px 0px 0px 77px;
  @media only screen and (max-width: 1220px) {
    margin: 20px 0px 0px 65px;
  }
  @media only screen and (max-width: 870px) {
    margin: 20px 0px 0px 55px;
  }
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
  @media only screen and (max-width: 560px) {
    margin: 15px 0px 0px 40px;
  }
  @media only screen and (max-width: 480px) {
    margin: 15px 0px 0px 15px;
  }
`;

const AddSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
`;

const AddButton = styled(ButtonIcon)`
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  border-radius: 25%;
  margin: 0px 15px 0px 15px;
  background-position: 50% 50%;
  background-size: 20px;
  @media only screen and (max-width: 560px) {
    width: 20px;
    height: 20px;
    background-size: 10px;
    margin: 0px 0px 0px 5px;
  }
`;

const FriendsSection = styled.div`
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

const AddedFriends = styled.div`
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

const Placeholder = styled.p`
  font-size: 12px;
  opacity: 0.8;
  @media only screen and (max-width: 870px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 560px) {
    font-size: 8px;
  }
`;

const AddError = styled(StatusMessage)`
  position: absolute;
  width: 250px;
  font-size: 12px;
  top: 120%;
  @media only screen and (max-width: 870px) {
    font-size: 10px;
  }
  @media only screen and (max-width: 800px) {
    width: 150px;
    top: 0%;
    left: 60%;
  }
  @media only screen and (max-width: 600px) {
    width: 100px;
    left: 65%;
  }
  @media only screen and (max-width: 560px) {
    top: 15%;
    font-size: 6px;
    padding: 5px;
    margin-left: 10px;
  }
  @media only screen and (max-width: 450px) {
    width: 50px;
    margin-left: 50px;
  }
`;

const NameError = styled(StatusMessage)`
  position: absolute;
  font-size: 12px;
  margin-left: 40%;
  @media only screen and (max-width: 1070px) {
    width: 150px;
    padding: 5px 10px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 10px;
    margin-left: 35%;
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
  margin-left: 40%;
  @media only screen and (max-width: 1070px) {
    width: 150px;
    padding: 5px 10px;
  }
  @media only screen and (max-width: 870px) {
    font-size: 10px;
    margin-left: 35%;
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

export default BasicInfo;
