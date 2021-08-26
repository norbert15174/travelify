import React, { useEffect } from 'react';
import UserTemplate from '../templates/UserTemplate';
import SearchPage from "../components/search/SearchPage";
import { errorTypes } from "../miscellanous/Errors";

// UserTemplate adds Menu sidebar

const Search = () => { 
    
    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        }
    }, []);

    return (
        <UserTemplate>
            <SearchPage/>
        </UserTemplate>
    )
    
};

export default Search;