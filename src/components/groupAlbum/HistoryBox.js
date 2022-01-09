import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../miscellanous/url";
import { routes } from "../../miscellanous/Routes";
import { useSelector, useDispatch } from "react-redux";
import { toggleBlur } from "../../redux/blurSlice";
import styled from "styled-components";
import "../groups/groupsScrollbar.css";
import { Chrono } from "react-chrono";
import closeIcon from "./assets/closeIcon.svg";
import noProfilePictureIcon from "../../assets/noProfilePictureIcon.svg";
import moment from "moment";
import "moment/locale/pl";
import ReactLoading from "react-loading";

const EVENT_TEXT = {
  NEW_PHOTO: "Dodano nowe zdjęcie do albumu",
  CHANGED_ALBUM: "Wprowadzono zmiany w albumie",
  NEW_OWNER: "Nie jest już właścicielem",
  CREATE_ALBUM: "Stworzenie albumu",
  CHANGED_MAIN_PHOTO: "Zmiana zdjęcia głównego",
  NEW_PHOTOS: "Dodano nowe zdjęcia",
};

const HistoryBox = ({ setHistory, albumId }) => {
  const [items, setItems] = useState([]);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [tempDates, setTempDates] = useState([]);
  const [tempItems, setTempItems] = useState([]);
  var uniqueDates = [];
  const [redirectToProfile, setRedirectToProfile] = useState({
    active: false,
    id: null,
  });

  const ref = useRef(null);

  const dispatch = useDispatch();
  const blurState = useSelector((state) => state.blur.value);

  useEffect(() => {
    document.addEventListener("click", boxOutsideClick, true);
    document.body.style.overflow = "hidden";
    if (!blurState) {
      dispatch(toggleBlur());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    moment.locale("pl");
  }, []);

  useEffect(() => {
    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function boxOutsideClick(e) {
    if (!ref.current || ref.current.contains(e.target)) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
  }

  async function getHistory() {
    setLoadingFinished(false);
    let temp = [];
    await axios({
      method: "get",
      url:
        endpoints.getGroupAlbumHistory.replace(/:groupAlbumId/i, albumId) +
        "?page=" +
        page,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        if (data.length > 0) setHasMore(true);
        else setHasMore(false);
        temp = tempItems.map((item) => item);
        for (let i = 0; i < data.length; i++) {
          temp.push({
            hour: data[i].dateTime
              .split(" ")[1]
              .substr(0, data[i].dateTime.split(" ")[1].length - 3),
            id: data[i].id,
            status: data[i].status,
            user: data[i].user,
            title: moment(data[i].dateTime.split(" ")[0]).format("LL"),
          });
          setTempDates((prevState) => [
            ...prevState,
            { id: data[i].id, date: data[i].dateTime.split(" ")[0] },
          ]);
        }
        setTempItems(temp);
        if (hasMore) setPage((prevPageNumber) => prevPageNumber + 1);
        else setLoadingFinished(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (!hasMore) {
      let prevDate = "";
      for (let i = 0; i < tempDates.length; i++) {
        let date = tempDates[i].date;
        let isUnique = true;
        for (let j = 0; j < tempDates.length; j++) {
          if (tempDates[j].date === date) {
            isUnique = false;
            break;
          }
        }
        if (isUnique) uniqueDates.push(date.id);
        else {
          if (prevDate !== date) uniqueDates.push(tempDates[i].id);
        }
        prevDate = date;
      }
      for (let i = 0; i < tempItems.length; i++) {
        if (!uniqueDates.includes(tempItems[i].id)) {
          tempItems[i].title = "";
        }
      }
      setItems(tempItems);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore]);

  if (redirectToProfile.active) {
    return (
      <Redirect
        push
        to={{
          pathname: routes.user.replace(/:id/i, redirectToProfile.id),
          state: {
            selectedUser: {
              selectIsTrue: true,
              id: redirectToProfile.id,
              isHeFriend: false,
            },
          },
        }}
      />
    );
  }

  return (
    <Container>
      <Box ref={ref}>
        <Header>
          <Heading>Historia</Heading>
          <CloseButton
            src={closeIcon}
            onClick={() => {
              setHistory(false);
              document.removeEventListener("click", boxOutsideClick, true);
              document.body.style.overflow = "";
              dispatch(toggleBlur());
            }}
          />
        </Header>
        <InnerContainer>
          {loadingFinished ? (
            <Chrono
              key={new Date().getTime()}
              items={items}
              mode="VERTICAL_ALTERNATING"
              hideControls={true}
              cardHeight={100}
              cardWidth={300}
              allowDynamicUpdate={true}
              onScrollEnd={() => {
                if (hasMore) getHistory("scrollUpdate");
              }}
              scrollable={{ scrollbar: true }}
              theme={{
                primary: "#075459",
                secondary: "rgba(18, 191, 206, 0.4)",
                cardBgColor: "#E0E5E0",
                titleColor: "#5B5B5B",
              }}
            >
              {items.map((item) => (
                <Timestamp key={item.id}>
                  <Text>{EVENT_TEXT[item.status]}</Text>
                  <SourceContainer
                    onClick={() => {
                      document.removeEventListener(
                        "click",
                        boxOutsideClick,
                        true
                      );
                      document.body.style.overflow = "";
                      setRedirectToProfile({ active: true, id: 1 });
                    }}
                  >
                    <ProfilePhoto
                      src={
                        item.user.photo !== undefined
                          ? item.user.photo
                          : noProfilePictureIcon
                      }
                    />
                    <Name>{item.user.name + " " + item.user.surName}</Name>
                    <Hour>{item.hour}</Hour>
                  </SourceContainer>
                </Timestamp>
              ))}
            </Chrono>
          ) : (
            <Loading
              height={"8%"}
              width={"8%"}
              type={"spin"}
              color={"#075459"}
            />
          )}
        </InnerContainer>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 120px); // 120px - menu bar
  z-index: 10000;
  @media only screen and (max-width: 720px) {
    width: 100%; // menu bar ignored
  }
  .css-65l8id-TitleWrapper {
    font-size: 24px;
    border-radius: 15px;
    @media only screen and (max-width: 1140px) {
      font-size: 20px;
    }
    @media only screen and (max-width: 720px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 540px) {
      font-size: 12px;
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 46.8%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.color.lightBackground};
  width: 60%;
  height: 95%;
  border: 5px solid ${({ theme }) => theme.color.dark};
  box-shadow: 5px 5px 10px 0 ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1140px) {
    left: 45%;
  }
  @media only screen and (max-width: 1025px) {
    left: 43%;
  }
  @media only screen and (max-width: 720px) {
    left: 50%;
  }
  @media only screen and (max-width: 540px) {
    height: 60%;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.color.dark};
  height: 60px;
  padding: 0px;
  min-height: 60px;
  @media only screen and (max-width: 720px) {
    height: 40px;
    min-height: 40px;
  }
  @media only screen and (max-width: 540px) {
    height: 25px;
    min-height: 25px;
  }
`;

const Heading = styled.h1`
  font-size: 40px;
  margin: 0 auto;
  color: ${({ theme }) => theme.color.lightBackground};
  @media only screen and (max-width: 1140px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 720px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 16px;
  } ;
`;

const CloseButton = styled.img`
  position: absolute;
  width: 32px;
  height: 32px;
  right: 0;
  margin-right: 15px;
  cursor: pointer;
  @media only screen and (max-width: 1140px) {
    width: 22px;
    height: 22px;
  }
  @media only screen and (max-width: 720px) {
    width: 12px;
    height: 12px;
    margin-right: 10px;
  }
  @media only screen and (max-width: 540px) {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
`;

const Loading = styled(ReactLoading)`
  margin: 20px auto 0 auto;
`;

const InnerContainer = styled.div`
  height: calc(98% - 55px);
  @media only screen and (max-width: 720px) {
    height: calc(98% - 35px);
  }
  @media only screen and (max-width: 540px) {
    height: calc(98% - 15px);
  }
`;

const Timestamp = styled.div`
  display: flex;
  min-height: 100px;
  width: 100%;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 24px;
  margin-top: 10px;
  line-height: 20px;
  text-align: center;
  @media only screen and (max-width: 1140px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 720px) {
    font-size: 16px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 12px;
  }
`;

const SourceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto 0 5px 0;
  cursor: pointer;
`;

const Name = styled.p`
  font-size: 16px;
  @media only screen and (max-width: 1140px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 720px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 10px;
  }
`;

const Hour = styled.p`
  font-size: 16px;
  margin: 0 5px 0 auto;
  @media only screen and (max-width: 1140px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 720px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 540px) {
    font-size: 10px;
  }
`;

const ProfilePhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.color.light};
  margin-right: 10px;
  @media only screen and (max-width: 1140px) {
    width: 25px;
    height: 25px;
  }
  @media only screen and (max-width: 720px) {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  @media only screen and (max-width: 540px) {
    width: 15px;
    height: 15px;
  }
`;

export default HistoryBox;
