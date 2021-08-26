import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router-dom";
import InfoSection from "./InfoSection";
import GridSection from "./GridSection";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import noBackgroundPicture from "../../assets/noBackgroundPicture.png"
import ButtonIcon from "../trinkets/ButtonIcon";
import editIcon from "./assets/editIcon.svg";
import friendsIcon from "./assets/friendsIcon.svg";
import addFriendIcon from "./assets/addFriendIcon.svg";
import { routes } from "../../miscellanous/Routes";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationBox from "../trinkets/ConfirmationBox";
import { setFriendToDeleteId, selectFriendToDeleteId } from "../../redux/deleteFriendSlice";
import { userTypes } from "../../miscellanous/Utils";
import { endpoints } from "../../url";

const sections = {
    info: "info",
    albums: "albums",
    friends: "friends",  
};

const UserPage = ({personalData, individualAlbums, friendsList, setFriendsList, userType, userId}) => {

    const [ infoActive, setInfoActive ] = useState(false);
    const [ albumsActive, setAlbumsActive ] = useState(true);
    const [ friendsActive, setFriendsActive ] = useState(false);

    const blurState = useSelector((state) => state.blur.value);
    // id of friend we want to delete
    const friendId = useSelector(selectFriendToDeleteId);
    const dispatch = useDispatch();   

    // box for deleting friend
    const [ deleteFriendBox, setDeleteFriendBox ] = useState(false);
    const [ deleteSend, setDeleteSend ] = useState(false);
    const [ errorAtDeletion, setErrorAtDeletion ] = useState(null);
    // box for inviting user
    const [ inviteBox, setInviteBox ] = useState(false);
    const [ invitationSend, setInvitationSend ] = useState(false);
    const [ errorAtInvitation, setErrorAtInvitation ] = useState(null);

    const [ confirm , setConfirm ] = useState(false);
    const [ refuse, setRefuse ] = useState(false);


    useEffect(() => {

            if (friendId !== null && userType === userTypes.logged) {
                setDeleteFriendBox(true);
                // when deleting friend was confirmed
                if (confirm) {
                    
                    console.log("Friend with id " + friendId + " has been deleted");
                    deleteFriend(friendId);
    
                    //dispatch(setFriendToDeleteId(null));
                    //setDeleteFriendBox(false);
                    //setConfirm(false);
                } 
                // when deleting friend was canceled
                if (refuse) {
                    console.log("Deleting friend with id " + friendId + " has been canceled");
                    dispatch(setFriendToDeleteId(null));
                    setDeleteFriendBox(false);
                    setRefuse(false);
                }
            }
            
            if (inviteBox  && userType === userTypes.unknown) {
                if (confirm) {
                    console.log("Invitation has been sent to user with id " + userId);
                    sendInvitation(userId);
                }
                if (refuse) {
                    console.log("Invitation hasn't been sent to user with id " + userId);
                    setInvitationSend(false);
                    setInviteBox(false);
                    setRefuse(false);
                }
            }


    }, [deleteFriendBox, friendId, confirm, refuse, dispatch, userType, inviteBox, userId]);

    async function sendInvitation(id) {
        setInvitationSend(false);
        setErrorAtInvitation(null);
		await axios({
			method: "post",
			url: "http://localhost:8020/friends?id=" + id,
			headers: {
				"Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
                
			},
		})
		.then((response) => {
            console.log(response)
		})
		.catch((error) => {
            console.log(error);
            setErrorAtInvitation(error);
		})
        .finally(() => {
            setInvitationSend(true);
            setInviteBox(false);
            setConfirm(false);
        })
    }

    async function deleteFriend(id) {
        setDeleteSend(false);
        // "http://localhost:8020/friends/delete/"
        setErrorAtDeletion(null);

        /*
             await axios.post(url, data, {
            headers: {
				"Content-Type": "multipart/form-data",
				'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
        }).

        await axios.post({
			method: "DELETE",
			url: `http://localhost:8020/friends/delete/` + id,
			headers: {
                //crossdomain: true,
                //crossorigin: true,
                //"Access-Control-Allow-Origin": "true",
                "Access-Control-Allow-Headers": "*",
                //"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
				"Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
                //withCredentials: true,
                //credentials: 'same-origin',
			},
		})
        */
		await axios.delete("http://localhost:8020/friends/delete/" + id, {
            headers: {
				
				//crossdomain: true,
                //crossorigin: true,
                //"Access-Control-Allow-Origin": "true",
                "Access-Control-Allow-Headers": "*",
                //"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
				"Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
                //withCredentials: true,
                //credentials: 'same-origin',

			},
        })
		.then((response) => {
            console.log(response)
		})
		.catch((error) => {
            console.log(error);
            setErrorAtDeletion(error);
		})
        .finally(() => {
            dispatch(setFriendToDeleteId(null));
            setDeleteFriendBox(false);
            setConfirm(false);
        })
    }

    /*
         header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, post, get');
        header("Access-Control-Max-Age", "3600");
        header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        header("Access-Control-Allow-Credentials", "true");
    */

    // redirects to edit profile page
    const [ redirect, setRedirect ] = useState(false);

    const sectionsToggle = (sectionName) => {
        /*if (sectionName === sections.albums) {
            setAlbumsActive(true);
            setFriendsActive(false);
        } else if ( sectionName === sections.friends) {
            setAlbumsActive(false);
            setFriendsActive(true);
            setInfoActive(false);
        } else if ( sectionName === sections.info) {
            if ( friendsActive ) {
                setAlbumsActive(true);
                setFriendsActive(false);
                setInfoActive(true);
            } else {
                setInfoActive(!infoActive);
            }
        }*/
        if (sectionName === sections.albums) {
            setAlbumsActive(true);
            setFriendsActive(false);
        } else if ( sectionName === sections.friends) {
            setAlbumsActive(false);
            setFriendsActive(true);
        } else if ( sectionName === sections.info) {
            setInfoActive(!infoActive);
        }
    };

    if (redirect) {
        return <Redirect push to={{pathname: routes.editProfile}}/>
    }

    return (
        <>
            {deleteFriendBox && userType === userTypes.logged && <ConfirmationBox children={"Czy na pewno chcesz usunąć daną osobę ze znajomych?"} confirm={setConfirm} refuse={setRefuse}/>}
            {inviteBox && userType === userTypes.unknown && <ConfirmationBox children={"Czy na pewno chcesz zaprosić daną osobę do znajomych?"} confirm={setConfirm} refuse={setRefuse}/>}
            <Container blurState={blurState}>
                <Header>
                    <Images>
                        <ProfileBackground src={personalData.backgroundPicture !== undefined ? personalData.backgroundPicture : noBackgroundPicture} alt="Profile background"/>
                        <ProfilePhoto src={personalData.profilePicture !== undefined ? personalData.profilePicture : noProfilePictureIcon} alt="Profile photo"/>
                    </Images> 
                    <Name>{personalData.firstName + " " + personalData.surName}</Name>
                    <Line/>
                    <Options>
                        <Button onClick={() => sectionsToggle(sections.info)}>Informacje o użytkowniku</Button>
                        <Button onClick={() => sectionsToggle(sections.albums)}>Albumy</Button>
                        <Button onClick={() => sectionsToggle(sections.friends)}>Znajomi</Button>
                        {
                            userType === userTypes.logged && <UserButton icon={editIcon} onClick={() => setRedirect(true)}>Edytuj profil</UserButton>
                        }
                        {
                            userType === userTypes.friend && <UserButton disabled icon={friendsIcon}>Znajomi</UserButton>
                        }
                        {
                            userType === userTypes.unknown && !invitationSend && <UserButton icon={addFriendIcon} onClick={() => setInviteBox(true)}>Dodaj</UserButton>
                        }
                        {
                            userType === userTypes.unknown && invitationSend && errorAtInvitation === null && <StyledDiv>Zaproszenie wysłane!</StyledDiv>
                        }
                    </Options>
                </Header>
                <InnerContainer>
                    {
                        infoActive && 
                            <InfoSection 
                                nationality={personalData.nationality} 
                                about={personalData.personalDescription.about} 
                                interests={personalData.personalDescription.interest} 
                                visitedCountries={personalData.personalDescription.visitedCountries}
                            />
                    }
                    {
                        albumsActive && <GridSection userType={userType} sectionType={sections.albums} data={individualAlbums}/>
                    }
                    {
                        friendsActive && <GridSection userType={userType} sectionType={sections.friends} data={friendsList}/>
                    }
                </InnerContainer>
            </Container>
        </>        
    );

};

const Container = styled.div`
    filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" };
    -webkit-filter: ${({blurState}) => blurState === true ? "blur(15px)" : "none" }; 
`;

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
    min-width: 360px;
`;

const Images = styled.div`
    position: relative;
`;

const ProfileBackground = styled.img`
    height: 250px;
    width: 1300px;
    object-fit: cover;
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
    border-radius: 50%;
    border: 3px solid ${({theme}) => theme.color.lightTurquise};
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
    border-top: 2px solid ${({theme}) => theme.color.darkTurquise};
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
    grid-template-columns: 250px repeat(2, 100px) 1fr;
    align-items: baseline;
    font-size: 18px;
    color: ${({theme}) => theme.color.greyFont};
    font-weight: ${({theme}) => theme.fontWeight.medium};
    @media only screen and (max-width: 1440px) {
        width: 900px;
    }
    @media only screen and (max-width: 1080px) {
        grid-template-columns: 180px repeat(2, 100px) 1fr;
        width: 600px;
        font-size: 14px;
    }
    @media only screen and (max-width: 830px) {
        width: 550px;
        grid-template-columns: 130px repeat(2, 80px) 1fr;
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
    &:hover, &:focus {
        background-color: ${({theme}) => theme.color.lightTurquise};
    }
`;

const StyledDiv = styled.div`
    width: 170px;
    height: 39px;
    border-radius: 5px;
    margin: 0;
    justify-self: end;
    color: ${({theme}) => theme.color.lightBackground};
    font-size: 18px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    background-color: ${({theme}) => theme.color.darkTurquise};
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 1080px) {
        width: 130px;
        height: 30px;
        font-size: 14px;  
    }
    @media only screen and (max-width: 830px) {
        width: 110px;
        height: 20px;
        font-size: 10px;
    }
    @media only screen and (max-width: 560px) {
        width: 80px;
        font-size: 8px;
    }
    &:hover, &:focus {
        background-color: ${({theme}) => theme.color.lightTurquise};
    }
`;

const InnerContainer = styled.div`
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
        margin: 0 auto;
    }
    min-width: 300px;
    margin-bottom: 15px;
`;

export default UserPage;