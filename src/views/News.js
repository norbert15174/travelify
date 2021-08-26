import React, { useEffect } from "react";
import UserTemplate from "../templates/UserTemplate";
import NewsPage from "../components/news/NewsPage";
import { errorTypes } from "../miscellanous/Errors";
// UserTemplate adds Menu sidebar and div for app sections like UserPage, News etc

const News = () => {

    // when all requests will be processed redirection to NewsPage will happen
    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        }
    }, []);

    return (
        <UserTemplate>
            <NewsPage/>
        </UserTemplate>
    )
};

export default News;
