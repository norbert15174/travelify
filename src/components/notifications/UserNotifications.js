import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserItem from "./UserItem";
import axios from "axios";
import { endpoints } from "../../miscellanous/url";
import "./notificationsScrollbar.css";
import moment from "moment";
import "moment/locale/pl";

const UserNotifications = ({ notificationsDisplay }) => {
  const [userNotifications, setUserNotifications] = useState([]);

  useEffect(() => {
    moment.locale("pl");
    getUserNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserNotifications() {
    axios({
      url: endpoints.getNotifications,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {

        setUserNotifications(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <NotificationsList className="scroll">
      {userNotifications.length !== 0 && (
        userNotifications.map((item) => (
          <UserItem
            key={item.id + item.date}
            notification={item}
            notificationsDisplay={notificationsDisplay}
            date={moment(item.date).calendar()}
          />
        ))
      )}
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

export default UserNotifications;
