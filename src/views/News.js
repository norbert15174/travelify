import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserTemplate from "../templates/UserTemplate";
import NewsPage from "../components/news/NewsPage";
import { errorTypes } from "../miscellanous/Errors";
import { endpoints } from "../url";
import { setFriendsList } from "../redux/userDataSlice";
import axios from "axios";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";

const News = () => {

    const [ error, setError ] = useState(null);
    const [ loadingFinished, setLoadingFinished ] = useState(false);
    const dispatch = useDispatch();

    // when all requests will be processed redirection to NewsPage will happen
    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            getFriends();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getFriends() {
        setError(null);
        await axios({
            method: "get",
            url: endpoints.getLoggedUserFriends,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem("Bearer")}`,
            },
        }).then(({data}) => {
            dispatch(setFriendsList(data));
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoadingFinished(true);
        });
    }

    return (
        <UserTemplate>
        {
            (loadingFinished && error === null) 
            ?
            <NewsPage/>
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

export default News;
