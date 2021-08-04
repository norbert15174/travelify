import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import closeIcon from "./assets/closeIcon.svg";
import Input from "../trinkets/Input";
import FriendThumbnail from "./FriendThumbnail";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../redux/blurSlice";
import { useDetectOutsideClick } from "../trinkets/outsideModalClick";
import "./scrollbar.css";

const friends = [
    { value: 'Jan Nowak', label: 'Jan Nowak', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png", },
    { value: 'Krzysztof Nowak', label: 'Krzysztof Nowak', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png", },
    { value: 'Mateusz Nowak', label: 'Mateusz Nowak', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Mateusz Kowalski', label: 'Mateusz Kowalski', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png", },
    { value: 'Jan Kowalski', label: 'Jan Kowalski', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png", },
    { value: 'Krzysztof Kowalski', label: 'Krzysztof Kowalski', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Nobody', label: 'Nobody', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Nieznajomy', label: 'Nieznajomy', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Bezimienny', label: 'Bezimienny', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
    { value: 'Bezimienny2', label: 'Bezimienny2', icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" },
]

// Box for sharing and pinning friends

const SharePinBox = ({setClose}) => {

    // search field content
    const [searchContent, setSearchContent] = useState("");
    const [found, setFound] = useState([]);

    const ref = useRef(null);
    useDetectOutsideClick(ref)

    const dispatch = useDispatch();
    const blurState = useSelector((state) => state.blur.value);

    useEffect(() => {
        document.addEventListener("click", handler, true);
        document.body.style.overflow = "hidden";
        if (!blurState) {
            dispatch(toggle()); 
        }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handler(e){
        if (e.target.className.includes("close")) {
            document.removeEventListener('click', handler, true);
            document.body.style.overflow = "";
            return;
        }
        if (e.target.className.includes("choose")) {
            document.removeEventListener('click', handler, true);
            return;
        }
        e.stopPropagation();
        e.preventDefault();
    }


    // albums are searched by title, friends by name of course
    const handleSearchBarChange = (e) => {
        setSearchContent(e.target.value);
        setFound(friends.filter((item) => {
            return item.label.toLowerCase().includes(searchContent.toLowerCase());
        }));
    };

    return (
        <Container>
            <Header>
                <Heading>Udostępnij</Heading>
                <CloseButton className="close" src={closeIcon} onClick={() => {
                     setClose(false);
                     document.removeEventListener('click', handler, true);
                     document.body.style.overflow = "";
                     dispatch(toggle());
                }}/>
            </Header>
            <Search 
                search 
                autoComplete="off"
                name="search"
                id="search" 
                type="text" 
                placeholder="Szukaj"
                value={searchContent}
                onChange={handleSearchBarChange}
            />
            <List className="scroll">
                {
                    (
                        searchContent.length !== 0 && found.length !== 0 ?
                        found.map((friend) => 
                            <FriendThumbnail key={friend.label} name={friend.value} url={friend.icon}/>
                        ) : null
                    ) || (
                        friends.length !== 0 && searchContent.length === 0 ?
                        friends.map((friend) => 
                            <FriendThumbnail key={friend.label} name={friend.value} url={friend.icon}/>
                        ) : null
                    ) || (
                        <NoResults>Brak wyników...</NoResults>
                    ) 
                }
            </List>
        </Container>
    );

}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: ${({theme}) => theme.color.lightBackground};
    width: 35%;
    height: 75%;
    top: 10%;
    left: 28%;
    border: 5px solid ${({theme}) => theme.color.darkTurquise};
    z-index: 10000;
    box-shadow: 5px 5px 10px 0 ${({theme}) => theme.color.greyFont} ;
    padding-bottom: 25px;
    @media only screen and (max-width: 1140px) {
        height: 60%;
        width: 45%;
        top: 19%;
        left: 20.5%;   
    }
    @media only screen and (max-width: 720px) {
        height: 40%;
        top: 30%;
        left: 25%;
    }
    @media only screen and (max-width: 510px) {
        padding-bottom: 15px;
        min-height: 40%;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.color.darkTurquise};
    height: 60px;
    padding: 0px;
    min-height: 60px;
    @media only screen and (max-width: 720px) {
        height: 40px;
        min-height: 40px;
    };
    @media only screen and (max-width: 510px) {
       height: 20px;
       min-height: 20px;
    }
`;

const Heading = styled.h1`
    font-size: 40px;
    margin: 0 auto;
    color: ${({theme}) => theme.color.lightBackground};
    @media only screen and (max-width: 1140px) {
        font-size: 30px;
    };
    @media only screen and (max-width: 720px) {
        font-size: 20px;
    };
    @media only screen and (max-width: 510px) {
       font-size: 10px;
    }
`;

const CloseButton = styled.img`
    width: 32px;
    height: 32px;
    margin-right: 10px;
    cursor: pointer;
    @media only screen and (max-width: 1140px) {
        width: 22px;
        height: 22px;
    };
    @media only screen and (max-width: 720px) {
        width: 12px;
        height: 12px;
    };
    @media only screen and (max-width: 510px) {
        width: 8px;
        height: 8px;
    }
`;

const Search = styled(Input)`
    margin: 10px 10px 0px 10px;
    @media only screen and (max-width: 1140px) {
        font-size: 12px;
    };
    @media only screen and (max-width: 510px) {
        background-size: 8px;
        padding: 5px 10px 5px 25px;
        font-size: 8px;
    }
`;

const List = styled.div`
    display: grid; 
    grid-auto-rows: auto;
    margin: 25px 30px 0px 50px;
    grid-row-gap: 20px;
    overflow-y: scroll;
    @media only screen and (max-width: 770px) {
        margin: 25px 15px 0px 15px;
    }
    @media only screen and (max-width: 720px) {
        margin: 15px 15px 0px 15px;
    }
    @media only screen and (max-width: 510px) {
        margin: 10px 10px 0px 10px;
        grid-row-gap: 10px;
    }
`;

const NoResults = styled.h1`
    color: ${({theme}) => theme.color.greyFont};
    @media only screen and (max-width: 1140px) {
        font-size: 16px;
    };
    @media only screen and (max-width: 510px) {
        font-size: 12px;
    }
`;

export default SharePinBox;