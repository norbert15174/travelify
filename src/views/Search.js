import React from 'react';
import UserTemplate from '../templates/UserTemplate';
import SearchPage from "../components/search/SearchPage";

// UserTemplate adds Menu sidebar

const Search = () => { 
    
    return (
        <UserTemplate>
            <SearchPage/>
        </UserTemplate>
    )
    
};

export default Search;