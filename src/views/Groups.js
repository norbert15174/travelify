import React, { useState, useEffect }  from "react";
import UserTemplate from "../templates/UserTemplate";
//import { endpoints } from "../url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errorTypes } from "../miscellanous/Utils";
import GroupsPage from "../components/groups/GroupsPage";

const tempGroups = [
    {
      id: 1,
      groupName: "Grupa 1",
      description:
        "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
      groupPicture:
        "https://m.media-amazon.com/images/I/31ddjyygRKL._AC_SY780_.jpg",
      members: [
        
      ],
      owner: {
        id: 1,
        name: "Mikołaj",
        surname: "Telec",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
    {
      id: 2,
      groupName: "Grupa 2",
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
        name: "Imię",
        surname: "Nazwisko",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
    {
      id: 3,
      groupName: "Grupa 3",
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
        name: "Imię",
        surname: "Nazwisko",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
    {
      id: 4,
      groupName: "Grupa 4",
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
        name: "Imię",
        surname: "Nazwisko",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
    {
      id: 5,
      groupName: "Grupa 5",
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
        name: "Imię",
        surname: "Nazwisko",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
    {
      id: 6,
      groupName: "Grupa 6",
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
        name: "Imię",
        surname: "Nazwisko",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
    {
      id: 7,
      groupName: "Grupa 7",
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
        name: "Imię",
        surname: "Nazwisko",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
    {
      id: 8,
      groupName: "Grupa 8",
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
        name: "Imię",
        surname: "Nazwisko",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    },
  ];

const Groups = () => {

    const [ error, setError ] = useState(null);
    const [ loadingFinished, setLoadingFinished ] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            setTimeout(() => {
                setLoadingFinished(true);
                setError(null);
            }, 500);
        }
    }, []);

    return (
        <UserTemplate>
        {
            (loadingFinished && error === null) 
            ?
            <GroupsPage groups={tempGroups}/>
            :
                !error
                ?
                <Loading/>
                :
                <ErrorAtLoading/>
        }
        </UserTemplate>
    )
};


export default Groups;