import React, { useState } from "react";
import styled from "styled-components";
import "./friends.css";
import { AiOutlineSearch } from "react-icons/ai";
import FriendItem from "./FriendItem";
import Message from "./Message";
import Close from "../menu/svg/close";
const Friends = ({friendDisplay}) => {
  const FriendsListArray = {
    list: [
      {
        id: 1,
        url: "https://scontent-frt3-2.xx.fbcdn.net/v/t1.6435-1/p100x100/185049125_3895390470556041_3014006283467539368_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_ohc=0iwJDbnyxtIAX-6F89_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frt3-2.xx&tp=6&oh=00c5b16316966d1e74395d0e88c40df4&oe=60D0BE09",
        name: "Robert Żaak",
      },
      {
        id: 2,
        url: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/p100x100/38658486_2168862136684468_1032047862038396928_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=7206a8&_nc_ohc=A_djmu-NBdUAX_hdEAD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frt3-1.xx&tp=6&oh=34bc61250fc653b7eeb22ae1ecb93c3d&oe=60D2324A",
        name: "Mikołaj Telec",
      },
      {
        id: 3,
        url: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/49043048_2024592160950721_4816422960489299968_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=grmK5BMKov0AX_FeeBr&_nc_ht=scontent-frt3-1.xx&oh=6f8faeb9b7564f92dd5a2a939df07c40&oe=60D1E961",
        name: "Justyna Socała",
      },
      {
        id: 4,
        url: "https://scontent-frt3-2.xx.fbcdn.net/v/t1.6435-1/p100x100/138356147_3895012190566484_392161456918160544_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=KCiFWALlphcAX8fYuPX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frt3-2.xx&tp=6&oh=cafd5b44a606eda8ddd2ae251b2c75e7&oe=60D1CCF4",
        name: "Weronika Kubińska",
      },
      {
        id: 5,
        url: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/p100x100/120106087_3371589869584318_5854741548233363512_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=7206a8&_nc_ohc=UGQmaXO0V4AAX8OYnjd&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frt3-1.xx&tp=6&oh=d405fc5b0911fd2668376190e52d4870&oe=60D2029F",
        name: "Natalia Fabia",
      },
      {
        id: 6,
        url: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.6435-1/p100x100/61648927_1047254458802301_3322394831111585792_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=7206a8&_nc_ohc=HrRGrrbMzYkAX8r21Lp&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frx5-1.xx&tp=6&oh=739899fe87519234d72ba4c216e56b9e&oe=60D1D153",
        name: "Michał Czarnik",
      },
      {
        id: 7,
        url: "https://scontent-frt3-2.xx.fbcdn.net/v/t1.6435-1/p100x100/73321092_1169927596535828_9162634713888718848_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_ohc=qHX0830fwvsAX-ORiaf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frt3-2.xx&tp=6&oh=1da3a50b270009c2895df6ddc73c08b7&oe=60D3381B",
        name: "Radosław Sajdak",
      },
      {
        id: 8,
        url: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/p100x100/59285975_440487456521934_2836874741376090112_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=7206a8&_nc_ohc=FNTp5D7mY-YAX97uxJY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frt3-1.xx&tp=6&oh=fce5cbe56480686703e41bb7efd554b8&oe=60D0D909",
        name: "Kamil Faron",
      },
      {
        id: 9,
        url: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/p100x100/103121730_3102268069857548_6304697827186038746_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=7206a8&_nc_ohc=T4azjfqW7YUAX-Hd-eQ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frt3-1.xx&tp=6&oh=91734b17b1bf0a27c8f6d48fa7c85d14&oe=60D0C80A",
        name: "Łukasz Faron",
      },
      {
        id: 10,
        url: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84688533_170842440872810_7559275468982059008_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=7206a8&_nc_ohc=2NRj79zkEqsAX8mhCsB&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frx5-1.xx&tp=27&oh=58683eae14f3891d09a57a4a335efc88&oe=60D32D4E",
        name: "Tchórzliwy Pies",
      },
      {
        id: 11,
        url: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-1/p100x100/133389097_2097104007090769_3191581139466274720_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=iazyfSuyfwsAX-H6M06&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-frt3-1.xx&tp=6&oh=c269c15c27aa2250708460b5a2a1c3e2&oe=60D1456F",
        name: "Wojewodzic Mariola",
      },
    ],
  };
  
  const [display, setDisplay] = useState(-1);

  return (
    <>
      <Container className="font">
        <FriendsHeader>
          <FriendsHeaderText>Znajomi</FriendsHeaderText>
          <CloseContainer onClick={e => friendDisplay("no")}>
          <Close width="25px" height="25px"></Close>
        </CloseContainer>
        </FriendsHeader>
        <SearchContainer>
          <SearchIcon></SearchIcon>
          <SearchInput type="text" placeholder="Szukaj"></SearchInput>
        </SearchContainer>
        <FriendsList className="scroll">
          {FriendsListArray.list.map((data) => (
            <>
              
              <FriendItem key={data.id} user={data} click={setDisplay}></FriendItem>
              {display === data.id ? <Message user={data} click={setDisplay}></Message> : null}
            </>
          ))}
        </FriendsList>
      </Container>
      
    </>
  );
};

const CloseContainer = styled.div`

  left: calc(100% - 50px);
  top: calc(20px);
  position: absolute;
  cursor: pointer;

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
  position: fixed;
  width: 420px;
  background-color: #f2f7f2;
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
  background-color: #0fa3b1;
  color: #f2f7f2;
  font-size: 20px;
  font-weight: 700;
`;

const FriendsHeaderText = styled.p`
  width: 100px;
  height: 100%;
  margin: 0;
  position: relative;
  top: 16px;
  left: 12px;
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
