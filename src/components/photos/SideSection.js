import React, { useState } from "react";
import styled from "styled-components";
import profilePhoto from  "../albums/assets/profilePhoto.png";
import ButtonIcon from "../trinkets/ButtonIcon";
import AddComment from "./AddComment";
import tagWhiteIcon from "./assets/tagWhiteIcon.svg";
import editPencilIcon from "./assets/editPencilIcon.svg";
import acceptIcon from "./assets/acceptIcon.svg";
import close2Icon from "./assets/close2Icon.svg";
import tagTurquiseIcon from "./assets/tagTurquiseIcon.svg";

const fakeComments = [
    {
        id: 1,
        name: "Krzysztof Nowak",
        text: "Super zdjęcie! :D",
    },
    {
        id: 2,
        name: "Magda Elk",
        text: "Piękne zdjęcie! Jak było? Na pewno też kiedyś tam pojadę :D :D :D",
    },
    {
        id: 3,
        name: "Krzysztof Nowak",
        text: "Chyba w twoich snach! xDD",
    },
    {
        id: 4,
        name: "Mikołaj Telec",
        text: "Spokój w komentarzach, bo bany polecą :D. A tak serio to naprawdę warto się wybrać w to miejsce.",
    },
    {
        id: 5,
        name: "Magda Elk",
        text: "Napiszę do ciebie na priv to pogadamy :) Opowiesz mi jak najlepiej przygotować się do takiej wycieczki.",
    },
    {
        id: 6,
        name: "Mikołaj Telec",
        text: "Jasne :D czekam na wiadomość. ",
    },
]

const initialDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum mattis erat ac feugiat."

const SideSection = ({photoId, setPinBox, heightDelimiter}) => {

    const [ commentsArray, setCommentsArray ] = useState(fakeComments);
    const [ editing, setEditing ] = useState(false);
    const [ description, setDescription ] = useState(initialDescription);
    
    
    const addComment = (comment) => {
        setCommentsArray((prevState) => [ ...prevState, comment]);
    }

    return (
        <Container heightDelimiter={heightDelimiter}>
            <EditDescriptionButton 
                icon={!editing ? editPencilIcon : acceptIcon}
                onClick={() => {
                    if (!editing) {
                        setEditing(true);
                    } else {
                        setDescription(description);
                        setEditing(false);
                    }
                }}
            />
            { 
                editing 
                && 
                <CloseEditing 
                    icon={close2Icon}
                    onClick={() => {
                        setEditing(false);
                        setDescription(initialDescription);
                    }}
                />
            }
            <Header>
                <Heading>
                    <OwnerPhoto src={profilePhoto}/>
                        {
                            !editing ? (
                                <span>
                                    <a href={link}>Mikołaj Telec </a> 
                                    {description}  
                                </span>
                            ) : (
                                <AddDescription
                                    className="scroll_two"
                                    id="comment"
                                    name="comment"
                                    placeholder="Dodaj opis..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            )
                        }
                </Heading>
                {<Tags className="scroll_two">
                    <TagIcon src={tagTurquiseIcon}/>
                    <TaggedPerson>
                        <UserPhoto src={profilePhoto}/>
                        Krzysztof Jarzyna
                    </TaggedPerson>
                    <TaggedPerson>
                        <UserPhoto src={profilePhoto}/>
                        Krzysztof Jarzyna
                    </TaggedPerson>
                   
                </Tags>}
            </Header>
            <CommentsSection className="scroll_two" heightDelimiter={heightDelimiter}>
            {   
                commentsArray.map((comment) => (
                    <CommentContainer key={comment.id}>
                        <UserPhoto src={profilePhoto}/>
                        <span>
                            <a href={link}>{comment.name} </a>
                            {comment.text}
                        </span>
                    </CommentContainer>
                ))
            }
            </CommentsSection>
            <Footer>
                <TagButton 
                    icon={tagWhiteIcon}
                    onClick={() => setPinBox(true)}
                >
                    Oznacz osobę
                </TagButton>
                <AddComment add={addComment}/> 
            </Footer>
        </Container>
    );

};

const Container = styled.div`
    padding: 20px 25px 10px 25px;
    background-color: ${({theme}) => theme.color.lightBackground};
    position: relative;
    height: ${({heightDelimiter}) => heightDelimiter - 30 + "px"}; // -30 - top and bottom padding 
    min-height: ${({heightDelimiter}) => heightDelimiter - 30 + "px"};
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-row-gap: 15px;
    @media only screen and (max-width: 1025px) {
        padding: 15px 15px 5px 15px;
        height: ${({heightDelimiter}) => heightDelimiter - 20 + "px"}; // -30 - top and bottom padding 
        min-height: ${({heightDelimiter}) => heightDelimiter - 20 + "px"};
    }
    @media only screen and (max-width: 510px) {
        height: 350px;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${({theme}) => theme.color.darkTurquise};
`;

const Heading = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 18px;
    color: ${({theme}) => theme.color.greyFont};   
    padding: 0px 40px 5px 0px;
    span {
        display: inline-block;
        word-wrap: break-word;
        width: 90%;
        white-space: normal
    }
    a {
        text-decoration: none;
        font-weight: ${({theme}) => theme.fontWeight.bold};
        &:link, &:visited, &:hover, &:active {
            color: #000;
        }
    }
    @media only screen and (max-width: 1225px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 10px;
    }
`;

const OwnerPhoto = styled.img`
    width: 40px;
    height: 40px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    border-radius: 50%;
    margin-right: 10px;
    @media only screen and (max-width: 1225px) {
        width: 30px;
        height: 30px;
    }
    @media only screen and (max-width: 1025px) {
        width: 20px;
        height: 20px;
    }
`;

const AddDescription = styled.textarea`
    display: inline-block;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline-style: none;
    background-color: ${({theme}) => theme.color.lightBackground};
    color: #000;
    font-size: 18px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    margin-bottom: 12px;
    ::placeholder {
        font-size: 18px;
        overflow: hidden;
        text-transform: none;
        letter-spacing: 1px;
        color: ${({theme}) => theme.greyFont};
        @media only screen and (max-width: 1225px) {
            font-size: 14px;
        }
        @media only screen and (max-width: 1025px) {
            font-size: 10px;
        }
    }
    
    @media only screen and (max-width: 1225px) {
        font-size: 14px;
        
    }
    @media only screen and (max-width: 1025px) {
        font-size: 10px;
    }
`;

const Tags = styled.div`
    display: flex; 
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin: 10px 0px;
    max-height: 150px;
    overflow-y: scroll;

    @media only screen and (max-width: 1225px) {
        margin: 5px 0px;
    }
`;

const TagIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 15px;
    @media only screen and (max-width: 1225px) {
        width: 16px;
        height: 16px;
        margin-right: 10px;
    }
    @media only screen and (max-width: 1025px) {
        width: 12px;
        height: 12px;
        margin-right: 5px;
    }
`;

const TaggedPerson = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-weight: ${({theme}) => theme.fontWeight.bold};
    margin: 5px 10px 0px 0px;
    @media only screen and (max-width: 1225px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 8px;
    }
`;

const CommentsSection = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 14px;
    color: ${({theme}) => theme.color.greyFont};
    margin: 0 5px 20px 0;
    span {
        display: inline-block;
        word-wrap:break-word;
        width: 90%;
        white-space: normal
    }
    a {
        text-decoration: none;
        font-weight: ${({theme}) => theme.fontWeight.bold};
        &:link, &:visited, &:hover, &:active {
            color: #000;
        }
    }
    @media only screen and (max-width: 1225px) {
        margin: 0px 5px 10px 0px;
        font-size: 10px;
    }
`;

const UserPhoto = styled.img`
    width: 30px;
    height: 30px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    border-radius: 50%;
    margin-right: 5px;
    @media only screen and (max-width: 1225px) {
        width: 20px;
        height: 20px;
    }
    @media only screen and (max-width: 1025px) {
        width: 15px;
        height: 15px;
    }
`;

const Footer = styled.div`
    max-height: 120px;
    border-top: 1px solid ${({theme}) => theme.color.darkTurquise};
`;

const EditDescriptionButton = styled(ButtonIcon)`
    position: absolute;
    margin-right: 20px;
    right: 0;
    margin-top: 15px;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-size: 75%;
    background-position: 50% 50%;
    &:hover {
        background-color: ${({theme}) => theme.color.lightTurquise};
    }
    @media only screen and (max-width: 1225px) {
        width: 20px;
        height: 20px;
    }
    @media only screen and (max-width: 1025px) {
        margin-top: 10px;
        width: 15px;
        height: 15px;
    }
`;

const CloseEditing = styled(ButtonIcon)`
    position: absolute;
    margin-right: 20px;
    right: 0;
    margin-top: 50px;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-size: 75%;
    background-position: 50% 50%;
    &:hover {
        background-color: ${({theme}) => theme.color.lightTurquise};
    }
    @media only screen and (max-width: 1225px) {
        width: 20px;
        height: 20px;
        margin-top: 40px;
    }
    @media only screen and (max-width: 1025px) {
        margin-top: 30px;
        width: 15px;
        height: 15px;
    }
`;


const TagButton = styled(ButtonIcon)`
    width: 130px;
    height: 30px;
    border-radius: 5px;
    color: ${({theme}) => theme.color.lightBackground };
    font-size: 18px;
    background-size: 15%;
    background-position: 5% 50%;
    margin-top: 15px;
    padding: 5px 0px 5px 20px;
    &:hover {
        background-color: ${({theme}) => theme.color.lightTurquise};
    }
    @media only screen and (max-width: 1225px) {
        width: 100px;
        font-size: 12px;
        height: 25px;
        margin-top: 10px;
        background-size: 12%;
        padding: 5px 0px 5px 10px;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 8px;
        width: 60px;
        height: 20px;
        padding: 5px 0px 5px 5px;
        margin-top: 5px;
    }
`;


var link = "https://www.youtube.com/watch?v=Ku0d5v32ulk";

export default SideSection;