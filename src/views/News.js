import React from "react";
import UserTemplate from "../templates/UserTemplate";
import NewsPage from "../components/news/NewsPage";

// UserTemplate adds Menu sidebar and div for app sections like UserPage, News etc

const News = () => (
    <UserTemplate>
        <NewsPage/>
    </UserTemplate>
);


export default News;
