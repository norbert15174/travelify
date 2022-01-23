import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { endpoints } from "../../miscellanous/url";
import GroupItem from "./GroupItem";
import "./notificationsScrollbar.css";
import moment from "moment";
import "moment/locale/pl";

const GroupNotifications = ({ notificationsDisplay }) => {
  const [groupNotifications, setGroupNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    moment.locale("pl");
    getGroupRequests("firstRun");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getGroupRequests(type) {
    if (type === "scrollUpdate") {
      setPage((prevPageNumber) => prevPageNumber + 1);
    }
    axios({
      url:
        endpoints.getGroupNotifications +
        "?page=" +
        (type === "firstRun" ? 0 : page),
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        if (data.length > 0) setHasMore(true);
        else setHasMore(false);
        if (groupNotifications && type === "scrollUpdate") {
          setGroupNotifications((prevState) => [
            ...prevState,
            ...data,
          ]);
        } else if (type === "firstRun") {
          setPage(1);
          setGroupNotifications(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <NotificationsList id="groupNotifContainer" className="scroll">
      <InfiniteScroll
        dataLength={groupNotifications ? groupNotifications.length : 10}
        next={() => getGroupRequests("scrollUpdate")}
        hasMore={hasMore}
        loader={
          <h1 style={{textAlign: "center", color: "#5b5b5b"}}>
            Brak powiadomień
          </h1>
        }
        scrollableTarget="groupNotifContainer"
      >
        {groupNotifications.length !== 0 &&
          groupNotifications.map((item) => (
            <GroupItem
              key={item.id + item.notificationTime}
              notification={item}
              notificationsDisplay={notificationsDisplay}
              date={moment(item.notificationTime).calendar()}
            />
          ))}
      </InfiniteScroll>
    </NotificationsList>
  );
};

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden; 
  overflow-y: scroll; 
  max-height: 80%;
  margin: 20px 10px 20px 10px;
  @media only screen and (max-width: 1000px) {
    margin: 15px 5px 15px 5px;
  }
`;

export default GroupNotifications;
