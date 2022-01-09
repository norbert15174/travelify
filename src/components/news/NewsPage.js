import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Post from "./Post";
import { endpoints } from "../../miscellanous/url";
import axios from "axios";
import { useSelector } from "react-redux";
import scrollBackIcon from "../../assets/scrollBackIcon.svg";
import Spinner from "../trinkets/Spinner";
import { selectFriendsList } from "../../redux/userDataSlice";
import ButtonIcon from "../trinkets/ButtonIcon";
import { newsTypes } from "../../miscellanous/Utils";

const NewsPage = () => {
  const blurState = useSelector((state) => state.blur.value);
  const friendsList = useSelector(selectFriendsList);

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [firstRun, setFirstRun] = useState(true);
  const [noMoreNews, setNoMoreNews] = useState(false);
  const scrollBack = useRef(null);

  useEffect(() => {
    getNews("firstRun");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const observer = useRef(null);
  const loader = useCallback(
    (element) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !noMoreNews) {
          setPage((prevPageNumber) => prevPageNumber + 1);
          getNews("update");
        }
      });
      if (element) observer.current.observe(element);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, noMoreNews]
  );

  async function getNews(type = "update") {
    setNoMoreNews(false);
    setLoading(true);
    axios({
      url: endpoints.getNews + (type === "firstRun" ? 0 : page),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        if (data.length === 0) {
          setNoMoreNews(true);
        } else {
          for (let i = 0; i < data.length; i++) {
            let temp = data[i];
            if (temp.public) {
              if (
                friendsList.find(
                  (item) => item.id === temp.personalInformationDTO.id
                ) !== undefined
              ) {
                setNewsList((prevState) => [
                  ...prevState,
                  { type: newsTypes.friends, news: temp },
                ]);
              } else if (
                temp.personalInformationDTO.id.toString() ===
                sessionStorage.getItem("loggedUserId")
              ) {
                setNewsList((prevState) => [
                  ...prevState,
                  { type: newsTypes.friends, news: temp },
                ]);
              } else {
                setNewsList((prevState) => [
                  ...prevState,
                  { type: newsTypes.community, news: temp },
                ]);
              }
            } else if (!temp.public) {
              if (
                temp.sharedAlbumList.find(
                  (item) =>
                    item.userId.toString() ===
                    sessionStorage.getItem("loggedUserId")
                ) !== undefined
              ) {
                setNewsList((prevState) => [
                  ...prevState,
                  { type: newsTypes.friends, news: temp },
                ]);
              } else if (
                temp.personalInformationDTO.id.toString() ===
                sessionStorage.getItem("loggedUserId")
              ) {
                setNewsList((prevState) => [
                  ...prevState,
                  { type: newsTypes.friends, news: temp },
                ]);
              }
            }
          }
          if (firstRun) {
            setFirstRun(false);
          }
        }
      })
      .catch((error) => {
        setNoMoreNews(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container blurState={blurState}>
      <Header ref={scrollBack}>
        <Heading>Aktualności</Heading>
      </Header>
      {newsList &&
        newsList.map((item) => (
          <Post key={item.news.id} news={item.news} type={item.type} />
        ))}
      <InnerContainer ref={loader}>
        {!noMoreNews ? (
          <Spinner
            width={"30px"}
            height={"30px"}
            border={"6px"}
            firstColor={({ theme }) => theme.color.dark}
            secondColor={({ theme }) => theme.color.light}
          />
        ) : (
          <Info>
            <h1>Brak nowych albumów...</h1>
            <ScrollBack
              icon={scrollBackIcon}
              onClick={() =>
                scrollBack.current.scrollIntoView({ behavior: "smooth" })
              }
            />
          </Info>
        )}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  grid-row-gap: 15px;
  @media only screen and (max-width: 1400px) {
    width: 900px;
  }
  @media only screen and (max-width: 1100px) {
    width: 600px;
  }
  @media only screen and (max-width: 800px) {
    width: 400px;
  }
  @media only screen and (max-width: 500px) {
    width: 300px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 15px 0px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 20px;
    color: ${({ theme }) => theme.color.greyFont};
    @media only screen and (max-width: 800px) {
      font-size: 15px;
    }
  }
`;

const ScrollBack = styled(ButtonIcon)`
  background-color: ${({ theme }) => theme.color.lightBackground};
  transform: rotate(180deg);
  width: 33px;
  height: 33px;
  border-radius: 50%;
  margin: 0 2.5px 0 20px;
  @media only screen and (max-width: 800px) {
    width: 20px;
    height: 20px;
    margin: 0 2.5px 0 15px;
  }
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  height: 80px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  align-items: center;
  @media only screen and (max-width: 1100px) {
    height: 70px;
  }
  @media only screen and (max-width: 800px) {
    height: 60px;
  }
  @media only screen and (max-width: 500px) {
    height: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 54px;
  margin: auto auto auto 25px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 1100px) {
    font-size: 46px;
  }
  @media only screen and (max-width: 800px) {
    font-size: 40px;
    margin: auto auto auto 15px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 24px;
    margin-left: 15px;
  }
`;

export default NewsPage;
