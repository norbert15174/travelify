import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./friends.css";
import { AiOutlineSearch } from "react-icons/ai";
import FriendItem from "./FriendItem";
import Message from "./Message";
import Close from "../menu/svg/close";
import { endpoints } from "../../url";
import { theme } from "../../miscellanous/GlobalTheme";
import { selectLoggedUserFriendsList, setLoggedUserFriendsList } from "../../redux/userDataSlice";

const Friends = ({ friendDisplay }) => {
  
  const [display, setDisplay] = useState(-1);
  const [friends, setFriends] = useState([]);
  const blurState = useSelector((state) => state.blur.value);
  const storeFriendsList = useSelector(selectLoggedUserFriendsList);
	const dispatch = useDispatch()

	// fetches once, then uses Redux. When refresh will happen, fetches again...

  	useEffect(() => {
    	if (storeFriendsList === null) {
        	axios({
      			url: endpoints.getLoggedUserFriends,
      			method: "get",
      			headers: {
        			"Content-Type": "application/json",
        			Authorization: `Bearer ${sessionStorage.getItem("Bearer")}`,
      			},
    		})
			.then((response) => {
				console.log("fetch")
        		setFriends(response.data);
				dispatch(setLoggedUserFriendsList(response.data));
      		})
      		.catch((err) => console.log(err.message));
      	} else {
			console.log("redux");
			setFriends(storeFriendsList);
		}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container blurState={blurState} className="font">
        <FriendsHeader>
          <FriendsHeaderText>Znajomi</FriendsHeaderText>
          <CloseContainer onClick={(e) => friendDisplay("")}>
            <Close width="25px" height="25px"></Close>
          </CloseContainer>
        </FriendsHeader>
        <SearchContainer>
          <SearchIcon></SearchIcon>
          <SearchInput type="text" placeholder="Szukaj"></SearchInput>
        </SearchContainer>
        <FriendsList className="scroll">
          {friends.length !== 0
            ? friends.map((data) => (
                <div key={data.id}>
                  <FriendItem user={data} click={setDisplay}></FriendItem>
                  {display === data.id ? (
                    <Message user={data} click={setDisplay}></Message>
                  ) : null}
                </div>
              ))
            : <h1 style={{color: theme.color.greyFont, marginLeft: "30px"}}>Brak znajomych</h1>}
        </FriendsList>
      </Container>
    </>
  );
};

const CloseContainer = styled.div`
  //left: calc(100% - 50px);
  //top: calc(20px);
  //position: absolute;
  //cursor: pointer;
  margin: 0 12px 0 auto;
  cursor: pointer;
  @media only screen and (max-width: 1000px) {
    width: 15px;
    height: 15px;
    background-size: 15px;
  }
  @media only screen and (max-width: 720px) {
    margin: 0 30px 0 auto;
  }
`;

const FriendsList = styled.div`
  margin-top: 50px;
  overflow-x: hidden; /* Hide horizontal scrollbar */
  overflow-y: scroll; /* Add vertical scrollbar */
  height: calc(100% - 155px);
  width: 98%;
  position: absolute;
`;

const SearchIcon = styled(AiOutlineSearch)`
  color: #8c939c;
  position: relative;
  top: 30.46px;
  left: 41.56px;
  z-index: 1000;
  font-size: 24px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 400px;
  height: 36px;
`;

const Container = styled.div`
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
  position: fixed;
  width: 420px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  right: 121px;
  top: 0;
  height: 100vh;
  z-index: 800;
  -webkit-box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
  box-shadow: -4px 1px 8px -2px rgba(0, 0, 0, 0.88);
`;

const FriendsHeader = styled.div`
  width: 100%;
  height: 65px;
  background-color: ${({ theme }) => theme.color.darkTurquise};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FriendsHeaderText = styled.p`
  margin-left: 12px;
  font-size: 30px;
  color: ${({ theme }) => theme.color.lightBackground};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const SearchInput = styled.input`
  position: relative;
  width: 300px;
  height: 36px;
  top: 21px;
  left: 5px;
  padding-left: 44px;
  background-color: #e0e5e0;
  border: none;
  color: #8c939c;
  border-radius: 30px;
  outline-style: none;
`;


export default Friends;
