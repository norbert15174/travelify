import React from "react";
import styled from "styled-components";
import profilePhoto from  "../albums/assets/profilePhoto.png";

const SideSection = () => {

    return (
        <Container>
            <Header>
                <OwnerPhoto src={profilePhoto}/>
                <span>
                    <a href={link}>Mikołaj Telec </a> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat.  
                </span>
            </Header>
            <Line/>
            <CommentsSection>
           
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Krzysztof Nowak </a>
                        Super zdjęcie! :D
                    </span>
                </CommentContainer>
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Magda Elk </a>
                        Piękne zdjęcie! Jak było? Na pewno też kiedyś tam pojadę :D :D :D
                    </span>
                </CommentContainer>   
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Krzysztof Novak </a>
                        Chyba w twoich snach! xDD
                    </span>
                </CommentContainer>   
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Mikołaj Telec </a>
                        Spokój w komentarzach, bo bany polecą :D. A tak serio to naprawdę warto się wybrać w to miejsce.
                    </span>
                </CommentContainer>   
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Magda Elk </a>
                        Napiszę do ciebie na priv to pogadamy :) Opowiesz mi jak najlepiej przygotować się do takiej wycieczki.
                    </span>
                </CommentContainer>   
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Mikołaj Telec </a>
                        Jasne :D czekam na wiadomość. 
                    </span>
                </CommentContainer>
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Mikołaj Telec </a>
                        Jasne :D czekam na wiadomość. 
                    </span>
                </CommentContainer>
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Mikołaj Telec </a>
                        Jasne :D czekam na wiadomość. 
                    </span>
                </CommentContainer>
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Mikołaj Telec </a>
                        Jasne :D czekam na wiadomość. 
                    </span>
                </CommentContainer>
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Mikołaj Telec </a>
                        Jasne :D czekam na wiadomość. 
                    </span>
                </CommentContainer>
                <CommentContainer>
                    <UserPhoto src={profilePhoto}/>
                    <span>
                        <a href={link}>Mikołaj Telec </a>
                        Jasne :D czekam na wiadomość. 
                    </span>
                </CommentContainer>
            </CommentsSection>
            <Box>
                <Line/>  
            </Box>
        </Container>
    );

};

const Container = styled.div`
    padding: 30px 25px 10px 25px;
    background-color: ${({theme}) => theme.color.lightBackground};
    display: flex;
    flex-direction: column;
    //display: grid;
    //grid-template-rows: auto 430px 120px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 18px;
    color: ${({theme}) => theme.color.greyFont};
    margin: 0px 40px 15px 0px;
    a {
        text-decoration: none;
        font-weight: ${({theme}) => theme.fontWeight.bold};
        &:link, &:visited, &:hover, &:active {
            color: #000;
        }
    }
`;

const OwnerPhoto = styled.img`
    width: 40px;
    height: 40px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    border-radius: 50%;
    margin-right: 10px;
`;

const Line = styled.div`
    border-top: 1px solid ${({theme}) => theme.color.darkTurquise};
    opacity: 0.5;
`;

const CommentsSection = styled.div`
    display: grid;
    grid-auto-rows: auto;
    grid-row-gap: 20px;
    max-height: 400px;
    margin: 15px 0px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 1px;
    }
    ::-webkit-scrollbar-track {
        background: none;
    }
    ::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.color.darkBackground};
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${({theme}) => theme.color.darkBackground};
    }
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 14px;
    color: ${({theme}) => theme.color.greyFont};
    margin-right: 5px;
    a {
        text-decoration: none;
        font-weight: ${({theme}) => theme.fontWeight.bold};
        &:link, &:visited, &:hover, &:active {
            color: #000;
        }
    }
`;

const UserPhoto = styled.img`
    width: 30px;
    height: 30px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    border-radius: 50%;
    margin-right: 5px;
`;

const Box = styled.div`
    width: 100%;
    height: 120px;
    margin: auto 0 0 0;
`;

var link = "https://www.youtube.com/watch?v=Ku0d5v32ulk";
export default SideSection;