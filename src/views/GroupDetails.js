import React, { useState, useEffect } from "react";
import UserTemplate from "../templates/UserTemplate";
//import { endpoints } from "../url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errorTypes } from "../miscellanous/Utils";
import GroupInside from "../components/groups/GroupInside";

const tempDetails = [
  {
    id: 1,
    groupName: "Grupa 1",
    description:
      "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMaker",
    groupPicture:
      "https://m.media-amazon.com/images/I/31ddjyygRKL._AC_SY780_.jpg",
    members: [
      {
        id: "m1",
        name: "Imię",
        surname: "Nazwisko",
        profilePicture:
          "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      {
        id: "m2",
        name: "Mikołaj",
        surname: "Telec",
        profilePicture:
          "http://zebza.net/wp-content/uploads/2017/09/example-interface.png",
      },
      {
        id: "m3",
        name: "Jan",
        surname: "Nowak",
        profilePicture:
          "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg",
      },
      {
        id: "m4",
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
];

const GroupDetails = () => {
  const [error, setError] = useState(null);
  const [loadingFinished, setLoadingFinished] = useState(false);

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
      {loadingFinished && error === null ? (
        <GroupInside group={tempDetails[0]} />
      ) : !error ? (
        <Loading />
      ) : (
        <ErrorAtLoading />
      )}
    </UserTemplate>
  );
};

export default GroupDetails;
