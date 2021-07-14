import React from "react";
import UserTemplate from "../templates/UserTemplate";
import UserPage from "../components/user/UserPage";

// UserTemplate adds Menu sidebar

const User = () => (
    <UserTemplate>
        <UserPage/>
    </UserTemplate>
);

export default User;