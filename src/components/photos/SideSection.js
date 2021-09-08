import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ButtonIcon from "../trinkets/ButtonIcon";
import AddComment from "./AddComment";
import tagWhiteIcon from "./assets/tagWhiteIcon.svg";
import editPencilIcon from "./assets/editPencilIcon.svg";
import acceptIcon from "./assets/acceptIcon.svg";
import close2Icon from "./assets/close2Icon.svg";
import tagTurquiseIcon from "./assets/tagTurquiseIcon.svg";
import { albumRights } from "../../miscellanous/Utils";
import axios from "axios";
import Spinner from "../trinkets/Spinner";
import { endpoints } from "../../url";
import { getDate } from "../../miscellanous/Utils";
import { useSelector, useDispatch } from "react-redux"
import { selectOwner, selectAlbumPhotos, selectRights } from "../../redux/albumDetailsSlice";

const SideSection = ({currentPhotoIndex, setPinBox, heightDelimiter, widthDelimiter}) => {

    const owner = useSelector(selectOwner);
    const photos = useSelector(selectAlbumPhotos);
    const rights = useSelector(selectRights)
    const currentPhotoDetail = photos[currentPhotoIndex].photo;
    const photoId = photos[currentPhotoIndex].photo.photoId;

    const [ comments, setComments ] = useState([]);
    const [ loadingComments, setLoadingComments ] = useState(false);
    const [ tags, setTags ] = useState([]);
    const [ loadingTags, setLoadingTags ] = useState(false);
    const [ editing, setEditing ] = useState(false);
    const [ description, setDescription ] = useState(currentPhotoDetail.description);
    
    useEffect(() => {
        getPhotoTags();
        getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPhotoIndex]);

    const addComment = (comment) => {
        //setComments((prevState) => [ ...prevState, comment]);
        sendComment(comment);
    };

    const getPhotoTags = () => {
        setLoadingTags(true);
        for (let i = 0; i < photos.length; i++) {
            if (photos[i].photo.photoId === photoId) {
                setTags(photos[i].photo.taggedList)
                break;
            }
        }
        setLoadingTags(false);
    };

    const getComments = () => {
        setLoadingComments(true);
        let temp = null;
        for (let i = 0; i < photos.length; i++) {
            if (photos[i].photo.photoId === photoId) {
                //setComments(photos[i].photo.photoComments);
                temp = photos[i].photo.photoComments;
                break;
            }
        }
        setComments(sortCommentsByTime(temp));
        setLoadingComments(false);
    }; 

    const sortCommentsByTime = (input) => {
        input = input.slice().sort((a, b) => {
            let a_temp = a.time.split(" "); // ["date", "time"]
            let b_temp = b.time.split(" ");
            return (a_temp[1] < b_temp[1]) ? -1 : ((a_temp[1] > b_temp[1]) ? 1 : 0);
        });
        return input;
    };


    async function sendComment(comment) {
        await axios({
			method: "put",
			url: endpoints.addComment + photoId,
            data: {
                text: comment
            },
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
			},
		}).then((response) => {
            console.log(response);
		}).catch((error) => {
            console.log(error);
		})
    };

    return (
        <Container heightDelimiter={heightDelimiter} widthDelimiter={widthDelimiter}>
            {
                rights === albumRights.owner && 
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
            }
            { 
                editing 
                && 
                <CloseEditing 
                    icon={close2Icon}
                    onClick={() => {
                        setEditing(false);
                        setDescription(currentPhotoDetail.description);
                    }}
                />
            }
            <Header>
                <Heading>
                    <OwnerPhoto src={owner.photo}/>
                        {
                            !editing ? (
                                <span>
                                    <a href={link}>{owner.name + " " + owner.surName} </a> 
                                    {currentPhotoDetail.description}  
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
                {
                    !loadingTags ? (
                        tags.length !== 0 && (
                        <TagsContainer>
                            <TagIcon src={tagTurquiseIcon}/>
                            {
                                <Tags className="scroll_two">
                                    {tags.map((item) => (
                                        <TaggedPerson key={item.userId}>
                                            <UserPhoto src={item.photo}/>
                                            {item.name + " " + item.surName}
                                        </TaggedPerson>
                                    ))}
                                </Tags>
                            }
                        </TagsContainer>)
                    ) : (
                        <TagsSpinner>
                            <Spinner width={"15px"} height={"15px"} firstColor={"#12BFCE"} secondColor={"#0FA3B1"} border={"5px"}/>
                        </TagsSpinner>
                    )
                }
            </Header>
            <CommentsSection className="scroll_two">
            {   
                !loadingComments ? (
                    comments.length !== 0 
                    ? 
                    comments.map((item) => (
                        <>
                            <CommentContainer key={item.commentId}>
                                <UserPhoto src={item.photo}/>
                                <span>
                                    <a href={link}>{item.name + " " + item.surName} </a>
                                    {item.text}
                                </span>
                            </CommentContainer>
                            <CommentDate key={'_' + Math.random().toString(36).substr(2, 9)}>
                                {item.time.split(" ")[1].substring(0,5) + "  " + getDate(item.time.split(" ")[0])}
                            </CommentDate>
                        </>
                    ))
                    : 
                    <NoCommments>
                        Sekcja komentarzy jest pusta...<br/>
                        Podziel się zdjęciem, a być może ktoś doceni jego piękno i zostawi miły komentarz &#128522;
                    </NoCommments>
                ) : (
                    <CommentsSpinner>
                        <Spinner width={"30px"} height={"30px"} firstColor={"#12BFCE"} secondColor={"#0FA3B1"} border={"8px"}/>
                    </CommentsSpinner>
                )
            }
            </CommentsSection>
            <Footer>
                {
                    rights === albumRights.owner 
                    &&
                    <TagButton 
                        icon={tagWhiteIcon}
                        onClick={() => setPinBox(true)}
                    >
                        Oznacz osobę
                    </TagButton>
                }
                <AddComment currentPhotoIndex={currentPhotoIndex} add={addComment}/> 
            </Footer>
        </Container>
    );

};

const CommentsSpinner = styled.div`
    margin: auto auto;
`;

const TagsSpinner = styled.div`
    margin: 0px auto 5px 5px;
`;

const Container = styled.div`
    padding: 20px 25px 10px 25px;
    background-color: ${({theme}) => theme.color.lightBackground};
    position: relative;

    height: ${({heightDelimiter}) => heightDelimiter - 30 + "px"}; // -30 - top and bottom padding 

    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-row-gap: 15px;

    @media only screen and (max-width: 1225px) {
        grid-row-gap: 10px;
    }
    @media only screen and (max-width: 1025px) {
        padding: 15px 15px 5px 15px;
        height: ${({heightDelimiter}) => heightDelimiter - 20 + "px"}; // -30 - top and bottom padding 
    }
    @media only screen and (max-width: 825px) {
        width: ${({widthDelimiter}) => widthDelimiter - 30 + "px"}; // -30 - top and bottom padding 
        height: 280px;
        min-height: 280px;
        max-height: 280px;
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

const TagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 10px 0px;
    @media only screen and (max-width: 1425px) {
        margin: 5px 0px;
    }
`;

const Tags = styled.div`
    display: flex; 
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    max-height: 150px;
    overflow-y: scroll;
    @media only screen and (max-width: 825px) {
        max-height: 50px;
    }
    @media only screen and (max-width: 510px) {
        max-height: 25px;
    }
`;

const TagIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 15px;
    @media only screen and (max-width: 1425px) {
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
    @media only screen and (max-width: 1425px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 8px;
    }
    @media only screen and (max-width: 825px) {
        margin-right: 5px;
    }
`;

const NoCommments = styled.h1`
    color: ${({theme}) => theme.color.greyFont};
    display: inline-block;
    word-wrap: break-word;
    width: 80%;
    white-space: normal;
    @media only screen and (max-width: 1425px) {
        font-size: 15px;
    }
    @media only screen and (max-width: 1025px) {
        font-size: 10px;
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
    margin: 0 5px 5px 0;
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
        margin: 0px 5px 2.5px 0px;
        font-size: 10px;
    }
`;

const CommentDate = styled.p`
    color: ${({theme}) => theme.color.greyFont};
    margin-bottom: 10px;
    @media only screen and (max-width: 1225px) {
        font-size: 8px;
    }
`;

const UserPhoto = styled.img`
    width: 30px;
    height: 30px;
    border: 1px solid ${({theme}) => theme.color.lightTurquise};
    border-radius: 50%;
    margin-right: 5px;
    @media only screen and (max-width: 1425px) {
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



var link = "https://www.youtube.com/watch?v=ObJLIsNcOZ4";

export default SideSection;