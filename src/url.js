const url = "http://localhost:8020";

export const endpoints = {
    login: url + "/auth/login",
    register: url + "/auth/register",
    changePassword: url + "/auth/password", // [ PUT ]
    getLoggedUserFriends: url + "/friends",
    getLoggedUserProfile: url + "/user/profile",
    getLoggedUserAlbums: url + "/albums",
    getLoggedUserSharedAlbums: url + "/albums/shared",
    getAlbumDetails: url + "/albums/", // + albumId
    updateUserProfile: url + "/user/profile",
    getLoggedUserProfileBasic: url + "/user/profile/basic",
    setUserBackgroundPicture: url + "/user/background",
    setUserProfilePicture: url + "/user/picture",
    getCountriesList: url + "/data/countries",
    getSelectedUserProfile: url + "/user/profile/full/", // + userId
    getSelectedUserFriends: url + "/friends/", // + userId
    sendInvitation: url + "/friends?id=[id]",
    deleteFriend: url + "/friends/delete/", // + userId
    shareAlbumWithUser: url + "/albums/shared/", // + userId
    addAlbum: url + "/albums/add",
}

// http://localhost:8020/friends/delete/