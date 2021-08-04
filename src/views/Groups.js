import React  from "react";
import UserTemplate from "../templates/UserTemplate";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../redux/blurSlice";
import { setFriendToDeleteId } from "../redux/deleteFriendSlice";

// UserTemplate adds Menu sidebar

const Groups = () => {
    
    const blurState = useSelector((state) => state.blur.value);
    const friendId = useSelector((state) => state.deleteFriend.value);
    const dispatch = useDispatch();

    return (
        <UserTemplate>
            <div>
                <div>
                    <button
                        aria-label="Blur toggle"
                        onClick={() => {
                            dispatch(toggle());
                            dispatch(setFriendToDeleteId(25));
                        }}
                    >
                        Blur
                    </button>
                    <span>{blurState ? "True" : "False"}</span>
                    <h1>{friendId}</h1>
                </div>
            </div>
        </UserTemplate>
    )
};

export default Groups;