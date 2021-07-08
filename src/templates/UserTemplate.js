import React from 'react';
import Menu from '../components/menu/Menu';

// adds Menu sidebar

const UserTemplate = ({children}) => (
    <>
        <Menu/>
        {children}
    </>
);

export default UserTemplate;