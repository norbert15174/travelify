import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import ButtonIcon from "../trinkets/ButtonIcon";
import AddComment from "./AddComment";
import tagWhiteIcon from "./assets/tagWhiteIcon.svg";
import editPencilIcon from "./assets/editPencilIcon.svg";
import acceptIcon from "./assets/acceptIcon.svg";
import close2Icon from "./assets/close2Icon.svg";
import tagTurquiseIcon from "./assets/tagIcon.svg";
import { groupMember } from "../../miscellanous/Utils";
import axios from "axios";
import Spinner from "../trinkets/Spinner";
import ReactLoading from "react-loading";
import { endpoints } from "../../miscellanous/url";
import { useSelector, useDispatch } from "react-redux";
import { routes } from "../../miscellanous/Routes";
import Tooltip from "../trinkets/Tooltip";
import {
  selectAlbumPhotos,
  selectRights,
  selectPhotoTags,
  setPhotoTags,
} from "../../redux/groupAlbumSlice";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import moment from "moment";
import "moment/locale/pl";

const SideSection = ({
  currentPhotoIndex,
  setPinBox,
  pinBox,
  heightDelimiter,
  widthDelimiter,
}) => {
  const photos = useSelector(selectAlbumPhotos);
  const rights = useSelector(selectRights);
  const currentPhotoDetail = photos[currentPhotoIndex].photo;
  const photoOwner = photos[currentPhotoIndex].photo.owner;
  const photoId = photos[currentPhotoIndex].photo.photoId;
  const reduxTags = useSelector(selectPhotoTags); // tags from whole album
  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [redirectToProfile, setRedirectToProfile] = useState({
    active: false,
    userId: null,
  });

  useEffect(() => {
    moment.locale("pl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pinBox) {
      getPhotoDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPhotoIndex, pinBox]);

  async function getPhotoDetails() {
    setLoading(true);
    await axios({
      method: "get",
      url: endpoints.getGroupPhotoDetails + photoId,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setTags(data.taggedList);
        dispatch(setPhotoTags(data.taggedList));
        setComments(data.photoComments.splice(0).reverse());
        setDescription(data.description);
      })
      .catch((error) => {
        console.error(error);
        setTags(reduxTags.find((item) => item.photoId === photoId).tags);
        dispatch(
          setPhotoTags(reduxTags.find((item) => item.photoId === photoId).tags)
        );
        // comments from first opening of the album
        let temp = null;
        for (let i = 0; i < photos.length; i++) {
          if (photos[i].photo.photoId === photoId) {
            temp = photos[i].photo.photoComments;
            break;
          }
        }
        setComments(temp.splice(0).reverse());
        setDescription(currentPhotoDetail.description);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function sendComment(comment) {
    await axios({
      method: "POST",
      url: endpoints.addGroupPhotoComment.replace(/:groupPhotoId/, photoId),
      data: {
        text: comment,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        setComments(data.splice(0).reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function updatePhotoDescription() {
    await axios({
      method: "put",
      url:
        endpoints.updateGroupPhotoDescription +
        photoId +
        `/?description=${description}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
        setDescription(currentPhotoDetail.description);
      })
      .finally(() => {
        setEditing(false);
      });
  }

  if (redirectToProfile.active) {
    document.body.style.overflow = "";
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, redirectToProfile.userId),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: redirectToProfile.userId,
              isHeFriend: false,
            },
          },
        }}
      />
    );
  }

  return (
    <Container
      heightDelimiter={heightDelimiter}
      widthDelimiter={widthDelimiter}
    >
      {(rights === groupMember.owner ||
        photoOwner.id.toString() ===
          sessionStorage.getItem("loggedUserId")) && (
        <EditDescriptionButton
          icon={!editing ? editPencilIcon : acceptIcon}
          onClick={() => {
            if (!editing) {
              setEditing(true);
            } else {
              updatePhotoDescription();
            }
          }}
        />
      )}
      {editing && (
        <CloseEditing
          icon={close2Icon}
          onClick={() => {
            setEditing(false);
            getPhotoDetails();
          }}
        />
      )}
      <Header>
        <Heading>
          <OwnerPhoto
            src={
              photoOwner.photo !== undefined
                ? photoOwner.photo
                : noProfilePictureIcon
            }
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noProfilePictureIcon;
            }}
            onClick={() => {
              document.body.style.overflow = "";
              setRedirectToProfile({ active: true, userId: photoOwner.id });
            }}
          />
          {!editing ? (
            <>
              <span>
                <PhotoDescription
                  onClick={() => {
                    document.body.style.overflow = "";
                    setRedirectToProfile({
                      active: true,
                      userId: photoOwner.id,
                    });
                  }}
                >
                  {photoOwner.name + " " + photoOwner.surName}
                </PhotoDescription>
                {!loading ? (
                  <PhotoDescription type="description">
                    {description}
                  </PhotoDescription>
                ) : (
                  <ReactLoading
                    height={"8%"}
                    width={"8%"}
                    type={"bubbles"}
                    color={"#064045"}
                  />
                )}
                <PhotoDate data-tip data-for={"photoDate"}>
                  {moment(currentPhotoDetail.dateTime).fromNow()}
                </PhotoDate>
                <Tooltip
                  id={"photoDate"}
                  place="left"
                  text={moment(currentPhotoDetail.dateTime).format(
                    "H:mm, MMMM Do YYYY"
                  )}
                />
              </span>
            </>
          ) : (
            <AddDescription
              className="scroll_two"
              id="comment"
              name="comment"
              placeholder="Dodaj opis..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
        </Heading>
        {!loading && tags.length !== 0 && (
          <TagsContainer>
            <TagIcon src={tagTurquiseIcon} />
            {
              <Tags className="scroll_two">
                {tags.map((item) => (
                  <TaggedPerson
                    key={item.userId}
                    onClick={() => {
                      document.body.style.overflow = "";
                      setRedirectToProfile({
                        active: true,
                        userId: item.userId,
                      });
                    }}
                  >
                    <UserPhoto
                      src={
                        item.photo !== undefined
                          ? item.photo
                          : noProfilePictureIcon
                      }
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src = noProfilePictureIcon;
                      }}
                    />
                    {item.name + " " + item.surName}
                  </TaggedPerson>
                ))}
              </Tags>
            }
          </TagsContainer>
        )}
      </Header>
      <CommentsSection className="scroll_two">
        {!loading ? (
          comments.length !== 0 ? (
            <ScrollableFeed className="scroll_two" forceScroll={true}>
              {comments.map((item) => (
                <>
                  <CommentContainer key={item.commentId}>
                    <UserPhoto
                      src={
                        item.photo !== undefined
                          ? item.photo
                          : noProfilePictureIcon
                      }
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src = noProfilePictureIcon;
                      }}
                      onClick={() => {
                        document.body.style.overflow = "";
                        setRedirectToProfile({
                          active: true,
                          userId: item.userId,
                        });
                      }}
                    />
                    <span>
                      <p
                        onClick={() => {
                          document.body.style.overflow = "";
                          setRedirectToProfile({
                            active: true,
                            userId: item.userId,
                          });
                        }}
                      >
                        {item.name + " " + item.surName}
                      </p>
                      {item.text}
                    </span>
                  </CommentContainer>
                  <CommentDate
                    key={item.time + "_" + item.id}
                    data-tip
                    data-for={item.time + "_" + item.id}
                  >
                    {moment(item.time).fromNow()}
                  </CommentDate>
                  <Tooltip
                    id={item.time + "_" + item.id}
                    place="left"
                    text={moment(item.time).format("H:mm, MMMM Do YYYY")}
                  />
                </>
              ))}
            </ScrollableFeed>
          ) : (
            <NoCommments>
              Sekcja komentarzy jest pusta...
              {rights === groupMember.owner && (
                <>
                  <br />
                  Podziel się zdjęciem, a być może ktoś doceni jego piękno i
                  zostawi miły komentarz &#128522;
                </>
              )}
            </NoCommments>
          )
        ) : (
          <CommentsSpinner>
            <Spinner
              width={"30px"}
              height={"30px"}
              firstColor={"#075459"}
              secondColor={"#064045"}
              border={"8px"}
            />
          </CommentsSpinner>
        )}
      </CommentsSection>
      <Footer>
        {(rights === groupMember.owner ||
          photoOwner.id.toString() ===
            sessionStorage.getItem("loggedUserId")) && (
          <TagButton icon={tagWhiteIcon} onClick={() => setPinBox(true)}>
            Oznacz osobę
          </TagButton>
        )}
        <AddComment add={sendComment} />
      </Footer>
    </Container>
  );
};

const CommentsSpinner = styled.div`
  margin: auto auto;
`;

const Container = styled.div`
  padding: 20px 25px 10px 25px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  position: relative;

  height: ${({ heightDelimiter }) =>
    heightDelimiter - 30 + "px"}; // -30 - top and bottom padding

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-row-gap: 15px;

  @media only screen and (max-width: 1225px) {
    grid-row-gap: 10px;
  }
  @media only screen and (max-width: 1025px) {
    padding: 15px 15px 5px 15px;
    height: ${({ heightDelimiter }) =>
      heightDelimiter - 20 + "px"}; // -30 - top and bottom padding
  }
  @media only screen and (max-width: 825px) {
    width: ${({ widthDelimiter }) =>
      widthDelimiter - 30 + "px"}; // -30 - top and bottom padding
    height: 280px;
    min-height: 280px;
    max-height: 280px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.color.dark};
`;

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: ${({ theme }) => theme.color.greyFont};
  padding: 0px 40px 5px 0px;
  span {
    display: inline-block;
    word-wrap: break-word;
    width: 90%;
    white-space: normal;
  }
`;

const PhotoDescription = styled.p`
  color: #000;
  margin-right: 5px;
  font-size: 18px;
  display: inline-block;
  cursor: ${({ type }) => (type === "description" ? "default" : "pointer")}};
  text-decoration: none;
  font-weight: ${({ theme, type }) =>
    type === "description" ? theme.fontWeight.medium : theme.fontWeight.bold};
  @media only screen and (max-width: 1225px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 1025px) {
    font-size: 10px;
  }
`;

const PhotoDate = styled.p`
  color: ${({ theme }) => theme.color.greyFont};
  margin-top: 10px;
  font-size: 12px;
  @media only screen and (max-width: 1225px) {
    font-size: 8px;
  }
`;

const OwnerPhoto = styled.img`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.color.light};
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
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
  background-color: ${({ theme }) => theme.color.lightBackground};
  color: #000;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: 12px;
  ::placeholder {
    font-size: 18px;
    overflow: hidden;
    text-transform: none;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.greyFont};
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
  width: 20px;
  height: 20px;
  margin-right: 10px;
  @media only screen and (max-width: 1425px) {
    width: 16px;
    height: 16px;
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
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-right: 10px;
  @media only screen and (max-width: 1425px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 1025px) {
    font-size: 8px;
  }
  @media only screen and (max-width: 825px) {
    margin-right: 5px;
  }
  cursor: pointer;
`;

const NoCommments = styled.h1`
  color: ${({ theme }) => theme.color.greyFont};
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
  font-size: 12px;
  color: ${({ theme }) => theme.color.greyFont};
  margin: 0 5px 5px 0;
  span {
    display: inline-block;
    word-wrap: break-word;
    width: 90%;
    white-space: normal;
  }
  p {
    color: #000;
    margin-right: 2.5px;
    display: inline-block;
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    cursor: pointer;
  }
  @media only screen and (max-width: 1225px) {
    margin: 0px 5px 2.5px 0px;
    font-size: 10px;
  }
`;

const CommentDate = styled.p`
  color: ${({ theme }) => theme.color.greyFont};
  margin-bottom: 10px;
  @media only screen and (max-width: 1225px) {
    font-size: 8px;
  }
`;

const UserPhoto = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid ${({ theme }) => theme.color.light};
  border-radius: 50%;
  margin-right: 5px;
  cursor: pointer;
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
  border-top: 1px solid ${({ theme }) => theme.color.dark};
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
    background-color: ${({ theme }) => theme.color.light};
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
    background-color: ${({ theme }) => theme.color.light};
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
  color: ${({ theme }) => theme.color.lightBackground};
  font-size: 18px;
  background-size: 15%;
  background-position: 5% 50%;
  margin-top: 15px;
  padding: 5px 0px 5px 20px;
  &:hover {
    background-color: ${({ theme }) => theme.color.light};
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

export default SideSection;
