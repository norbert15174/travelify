import React, { useState } from "react";
import styled from "styled-components";
import Info from "./Info";
import Albums from "./Albums";
import { FriendsListArray as albumData } from "./data";
import profileBackground from "./assets/profileBackground.png";
import profilePhoto from "./assets/profilePhoto.png"
import ButtonIcon from "../trinkets/ButtonIcon";
import editIcon from "./assets/editIcon.svg";
import friendsIcon from "./assets/friendsIcon.svg";
import addFriendIcon from "./assets/addFriendIcon.svg";

const user = {
    type: "logged", // logged, friend, unknown
}

const types = {
    info: "info",
    albums: "albums",
    friends: "friends",  
};

const infoData = {
    birthplace: "Poland",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. 
    Donec vestibulum, lorem vitae condimentum tristique, neque sem gravida risus, in vulputate sapien est ut sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. 
    Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae.`,
    interests: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. 
    Donec vestibulum, lorem vitae condimentum tristique, neque sem gravida risus, in vulputate sapien est ut sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. 
    Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. Donec vestibulum, lorem vitae condimentum tristique, neque sem gravida risus, in vulputate sapien est ut sapien. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis tincidunt risus, non tempor nunc mattis vel. Pellentesque tincidunt vestibulum elit, eget elementum dolor consectetur vitae. 
    Donec vestibulum, lorem vitae condimentum tristique, neque sem gravida risus, in vulputate sapien est ut sapien.`,
    visitedCountries: ["Poland", "Ukraine", "Czech", "Slovakia", "Germany", "Belarus", "Lithuania", "Latvia"],
}

const UserPage = () => {

    const [ infoActive, setInfoActive ] = useState(false);
    const [ albumsActive, setAlbumsActive ] = useState(true);
    const [ friendsActive, setFriendsActive ] = useState(false); 

    const sectionsToggle = (sectionName) => {
        if (sectionName === types.albums) {
            setAlbumsActive(true);
            setFriendsActive(false);
        } else if ( sectionName === types.friends) {
            setAlbumsActive(false);
            setFriendsActive(true);
            setInfoActive(false);
        } else if ( sectionName === types.info) {
            if ( friendsActive ) {
                setAlbumsActive(true);
                setFriendsActive(false);
                setInfoActive(true);
            } else {
                setInfoActive(!infoActive);
            }
        }
    };

    return (
        <>
            <Header>
                <Images>
                    <BackgroundImage src={profileBackground} alt="Profile background photo"/>
                    <ProfilePhoto src={profilePhoto} alt="Profile photo"/>
                </Images> 
                <Name>Jan Nowak</Name>
                <Line/>
                <Options>
                    <Button onClick={() => sectionsToggle(types.info)}>Informacje o użytkowniku</Button>
                    <Button onClick={() => sectionsToggle(types.albums)}>Albumy</Button>
                    <Button onClick={() => sectionsToggle(types.friends)}>Znajomi</Button>
                    {
                        user.type === "logged" && <UserButton icon={editIcon}>Edytuj profil</UserButton>
                    }
                    {
                        user.type === "friend" && <UserButton icon={friendsIcon}>Znajomi</UserButton>
                    }
                    {
                        user.type === "unknown" && <UserButton icon={addFriendIcon}>Dodaj</UserButton>
                    }
                    
                </Options>
            </Header>
            <Container>
                {
                    infoActive && <Info birthplace={infoData.birthplace} about={infoData.about} interests={infoData.interests} visitedCountries={infoData.visitedCountries}/>
                }
                {
                    albumsActive && <Albums albumData={albumData}/>
                }
                {
                    friendsActive && <h1>Znajomi</h1>
                }
            </Container>   
        </>
    );

};

const Header = styled.div`
    width: 100%;
    height: 410px;
    background-color: ${({theme}) => theme.color.lightBackground};
    margin-bottom: 15px;
`;

const Images = styled.div`
    position: relative;
`;

const BackgroundImage = styled.img`
    height: 250px;
    width: 1300px;
    display: block;
    margin: 0 auto;
    border-left: 2px solid ${({theme}) => theme.color.darkTurquise};
    border-right: 2px solid ${({theme}) => theme.color.darkTurquise};
    border-bottom: 2px solid ${({theme}) => theme.color.darkTurquise};
    
`;

const ProfilePhoto = styled.img`
    position: absolute;
    height: 208px;
    width: 208px;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%); // (X, Y)
`;

const Name = styled.h1`
    margin-top: 20px;
    text-align: center;
    font-size: 40px;
`;

const Line = styled.div`
    border: 1px solid ${({theme}) => theme.color.darkTurquise};
    width: 1250px;
    margin: 0 auto;
`;

const Options = styled.div`
    width: 1250px;
    margin: 0 auto;
    margin-top: 5px;
    display: grid;
    grid-template-columns: 195px repeat(2, 100px) 1fr;
    align-items: baseline;
    font-size: 18px;
    color: ${({theme}) => theme.color.greyFont};
    font-weight: ${({theme}) => theme.fontWeight.medium};
    
`;

const Button = styled.div`
    cursor: pointer;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    &:hover {
        background-color: rgba(18, 191, 206, 0.4);
        -webkit-transition: all 0.15s ease-in-out;
        -o-transition: all 0.15s ease-in-out;
        -moz-transition: all 0.15s ease-in-out;
        transition: all 0.15s ease-in-out;
    }
`;


const UserButton = styled(ButtonIcon)`
    width: 160px;
    height: 39px;
    border-radius: 5px;
    margin: 0;
    justify-self: end;
    color: ${({theme}) => theme.color.lightBackground};
    font-size: 18px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    padding-left: 25px;
    background-image: url(${({icon}) => icon});
    background-position: 8% 50%;
    background-size: 15%;
`;



const Container = styled.div`
    margin: 0 auto;
    width: 1250px;
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-row-gap: 15px;
`;

export default UserPage;