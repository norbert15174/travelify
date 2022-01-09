import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Input from "../trinkets/Input";
import "./groupsScrollbar.css";
import axios from "axios";
import { endpoints } from "../../miscellanous/url";
import MemberThumbnail from "./MemberThumbnail";
import { useSelector, useDispatch } from "react-redux";
import Toggle from "../trinkets/Toggle";
import Tooltip from "../trinkets/Tooltip";
import requestsIcon from "./assets/requestsIcon.svg";
import groupMemberIcon from "./assets/groupMemberIcon.svg";
import {
  selectMembers,
  setRequests,
  selectRequests,
} from "../../redux/groupDetailsSlice";
import moment from "moment";
import "moment/locale/pl";

const toggle = {
  members: "members",
  requests: "requests",
};

const MembersSection = ({ setMemberToRemove, groupId }) => {
  const [searchContent, setSearchContent] = useState("");
  const [found, setFound] = useState([]);
  const [type, setType] = useState(toggle.members);
  const members = useSelector(selectMembers);
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);

  useEffect(() => {
    moment.locale("pl");
    getGroupRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFound([]);
    setSearchContent("");
  }, [type]);

  async function getGroupRequests() {
    await axios({
      method: "get",
      url: endpoints.getGroupMemberRequests + groupId,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      },
    })
      .then(({ data }) => {
        dispatch(setRequests(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSearchBarChange = (e) => {
    setFound(
      type === toggle.members
        ? members.filter((item) =>
            (item.name + " " + item.surName)
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          )
        : requests.filter(({user}) =>
            (user.name + " " + user.surName)
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          )
    );
    setSearchContent(e.target.value);
  };

  return (
    <>
      <Container>
        <Header>
          <h1>
            {type === toggle.members
              ? "Aktualni członkowie"
              : "Wysłane zaproszenia"}
          </h1>
          <Line />
        </Header>
        <ToggleContainer>
          <OptionContainer
            data-tip
            data-for="members"
            active={type === toggle.members ? true : false}
            icon={groupMemberIcon}
          />
          <Tooltip id="members" place="bottom" text="Aktualni członkowie" />
          <Toggle
            key="membersSection"
            value={type}
            setValue={setType}
            first={toggle.members}
            second={toggle.requests}
          />
          <OptionContainer
            data-tip
            data-for="requests"
            active={type === toggle.requests ? true : false}
            icon={requestsIcon}
          />
          <Tooltip id="requests" place="bottom" text="Wysłane zaproszenia" />
        </ToggleContainer>
        <Search
          autoComplete="off"
          name="search"
          id="search"
          type="text"
          search
          placeholder="Szukaj"
          value={searchContent}
          onChange={handleSearchBarChange}
        />
        {type === toggle.requests && (
          <MembersGrid className="scroll">
            {requests ? (
              (searchContent.length !== 0 && found.length !== 0
                ? found.map((item) => (
                    <MemberThumbnail
                      key={item.time}
                      member={item.user}
                      date={moment(item.time).calendar()}
                      type="requests"
                    />
                  ))
                : null) ||
              (requests.length !== 0 && searchContent.length === 0
                ? requests
                    .slice(0)
                    .reverse()
                    .map((item) => (
                      <MemberThumbnail
                        key={item.time}
                        member={item.user}
                        date={moment(item.time).calendar()}
                        type="requests"
                      />
                    ))
                : null) || (
                <h1 style={{ color: "#5B5B5B" }}>Brak wysłanych zaproszeń...</h1>
              )
            ) : (
              <h1 style={{ color: "#5B5B5B" }}>Brak wysłanych zaproszeń...</h1>
            )}
          </MembersGrid>
        )}
        {type === toggle.members && (
          <MembersGrid className="scroll">
            {members ? (
              (searchContent.length !== 0 && found.length !== 0
                ? found.map((item) => (
                    <MemberThumbnail
                      key={"member" + item.id}
                      member={item}
                      setMemberToRemove={setMemberToRemove}
                    />
                  ))
                : null) ||
              (members.length !== 0 && searchContent.length === 0
                ? members
                    .slice(0)
                    .reverse()
                    .map((item) => (
                      <MemberThumbnail
                        key={"member" + item.id}
                        member={item}
                        setMemberToRemove={setMemberToRemove}
                      />
                    ))
                : null) || (
                <h1 style={{ color: "#5B5B5B" }}>Brak członków...</h1>
              )
            ) : (
              <h1 style={{ color: "#5B5B5B" }}>Brak członków...</h1>
            )}
          </MembersGrid>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  padding: 20px 25px;
  margin-bottom: 15px;
  @media only screen and (max-width: 550px) {
    padding: 15px 20px;
  }
`;

const Header = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.color.greyFont};
  h1 {
    font-size: 34px;
  }
  @media only screen and (max-width: 810px) {
    h1 {
      font-size: 27px;
    }
  }
  @media only screen and (max-width: 550px) {
    h1 {
      font-size: 20px;
    }
  }
  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 18px;
    }
  }
`;

const Line = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 810px) {
    margin-top: 5px;
  }
`;

const animation = keyframes`
    from {
      width: 25%;
    }
    to {
      width: 50%;
    }
`;

const ToggleContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 80px max-content;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
  @media only screen and (max-width: 1010px) {
    grid-template-columns: max-content 60px max-content;
  }
  @media only screen and (max-width: 810px) {
    margin-top: 15px;
  }
  @media only screen and (max-width: 550px) {
    margin-top: 10px;
  }
`;

const OptionContainer = styled.div`
  background: ${({ active }) => (active ? "rgba(18, 191, 206, 0.4)" : "")};
  -webkit-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  text-align: center;
  border-radius: 15px;
  width: 30px;
  height: 30px;
  padding: 5px 25px 5px 25px;
  margin: auto 25px auto 25px;
  background-image: url(${({ icon }) => icon});
  background-size: 40%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  @media only screen and (max-width: 1010px) {
    width: 20px;
    height: 20px;
    padding: 5px 20px;
    margin: auto 25px;
  }
  @media only screen and (max-width: 810px) {
    width: 15px;
    height: 15px;
    padding: 5px 15px;
    margin: auto 20px;
  }
  @media only screen and (max-width: 550px) {
    width: 10px;
    height: 10px;
    margin: auto 15px;
  }
`;

const Search = styled(Input)`
  margin: 20px 0 0 0;
  &:focus {
    animation: ${animation};
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }
  @media only screen and (max-width: 1010px) {
    padding: 10px 20px 10px 30px;
    font-size: 12px;
    margin: 15px 0 0 0;
  }
  @media only screen and (max-width: 810px) {
    background-size: 12px;
    padding: 5px 20px 5px 30px;
    margin: 15px 0 0 0;
  }
  @media only screen and (max-width: 550px) {
    padding: 5px 10px 5px 30px;
    font-size: 10px;
    margin: 10px 0 0 0;
  }
`;

const MembersGrid = styled.div`
  width: 100%;
  display: grid;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-template-columns: repeat(2, 50%);
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  margin-top: 20px;
  @media only screen and (max-width: 1010px) {
    margin-top: 15px;
  }
  @media only screen and (max-width: 550px) {
    margin-top: 10px;
  }
`;

export default MembersSection;
