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

     // data will be passed from above

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

        setFriendsError("");
        setNameError("");
        setSubmitMessage("");

        // for validation I'm only checking name field
        if ( !name ) {
            setNameError("Wymagane!");
            return;
        } else if ( name.length < 5) {
            setSubmitMessage("Popraw występujące błędy!");
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
            // gdy dokonujemy edycji to bierzemy tylko te pola które zmieniliśmy
            setSubmitMessage("Zmiany zostały zapisane.");
        }
        
        console.log("BasicInfo form submitted!");

        //clearForm();
        
    };

    const clearForm = () => {
        if (creatorType === "creation") {
            setName("");
            setDescription(initialDescription);
            setVisibility(visibilityType.public);
            setFriends([]);
        } else if (creatorType === "edition") {
            // initial value
            setName("");
            setDescription(initialDescription);
            setVisibility(visibilityType.public);
            // initial value
            setFriends([]);
        }
        setFriendsError("");
        setNameError("");
        setSubmitMessage("");

        console.log("BasicInfo form cleared!");

    };

    return (
        <>
            <Container>
                <Label>
                    Nazwa
                    { 
                        nameError !== "" ? <NameError type="error">{nameError}</NameError> 
                        : <NameInfo type="info">Nazwa albumu jest wymagana.<br/>Powinna składać się z minimum 5 znaków.</NameInfo> 
                    }
                    <FormInput 
                        maxLength={60}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Label>   
                <Label>
                    Opis (opcjonalny)
                    <Description
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={initialDescription}
                    />
                </Label>
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

            </Container>
            {
                visibility === visibilityType.private && 
                <SharingSection>
                    <Label>
                        Udostępnianie (opcjonalne)
                        <AddSection>
                            <SelectFriends type="friends" isMulti={true} options={options} value={selectedFriends} setState={setSelectedFriends}/>
                            <AddButton icon={addIcon} onClick={addFriend}/>
                            { friendsError !== "" && <AddError type="error">{friendsError}</AddError> }
                        </AddSection>
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
    display: flex;
    flex-direction: row;
    align-items: center;
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
    @media only screen and (max-width: 870px) {
        background-size: 20px;
        padding: 8px 8px 8px 35px;
        font-size: 12px;
    }
    @media only screen and (max-width: 560px) {
        background-size: 15px;
        background-position: 10% 48%;
        padding: 5px 5px 5px 30px;
        font-size: 10px;
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
    @media only screen and (max-width: 1080px) {
        width: 200px;
    }
    @media only screen and (max-width: 870px) {
        font-size: 10px;
        margin-left: 38%;
    }
    @media only screen and (max-width: 770px) {
        width: 100px;
        margin-top: -2%;
    }
    @media only screen and (max-width: 720px) {
        margin-top: -2%;
        margin-left: 45%;
    }
    @media only screen and (max-width: 620px) {
        width: 100px;
    }
    @media only screen and (max-width: 560px) {
        font-size: 6px;
        padding: 5px;
        margin-left: 50%;
    }
`;

const NameInfo = styled(StatusMessage)`
    position: absolute;
    font-size: 12px;
    margin-left: 40%;
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
        font-size: 6px;
        width: auto;
        padding: 5px;
        margin-left: 50%;
    }
    @media only screen and (max-width: 400px) {
        display: none;
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