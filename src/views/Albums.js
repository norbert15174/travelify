import React from 'react';
import UserTemplate from '../templates/UserTemplate';
import AlbumsPage from "../components/albums/AlbumsPage";

// UserTemplate adds Menu sidebar

const Albums = () => {

    // here will be albums data fetching

    return (
        <UserTemplate>
            <AlbumsPage/>
        </UserTemplate>
    );
    
};

export default Albums;