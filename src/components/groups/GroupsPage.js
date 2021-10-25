import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GroupSearch from "../trinkets/DropdownSearch";
import Button from "../trinkets/Button";
import GroupThumbnail from "./GroupThumbnail";
import "./groupsScrollbar.css";
import addGroupIcon from "./assets/addGroupIcon.svg";
import noAlbumPhotoIcon from "../../assets/noAlbumPhotoIcon.svg";

const tempGroups = [
  {
    id: 1,
    groupName: "Kamanda pinka flojda",
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    groupPicture:
      "https://m.media-amazon.com/images/I/31ddjyygRKL._AC_SY780_.jpg",
    members: [
      {
        id: "m1",
        name: "Mikołaj",
        surname: "Telec",
        profilePicture:
          "http://zebza.net/wp-content/uploads/2017/09/example-interface.png",
      },
      {
        id: "m2",
        name: "Jan",
        surname: "Nowak",
        profilePicture:
          "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg",
      },
      {
        id: "m3",
        name: "Mateusz",
        surname: "Kowalski",
        profilePicture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjkW6L6Fi2RYRQtGGPZeDA_Qt0qADmENA6A&usqp=CAU",
      },
    ],
    owner: {
      id: "m1",
      name: "Janusz",
      surname: "Pan Janusz",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 2,
    groupName: "Kamanda pinka flojda",
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    groupPicture:
      "https://m.media-amazon.com/images/I/31ddjyygRKL._AC_SY780_.jpg",
    members: [
      {
        id: "m1",
        name: "Mikołaj",
        surname: "Telec",
        profilePicture:
          "http://zebza.net/wp-content/uploads/2017/09/example-interface.png",
      },
      {
        id: "m2",
        name: "Jan",
        surname: "Nowak",
        profilePicture:
          "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg",
      },
      {
        id: "m3",
        name: "Mateusz",
        surname: "Kowalski",
        profilePicture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjkW6L6Fi2RYRQtGGPZeDA_Qt0qADmENA6A&usqp=CAU",
      },
    ],
    owner: {
      id: "m4",
      name: "Janusz",
      surname: "Pan Janusz",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 3,
    groupName: "Podróżnicy",
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    groupPicture:
      "https://m.media-amazon.com/images/I/31ddjyygRKL._AC_SY780_.jpg",
    members: [
      {
        id: "m5",
        name: "Mikołaj",
        surname: "Telec",
        profilePicture:
          "http://zebza.net/wp-content/uploads/2017/09/example-interface.png",
      },
      {
        id: "m6",
        name: "Jan",
        surname: "Nowak",
        profilePicture:
          "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg",
      },
      {
        id: "m7",
        name: "Mateusz",
        surname: "Kowalski",
        profilePicture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjkW6L6Fi2RYRQtGGPZeDA_Qt0qADmENA6A&usqp=CAU",
      },
    ],
    owner: {
      id: "m8",
      name: "Janusz",
      surname: "Pan Janusz",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
  {
    id: 4,
    groupName: "Studenci EiT-u",
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    groupPicture:
      "https://m.media-amazon.com/images/I/31ddjyygRKL._AC_SY780_.jpg",
    members: [
      {
        id: "m9",
        name: "Mikołaj",
        surname: "Telec",
        profilePicture:
          "http://zebza.net/wp-content/uploads/2017/09/example-interface.png",
      },
      {
        id: "m10",
        name: "Jan",
        surname: "Nowak",
        profilePicture:
          "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg",
      },
      {
        id: "m11",
        name: "Mateusz",
        surname: "Kowalski",
        profilePicture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjkW6L6Fi2RYRQtGGPZeDA_Qt0qADmENA6A&usqp=CAU",
      },
    ],
    owner: {
      id: "m12",
      name: "Janusz",
      surname: "Pan Janusz",
      profilePicture:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  },
];

const GroupsPage = ({groups}) => {
  const blurState = useSelector((state) => state.blur.value);
  const [searchList, setSearchList] = useState(null);
  const [groupIdSearch, setGroupIdSearch] = useState(null);

  useEffect(() => {
    setGroupIdSearch(null);
    if (!searchList) {
      mapGroupsToSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapGroupsToSearch = () => {
    let searchList = [];
    for (let i = 0; i < tempGroups.length; i++) {
      searchList.push({
        value: tempGroups[i].groupName,
        label: tempGroups[i].groupName,
        groupPicture:
          tempGroups[i].groupPicture !== undefined
            ? tempGroups[i].groupPicture
            : noAlbumPhotoIcon,
        description: tempGroups[i].description,
        owner: tempGroups[i].owner,
        id: tempGroups[i].id
      });
    }
    console.log(searchList);
    setSearchList(searchList);
  };

  if (groupIdSearch) {
    console.log(groupIdSearch);
    /* return (
      <Redirect
        push
        to={{
          pathname: `album/${groupIdSearch}`,
        }}
      />
    ); */
  }

  return (
    <Container blurState={blurState}>
      <PageHeader>
        <Heading>Grupy</Heading>
      </PageHeader>
      <GroupsNavigation>
        <GroupSearch
          searchType="groups"
          options={searchList !== null ? searchList : null}
          setState={setGroupIdSearch}
          value={groupIdSearch}
        />
      </GroupsNavigation>
      <Groups>
        <Header>
          <h1>Twoje grupy</h1>
          <AddButton onClick={() => console.log(true)}>Stwórz grupę</AddButton>
        </Header>
        <GridLine />
        <Grid className="scroll">
          {tempGroups.map((item) => (
            <GroupThumbnail key={item.id} group={item} />
          ))}
        </Grid>
      </Groups>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-row-gap: 15px;
  width: 1500px;
  margin: 0 auto;
  @media only screen and (max-width: 1635px) {
    width: 1300px;
  }
  @media only screen and (max-width: 1425px) {
    width: 1100px;
  }
  @media only screen and (max-width: 1225px) {
    width: 900px;
  }
  @media only screen and (max-width: 1025px) {
    width: 700px;
  }
  @media only screen and (max-width: 825px) {
    width: 500px;
  }
  @media only screen and (max-width: 510px) {
    width: 300px;
  }
  filter: ${({ blurState }) => (blurState === true ? "blur(15px)" : "none")};
  -webkit-filter: ${({ blurState }) =>
    blurState === true ? "blur(15px)" : "none"};
`;

const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.color.lightBackground};
  height: 80px;
  border-radius: 0px 0px 15px 15px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  @media only screen and (max-width: 870px) {
    height: 70px;
  }
  @media only screen and (max-width: 735px) {
    height: 60px;
  }
  @media only screen and (max-width: 510px) {
    height: 40px;
  }
`;

const Heading = styled.h1`
  font-size: 54px;
  margin: auto auto auto 25px;
  color: ${({ theme }) => theme.color.greyFont};
  @media only screen and (max-width: 825px) {
    font-size: 46px;
  }
  @media only screen and (max-width: 735px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 24px;
    margin-left: 15px;
  }
`;

const GroupsNavigation = styled.div`
  height: 110px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
`;

const GridLine = styled.div`
  margin-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.dark};
  @media only screen and (max-width: 510px) {
    margin-top: 5px;
  }
`;

const Groups = styled.div`
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.lightBackground};
  font-size: 17px;
  margin-bottom: 15px;
  padding: 20px 25px;
  @media only screen and (max-width: 825px) {
    font-size: 12px;
    padding: 15px 20px;
  }
  @media only screen and (max-width: 510px) {
    font-size: 8px;
    padding: 10px 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  margin: 35px 0px 15px 0px;
  align-content: start;
  grid-auto-rows: auto;
  grid-gap: 30px;
  max-height: 1000px;
  overflow-y: scroll;
  min-height: 100vh;
  padding-right: 25px;
  @media only screen and (max-width: 1635px) {
  }
  @media only screen and (max-width: 1425px) {
  }
  @media only screen and (max-width: 1225px) {
  }
  @media only screen and (max-width: 1025px) {
    h1 {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 825px) {
    margin-top: 20px;
  }
  @media only screen and (max-width: 510px) {
    grid-gap: 20px;
    margin-top: 10px;
    h1 {
      font-size: 12px;
    }
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.color.greyFont};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
  @media only screen and (max-width: 825px) {
    height: 30px;
  }
`;

const AddButton = styled(Button)`
  margin: 0 0 0 auto;
  border-radius: 5px;
  width: 200px;
  font-size: 24px;
  background-image: url(${addGroupIcon});
  background-repeat: no-repeat;
  background-position: 90% 50%;
  background-size: 20px;
  padding-right: 30px;
  @media only screen and (max-width: 1225px) {
    font-size: 18px;
    background-size: 15px;
    padding-right: 15px;
    width: 150px;
  }
  @media only screen and (max-width: 825px) {
    font-size: 12px;
    background-size: 10px;
    width: 100px;
    height: 30px;
  }
  @media only screen and (max-width: 510px) {
    height: 20px;
    width: 80px;
    font-size: 8px;
  }
`;

export default GroupsPage;
