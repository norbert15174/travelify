import React, { useState } from "react";
import styled from "styled-components";
import Submit from "../trinkets/Submit";
import Cancel from "../trinkets/Cancel";
import FormInput from "../trinkets/FormInput";
import SelectFriends from "../trinkets/Select";
import StatusMessage from "../trinkets/StatusMessage";
import ButtonIcon from "../trinkets/ButtonIcon";
import privateAlbumIcon from "./assets/privateAlbumIcon.svg";
import publicAlbumIcon from "./assets/publicAlbumIcon.svg";
import addIcon from "./assets/addIcon.svg";
import closeIcon from "./assets/closeIcon.svg";

const options = [
    { value: 'Jan Nowak', label: 'Jan Nowak', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png", },
    { value: 'Krzysztof Nowak', label: 'Krzysztof Nowak', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png", },
    { value: 'Mateusz Nowak', label: 'Mateusz Nowak', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Mateusz Kowalski', label: 'Mateusz Kowalski', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png", },
    { value: 'Jan Kowalski', label: 'Jan Kowalski', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png", },
    { value: 'Krzysztof Kowalski', label: 'Krzysztof Kowalski', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Nobody', label: 'Nobody', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Nieznajomy', label: 'Nieznajomy', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Bezimienny', label: 'Bezimienny', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Bezimienny2', label: 'Bezimienny2', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
]

const initialDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel.`;

const visibilityType = {
    public: "public",
    private: "private",
}

const BasicInfo = ({creatorType, setForm}) => {

    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState(initialDescription);
    const [ visibility, setVisibility ] = useState(visibilityType.public);
    const [ selectedFriends, setSelectedFriends ] = useState([]);
    const [ friends, setFriends ] = useState([]);

    const [ friendsError, setFriendsError ] = useState("");
    const [ nameError, setNameError ] = useState("");
    const [ submitMessage, setSubmitMessage ] = useState("");

    const addFriend = () => {
        //console.log(selectedFriends);
        selectedFriends.map((selectedFriend) => {
            setFriendsError("");
            // for friends we should be checking id's
            if (Array.from(friends).find((element) => element.name === selectedFriend.value)) { 
                setFriendsError("Jedna z osób została już przez ciebie dodana!");
                return null;
            }
            setFriends((prevState) => [...prevState,{name: selectedFriend.value, icon: selectedFriend.icon}]);
            return "";
        })
        //console.log(friends);
        setSelectedFriends([]);
    };

    const deleteFriend = (friendToDelete) => {
        // zmienić na usuwanie po ID !!!!
        setFriends(() => friends.filter(item => item.name !== friendToDelete));
        console.log(friends);
    };

    const formHandler = () => {

        // for validation I'm only checking name field
        if ( !name ) {
            setNameError("Wymagane!");
            return;
        } else if ( name.length < 5) {
            setNameError("Nazwa albumu powinna składać się z minimum 5 znaków!");
            return;
        }

        if (creatorType === "creation") {
            setForm({
                name: name,
                description: description,
                visibility: visibility,
                friends: friends,
            })
            setSubmitMessage("Informacje zostały dodane do formularza.");
        } else if (creatorType === "edition") {
            console.log("Porównanie czy coś się zmieniło i wysyłka");
            // gdy dokonujemy edycji to bierzemy tylko te pola które zmieniliśmy
            setSubmitMessage("Zmiany zostały zapisane.");
        }
        
        clearForm();
        
    }

    const clearForm = () => {
        if (creatorType === "creation") {
            setName("");
            setDescription(initialDescription);
            setVisibility(visibilityType.public);
            setFriends([]);
        } else if (creatorType === "edition") {
            setName("initial value");
            setDescription(initialDescription);
            setVisibility(visibilityType.public);
            setFriends(["initial value"]);
        }
        setFriendsError("");
        setNameError("");
    }

    return (
        <>
            <Container>
                <Label>
                    Nazwa
                    <FormInput 
                        maxLength={60}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Label>
                { 
                    nameError !== "" ? <ErrorMessage type="error">{nameError}</ErrorMessage> 
                    : <InfoMessage type="info">Nazwa albumu jest wymagana.<br/>Powinna składać się z minimum 5 znaków.</InfoMessage> 
                }
                <Label>
                    Opis (opcjonalny)
                    <Description
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={initialDescription}
                    />
                </Label>
                <div/>
                <Label>
                    Widoczność
                    <VisibilitySwitch>
                        <VisibilityOption
                            icon={publicAlbumIcon}
                            active={visibility === visibilityType.public ? true : false } 
                            onClick={() => setVisibility(visibilityType.public)}
                        >
                            Publiczny
                        </VisibilityOption>
                        <VisibilityOption 
                            icon={privateAlbumIcon}
                            active={visibility === visibilityType.private ? true : false } 
                            onClick={() => setVisibility(visibilityType.private)}
                        >
                            Prywatny
                        </VisibilityOption>
                    </VisibilitySwitch>
                </Label>
                { 
                    visibility === visibilityType.public && <InfoMessage>Album publiczny jest w pełni widoczny dla każdego użytkownika.</InfoMessage> 
                } 
                { 
                    visibility === visibilityType.private && <InfoMessage>Album prywatny jest widoczny tylko dla ciebie.<br/>Możesz go udostępnić znajomym.</InfoMessage>  
                } 
            </Container>
            {
                visibility === visibilityType.private && 
                <SharingSection>
                    <Label>
                        Udostępnianie (opcjonalne)
                        <AddSection>
                            <SelectFriends type="friends" isMulti={true} options={options} value={selectedFriends} setState={setSelectedFriends}/>
                            <AddButton icon={addIcon} onClick={addFriend}/>
                        </AddSection>
                        { 
                            friendsError !== "" && <ErrorMessage type="error">{friendsError}</ErrorMessage>  
                        }
                    </Label>
                    <FriendsSection>
                        <p>Wybrani znajomi:</p>
                        <AddedFriends>
                            {
                                friends.length !== 0 ?
                                (
                                    friends.map((friend) => (
                                        <Friend profilePhoto={friend.icon} key={friend.name}>
                                            {friend.name}
                                            <DeleteIcon onClick={() => deleteFriend(friend.name)} src={closeIcon}/>
                                        </Friend>
                                    ))
                                ) : <Placeholder>Wybierz znajomego, by udostępnić mu album...</Placeholder>
                            }
                        </AddedFriends>   
                    </FriendsSection>                
                </SharingSection>
            }
            <Buttons>
                { submitMessage !== "" && <SubmitMessage>{submitMessage} </SubmitMessage>}
                <Submit disabled={name === "" ? true : false} type="submit" onClick={formHandler}>{ creatorType === "creation" ? "Dodaj" : "Zapisz"}</Submit>
                <Cancel disabled={name === "" ? true : false} onClick={clearForm}>Anuluj</Cancel>
            </Buttons>

        </>
    );

};

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(2, 50%);
    grid-column-gap: 15px;
    margin: 20px 0px 0px 77px;
    grid-row-gap: 25px;
`;

const Label = styled.label`
    font-size: 18px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    color: ${({theme}) => theme.color.greyFont};
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
    background-color:  ${({theme}) => theme.color.darkBackground};
    box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.3);
    text-decoration: none;
    &::placeholder {
        color: #5c5b5b;
    }
`;

const VisibilitySwitch = styled.div`
    display: flex;
    margin-top: 5px;
    flex-direction: row;
    justify-content: center;
`;

const VisibilityOption = styled.div`
    background: ${({active}) => active ? "rgba(18, 191, 206, 0.4)" : ""};
    -webkit-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
    border-radius: 15px;
    text-align: center;
    margin-left: 30px;
    padding: 10px 20px 10px 60px;
    background-image: url(${({icon}) => icon}); 
    background-size: 34px;
    background-position: 10% 50%;
    background-repeat: no-repeat;
    cursor: pointer;
`;

const SharingSection = styled.div`
    display: grid;
    min-height: 100px;
    grid-template-columns: repeat(2, 50%);
    grid-column-gap: 15px;
    margin-top: 25px;
    margin-left: 77px;
`;

const AddSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0px;
`;

const AddButton = styled(ButtonIcon)`
    width: 35px;
    height: 35px;
    border-radius: 25%;
    margin-left: 15px;
    background-position: 50% 50%;
    background-size: 50%;
`;

const FriendsSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0px;
    color: ${({theme}) => theme.color.greyFont};
    font-weight: ${({theme}) => theme.fontWeight.bold};
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
    display: inline-block;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    background-color: #E0E5E0;
    background-image: url(${({profilePhoto}) => profilePhoto});
    background-size: 25px;
    background-position: 10% 50%;
    background-repeat: no-repeat;
    border-radius: 15px;
    color: #000;
    font-size: 16px;
    padding: 10px 10px 10px 45px;
    margin-top: 5px;
    margin-right: 10px;
    flex-shrink: 1;

`;

const DeleteIcon = styled.img`
    width: 10px;
    height: 10px;
    margin-left: 10px;
    cursor: pointer;
`;

const Placeholder = styled.p`
    font-size: 12px;
    opacity: 0.8;
`;

const ErrorMessage = styled(StatusMessage)`
    font-size: 12px;
    align-self: center;
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
`;

const InfoMessage = styled(StatusMessage)`
    font-size: 12px;
    align-self: center;
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
`;

const SubmitMessage = styled(StatusMessage)`
    font-size: 12px;
    align-self: center;
    width: fit-content;
    height: fit-content;
    margin-right: 15px;
`;

const Buttons = styled.div`
    display: flex;   
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 25px;
`;

export default BasicInfo;