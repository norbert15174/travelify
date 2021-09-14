import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled, { keyframes } from 'styled-components'
import { routes } from "../miscellanous/Routes";
import Button from "../components/trinkets/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProfilePicture, setUserData } from "../redux/userDataSlice";
import { endpoints } from "../url";
import { errorTypes } from "../miscellanous/Errors";
import somethingWentWrongIcon from "../assets/somethingWentWrongIcon.svg";
import { mapCountriesToSelect } from "../miscellanous/Utils";

/*
* View between Login and NewsPage. Loading of some data happens here...
*/
const LoginTransition = () => {

    const [ getFriendsFinished, setGetFriendsFinished ] = useState(false);
    const [ getUserDataFinished, setGetUserDataFinished ] = useState(false);
    const [ getCountriesFinished, setGetCountriesFinished ] = useState(false);
    const [ goBack, setGoBack ] = useState(false);
    const [ error, setError ] = useState(null);

    const dispatch = useDispatch();

    // when all requests will be processed redirection to NewsPage will happen
    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            dispatch(setProfilePicture(""));
            getUserData();
            getCountries();
            getFriends();
        }
    // eslint-disable-next-line
    }, []);

    /*
     *  Sends GET request to acquire user firstname and lastname
     */
    async function getUserData() {
        await axios({
            method: "get",
            url: endpoints.getLoggedUserProfileBasic,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
            },
        }).then((response) => {
            console.log(response);
            if (response.data.photo !== undefined) {
                dispatch(setProfilePicture(response.data.photo));
            }
            dispatch(setUserData({
                id: response.data.id,
                name: response.data.name,
                surName: response.data.surName,
            }))
            sessionStorage.setItem("loggedUserId", response.data.id);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setGetUserDataFinished(true);
        })
    }

    /*
     * Sends GET request for countryList
     */
    async function getCountries() {
        await axios({
            method: "get",
            url: endpoints.getCountriesList,
            headers: {
                "Content-Type": "application/json",
                // there's no need for auth when we need countries :O
            },
        }).then(({data}) => {
            data.shift();
            let countries = [];
            for (let i = 0; i < 206; i++) {
                countries.push(data[i]);
            }
            localStorage.setItem("countryList", JSON.stringify(countries));
            mapCountriesToSelect();
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setGetCountriesFinished(true);
        })
    }

    /*
     * Sends GET request for friends list 
     */
    async function getFriends() {
        await axios({
            method: "get",
            url: endpoints.getLoggedUserFriends,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
            },
        }).then((response) => {
            console.log("getFriends success");
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setGetFriendsFinished(true);
        })
    }

    // redirection when everything has been loaded and there are no errors
    if (getFriendsFinished && getUserDataFinished && getCountriesFinished && error === null) {
        return <Redirect to={{pathname: routes.news}}/>
    }

    // when something fails user has a chance to go back
    if ( goBack ) {
        sessionStorage.clear(); //clearing token etc.
        return <Redirect to={{pathname: routes.auth}}/>;
    }

    return (
        <>
            {
                error === null ?
                <Container>
                    <InnerContainer>
                        <LoadingSpinner active={true}/>
                        <h1>Ładowanie...</h1>
                    </InnerContainer>
                </Container>
                :
                <Container>
                    <InnerContainer>
                        <Icon src={somethingWentWrongIcon}/>
                        <InnerInnerContainer>
                            <h1>Coś poszło nie tak...</h1>
                            <GoBackButton onClick={() => setGoBack(true)}>Wróć</GoBackButton>
                        </InnerInnerContainer>
                    </InnerContainer>
                </Container>
            }
        </>
    )

};

const Container = styled.div`
    position: fixed;
    width: auto;
    height: auto;
    border-radius: 50px;
    background-color: ${({theme}) => theme.color.darkBackground};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25px 30px;
    @media only screen and (max-width: 720px) {
        padding: 15px 20px;
        width: auto;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    h1 {
        color: #000;
        font-size: 40px;
        text-align: center;
        @media only screen and (max-width: 1025px) {
            font-size: 30px;
        }
        @media only screen and (max-width: 720px) {
            display: none;
        }
    }
    @media only screen and (max-width: 720px) {
        flex-direction: column;
    }
`;

const rotate = keyframes`
    from {
        transform :rotate(0deg);
    }
    to {
        transform :rotate(360deg);
    }
`;

const LoadingSpinner = styled.div`
    max-width:80px;
    width:80px;
    height:80px;
    margin-right: 30px;
    border: 24px solid ${({theme}) => theme.color.lightTurquise};
    border-top: 24px solid ${({theme}) => theme.color.darkTurquise};
    border-radius: 50%;
    animation-name: ${({active}) => active ? rotate : "none"};
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-delay: 0.5s;
    animation-play-state: running;
    animation-iteration-count: infinite;
    @media only screen and (max-width: 1025px) {
        width: 65px;
        height: 65px;
        max-width: 65px;
    }
    @media only screen and (max-width: 720px) {
        max-width:50px;
        width:50px;
        height:50px;
        margin-right: 0px;
    }
`

const InnerInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 720px) {
        h1 {
            font-size: 16px;
            display: block;
            margin-top: 15px;
        }
    }
`;

const Icon = styled.img`
    max-width:128px;
    width:128px;
    height:128px;
    margin-right: 15px;
    @media only screen and (max-width: 1025px) {
        width: 113px;
        height: 113px;
        max-width: 113px;
    }
    @media only screen and (max-width: 720px) {
        width: 98px;
        height: 98px;
        max-width: 98px;
        margin: 0 auto;
    }
`;

const GoBackButton = styled(Button)`
    width: auto;
    height: auto;
    margin-top: 15px;
    font-size: 24px;
    padding: 10px 25px;
    @media only screen and (max-width: 1025px) {
        font-size: 16px;
        margin-top: 10px;
    }
    @media only screen and (max-width: 720px) {
        padding: 5px 15px;
        font-size: 12px;
        margin-top: 15px;
    }
`;

export default LoginTransition;