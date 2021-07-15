import React, { useState } from "react";
import styled from "styled-components";
import InfoSection from "./InfoSection";
import GridSection from "./GridSection";
import { FriendsListArray as albumData } from "./data";
import profileBackground from "./assets/profileBackground.png";
import profilePhoto from "./assets/profilePhoto.png"
import ButtonIcon from "../trinkets/ButtonIcon";
import editIcon from "./assets/editIcon.svg";
import friendsIcon from "./assets/friendsIcon.svg";
import addFriendIcon from "./assets/addFriendIcon.svg";


const user = {
    type: "logged",
    logged: "logged",
    friend: "friend",
    unknown: "unknown"
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
                        user.type === "logged" && <TypeSpecifiedButton icon={editIcon}>Edytuj profil</TypeSpecifiedButton>
                    }
                    {
                        user.type === "friend" && <TypeSpecifiedButton icon={friendsIcon}>Znajomi</TypeSpecifiedButton>
                    }
                    {
                        user.type === "unknown" && <TypeSpecifiedButton icon={addFriendIcon}>Dodaj</TypeSpecifiedButton>
                    }
                </Options>
            </Header>
            <Container>
                {
                    infoActive && <InfoSection birthplace={infoData.birthplace} about={infoData.about} interests={infoData.interests} visitedCountries={infoData.visitedCountries}/>
                }
                {
                    albumsActive && <GridSection sectionType={types.albums} data={albumData.list}/>
                }
                {
                    friendsActive && <GridSection sectionType={types.friends} data={albumData.list}/>
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
    @media only screen and (max-width: 1080px) {
        height: 340px;
    }
    @media only screen and (max-width: 830px) {
        height: 270px;
    }
    @media only screen and (max-width: 735px) {
        height: 250px;
    }
    min-width: 305px;
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
    @media only screen and (max-width: 1440px) {
        width: 950px;
    }
    @media only screen and (max-width: 1080px) {
        width: 700px;
        height: 200px;
    }
    @media only screen and (max-width: 830px) {
        width: 600px;
        height: 150px;
    }
    @media only screen and (max-width: 735px) {
        width: 550px;
    }
    @media only screen and (max-width: 560px) {
        width: 400px;
    }
    @media only screen and (max-width: 410px) {
        width: 350px;
    }
    min-width: 350px;
`;

const ProfilePhoto = styled.img`
    position: absolute;
    height: 208px;
    width: 208px;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%); // (X, Y)
    @media only screen and (max-width: 1080px) {
        width: 150px;
        height: 150px;
        top: 67%;
    }
    @media only screen and (max-width: 830px) {
        width: 120px;
        height: 120px;
        top: 65%;
    }
    @media only screen and (max-width: 735px) {
        width: 90px;
        height: 90px;
        top: 73%;
    }
`;

const Name = styled.h1`
    margin-top: 20px;
    text-align: center;
    font-size: 40px;
    @media only screen and (max-width: 1080px) {
        font-size: 30px;
    }
    @media only screen and (max-width: 735px) {
        font-size: 25px;
        margin-top: 10px;
    }
`;

const Line = styled.div`
    border: 1px solid ${({theme}) => theme.color.darkTurquise};
    width: 1250px;
    margin: 0 auto;
    @media only screen and (max-width: 1440px) {
        width: 900px;
    }
    @media only screen and (max-width: 1080px) {
        width: 600px;
    }
    @media only screen and (max-width: 830px) {
        width: 550px
    }
    @media only screen and (max-width: 735px) {
        width: 500px;
    }
    @media only screen and (max-width: 560px) {
        width: 350px;
    }
    @media only screen and (max-width: 410px) {
        width: 300px;
    }
    min-width: 300px;
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
    @media only screen and (max-width: 1440px) {
        width: 900px;
    }
    @media only screen and (max-width: 1080px) {
        grid-template-columns: 140px repeat(2, 100px) 1fr;
        width: 600px;
        font-size: 14px;
    }
    @media only screen and (max-width: 830px) {
        width: 550px;
        grid-template-columns: repeat(3, 80px) 1fr;
        font-size: 10px;
        margin-top: 2px;
    }
    @media only screen and (max-width: 735px) {
        width: 500px;
    }
    @media only screen and (max-width: 560px) {
        width: 350px;
        grid-template-columns: repeat(3, 50px) 1fr;
        font-size: 8px;
    }
    @media only screen and (max-width: 410px) {
        width: 300px;
    }
    min-width: 300px;
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


const TypeSpecifiedButton = styled(ButtonIcon)`
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
    @media only screen and (max-width: 1080px) {
        width: 130px;
        height: 30px;
        font-size: 14px;  
    }
    @media only screen and (max-width: 830px) {
        width: 110px;
        height: 20px;
        padding-left: 15px;
        font-size: 10px;
    }
    @media only screen and (max-width: 560px) {
        width: 70px;
        font-size: 8px;
    }
`;



const Container = styled.div`
    margin: 0 auto;
    width: 1250px;
    @media only screen and (max-width: 1440px) {
        width: 900px;
    }
    @media only screen and (max-width: 1080px) {
        width: 600px;
    }
    @media only screen and (max-width: 830px) {
        width: 550px;
    }
    @media only screen and (max-width: 735px) {
        width: 500px;
    }
    @media only screen and (max-width: 560px) {
        width: 350px;
    }
    @media only screen and (max-width: 410px) {
        width: 300px;
    }
    min-width: 300px;
`;

export default UserPage;