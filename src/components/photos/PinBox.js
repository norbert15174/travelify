import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import closeIcon from "./assets/closeIcon.svg";
import Input from "../trinkets/Input";
import FriendThumbnail from "./PinFriendThumbnail";
import "./photosScrollbar.css";

const friends = [
    { value: 'Jan Nowak', label: 'Jan Nowak', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU", },
    { value: 'Krzysztof Nowak', label: 'Krzysztof Nowak', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU", },
    { value: 'Mateusz Nowak', label: 'Mateusz Nowak', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU" },
    { value: 'Mateusz Kowalski', label: 'Mateusz Kowalski', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU", },
    { value: 'Jan Kowalski', label: 'Jan Kowalski', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU", },
    { value: 'Krzysztof Kowalski', label: 'Krzysztof Kowalski', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU" },
    { value: 'Nobody', label: 'Nobody', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU" },
    { value: 'Nieznajomy', label: 'Nieznajomy', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU" },
    { value: 'Bezimienny', label: 'Bezimienny', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU" },
    { value: 'Bezimienny2', label: 'Bezimienny2', icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU" },
]

// Box for sharing and pinning friends

const PinBox = ({setClose, heightDelimiter}) => {

    // search field content
    const [searchContent, setSearchContent] = useState("");
    const [found, setFound] = useState([]);

    const ref = useRef(null);

    useEffect(() => {

        // backend magic

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function boxOutsideClick(e){
        if (!ref.current || ref.current.contains(e.target)) {
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
            <Box ref={ref} heightDelimiter={heightDelimiter}>
                <Header>
                    <Heading>Oznacz</Heading>
                    <CloseButton src={closeIcon} onClick={() => {
                        setClose(false)
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
            </Box>
        </Container>
        
    );

}

const Container = styled.div`
    width: calc(100% - 120px); // 120px - menu bar
    z-index: 10000;
    @media only screen and (max-width: 720px) {
        width: 100%; // menu bar ignored
    }
`;

const Box = styled.div`
    z-index: 9999;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 46.8%;
    transform: translate(-50%, -50%);
    width: 25%;
    height: ${({heightDelimiter}) => heightDelimiter - 60 + "px"};
    background-color: ${({theme}) => theme.color.lightBackground};
    border: 5px solid ${({theme}) => theme.color.darkTurquise};
    box-shadow: 5px 5px 10px 0 ${({theme}) => theme.color.greyFont} ;
    padding-bottom: 25px;
    @media only screen and (max-width: 1425px) {
        padding-bottom: 20px;
    };
    @media only screen and (max-width: 1060px) {
        padding-bottom: 15px;
    };
    @media only screen and (max-width: 825px) {
        left: 42%;
        width: 300px;
        height: 40%;
    }
    @media only screen and (max-width: 720px) {
        left: 50%;
    }
    @media only screen and (max-width: 510px) {
        width: 200px;
        height: 280px;
        min-height: 280px;
        padding-bottom: 10px;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.color.darkTurquise};
    height: 50px;
    padding: 0px;
    min-height: 50px;
    @media only screen and (max-width: 1425px) {
        height: 40px;
        min-height: 40px;
    };
    @media only screen and (max-width: 1060px) {
        height: 30px;
        min-height: 30px;
    };
    @media only screen and (max-width: 510px) {
        height: 20px;
        min-height: 20px;
    };
`;

const Heading = styled.h1`
    font-size: 36px;
    margin: 0 auto;
    color: ${({theme}) => theme.color.lightBackground};
    @media only screen and (max-width: 1425px) {
        font-size: 30px;
    };
    @media only screen and (max-width: 1060px) {
        font-size: 24px;
    };
    @media only screen and (max-width: 510px) {
        font-size: 18px;
    };
`;

const CloseButton = styled.img`
    position: absolute;
    width: 24px;
    height: 24px;
    right: 0;
    margin-right: 15px;
    cursor: pointer;
    @media only screen and (max-width: 1425px) {
        width: 18px;
        height: 18px;
    };
    @media only screen and (max-width: 1060px) {
        width: 14px;
        height: 14px;
        margin-right: 10px;
    };
    @media only screen and (max-width: 510px) {
        width: 10px;
        height: 10px;
        margin-right: 5px;
    };
`;

const Search = styled(Input)`
    margin: 10px 10px 0px 10px;
    @media only screen and (max-width: 1425px) {
        font-size: 14px;
    };
    @media only screen and (max-width: 1060px) {
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
    margin: 25px 30px 0px 35px;
    grid-row-gap: 15px;
    overflow-y: scroll;
    @media only screen and (max-width: 1635px) {
        margin: 25px 25px 0px 25px;
    }
    @media only screen and (max-width: 1425px) {
        margin: 20px 20px 0px 20px;
    };
    @media only screen and (max-width: 1060px) {
        margin: 15px 15px 0px 15px;
    };
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

export default PinBox;