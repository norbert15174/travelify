import React, { useEffect, useState } from "react";
import UserTemplate from "../templates/UserTemplate";
import NewsPage from "../components/news/NewsPage";
import { errorTypes } from "../miscellanous/Errors";
/* import { endpoints } from "../url";
import axios from "axios"; */
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";

const News = () => {

    const [ error, setError ] = useState(null);
    const [ loadingFinished, setLoadingFinished ] = useState(false);

    // when all requests will be processed redirection to NewsPage will happen
    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            setTimeout(() => {
                setLoadingFinished(true);
            }, 1000);
        }
    }, []);

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
