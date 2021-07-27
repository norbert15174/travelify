import React from 'react';
import UserTemplate from '../templates/UserTemplate';
import AlbumsPage from "../components/albums/AlbumsPage";

// UserTemplate adds Menu sidebar

const Albums = () => (
    <UserTemplate>
        <AlbumsPage/>
    </UserTemplate>
);

export default Albums;