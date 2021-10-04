import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect } from 'react-router-dom';
import NewsThumbnail from "./NewsThumbnail";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import Tooltip from "../trinkets/Tooltip";
import { getDate } from "../../miscellanous/Utils";
import { routes } from "../../miscellanous/Routes";
import { newsTypes } from "../../miscellanous/Utils";
import friendsIcon from "./assets/friendsIcon.svg";
import communityIcon from "./assets/communityIcon.svg";

const Post = ({news, type}) => {

    const date = news.date;
    const [ formattedDate, setFormattedDate ] = useState("");
    const [ redirectToProfile, setRedirectToProfile ] = useState({
        active: false,
        userId: null,
    });

    useEffect(() => {
        let temp = getDate(date.split(" ")[0]);
        temp = temp.substring(0, temp.length - 5);
        setFormattedDate(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (redirectToProfile.active) {
        return <Redirect 
					push to={{
                    	pathname: routes.user.replace(/:id/i, redirectToProfile.userId), 
                    	state: { selectedUser: { selectIsTrue: true, id: redirectToProfile.userId, isHeFriend: false} }
					}}
        		/>
	}

    return (
        <Container>
            <Header>
                <ProfilePhoto 
                    src={news.personalInformationDTO.photo !== undefined ? news.personalInformationDTO.photo : noProfilePictureIcon} 
                    alt="Profile picture"
                    onError={(e) => {e.target.onError = null; e.target.src=noProfilePictureIcon;}}
                    onClick={() => setRedirectToProfile({active: true, userId: news.personalInformationDTO.id})}
                />
                <InnerContainer>
                    <Name onClick={() => setRedirectToProfile({active: true, userId: news.personalInformationDTO.id})}>
                        {news.personalInformationDTO.name + " " + news.personalInformationDTO.surName}
                    </Name>
                    <DateInfo>{formattedDate}</DateInfo>
                </InnerContainer>
                <Icon
                    data-tip
                    data-for={type === newsTypes.friends ? "friendsTip" : "commTip"} 
                    icon={type === newsTypes.friends ? friendsIcon : communityIcon}
                />
                <Tooltip id="friendsTip" place="left" text="Album należący do ciebie, bądź twojego znajomego."/>
                <Tooltip id="commTip" place="left" text="Album użytkownika aplikacji"/> 
            </Header>
            <NewsThumbnail news={news}/>
        </Container>
    )
};

const Container = styled.div`
    border-radius: 15px;
    background-color: ${({theme}) => theme.color.lightBackground};
    padding: 10px;
    display: flex;
    flex-direction: column;
    padding: 30px 25px;
    @media only screen and (max-width: 800px) {
        padding: 20px 15px;
    }
    @media only screen and (max-width: 500px) {
        padding: 15px 10px;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    @media only screen and (max-width: 800px) {
        margin-left: 7.5px;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    @media only screen and (max-width: 500px) {
        margin-bottom: 5px;
    }
`;

const Name = styled.h1`
    cursor: pointer;
    font-size: 30px;
    @media only screen and (max-width: 1100px) {
        font-size: 25px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 20px
    }
    @media only screen and (max-width: 500px) {
        font-size: 15px;
    }
`;

const DateInfo = styled.p`
    font-size: 20px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1100px) {
        font-size: 15px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 9px;
    }
`;

const ProfilePhoto = styled.img`
    cursor: pointer;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    @media only screen and (max-width: 1100px) {
        width: 60px;
        height: 60px;
    }
    @media only screen and (max-width: 800px) {
        width: 40px;
        height: 40px;
    }
    @media only screen and (max-width: 500px) {
        width: 30px;
        height: 30px;
    }
`;

const Icon = styled.div`
    width: 50px;
    height: 50px;
    background-size: 50px;
    margin-left: auto;
    background-image: url(${({icon}) => icon});
    background-repeat: no-repeat;
    background-position: 50% 50%;
    @media only screen and (max-width: 1100px) {
        width: 40px;
        height: 40px;
        background-size: 40px;
    }
    @media only screen and (max-width: 800px) {
        width: 30px;
        height: 30px;
        background-size: 30px;
    }
    @media only screen and (max-width: 500px) {
        width: 20px;
        height: 20px;
        background-size: 20px;
    }
`;


export default Post;