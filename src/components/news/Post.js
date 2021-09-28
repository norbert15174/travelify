import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect } from 'react-router-dom';
import NewsThumbnail from "./NewsThumbnail";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import { getDate } from "../../miscellanous/Utils";
import { routes } from "../../miscellanous/Routes";

const Post = ({news}) => {

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
                    onClick={() => setRedirectToProfile({active: true, userId: news.personalInformationDTO.id})}
                />
                <Name onClick={() => setRedirectToProfile({active: true, userId: news.personalInformationDTO.id})}>
                    {news.personalInformationDTO.name + " " + news.personalInformationDTO.surName}
                </Name>
                <DateInfo>Dodano {formattedDate}</DateInfo>
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

const Header = styled.div`
    cursor: pointer;
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

const DateInfo = styled.h1`
    margin-left: auto;
    margin-right: 10px;
    font-size: 24px;
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1100px) {
        font-size: 19px;
    }
    @media only screen and (max-width: 800px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 9px;
    }
`;

const ProfilePhoto = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    margin-right: 15px;
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
        margin-right: 10px;
    }
`;


export default Post;