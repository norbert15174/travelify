import React, { useState, useEffect }  from "react";
import UserTemplate from "../templates/UserTemplate";
//import { endpoints } from "../url";
import { Loading, ErrorAtLoading } from "../templates/LoadingTemplate";
import { errorTypes } from "../miscellanous/Utils";
import GroupsPage from "../components/groups/GroupsPage";

const Groups = () => {

    const [ error, setError ] = useState(null);
    const [ loadingFinished, setLoadingFinished ] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem("Login")) {
            throw new Error(errorTypes.noAccess);
        } else {
            setTimeout(() => {
                setLoadingFinished(true);
                setError(null);
            }, 1000);
        }
    }, []);

    return (
        <UserTemplate>
        {
            (loadingFinished && error === null) 
            ?
            <GroupsPage/>
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


export default Groups;